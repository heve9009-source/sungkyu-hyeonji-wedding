import sharp from 'sharp';

async function checkArea() {
  const image = sharp('public/images/envelope_cover.jpg');
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // Envelope is approximately in the vertical middle y: 300 to 650
  // Let's find top and bottom edge of envelope by looking at y around 300-650
  let topY = -1, bottomY = -1;
  const x = Math.floor(width / 2); // ~409

  for (let y = 300; y < 700; y++) {
    const idx = (y * width + x) * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    // Background dress/grass around y=320 is darker or different texture
    // The envelope has pure linen white with r,g,b > 235
    if (r > 235 && g > 235 && b > 235 && topY === -1) {
      topY = y;
    }
  }

  for (let y = 650; y > 400; y--) {
    const idx = (y * width + x) * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (r > 235 && g > 235 && b > 235 && bottomY === -1) {
      bottomY = y;
    }
  }

  console.log(`Envelope topY=${topY}, bottomY=${bottomY}`);

  // Now at y = (topY + bottomY)/2, find leftX and rightX
  const midY = Math.floor((topY + bottomY) / 2);
  let leftX = -1, rightX = -1;
  for (let curX = 100; curX < 500; curX++) {
    const idx = (midY * width + curX) * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (r > 235 && g > 235 && b > 235 && leftX === -1) {
      leftX = curX;
    }
  }
  for (let curX = 750; curX > 350; curX--) {
    const idx = (midY * width + curX) * 3;
    const r = data[idx], g = data[idx+1], b = data[idx+2];
    if (r > 235 && g > 235 && b > 235 && rightX === -1) {
      rightX = curX;
    }
  }
  console.log(`Envelope leftX=${leftX}, rightX=${rightX}`);
  console.log(`Percentage: left=${(leftX/width*100).toFixed(1)}%, top=${(topY/height*100).toFixed(1)}%, width=${((rightX-leftX)/width*100).toFixed(1)}%, height=${((bottomY-topY)/height*100).toFixed(1)}%`);
}

checkArea();
