/**
 * generate-icons.js
 * Generates PWA icons at all required sizes from a base SVG.
 * Run with: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

const sizes = [192, 256, 384, 512];
const outputDir = path.join(__dirname, '..', 'public', 'icons');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

sizes.forEach((size) => {
  const padding = Math.round(size * 0.15);
  const fontSize = Math.round(size * 0.42);
  const x = Math.round(size * 0.12);
  const y = Math.round(size * 0.67);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#000900"/>
  <text
    x="${x}"
    y="${y}"
    font-family="'Courier New', Courier, monospace"
    font-size="${fontSize}"
    fill="#00ff41"
    font-weight="bold"
  >&gt;_</text>
</svg>`;

  const svgPath = path.join(outputDir, `icon-${size}x${size}.svg`);
  const pngPath = path.join(outputDir, `icon-${size}x${size}.png`);

  // Save SVG (used as fallback and for verification)
  fs.writeFileSync(svgPath, svg, 'utf8');
  console.log(`✓ Created ${path.basename(svgPath)}`);
});

console.log('\n⚠  SVG icons created. To generate PNGs, install sharp:');
console.log('   npm install sharp --save-dev');
console.log('   Then run: node scripts/generate-icons.js --png\n');

// If --png flag and sharp is available
if (process.argv.includes('--png')) {
  try {
    const sharp = require('sharp');
    const tasks = sizes.map((size) => {
      const svgPath = path.join(outputDir, `icon-${size}x${size}.svg`);
      const pngPath = path.join(outputDir, `icon-${size}x${size}.png`);
      return sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(pngPath)
        .then(() => console.log(`✓ PNG: icon-${size}x${size}.png`));
    });
    Promise.all(tasks).then(() => console.log('\n✅ All PNG icons generated!'));
  } catch (e) {
    console.error('❌ sharp not found. Install it with: npm install sharp --save-dev');
  }
}
