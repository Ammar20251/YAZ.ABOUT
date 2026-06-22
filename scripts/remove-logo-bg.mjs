import sharp from 'sharp';
import { copyFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2];
const output = join(root, 'static/images/yaz-logo.png');
const THRESHOLD = Number(process.argv[3] ?? 236);

if (!input) {
  console.error('Usage: node scripts/remove-logo-bg.mjs <input.png> [threshold]');
  process.exit(1);
}

const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
    data[i + 3] = 0;
  }
}

await sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 }
})
  .trim({ threshold: 10 })
  .png({ compressionLevel: 9 })
  .toFile(output);

copyFileSync(output, join(root, 'static/apple-touch-icon.png'));

const meta = await sharp(output).metadata();
console.log(`Wrote ${output} (${meta.width}x${meta.height})`);
