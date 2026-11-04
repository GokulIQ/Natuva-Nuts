const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
process.chdir(path.resolve(__dirname, '..'));

const source = name => fs.readFileSync(`assets/js/${name}.js`, 'utf8');
const context = vm.createContext({ Intl, console });
vm.runInContext(source('pricing') + '\n' + source('products-data'), context);
const { data, pricing } = vm.runInContext('({data:NATUVA_DATA,pricing:NatuvaPricing})', context);
const marketPacks = [
  [450, 899, 1798], [1695, 3389, 6520], [505, 1009, 1889], [463, 925, 1850],
  [549, 1098, 2196], [898, 1796, 3592], [403, 805, 1610], [385, 769, 1538],
  [1045, 2090, 4180], [280, 559, 1118], [195, 389, 699], [355, 709, 1418],
  [390, 779, 1558], [374, 748, 1496], [388, 775, 1550]
];
data.products.forEach((product, i) => {
  product.packSizes.forEach((pack, j) => assert.equal(pack.price, marketPacks[i][j]));
  assert.equal(product.packSizes.find(pack => pack.size === product.weight).price, product.price);
  assert.equal(product.originalPrice, null);
  assert(product.price <= pricing.filterMax);
});
data.giftBoxes.forEach((gift, i) => assert.equal(gift.price, [2299, 4299, 4999, 1299, 2999, 1099][i]));

for (const file of fs.readdirSync('.').filter(file => file.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');
  assert(!/\$\d/.test(html), `${file} still displays USD`);
  assert(html.indexOf('<script src="assets/js/pricing.js"') < html.indexOf('<script src="assets/js/cart.js"'), `${file} script order`);
  for (const match of html.matchAll(/<button\b[^>]*class="[^"]*btn-add-to-cart[^"]*"[^>]*>/g)) {
    const id = match[0].match(/data-id="([^"]+)"/)[1];
    const amount = Number(match[0].match(/data-price="([^"]+)"/)[1]);
    assert.equal(amount, [...data.products, ...data.giftBoxes].find(product => product.id === id).price, `${file}: ${id}`);
  }
}

function loadCart(stored, promo) {
  const storage = new Map(Object.entries(stored));
  if (promo) storage.set('natuva_promo_code', promo);
  const callbacks = [];
  const sandbox = vm.createContext({
    Intl, console,
    localStorage: { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) },
    document: {
      addEventListener: (event, callback) => { if (event === 'DOMContentLoaded') callbacks.push(callback); },
      querySelectorAll: () => [], querySelector: () => null
    }
  });
  ['pricing', 'products-data', 'cart'].forEach(name => vm.runInContext(source(name), sandbox));
  callbacks.forEach(callback => callback());
  return { calc: vm.runInContext('NatuvaCart.getCalculations()', sandbox), storage };
}

const legacy = JSON.stringify([{ id: 'prod-almonds-california', name: 'Almonds', packSize: '500g', price: 18.5, quantity: 2 }]);
const migrated = loadCart({ natuva_cart_items: legacy }, 'GOURMET10');
assert.equal(migrated.calc.subtotal, 1798);
assert.equal(migrated.calc.discount, 179.80);
assert.equal(migrated.calc.shipping, 563.17);
assert.equal(migrated.calc.total, 2181.37);
assert.equal(migrated.storage.get('natuva_cart_items'), legacy);
assert.equal(loadCart(Object.fromEntries(migrated.storage)).calc.subtotal, 1798);
assert.equal(loadCart({ natuva_cart_items_inr_v1: legacy.replace('18.5', '1751.03') }).calc.subtotal, 1798);
assert.equal(loadCart({ natuva_cart_items: legacy }, 'FREESHIP').calc.shipping, 0);
assert.equal(loadCart({ natuva_cart_items: legacy.replace('"quantity":2', '"quantity":6') }).calc.shipping, 0);
assert.equal(loadCart({}).calc.total, 0);
assert.equal(loadCart({ natuva_cart_items: legacy, natuva_cart_items_inr_v1: '[]' }).calc.total, 0);
assert.equal(loadCart({ natuva_cart_items_inr_v1: legacy.replace('prod-almonds-california', 'unknown-product') }).calc.subtotal, 0);
console.log('PASS: 45 market pack prices, 6 hampers, all HTML cart buttons, legacy/current cart repricing, discounts, shipping and rounding.');
