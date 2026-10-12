import { sign } from "./jwt";

const CHARS = "23456789ABCDEFGHJKMNPQRSTWXYZ";
const COLORS = ["#0f172a", "#1e293b", "#0369a1", "#047857", "#4338ca", "#b45309", "#0e7490"];
const LINE_COLORS = ["#cbd5e1", "#94a3b8", "#64748b", "#38bdf8", "#818cf8"];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function generateCaptcha(): Promise<{ svg: string; token: string }> {
  let code = "";
  for (let i = 0; i < 5; i++) {
    code += CHARS[randomInt(0, CHARS.length - 1)];
  }

  const width = 150;
  const height = 48;

  // Background and noise
  let noiseSvg = "";

  // 4 curved noise lines
  for (let i = 0; i < 4; i++) {
    const startX = randomInt(5, 30);
    const startY = randomInt(5, height - 5);
    const ctrl1X = randomInt(35, 75);
    const ctrl1Y = randomInt(5, height - 5);
    const ctrl2X = randomInt(80, 120);
    const ctrl2Y = randomInt(5, height - 5);
    const endX = randomInt(125, width - 5);
    const endY = randomInt(5, height - 5);
    const color = LINE_COLORS[i % LINE_COLORS.length];
    noiseSvg += `<path d="M${startX},${startY} C${ctrl1X},${ctrl1Y} ${ctrl2X},${ctrl2Y} ${endX},${endY}" stroke="${color}" stroke-width="${(
      Math.random() * 0.8 +
      1.2
    ).toFixed(1)}" fill="none" opacity="0.6"/>`;
  }

  // 25 noise dots
  for (let i = 0; i < 25; i++) {
    const cx = randomInt(5, width - 5);
    const cy = randomInt(5, height - 5);
    const r = (Math.random() * 1.2 + 0.8).toFixed(1);
    const fill = LINE_COLORS[randomInt(0, LINE_COLORS.length - 1)];
    noiseSvg += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" opacity="0.45"/>`;
  }

  // Draw 5 characters
  let textSvg = "";
  const charSpacing = 24;
  const startX = 18;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const x = startX + i * charSpacing + randomInt(-2, 2);
    const y = randomInt(31, 35);
    const deg = randomInt(-16, 16);
    const color = COLORS[randomInt(0, COLORS.length - 1)];
    const fontSize = randomInt(23, 27);

    textSvg += `<text x="${x}" y="${y}" font-family="system-ui, -apple-system, monospace, sans-serif" font-weight="bold" font-size="${fontSize}" fill="${color}" transform="rotate(${deg}, ${x}, ${y})" text-anchor="middle" letter-spacing="1">${char}</text>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="Security code challenge" style="display:block;border-radius:8px;background:linear-gradient(135deg, #f8fafc 0%, #edf2f7 100%);border:1px solid #cbd5e1;user-select:none;">
    ${noiseSvg}
    ${textSvg}
  </svg>`.replace(/\s+/g, " ");

  const token = await sign({ kind: "captcha", code }, "10m");

  return { svg, token };
}
