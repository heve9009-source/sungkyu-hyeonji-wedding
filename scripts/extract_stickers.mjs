import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = 'C:/Users/20182468/.gemini/antigravity/scratch/mobile-wedding-invitation/public/images/stickers';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Function to extract a single sticker given bounding box and source image buffer
async function extractSticker(fullData, fW, fH, item) {
  const pad = item.pad !== undefined ? item.pad : 6;
  const x0 = Math.max(0, item.minX - pad);
  const x1 = Math.min(fW - 1, item.maxX + pad);
  const y0 = Math.max(0, item.minY - pad);
  const y1 = Math.min(fH - 1, item.maxY + pad);
  const w = x1 - x0 + 1;
  const h = y1 - y0 + 1;

  const subData = Buffer.alloc(w * h * 3);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcIdx = ((y0 + y) * fW + (x0 + x)) * 3;
      const dstIdx = (y * w + x) * 3;
      subData[dstIdx] = fullData[srcIdx];
      subData[dstIdx + 1] = fullData[srcIdx + 1];
      subData[dstIdx + 2] = fullData[srcIdx + 2];
    }
  }

  // Determine background pixels: threshold 250
  const isBg = (x, y) => {
    const idx = (y * w + x) * 3;
    return subData[idx] >= 251 && subData[idx + 1] >= 251 && subData[idx + 2] >= 251;
  };

  // BFS from borders
  const bgMask = new Uint8Array(w * h);
  const q = [];
  for (let x = 0; x < w; x++) {
    if (isBg(x, 0)) { bgMask[x] = 1; q.push(x, 0); }
    if (isBg(x, h - 1)) { bgMask[(h - 1) * w + x] = 1; q.push(x, h - 1); }
  }
  for (let y = 0; y < h; y++) {
    if (isBg(0, y)) { bgMask[y * w] = 1; q.push(0, y); }
    if (isBg(w - 1, y)) { bgMask[y * w + w - 1] = 1; q.push(w - 1, y); }
  }

  let head = 0;
  while (head < q.length) {
    const cx = q[head++];
    const cy = q[head++];
    const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
        const nidx = ny * w + nx;
        if (!bgMask[nidx] && isBg(nx, ny)) {
          bgMask[nidx] = 1;
          q.push(nx, ny);
        }
      }
    }
  }

  // Connected component analysis on non-bg pixels to keep only the largest component (removes any stray edge noise)
  const fgVisited = new Uint8Array(w * h);
  let bestComp = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      if (!bgMask[idx] && !fgVisited[idx]) {
        const comp = [];
        const fq = [x, y];
        fgVisited[idx] = 1;
        let fhead = 0;
        while (fhead < fq.length) {
          const fx = fq[fhead++];
          const fy = fq[fhead++];
          comp.push(fy * w + fx);
          const fneighbors = [
            [fx + 1, fy], [fx - 1, fy], [fx, fy + 1], [fx, fy - 1],
            [fx + 1, fy + 1], [fx - 1, fy - 1], [fx + 1, fy - 1], [fx - 1, fy + 1]
          ];
          for (const [fnx, fny] of fneighbors) {
            if (fnx >= 0 && fnx < w && fny >= 0 && fny < h) {
              const fnidx = fny * w + fnx;
              if (!bgMask[fnidx] && !fgVisited[fnidx]) {
                fgVisited[fnidx] = 1;
                fq.push(fnx, fny);
              }
            }
          }
        }
        if (comp.length > bestComp.length) {
          bestComp = comp;
        }
      }
    }
  }

  const keepMask = new Uint8Array(w * h);
  for (const p of bestComp) {
    keepMask[p] = 1;
  }

  // Create RGBA
  const outRGBA = Buffer.alloc(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const sIdx = (y * w + x) * 3;
      const dIdx = (y * w + x) * 4;
      outRGBA[dIdx] = subData[sIdx];
      outRGBA[dIdx + 1] = subData[sIdx + 1];
      outRGBA[dIdx + 2] = subData[sIdx + 2];
      outRGBA[dIdx + 3] = keepMask[y * w + x] ? 255 : 0;
    }
  }

  const targetPath = path.join(outDir, item.name + '.png');
  await sharp(outRGBA, { raw: { width: w, height: h, channels: 4 } }).png().toFile(targetPath);
  console.log(`Saved: ${item.name}.png (${w}x${h})`);
}

async function run() {
  console.log('--- Processing Img3 (Wedding Elements) ---');
  const p3 = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1793861981450.jpg';
  const { data: d3, info: i3 } = await sharp(p3).raw().toBuffer({ resolveWithObject: true });

  const items3 = [
    { name: 'arch', minX: 7, maxX: 346, minY: 16, maxY: 643, pad: 4 },
    { name: 'greenery-bush', minX: 35, maxX: 417, minY: 645, maxY: 997, pad: 4 },
    { name: 'bouquet', minX: 675, maxX: 936, minY: 601, maxY: 999, pad: 4 },
    { name: 'envelope', minX: 379, maxX: 639, minY: 474, maxY: 755, pad: 2 },
    { name: 'candelabra', minX: 351, maxX: 568, minY: 33, maxY: 467, pad: 4 },
    { name: 'chair', minX: 683, maxX: 858, minY: 225, maxY: 586, pad: 4 },
    { name: 'bird-seal', minX: 429, maxX: 638, minY: 776, maxY: 975, pad: 4 },
    { name: 'calla-stems', minX: 587, maxX: 752, minY: 61, maxY: 484, pad: 4 }
  ];

  for (const it of items3) {
    await extractSticker(d3, i3.width, i3.height, it);
  }

  console.log('--- Processing Img2 (Floral Stickers) ---');
  const p2 = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1793861981431.jpg';
  const { data: d2, info: i2 } = await sharp(p2).raw().toBuffer({ resolveWithObject: true });

  const items2 = [
    { name: 'carnation-light-green', minX: 19, maxX: 194, minY: 17, maxY: 208 },
    { name: 'pompon-green', minX: 205, maxX: 375, minY: 27, maxY: 192 },
    { name: 'white-lisianthus', minX: 387, maxX: 552, minY: 16, maxY: 221 },
    { name: 'green-gerbera', minX: 569, maxX: 748, minY: 25, maxY: 218 },
    { name: 'white-alstroemeria', minX: 760, maxX: 928, minY: 20, maxY: 221 },
    { name: 'green-snapdragon', minX: 47, maxX: 169, minY: 214, maxY: 472 },
    { name: 'green-hydrangea', minX: 178, maxX: 396, minY: 227, maxY: 428 },
    { name: 'chamomile-bouquet', minX: 393, maxX: 564, minY: 233, maxY: 451 },
    { name: 'green-viburnum', minX: 565, maxX: 748, minY: 245, maxY: 450 },
    { name: 'white-laceflower', minX: 755, maxX: 928, minY: 237, maxY: 450 },
    { name: 'green-orchid', minX: 11, maxX: 284, minY: 480, maxY: 692 },
    { name: 'single-calla', minX: 259, maxX: 412, minY: 455, maxY: 690 },
    { name: 'white-stock', minX: 430, maxX: 544, minY: 454, maxY: 706 },
    { name: 'white-lily', minX: 567, maxX: 780, minY: 472, maxY: 715 },
    { name: 'bells-of-ireland', minX: 797, maxX: 920, minY: 451, maxY: 716 },
    { name: 'white-waxflower', minX: 13, maxX: 169, minY: 715, maxY: 974 },
    { name: 'hypericum-berries', minX: 171, maxX: 334, minY: 717, maxY: 966 },
    { name: 'green-carnation-stem', minX: 327, maxX: 477, minY: 715, maxY: 965 },
    { name: 'chamomile-stem', minX: 479, maxX: 630, minY: 715, maxY: 972 },
    { name: 'blue-hydrangea', minX: 627, maxX: 791, minY: 735, maxY: 956 },
    { name: 'white-rose', minX: 789, maxX: 928, minY: 735, maxY: 947 }
  ];

  for (const it of items2) {
    await extractSticker(d2, i2.width, i2.height, it);
  }

  console.log('--- Overwriting legacy sticker aliases with new high-res versions ---');
  const copyFile = (src, dst) => {
    fs.copyFileSync(path.join(outDir, src), path.join(outDir, dst));
    console.log(`Aliased: ${src} -> ${dst}`);
  };

  copyFile('envelope.png', 'letter.png');
  copyFile('bouquet.png', 'white-bouquet.png');
  copyFile('bird-seal.png', 'details-oval.png');
  copyFile('white-rose.png', 'single-flower.png');
  copyFile('chamomile-bouquet.png', 'yellow-flower.png');
  copyFile('candelabra.png', 'champagne-tower.png');
  copyFile('calla-stems.png', 'ribbon-flutes.png');
  copyFile('greenery-bush.png', 'cake.png');
  copyFile('chair.png', 'shoes.png');
  copyFile('green-hydrangea.png', 'ring-box.png');
  copyFile('white-lisianthus.png', 'perfume.png');

  console.log('All stickers extracted successfully!');
}

run().catch(console.error);
