// Script to generate PWA icons from SVG
import sharp from 'sharp';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from "path";

const sizes = [16, 32, 70, 72, 96, 128, 144, 150, 152, 180, 192, 310, 384, 512];

async function generateIcons() {
  const iconsDir = join(process.cwd(), "public", "icons");
  const publicDir = join(process.cwd(), "public");
  
  if (!existsSync(iconsDir)) {
    mkdirSync(iconsDir, { recursive: true });
  }

  // Create a simple gold circle icon with text
  const svgIcon = (size: number) => `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#DAA520"/>
          <stop offset="50%" style="stop-color:#B8860B"/>
          <stop offset="100%" style="stop-color:#8B6914"/>
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="#1a1a1a"/>
      <g transform="translate(${size / 2}, ${size / 2})">
        <path d="M${-size * 0.15} ${size * 0.25} L${-size * 0.1} ${-size * 0.1} L${-size * 0.2} ${-size * 0.15} L${-size * 0.2} ${-size * 0.2} L${-size * 0.05} ${-size * 0.2} L${-size * 0.05} ${-size * 0.15} L0 ${-size * 0.2} L${size * 0.15} ${-size * 0.15} L${size * 0.15} ${-size * 0.1} L${size * 0.1} ${-size * 0.05} L${size * 0.1} ${size * 0.25} Z" 
              fill="url(#gold)" stroke="#F4E4BC" stroke-width="${size * 0.005}"/>
        <ellipse cx="${-size * 0.025}" cy="${-size * 0.2}" rx="${size * 0.12}" ry="${size * 0.04}" fill="url(#gold)" stroke="#F4E4BC" stroke-width="${size * 0.003}"/>
        <circle cx="${-size * 0.025}" cy="${-size * 0.25}" r="${size * 0.04}" fill="url(#gold)" stroke="#F4E4BC" stroke-width="${size * 0.003}"/>
      </g>
    </svg>
  `;

  // Generate icons for each size
  for (const size of sizes) {
    const outputPath = join(iconsDir, `icon-${size}x${size}.png`);
    
    try {
      await sharp(Buffer.from(svgIcon(size)))
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Generated: icon-${size}x${size}.png`);
    } catch (error) {
      console.error(`❌ Error generating icon-${size}x${size}.png:`, error);
    }
  }

  // Generate apple-touch-icon (180x180)
  const appleIcon = join(iconsDir, "apple-touch-icon.png");
  try {
    await sharp(Buffer.from(svgIcon(180)))
      .png()
      .toFile(appleIcon);
    console.log(`✅ Generated: apple-touch-icon.png`);
  } catch (error) {
    console.error(`❌ Error generating apple-touch-icon.png:`, error);
  }

  // Generate favicons
  try {
    await sharp(Buffer.from(svgIcon(32)))
      .png()
      .toFile(join(publicDir, "favicon-32x32.png"));
    console.log(`✅ Generated: favicon-32x32.png`);
    
    await sharp(Buffer.from(svgIcon(16)))
      .png()
      .toFile(join(publicDir, "favicon-16x16.png"));
    console.log(`✅ Generated: favicon-16x16.png`);
  } catch (error) {
    console.error(`❌ Error generating favicons:`, error);
  }

  console.log("\n🎉 All icons generated successfully!");
}

generateIcons().catch(console.error);
