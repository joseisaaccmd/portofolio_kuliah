import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const INPUT = path.join(ROOT, "public/images/hero-gemini.jpg");
const OUTPUT = path.join(ROOT, "public/images/hero-gemini.png");
const THRESHOLD = 240;
const FEATHER = 0.7;

const { data, info } = await sharp(INPUT)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: w, height: h, channels: c } = info;

const isBg = (px) =>
  px < data.length &&
  data[px] >= THRESHOLD &&
  data[px + 1] >= THRESHOLD &&
  data[px + 2] >= THRESHOLD;

const mask = new Uint8Array(w * h).fill(255);
const visited = new Uint8Array(w * h);
const queue = [];

const seed = (x, y) => {
  if (x < 0 || y < 0 || x >= w || y >= h) return;
  const i = y * w + x;
  if (visited[i]) return;
  visited[i] = 1;
  queue.push(i);
};

for (let x = 0; x < w; x++) {
  seed(x, 0);
  seed(x, h - 1);
}
for (let y = 0; y < h; y++) {
  seed(0, y);
  seed(w - 1, y);
}

while (queue.length) {
  const i = queue.pop();
  const x = i % w;
  const y = (i / w) | 0;
  if (!isBg(i * c)) continue;
  mask[i] = 0;
  seed(x + 1, y);
  seed(x - 1, y);
  seed(x, y + 1);
  seed(x, y - 1);
}

function boxBlur(src, width, height, radius) {
  const tmp = new Float32Array(width * height);
  const dst = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let n = 0;
      for (let dx = -radius; dx <= radius; dx++) {
        const xx = x + dx;
        if (xx < 0 || xx >= width) continue;
        sum += src[y * width + xx];
        n++;
      }
      tmp[y * width + x] = sum / n;
    }
  }
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let sum = 0;
      let n = 0;
      for (let dy = -radius; dy <= radius; dy++) {
        const yy = y + dy;
        if (yy < 0 || yy >= height) continue;
        sum += tmp[yy * width + x];
        n++;
      }
      dst[y * width + x] = sum / n;
    }
  }
  return dst;
}

const blurred = boxBlur(mask, w, h, Math.max(1, Math.round(FEATHER)));

for (let i = 0; i < w * h; i++) {
  data[i * c + 3] = mask[i] === 255 ? blurred[i] : 0;
}

await sharp(data, { raw: { width: w, height: h, channels: c } })
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT);

let transparent = 0;
let opaque = 0;
for (let i = 0; i < w * h; i++) {
  if (data[i * c + 3] === 0) transparent++;
  if (data[i * c + 3] === 255) opaque++;
}

console.log(`output: ${OUTPUT}`);
console.log(
  `transparent pct: ${((transparent / (w * h)) * 100).toFixed(1)}  opaque pct: ${(
    (opaque / (w * h)) *
    100
  ).toFixed(1)}`
);
