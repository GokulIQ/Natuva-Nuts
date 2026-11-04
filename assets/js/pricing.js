/** Indian retail benchmark prices, reviewed 4 November 2026.
 * Sources and estimated packs: documentation/inr-pricing.md.
 * Catalog prices are INR. No exchange-rate conversion is used.
 */
const NatuvaPricing = (() => {
  'use strict';

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR',
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });

  return Object.freeze({
    currency: 'INR',
    pricesCheckedOn: '2026-11-04',
    freeShippingGoal: 4732.50,
    shippingFee: 563.17,
    filterMin: 100,
    filterMax: 4000,
    filterStep: 50,
    format: amount => formatter.format(Number(amount)),
    round: amount => Math.round((Number(amount) + Number.EPSILON) * 100) / 100
  });
})();
