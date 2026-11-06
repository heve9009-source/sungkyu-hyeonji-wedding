import sharp from 'sharp';

async function findExactSeal() {
  const image = sharp('public/images/envelope_cover.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Center column x = 409
  // Scan y from 440 to 520
  console.log('Sampling center column x=409:');
  for (let y = 450; y <= 520; y++) {
    const idx = (y * width + 409) * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    // The seal is a round embossed oval flower seal
    // Let's print the brightness to find the exact center of the seal
    console.log(`y=${y}: R=${r} G=${g} B=${b}`);
  }
}

findExactSeal();
