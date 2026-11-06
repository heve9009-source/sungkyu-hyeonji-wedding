import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputImagePath = 'public/images/stickers.jpg';
const outputDir = 'public/images/stickers';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function processStickers() {
  const image = sharp(inputImagePath);
  const metadata = await image.metadata();
  const imgW = metadata.width || 1000;
  const imgH = metadata.height || 1500;

  console.log(`Input Image Dimensions: ${imgW}x${imgH}`);

  // Relative bounding boxes (left%, top%, width%, height%)
  const STICKER_BOXES = {
    bow: { left: 0.42, top: 0.08, width: 0.16, height: 0.05 },
    'champagne-tower': { left: 0.08, top: 0.09, width: 0.28, height: 0.24 },
    'white-bouquet': { left: 0.38, top: 0.13, width: 0.21, height: 0.23 },
    cake: { left: 0.58, top: 0.10, width: 0.33, height: 0.28 },
    letter: { left: 0.08, top: 0.34, width: 0.23, height: 0.20 },
    shoes: { left: 0.31, top: 0.35, width: 0.18, height: 0.20 },
    perfume: { left: 0.50, top: 0.38, width: 0.20, height: 0.17 },
    'details-oval': { left: 0.70, top: 0.38, width: 0.22, height: 0.17 },
    'ribbon-flutes': { left: 0.08, top: 0.54, width: 0.25, height: 0.23 },
    'yellow-flower': { left: 0.46, top: 0.60, width: 0.13, height: 0.17 },
    'ring-box': { left: 0.62, top: 0.56, width: 0.15, height: 0.15 },
    'pink-bouquet': { left: 0.10, top: 0.75, width: 0.28, height: 0.22 },
    polaroid: { left: 0.56, top: 0.78, width: 0.26, height: 0.18 },
    'single-flower': { left: 0.80, top: 0.86, width: 0.12, height: 0.11 },
  };

  for (const [name, box] of Object.entries(STICKER_BOXES)) {
    const cropLeft = Math.floor(box.left * imgW);
    const cropTop = Math.floor(box.top * imgH);
    const cropWidth = Math.floor(box.width * imgW);
    const cropHeight = Math.floor(box.height * imgH);

    // Extract region and get raw RGBA buffer
    const croppedBuffer = await image
      .clone()
      .extract({ left: cropLeft, top: cropTop, width: cropWidth, height: cropHeight })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { data, info } = croppedBuffer;
    const { width, height, channels } = info;

    // Chroma-keying out the background ivory color (#F6F4EC)
    // Ivory color range: R: ~235-255, G: ~230-255, B: ~220-250 with small diff
    for (let i = 0; i < data.length; i += channels) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Check if pixel is close to background ivory paper color
      const isIvoryBg =
        r >= 225 &&
        g >= 220 &&
        b >= 205 &&
        Math.abs(r - g) < 18 &&
        Math.abs(g - b) < 22 &&
        Math.abs(r - b) < 28;

      if (isIvoryBg) {
        data[i + 3] = 0; // Set Alpha to 0 (Transparent)
      }
    }

    // Save transparent PNG file
    const outputPath = path.join(outputDir, `${name}.png`);
    await sharp(data, {
      raw: {
        width,
        height,
        channels,
      },
    })
      .png()
      .toFile(outputPath);

    console.log(`Saved transparent sticker: ${outputPath}`);
  }
}

processStickers().catch(console.error);
