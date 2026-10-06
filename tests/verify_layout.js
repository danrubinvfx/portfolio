const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const regex = /<section\s+id=["']([^"']+)["']/g;
const sections = [];
let match;
while ((match = regex.exec(html)) !== null) {
  sections.push(match[1]);
}

console.log("Found sections in index.html:");
sections.forEach((s, i) => console.log(`  ${i + 1}. #${s}`));

const expectedOrder = [
  "top-cycling-banner",
  "artist-reel",
  "hero",
  "supervisory-reels",
  "featured-stills-carousel",
  "experience",
  "projects",
  "teaching",
  "supervision",
  "ai-notes",
  "contact"
];

let allMatch = true;
expectedOrder.forEach((expected, i) => {
  if (sections[i] !== expected) {
    console.error(`Mismatch at position ${i + 1}: expected #${expected}, got #${sections[i]}`);
    allMatch = false;
  }
});

if (allMatch) {
  console.log("\nSUCCESS: All sections are in the exact requested order!");
} else {
  console.error("\nFAILURE: Section order mismatch!");
  process.exit(1);
}
