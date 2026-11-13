const sharp = require('sharp');

async function debugCam() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  const { width, channels } = info;

  console.log('Camera LCD X (y=190):');
  for (let x = 60; x < 330; x += 4) {
    const idx = (190 * width + x) * channels;
    const avg = Math.round((data[idx] + data[idx+1] + data[idx+2]) / 3);
    if (avg < 240) console.log(`x=${x}: ${avg}`);
  }

  console.log('\nCamera LCD Y (x=200):');
  for (let y = 80; y < 300; y += 4) {
    const idx = (y * width + 200) * channels;
    const avg = Math.round((data[idx] + data[idx+1] + data[idx+2]) / 3);
    if (avg < 240) console.log(`y=${y}: ${avg}`);
  }
}

debugCam().catch(console.error);
