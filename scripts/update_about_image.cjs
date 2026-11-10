const fs = require('fs');

let html = fs.readFileSync('about.html', 'utf8');

// Replace col-lg-5 with col-lg-6 for precision section
html = html.replace(
  /<div class="col-lg-5">\s*<span class="section-kicker">Precision Standards<\/span>/,
  '<div class="col-lg-6">\r\n            <span class="section-kicker">Precision Standards</span>'
);

// Replace col-lg-7 and object-fit: cover with col-lg-6 and object-fit: contain
html = html.replace(
  /<div class="col-lg-7">\s*<img src="assets\/images\/about\/about-craft-sorting\.jpg"[^>]*style="[^"]*"[^>]*>\s*<\/div>/,
  '<div class="col-lg-6 text-center">\r\n            <img src="assets/images/about/about-craft-sorting.jpg" alt="Artisans conducting visual quality check of nuts" class="rounded-4 shadow-lg img-fluid w-100" style="max-height: 560px; object-fit: contain;">\r\n          </div>'
);

fs.writeFileSync('about.html', html, 'utf8');
console.log('about.html updated successfully.');
