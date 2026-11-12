const QRCode = require('qrcode');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const URL = 'https://sungkyu-hyeonji-wedding.vercel.app';
const projectRoot = path.resolve(__dirname, '..');
const outputDir = path.join(projectRoot, 'public', 'qr');
const artifactDir = 'C:/Users/20182468/.gemini/antigravity/brain/f90c6caf-27d7-42ee-85d1-350172920420';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function generateAllQRCodes() {
  console.log('Generating QR codes for URL:', URL);

  // 1. Pure Black on White (Universal, 2400x2400, 300 DPI equivalent)
  const blackPng = await QRCode.toBuffer(URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 2400,
    margin: 2,
    color: {
      dark: '#111111',
      light: '#ffffff'
    }
  });
  fs.writeFileSync(path.join(outputDir, 'qr_pure_black.png'), blackPng);
  fs.writeFileSync(path.join(artifactDir, 'qr_pure_black.png'), blackPng);

  const blackSvg = await QRCode.toString(URL, {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 2,
    color: {
      dark: '#111111',
      light: '#ffffff'
    }
  });
  fs.writeFileSync(path.join(outputDir, 'qr_pure_black.svg'), blackSvg);

  // 2. Pure Black on Transparent Background (Perfect for placing on any paper/texture)
  const transPng = await QRCode.toBuffer(URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 2400,
    margin: 2,
    color: {
      dark: '#111111',
      light: '#00000000'
    }
  });
  fs.writeFileSync(path.join(outputDir, 'qr_transparent.png'), transPng);
  fs.writeFileSync(path.join(artifactDir, 'qr_transparent.png'), transPng);

  const transSvg = await QRCode.toString(URL, {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 2,
    color: {
      dark: '#111111',
      light: '#00000000'
    }
  });
  fs.writeFileSync(path.join(outputDir, 'qr_transparent.svg'), transSvg);

  // 3. Signature Wedding Forest Green (#2D4434 on Ivory #FAF8F5)
  const greenPng = await QRCode.toBuffer(URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 2400,
    margin: 2,
    color: {
      dark: '#2D4434',
      light: '#FAF8F5'
    }
  });
  fs.writeFileSync(path.join(outputDir, 'qr_forest_green.png'), greenPng);
  fs.writeFileSync(path.join(artifactDir, 'qr_forest_green.png'), greenPng);

  const greenSvg = await QRCode.toString(URL, {
    errorCorrectionLevel: 'H',
    type: 'svg',
    margin: 2,
    color: {
      dark: '#2D4434',
      light: '#FAF8F5'
    }
  });
  fs.writeFileSync(path.join(outputDir, 'qr_forest_green.svg'), greenSvg);

  // 4. Signature Clover Monogram Edition (Level H allows ~30% error correction, center emblem)
  const qrBase = await QRCode.toBuffer(URL, {
    errorCorrectionLevel: 'H',
    type: 'png',
    width: 1600,
    margin: 2,
    color: {
      dark: '#222222',
      light: '#FFFFFF'
    }
  });

  const emblemSize = 340;
  const emblemSvg = Buffer.from(`
    <svg width="${emblemSize}" height="${emblemSize}" viewBox="0 0 ${emblemSize} ${emblemSize}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#000000" flood-opacity="0.18"/>
        </filter>
      </defs>
      <!-- White circular shield -->
      <circle cx="${emblemSize/2}" cy="${emblemSize/2}" r="${emblemSize/2 - 6}" fill="#FFFFFF" stroke="#D4AF37" stroke-width="3" filter="url(#badgeShadow)"/>
      <circle cx="${emblemSize/2}" cy="${emblemSize/2}" r="${emblemSize/2 - 16}" fill="#FAF8F5" stroke="#E5DEC9" stroke-width="1.5"/>
      <!-- Clover & Monogram text -->
      <text x="${emblemSize/2}" y="${emblemSize/2 - 28}" font-family="'Times New Roman', Georgia, serif" font-size="38" fill="#2D4434" text-anchor="middle">✤</text>
      <text x="${emblemSize/2}" y="${emblemSize/2 + 20}" font-family="'Times New Roman', Georgia, serif" font-size="34" font-weight="bold" fill="#2D4434" letter-spacing="3" text-anchor="middle">S ♥ H</text>
      <text x="${emblemSize/2}" y="${emblemSize/2 + 65}" font-family="'Times New Roman', Georgia, serif" font-size="20" fill="#8C7335" letter-spacing="2" text-anchor="middle">WEDDING</text>
    </svg>
  `);
  const emblemPng = await sharp(emblemSvg).png().toBuffer();

  const monogramQr = await sharp(qrBase)
    .composite([
      { input: emblemPng, left: Math.round((1600 - emblemSize) / 2), top: Math.round((1600 - emblemSize) / 2) }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(outputDir, 'qr_signature_monogram.png'), monogramQr);
  fs.writeFileSync(path.join(artifactDir, 'qr_signature_monogram.png'), monogramQr);

  // 5. Complete Printable QR Insert Card (인쇄용 미니 안내 카드 300DPI: 90mm x 135mm @ 300DPI ≈ 1060 x 1590 px)
  const cardW = 1060;
  const cardH = 1590;

  // Render QR for card: 520x520
  const cardQr = await sharp(monogramQr)
    .resize(520, 520)
    .toBuffer();

  const cardSvg = Buffer.from(`
    <svg width="${cardW}" height="${cardH}" viewBox="0 0 ${cardW} ${cardH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .serif-en { font-family: 'Georgia', 'Times New Roman', serif; }
          .serif-kr { font-family: 'Batang', 'Malgun Gothic', 'Noto Serif KR', serif; }
        </style>
      </defs>

      <!-- Background: Natural Ivory Paper Texture Base -->
      <rect width="${cardW}" height="${cardH}" fill="#FBF9F5"/>

      <!-- Delicate Inner Gold Border -->
      <rect x="50" y="50" width="${cardW - 100}" height="${cardH - 100}" fill="none" stroke="#D8CFBD" stroke-width="1.8"/>
      <rect x="58" y="58" width="${cardW - 116}" height="${cardH - 116}" fill="none" stroke="#CBBFA8" stroke-width="0.8"/>

      <!-- Corner Flourishes -->
      <text x="75" y="85" font-family="serif" font-size="18" fill="#B3A488">✤</text>
      <text x="${cardW - 85}" y="85" font-family="serif" font-size="18" fill="#B3A488">✤</text>
      <text x="75" y="${cardH - 70}" font-family="serif" font-size="18" fill="#B3A488">✤</text>
      <text x="${cardW - 85}" y="${cardH - 70}" font-family="serif" font-size="18" fill="#B3A488">✤</text>

      <!-- Top Header -->
      <text x="${cardW/2}" y="170" class="serif-en" font-size="28" font-weight="500" fill="#8E7B5C" letter-spacing="8" text-anchor="middle">ONLINE INVITATION</text>
      <text x="${cardW/2}" y="235" class="serif-en" font-size="52" font-weight="normal" fill="#2C3E30" letter-spacing="10" text-anchor="middle">SUNGKYU &amp; HYEONJI</text>

      <!-- Divider -->
      <line x1="${cardW/2 - 90}" y1="270" x2="${cardW/2 - 25}" y2="270" stroke="#CBBFA8" stroke-width="1"/>
      <text x="${cardW/2}" y="276" class="serif-kr" font-size="20" fill="#9C8D73" text-anchor="middle">✤</text>
      <line x1="${cardW/2 + 25}" y1="270" x2="${cardW/2 + 90}" y2="270" stroke="#CBBFA8" stroke-width="1"/>

      <!-- Subtitle -->
      <text x="${cardW/2}" y="325" class="serif-kr" font-size="28" font-weight="normal" fill="#4A4F46" letter-spacing="2" text-anchor="middle">모바일 청첩장 안내</text>

      <!-- Space for QR is y=380 to y=900 -->

      <!-- QR Scan Instruction -->
      <text x="${cardW/2}" y="955" class="serif-kr" font-size="26" font-weight="bold" fill="#2D3B2F" letter-spacing="2" text-anchor="middle">카메라로 QR코드를 스캔해 주세요</text>
      <text x="${cardW/2}" y="1000" class="serif-kr" font-size="22" font-weight="normal" fill="#6B7265" letter-spacing="1" text-anchor="middle">더 많은 사진과 오시는 길, 방명록을 확인하실 수 있습니다</text>

      <!-- Wedding Info Box -->
      <rect x="${cardW/2 - 340}" y="1055" width="680" height="150" fill="#F4EFE6" rx="10" stroke="#E6DEC9" stroke-width="1"/>
      <text x="${cardW/2}" y="1108" class="serif-kr" font-size="27" font-weight="bold" fill="#243327" letter-spacing="2" text-anchor="middle">2027년 5월 8일 토요일 오후 1시 30분</text>
      <text x="${cardW/2}" y="1155" class="serif-kr" font-size="24" font-weight="normal" fill="#4B5448" letter-spacing="1" text-anchor="middle">대전 라도무스아트센터 8층 루미니스홀</text>

      <!-- URL link text -->
      <text x="${cardW/2}" y="1255" class="serif-en" font-size="20" fill="#8E7B5C" letter-spacing="3" text-anchor="middle">https://sungkyu-hyeonji-wedding.vercel.app</text>

      <!-- Bottom Sign-off -->
      <text x="${cardW/2}" y="1480" class="serif-en" font-size="20" fill="#B3A488" letter-spacing="6" text-anchor="middle">WITH LOVE · SUNGKYU &amp; HYEONJI</text>
    </svg>
  `);

  const cardBase = await sharp(cardSvg).png().toBuffer();

  const finalCard = await sharp(cardBase)
    .composite([
      { input: cardQr, left: Math.round((cardW - 520) / 2), top: 380 }
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(outputDir, 'wedding_qr_insert_card.png'), finalCard);
  fs.writeFileSync(path.join(artifactDir, 'wedding_qr_insert_card.png'), finalCard);

  console.log('All QR code files generated successfully!');
}

generateAllQRCodes().catch(err => {
  console.error('Generation failed:', err);
  process.exit(1);
});
