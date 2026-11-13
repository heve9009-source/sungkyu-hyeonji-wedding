const sharp = require('sharp');
const fs = require('fs');

async function refineOverlay() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  const out = Buffer.from(data);

  // Exact coordinates of windows:
  // 1. Camera LCD screen:
  // X: 73 to 316, Y: 101 to 281
  for (let y = 100; y <= 282; y++) {
    for (let x = 72; x <= 317; x++) {
      const idx = (y * width + x) * 4;
      out[idx + 3] = 0;
    }
  }

  // 2. Film 1 inner window:
  // X: 256 to 556, Y: 399 to 613
  for (let y = 398; y <= 614; y++) {
    for (let x = 255; x <= 557; x++) {
      const idx = (y * width + x) * 4;
      out[idx + 3] = 0;
    }
  }

  // 3. Film 2 inner window:
  // X: 138 to 438, Y: 723 to 937
  for (let y = 722; y <= 938; y++) {
    for (let x = 137; x <= 439; x++) {
      const idx = (y * width + x) * 4;
      out[idx + 3] = 0;
    }
  }

  // Outer background flood fill:
  // Any pixel reachable from borders that has luminance > 220
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBackground(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    const idx = (y * width + x) * 4;
    const r = out[idx];
    const g = out[idx+1];
    const b = out[idx+2];
    // Camera area y <= 350
    if (y < 350) {
      return (r > 230 && g > 230 && b > 230);
    }
    // Below camera
    return (r > 215 && g > 215 && b > 215);
  }

  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) { queue.push(x, 0); visited[x] = 1; }
    const bOff = (height - 1) * width + x;
    if (isBackground(x, height - 1)) { queue.push(x, height - 1); visited[bOff] = 1; }
  }
  for (let y = 0; y < height; y++) {
    const lOff = y * width;
    if (isBackground(0, y) && !visited[lOff]) { queue.push(0, y); visited[lOff] = 1; }
    const rOff = y * width + (width - 1);
    if (isBackground(width - 1, y) && !visited[rOff]) { queue.push(width - 1, y); visited[rOff] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const nbs = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
    for (const [nx, ny] of nbs) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const off = ny * width + nx;
        if (!visited[off] && isBackground(nx, ny)) {
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

  // Clean sprockets on Film 1 & Film 2:
  // Film 1 sprocket regions:
  // Top: y: 360..395, x: 245..568
  // Bottom: y: 615..650, x: 245..568
  // Film 2 sprocket regions:
  // Top: y: 680..718, x: 125..450
  // Bottom: y: 940..975, x: 125..450
  function cleanSprocketRegion(y1, y2, x1, x2) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        const idx = (y * width + x) * 4;
        const r = out[idx], g = out[idx+1], b = out[idx+2];
        // If brightness is high (the sprocket hole is light ivory/white)
        if (r > 165 && g > 155 && b > 140) {
          out[idx + 3] = 0;
        }
      }
    }
  }

  cleanSprocketRegion(360, 395, 245, 568);
  cleanSprocketRegion(615, 652, 245, 568);
  cleanSprocketRegion(680, 718, 125, 450);
  cleanSprocketRegion(940, 976, 125, 450);

  // Clean outer fringes of Film 1:
  // Film 1 outer box is approx x: 242..571, y: 355..657.
  // Pixels outside or on the border with high brightness:
  for (let y = 350; y <= 665; y++) {
    for (let x = 238; x <= 575; x++) {
      const idx = (y * width + x) * 4;
      if (x <= 243 || x >= 569 || y <= 356 || y >= 656) {
        if (out[idx] > 200 && out[idx+1] > 200 && out[idx+2] > 200) {
          out[idx + 3] = 0;
        }
      }
    }
  }

  // Clean outer fringes of Film 2:
  // Film 2 outer box is approx x: 113..454, y: 660..981.
  for (let y = 655; y <= 985; y++) {
    for (let x = 108; x <= 460; x++) {
      const idx = (y * width + x) * 4;
      if (x <= 114 || x >= 452 || y <= 661 || y >= 978) {
        if (out[idx] > 200 && out[idx+1] > 200 && out[idx+2] > 200) {
          out[idx + 3] = 0;
        }
      }
      // Also clean white strip at bottom of image (y > 978)
      if (y >= 979) {
        out[idx + 3] = 0;
      }
    }
  }

  // De-fringe star stickers:
  // Stars are in x: 20..220, y: 335..660
  for (let y = 335; y <= 660; y++) {
    for (let x = 20; x <= 220; x++) {
      const idx = (y * width + x) * 4;
      if (out[idx + 3] > 0) {
        const r = out[idx], g = out[idx+1], b = out[idx+2];
        if (r > 235 && g > 235 && b > 235) {
          out[idx + 3] = 0;
        }
      }
    }
  }

  // Smooth edge antialiasing (defringe 1px outer boundary)
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4;
      if (out[idx + 3] > 0) {
        // Count transparent neighbors
        let transNeighbors = 0;
        if (out[((y-1)*width + x)*4 + 3] === 0) transNeighbors++;
        if (out[((y+1)*width + x)*4 + 3] === 0) transNeighbors++;
        if (out[(y*width + (x-1))*4 + 3] === 0) transNeighbors++;
        if (out[(y*width + (x+1))*4 + 3] === 0) transNeighbors++;

        // If on border and very light, feather alpha
        if (transNeighbors >= 2) {
          const r = out[idx], g = out[idx+1], b = out[idx+2];
          if (r > 210 && g > 210 && b > 210) {
            out[idx + 3] = 0;
          }
        }
      }
    }
  }

  const destFile = 'public/images/timeline_retro_template.png';
  const scratchFile = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/timeline_retro_template.png';

  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(destFile);
  await sharp(out, { raw: { width, height, channels: 4 } }).png().toFile(scratchFile);

  // Test composite on green canvas
  const greenCanvas = await sharp('public/images/green_canvas_texture.jpg')
    .resize(width, height, { fit: 'cover' })
    .toBuffer();

  await sharp(greenCanvas)
    .composite([{ input: scratchFile }])
    .jpeg({ quality: 92 })
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/template_refined_preview.jpg');

  console.log('Refined overlay saved and preview generated!');
}

refineOverlay().catch(console.error);
