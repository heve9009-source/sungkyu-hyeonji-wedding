const sharp = require('sharp');

async function extractFlower() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794543160973.jpg';
  const { data, info } = await sharp(imgPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Flood fill from borders to remove the gray background (R=229, G=229, B=229)
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isGrayBg(x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return false;
    const idx = (y * width + x) * 4;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    // Gray background is around 220..235 and neutral (r ≈ g ≈ b)
    return Math.abs(r - 229) < 10 && Math.abs(g - 229) < 10 && Math.abs(b - 229) < 10;
  }

  for (let x = 0; x < width; x++) {
    if (isGrayBg(x, 0)) { queue.push(x, 0); visited[x] = 1; }
    const bOff = (height - 1) * width + x;
    if (isGrayBg(x, height - 1)) { queue.push(x, height - 1); visited[bOff] = 1; }
  }
  for (let y = 0; y < height; y++) {
    const lOff = y * width;
    if (isGrayBg(0, y) && !visited[lOff]) { queue.push(0, y); visited[lOff] = 1; }
    const rOff = y * width + (width - 1);
    if (isGrayBg(width - 1, y) && !visited[rOff]) { queue.push(width - 1, y); visited[rOff] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const nbs = [[cx+1, cy], [cx-1, cy], [cx, cy+1], [cx, cy-1]];
    for (const [nx, ny] of nbs) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const off = ny * width + nx;
        if (!visited[off] && isGrayBg(nx, ny)) {
          visited[off] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  const out = Buffer.from(data);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const off = y * width + x;
      if (visited[off]) {
        out[off * 4 + 3] = 0;
      }
    }
  }

  // Crop to bounding box with small padding
  const cropBox = {
    left: 100,
    top: 220,
    width: 330,
    height: 750
  };

  const flowerCutout = await sharp(out, { raw: { width, height, channels: 4 } })
    .extract(cropBox)
    .png()
    .toBuffer();

  await sharp(flowerCutout)
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/extracted_flower.png');

  // Preview on green canvas
  const greenBg = await sharp('public/images/green_canvas_texture.jpg')
    .resize(330, 750, { fit: 'cover' })
    .toBuffer();

  await sharp(greenBg)
    .composite([{ input: flowerCutout }])
    .jpeg({ quality: 90 })
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/flower_on_green.jpg');

  console.log('Saved extracted_flower.png and flower_on_green.jpg');
}

extractFlower().catch(console.error);
