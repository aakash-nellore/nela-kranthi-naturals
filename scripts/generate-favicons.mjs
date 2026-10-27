import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// RGBA to DIB (BITMAPINFOHEADER + BGRA bottom-up + 1-bit AND mask)
function rgbaToDib(rawBuffer, width, height) {
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0); // biSize
  header.writeInt32LE(width, 4); // biWidth
  header.writeInt32LE(height * 2, 8); // biHeight (doubled in ICO format)
  header.writeUInt16LE(1, 12); // biPlanes
  header.writeUInt16LE(32, 14); // biBitCount
  header.writeUInt32LE(0, 16); // biCompression BI_RGB
  header.writeUInt32LE(width * height * 4, 20); // biSizeImage
  header.writeInt32LE(0, 24); // biXPelsPerMeter
  header.writeInt32LE(0, 28); // biYPelsPerMeter
  header.writeUInt32LE(0, 32); // biClrUsed
  header.writeUInt32LE(0, 36); // biClrImportant

  // XOR mask: BGRA, bottom scanlines first
  const pixelData = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y;
    for (let x = 0; x < width; x++) {
      const srcIdx = (srcY * width + x) * 4;
      const dstIdx = (y * width + x) * 4;
      pixelData[dstIdx + 0] = rawBuffer[srcIdx + 2]; // B
      pixelData[dstIdx + 1] = rawBuffer[srcIdx + 1]; // G
      pixelData[dstIdx + 2] = rawBuffer[srcIdx + 0]; // R
      pixelData[dstIdx + 3] = rawBuffer[srcIdx + 3]; // A
    }
  }

  // AND mask: 1 bit per pixel, padded to 32 bits per row
  const andRowBytes = Math.ceil(width / 32) * 4;
  const andMask = Buffer.alloc(andRowBytes * height, 0);
  for (let y = 0; y < height; y++) {
    const srcY = height - 1 - y;
    for (let x = 0; x < width; x++) {
      const srcIdx = (srcY * width + x) * 4;
      const a = rawBuffer[srcIdx + 3];
      if (a === 0) {
        const byteIdx = y * andRowBytes + Math.floor(x / 8);
        const bitIdx = 7 - (x % 8);
        andMask[byteIdx] |= (1 << bitIdx);
      }
    }
  }

  return Buffer.concat([header, pixelData, andMask]);
}

// Build standard multi-resolution ICO file
function buildIco(images) {
  const count = images.length;
  let offset = 6 + count * 16;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // ICO format
  header.writeUInt16LE(count, 4);

  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // image size
    entry.writeUInt32LE(offset, 12); // image offset
    entries.push(entry);
    offset += img.buffer.length;
  }

  return Buffer.concat([header, ...entries, ...images.map(i => i.buffer)]);
}

async function main() {
  const sourcePath = path.resolve(__dirname, '../public/images/brand-logo.png');
  if (!fs.existsSync(sourcePath)) {
    console.error('Source logo missing at', sourcePath);
    process.exit(1);
  }

  // 1. Prepare clean centered emblem for small favicon resolutions (16x16, 32x32, 48x48)
  const patch = await sharp({
    create: {
      width: 1181,
      height: 140,
      channels: 4,
      background: { r: 16, g: 47, b: 40, alpha: 1 }
    }
  }).png().toBuffer();

  const originalWithCover = await sharp(sourcePath)
    .composite([{ input: patch, left: 0, top: 720 }])
    .png()
    .toBuffer();

  const emblemCropSize = 750;
  const left = Math.round(603 - emblemCropSize / 2);
  const top = Math.round(490 - emblemCropSize / 2);

  const circleMask = Buffer.from(
    `<svg width="${emblemCropSize}" height="${emblemCropSize}"><circle cx="${emblemCropSize / 2}" cy="${emblemCropSize / 2}" r="${emblemCropSize / 2}" fill="#fff" /></svg>`
  );

  const centeredEmblem = await sharp(originalWithCover)
    .extract({ left, top, width: emblemCropSize, height: emblemCropSize })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Generate 16x16, 32x32, 48x48 raw RGBA buffers
  const raw16 = await sharp(centeredEmblem).resize(16, 16).ensureAlpha().raw().toBuffer();
  const raw32 = await sharp(centeredEmblem).resize(32, 32).ensureAlpha().raw().toBuffer();
  const raw48 = await sharp(centeredEmblem).resize(48, 48).ensureAlpha().raw().toBuffer();

  const dib16 = rgbaToDib(raw16, 16, 16);
  const dib32 = rgbaToDib(raw32, 32, 32);
  const dib48 = rgbaToDib(raw48, 48, 48);

  const icoBuffer = buildIco([
    { width: 16, height: 16, buffer: dib16 },
    { width: 32, height: 32, buffer: dib32 },
    { width: 48, height: 48, buffer: dib48 }
  ]);

  // 2. Full official brand logo for 512x512 (icon.png) and 180x180 (apple-icon.png)
  const icon512 = await sharp(sourcePath).resize(512, 512).png().toBuffer();
  const appleIcon180 = await sharp(sourcePath).resize(180, 180).png().toBuffer();

  // Write outputs to app/ and public/
  fs.writeFileSync(path.resolve(__dirname, '../app/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.resolve(__dirname, '../app/icon.png'), icon512);
  fs.writeFileSync(path.resolve(__dirname, '../app/apple-icon.png'), appleIcon180);
  fs.writeFileSync(path.resolve(__dirname, '../public/apple-touch-icon.png'), appleIcon180);

  console.log('Generated brand favicon assets successfully:');
  console.log(' - app/favicon.ico (' + icoBuffer.length + ' bytes)');
  console.log(' - app/icon.png (' + icon512.length + ' bytes)');
  console.log(' - app/apple-icon.png (' + appleIcon180.length + ' bytes)');
  console.log(' - public/apple-touch-icon.png (' + appleIcon180.length + ' bytes)');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
