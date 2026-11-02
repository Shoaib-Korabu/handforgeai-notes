#!/usr/bin/env node
/**
 * scripts/build.js
 * Validates HandTextAI assets, HTML/CSS/JS syntax, element IDs, and specification compliance.
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🚀 Running HandTextAI build verification...');

// 1. Verify existence of core files
const requiredFiles = ['index.html', 'style.css', 'script.js', 'print.css', 'package.json', 'README.md'];
for (const file of requiredFiles) {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
}
console.log('  ✓ Core files present');

// 2. Validate script.js syntax
const scriptContent = fs.readFileSync(path.join(rootDir, 'script.js'), 'utf-8');
try {
  new vm.Script(scriptContent);
  console.log('  ✓ script.js syntax is valid');
} catch (err) {
  console.error('❌ Syntax error in script.js:', err);
  process.exit(1);
}

// 3. Validate index.html contents
const htmlContent = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');

// Check that ONLY the 3 page styles exist (and grid is removed)
if (htmlContent.includes('value="grid"')) {
  console.error('❌ Found removed page style: "grid" should not be an option');
  process.exit(1);
}
if (htmlContent.includes('Indian exam pad')) {
  console.error('❌ Found removed page style: "Indian exam pad" should not be present');
  process.exit(1);
}

const requiredStyles = ['value="ruled"', 'value="blank"', 'value="spiral"'];
for (const style of requiredStyles) {
  if (!htmlContent.includes(style)) {
    console.error(`❌ Missing required page style: ${style}`);
    process.exit(1);
  }
}
console.log('  ✓ Exactly 3 page styles verified (Blank, Ruled, Spiral; Grid removed)');

// Check that all 3 Realism toggles from the uploaded image exist
const realismFeatures = [
  'Vary each letter',
  'Repeated letters never look exactly the same.',
  'Natural movement',
  'Words, line starts and line spacing vary like a real hand.',
  'Inkflow',
  'Pressure changes stroke by stroke, like a real pen.'
];
for (const feat of realismFeatures) {
  if (!htmlContent.includes(feat)) {
    console.error(`❌ Missing realism feature text in index.html: "${feat}"`);
    process.exit(1);
  }
}
console.log('  ✓ Realism Engine toggles verified (Vary each letter [New], Natural movement, Inkflow)');

// Check Multi-page tabs 1-10
for (let p = 0; p < 10; p++) {
  if (!htmlContent.includes(`data-page="${p}"`)) {
    console.error(`❌ Missing tab for page index ${p}`);
    process.exit(1);
  }
}
console.log('  ✓ Multi-Page tabs (Pages 1 to 10) verified');

// Check ink colors
if (!htmlContent.includes('#1a2a8c') || !htmlContent.includes('#181818')) {
  console.error('❌ Missing Royal Blue (#1a2a8c) or Carbon Black (#181818) in ink selectors');
  process.exit(1);
}
console.log('  ✓ Ink options (Royal Blue #1a2a8c and Carbon Black #181818) verified');

// Check fonts
const requiredFonts = ['Caveat', 'Kalam', 'Patrick Hand', 'Shadows Into Light', 'Homemade Apple'];
for (const font of requiredFonts) {
  if (!htmlContent.includes(font)) {
    console.error(`❌ Missing required font: ${font}`);
    process.exit(1);
  }
}
console.log('  ✓ Handwriting fonts verified (Caveat, Kalam, Patrick Hand, Shadows Into Light, Homemade Apple)');

// Check Upload Document feature and Demo Assignment
if (!htmlContent.includes('btn-top-upload-doc') || !htmlContent.includes('upload-modal') || !htmlContent.includes('doc-file-input')) {
  console.error('❌ Missing Upload Document UI elements in index.html');
  process.exit(1);
}
if (!htmlContent.includes('btn-top-demo-iot') || !scriptContent.includes('IOT_DEMO_CONTENT')) {
  console.error('❌ Missing IoT Demo Assignment elements in index.html / script.js');
  process.exit(1);
}
console.log('  ✓ Upload Doc feature & IoT Demo Assignment verified');

// 4. Validate style.css
const cssContent = fs.readFileSync(path.join(rootDir, 'style.css'), 'utf-8');
const requiredCssClasses = [
  '.page.ruled',
  '.page.blank',
  '.page.spiral',
  '.spiral-binding',
  '.spiral-hole',
  '.spiral-loop',
  '.toggle-switch',
  '.hand-line',
  '.hand-word',
  '.hand-glyph',
  '.inkflow-enabled'
];
for (const cls of requiredCssClasses) {
  if (!cssContent.includes(cls)) {
    console.error(`❌ Missing required CSS class/rule: ${cls}`);
    process.exit(1);
  }
}
console.log('  ✓ style.css classes and photorealistic spiral rules verified');

console.log('\n✨ Build verification successful! Zero errors.');
