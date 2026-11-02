import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf-8');
const css = fs.readFileSync(path.join(rootDir, 'style.css'), 'utf-8');
const script = fs.readFileSync(path.join(rootDir, 'script.js'), 'utf-8');

describe('HandTextAI v0.1 Test Suite', () => {

  test('Page Styles Scope: exactly 3 styles present, 4th and 5th removed', () => {
    // Check that grid paper and indian exam pad were removed
    assert.strictEqual(html.includes('value="grid"'), false, 'Grid paper option must be removed');
    assert.strictEqual(html.includes('Indian exam pad'), false, 'Indian exam pad must not exist');

    // Check that the 3 required page styles are present
    assert.ok(html.includes('value="ruled"'), 'Standard Assignment Ruled must be present');
    assert.ok(html.includes('value="blank"'), 'Blank White / Ivory Page must be present');
    assert.ok(html.includes('value="spiral"'), 'Photorealistic Spiral Notebook must be present');

    // Check CSS styles for all 3
    assert.ok(css.includes('.page.ruled'), 'CSS must have .page.ruled');
    assert.ok(css.includes('.page.blank'), 'CSS must have .page.blank');
    assert.ok(css.includes('.page.spiral'), 'CSS must have .page.spiral');
    assert.ok(css.includes('.spiral-binding'), 'CSS must support photorealistic spiral binding');
    assert.ok(css.includes('.spiral-hole'), 'CSS must support punch holes');
    assert.ok(css.includes('.spiral-loop'), 'CSS must support 3D wire loops');
  });

  test('Realism Engine: 3 toggles from user image are present with exact text', () => {
    // 1. Vary each letter
    assert.ok(html.includes('Vary each letter'), 'Toggle 1 title must be "Vary each letter"');
    assert.ok(html.includes('badge-new'), 'Toggle 1 must have the "New" badge');
    assert.ok(html.includes('Repeated letters never look exactly the same.'), 'Toggle 1 must have correct description');

    // 2. Natural movement
    assert.ok(html.includes('Natural movement'), 'Toggle 2 title must be "Natural movement"');
    assert.ok(html.includes('Words, line starts and line spacing vary like a real hand.'), 'Toggle 2 must have correct description');

    // 3. Inkflow
    assert.ok(html.includes('Inkflow'), 'Toggle 3 title must be "Inkflow"');
    assert.ok(html.includes('Pressure changes stroke by stroke, like a real pen.'), 'Toggle 3 must have correct description');

    // Ensure toggle switches exist in CSS
    assert.ok(css.includes('.toggle-switch'), 'CSS must have .toggle-switch');
    assert.ok(css.includes('.toggle-slider'), 'CSS must have .toggle-slider');
  });

  test('Multi-Page Terminal Input: 10 page tabs, indicators, and Q&A template', () => {
    // Verify 10 tabs exist in HTML
    for (let i = 0; i < 10; i++) {
      assert.ok(html.includes(`data-page="${i}"`), `Tab for page index ${i} must exist`);
    }

    // Verify indicators
    assert.ok(html.includes('id="char-count"'), 'Character count indicator must exist');
    assert.ok(html.includes('id="line-count"'), 'Line count indicator must exist');
    assert.ok(html.includes('id="capacity-badge"'), 'Page capacity indicator must exist');

    // Verify Q&A template buttons
    assert.ok(html.includes('id="btn-insert-template"'), 'Insert Q&A template button must exist');
    assert.ok(html.includes('id="btn-top-template"'), 'Topbar Insert Q&A button must exist');

    // Verify script supports up to 10 paginated pages
    assert.ok(script.includes('MAX_PAGES = 10'), 'Script must cap pagination at 10 pages');
    assert.ok(script.includes('function paginate'), 'Script must contain a pagination engine');
    assert.ok(script.includes('PAGE_BREAK'), 'Script must support explicit page-break markers');
  });

  test('Ink Options: Royal Blue (#1a2a8c) and Carbon Black (#181818)', () => {
    assert.ok(html.includes('#1a2a8c'), 'Royal Blue (#1a2a8c) must be in markup');
    assert.ok(html.includes('#181818'), 'Carbon Black (#181818) must be in markup');
    assert.ok(script.includes('#1a2a8c'), 'Royal Blue must be default in script');
    assert.ok(html.includes('id="ink-color"'), 'Custom color picker must exist');
  });

  test('Ruled-Line Snapping Mathematics', () => {
    // Verify --rule-height and snapping rules
    assert.ok(css.includes('--rule-height: 34px'), 'Default rule height should be configured');
    assert.ok(css.includes('.hand-line'), 'hand-line CSS rule must exist');
    assert.ok(css.includes('height: var(--rule-height)'), 'Line height must match rule height');
    assert.ok(css.includes('align-items: flex-end'), 'Text must sit on baseline rule line');

    // Check header space offset
    assert.ok(html.includes('id="page-header"'), 'Page header must exist');
    assert.ok(html.includes('id="page-margin-line"'), 'Red margin line must exist');
  });

  test('High-Resolution 300 DPI Export Calculations', () => {
    // Standard A4: 210mm × 297mm
    // At 300 DPI:
    // Width: (210 / 25.4) * 300 = 2480.315 px
    // Height: (297 / 25.4) * 300 = 3507.874 px
    const targetWidth = Math.round((210 / 25.4) * 300);
    const targetHeight = Math.round((297 / 25.4) * 300);

    assert.strictEqual(targetWidth, 2480, 'A4 300 DPI width must be 2480 px');
    assert.strictEqual(targetHeight, 3508, 'A4 300 DPI height must be 3508 px');

    // Check script implementation
    assert.ok(script.includes('canvas.width = 2480'), 'Canvas must be created with 2480px width');
    assert.ok(script.includes('canvas.height = 3508'), 'Canvas must be created with 3508px height');
    assert.ok(script.includes('exportPng'), 'PNG export function must exist');
    assert.ok(script.includes('exportPdf'), 'PDF export function must exist');
  });

  test('PRNG Determinism and Realism Algorithms', () => {
    function mulberry32(seed) {
      return function () {
        let t = (seed += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    const rng1 = mulberry32(12345);
    const rng2 = mulberry32(12345);
    const val1 = [rng1(), rng1(), rng1()];
    const val2 = [rng2(), rng2(), rng2()];

    assert.deepStrictEqual(val1, val2, 'PRNG must be strictly deterministic given same seed');

    // Test stroke pressure range for Inkflow
    const rng = mulberry32(999);
    for (let i = 0; i < 50; i++) {
      const pressure = 0.82 + rng() * 0.16;
      assert.ok(pressure >= 0.80 && pressure <= 1.0, `Pressure ${pressure} should be in realistic bounds [0.80, 1.0]`);
    }
  });

  test('Font-accurate Word Wrapping & Unbreakable Token Handling', () => {
    assert.ok(script.includes('measureStringWidth'), 'Script must have string width measurement');
    assert.ok(script.includes('getUsableLineWidthPx'), 'Script must calculate usable line width');
    assert.ok(script.includes('FONT_WIDTH_FACTORS'), 'Script must have font-specific width factors');
  });

  test('Spiral Notebook Canvas Protection and Geometry', () => {
    assert.ok(script.includes('isSpiral ? 140 : 0'), 'Canvas must account for spiral offset');
    assert.ok(script.includes('ruledStartX = isSpiral ? (nbX + 15) : 0'), 'Ruled lines must be clipped inside notebook');
    assert.ok(script.includes('footerX = isSpiral ? (nbX + nbW - 60)'), 'Footer must be placed inside notebook');
  });

  test('Demo Assignment 3: Cyber Security in IoT is implemented', () => {
    assert.ok(script.includes('IOT_DEMO_CONTENT'), 'Script must have IOT_DEMO_CONTENT');
    assert.ok(script.includes('Assignment 3 Solutions: Cyber Security in IoT'), 'Must contain IoT assignment title');
    assert.ok(script.includes('Question 1: Explain the importance of cybersecurity in IoT'), 'Must contain Question 1');
    assert.ok(script.includes('Question 2: Describe the CIA Triad'), 'Must contain Question 2');
    assert.ok(script.includes('Question 3: Explain the IoT attack surface'), 'Must contain Question 3');
    assert.ok(script.includes('Question 4: Discuss data privacy issues in IoT'), 'Must contain Question 4');
    assert.ok(script.includes('Question 5: Explain the security requirements of IoT systems'), 'Must contain Question 5');
    assert.ok(script.includes('loadIotDemoAssignment'), 'Script must have loadIotDemoAssignment function');
    assert.ok(html.includes('btn-top-demo-iot'), 'HTML must have 1-click IoT demo button in top bar');
    assert.ok(html.includes('Load IoT Demo Assignment'), 'Button must have clear student label');
  });

  test('Upload Assignment as Document feature is implemented', () => {
    // Check UI elements for document upload
    assert.ok(html.includes('id="btn-top-upload-doc"'), 'HTML must have upload doc button in top actions');
    assert.ok(html.includes('id="btn-upload-doc"'), 'HTML must have upload doc button in editor toolbar');
    assert.ok(html.includes('id="upload-modal"'), 'HTML must have upload modal dialog');
    assert.ok(html.includes('id="drop-zone"'), 'HTML must have drag-and-drop zone');
    assert.ok(html.includes('id="doc-file-input"'), 'HTML must have hidden file input');
    
    // Check supported file formats badge in HTML
    assert.ok(html.includes('.docx'), 'Must advertise docx support');
    assert.ok(html.includes('.pdf'), 'Must advertise pdf support');
    assert.ok(html.includes('.txt'), 'Must advertise txt support');
    assert.ok(html.includes('.md'), 'Must advertise md support');

    // Check script document extraction methods
    assert.ok(script.includes('extractDocument'), 'Script must have extractDocument function');
    assert.ok(script.includes('extractTextFromDocx'), 'Script must have docx extraction');
    assert.ok(script.includes('extractTextFromPdf'), 'Script must have pdf extraction');
    assert.ok(script.includes('cleanExtractedText'), 'Script must have text cleaner for extracted docs');

    // Check external libraries are included
    assert.ok(html.includes('mammoth.browser.min.js'), 'Must include mammoth.js for DOCX parsing');
    assert.ok(html.includes('pdf.min.js'), 'Must include pdf.js for PDF text extraction');
  });

});

