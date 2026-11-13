const sharp = require('sharp');
const fs = require('fs');

async function processTemplate() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Let's create an output buffer
  const out = Buffer.from(data);

  // Exact coordinates measured:
  // 1. Camera LCD screen:
  // X: 74 to 315, Y: 102 to 280
  const camLcd = { x1: 74, x2: 315, y1: 102, y2: 280 };

  // 2. Film 1 inner window:
  // X: 257 to 555, Y: 401 to 611
  const film1 = { x1: 257, x2: 555, y1: 401, y2: 611 };

  // 3. Film 2 inner window:
  // X: 139 to 437, Y: 725 to 935
  const film2 = { x1: 139, x2: 437, y1: 725, y2: 935 };

  // Cut out the 3 photo windows completely
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;

      // Inside Camera LCD
      if (x >= camLcd.x1 && x <= camLcd.x2 && y >= camLcd.y1 && y <= camLcd.y2) {
        out[idx + 3] = 0;
        continue;
      }

      // Inside Film 1
      if (x >= film1.x1 && x <= film1.x2 && y >= film1.y1 && y <= film1.y2) {
        out[idx + 3] = 0;
        continue;
      }

      // Inside Film 2
      if (x >= film2.x1 && x <= film2.x2 && y >= film2.y1 && y <= film2.y2) {
        out[idx + 3] = 0;
        continue;
      }
    }
  }

  // Now for the outer background and sprocket holes:
  // Let's flood-fill from border pixels to find outer background
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isNearWhite(offset) {
    const idx = offset * 4;
    return out[idx] > 238 && out[idx+1] > 238 && out[idx+2] > 238;
  }

  // Seed borders
  for (let x = 0; x < width; x++) {
    const t = 0 * width + x;
    if (isNearWhite(t)) { queue.push(x, 0); visited[t] = 1; }
    const b = (height - 1) * width + x;
    if (isNearWhite(b)) { queue.push(x, height - 1); visited[b] = 1; }
  }
  for (let y = 0; y < height; y++) {
    const l = y * width + 0;
    if (isNearWhite(l) && !visited[l]) { queue.push(0, y); visited[l] = 1; }
    const r = y * width + (width - 1);
    if (isNearWhite(r) && !visited[r]) { queue.push(width - 1, y); visited[r] = 1; }
  }

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
        if (!visited[nOffset] && isNearWhite(nOffset)) {
          visited[nOffset] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // Turn visited outer background transparent with soft antialiasing
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const offset = y * width + x;
      const idx = offset * 4;
      if (visited[offset]) {
        out[idx + 3] = 0;
      }
    }
  }

  // Also turn sprocket holes in film 1 and film 2 transparent:
  // Film 1 sprocket holes:
  // Top sprockets: y: 360..390, x: 250..565
  // Bottom sprockets: y: 615..645, x: 250..565
  // Film 2 sprocket holes:
  // Top sprockets: y: 675..710, x: 130..445
  // Bottom sprockets: y: 940..970, x: 130..445
  function clearSprockets(yStart, yEnd, xStart, xEnd) {
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {
        const offset = y * width + x;
        const idx = offset * 4;
        // Sprockets are light squares (r > 200, g > 190, b > 170)
        if (out[idx] > 190 && out[idx+1] > 180 && out[idx+2] > 160) {
          out[idx + 3] = 0;
        }
      }
    }
  }

  clearSprockets(360, 395, 248, 568);
  clearSprockets(618, 650, 248, 568);
  clearSprockets(675, 715, 125, 450);
  clearSprockets(940, 975, 125, 450);

  // Save to public/images and scratch
  const destDir = 'public/images';
  const scratchDir = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch';

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(`${destDir}/timeline_retro_template.png`);

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(`${scratchDir}/timeline_retro_template.png`);

  console.log('Successfully created timeline_retro_template.png!');

  // Now create a preview composited with our green canvas texture to verify how it looks!
  const greenCanvas = await sharp('public/images/green_canvas_texture.jpg')
    .resize(width, height, { fit: 'cover' })
    .toBuffer();

  const preview = await sharp(greenCanvas)
    .composite([
      { input: `${scratchDir}/timeline_retro_template.png` }
    ])
    .jpeg({ quality: 90 })
    .toFile(`${scratchDir}/template_on_green_preview.jpg`);

  console.log('Saved template_on_green_preview.jpg!');
}

processTemplate().catch(console.error);
