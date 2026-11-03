# HandTextAI — Natural Handwriting Generator for Assignments

Turn typed assignment text into authentic handwritten notes formatted on ruled paper, ivory sheets, or open spiral notebooks — ready for university submission without detection.

Zero external runtime dependencies. Runs directly in any modern web browser or via a simple static file server.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2ea44f?style=for-the-badge&logo=github)](https://shoaib-korabu.github.io/handforgeai-notes/)
![version](https://img.shields.io/badge/version-0.1.2-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![tests](https://img.shields.io/badge/tests-14%20passed-brightgreen)

🌐 **Live Website / Demo**: [https://shoaib-korabu.github.io/handforgeai-notes/](https://shoaib-korabu.github.io/handforgeai-notes/)

---

## Features (v0.1.2)

### 1. Three Core Page Styles
1. **Standard Assignment Ruled Page**: Blue ruled lines with red vertical margin line, structured student assignment header box (Name, Roll No, Subject, Date), and page numbers.
2. **Blank White / Ivory Page**: Clean sheet with subtle warm paper texture and natural margins.
3. **Photorealistic Spiral Notebook (Photo Mode)**: Open spiral-bound notebook on an authentic desk background with realistic 3D metallic spiral coil rings, punch holes, inner spine shadow, and natural page curvature.

*(Fourth and fifth styles like Indian exam pad and grid paper removed as requested).*

### 2. Enhanced Handwriting Realism Engine
Directly implements the realism controls with advanced anti-detection heuristics:
- **Vary each letter** `[New]`: "Repeated letters never look exactly the same."
  - **Consecutive Duplicate Differentiation**: Consecutive identical letters (e.g. `oo`, `ee`, `ll`, `ss`, `tt`) receive inverted angles, contrasting vertical scales, and distinct micro-slants so double letters never look identical.
  - **Word Role Dynamics**: Initial letters have firmer stances while terminal letters feature subtle exit flourishes.
  - **Micro-Jitter & Slant**: Deterministic per-glyph rotation, scale, and shear jitter.
- **Natural movement**: "Words, line starts and line spacing vary like a real hand."
  - **Arm Pivot Line Slant**: Simulates human forearm pivot from the margin (-0.3° to +0.3° natural line tilt).
  - **Organic Left Margin Drift**: Simulates natural arm drift down the page.
  - **Baseline Wobble & Variable Spacing**: Low-frequency sinusoidal baseline undulation and variable inter-word spacing.
- **Inkflow**: "Pressure changes stroke by stroke, like a real pen."
  - **Dynamic Pigment Tone Shading**: Pigment concentration reacts to pressure — higher pressure produces deeper, saturated ink, while lighter strokes reveal underlying paper grain.
  - **Punctuation Ink Pooling**: Periods, commas, and question marks receive authentic ink pooling and micro-bleed.
  - **Paper Fiber Micro-Bleed**: Ultra-fine lateral diffusion simulating liquid ink absorption into paper fibers.
- **1-Click Intensity Presets**: Quick switch between **Neat (0.6x)**, **Natural (1.0x)**, and **Exam Rush (1.6x)**.

### 3. Upload Assignment as Document (.docx, .pdf, .txt, .md)
- Import existing assignments directly from Word documents (`.docx`), PDF files (`.pdf`), plain text (`.txt`), or markdown (`.md`).
- Automatically extracts and formats assignment text into the flowing multi-page editor.
- Includes preloaded **Assignment 3 Solutions: Cyber Security in IoT** 3-page university assignment demo.

### 4. Multi-Page Terminal Input & Auto-Pagination
- **10-Page Flowing Document**: Type or paste flowing assignment content; pages paginate automatically.
- **Explicit Page Breaks**: Insert `⏎ New Page` marker at any section.
- **Page Indicators**: Real-time character count, line count, and capacity meter (`Fits 1 Page`, `3 Pages`, `Overflow Warning`).
- **Student Assignment Header**: Customizable Name, Roll No / ID, Subject, Assignment Title, and Submission Date.
- **Automatic State Persistence**: Assignment drafts persist across browser refreshes via `localStorage`.

### 5. Ink & Pen Typography
- **Royal Blue** (`#1a2a8c`): Standard ballpoint / fountain pen blue ink with dynamic shading.
- **Carbon Black** (`#181818`): Deep carbon black gel pen ink.
- **Custom Color Picker**: Select any custom ink hue.
- **5 Handwriting Fonts**: Caveat (Casual Student), Kalam (Clean & Neat), Patrick Hand (Classroom Print), Shadows Into Light (Quick Notes), and Homemade Apple (Cursive Flow).

### 6. High-Resolution 300 DPI Export
- **Download PDF (300 DPI)**: Multi-page high-resolution A4 export via `jsPDF` matching exact physical print dimensions (2480 × 3508 px).
- **Download PNG (300 DPI)**: Direct high-resolution rendering with realistic inkflow and paper textures.
- **Print / Save as PDF**: Clean `@media print` CSS preserving exact A4 dimensions and paper rulings.

---

## Live Demo & Running Locally

### Live Demo (GitHub Pages)
Visit [https://shoaib-korabu.github.io/handforgeai-notes/](https://shoaib-korabu.github.io/handforgeai-notes/)

### Run Locally
Open `index.html` directly in your browser:

```bash
xdg-open index.html   # Linux
open index.html       # macOS
```

Or run a local static server:

```bash
python3 -m http.server 8000
# Open http://localhost:8000
```

---

## Build Verification & Testing

Verify assets, syntax, and automated test suite:

```bash
# Validate build integrity
npm run build

# Run automated test suite
npm test
```

---

## License

MIT © Shoaib Korabu
