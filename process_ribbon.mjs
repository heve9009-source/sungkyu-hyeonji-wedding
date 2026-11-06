import sharp from 'sharp';

const inputPath = 'C:\\Users\\20182468\\.gemini\\antigravity\\brain\\f90c6caf-27d7-42ee-85d1-350172920420\\.user_uploaded\\media_1787883038398.png';
const outputPath = 'public/images/green_ribbon_bow.png';

async function processRibbon() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Key out white/light background (#FFFFFF)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    if (r > 230 && g > 230 && b > 230) {
      data[i + 3] = 0; // Transparent
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log('Ribbon image processed successfully!');
}

processRibbon().catch(console.error);
