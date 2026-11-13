const sharp = require('sharp');

async function measureFilmWindows() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Let's inspect rows and columns of Film 1 (y: 350..660, x: 240..575)
  // The dark border of film has low pixel values (e.g. < 100).
  // The inner window has high pixel values (> 230).
  
  // Film 1:
  let f1_top = 0, f1_bottom = 0, f1_left = 0, f1_right = 0;
  // Scan y at center of film 1 (x = 410)
  for (let y = 380; y < 630; y++) {
    const idx = (y * width + 410) * channels;
    if (data[idx] > 220 && !f1_top) f1_top = y;
    if (data[idx] < 150 && f1_top && !f1_bottom) f1_bottom = y;
  }
  // Scan x at center of film 1 (y = 500)
  for (let x = 240; x < 570; x++) {
    const idx = (500 * width + x) * channels;
    if (data[idx] > 220 && !f1_left) f1_left = x;
    if (data[idx] < 150 && f1_left && !f1_right) f1_right = x;
  }
  console.log(`Film 1 Inner Window: x=${f1_left}..${f1_right} (w=${f1_right-f1_left}), y=${f1_top}..${f1_bottom} (h=${f1_bottom-f1_top})`);

  // Film 2:
  let f2_top = 0, f2_bottom = 0, f2_left = 0, f2_right = 0;
  // Scan y at center of film 2 (x = 280)
  for (let y = 680; y < 960; y++) {
    const idx = (y * width + 280) * channels;
    if (data[idx] > 220 && !f2_top) f2_top = y;
    if (data[idx] < 150 && f2_top && !f2_bottom) f2_bottom = y;
  }
  // Scan x at center of film 2 (y = 820)
  for (let x = 120; x < 450; x++) {
    const idx = (820 * width + x) * channels;
    if (data[idx] > 220 && !f2_left) f2_left = x;
    if (data[idx] < 150 && f2_left && !f2_right) f2_right = x;
  }
  console.log(`Film 2 Inner Window: x=${f2_left}..${f2_right} (w=${f2_right-f2_left}), y=${f2_top}..${f2_bottom} (h=${f2_bottom-f2_top})`);
}

measureFilmWindows().catch(console.error);
