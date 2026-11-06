import fs from 'fs';

const cssPath = 'C:/Users/20182468/.gemini/antigravity/scratch/mobile-wedding-invitation/src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

const fontPath = 'C:/Users/20182468/.gemini/antigravity/scratch/mobile-wedding-invitation/public/fonts/continuous.ttf';
const b64 = fs.readFileSync(fontPath).toString('base64');

const continuousRule = `
@font-face {
    font-family: 'Continuous';
    src: url('data:font/truetype;charset=utf-8;base64,${b64}') format('truetype'),
         url('/fonts/continuous.ttf') format('truetype'),
         url('/fonts/continuous.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
    font-display: block;
}

.font-continuous {
    font-family: 'Continuous', cursive, sans-serif !important;
}
`;

if (!css.includes("font-family: 'Continuous'")) {
  css = css.replace('/* --- Global Utilities', continuousRule + '\n/* --- Global Utilities');
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('Successfully embedded Continuous font into src/index.css!');
} else {
  console.log('Continuous font already present in src/index.css');
}
