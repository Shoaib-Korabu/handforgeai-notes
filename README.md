# HandTextAI — Natural Handwriting Generator for Assignments

Turn typed assignment text into authentic handwritten notes formatted on ruled paper, ivory sheets, or open spiral notebooks — ready for university submission without detection.

Zero external runtime dependencies. Runs directly in any modern web browser or via a simple static file server.

![version](https://img.shields.io/badge/version-0.1.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)
![tests](https://img.shields.io/badge/tests-7%20passed-brightgreen)

---

## Features (v0.1.0)

### 1. Three Core Page Styles
1. **Standard Assignment Ruled Page**: Blue ruled lines with red vertical margin line, structured student assignment header box (Name, Roll No, Subject, Date), and page numbers.
2. **Blank White / Ivory Page**: Clean sheet with subtle warm paper texture and natural margins.
3. **Photorealistic Spiral Notebook (Photo Mode)**: Open spiral-bound notebook on an authentic desk background with realistic 3D metallic spiral coil rings, punch holes, inner spine shadow, and natural page curvature.

*(Fourth and fifth styles like Indian exam pad and grid paper removed as requested).*

### 2. Handwriting Realism Engine
Directly implements the three realism controls:
- **Vary each letter** `[New]`: "Repeated letters never look exactly the same." Introduces deterministic per-character micro-rotations (±2.2°), subtle scaling, and vertical micro-jitter so identical letters appear distinct.
- **Natural movement**: "Words, line starts and line spacing vary like a real hand." Simulates organic left margin drift, natural baseline wobble wave along lines, and variable inter-word spacing.
- **Inkflow**: "Pressure changes stroke by stroke, like a real pen." Simulates pen pressure fluctuations (firmer initial strokes and punctuation, lighter mid-word flow) and subtle ink absorption into paper fibers.

### 3. Multi-Page Terminal Input
- **10-Page Tabbed Interface**: Seamlessly switch between Page 1 through Page 10.
- **Page Indicators**: Real-time character count, line count, and capacity meter (`Fits 1 Page`, `Near Page Limit`, `Overflow Warning`).
- **Q&A Assignment Template**: 1-click button to insert formatted questions and answers.
- **Automatic State Persistence**: Assignment drafts persist across browser refreshes via `localStorage`.

### 4. Ink & Pen Options
- **Royal Blue** (`#1a2a8c`): Standard ballpoint / fountain pen blue ink.
- **Carbon Black** (`#181818`): Deep carbon black gel pen ink.
- **Custom Color Picker**: Select any custom ink hue.
- **5 Handwriting Fonts**: Caveat (Casual), Kalam (Clean), Patrick Hand (Classroom Print), Shadows Into Light (Quick Notes), and Homemade Apple (Cursive).

### 5. Ruled-Line Snapping
Handwritten text mathematically aligns onto the horizontal blue ruled lines. Baseline alignment anchors font descenders and ascenders naturally on the page rules.

### 6. High-Resolution 300 DPI Export
- **Download PDF (300 DPI)**: High-resolution A4 export via `jsPDF` for the current page or a complete multi-page PDF document.
- **Download PNG (300 DPI)**: Direct 2480 × 3508 pixel A4 rendering for ultra-crisp printing or submission.
- **Print / Save as PDF**: Clean `@media print` CSS preserving exact A4 dimensions and paper rulings.

---

## Running Locally

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
