const sharp = require('sharp');
const fs = require('fs');

async function inspect() {
  const imgPath = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420/.user_uploaded/media_1794535983908.jpg';
  const { data, info } = await sharp(imgPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  console.log(`Dimensions: ${width}x${height}, channels: ${channels}`);

  // 1. Camera outer bounding box
  // Let's find top, bottom, left, right of camera (y < 350)
  let camMinX = width, camMaxX = 0, camMinY = height, camMaxY = 0;
  for (let y = 0; y < 350; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      // non-white pixel
      if (data[idx] < 240 || data[idx+1] < 240 || data[idx+2] < 240) {
        if (x < camMinX) camMinX = x;
        if (x > camMaxX) camMaxX = x;
        if (y < camMinY) camMinY = y;
        if (y > camMaxY) camMaxY = y;
      }
    }
  }
  console.log(`Camera outer bbox: x=${camMinX}..${camMaxX} (w=${camMaxX-camMinX+1}), y=${camMinY}..${camMaxY} (h=${camMaxY-camMinY+1})`);

  // 2. Camera LCD screen bounding box (inside camera, large white rectangle)
  // Let's scan pixels inside the camera
  let lcdMinX = width, lcdMaxX = 0, lcdMinY = height, lcdMaxY = 0;
  for (let y = 90; y < 300; y++) {
    for (let x = 60; x < 330; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx] > 250 && data[idx+1] > 250 && data[idx+2] > 250) {
        if (x < lcdMinX) lcdMinX = x;
        if (x > lcdMaxX) lcdMaxX = x;
        if (y < lcdMinY) lcdMinY = y;
        if (y > lcdMaxY) lcdMaxY = y;
      }
    }
  }
  console.log(`Camera LCD screen bbox: x=${lcdMinX}..${lcdMaxX} (w=${lcdMaxX-lcdMinX+1}), y=${lcdMinY}..${lcdMaxY} (h=${lcdMaxY-lcdMinY+1})`);

  // 3. Middle film frame (Film 1)
  // roughly y=340..660, x=230..570
  let f1MinX = width, f1MaxX = 0, f1MinY = height, f1MaxY = 0;
  for (let y = 350; y < 660; y++) {
    for (let x = 230; x < width; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx] < 240 || data[idx+1] < 240 || data[idx+2] < 240) {
        if (x < f1MinX) f1MinX = x;
        if (x > f1MaxX) f1MaxX = x;
        if (y < f1MinY) f1MinY = y;
        if (y > f1MaxY) f1MaxY = y;
      }
    }
  }
  console.log(`Film 1 outer bbox: x=${f1MinX}..${f1MaxX} (w=${f1MaxX-f1MinX+1}), y=${f1MinY}..${f1MaxY} (h=${f1MaxY-f1MinY+1})`);

  // Film 1 inner white window:
  let f1InnerMinX = width, f1InnerMaxX = 0, f1InnerMinY = height, f1InnerMaxY = 0;
  for (let y = f1MinY + 40; y < f1MaxY - 40; y++) {
    for (let x = f1MinX + 10; x < f1MaxX - 10; x++) {
      const idx = (y * width + x) * channels;
      // inner window is light colored (r,g,b > 230)
      if (data[idx] > 235 && data[idx+1] > 235 && data[idx+2] > 235) {
        if (x < f1InnerMinX) f1InnerMinX = x;
        if (x > f1InnerMaxX) f1InnerMaxX = x;
        if (y < f1InnerMinY) f1InnerMinY = y;
        if (y > f1InnerMaxY) f1InnerMaxY = y;
      }
    }
  }
  console.log(`Film 1 inner bbox: x=${f1InnerMinX}..${f1InnerMaxX} (w=${f1InnerMaxX-f1InnerMinX+1}), y=${f1InnerMinY}..${f1InnerMaxY} (h=${f1InnerMaxY-f1InnerMinY+1})`);

  // 4. Bottom film frame (Film 2)
  // roughly y=660..1000, x=100..470
  let f2MinX = width, f2MaxX = 0, f2MinY = height, f2MaxY = 0;
  for (let y = 660; y < 1000; y++) {
    for (let x = 100; x < 500; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx] < 240 || data[idx+1] < 240 || data[idx+2] < 240) {
        if (x < f2MinX) f2MinX = x;
        if (x > f2MaxX) f2MaxX = x;
        if (y < f2MinY) f2MinY = y;
        if (y > f2MaxY) f2MaxY = y;
      }
    }
  }
  console.log(`Film 2 outer bbox: x=${f2MinX}..${f2MaxX} (w=${f2MaxX-f2MinX+1}), y=${f2MinY}..${f2MaxY} (h=${f2MaxY-f2MinY+1})`);

  // Film 2 inner window:
  let f2InnerMinX = width, f2InnerMaxX = 0, f2InnerMinY = height, f2InnerMaxY = 0;
  for (let y = f2MinY + 40; y < f2MaxY - 40; y++) {
    for (let x = f2MinX + 10; x < f2MaxX - 10; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx] > 235 && data[idx+1] > 235 && data[idx+2] > 235) {
        if (x < f2InnerMinX) f2InnerMinX = x;
        if (x > f2InnerMaxX) f2InnerMaxX = x;
        if (y < f2InnerMinY) f2InnerMinY = y;
        if (y > f2InnerMaxY) f2InnerMaxY = y;
      }
    }
  }
  console.log(`Film 2 inner bbox: x=${f2InnerMinX}..${f2InnerMaxX} (w=${f2InnerMaxX-f2InnerMinX+1}), y=${f2InnerMinY}..${f2InnerMaxY} (h=${f2InnerMaxY-f2InnerMinY+1})`);

  // 5. Stars (y=340..660, x=0..230)
  let sMinX = width, sMaxX = 0, sMinY = height, sMaxY = 0;
  for (let y = 330; y < 660; y++) {
    for (let x = 0; x < 230; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx] < 245 || data[idx+1] < 245 || data[idx+2] < 245) {
        if (x < sMinX) sMinX = x;
        if (x > sMaxX) sMaxX = x;
        if (y < sMinY) sMinY = y;
        if (y > sMaxY) sMaxY = y;
      }
    }
  }
  console.log(`Stars bbox: x=${sMinX}..${sMaxX} (w=${sMaxX-sMinX+1}), y=${sMinY}..${sMaxY} (h=${sMaxY-sMinY+1})`);
}

inspect().catch(console.error);
