/** Shared sourcing-story catalog. Photos illustrate each topic; no supplier claims are implied. */
const NATUVA_PROJECTS = [
  {
    id: 'california-almonds',
    title: 'From Central Valley to Connoisseur: Ethical Almond Cultivation',
    location: 'Central Valley, California', category: 'Almond Sourcing',
    mainImage: 'assets/images/sourcing/sourcing-california-orchards.webp',
    mainAlt: 'Rows of almond trees in a California orchard',
    description: 'Follow the almond from its protective hull to a carefully sorted kernel, and explore the questions behind responsible orchard management.',
    introduction: 'An almond begins inside a green hull, with a hard shell protecting the kernel. This Central Valley story follows that transformation and explores why harvest timing, careful handling, and thoughtful use of orchard resources matter.',
    sections: [
      { title: 'Reading the hull', text: 'As almonds mature, their outer hulls split and begin to dry. Harvest crews assess the crop before shaking mature nuts from the trees. Drying and timely collection help prepare the harvest for its next stage; the orchard image shows where this journey starts, while the gallery distinguishes the shell from the edible kernel.' },
      { title: 'From shell to sorted kernel', text: 'Hulling and shelling remove the protective layers before kernels are screened and sorted. Size, broken pieces, and visible damage are useful inspection points. The finished brown kernel still carries its thin skin, which looks quite different from the rough shell in the harvest photograph.' },
      { title: 'What responsible sourcing asks', text: 'Water management, pollinator care, and traceability are questions to ask about an orchard, rather than qualities a landscape photograph can prove. For a particular purchase, origin records and documented growing practices provide a clearer picture than broad sustainability slogans.' }
    ],
    highlights: [ ['Hull and shell', 'Two protective layers surround the almond kernel.'], ['Careful handling', 'Drying, shell removal, and sorting shape the finished lot.'], ['Traceable origin', 'Grower and lot records help explain where a harvest came from.'] ],
    gallery: [
      { src: 'assets/images/sourcing/sourcing-california-orchards.webp', alt: 'Almond orchard with rows of trees', caption: 'The almond orchard: the starting point of the harvest.' },
      { src: 'assets/images/project-details/california-almonds-02.webp', alt: 'Whole almond shells and exposed brown almond kernels', caption: 'Shell and kernel: the layers of a harvested almond.', generated: true },
      { src: 'assets/images/project-details/california-almonds-03.webp', alt: 'Almond kernels being inspected on a sorting table', caption: 'Sorting almonds for visible damage and consistency.', generated: true }
    ],
    sources: [ ['Almond Board of California: harvest', 'https://www.almonds.org/almond-industry/orchard-management/harvest/harvest-overview'], ['Almond lifecycle', 'https://www.almonds.org/why-almonds/growing-good/almond-lifecycle'] ],
    relatedProjects: ['malabar-cashews', 'kerman-pistachios', 'pahalgam-walnuts'],
    shopUrl: 'products.html?category=almonds', shopLabel: 'Explore California Almonds'
  },
  {
    id: 'malabar-cashews',
    title: 'The Monsoon Harvest: Hand-Graded Malabar W180 Cashews',
    location: 'Kerala, India', category: 'Cashew Sourcing',
    mainImage: 'assets/images/sourcing/sourcing-malabar-cashew.jpg',
    mainAlt: 'Cashew apples and attached nuts growing on a tree',
    description: 'Discover the cashew apple, the shell that protects its kernel, and the careful processing behind whole cashews.',
    introduction: 'The cashew tree presents an unusual harvest: a curved nut attached beneath a fleshy cashew apple. The tree photograph introduces that distinctive form; the finished creamy kernel only emerges after several processing stages.',
    sections: [
      { title: 'A fruit with a distinctive shape', text: 'The cashew apple and the attached nut are visibly different parts of the crop. Following the nut from the tree to the processing table explains why a ready-to-eat cashew bears little resemblance to the original harvest. The gallery pairs intact shells with kernels so both stages can be recognized.' },
      { title: 'Processing before the tasting table', text: 'Commercial cashew processing includes heat treatment, shelling, drying, peeling, and grading. Each stage requires care to recover the edible kernel while limiting breakage. The shell is removed during processing; a cashew in its shell is not the same product as a packaged kernel ready for eating.' },
      { title: 'The value of a whole kernel', text: 'Grading separates whole kernels from pieces and considers size and appearance. This W180 story focuses on large whole cashews, with a sorting image that shows whole kernels and broken pieces separately. A grade describes the product; it does not by itself establish a farm partnership or a labor certification.' }
    ],
    highlights: [ ['Cashew apple', 'The attached curved nut is the part processed for its kernel.'], ['Shelling and peeling', 'Processing reveals the familiar creamy cashew shape.'], ['Whole and broken', 'Grading distinguishes intact kernels from useful smaller pieces.'] ],
    gallery: [
      { src: 'assets/images/sourcing/sourcing-malabar-cashew.jpg', alt: 'Cashew apples with curved nuts on the tree', caption: 'The cashew apple and its attached nut before processing.' },
      { src: 'assets/images/project-details/malabar-cashews-02.webp', alt: 'Cashews in shell beside creamy shelled cashew kernels', caption: 'From an intact cashew shell to the edible kernel.', generated: true },
      { src: 'assets/images/project-details/malabar-cashews-03.webp', alt: 'Whole cashews and broken pieces in separate grading trays', caption: 'Grading whole cashew kernels and separating pieces.', generated: true }
    ],
    sources: [ ['Global Cashew Council: processing', 'https://www.cashews.org/cashew-industry/processing/'] ],
    relatedProjects: ['california-almonds', 'kerman-pistachios', 'nitrogen-packaging'],
    shopUrl: 'products.html?category=cashews', shopLabel: 'Explore Malabar Cashews'
  },
  {
    id: 'kerman-pistachios',
    title: 'Ancient Groves of Kerman: Natural Sun-Opened Pistachios',
    location: 'Kerman Plateau, Iran', category: 'Pistachio Sourcing',
    mainImage: 'assets/images/sourcing/sourcing-iranian-pistachio.jpg',
    mainAlt: 'Clusters of pistachios growing among leaves on a tree',
    description: 'Look closely at pistachio clusters, their outer hulls, and the split shells that reveal green kernels.',
    introduction: 'Pistachios grow in clusters, each kernel enclosed by a shell and an outer hull. This Kerman story connects the colorful fruit on the branch with the pale split shells and green kernels familiar at the table.',
    sections: [
      { title: 'Clusters before the shell', text: 'On the tree, the outer hull hides the shell beneath it. Shell splitting is associated with nut development and maturity; a photograph alone cannot establish a precise temperature or altitude behind it. The title celebrates naturally opened pistachios without treating sunlight as a complete explanation of the process.' },
      { title: 'Hulling and drying', text: 'After harvest, hulling and drying are important steps in handling pistachios. Prompt, careful processing helps manage quality risks, while sorting separates visibly damaged nuts and different shell conditions. The harvest-sorting illustration shows why freshly picked fruit looks different from cleaned in-shell pistachios.' },
      { title: 'Protecting the green kernel', text: 'The shell and kernel photograph highlights the contrast between a pale exterior and the green interior. Storage conditions matter after processing: heat, moisture, and oxygen can affect quality. Follow the storage instructions on the purchased pack rather than assuming that every pistachio lot has the same keeping time.' }
    ],
    highlights: [ ['Clustered harvest', 'Outer hulls surround the shells on the branch.'], ['Distinct stages', 'Hulling, drying, and sorting prepare the nuts for packing.'], ['Storage matters', 'Temperature, moisture, and packaging all affect quality.'] ],
    gallery: [
      { src: 'assets/images/sourcing/sourcing-iranian-pistachio.jpg', alt: 'Pistachio clusters on a leafy branch', caption: 'Pistachios on the tree, still enclosed by their outer hulls.' },
      { src: 'assets/images/project-details/kerman-pistachios-02.webp', alt: 'Split pistachio shells and loose green kernels', caption: 'Pale shells and the green pistachio kernels within.', generated: true },
      { src: 'assets/images/project-details/kerman-pistachios-03.webp', alt: 'Freshly harvested pistachios being sorted into trays', caption: 'Sorting harvested pistachios through different processing stages.', generated: true }
    ],
    sources: [ ['UC Davis: pistachio handling', 'https://postharvest.ucdavis.edu/produce-facts-sheets/pistachio'] ],
    relatedProjects: ['california-almonds', 'pahalgam-walnuts', 'nitrogen-packaging'],
    shopUrl: 'products.html?category=pistachios', shopLabel: 'Explore Iranian Pistachios'
  },
  {
    id: 'pahalgam-walnuts',
    title: 'High Altitude Walnuts: Snow-Fed Orchards of Pahalgam',
    location: 'Pahalgam, Kashmir', category: 'Walnut Sourcing',
    mainImage: 'assets/images/sourcing/sourcing-kashmir-walnuts.jpg',
    mainAlt: 'Green walnuts growing on a leafy walnut tree',
    description: 'Trace the walnut from its green hull to its ridged shell and delicate, carefully sorted kernel halves.',
    introduction: 'A walnut on the branch is wrapped in a green hull, concealing the ridged shell and folded kernel. This Pahalgam story follows those layers and the handling that helps preserve the shape of a walnut half.',
    sections: [
      { title: 'Inside the green hull', text: 'The green covering on a walnut tree is different from the hard brown shell found at the table. After harvesting, hulling removes that outer layer and drying prepares the in-shell crop for further handling. The tree photograph and cracked-shell illustration make the transition easy to see.' },
      { title: 'Cracking without losing the halves', text: 'Shelling exposes the delicate folded kernel. Careful separation helps recover larger halves while smaller pieces remain useful for baking and cooking. The sorting illustration shows these physical distinctions, rather than implying a verified hand-processing method at a named farm.' },
      { title: 'Care after shelling', text: 'Once the shell is removed, walnut kernels are more exposed to oxygen and handling damage. Packaging and suitable storage help protect their quality. Color and size can differ among lots, so the origin title should not be read as a guarantee of snow irrigation, a particular farming method, or an identical kernel shade.' }
    ],
    highlights: [ ['Three visible layers', 'Green hull, hard shell, and folded edible kernel.'], ['Halves and pieces', 'Careful shelling helps preserve the walnut shape.'], ['Protected kernels', 'Packaging and storage matter after the shell is removed.'] ],
    gallery: [
      { src: 'assets/images/sourcing/sourcing-kashmir-walnuts.jpg', alt: 'Walnuts in green hulls hanging on a tree', caption: 'Walnuts growing inside their protective green hulls.' },
      { src: 'assets/images/project-details/pahalgam-walnuts-02.webp', alt: 'Whole walnut shells, a cracked shell, and walnut halves', caption: 'The ridged shell and folded walnut kernel.', generated: true },
      { src: 'assets/images/project-details/pahalgam-walnuts-03.webp', alt: 'Walnut halves being sorted into shallow wooden trays', caption: 'Separating walnut halves during a sorting stage.', generated: true }
    ],
    sources: [ ['UC Davis: walnut harvesting and processing', 'https://fruitsandnuts.ucdavis.edu/walnut-harvesting-processing'], ['UC Davis: walnut quality', 'https://news.plantsciences.ucdavis.edu/news/crisosto-lampinen-walnuts'] ],
    relatedProjects: ['kerman-pistachios', 'jordan-medjool-dates', 'california-almonds'],
    shopUrl: 'products.html?category=walnuts', shopLabel: 'Explore Kashmiri Walnuts'
  },
  {
    id: 'jordan-medjool-dates',
    title: 'Sun-Drenched Medjool Palms: The Fruit of Kings',
    location: 'Jordan Valley', category: 'Date Sourcing',
    mainImage: 'assets/images/sourcing/sourcing-jordan-medjool.jpg',
    mainAlt: 'Bunches of dates growing beneath palm fronds',
    description: 'Explore date palms, the texture of harvested Medjool dates, and thoughtful presentation from harvest basket to serving tray.',
    introduction: 'Date palms carry their fruit in hanging bunches beneath the fronds. This Jordan Valley story stays with that fruit throughout: on the palm, gathered after harvest, and arranged in a simple premium tray.',
    sections: [
      { title: 'From palm to harvest basket', text: 'The main photograph places dates in their growing context. A harvested date has a very different appearance from a bunch high in the palm canopy. Looking at both views connects the fruit at the table to the plant, without using the landscape to claim a particular farm relationship.' },
      { title: 'Recognizing a Medjool date', text: 'The gallery focuses on the oblong form, brown wrinkled skin, and flesh surrounding the elongated pit. Whole dates may still contain pits; check the pack description and remove any pit before serving. The close-up is an illustration of the fruit, not a promise that every date has identical size or appearance.' },
      { title: 'A considered presentation', text: 'A shallow tray keeps individual dates visible and makes sharing easy. For a gift or tasting selection, check whether the dates are whole or pitted and follow the package storage guidance. The final gallery image shows dates alone, keeping this story distinct from the nut orchards and mixed-nut packaging journey.' }
    ],
    highlights: [ ['Palm-grown fruit', 'Date bunches form beneath the palm fronds.'], ['Skin, flesh, and pit', 'Whole dates need checking before they are served.'], ['Ready to share', 'A simple tray highlights the fruit without mixing in other crops.'] ],
    gallery: [
      { src: 'assets/images/sourcing/sourcing-jordan-medjool.jpg', alt: 'Date bunches growing on a palm', caption: 'Date palms and their hanging bunches of fruit.' },
      { src: 'assets/images/project-details/jordan-medjool-dates-02.webp', alt: 'Harvested brown Medjool dates in a basket', caption: 'A close view of harvested Medjool dates.', generated: true },
      { src: 'assets/images/project-details/jordan-medjool-dates-03.webp', alt: 'Medjool dates arranged individually in a presentation tray', caption: 'Dates arranged for a considered serving or gift presentation.', generated: true }
    ],
    sources: [],
    relatedProjects: ['pahalgam-walnuts', 'malabar-cashews', 'nitrogen-packaging'],
    shopUrl: 'products.html?category=dates', shopLabel: 'Explore Medjool Dates'
  },
  {
    id: 'nitrogen-packaging',
    title: 'Zero Oxidation Promise: Nitrogen Flushing Science',
    location: 'San Francisco Atelier', category: 'Freshness & Packaging',
    mainImage: 'assets/images/sourcing/sourcing-nitrogen-packaging.jpg',
    mainAlt: 'A premium selection of mixed nuts and dry fruits',
    description: 'Understand how lowering oxygen during packing can help protect nuts, and why the seal and storage conditions still matter.',
    introduction: 'Freshness continues to matter after sorting and roasting. This packaging story starts with mixed nuts and explains nitrogen flushing: a way of reducing oxygen inside a pack before it is sealed. The story title is an aspiration, not a guarantee of zero oxidation.',
    sections: [
      { title: 'Why reduce oxygen?', text: 'Exposure to oxygen can contribute to rancidity in the oils within nuts. Replacing some of the air in a package with food-grade nitrogen can help delay that deterioration. It does not make a product immune to change, and the result depends on the product and how it is packed and stored.' },
      { title: 'Flushing and sealing', text: 'A gas-flush process introduces nitrogen into the package before the opening is sealed. The illustrative image shows a packing station and pouch; it is not a photograph of a verified Natuva production line. Nitrogen is invisible, and the effectiveness of a process cannot be judged from its appearance alone.' },
      { title: 'The complete freshness picture', text: 'A suitable barrier package and a sound seal help maintain the intended environment. Temperature and moisture control remain important alongside reduced oxygen. Follow the storage and best-before information on the actual pack: this article does not establish a guaranteed shelf life, a certification, or a laboratory result for any Natuva lot.' }
    ],
    highlights: [ ['Lower oxygen exposure', 'Nitrogen flushing can help delay oxidative deterioration.'], ['Seal integrity', 'A closed pack needs a suitable barrier and a reliable seal.'], ['Storage still counts', 'Temperature and moisture affect quality alongside packaging.'] ],
    gallery: [
      { src: 'assets/images/sourcing/sourcing-nitrogen-packaging.jpg', alt: 'Mixed dry fruits and nuts before packaging', caption: 'Mixed nuts and dry fruits: the product at the center of the process.' },
      { src: 'assets/images/project-details/nitrogen-packaging-02.webp', alt: 'Illustration of a gas-flush sealer packing a pouch of nuts', caption: 'An illustrative nitrogen-flushing and sealing station.', generated: true },
      { src: 'assets/images/project-details/nitrogen-packaging-03.webp', alt: 'Sealed nut pouches with a gloved hand inspecting a top seam', caption: 'Checking a sealed pouch as part of packaging inspection.', generated: true }
    ],
    sources: [ ['UC Davis: modified-atmosphere packaging for nuts', 'https://postharvest.ucdavis.edu/ask-produce-docs/can-you-give-me-information-about-map-pistachios'] ],
    relatedProjects: ['california-almonds', 'malabar-cashews', 'jordan-medjool-dates'],
    shopUrl: 'products.html', shopLabel: 'Explore the Nut Collection'
  }
].map(story => ({
  ...story,
  readingTime: `${Math.max(1, Math.ceil([story.introduction, ...story.sections.map(section => section.text)].join(' ').split(/\s+/).length / 200))} min read`
}));
