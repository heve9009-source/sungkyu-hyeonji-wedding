const sharp = require('sharp');

async function debugFilmY() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  const { width, channels } = info;

  console.log('Film 1 Y (x=400):');
  for (let y = 370; y < 630; y += 4) {
    const idx = (y * width + 400) * channels;
    const avg = Math.round((data[idx] + data[idx+1] + data[idx+2]) / 3);
    if (avg < 200) console.log(`y=${y}: ${avg}`);
  }

  console.log('\nFilm 2 Y (x=280):');
  for (let y = 670; y < 960; y += 4) {
    const idx = (y * width + 280) * channels;
    const avg = Math.round((data[idx] + data[idx+1] + data[idx+2]) / 3);
    if (avg < 200) console.log(`y=${y}: ${avg}`);
  }
}

debugFilmY().catch(console.error);
