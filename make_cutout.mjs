import sharp from 'sharp';

async function makeCutout() {
  const image = sharp('public/images/journal_template.png');
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Inner photo area is x=140 to 300, y=202 to 393
  // Let's punch out x=140..300, y=202..393 so it becomes transparent (alpha = 0)
  // Let's give a 1-pixel soft blend or clean cut
  for (let y = 202; y <= 393; y++) {
    for (let x = 140; x <= 300; x++) {
      const idx = (y * width + x) * 4;
      data[idx + 3] = 0; // alpha = 0 (transparent)
    }
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4
    }
  }).png().toFile('public/images/journal_frame.png');

  console.log('Saved transparent journal frame to public/images/journal_frame.png');
}

makeCutout();
