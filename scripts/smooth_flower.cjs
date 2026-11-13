const sharp = require('sharp');
const fs = require('fs');

async function smoothFlower() {
  const flowerImgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794543160973.jpg';

  const fRaw = await sharp(flowerImgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const fW = fRaw.info.width, fH = fRaw.info.height;
  const fData = fRaw.data;

  // Flood fill gray background
  const fVisited = new Uint8Array(fW * fH);
  const fQueue = [];
  function isFlowerBg(x, y) {
    if (x < 0 || x >= fW || y < 0 || y >= fH) return false;
    const idx = (y * fW + x) * 4;
    const r = fData[idx], g = fData[idx+1], b = fData[idx+2];
    return Math.abs(r - 229) < 14 && Math.abs(g - 229) < 14 && Math.abs(b - 229) < 14;
  }
  for (let x = 0; x < fW; x++) {
    if (isFlowerBg(x, 0)) { fQueue.push(x, 0); fVisited[x] = 1; }
    const bOff = (fH - 1) * fW + x;
    if (isFlowerBg(x, fH - 1)) { fQueue.push(x, fH - 1); fVisited[bOff] = 1; }
  }
  for (let y = 0; y < fH; y++) {
    const lOff = y * fW;
    if (isFlowerBg(0, y) && !fVisited[lOff]) { fQueue.push(0, y); fVisited[lOff] = 1; }
    const rOff = y * fW + (fW - 1);
    if (isFlowerBg(fW - 1, y) && !fVisited[rOff]) { fQueue.push(fW - 1, y); fVisited[rOff] = 1; }
  }
  let fHead = 0;
  while (fHead < fQueue.length) {
    const cx = fQueue[fHead++];
    const cy = fQueue[fHead++];
    const nbs = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
    for (const [nx, ny] of nbs) {
      if (nx >= 0 && nx < fW && ny >= 0 && ny < fH) {
        const off = ny * fW + nx;
        if (!fVisited[off] && isFlowerBg(nx, ny)) {
          fVisited[off] = 1;
          fQueue.push(nx, ny);
        }
      }
    }
  }

  const flowerBuf = Buffer.from(fData);
  for (let y = 0; y < fH; y++) {
    for (let x = 0; x < fW; x++) {
      const off = y * fW + x;
      if (fVisited[off]) flowerBuf[off * 4 + 3] = 0;
    }
  }

  // Smooth the alpha channel with a 1.2px Gaussian blur to anti-alias the contour
  const fBox = { left: 105, top: 225, width: 318, height: 740 };
  const flowerCropped = await sharp(flowerBuf, { raw: { width: fW, height: fH, channels: 4 } })
    .extract(fBox)
    .png()
    .toBuffer();

  // Extract alpha, blur slightly, composite back
  const alphaMask = await sharp(flowerCropped)
    .extractChannel(3)
    .blur(1.2)
    .toBuffer();

  const smoothedFlower = await sharp(flowerCropped)
    .joinChannel(alphaMask)
    .png()
    .toBuffer();

  await sharp(smoothedFlower)
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/smoothed_flower.png');

  console.log('Saved smoothed_flower.png');
}

smoothFlower().catch(console.error);
