import sharp from 'sharp';

async function detailedCheck() {
  const image = sharp('public/images/journal_template.png');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Let's inspect where the white embossed frame begins and ends
  // Paper background around y=150, x=100 is:
  const pIdx = (150 * width + 100) * 4;
  console.log(`Paper pixel sample: R=${data[pIdx]} G=${data[pIdx+1]} B=${data[pIdx+2]}`);

  // Scan row by row between y=160 and y=430 to see the exact bounding box of the inner black photo
  let minX = 999, maxX = -1, minY = 999, maxY = -1;
  for (let y = 160; y < 450; y++) {
    for (let x = 110; x < 350; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // Dark photo border/background
      if (r < 80 && g < 80 && b < 80) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  console.log(`Inner photo box: x=${minX} to ${maxX} (w=${maxX - minX}), y=${minY} to ${maxY} (h=${maxY - minY})`);

  // Let's also check the frame box (the embossed white border)
  // Outside the photo is white frame (usually brighter than paper or has relief edges)
}

detailedCheck();
