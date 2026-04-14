const sharp = require("sharp");
const path = require("path");

const input = path.join(__dirname, "..", "public", "images", "Hero Section Image.png");
const output = path.join(__dirname, "..", "public", "images", "hero.jpg");

sharp(input)
  .metadata()
  .then((meta) => {
    console.log("input:", meta.width + "x" + meta.height, Math.round(meta.size / 1024) + "KB");
    return sharp(input)
      .resize({ width: Math.min(meta.width, 2400), withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(output);
  })
  .then(() => sharp(output).metadata())
  .then((meta) => {
    console.log("output:", meta.width + "x" + meta.height, Math.round(meta.size / 1024) + "KB");
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });