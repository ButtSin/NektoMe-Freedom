import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const browser = process.argv[2] || 'chromium';

const sourceFile = path.resolve(__dirname, '../public/manifest.json');
const destFile = path.resolve(__dirname, '../dist/manifest.json');

if (!fs.existsSync(sourceFile)) {
  console.error(`❌ Файл ${sourceFile} не найден!`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

if (browser === 'firefox') {
  if (manifest.background?.service_worker) {
    manifest.background = {
      scripts: [manifest.background.service_worker],
    };
  }

  manifest.browser_specific_settings = {
    gecko: {
      id: 'nektome-freedom@dmitrii.buttsin',
      strict_min_version: '115.0',
    },
  };
}

const destDir = path.dirname(destFile);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

fs.writeFileSync(destFile, JSON.stringify(manifest, null, 2));
console.log(`✅ Манифест для ${browser.toUpperCase()} (v${manifest.version}) собран в dist/`);
