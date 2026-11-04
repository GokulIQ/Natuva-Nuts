const fs = require('fs');
const path = require('path');

const workspace = path.resolve(__dirname, '..');
const htmlFiles = fs.readdirSync(workspace).filter(f => f.endsWith('.html'));

console.log(`Total HTML files found in root: ${htmlFiles.length}`);

const brokenLinks = [];
const brokenAssets = [];
const sectionCounts = {};
const forbiddenPages = [];

htmlFiles.forEach(fname => {
  const filePath = path.join(workspace, fname);
  const content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('services.html') || content.includes('service-details.html')) {
    forbiddenPages.push(fname);
  }

  // Count sections
  const sections = (content.match(/<section\b[^>]*>/gi) || []).length;
  sectionCounts[fname] = sections;

  // Extract links
  const hrefMatches = content.matchAll(/<(?:a|link)\b[^>]*?\bhref=["']([^"']+)["']/gi);
  for (const match of hrefMatches) {
    const href = match[1].trim();
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      continue;
    }
    const cleanHref = href.split('#')[0].split('?')[0];
    if (cleanHref) {
      const targetPath = path.normalize(path.join(workspace, cleanHref));
      if (!fs.existsSync(targetPath)) {
        brokenLinks.push({ srcFile: fname, link: href, target: targetPath });
      }
    }
  }

  // Extract assets
  const srcMatches = content.matchAll(/<(?:img|script|source)\b[^>]*?\b(?:src|srcset)=["']([^"']+)["']/gi);
  for (const match of srcMatches) {
    const src = match[1].trim();
    if (!src || src.startsWith('data:') || src.startsWith('http')) {
      continue;
    }
    const cleanSrc = src.split('#')[0].split('?')[0].split(' ')[0];
    if (cleanSrc) {
      const targetPath = path.normalize(path.join(workspace, cleanSrc));
      if (!fs.existsSync(targetPath)) {
        brokenAssets.push({ srcFile: fname, asset: src, target: targetPath });
      }
    }
  }
});

console.log("\n================ QUALITY AUDIT REPORT ================");
console.log("1. SECTION COUNTS (Mandatory Rule: Maximum 7 major content sections per page):");
let allSectionsPass = true;
Object.keys(sectionCounts).sort().forEach(fname => {
  const count = sectionCounts[fname];
  const status = count === 7 ? "PASS (EXACTLY 7)" : (count < 7 ? "PASS (<7)" : "FAIL (>7)");
  if (count > 7) allSectionsPass = false;
  console.log(`   - ${fname.padEnd(22)}: ${count} sections -> [${status}]`);
});

console.log(`\n2. FORBIDDEN SERVICE PAGES CHECK (Must be 0):`);
console.log(`   - Total violations: ${forbiddenPages.length}`);
if (forbiddenPages.length > 0) {
  forbiddenPages.forEach(f => console.log(`     * Found in ${f}`));
} else {
  console.log("   - PASS: No references to services.html or service-details.html");
}

console.log(`\n3. BROKEN INTERNAL LINKS CHECK:`);
console.log(`   - Total broken internal links: ${brokenLinks.length}`);
if (brokenLinks.length > 0) {
  brokenLinks.forEach(({ srcFile, link, target }) => console.log(`     * ${srcFile} -> ${link} (missing: ${target})`));
} else {
  console.log("   - PASS: All internal navigation links resolve successfully.");
}

console.log(`\n4. BROKEN ASSETS CHECK (Images, Scripts, Styles):`);
console.log(`   - Total broken assets: ${brokenAssets.length}`);
if (brokenAssets.length > 0) {
  brokenAssets.forEach(({ srcFile, asset, target }) => console.log(`     * ${srcFile} -> ${asset} (missing: ${target})`));
} else {
  console.log("   - PASS: All referenced local media and script assets exist.");
}

// Check products-data.js image references
console.log(`\n5. PRODUCTS-DATA.JS ASSET AUDIT:`);
const prodDataFile = path.join(workspace, 'assets', 'js', 'products-data.js');
if (fs.existsSync(prodDataFile)) {
  const jsContent = fs.readFileSync(prodDataFile, 'utf8');
  const imgMatches = jsContent.matchAll(/["'](assets\/images\/[^"']+\.(?:webp|jpg|png|svg))["']/g);
  const imgRefs = new Set();
  for (const m of imgMatches) {
    imgRefs.add(m[1]);
  }
  const missingJsImgs = [];
  for (const imgRel of imgRefs) {
    const fullP = path.normalize(path.join(workspace, imgRel));
    if (!fs.existsSync(fullP)) {
      missingJsImgs.push(imgRel);
    }
  }
  console.log(`   - Unique image references in products-data.js: ${imgRefs.size}`);
  console.log(`   - Missing image files: ${missingJsImgs.length}`);
  if (missingJsImgs.length > 0) {
    missingJsImgs.forEach(m => console.log(`     * Missing: ${m}`));
  } else {
    console.log("   - PASS: All JS product catalog images exist on disk.");
  }
}

console.log("======================================================");
