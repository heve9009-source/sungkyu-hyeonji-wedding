const sharp = require('sharp');
const fs = require('fs');

async function refineOverlayV2() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const out = Buffer.from(data);

  // 1. Camera LCD screen hole:
  // X: 73 to 316, Y: 101 to 281
  for (let y = 100; y <= 282; y++) {
    for (let x = 72; x <= 317; x++) {
      out[(y * width + x) * 4 + 3] = 0;
    }
  }

  // 2. Film 1 inner window hole:
  // X: 256 to 556, Y: 399 to 613
  for (let y = 398; y <= 614; y++) {
    for (let x = 255; x <= 557; x++) {
      out[(y * width + x) * 4 + 3] = 0;
    }
  }

  // 3. Film 2 inner window hole:
  // X: 138 to 438, Y: 723 to 937
  for (let y = 722; y <= 938; y++) {
    for (let x = 137; x <= 439; x++) {
      out[(y * width + x) * 4 + 3] = 0;
    }
  }

  // 4. Background Flood-Fill starting only from borders:
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBgPixel(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    const idx = (y * width + x) * 4;
    const r = out[idx], g = out[idx+1], b = out[idx+2];
    // Background is near white (r,g,b > 236)
    return (r > 236 && g > 236 && b > 236);
  }

  // Border seeds
  for (let x = 0; x < width; x++) {
    if (isBgPixel(x, 0)) { queue.push(x, 0); visited[x] = 1; }
    const bOff = (height - 1) * width + x;
    if (isBgPixel(x, height - 1)) { queue.push(x, height - 1); visited[bOff] = 1; }
  }
  for (let y = 0; y < height; y++) {
    const lOff = y * width;
    if (isBgPixel(0, y) && !visited[lOff]) { queue.push(0, y); visited[lOff] = 1; }
    const rOff = y * width + (width - 1);
    if (isBgPixel(width - 1, y) && !visited[rOff]) { queue.push(width - 1, y); visited[rOff] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const nbs = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
    for (const [nx, ny] of nbs) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const off = ny * width + nx;
        if (!visited[off] && isBgPixel(nx, ny)) {
          visited[off] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // Clear visited background pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const off = y * width + x;
      if (visited[off]) {
        out[off * 4 + 3] = 0;
      }
    }
  }

  // Clean individual sprocket holes in Film 1 and Film 2
  // We identify the sprocket holes: they are bounded rectangular boxes with light ivory/white
  // Film 1 top sprockets: y: 366..390
  // Film 1 bottom sprockets: y: 622..646
  // Film 2 top sprockets: y: 686..710
  // Film 2 bottom sprockets: y: 946..970
  function clearSprocketsExact(y1, y2, x1, x2) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        const idx = (y * width + x) * 4;
        const r = out[idx], g = out[idx+1], b = out[idx+2];
        if (r > 175 && g > 165 && b > 150) {
          out[idx + 3] = 0;
        }
      }
    }
  }
  clearSprocketsExact(364, 392, 248, 568);
  clearSprocketsExact(620, 648, 248, 568);
  clearSprocketsExact(684, 712, 125, 450);
  clearSprocketsExact(944, 972, 125, 450);

  // Clear 1px boundary white fringe along outer film edges
  for (let y = 354; y <= 658; y++) {
    for (let x of [242, 243, 570, 571]) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 200 && out[idx+1] > 200 && out[idx+2] > 200) out[idx + 3] = 0;
    }
  }
  for (let x = 242; x <= 571; x++) {
    for (let y of [354, 355, 656, 657]) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 200 && out[idx+1] > 200 && out[idx+2] > 200) out[idx + 3] = 0;
    }
  }

  // Film 2 outer edges
  for (let y = 659; y <= 982; y++) {
    for (let x of [112, 113, 114, 452, 453, 454]) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 200 && out[idx+1] > 200 && out[idx+2] > 200) out[idx + 3] = 0;
    }
  }
  for (let x = 112; x <= 454; x++) {
    for (let y of [659, 660, 979, 980, 981, 982]) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 200 && out[idx+1] > 200 && out[idx+2] > 200) out[idx + 3] = 0;
    }
  }
  // Bottom white strip
  for (let y = 980; y < height; y++) {
    for (let x = 0; x < width; x++) {
      out[(y * width + x) * 4 + 3] = 0;
    }
  }

  const destFile = 'public/images/timeline_retro_template.png';
  const scratchFile = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/timeline_retro_template.png';

  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(destFile);
  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(scratchFile);

  const greenCanvas = await sharp('public/images/green_canvas_texture.jpg')
    .resize(width, height, { fit: 'cover' })
    .toBuffer();

  await sharp(greenCanvas)
    .composite([{ input: scratchFile }])
    .jpeg({ quality: 92 })
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/template_refined_preview_v2.jpg');

  console.log('V2 Refined overlay saved and preview generated!');
}

refineOverlayV2().catch(console.error);
