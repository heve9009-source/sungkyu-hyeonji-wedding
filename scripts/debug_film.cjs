const sharp = require('sharp');

async function debugFilm() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  const { width, channels } = info;

  // Print values along y = 500 from x = 240 to 570
  let rowStr = '';
  for (let x = 240; x < 570; x += 5) {
    const idx = (500 * width + x) * channels;
    const avg = Math.round((data[idx] + data[idx+1] + data[idx+2]) / 3);
    rowStr += `${x}:${avg} `;
  }
  console.log('Row y=500:');
  console.log(rowStr);

  // Print values along y = 820 from x = 110 to 455
  rowStr = '';
  for (let x = 110; x < 455; x += 5) {
    const idx = (820 * width + x) * channels;
    const avg = Math.round((data[idx] + data[idx+1] + data[idx+2]) / 3);
    rowStr += `${x}:${avg} `;
  }
  console.log('\nRow y=820:');
  console.log(rowStr);
}

debugFilm().catch(console.error);
