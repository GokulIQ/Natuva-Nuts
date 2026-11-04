# Indian market price benchmarks

Reviewed on **4 November 2026**. The storefront now uses comparable Indian retail listings, not USD conversions. These are selected benchmark selling prices, not verified Natuva supplier quotes, nationwide market averages, or a live price feed. Retailer pages can show different sale prices and availability; some references are sold out. Origins, grades, preparation, organic certification and packaging are not exact matches unless stated below.

Pack prices are in INR. Unlisted sizes are estimates scaled by weight and rounded to whole rupees. Multi-pack offers are used only where explicitly identified. Old crossed-out prices and savings badges were removed because the store has no verified MRP or previous selling-price list.

| Catalog item | Packs and prices | Reference and method |
| --- | --- | --- |
| California roasted almonds | 250g ₹450; 500g ₹899; 1kg ₹1,798 | [Nutraj roasted almonds](https://www.nutraj.com/collections/roasted-salted-almonds/products/nutraj-snackrite-roasted-salted-almonds): ₹539 for 2 × 150g. Estimated 500g price rounded to ₹899; other packs scaled from it. |
| Iranian Mamra almonds | 250g ₹1,695; 500g ₹3,389; 1kg ₹6,520 | [Nutraj Mamra](https://www.nutraj.com/products/nutraj-anmol-mamra-almond-kernel): ₹3,389/500g and ₹6,520 for 2 × 500g. 250g estimated. Organic certification is not established by this comparison. |
| W180 jumbo cashews | 250g ₹505; 500g ₹1,009; 1kg ₹1,889 | [Nutraj W180](https://www.nutraj.com/products/nutraj-anmol-cashew-nuts-jumbo): ₹1,009/500g and ₹1,889 for 2 × 500g; 250g estimated. |
| Roasted salted cashews | 250g ₹463; 500g ₹925; 1kg ₹1,850 | [Happilo roasted cashews](https://happilo.com/products/happilo-rosted-salted-pre-cashew-nuts): ₹370/200g, scaled by weight. |
| Iranian in-shell pistachios | 250g ₹549; 500g ₹1,098; 1kg ₹2,196 | [Nutraj Iranian pistachios](https://www.nutraj.com/collections/iranian-pistachios): ₹549/250g; larger packs estimated. |
| Shelled pistachio kernels | 200g ₹898; 400g ₹1,796; 800g ₹3,592 | [Nutraj kernels](https://www.nutraj.com/collections/pista-kernels/products/nutraj-california-pistachio-kernels): ₹898 for 2 × 100g; larger packs estimated. California kernels are a substitute benchmark, not an exact Bronte/Anatolia match. |
| Kashmiri walnut halves | 250g ₹403; 500g ₹805; 1kg ₹1,610 | [Nutraj premium walnut kernels](https://www.nutraj.com/collections/walnut-kernels): ₹805/500g; other sizes estimated. Comparable premium kernels, not in-shell walnuts. |
| Chilean walnut kernels | 250g ₹385; 500g ₹769; 1kg ₹1,538 | [Nutraj walnut kernels](https://www.nutraj.com/collections/walnut-kernels): ₹769/500g; origin is not an exact match. Other packs estimated. |
| Royal Medjool dates | 500g ₹1,045; 1kg ₹2,090; 2kg ₹4,180 | [Nutraj dates](https://www.nutraj.com/collections/dates): premium Medjool ₹1,045/500g; larger packs estimated. |
| Ajwa dates | 200g ₹280; 400g ₹559; 800g ₹1,118 | [Nutraj Ajwa](https://www.nutraj.com/collections/wet-dates): ₹699/500g, scaled to 400g and rounded, then scaled to other packs. Organic certification is not verified. |
| Long golden raisins | 250g ₹195; 500g ₹389; 1kg ₹699 | [Nutraj long raisins](https://www.nutraj.com/collections/raisins/products/long-raisin-500gm): ₹389/500g and ₹699 for 2 × 500g; 250g estimated. Long green raisins are a comparable substitute. |
| Cranberry and blueberry mix | 200g ₹355; 400g ₹709; 800g ₹1,418 | [Nutraj berry combo](https://www.nutraj.com/products/berries-combo-blueberry-cranberry-380g-pack-of-2): ₹585/330g, scaled to 400g and rounded. Other packs estimated; blend proportions may differ. |
| Omega power mix | 250g ₹374; 500g ₹748; 1kg ₹1,496 | [Farmley mixes](https://www.farmley.com/collections/dry-fruit-mixes): 7-in-1 trail mix ₹299/200g. Estimated comparable mix prices; recipe differs. |
| Belgian cacao trail mix | 225g ₹388; 450g ₹775; 900g ₹1,550 | Estimate: Farmley trail-mix benchmark scaled to 450g (~₹673), plus ~₹102 for cacao ingredients/preparation. No exact retail match. |

## Custom gifts and subscriptions

These are estimates, not externally verified market offers. Each includes an allowance for packaging and assembly; no invented comparison MRP is displayed.

| Gift | Price | Estimate basis |
| --- | --- | --- |
| Royal Heritage Chest | ₹2,299 | Four 200g contents at the catalog unit rates (~₹1,620), plus ~₹679 for chest, canisters, ribbon and assembly. |
| Imperial Brass Trio | ₹4,299 | Three 250g nut portions (~₹2,748), plus ~₹1,551 for brass jars, tray, glazing and assembly. |
| Sovereign Leatherette Hamper | ₹4,999 | Estimated 1.2kg assorted nuts (~₹2,400), honey/chocolate (~₹600), and trunk/jars/accessories (~₹1,999). Actual nut weights need merchant confirmation. |
| Noor Velvet Tray | ₹1,299 | Four 150g portions (~₹898), plus ~₹401 for tray and branding. |
| Executive Cedarwood Chest | ₹2,999 | Estimated four 200g nut portions (~₹1,620), bites (~₹250), and packaging/branding (~₹1,129). Actual weights need merchant confirmation. |
| Vitality Keepsake Duo | ₹1,099 | 250g walnuts and 250g dates (~₹925), plus ~₹174 for box and card. |

Monthly subscription estimates: Daily Vitality ₹1,704 (almonds + walnuts); Executive Reserve ₹3,299 (cashews + pistachios + dates + sample allowance); Grand Estate ₹6,525 (1kg almonds, cashews and dates plus 500g power mix). Wholesale tables now request quotes rather than presenting unverified crop-contract rates.

## Implementation

`assets/js/products-data.js` and static HTML contain INR product prices. `assets/js/pricing.js` formats money and sets the ₹100–₹4,000 retail filter. Delivery settings and percentage promotion codes are unchanged by this product-repricing task.

Both legacy USD carts and existing INR carts resolve each saved product/pack against the current catalog on load. Quantities are retained; unavailable IDs/variants are dropped instead of assigning an invented price. The legacy record is left untouched, and an explicitly emptied INR cart stays empty.

Update catalog data and static card/button values together when revising prices. Run `node scripts/verify-pricing.cjs` to check price consistency and cart calculations.
