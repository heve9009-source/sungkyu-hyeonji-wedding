const sharp = require('sharp');

async function inspectFlower() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794543160973.jpg';
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Background color at (10, 10)
  const bgR = data[0], bgG = data[1], bgB = data[2];
  console.log(`Corner background pixel: R=${bgR}, G=${bgG}, B=${bgB}`);

  // Find bounding box of non-background pixels
  let minX = width, maxX = 0, minY = height, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Check if different from light gray background (approx 220..240)
      const diff = Math.abs(r - bgR) + Math.abs(g - bgG) + Math.abs(b - bgB);
      if (diff > 15) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  console.log(`Flower bbox: x=${minX}..${maxX} (w=${maxX - minX + 1}), y=${minY}..${maxY} (h=${maxY - minY + 1})`);
}

inspectFlower().catch(console.error);
