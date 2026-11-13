const sharp = require('sharp');

async function testWithPhotos() {
  const overlayPath = 'public/images/timeline_retro_template.png';
  const greenCanvas = 'public/images/green_canvas_texture.jpg';

  // Sizing: 576 x 1024
  const W = 576, H = 1024;

  // Let's resize 3 wedding photos to fit the exact window dimensions:
  // 1. Cam LCD: w=242, h=181
  const camPhoto = await sharp('public/images/timeline/photo1.jpg')
    .resize(242, 181, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 2. Film 1: w=300, h=214
  const film1Photo = await sharp('public/images/timeline/photo2.jpg')
    .resize(300, 214, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 3. Film 2: w=300, h=214
  const film2Photo = await sharp('public/images/timeline/photo3.jpg')
    .resize(300, 214, { fit: 'cover', position: 'center' })
    .toBuffer();

  // Background
  const base = await sharp(greenCanvas)
    .resize(W, H, { fit: 'cover' })
    .toBuffer();

  // Composite photos first, then overlay on top!
  const finalPreview = await sharp(base)
    .composite([
      { input: camPhoto, left: 74, top: 101 },
      { input: film1Photo, left: 256, top: 399 },
      { input: film2Photo, left: 138, top: 723 },
      { input: overlayPath, left: 0, top: 0 }
    ])
    .jpeg({ quality: 92 })
    .toFile('C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/scratch/timeline_retro_test_with_photos.jpg');

  console.log('Saved timeline_retro_test_with_photos.jpg');
}

testWithPhotos().catch(console.error);
