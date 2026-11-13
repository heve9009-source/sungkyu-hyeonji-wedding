const sharp = require('sharp');
const fs = require('fs');

async function testExtraction() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const img = sharp(imgPath);
  const metadata = await img.metadata();
  const { width, height } = metadata;

  // Let's inspect the white background vs objects.
  // The background is pure white or near white (r > 248, g > 248, b > 248).
  // Notice the camera, stars, and film borders are significantly darker or shaded.
  // In the camera LCD: pure white.
  // In the film centers: slightly textured off-white with crosshair.
  
  // Let's do flood-fill or mask generation:
  // Background starts from border edges (0,0), (width-1, 0), etc.
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  
  // Let's create an alpha mask:
  // 1. Flood fill from outer borders to find outer white background
  const visited = new Uint8Array(width * height);
  const isOuterBg = new Uint8Array(width * height);
  const queue = [];

  function isWhiteLike(idx) {
    const r = data[idx];
    const g = data[idx+1];
    const b = data[idx+2];
    return r > 240 && g > 240 && b > 240;
  }

  // Push all perimeter pixels that are white-like
  for (let x = 0; x < width; x++) {
    const topIdx = (0 * width + x) * 4;
    if (isWhiteLike(topIdx)) { queue.push(x, 0); visited[x] = 1; isOuterBg[x] = 1; }
    const botIdx = ((height - 1) * width + x) * 4;
    const botOffset = (height - 1) * width + x;
    if (isWhiteLike(botIdx)) { queue.push(x, height - 1); visited[botOffset] = 1; isOuterBg[botOffset] = 1; }
  }
  for (let y = 0; y < height; y++) {
    const leftIdx = (y * width + 0) * 4;
    const leftOffset = y * width + 0;
    if (isWhiteLike(leftIdx) && !visited[leftOffset]) { queue.push(0, y); visited[leftOffset] = 1; isOuterBg[leftOffset] = 1; }
    const rightIdx = (y * width + (width - 1)) * 4;
    const rightOffset = y * width + (width - 1);
    if (isWhiteLike(rightIdx) && !visited[rightOffset]) { queue.push(width - 1, y); visited[rightOffset] = 1; isOuterBg[rightOffset] = 1; }
  }

  // BFS
  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const neighbors = [
      [cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]
    ];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nOffset = ny * width + nx;
        if (!visited[nOffset]) {
          visited[nOffset] = 1;
          const nIdx = nOffset * 4;
          if (isWhiteLike(nIdx)) {
            isOuterBg[nOffset] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  console.log(`Flood fill completed. Outer white pixels: ${queue.length / 2}`);

  // Now create transparent cutout image
  const outBuf = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = y * width + x;
      const idx = offset * 4;
      if (isOuterBg[offset]) {
        outBuf[idx + 3] = 0; // Transparent
      }
    }
  }

  await sharp(outBuf, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/test_cutout_bg.png');

  console.log('Saved test_cutout_bg.png');
}

testExtraction().catch(console.error);
