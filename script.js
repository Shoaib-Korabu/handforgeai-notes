/**
 * HandTextAI v0.1.0 — Natural Handwriting Engine for University Assignments
 * Features:
 *  - 3 Page Styles: Blank Ivory, Standard Assignment Ruled, Photorealistic Spiral Notebook
 *  - Realism Engine: Vary each letter, Natural movement, Inkflow pressure
 *  - Multi-Page Terminal Input (Pages 1 to 10)
 *  - Ink options: Royal Blue (#1a2a8c) and Carbon Black (#181818)
 *  - Ruled-line snapping: Text lines mathematically align to ruled lines
 *  - 300 DPI high-resolution PNG & PDF export (jsPDF)
 */

(() => {
  "use strict";

  // Default seed: Software Engineering Assignment 2 solutions as one flowing document.
  // \f (form feed) is the explicit page-break sentinel the user can insert via the "⏎ New Page" button.
  const DEFAULT_CONTENT = `ASSIGNMENT 2 SOLUTIONS

Q1. Define software. Explain the characteristics of software with suitable examples.

Definition:
Software is a set of computer programs, instructions, procedures, and documentation that tell computer hardware what to do and how to perform specific tasks. (Examples: Google Chrome, Microsoft Word, Operating Systems).

Key Characteristics of Software:
1. Intangible: Software has no physical form. It cannot be touched like hardware; it exists as digital code and logic.
2. Developed/Engineered, Not Manufactured: Software is created through logical design and coding rather than mass-produced on an assembly line.
3. Does Not Wear Out: Software does not physically degrade or wear out over time like hardware. However, it requires maintenance to fix bugs or update features.
4. Reusable: Software modules and functions can be reused in different projects to save development time.
5. Easy to Modify: Software can be updated, customized, and maintained to meet changing user requirements.

Q2. Explain the different software application domains with suitable examples.
A software application domain is a specific area or field where software is used to solve problems or perform tasks.

Major Software Application Domains:
1. System Software: Manages computer hardware and provides a platform for applications. (Examples: Operating Systems like Windows and Linux, Device Drivers).
2. Embedded Software: Resides inside hardware devices to control specific device functions. (Examples: Microwave ovens, washing machines, automobile control units).
3. Web Applications: Software that runs on web servers and is accessed through web browsers. (Examples: Amazon shopping portal, online banking sites).
4. Business Software: Used by organizations to manage daily business operations. (Examples: Payroll systems, accounting tools, inventory management).
5. Artificial Intelligence (AI) Software: Uses complex algorithms to simulate human intelligence and decision-making. (Examples: Chatbots like ChatGPT, speech recognition systems).
\fQ3. Define Software Engineering. Explain the need and importance of Software Engineering.

Definition:
Software Engineering is the systematic application of engineering principles, methods, and practices to the design, development, testing, operation, and maintenance of software.

Need and Importance of Software Engineering:
1. Manages High Complexity: Modern software systems are large and complex; systematic engineering provides structure and planning.
2. Ensures Quality and Reliability: Saves costs and prevents failures through systematic testing and bug reduction.
3. Controls Cost and Time: Proper scheduling and estimation prevent project delay and budget overruns.
4. Improves Maintainability: Structured code and documentation make it easy to modify and update software over time.
5. Enables Team Collaboration: Provides standard guidelines and processes so multiple developers can work together efficiently.

Q4. Explain McCall's Software Quality Factors with suitable examples.
McCall's Software Quality Model (1977) categorizes 11 software quality factors under 3 product perspectives:

1. Product Operation (How well the software runs):
   - Correctness: Does the software meet specifications accurately? (Example: A calculator giving exact math results).
   - Reliability: Does it perform consistently without crashing? (Example: Banking software running 24/7).
   - Efficiency: Does it optimize system resources like memory and CPU?
   - Integrity: Is data secure against unauthorized access?
   - Usability: Is the user interface simple and easy to operate?

2. Product Revision (How easy it is to change):
   - Maintainability: Ease of finding and fixing bugs.
   - Flexibility: Ease of modifying software for new requirements.
   - Testability: Ease of testing software modules.

3. Product Transition (How easy it is to move):
   - Portability: Ability to run across different hardware/OS environments. (Example: App running on Android and iOS).
   - Reusability: Ability to reuse code parts in other systems.
   - Interoperability: Ability to connect and work with other systems. (Example: Payment gateway connecting with a bank).
\fQ5. Explain Software Engineering Practice and discuss its importance in software development.

Software Engineering Practice:
Software Engineering Practice consists of the core principles, concepts, methods, and tools applied daily during software development. It encompasses fundamental activities: communication, planning, modeling (design), construction (coding/testing), and deployment.

Core Best Practices:
- KISS (Keep It Simple, Stupid): Choose the simplest design and implementation that satisfies requirements.
- DRY (Don't Repeat Yourself): Avoid duplicate code by creating reusable functions and components.
- YAGNI (You Aren't Gonna Need It): Implement only features required right now, avoiding unneeded complexity.
- Separation of Concerns (SoC): Divide software into separate modules (UI, Business Logic, Database) so each handles a single responsibility.

Importance in Software Development:
1. Reduces errors and technical debt during development.
2. Improves code readability, testability, and long-term maintainability.
3. Ensures consistent quality across development teams.`;

  const PAGE_BREAK = "\f"; // explicit page-break sentinel inserted by "⏎ New Page" button
  const MAX_PAGES = 10;

  // Application State — single flowing content + computed paginated pages.
  const state = {
    content: DEFAULT_CONTENT,
    paginatedPages: [""],     // computed by paginate(); never written to directly
    currentPage: 0,           // index into paginatedPages for the preview
    
    // Realism Toggles (Matching User Uploaded Image)
    varyLetters: true,         // "Vary each letter" [New]
    naturalMovement: true,     // "Natural movement"
    inkflow: true,             // "Inkflow"
    realismIntensity: 1.0,

    // Page Styles (Only 3 Styles: Blank, Ruled, Spiral)
    pageStyle: "ruled",        // "ruled" | "blank" | "spiral"
    paperSize: "a4",           // "a4" | "letter"
    marginMm: 22,

    // Pen & Typography
    fontFamily: "Caveat",
    fontSize: 21,
    ruleHeight: 34,
    inkColor: "#1a2a8c",       // Royal Blue default

    // Student Assignment Header
    headerEnabled: true,
    headerInfo: {
      name: "Shoaib Korabu",
      roll: "SE-2026-042",
      subject: "Software Engineering",
      assignment: "Assignment 2",
      date: "November 2, 2026"
    },

    // Preview Zoom
    zoom: 1.0
  };

  // DOM Elements Cache
  const els = {
    // Inputs & Buttons
    textInput: document.getElementById("text-input"),
    pageTabs: document.getElementById("page-tabs"),
    tabBtns: document.querySelectorAll(".tab-btn"),
    btnPrevPage: document.getElementById("btn-prev-page"),
    btnNextPage: document.getElementById("btn-next-page"),
    pageIndicatorText: document.getElementById("page-indicator-text"),
    charCount: document.getElementById("char-count"),
    lineCount: document.getElementById("line-count"),
    capacityBadge: document.getElementById("capacity-badge"),
    btnInsertTemplate: document.getElementById("btn-insert-template"),
    btnClearPage: document.getElementById("btn-clear-page"),
    
    // Header controls
    toggleHeader: document.getElementById("toggle-header"),
    headerFields: document.getElementById("header-fields"),
    hdrName: document.getElementById("hdr-name"),
    hdrRoll: document.getElementById("hdr-roll"),
    hdrSubject: document.getElementById("hdr-subject"),
    hdrAssignment: document.getElementById("hdr-assignment"),
    hdrDate: document.getElementById("hdr-date"),

    // Realism toggles
    toggleVaryLetters: document.getElementById("toggle-vary-letters"),
    toggleNaturalMovement: document.getElementById("toggle-natural-movement"),
    toggleInkflow: document.getElementById("toggle-inkflow"),
    jitterIntensity: document.getElementById("jitter-intensity"),
    jitterIntensityVal: document.getElementById("jitter-intensity-val"),

    // Paper & Pen
    styleRadios: document.querySelectorAll('input[name="page-style"]'),
    paperSize: document.getElementById("paper-size"),
    pageMargin: document.getElementById("page-margin"),
    marginVal: document.getElementById("margin-val"),
    fontFamily: document.getElementById("font-family"),
    fontSize: document.getElementById("font-size"),
    fontSizeVal: document.getElementById("font-size-val"),
    ruleHeight: document.getElementById("rule-height"),
    ruleHeightVal: document.getElementById("rule-height-val"),
    inkBtns: document.querySelectorAll(".ink-btn"),
    inkColor: document.getElementById("ink-color"),

    // Export & Topbar Buttons
    btnTopTemplate: document.getElementById("btn-top-template"),
    btnTopPng: document.getElementById("btn-top-png"),
    btnTopPdf: document.getElementById("btn-top-pdf"),
    btnTopPrint: document.getElementById("btn-top-print"),
    btnExportPdf: document.getElementById("btn-export-pdf"),
    btnExportAllPdf: document.getElementById("btn-export-all-pdf"),
    btnExportPng: document.getElementById("btn-export-png"),

    // Preview
    previewPanel: document.getElementById("preview-panel"),
    previewStage: document.getElementById("preview-stage"),
    deskContainer: document.getElementById("desk-container"),
    page: document.getElementById("page"),
    pageHeader: document.getElementById("page-header"),
    phName: document.getElementById("ph-name"),
    phRoll: document.getElementById("ph-roll"),
    phDate: document.getElementById("ph-date"),
    phSubject: document.getElementById("ph-subject"),
    phAssignment: document.getElementById("ph-assignment"),
    phPage: document.getElementById("ph-page"),
    pageMarginLine: document.getElementById("page-margin-line"),
    pageText: document.getElementById("page-text"),
    pageFooter: document.getElementById("page-footer"),
    pfNum: document.getElementById("pf-num"),
    spiralBinding: document.getElementById("spiral-binding"),

    // Preview toolbar
    previewPageTitle: document.getElementById("preview-page-title"),
    previewStyleTag: document.getElementById("preview-style-tag"),
    btnZoomIn: document.getElementById("btn-zoom-in"),
    btnZoomOut: document.getElementById("btn-zoom-out"),
    btnZoomFit: document.getElementById("btn-zoom-fit"),
    zoomVal: document.getElementById("zoom-val")
  };

  // Mulberry32 deterministic PRNG
  function mulberry32(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashStr(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  // Pagination engine: flow `state.content` across pages using line-count estimation.
  // Respects explicit \f (PAGE_BREAK) markers inserted by the "⏎ New Page" button.
  // Uses current ruleHeight + fontSize + margin to estimate lines-per-page and chars-per-line.
  function computeLinesPerPage() {
    // A4 usable height (~780px at 96 DPI below header) divided by rule height.
    return Math.max(14, Math.floor(780 / Math.max(14, state.ruleHeight)));
  }
  function computeCharsPerLine() {
    // A4 usable width ≈ 210mm - (margin + 15mm right pad) = ~170mm at default
    // Convert to px at ~3.78 px/mm, then divide by avg glyph width (~0.48 * font size).
    const usableMm = 210 - state.marginMm - 15;
    const usablePx = usableMm * 3.78;
    const glyphW = Math.max(6, state.fontSize * 0.48);
    return Math.max(18, Math.floor(usablePx / glyphW));
  }

  function paginate(content) {
    const linesPerPage = computeLinesPerPage();
    const charsPerLine = computeCharsPerLine();
    const sections = String(content).split(PAGE_BREAK);
    const pages = [];
    let page = "";
    let lineCount = 0;
    let colPos = 0;

    const pushPage = () => {
      if (pages.length < MAX_PAGES) pages.push(page.replace(/\n+$/, ""));
      page = "";
      lineCount = 0;
      colPos = 0;
    };

    for (let s = 0; s < sections.length; s++) {
      if (s > 0) pushPage();  // explicit page break

      const paragraphs = sections[s].split("\n");
      for (let p = 0; p < paragraphs.length; p++) {
        if (p > 0) {
          page += "\n";
          if (colPos > 0) lineCount++;
          colPos = 0;
        }
        if (lineCount >= linesPerPage) pushPage();

        const words = paragraphs[p].split(/( )/); // keep spaces as tokens
        for (const token of words) {
          if (token === "") continue;
          if (colPos + token.length > charsPerLine && colPos > 0) {
            lineCount++;
            colPos = 0;
            page += "\n";
            if (lineCount >= linesPerPage) pushPage();
          }
          page += token;
          colPos += token.length;
        }
      }
      // close trailing line in paragraph set
      if (colPos > 0) {
        lineCount++;
        colPos = 0;
      }
      if (lineCount >= linesPerPage) pushPage();
    }
    if (page.trim().length > 0) pushPage();
    return pages.length > 0 ? pages : [""];
  }

  function recomputePages() {
    state.paginatedPages = paginate(state.content);
    if (state.currentPage >= state.paginatedPages.length) {
      state.currentPage = Math.max(0, state.paginatedPages.length - 1);
    }
  }

  // Insert text at the textarea's current cursor position (preserves selection point).
  function insertAtCursor(text) {
    const ta = els.textInput;
    const start = ta.selectionStart ?? ta.value.length;
    const end = ta.selectionEnd ?? ta.value.length;
    ta.value = ta.value.slice(0, start) + text + ta.value.slice(end);
    const newPos = start + text.length;
    ta.selectionStart = ta.selectionEnd = newPos;
    ta.focus();
    state.content = ta.value;
    recomputePages();
    render();
    saveState();
  }

  // Load state from localStorage if available
  function loadStoredState() {
    try {
      const saved = localStorage.getItem("handtextai_state_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.content === "string" && parsed.content.length > 0) {
          state.content = parsed.content;
        } else if (Array.isArray(parsed.pages)) {
          // Backwards-compat: migrate per-page arrays to a single content string.
          state.content = parsed.pages.filter((s) => typeof s === "string").join("\n" + PAGE_BREAK);
        }
        if (parsed.headerInfo) {
          state.headerInfo = Object.assign(state.headerInfo, parsed.headerInfo);
        }
        if (typeof parsed.varyLetters === "boolean") state.varyLetters = parsed.varyLetters;
        if (typeof parsed.naturalMovement === "boolean") state.naturalMovement = parsed.naturalMovement;
        if (typeof parsed.inkflow === "boolean") state.inkflow = parsed.inkflow;
        if (parsed.pageStyle) state.pageStyle = parsed.pageStyle;
        if (parsed.fontFamily) state.fontFamily = parsed.fontFamily;
        if (parsed.inkColor) state.inkColor = parsed.inkColor;
        if (parsed.fontSize) state.fontSize = parsed.fontSize;
        if (parsed.ruleHeight) state.ruleHeight = parsed.ruleHeight;
      }
    } catch (e) {
      console.warn("Could not load stored state:", e);
    }
  }

  // Save state to localStorage
  function saveState() {
    try {
      localStorage.setItem("handtextai_state_v1", JSON.stringify({
        content: state.content,
        headerInfo: state.headerInfo,
        varyLetters: state.varyLetters,
        naturalMovement: state.naturalMovement,
        inkflow: state.inkflow,
        pageStyle: state.pageStyle,
        fontFamily: state.fontFamily,
        inkColor: state.inkColor,
        fontSize: state.fontSize,
        ruleHeight: state.ruleHeight
      }));
    } catch (e) {
      // Ignore quota errors
    }
  }

  // Initialize UI form controls to match state
  function syncControlsToState() {
    // Textarea always shows the FULL document; the pagination engine distributes it across pages.
    els.textInput.value = state.content;
    els.toggleVaryLetters.checked = state.varyLetters;
    els.toggleNaturalMovement.checked = state.naturalMovement;
    els.toggleInkflow.checked = state.inkflow;
    els.jitterIntensity.value = state.realismIntensity;
    els.jitterIntensityVal.textContent = state.realismIntensity.toFixed(1) + "x";

    els.toggleHeader.checked = state.headerEnabled;
    els.hdrName.value = state.headerInfo.name;
    els.hdrRoll.value = state.headerInfo.roll;
    els.hdrSubject.value = state.headerInfo.subject;
    els.hdrAssignment.value = state.headerInfo.assignment;
    els.hdrDate.value = state.headerInfo.date;

    els.paperSize.value = state.paperSize;
    els.pageMargin.value = state.marginMm;
    els.marginVal.textContent = state.marginMm;

    els.fontFamily.value = state.fontFamily;
    els.fontSize.value = state.fontSize;
    els.fontSizeVal.textContent = state.fontSize;
    els.ruleHeight.value = state.ruleHeight;
    els.ruleHeightVal.textContent = state.ruleHeight;
    els.inkColor.value = state.inkColor;

    // Paper style radio
    els.styleRadios.forEach((radio) => {
      radio.checked = radio.value === state.pageStyle;
    });

    // Ink preset buttons
    updateInkButtons();
    updateTabButtons();
  }

  function updateInkButtons() {
    els.inkBtns.forEach((btn) => {
      const c = btn.getAttribute("data-color");
      if (c && c.toLowerCase() === state.inkColor.toLowerCase()) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  function updateTabButtons() {
    const totalPages = state.paginatedPages.length;
    els.tabBtns.forEach((btn) => {
      const pageIdx = parseInt(btn.getAttribute("data-page"), 10);
      btn.classList.toggle("active", pageIdx === state.currentPage);
      btn.setAttribute("aria-selected", pageIdx === state.currentPage ? "true" : "false");
      const hasContent = pageIdx < totalPages && Boolean(state.paginatedPages[pageIdx] && state.paginatedPages[pageIdx].trim().length > 0);
      btn.classList.toggle("has-content", hasContent);
      // Dim tabs that have no content yet (page hasn't been filled by flow)
      btn.classList.toggle("tab-empty", pageIdx >= totalPages);
    });

    els.pageIndicatorText.textContent = `Page ${state.currentPage + 1} / ${totalPages}`;
    els.previewPageTitle.textContent = `Page ${state.currentPage + 1} Preview`;
    els.phPage.textContent = `${state.currentPage + 1} of ${totalPages}`;
    els.pfNum.textContent = `Page ${state.currentPage + 1}`;
  }

  // Populate Spiral Coil Rings in Photo Mode
  function setupSpiralRings() {
    els.spiralBinding.innerHTML = "";
    // Generate ~22 spiral rings along page height
    const ringCount = 22;
    for (let i = 0; i < ringCount; i++) {
      const ringItem = document.createElement("div");
      ringItem.className = "spiral-ring-item";
      
      const hole = document.createElement("div");
      hole.className = "spiral-hole";
      
      const loop = document.createElement("div");
      loop.className = "spiral-loop";

      ringItem.appendChild(hole);
      ringItem.appendChild(loop);
      els.spiralBinding.appendChild(ringItem);
    }
  }

  // Apply CSS Custom Properties & Classes to Paper Page
  function applyStyles() {
    const p = els.page;
    p.classList.remove("ruled", "blank", "spiral", "a4", "letter");
    p.classList.add(state.pageStyle);
    p.classList.add(state.paperSize);

    // Desk background in spiral photo mode
    els.deskContainer.classList.toggle("spiral-desk", state.pageStyle === "spiral");

    // Inkflow text shadow class
    els.pageText.classList.toggle("inkflow-enabled", state.inkflow);

    // Header visibility
    els.pageHeader.classList.toggle("hidden", !state.headerEnabled);
    els.headerFields.classList.toggle("hidden", !state.headerEnabled);

    // CSS variables
    p.style.setProperty("--font-family", `"${state.fontFamily}", cursive`);
    p.style.setProperty("--font-size", `${state.fontSize}px`);
    p.style.setProperty("--rule-height", `${state.ruleHeight}px`);
    p.style.setProperty("--ink", state.inkColor);
    p.style.setProperty("--margin-left", `${state.marginMm}mm`);
    p.style.setProperty("--preview-zoom", state.zoom);

    // Header values
    els.phName.textContent = state.headerInfo.name || "—";
    els.phRoll.textContent = state.headerInfo.roll || "—";
    els.phSubject.textContent = state.headerInfo.subject || "—";
    els.phAssignment.textContent = state.headerInfo.assignment || "—";
    els.phDate.textContent = state.headerInfo.date || "—";

    // Style tag description in toolbar
    const styleLabels = {
      ruled: "Standard Assignment Ruled",
      blank: "Blank Ivory Sheet",
      spiral: "Spiral Notebook (Photo Mode)"
    };
    els.previewStyleTag.textContent = styleLabels[state.pageStyle] || "Ruled";
  }

  // Render Handwritten Text with Line Snapping and the 3 Realism Effects
  function renderText() {
    const raw = state.paginatedPages[state.currentPage] || "";
    const intensity = state.realismIntensity;
    const varyLetter = state.varyLetters;
    const naturalMove = state.naturalMovement;
    const inkflow = state.inkflow;

    const baseSeed = hashStr(raw) ^ ((state.currentPage + 1) * 0x9e3779b9);
    const rand = mulberry32(baseSeed);

    const lines = raw.split(/\r?\n/);
    const frag = document.createDocumentFragment();

    lines.forEach((lineText, lineIdx) => {
      const lineEl = document.createElement("div");
      lineEl.className = "hand-line";

      if (lineText.length === 0) {
        lineEl.classList.add("empty-line");
        frag.appendChild(lineEl);
        return;
      }

      // 1. Natural Movement: Organic line start drift (margin drift)
      if (naturalMove) {
        const lineRand = mulberry32(baseSeed + lineIdx * 1337);
        const lineDrift = (Math.sin(lineIdx * 0.45) * 3.5 + (lineRand() - 0.5) * 3.0) * intensity;
        lineEl.style.paddingLeft = Math.max(0, lineDrift).toFixed(1) + "px";
      }

      // Split into words
      const words = lineText.split(" ");
      words.forEach((word, wordIdx) => {
        const wordEl = document.createElement("span");
        wordEl.className = "hand-word";

        // 2. Natural Movement: Word baseline wobble & variable word spacing
        if (naturalMove) {
          const wobble = Math.sin((lineIdx * 2.5 + wordIdx) * 0.7) * 1.4 * intensity;
          wordEl.style.transform = `translateY(${wobble.toFixed(2)}px)`;

          const wordRand = mulberry32(baseSeed + lineIdx * 100 + wordIdx * 17);
          const space = (0.34 + wordRand() * 0.18 * intensity).toFixed(2);
          wordEl.style.setProperty("--word-space", `${space}em`);
        }

        // Render characters within word
        for (let chIdx = 0; chIdx < word.length; chIdx++) {
          const ch = word[chIdx];
          const glyphEl = document.createElement("span");
          glyphEl.className = "hand-glyph";
          glyphEl.textContent = ch;

          // Deterministic PRNG for this glyph
          const glyphSeed = baseSeed + (lineIdx * 1000) + (wordIdx * 50) + (chIdx * 7) + ch.charCodeAt(0);
          const glyphRand = mulberry32(glyphSeed);

          // 3. Vary each letter: Per-character random rotation, scale, micro-jitter
          if (varyLetter) {
            const r = () => (glyphRand() - 0.5) * 2;
            const rot = (r() * 2.2 * intensity).toFixed(2);
            const dy = (r() * 1.1 * intensity).toFixed(2);
            const sx = (1 + r() * 0.035 * intensity).toFixed(3);
            const sy = (1 + r() * 0.035 * intensity).toFixed(3);
            const mr = (r() * 0.4 * intensity).toFixed(2);

            glyphEl.style.transform = `translateY(${dy}px) rotate(${rot}deg) scale(${sx}, ${sy})`;
            glyphEl.style.marginRight = `${mr}px`;
          }

          // 4. Inkflow: Pressure changes stroke by stroke (opacity & stroke variations)
          if (inkflow) {
            const isPunctuation = /[.,!?:;"'()[\]{}]/.test(ch);
            const isStart = chIdx === 0;
            let pressure;

            if (isPunctuation || isStart) {
              // Stronger initial pen stroke or punctuation mark
              pressure = 0.94 + glyphRand() * 0.06;
            } else {
              // Flow fluctuations in middle of words
              pressure = 0.82 + glyphRand() * 0.16;
            }
            glyphEl.style.opacity = Math.min(1.0, pressure).toFixed(2);
          }

          wordEl.appendChild(glyphEl);
        }

        lineEl.appendChild(wordEl);
      });

      frag.appendChild(lineEl);
    });

    els.pageText.replaceChildren(frag);
    updateCapacityStats(raw, lines.length);
  }

  // Character counter + total pages used (whole document, not just current page).
  function updateCapacityStats(_pageText, _lineCount) {
    const totalChars = state.content.length;
    const totalPages = state.paginatedPages.length;
    const totalLines = state.paginatedPages.reduce((acc, p) => acc + (p ? p.split("\n").length : 0), 0);

    els.charCount.textContent = `${totalChars} characters`;
    els.lineCount.textContent = `${totalLines} lines`;

    els.capacityBadge.className = "badge-status";
    if (totalPages === 1) {
      els.capacityBadge.classList.add("badge-ok");
      els.capacityBadge.textContent = `Fits 1 Page`;
    } else if (totalPages <= MAX_PAGES) {
      els.capacityBadge.classList.add("badge-ok");
      els.capacityBadge.textContent = `${totalPages} Pages`;
    } else {
      els.capacityBadge.classList.add("badge-danger");
      els.capacityBadge.textContent = `Overflow (${MAX_PAGES}+ Pages)`;
    }
  }

  // Full Render Routine
  function render() {
    applyStyles();
    renderText();
    updateTabButtons();
  }

  // Switch which page the preview shows. Textarea stays bound to the full content.
  function switchPage(pageIdx) {
    const maxIdx = Math.max(0, state.paginatedPages.length - 1);
    if (pageIdx < 0 || pageIdx > maxIdx) return;
    state.currentPage = pageIdx;
    render();
  }

  // 300 DPI Canvas Rendering Engine
  // A4 at 300 DPI: 2480px width × 3508px height
  async function renderPageTo300DpiCanvas(pageIndex) {
    const canvas = document.createElement("canvas");
    canvas.width = 2480;
    canvas.height = 3508;
    const ctx = canvas.getContext("2d");

    // Wait for fonts to be ready
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const scale = 2480 / 793.7; // ~3.1245 scale factor from 96 DPI to 300 DPI
    const marginPx = (state.marginMm / 25.4) * 300;
    const rulePitchPx = state.ruleHeight * scale;
    const fontSizePx = state.fontSize * scale;

    // 1. Draw Paper Background
    if (state.pageStyle === "blank") {
      ctx.fillStyle = "#faf8f2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (state.pageStyle === "spiral") {
      // Warm desk texture background
      ctx.fillStyle = "#2b170c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Notebook sheet on desk
      const nbX = 140;
      const nbY = 60;
      const nbW = canvas.width - 200;
      const nbH = canvas.height - 120;

      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.5)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 20;
      ctx.fillStyle = "#fdfcf8";
      ctx.fillRect(nbX, nbY, nbW, nbH);
      ctx.restore();

      // Spiral spine shadow
      const grad = ctx.createLinearGradient(nbX, 0, nbX + 150, 0);
      grad.addColorStop(0, "rgba(0,0,0,0.18)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(nbX, nbY, 150, nbH);

      // Draw Spiral Wire Loops & Punch Holes
      const ringCount = 24;
      const stepY = nbH / (ringCount + 1);
      for (let r = 1; r <= ringCount; r++) {
        const ry = nbY + r * stepY;
        // Punch hole
        ctx.fillStyle = "#1e140d";
        ctx.beginPath();
        ctx.ellipse(nbX + 45, ry, 12, 16, 0, 0, Math.PI * 2);
        ctx.fill();

        // 3D wire ring
        ctx.save();
        ctx.lineWidth = 14;
        const wireGrad = ctx.createLinearGradient(nbX - 20, ry - 15, nbX + 60, ry + 15);
        wireGrad.addColorStop(0, "#4b5563");
        wireGrad.addColorStop(0.4, "#f3f4f6");
        wireGrad.addColorStop(0.8, "#374151");
        ctx.strokeStyle = wireGrad;
        ctx.shadowColor = "rgba(0,0,0,0.4)";
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 6;
        ctx.shadowOffsetY = 6;
        ctx.beginPath();
        ctx.ellipse(nbX + 20, ry, 36, 12, -0.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    } else {
      // Standard Assignment Ruled
      ctx.fillStyle = "#fffdfa";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 2. Student Assignment Header
    let headerBottomY = (45 / 25.4) * 300;
    if (state.headerEnabled) {
      const hdrX = marginPx + 40;
      const hdrW = canvas.width - hdrX - (18 / 25.4) * 300;
      const hdrTop = (15 / 25.4) * 300;

      ctx.save();
      ctx.font = `600 ${12 * scale}px 'Inter', sans-serif`;
      ctx.fillStyle = "#64748b";
      ctx.fillText("NAME:", hdrX, hdrTop + 30);
      ctx.fillText("ROLL NO:", hdrX + hdrW * 0.38, hdrTop + 30);
      ctx.fillText("DATE:", hdrX + hdrW * 0.72, hdrTop + 30);

      ctx.fillText("SUBJECT:", hdrX, hdrTop + 90);
      ctx.fillText("ASSIGNMENT:", hdrX + hdrW * 0.38, hdrTop + 90);
      ctx.fillText("PAGE:", hdrX + hdrW * 0.72, hdrTop + 90);

      // Student info in handwriting font
      ctx.font = `600 ${18 * scale}px "${state.fontFamily}", cursive`;
      ctx.fillStyle = state.inkColor;
      ctx.fillText(state.headerInfo.name, hdrX + 80, hdrTop + 30);
      ctx.fillText(state.headerInfo.roll, hdrX + hdrW * 0.38 + 100, hdrTop + 30);
      ctx.fillText(state.headerInfo.date, hdrX + hdrW * 0.72 + 65, hdrTop + 30);

      ctx.fillText(state.headerInfo.subject, hdrX + 105, hdrTop + 90);
      ctx.fillText(state.headerInfo.assignment, hdrX + hdrW * 0.38 + 140, hdrTop + 90);
      ctx.fillText(`${pageIndex + 1} of 10`, hdrX + hdrW * 0.72 + 65, hdrTop + 90);

      // Header bottom border
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.moveTo(hdrX, hdrTop + 120);
      ctx.lineTo(hdrX + hdrW, hdrTop + 120);
      ctx.stroke();
      ctx.restore();

      headerBottomY = hdrTop + 130;
    }

    // 3. Draw Ruled Lines and Margin Line
    if (state.pageStyle !== "blank") {
      // Red vertical margin line
      ctx.save();
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      ctx.moveTo(marginPx, 0);
      ctx.lineTo(marginPx, canvas.height);
      ctx.stroke();

      // Blue horizontal ruled lines
      ctx.strokeStyle = "#9cbde8";
      ctx.lineWidth = 1.0 * scale;
      for (let y = headerBottomY; y < canvas.height - 100; y += rulePitchPx) {
        ctx.beginPath();
        ctx.moveTo(state.pageStyle === "spiral" ? 140 : 0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 4. Render Handwritten Text on Ruled Lines
    const raw = state.paginatedPages[pageIndex] || "";
    const lines = raw.split(/\r?\n/);
    const startX = marginPx + (state.pageStyle === "blank" ? 0 : 40);
    const textStartY = headerBottomY + rulePitchPx;

    const baseSeed = hashStr(raw) ^ ((pageIndex + 1) * 0x9e3779b9);

    ctx.save();
    ctx.fillStyle = state.inkColor;
    ctx.textBaseline = "alphabetic";

    lines.forEach((lineText, lineIdx) => {
      const lineY = textStartY + lineIdx * rulePitchPx;
      if (lineY > canvas.height - 150) return; // avoid drawing off page

      let curX = startX;

      // Natural movement: line start drift
      if (state.naturalMovement) {
        const lineRand = mulberry32(baseSeed + lineIdx * 1337);
        const lineDrift = (Math.sin(lineIdx * 0.45) * 3.5 + (lineRand() - 0.5) * 3.0) * state.realismIntensity * scale;
        curX += Math.max(0, lineDrift);
      }

      const words = lineText.split(" ");
      words.forEach((word, wordIdx) => {
        // Natural movement: baseline wobble & word spacing
        let wobbleY = 0;
        if (state.naturalMovement) {
          wobbleY = Math.sin((lineIdx * 2.5 + wordIdx) * 0.7) * 1.4 * state.realismIntensity * scale;
        }

        for (let chIdx = 0; chIdx < word.length; chIdx++) {
          const ch = word[chIdx];
          const glyphSeed = baseSeed + (lineIdx * 1000) + (wordIdx * 50) + (chIdx * 7) + ch.charCodeAt(0);
          const glyphRand = mulberry32(glyphSeed);

          let rot = 0;
          let dy = 0;
          let sx = 1;
          let sy = 1;

          if (state.varyLetters) {
            const r = () => (glyphRand() - 0.5) * 2;
            rot = (r() * 2.2 * state.realismIntensity * Math.PI) / 180;
            dy = r() * 1.1 * state.realismIntensity * scale;
            sx = 1 + r() * 0.035 * state.realismIntensity;
            sy = 1 + r() * 0.035 * state.realismIntensity;
          }

          if (state.inkflow) {
            const isPunctuation = /[.,!?:;"'()[\]{}]/.test(ch);
            const isStart = chIdx === 0;
            const pressure = (isPunctuation || isStart) ? (0.94 + glyphRand() * 0.06) : (0.82 + glyphRand() * 0.16);
            ctx.globalAlpha = Math.min(1.0, pressure);
          } else {
            ctx.globalAlpha = 1.0;
          }

          ctx.save();
          ctx.translate(curX, lineY - (4 * scale) + wobbleY + dy);
          if (rot !== 0) ctx.rotate(rot);
          if (sx !== 1 || sy !== 1) ctx.scale(sx, sy);
          ctx.font = `${fontSizePx}px "${state.fontFamily}", cursive`;
          ctx.fillText(ch, 0, 0);
          ctx.restore();

          const glyphWidth = ctx.measureText(ch).width;
          curX += glyphWidth + (state.varyLetters ? (glyphRand() - 0.5) * 2.0 : 0);
        }

        // Space between words
        const spaceRand = mulberry32(baseSeed + lineIdx * 100 + wordIdx * 17);
        const spaceW = (0.34 + spaceRand() * 0.18 * state.realismIntensity) * fontSizePx;
        curX += spaceW;
      });
    });

    ctx.restore();

    // 5. Draw Page Number Footer
    ctx.save();
    ctx.font = `${14 * scale}px "${state.fontFamily}", cursive`;
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "right";
    ctx.fillText(`Page ${pageIndex + 1}`, canvas.width - (18 / 25.4) * 300, canvas.height - 40);
    ctx.restore();

    return canvas;
  }

  // Export 300 DPI PNG
  async function exportPng() {
    try {
      const canvas = await renderPageTo300DpiCanvas(state.currentPage);
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `HandTextAI_Page_${state.currentPage + 1}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, "image/png");
    } catch (err) {
      console.error("Export PNG failed:", err);
      alert("PNG generation error. Please try again.");
    }
  }

  // Export 300 DPI PDF (Current Page or All Pages)
  async function exportPdf(allPages = false) {
    try {
      const jspdfModule = window.jspdf;
      if (!jspdfModule || !jspdfModule.jsPDF) {
        // Fallback: print dialog
        alert("Generating print-to-PDF output...");
        window.print();
        return;
      }

      const { jsPDF } = jspdfModule;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true
      });

      const pagesToExport = allPages
        ? state.paginatedPages.map((text, idx) => ({ text, idx }))
        : [{ text: state.paginatedPages[state.currentPage], idx: state.currentPage }];

      for (let i = 0; i < pagesToExport.length; i++) {
        const item = pagesToExport[i];
        if (i > 0) pdf.addPage("a4", "portrait");

        const canvas = await renderPageTo300DpiCanvas(item.idx);
        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
      }

      const fileName = allPages
        ? `HandTextAI_Assignment_AllPages.pdf`
        : `HandTextAI_Page_${state.currentPage + 1}.pdf`;
      pdf.save(fileName);
    } catch (err) {
      console.error("Export PDF failed:", err);
      alert("PDF generation failed. Using browser print dialog instead.");
      window.print();
    }
  }

  // Event Listeners Wiring
  function bindEvents() {
    // 1. Text Area Input — one flowing document. Pagination computes which page shows what.
    els.textInput.addEventListener("input", (e) => {
      state.content = e.target.value;
      recomputePages();
      render();
      saveState();
    });

    // 2. Tab Navigation (preview only — textarea stays unchanged)
    els.tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const pageIdx = parseInt(btn.getAttribute("data-page"), 10);
        switchPage(pageIdx);
      });
    });

    els.btnPrevPage.addEventListener("click", () => {
      if (state.currentPage > 0) switchPage(state.currentPage - 1);
    });

    els.btnNextPage.addEventListener("click", () => {
      if (state.currentPage < state.paginatedPages.length - 1) switchPage(state.currentPage + 1);
    });

    // 3. Templates, New Page, Clear
    const insertTemplateHandler = () => {
      state.content = DEFAULT_CONTENT;
      els.textInput.value = DEFAULT_CONTENT;
      state.currentPage = 0;
      recomputePages();
      render();
      saveState();
    };

    els.btnInsertTemplate.addEventListener("click", insertTemplateHandler);
    els.btnTopTemplate.addEventListener("click", insertTemplateHandler);

    // "⏎ New Page" inserts an explicit page-break at the cursor.
    const btnNewPage = document.getElementById("btn-new-page");
    if (btnNewPage) {
      btnNewPage.addEventListener("click", () => insertAtCursor(PAGE_BREAK));
    }

    els.btnClearPage.addEventListener("click", () => {
      if (confirm("Clear the ENTIRE document? This cannot be undone.")) {
        state.content = "";
        els.textInput.value = "";
        state.currentPage = 0;
        recomputePages();
        render();
        saveState();
      }
    });

    // 4. Student Header Fields
    els.toggleHeader.addEventListener("change", (e) => {
      state.headerEnabled = e.target.checked;
      render();
    });

    const updateHeader = () => {
      state.headerInfo = {
        name: els.hdrName.value,
        roll: els.hdrRoll.value,
        subject: els.hdrSubject.value,
        assignment: els.hdrAssignment.value,
        date: els.hdrDate.value
      };
      applyStyles();
      saveState();
    };

    [els.hdrName, els.hdrRoll, els.hdrSubject, els.hdrAssignment, els.hdrDate].forEach((inp) => {
      inp.addEventListener("input", updateHeader);
    });

    // 5. Realism Toggles (Matching Screenshot)
    els.toggleVaryLetters.addEventListener("change", (e) => {
      state.varyLetters = e.target.checked;
      renderText();
      saveState();
    });

    els.toggleNaturalMovement.addEventListener("change", (e) => {
      state.naturalMovement = e.target.checked;
      renderText();
      saveState();
    });

    els.toggleInkflow.addEventListener("change", (e) => {
      state.inkflow = e.target.checked;
      render();
      saveState();
    });

    els.jitterIntensity.addEventListener("input", (e) => {
      state.realismIntensity = parseFloat(e.target.value);
      els.jitterIntensityVal.textContent = state.realismIntensity.toFixed(1) + "x";
      renderText();
    });

    // 6. Paper Style Selection (Only 3 Styles)
    els.styleRadios.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        if (e.target.checked) {
          state.pageStyle = e.target.value;
          applyStyles();
          saveState();
        }
      });
    });

    els.paperSize.addEventListener("change", (e) => {
      state.paperSize = e.target.value;
      recomputePages();
      render();
    });

    els.pageMargin.addEventListener("input", (e) => {
      state.marginMm = parseInt(e.target.value, 10);
      els.marginVal.textContent = state.marginMm;
      recomputePages();
      render();
    });

    // 7. Pen & Typography
    els.fontFamily.addEventListener("change", (e) => {
      state.fontFamily = e.target.value;
      applyStyles();
      saveState();
    });

    els.fontSize.addEventListener("input", (e) => {
      state.fontSize = parseInt(e.target.value, 10);
      els.fontSizeVal.textContent = state.fontSize;
      recomputePages();
      render();
      saveState();
    });

    els.ruleHeight.addEventListener("input", (e) => {
      state.ruleHeight = parseInt(e.target.value, 10);
      els.ruleHeightVal.textContent = state.ruleHeight;
      recomputePages();
      render();
      saveState();
    });

    // 8. Ink Presets (Royal Blue & Carbon Black)
    els.inkBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const c = btn.getAttribute("data-color");
        if (c) {
          state.inkColor = c;
          els.inkColor.value = c;
          updateInkButtons();
          applyStyles();
          saveState();
        }
      });
    });

    els.inkColor.addEventListener("input", (e) => {
      state.inkColor = e.target.value;
      updateInkButtons();
      applyStyles();
      saveState();
    });

    // 9. Zoom Controls
    const updateZoom = (z) => {
      state.zoom = Math.max(0.4, Math.min(1.8, z));
      els.zoomVal.textContent = `${Math.round(state.zoom * 100)}%`;
      applyStyles();
    };

    els.btnZoomIn.addEventListener("click", () => updateZoom(state.zoom + 0.15));
    els.btnZoomOut.addEventListener("click", () => updateZoom(state.zoom - 0.15));
    els.btnZoomFit.addEventListener("click", () => {
      const containerWidth = els.previewStage.clientWidth - 80;
      const paperWidthPx = (state.paperSize === "a4" ? 210 : 215.9) * 3.7795;
      const fitZoom = Math.min(1.0, containerWidth / paperWidthPx);
      updateZoom(fitZoom);
    });

    // 10. Export Triggers
    els.btnTopPng.addEventListener("click", exportPng);
    els.btnExportPng.addEventListener("click", exportPng);

    els.btnTopPdf.addEventListener("click", () => exportPdf(false));
    els.btnExportPdf.addEventListener("click", () => exportPdf(false));
    els.btnExportAllPdf.addEventListener("click", () => exportPdf(true));

    els.btnTopPrint.addEventListener("click", () => window.print());
  }

  // Initialization
  loadStoredState();
  recomputePages();
  setupSpiralRings();
  syncControlsToState();
  bindEvents();
  render();

})();
