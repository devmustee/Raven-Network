import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const NFTS_DIR = path.resolve('public/nfts');
const TOTAL = 1000;
const BASE_COUNT = 20;

// Ensure output directory exists
if (!fs.existsSync(NFTS_DIR)) fs.mkdirSync(NFTS_DIR, { recursive: true });

// Check which base images exist
const existingBases = [];
for (let i = 1; i <= BASE_COUNT; i++) {
  const id = String(i).padStart(2, '0');
  const filePath = path.join(NFTS_DIR, `raven-nft-${id}.png`);
  if (fs.existsSync(filePath)) {
    existingBases.push(id);
  }
}
console.log(`Found ${existingBases.length} base images: ${existingBases.join(', ')}`);

if (existingBases.length === 0) {
  console.error('No base images found! Exiting.');
  process.exit(1);
}

// Generate color tint values from hue angle
function hueToRGB(hue) {
  const h = hue / 60;
  const c = 128; // tint strength
  const x = c * (1 - Math.abs(h % 2 - 1));
  let r = 0, g = 0, b = 0;
  if (h < 1)      { r = c; g = x; }
  else if (h < 2) { r = x; g = c; }
  else if (h < 3) { g = c; b = x; }
  else if (h < 4) { g = x; b = c; }
  else if (h < 5) { r = x; b = c; }
  else            { r = c; b = x; }
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b) };
}

async function generateNft(index) {
  const id = String(index + 1).padStart(3, '0');
  const outputPath = path.join(NFTS_DIR, `raven-nft-${id}.png`);

  // Skip the first 20 (base images already exist with 2-digit names)
  if (index < BASE_COUNT) {
    // Check if 3-digit version already exists or if we need to copy
    const baseId = String(index + 1).padStart(2, '0');
    const basePath = path.join(NFTS_DIR, `raven-nft-${baseId}.png`);
    if (fs.existsSync(basePath) && !fs.existsSync(outputPath)) {
      fs.copyFileSync(basePath, outputPath);
    }
    return;
  }

  // Skip if already generated
  if (fs.existsSync(outputPath)) return;

  const baseIndex = index % existingBases.length;
  const baseId = existingBases[baseIndex];
  const basePath = path.join(NFTS_DIR, `raven-nft-${baseId}.png`);

  // Deterministic transformations
  const hueShift = ((index - 19) * 23) % 360;
  const satMult = 1.0 + ((index % 4) * 0.25);
  const brightMult = 0.9 + ((index % 5) * 0.05);
  const tint = hueToRGB(hueShift);

  try {
    await sharp(basePath)
      .modulate({
        saturation: satMult,
        brightness: brightMult,
        hue: hueShift,
      })
      .tint(tint)
      .png({ quality: 85, compressionLevel: 8 })
      .toFile(outputPath);
  } catch (err) {
    console.error(`Failed to generate NFT #${id}: ${err.message}`);
  }
}

async function main() {
  console.log(`Generating ${TOTAL} NFT images...`);
  const startTime = Date.now();

  // Process in batches of 20 for memory efficiency
  const BATCH_SIZE = 20;
  for (let batch = 0; batch < Math.ceil(TOTAL / BATCH_SIZE); batch++) {
    const start = batch * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, TOTAL);
    const promises = [];
    for (let i = start; i < end; i++) {
      promises.push(generateNft(i));
    }
    await Promise.all(promises);

    const progress = Math.round((end / TOTAL) * 100);
    process.stdout.write(`\r  Progress: ${end}/${TOTAL} (${progress}%)`);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n✅ Done! Generated ${TOTAL} NFTs in ${elapsed}s`);
  console.log(`   Output: ${NFTS_DIR}`);
}

main().catch(console.error);
