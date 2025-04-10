const fs = require('fs');
const path = require('path');

// Create assets directory if it doesn't exist
const assetsDir = path.join(__dirname, 'assets', 'images');
if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Assets to generate
const assets = [
    {
        name: 'space-bg',
        svg: `<svg width="1200" height="700" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
    </filter>
  </defs>
  <rect width="1200" height="700" fill="#1a1a2e"/>
  <circle cx="600" cy="175" r="120" fill="#4ecca3" opacity="0.1" filter="url(#blur)"/>
  <circle cx="900" cy="525" r="150" fill="#4ecca3" opacity="0.1" filter="url(#blur)"/>
  <circle cx="700" cy="350" r="180" fill="#4ecca3" opacity="0.1" filter="url(#blur)"/>
  <circle cx="500" cy="525" r="90" fill="#4ecca3" opacity="0.1" filter="url(#blur)"/>
  <circle cx="800" cy="175" r="105" fill="#4ecca3" opacity="0.1" filter="url(#blur)"/>
</svg>`
    },
    {
        name: 'planet',
        svg: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="#4ecca3"/>
  <circle cx="30" cy="30" r="10" fill="#1a1a2e" opacity="0.3"/>
  <circle cx="70" cy="60" r="15" fill="#1a1a2e" opacity="0.3"/>
</svg>`
    },
    {
        name: 'asteroid',
        svg: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50,10 L80,30 L70,60 L50,80 L30,60 L20,30 Z" fill="#4ecca3"/>
  <circle cx="40" cy="40" r="5" fill="#1a1a2e" opacity="0.3"/>
  <circle cx="60" cy="50" r="7" fill="#1a1a2e" opacity="0.3"/>
</svg>`
    },
    {
        name: 'star',
        svg: `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <path d="M50,10 L60,40 L90,40 L65,60 L75,90 L50,70 L25,90 L35,60 L10,40 L40,40 Z" fill="#ffffff"/>
</svg>`
    },
    {
        name: 'button',
        svg: `<svg width="400" height="120" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="380" height="100" rx="15" fill="#4ecca3"/>
</svg>`
    },
    {
        name: 'upgrade',
        svg: `<svg width="300" height="100" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="280" height="80" rx="10" fill="transparent" stroke="#4ecca3" stroke-width="4"/>
</svg>`
    },
    {
        name: 'logo',
        svg: `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#1a1a2e"/>
  <circle cx="100" cy="100" r="30" fill="#4ecca3" opacity="0.5"/>
  <circle cx="300" cy="100" r="30" fill="#4ecca3" opacity="0.5"/>
</svg>`
    }
];

// Generate SVG files
function generateSVG(name, svg) {
    const filePath = path.join(assetsDir, `${name}.svg`);
    fs.writeFileSync(filePath, svg);
    console.log(`Generated: ${name}.svg`);
}

// Generate all assets
function generateAllAssets() {
    console.log('Generating game assets...');

    for (const asset of assets) {
        generateSVG(asset.name, asset.svg);
    }

    console.log('All assets generated!');
}

// Run the generation
generateAllAssets(); 