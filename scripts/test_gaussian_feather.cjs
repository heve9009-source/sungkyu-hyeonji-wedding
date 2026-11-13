const sharp = require('sharp');
const fs = require('fs');

async function testGaussianFeather() {
  const templateImgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const flowerImgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794543160973.jpg';
  const greenCanvasPath = 'public/images/green_canvas_texture.jpg';

  const W = 576, H = 1024;

  // 1. Load and process flower with clean soft edge
  const fRaw = await sharp(flowerImgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const fW = fRaw.info.width, fH = fRaw.info.height;
  const fData = fRaw.data;

  const fVisited = new Uint8Array(fW * fH);
  const fQueue = [];
  function isFlowerBg(x, y) {
    if (x < 0 || x >= fW || y < 0 || y >= fH) return false;
    const idx = (y * fW + x) * 4;
    const r = fData[idx], g = fData[idx+1], b = fData[idx+2];
    return Math.abs(r - 229) < 15 && Math.abs(g - 229) < 15 && Math.abs(b - 229) < 15;
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

  // Crop flower
  const fBox = { left: 105, top: 225, width: 318, height: 740 };
  const flowerCropped = await sharp(flowerBuf, { raw: { width: fW, height: fH, channels: 4 } })
    .extract(fBox)
    .png()
    .toBuffer();

  const flowerW = 205;
  const flowerH = Math.round((740 / 318) * flowerW); // 477
  const flowerResized = await sharp(flowerCropped)
    .resize(flowerW, flowerH, { fit: 'contain' })
    .png()
    .toBuffer();

  // 2. Process Camera & Films
  const tRaw = await sharp(templateImgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const tData = Buffer.from(tRaw.data);

  // Clear Camera LCD (x: 74..315, y: 101..281)
  for (let y = 101; y <= 281; y++) {
    for (let x = 74; x <= 315; x++) tData[(y * W + x) * 4 + 3] = 0;
  }
  // Clear Film 1 inner (x: 257..555, y: 400..612)
  for (let y = 400; y <= 612; y++) {
    for (let x = 257; x <= 555; x++) tData[(y * W + x) * 4 + 3] = 0;
  }
  // Clear Film 2 inner (x: 139..437, y: 724..936)
  for (let y = 724; y <= 936; y++) {
    for (let x = 139; x <= 437; x++) tData[(y * W + x) * 4 + 3] = 0;
  }
  // Remove all stars on left (x: 0..240, y: 320..670)
  for (let y = 320; y <= 670; y++) {
    for (let x = 0; x <= 240; x++) tData[(y * W + x) * 4 + 3] = 0;
  }

  // Flood fill outer white
  const tVisited = new Uint8Array(W * H);
  const tQueue = [];
  function isTemplateBg(x, y) {
    if (x < 0 || x >= W || y < 0 || y >= H) return false;
    const idx = (y * W + x) * 4;
    const r = tData[idx], g = tData[idx+1], b = tData[idx+2];
    return (r > 230 && g > 230 && b > 230);
  }
  for (let x = 0; x < W; x++) {
    if (isTemplateBg(x, 0)) { tQueue.push(x, 0); tVisited[x] = 1; }
    const bOff = (H - 1) * W + x;
    if (isTemplateBg(x, H - 1)) { tQueue.push(x, H - 1); tVisited[bOff] = 1; }
  }
  for (let y = 0; y < H; y++) {
    const lOff = y * W;
    if (isTemplateBg(0, y) && !tVisited[lOff]) { tQueue.push(0, y); tVisited[lOff] = 1; }
    const rOff = y * W + (W - 1);
    if (isTemplateBg(W - 1, y) && !tVisited[rOff]) { tQueue.push(W - 1, y); tVisited[rOff] = 1; }
  }
  let tHead = 0;
  while (tHead < tQueue.length) {
    const cx = tQueue[tHead++];
    const cy = tQueue[tHead++];
    const nbs = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
    for (const [nx, ny] of nbs) {
      if (nx >= 0 && nx < W && ny >= 0 && ny < H) {
        const off = ny * W + nx;
        if (!tVisited[off] && isTemplateBg(nx, ny)) {
          tVisited[off] = 1;
          tQueue.push(nx, ny);
        }
      }
    }
  }
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const off = y * W + x;
      if (tVisited[off]) tData[off * 4 + 3] = 0;
    }
  }

  // Sprockets
  function clearSprocketsExact(y1, y2, x1, x2) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        const idx = (y * W + x) * 4;
        const r = tData[idx], g = tData[idx+1], b = tData[idx+2];
        if (r > 175 && g > 165 && b > 150) tData[idx + 3] = 0;
      }
    }
  }
  clearSprocketsExact(364, 392, 248, 568);
  clearSprocketsExact(620, 648, 248, 568);
  clearSprocketsExact(684, 712, 125, 450);
  clearSprocketsExact(944, 972, 125, 450);
  for (let y = 979; y < H; y++) {
    for (let x = 0; x < W; x++) tData[(y * W + x) * 4 + 3] = 0;
  }

  // -------------------------------------------------------------
  // GAUSSIAN EDGE BLUR / FEATHERING ON CAMERA & FILM OUTLINES
  // "디카랑 필름 마무리가 너무 띄나서 야간 가우시안 효과 넣어서 경계 자연스럽게 풀어서 넣어줘"
  // -------------------------------------------------------------
  // We extract the alpha channel mask of the camera and films:
  const alphaMask = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) {
    alphaMask[i] = tData[i * 4 + 3];
  }

  // Gaussian blur the alpha mask with radius = 1.8 to soften hard pixel cutouts!
  const blurredMask = await sharp(alphaMask, { raw: { width: W, height: H, channels: 1 } })
    .blur(1.6)
    .raw()
    .toBuffer();

  // Apply the blurred mask back to the RGB data, but KEEP full opacity in the solid interior:
  // Interior (alphaMask > 200) stays solid, edge transitions smoothly!
  const softenedTemplate = Buffer.from(tData);
  for (let i = 0; i < W * H; i++) {
    const originalA = alphaMask[i];
    const blurredA = blurredMask[i];
    if (originalA > 0) {
      // If on edge (blurredA < 235), use smooth blended alpha
      if (blurredA < 235) {
        softenedTemplate[i * 4 + 3] = Math.min(originalA, Math.round(blurredA * 1.1));
      }
    } else {
      softenedTemplate[i * 4 + 3] = 0;
    }
  }

  // Also create a realistic Gaussian Drop Shadow layer behind Camera and Films:
  // Create an opaque silhouette of camera + films + flower
  const silhouette = Buffer.alloc(W * H * 4);
  for (let i = 0; i < W * H; i++) {
    if (softenedTemplate[i * 4 + 3] > 40) {
      silhouette[i * 4 + 0] = 0;
      silhouette[i * 4 + 1] = 0;
      silhouette[i * 4 + 2] = 0;
      silhouette[i * 4 + 3] = 160; // shadow opacity
    }
  }

  // Add flower to silhouette
  const fShadowBuf = await sharp(flowerResized).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const fShData = fShadowBuf.data;
  const fLeft = 18, fTop = 328;
  for (let y = 0; y < flowerH; y++) {
    for (let x = 0; x < flowerW; x++) {
      const targetY = fTop + y;
      const targetX = fLeft + x;
      if (targetY >= 0 && targetY < H && targetX >= 0 && targetX < W) {
        const fA = fShData[(y * flowerW + x) * 4 + 3];
        if (fA > 40) {
          const sIdx = (targetY * W + targetX) * 4;
          silhouette[sIdx + 3] = 140;
        }
      }
    }
  }

  // Blur the silhouette to create the Gaussian shadow (radius 7px)
  const gaussianShadow = await sharp(silhouette, { raw: { width: W, height: H, channels: 4 } })
    .blur(7)
    .png()
    .toBuffer();

  // Combine Camera & Films + Flower onto overlay
  const templatePng = await sharp(softenedTemplate, { raw: { width: W, height: H, channels: 4 } })
    .png()
    .toBuffer();

  const finalElements = await sharp(templatePng)
    .composite([
      { input: flowerResized, left: fLeft, top: fTop }
    ])
    .png()
    .toBuffer();

  // Save the master overlay:
  // Overlay contains: softened elements (Camera + Film 1 + Film 2 + Flower)
  fs.writeFileSync('public/images/timeline_retro_template.png', finalElements);
  fs.writeFileSync('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/timeline_retro_template.png', finalElements);

  // Generate test composite with photos and Gaussian shadow on green canvas
  const camPhoto = await sharp('public/images/timeline/photo1.jpg')
    .resize(244, 183, { fit: 'cover', position: 'center' })
    .toBuffer();
  const film1Photo = await sharp('public/images/timeline/photo2.jpg')
    .resize(302, 216, { fit: 'cover', position: 'center' })
    .toBuffer();
  const film2Photo = await sharp('public/images/timeline/photo3.jpg')
    .resize(302, 216, { fit: 'cover', position: 'center' })
    .toBuffer();

  const greenBase = await sharp(greenCanvasPath)
    .resize(W, H, { fit: 'cover' })
    .toBuffer();

  // Composite order:
  // 1. Green canvas
  // 2. Gaussian shadow (offset slightly down by dy=4, dx=1)
  // 3. Photos
  // 4. Softened Template overlay
  await sharp(greenBase)
    .composite([
      { input: gaussianShadow, left: 1, top: 4 },
      { input: camPhoto, left: 73, top: 100 },
      { input: film1Photo, left: 255, top: 398 },
      { input: film2Photo, left: 137, top: 722 },
      { input: finalElements, left: 0, top: 0 }
    ])
    .jpeg({ quality: 93 })
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/floral_timeline_with_gaussian_shadow.jpg');

  console.log('Generated floral_timeline_with_gaussian_shadow.jpg successfully!');
}

testGaussianFeather().catch(console.error);
