const sharp = require("sharp");
const path = require("path");

const root = path.join(__dirname, "..", "public", "images", "Team");

async function run() {
  const banner = path.join(root, "Team Banner.png.bak");
  const bannerOut = path.join(root, "Team Banner.jpg");
  const meta1 = await sharp(banner).metadata();
  await sharp(banner)
    .resize({ width: Math.min(meta1.width, 1920), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(bannerOut);
  console.log("banner:", meta1.width + "x" + meta1.height, "->", bannerOut);

  const portrait = path.join(root, "Bipin Parmar.png.bak");
  const portraitOut = path.join(root, "Bipin Parmar.jpg");
  const meta2 = await sharp(portrait).metadata();
  await sharp(portrait)
    .resize({ width: Math.min(meta2.width, 800), withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(portraitOut);
  console.log("portrait:", meta2.width + "x" + meta2.height, "->", portraitOut);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});