import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const manifestPath = path.resolve(__dirname, '../public/manifest.json');
const packageJsonPath = path.resolve(__dirname, '../package.json');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

if (pkg.version !== manifest.version) {
  pkg.version = manifest.version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`✅ Версия в package.json обновлена до ${manifest.version}`);
} else {
  console.log(`✅ Версии уже синхронизированы (${manifest.version})`);
}
