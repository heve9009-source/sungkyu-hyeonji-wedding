const sharp = require('sharp');

async function polishOverlay() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const out = Buffer.from(data);

  // 1. Camera LCD screen hole (x: 74..315, y: 101..281)
  for (let y = 101; y <= 281; y++) {
    for (let x = 74; x <= 315; x++) {
      out[(y * width + x) * 4 + 3] = 0;
    }
  }

  // 2. Film 1 inner window (x: 257..555, y: 400..612)
  for (let y = 400; y <= 612; y++) {
    for (let x = 257; x <= 555; x++) {
      out[(y * width + x) * 4 + 3] = 0;
    }
  }

  // 3. Film 2 inner window (x: 139..437, y: 724..936)
  for (let y = 724; y <= 936; y++) {
    for (let x = 139; x <= 437; x++) {
      out[(y * width + x) * 4 + 3] = 0;
    }
  }

  // 4. Background Flood-Fill starting from borders
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBgPixel(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    const idx = (y * width + x) * 4;
    const r = out[idx], g = out[idx+1], b = out[idx+2];
    return (r > 234 && g > 234 && b > 234);
  }

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

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const off = y * width + x;
      if (visited[off]) {
        out[off * 4 + 3] = 0;
      }
    }
  }

  // Sprockets
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

  // Outer film borders 1px white fringe cleanup
  for (let y = 354; y <= 658; y++) {
    for (let x of [242, 243, 570, 571]) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 190 && out[idx+1] > 190 && out[idx+2] > 190) out[idx + 3] = 0;
    }
  }
  for (let x = 242; x <= 571; x++) {
    for (let y of [354, 355, 656, 657]) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 190 && out[idx+1] > 190 && out[idx+2] > 190) out[idx + 3] = 0;
    }
  }
  for (let y = 659; y <= 982; y++) {
    for (let x of [112, 113, 114, 452, 453, 454]) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 190 && out[idx+1] > 190 && out[idx+2] > 190) out[idx + 3] = 0;
    }
  }
  for (let x = 112; x <= 454; x++) {
    for (let y of [659, 660, 979, 980, 981, 982]) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 190 && out[idx+1] > 190 && out[idx+2] > 190) out[idx + 3] = 0;
    }
  }
  for (let y = 979; y < height; y++) {
    for (let x = 0; x < width; x++) {
      out[(y * width + x) * 4 + 3] = 0;
    }
  }

  // Clean top star left white artifact (around x=95..110, y=345..365)
  for (let y = 340; y <= 365; y++) {
    for (let x = 90; x <= 110; x++) {
      const idx = (y * width + x) * 4;
      if (out[idx] > 190 && out[idx+1] > 190 && out[idx+2] > 190) {
        out[idx + 3] = 0;
      }
    }
  }

  const destFile = 'public/images/timeline_retro_template.png';
  const scratchFile = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/timeline_retro_template.png';

  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(destFile);
  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(scratchFile);

  console.log('Polished template saved successfully!');
}

polishOverlay().catch(console.error);
