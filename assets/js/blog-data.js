const BLOG_IMAGE_DIMENSIONS = {"soaked-vs-roasted-almonds":{"imageWidth":1672,"imageHeight":941},"luxury-dry-fruit-hampers":{"imageWidth":1672,"imageHeight":941},"storing-dry-fruits":{"imageWidth":1672,"imageHeight":941},"walnuts-and-omega-3":{"imageWidth":1672,"imageHeight":941},"baking-with-medjool-dates":{"imageWidth":1672,"imageHeight":941},"cashew-grades-explained":{"imageWidth":1672,"imageHeight":941}};
/** One editorial catalog for home cards, the journal, related posts, and article routes. */
const NATUVA_BLOGS = [
  {
    id: 'soaked-vs-roasted-almonds', legacyId: 'blog-almond-health-guide',
    title: 'Soaked vs. Roasted Almonds: The Science-Backed Daily Nutrition Guide',
    category: 'nutrition', categoryLabel: 'Nutrition Science', date: '2026-10-24',
    mainImage: 'assets/images/blog/soaked-vs-roasted-almonds.webp',
    mainAlt: 'Skin-on almonds soaking in a glass bowl beside roasted almonds in a ceramic bowl',
    excerpt: 'Compare preparation, texture, and nutrition, and discover what research does—and does not—show about soaking almonds.',
    introduction: 'Soaked almonds are softer and milder; roasted almonds bring a crisp texture and toasted aroma. Both can have a place in everyday meals. Choosing between them is primarily a question of taste, preparation, and storage, rather than a proven shortcut to better nutrient absorption.',
    sections: [
      { title: 'Two preparations, different textures', paragraphs: [
        'Soaking lets almonds take up water, changing their bite and making them easier to blend into sauces or nut-based drinks. Some people peel them afterwards; others keep the skins. Roasting uses dry heat to reduce moisture and develop a toasted flavor. Dry-roasted and oil-roasted products can also differ in added ingredients.',
        'The first gallery photo shows soaked almonds with their skins still attached. The second shows the dry, lightly toasted surface of roasted almonds. Neither appearance alone tells you the nutritional composition of a particular packaged product.'
      ] },
      { title: 'What the soaking evidence says', paragraphs: [
        'Phytate is often cited as a reason to soak nuts. A 2020 study of several nuts, including almonds, did not support claims that soaking or “activating” them improves nutrient bioavailability. Measuring phytate and mineral concentrations is also different from directly measuring how much a person absorbs.',
        'An earlier randomized almond trial examined acceptance and digestive tolerance. Its findings do not justify promising that soaking will make almonds easier for everyone to digest. These studies address specific preparations and outcomes; they do not establish one universally healthier way to eat almonds.'
      ] },
      { title: 'Nutrition: compare the actual product', paragraphs: [
        'Almonds provide fat, protein, fiber, and vitamin E. NIH lists dry-roasted almonds among food sources of vitamin E. Roasting conditions, added oil, salt, and coatings can change a finished product, so compare its ingredient list and nutrition panel rather than assuming all roasted almonds are equivalent.',
        'Soaked almonds contain extra water. Comparing equal weights of wet and dry nuts can therefore be misleading: the same serving weight may contain a different quantity of almonds. Soaking does not remove a tree-nut allergy.'
      ] },
      { title: 'Prepare and store with care', paragraphs: [
        'If you choose to soak almonds, use clean utensils and potable water, and keep the soaking container refrigerated. Soaking adds moisture; it is not a validated way to eliminate pathogens. Drain and use the almonds promptly, and keep them chilled rather than returning them to a dry pantry jar.',
        'Keep dry roasted almonds tightly closed, away from heat, moisture, and strong odors. Follow the package storage and best-before directions. Avoid treating a homemade preparation as if it had the same storage life as a commercially sealed pack.'
      ] },
      { title: 'Bring them into everyday meals', paragraphs: [
        'Blend soaked almonds into a dressing, or chop them into a breakfast bowl when a softer texture suits the dish. Roasted almonds work well over salads, yogurt, and cooked vegetables, where a small handful adds crunch. Unsalted versions are useful when you want to control seasoning yourself.',
        'Choose the preparation you enjoy and can handle appropriately. The evidence supports a more modest conclusion than “activation” marketing: soaking changes texture, roasting changes flavor, and neither format needs exaggerated clinical claims to earn its place in the kitchen.'
      ] }
    ],
    comparison: { title: 'A practical preparation comparison', columns: ['Consideration', 'Soaked almonds', 'Roasted almonds'], rows: [
      ['Preparation', 'Hydrated in water; keep refrigerated', 'Heated with or without added oil'],
      ['Texture', 'Softer and suitable for blending', 'Crisp with a toasted aroma'],
      ['Nutrition check', 'Added water affects comparisons by weight', 'Check added salt, oil, and coatings'],
      ['Storage', 'Keep chilled and use promptly', 'Keep sealed; follow pack directions']
    ] },
    gallery: [
      { src: 'assets/images/blog-details/soaked-almonds-closeup.webp', alt: 'Soaked almonds with intact skins in clear water', caption: 'Soaking changes the texture of skin-on almonds.' },
      { src: 'assets/images/blog-details/roasted-almonds-bowl.webp', alt: 'Roasted brown almonds in a cream serving bowl', caption: 'Roasted almonds bring a crisp bite and toasted flavor.' }
    ],
    sources: [
      ['Does activating nuts affect nutrient bioavailability? (2020)', 'https://pubmed.ncbi.nlm.nih.gov/32199146/'],
      ['Almond acceptance and gastrointestinal tolerance trial (2018)', 'https://pubmed.ncbi.nlm.nih.gov/28956139/'],
      ['NIH: vitamin E food sources', 'https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/'],
      ['Food safety implications of soaked-nut recipes (2024)', 'https://www.foodprotection.org/members/fpt-archive-articles/2024-01-food-safety-implications-of-online-recipes-for-preparing-soaked-nuts-and-nut-based-dairy-ana/']
    ],
    related: ['cashew-grades-explained', 'storing-dry-fruits', 'walnuts-and-omega-3'],
    cta: { title: 'Find your favorite almond preparation', text: 'Explore the almond collection and compare the ingredients and pack options.', label: 'Explore Almonds', href: 'products.html?category=almonds' }
  },
  {
    id: 'cashew-grades-explained', legacyId: 'blog-cashew-grading-guide',
    title: 'Demystifying Cashew Grades: What W180, W240, and W320 Actually Mean',
    category: 'guides', categoryLabel: 'Buyer Guides', date: '2026-10-18',
    mainImage: 'assets/images/blog/cashew-grades-explained.webp',
    mainAlt: 'Three ceramic bowls showing larger, medium, and smaller whole cashew kernels',
    excerpt: 'Learn how whole-kernel counts relate to size, and choose a cashew grade for gifting, snacking, or cooking.',
    introduction: 'W180, W240, and W320 help describe the size of whole cashew kernels. The number refers approximately to how many kernels make up a pound: fewer kernels in the same weight generally means larger individual cashews. A lower number is not, by itself, proof of better freshness, flavor, or food safety.',
    sections: [
      { title: 'Read the letter and the number together', paragraphs: [
        'W is used in the trade for white whole kernels, distinct from splits and pieces. The number is a size designation based on the approximate kernel count per pound, about 454 grams. Exact accepted count ranges and other tolerances depend on the specification used by the supplier.',
        'Think of the grade as a description of the lot rather than a promise that every pound contains exactly the printed number. Always read the supplier’s specification if an exact size range matters for a commercial order.'
      ] },
      { title: 'Compare size without confusing it with quality', paragraphs: [
        'Among these three grades, W180 usually gives the largest whole kernels, W240 falls between the two, and W320 gives smaller whole kernels. The comparison photographs illustrate relative size; they are not a calibrated measurement of a certified batch.',
        'Freshness, cleanliness, moisture control, visible damage, and packaging remain separate considerations. A sound W320 lot can be an excellent choice. Likewise, a broken kernel is not automatically an inferior ingredient when the recipe calls for chopped nuts or a blended sauce.'
      ] },
      { title: 'Match the grade to the occasion', paragraphs: [
        'Larger W180 kernels make a visible statement in open gift trays and on a tasting board. W240 offers a substantial whole cashew for snack bowls, garnishes, and mixed assortments. W320 is a practical whole-kernel option for everyday snacking and many kitchen uses.',
        'For nut butter, cashew cream, or finely chopped fillings, paying extra for a large intact shape may add little to the finished dish. Compare suitable grades and pieces on price per unit weight, then choose for the result you want.'
      ] },
      { title: 'Check before buying', paragraphs: [
        'Confirm the net weight, grade description, ingredient list, and whether the cashews are raw, roasted, salted, or flavored. For a large order, ask for a representative sample and the current lot specification. Check that the sample reflects the product you will actually receive.',
        'Uniform presentation is useful for gifts, but size alone should not decide the purchase. Intact packaging, a clear best-before date, and realistic storage instructions are equally worth checking.'
      ] },
      { title: 'Store well and buy for your needs', paragraphs: [
        'Reseal an opened pack or transfer the cashews to a clean airtight container. Keep them away from heat and moisture, following the supplier’s storage directions. Choose a pack size you can use comfortably rather than keeping a large open bag beside a warm cooker.',
        'The simplest buying rule is to select the appearance and use you need, then assess the actual product. W180, W240, and W320 are helpful size descriptions—not a universal ranking of taste or quality.'
      ] }
    ],
    comparison: { title: 'Whole cashew grades at a glance', columns: ['Grade', 'Approximate kernels per pound', 'Relative size', 'Useful for'], rows: [
      ['W180', 'About 180; specification ranges vary', 'Largest of these three', 'Presentation trays and gifts'],
      ['W240', 'About 240; specification ranges vary', 'Medium-large', 'Snack bowls and garnishes'],
      ['W320', 'About 320; specification ranges vary', 'Smaller whole kernels', 'Everyday snacking and cooking']
    ] },
    gallery: [
      { src: 'assets/images/blog-details/cashew-size-comparison.webp', alt: 'Groups of whole cashews arranged from larger to smaller', caption: 'An illustrative comparison of whole-kernel sizes.' },
      { src: 'assets/images/blog-details/cashew-grading-process.webp', alt: 'Gloved hands sorting whole cashews into grading trays', caption: 'Sorting separates cashews by size and physical condition.' }
    ],
    sources: [ ['African Cashew Alliance: kernel grades and industry guide', 'https://www.africancashewalliance.org/sites/default/files/documents/2012_rrf_cashew_brochure.pdf'] ],
    related: ['luxury-dry-fruit-hampers', 'storing-dry-fruits', 'soaked-vs-roasted-almonds'],
    cta: { title: 'Choose a cashew for your table', text: 'Compare available cashew products and pack sizes in the collection.', label: 'Explore Cashews', href: 'products.html?category=cashews' }
  },
  {
    id: 'luxury-dry-fruit-hampers', legacyId: 'blog-festive-gifting-etiquette',
    title: 'The Art of Curating Luxury Dry Fruit Hampers for Corporate & Weddings',
    category: 'gifting', categoryLabel: 'Luxury Gifting', date: '2026-10-12',
    mainImage: 'assets/images/blog/luxury-dry-fruit-hampers.webp',
    mainAlt: 'An open ribboned gift box with separate compartments of almonds, cashews, pistachios, walnuts, and dates',
    excerpt: 'Balance a thoughtful assortment with suitable packaging, clear ingredient information, and a practical event budget.',
    introduction: 'A memorable hamper starts with the recipient. Presentation matters, but so do the assortment, portion sizes, ingredient information, and the way the gift will be delivered. A considered mix of nuts and dates can feel generous without making the box unnecessarily large or complicated.',
    sections: [
      { title: 'Build an assortment with contrast', paragraphs: [
        'Combine different textures and flavors: almonds for a firm crunch, cashews for a milder bite, pistachios for contrast, walnuts for a distinctive texture, and dates for a sweet element. Select fewer varieties in useful quantities rather than many tiny portions that are difficult to identify.',
        'Ask about preferences and allergies before finalizing the assortment. Nuts are not suitable for every recipient, and coatings may contain additional allergens. Keep ingredient and allergen information with the gift, including when products are moved into decorative compartments.'
      ] },
      { title: 'Corporate gifts: consistent and easy to distribute', paragraphs: [
        'For teams and clients, prioritize a consistent specification, manageable parcel size, and a clear delivery plan. A restrained color palette and a short personal note can be more useful than oversized branding. Check your organization’s gifting rules before choosing recipients and budgets.',
        'Request a sample of the proposed box, including its closures and outer shipping protection. If delivery goes to multiple addresses, agree how recipient details, dispatch updates, and undeliverable parcels will be handled before placing the order.'
      ] },
      { title: 'Wedding and event favors', paragraphs: [
        'Choose a format that guests can carry easily and that suits the venue. Small individual boxes work well for favors, while a larger keepsake tray can accompany an invitation or family gift. Consider how long the hampers will be held before distribution and where they will be stored.',
        'Use a ribbon, sleeve, or card to echo the event colors. Confirm the spelling of names and dates on a proof before production. Keep a modest reserve for changes to the guest list instead of relying on an exact final count too early.'
      ] },
      { title: 'Packaging that protects the contents', paragraphs: [
        'Separate compartments make the assortment easier to understand and serve. Food-contact liners, sealed inner packs, and an appropriate outer box should protect the contents as well as look attractive. Decorative wood or a ribbon does not replace suitable food packaging.',
        'Ask which customization options are available for the selected hamper and quantity. Engraving, printed sleeves, and greeting cards can have different lead times and minimum quantities. The photographs are styling illustrations; confirm the actual assortment and packaging in your order.'
      ] },
      { title: 'Budget, quantities, and the final enquiry', paragraphs: [
        'Plan the total cost per recipient, including food, packaging, personalization, applicable charges, and delivery. Compare quotes on the same net quantities and service scope. Agree on the sample, artwork approval date, production window, and dispatch schedule in writing.',
        'A strong brief includes the occasion, delivery date, quantity, approximate budget, preferred assortment, and any dietary requirements. Share those details with the gifting team so they can discuss suitable options and confirm availability before you commit.'
      ] }
    ],
    gallery: [
      { src: 'assets/images/blog-details/corporate-dry-fruit-gifts.webp', alt: 'A coordinated collection of premium corporate nut and date gift boxes', caption: 'A restrained presentation for a coordinated corporate gift collection.' },
      { src: 'assets/images/blog-details/wedding-nut-date-hamper.webp', alt: 'An ivory wedding hamper with nuts, dates, and a champagne ribbon', caption: 'A wedding-inspired assortment with a soft ribbon finish.' }
    ],
    sources: [], related: ['cashew-grades-explained', 'storing-dry-fruits', 'baking-with-medjool-dates'],
    cta: { title: 'Plan a thoughtful gift collection', text: 'Tell us your occasion, quantity, delivery date, and budget to discuss the available options.', label: 'Enquire About Gifting', href: 'bulk-orders.html' }
  },
  {
    id: 'storing-dry-fruits', legacyId: 'blog-storing-dryfruits-freshness',
    title: 'How to Store Dry Fruits and Nuts to Help Prevent Rancidity in Warm Climates',
    category: 'guides', categoryLabel: 'Buyer Guides', date: '2026-09-29',
    mainImage: 'assets/images/blog/storing-dry-fruits.webp', mainAlt: 'Nuts and dates stored separately in closed glass jars on a shaded pantry shelf',
    excerpt: 'Practical ways to manage heat, moisture, and exposure to air after opening a pack of nuts or dried fruit.',
    introduction: 'A good storage routine starts with the pack instructions and the conditions in your kitchen. Warmth, moisture, and exposure to oxygen can affect nut quality. Keeping a small amount ready to use while protecting the remainder often works better than leaving a large open bag on the counter.',
    sections: [
      { title: 'Choose the storage spot carefully', paragraphs: ['Keep dry products away from the cooker, sunny windows, and damp areas. A cupboard can be convenient, but in a hot climate it may not remain cool. Follow the product’s instructions about refrigeration or freezing, especially for longer storage.', 'Storage life varies with the nut, processing method, moisture level, and packaging. There is no single shelf-life number that applies to every raw, roasted, shelled, or chopped product.'] },
      { title: 'Close the pack and control portions', paragraphs: ['Reseal the original packaging firmly, or use a clean, dry airtight container. Label transferred food with the product name and date opened, and retain the ingredient and best-before information.', 'Use clean, dry utensils and avoid topping up an old jar indefinitely. Keep foods with strong odors separate, and bring out only the quantity you need when using a chilled supply.'] },
      { title: 'Nuts and dried fruit need their own attention', paragraphs: ['Shelled and broken nuts expose more of the kernel than an intact shell protects. Dates and other dried fruits may have different moisture levels and storage directions. Do not assume one decorative mixed jar is suitable for everything.', 'Packaging that reduces oxygen can help maintain nut quality, but its effectiveness depends on the barrier and seal. After opening, the original protective environment no longer remains intact.'] },
      { title: 'Check the product before serving', paragraphs: ['Inspect a damaged or poorly sealed pack before use. Discard food showing mold or other signs of spoilage; do not try to restore it by roasting. Stale or rancid flavors are also a reason to replace a supply.', 'Buy quantities that suit your household, rotate older packs first, and check the label when conditions change. Good storage supports quality without turning a best-before date into a universal guarantee.'] }
    ],
    gallery: [
      { src: 'assets/images/project-details/nitrogen-packaging-03.webp', alt: 'Sealed nut pouches with a top seam being inspected', caption: 'A reliable seal helps protect the contents before opening.' },
      { src: 'assets/images/project-details/nitrogen-packaging-02.webp', alt: 'Illustrative gas-flush packing equipment sealing a nut pouch', caption: 'Reduced-oxygen packaging is one part of a broader storage process.' }
    ],
    sources: [ ['UC Davis: nut storage conditions', 'https://postharvest.ucdavis.edu/fr/node/7656'], ['UC Davis: packaging and nut quality', 'https://postharvest.ucdavis.edu/ask-produce-docs/can-you-give-me-information-about-map-pistachios'] ],
    related: ['soaked-vs-roasted-almonds', 'cashew-grades-explained', 'walnuts-and-omega-3'],
    cta: { title: 'Find a pack size that suits you', text: 'Explore the collection and choose a quantity you can store and enjoy comfortably.', label: 'Browse the Collection', href: 'products.html' }
  },
  {
    id: 'walnuts-and-omega-3', legacyId: 'blog-brain-boosting-walnuts',
    title: 'Walnuts and Plant Omega-3s: What the Evidence Says',
    category: 'nutrition', categoryLabel: 'Nutrition Science', date: '2026-09-21',
    mainImage: 'assets/images/blog/walnuts-and-omega-3.webp', mainAlt: 'Golden walnut halves in a cream bowl beside whole ridged walnut shells',
    excerpt: 'Understand the role of ALA in walnuts and why a resemblance to the brain is not evidence of a cognitive benefit.',
    introduction: 'The folded shape of a walnut makes an appealing visual comparison with a brain. It does not explain what the food does in the body. A more useful starting point is the walnut’s nutrient composition and the limits of research on actual health outcomes.',
    sections: [
      { title: 'ALA is a plant omega-3', paragraphs: ['Walnuts are a food source of alpha-linolenic acid, or ALA. NIH distinguishes ALA from the longer-chain omega-3 fats EPA and DHA. The body can convert some ALA, but that conversion is limited; eating walnuts is not nutritionally identical to eating a source of EPA and DHA.', 'A food can contribute useful nutrients without acting as a treatment. Consider walnuts alongside the rest of a varied eating pattern rather than as a stand-alone solution.'] },
      { title: 'Cognitive claims need clinical evidence', paragraphs: ['The two-year Walnuts and Healthy Aging trial examined walnut intake and cognitive change in older adults. It did not find an overall cognitive benefit in the full study group. Exploratory findings in subgroups require further research.', 'This is different from claiming that walnuts prevent dementia or that their shape predicts a brain benefit. Results from a particular population and study design should not be turned into a guarantee for every person.'] },
      { title: 'Use walnuts for flavor and texture', paragraphs: ['Walnut halves suit a serving board, while pieces are useful in salads, porridge, fillings, and baked dishes. A light toast changes their aroma, but watch them carefully so they do not scorch.', 'Choose a portion that fits your meal and preferences. Plain walnuts give you control over added salt or sweet coatings. They remain a tree-nut allergen in every preparation.'] },
      { title: 'Keep the conclusion proportionate', paragraphs: ['Protect an opened pack from heat and moisture and follow its storage directions. Shelled kernels need care because the protective shell has already been removed.', 'Enjoy walnuts as a flavorful food that provides ALA and other nutrients. The evidence does not support presenting them as a guaranteed brain-protective treatment.'] }
    ],
    gallery: [
      { src: 'assets/images/project-details/pahalgam-walnuts-02.webp', alt: 'Whole walnuts, a cracked shell, and golden kernel halves', caption: 'The walnut shell and its folded edible kernel.' },
      { src: 'assets/images/project-details/pahalgam-walnuts-03.webp', alt: 'Walnut halves being separated into shallow sorting trays', caption: 'Halves and smaller pieces suit different culinary uses.' }
    ],
    sources: [ ['NIH: omega-3 fatty acids', 'https://ods.od.nih.gov/factsheets/Omega3FattyAcids-Consumer/'], ['Walnuts and Healthy Aging randomized trial (2020)', 'https://pubmed.ncbi.nlm.nih.gov/31912155/'] ],
    related: ['soaked-vs-roasted-almonds', 'storing-dry-fruits', 'baking-with-medjool-dates'],
    cta: { title: 'Bring walnuts to your table', text: 'Explore walnut products and the pack options available.', label: 'Explore Walnuts', href: 'products.html?category=walnuts' }
  },
  {
    id: 'baking-with-medjool-dates', legacyId: 'blog-dates-natural-sweetener',
    title: "Baking with Nature’s Caramel: Medjool Dates as a Sugar Substitute",
    category: 'recipes', categoryLabel: 'Recipes & Baking', date: '2026-09-14',
    mainImage: 'assets/images/blog/baking-with-medjool-dates.webp', mainAlt: 'Medjool date paste and whole dates beside a sliced date-and-walnut loaf',
    excerpt: 'Make a simple date paste and learn why moisture and texture matter when adapting a baking recipe.',
    introduction: 'Medjool dates bring sweetness, body, and a caramel-like flavor to the kitchen. A smooth paste can be useful in fillings, bars, and some baked dishes. It is not a universal one-for-one replacement for dry granulated sugar, because it changes both moisture and structure.',
    sections: [
      { title: 'Start with pitted dates', paragraphs: ['Split each date and check carefully for the pit, even when preparing a small batch. Remove any stem fragments. Soft dates blend more readily; firmer fruit may need a little warm water to soften before blending.', 'For a small trial batch, use about one cup of pitted dates and add water gradually, a tablespoon at a time, until your blender can produce a thick paste. Use only as much water as the desired texture needs.'] },
      { title: 'Match the paste to the recipe', paragraphs: ['A date paste adds water and fruit solids as well as sweetness. Granulated sugar behaves differently in batters, cookies, and caramel. Replacing it by equal volume can alter spread, browning, tenderness, and the final texture.', 'Start with a recipe designed for date paste, or test a small batch before adapting a favorite. Make one adjustment at a time and write down the amount of paste and liquid used.'] },
      { title: 'Three practical uses', paragraphs: ['Spread a thick paste between layers of a nut bar, stir a little into porridge, or use it as part of a date-and-walnut loaf recipe. Chopped dates can also add pockets of sweetness without needing to change the entire recipe.', 'Pairing dates with nuts creates texture contrast, but consider allergies when serving a shared dish. Date-based sweets still contain sugars; “no refined sugar added” does not mean sugar-free.'] },
      { title: 'Store your homemade paste thoughtfully', paragraphs: ['Use clean equipment, refrigerate the paste promptly in a closed container, and make small batches. A paste with added water should not be stored like a sealed package of whole dried dates. Freeze portions if you need to keep them longer.', 'Choose dates for their flavor and the way they work in the recipe. Successful substitutions come from testing moisture and texture, not from a blanket promise of identical results or special health benefits.'] }
    ],
    gallery: [
      { src: 'assets/images/project-details/jordan-medjool-dates-02.webp', alt: 'Whole and opened Medjool dates showing their flesh and pit', caption: 'Check and remove pits before making a paste.' },
      { src: 'assets/images/project-details/jordan-medjool-dates-03.webp', alt: 'Medjool dates arranged in a shallow tray', caption: 'Whole dates can be served as they are or prepared for a recipe.' }
    ],
    sources: [], related: ['luxury-dry-fruit-hampers', 'walnuts-and-omega-3', 'storing-dry-fruits'],
    cta: { title: 'Explore dates for your next recipe', text: 'Compare the dates and pack sizes in the collection.', label: 'Explore Medjool Dates', href: 'products.html?category=dates' }
  }
].map(post => ({
  ...post,
  ...BLOG_IMAGE_DIMENSIONS[post.id],
  author: 'Natuva Editorial Team',
  readingTime: `${Math.max(1, Math.ceil([post.introduction, ...post.sections.flatMap(section => section.paragraphs)].join(' ').split(/\s+/).length / 200))} min read`
}));

// Keep the existing catalog API available without maintaining a second copy of the articles.
NATUVA_DATA.blogs = NATUVA_BLOGS;
