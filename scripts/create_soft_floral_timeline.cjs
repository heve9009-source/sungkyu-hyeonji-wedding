const sharp = require('sharp');
const fs = require('fs');

async function createFloralTimeline() {
  const templateImgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const flowerImgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794543160973.jpg';
  const greenCanvasPath = 'public/images/green_canvas_texture.jpg';

  const W = 576, H = 1024;

  // -------------------------------------------------------------
  // STEP 1: Process Flower Bouquet
  // -------------------------------------------------------------
  const flowerRaw = await sharp(flowerImgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const fData = flowerRaw.data;
  const fW = flowerRaw.info.width;
  const fH = flowerRaw.info.height;

  // Flood-fill gray background (r,g,b ≈ 229)
  const fVisited = new Uint8Array(fW * fH);
  const fQueue = [];

  function isFlowerBg(x, y) {
    if (x < 0 || x >= fW || y < 0 || y >= fH) return false;
    const idx = (y * fW + x) * 4;
    const r = fData[idx], g = fData[idx+1], b = fData[idx+2];
    return Math.abs(r - 229) < 12 && Math.abs(g - 229) < 12 && Math.abs(b - 229) < 12;
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
      if (fVisited[off]) {
        flowerBuf[off * 4 + 3] = 0;
      }
    }
  }

  // Soften the white sticker outline on the flower:
  // For pixels on the outer edge of the flower that are near-white (r,g,b > 240), feather alpha
  for (let y = 1; y < fH - 1; y++) {
    for (let x = 1; x < fW - 1; x++) {
      const off = y * fW + x;
      const idx = off * 4;
      if (flowerBuf[idx + 3] > 0) {
        let emptyNeighbors = 0;
        if (flowerBuf[((y-1)*fW + x)*4 + 3] === 0) emptyNeighbors++;
        if (flowerBuf[((y+1)*fW + x)*4 + 3] === 0) emptyNeighbors++;
        if (flowerBuf[(y*fW + (x-1))*4 + 3] === 0) emptyNeighbors++;
        if (flowerBuf[(y*fW + (x+1))*4 + 3] === 0) emptyNeighbors++;

        if (emptyNeighbors > 0) {
          flowerBuf[idx + 3] = Math.round(flowerBuf[idx + 3] * 0.65);
        }
      }
    }
  }

  // Crop flower bounding box (x: 109..417, y: 229..959)
  const fBox = { left: 105, top: 225, width: 318, height: 740 };
  const flowerCropped = await sharp(flowerBuf, { raw: { width: fW, height: fH, channels: 4 } })
    .extract(fBox)
    .png()
    .toBuffer();

  // Resize flower to fit nicely in the left column:
  // Target width ~ 205px, target height ~ 475px
  const flowerTargetW = 205;
  const flowerTargetH = Math.round((740 / 318) * flowerTargetW); // ~ 477px
  const flowerResized = await sharp(flowerCropped)
    .resize(flowerTargetW, flowerTargetH, { fit: 'contain' })
    .toBuffer();

  // -------------------------------------------------------------
  // STEP 2: Process Camera & Films (Removing Stars, Softening Edges)
  // -------------------------------------------------------------
  const tRaw = await sharp(templateImgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const tData = Buffer.from(tRaw.data);

  // 1. Cut Camera LCD screen hole (x: 74..315, y: 101..281)
  for (let y = 101; y <= 281; y++) {
    for (let x = 74; x <= 315; x++) {
      tData[(y * W + x) * 4 + 3] = 0;
    }
  }

  // 2. Cut Film 1 inner window (x: 257..555, y: 400..612)
  for (let y = 400; y <= 612; y++) {
    for (let x = 257; x <= 555; x++) {
      tData[(y * W + x) * 4 + 3] = 0;
    }
  }

  // 3. Cut Film 2 inner window (x: 139..437, y: 724..936)
  for (let y = 724; y <= 936; y++) {
    for (let x = 139; x <= 437; x++) {
      tData[(y * W + x) * 4 + 3] = 0;
    }
  }

  // 4. Remove all silver stars (x: 0..240, y: 330..665)
  for (let y = 330; y <= 665; y++) {
    for (let x = 0; x <= 240; x++) {
      tData[(y * W + x) * 4 + 3] = 0;
    }
  }

  // 5. Flood fill outer white background from borders
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
      if (tVisited[off]) {
        tData[off * 4 + 3] = 0;
      }
    }
  }

  // Clear sprocket holes in Film 1 & 2
  function clearSprocketsExact(y1, y2, x1, x2) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        const idx = (y * W + x) * 4;
        const r = tData[idx], g = tData[idx+1], b = tData[idx+2];
        if (r > 175 && g > 165 && b > 150) {
          tData[idx + 3] = 0;
        }
      }
    }
  }
  clearSprocketsExact(364, 392, 248, 568);
  clearSprocketsExact(620, 648, 248, 568);
  clearSprocketsExact(684, 712, 125, 450);
  clearSprocketsExact(944, 972, 125, 450);

  // Clear bottom white strip
  for (let y = 979; y < H; y++) {
    for (let x = 0; x < W; x++) {
      tData[(y * W + x) * 4 + 3] = 0;
    }
  }

  // -------------------------------------------------------------
  // STEP 3: Gaussian Soft Edge / Feathering on Camera & Film Cutouts
  // (User request: "디카랑 필름 마무리가 너무 띄나서 약간 가우시안 효과 넣어서 경계 자연스럽게 풀어서 넣어줘")
  // -------------------------------------------------------------
  // We apply a 2-pass soft feathering to the alpha channel around outer borders
  const feathered = Buffer.from(tData);

  // Pass 1: Soften any outer border pixel (1px~2px)
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      const idx = (y * W + x) * 4;
      const a = tData[idx + 3];
      if (a > 0) {
        // Count surrounding empty alpha
        let emptyCount = 0;
        let sumA = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const nA = tData[((y + dy) * W + (x + dx)) * 4 + 3];
            sumA += nA;
            if (nA === 0) emptyCount++;
          }
        }
        if (emptyCount >= 2) {
          // Average alpha creates a smooth Gaussian-like feather on the boundary
          feathered[idx + 3] = Math.round(sumA / 9);
        }
      }
    }
  }

  // -------------------------------------------------------------
  // STEP 4: Composite Camera + Films + Beautiful Flower Bouquet
  // -------------------------------------------------------------
  // Where to place the flower bouquet:
  // Left side: left: 14px, top: 320px
  // Sits gracefully between camera bottom and extends down past Film 1 alongside Film 2
  const flowerLeft = 16;
  const flowerTop = 328;

  // Let's create the master overlay image:
  const baseOverlay = await sharp(feathered, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();

  const finalOverlay = await sharp(baseOverlay)
    .composite([
      { input: flowerResized, left: flowerLeft, top: flowerTop }
    ])
    .png()
    .toBuffer();

  // Save to public and scratch
  fs.writeFileSync('public/images/timeline_retro_template.png', finalOverlay);
  fs.writeFileSync('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/timeline_retro_template.png', finalOverlay);

  // -------------------------------------------------------------
  // STEP 5: Generate Full Preview with Photos on Green Canvas
  // -------------------------------------------------------------
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

  const preview = await sharp(greenBase)
    .composite([
      { input: camPhoto, left: 73, top: 100 },
      { input: film1Photo, left: 255, top: 398 },
      { input: film2Photo, left: 137, top: 722 },
      { input: finalOverlay, left: 0, top: 0 }
    ])
    .jpeg({ quality: 92 })
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/floral_timeline_preview.jpg');

  console.log('Saved floral_timeline_preview.jpg successfully!');
}

createFloralTimeline().catch(console.error);
