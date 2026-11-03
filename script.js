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

  // University Demo Assignment 3: Cyber Security in IoT (3 full pages with explicit page breaks)
  const IOT_DEMO_CONTENT = `Assignment 3 Solutions: Cyber Security in IoT

Question 1: Explain the importance of cybersecurity in IoT and discuss major security challenges.

Importance of Cybersecurity in IoT:
• Data Protection: Safeguards personal, medical, financial, and industrial data from unauthorized access, interception, and theft.
• Lateral Movement Mitigation: Prevents compromised IoT endpoints (e.g., smart thermostats) from acting as entry gateways to breach critical corporate or private networks.
• Physical Safety & Operational Resilience: Prevents disruption to real-world infrastructure, medical systems, smart power grids, and automated industrial plants.

Major Security Challenges:
• Network Invisibility: Unmanaged devices join networks automatically without central monitoring or security inventory tracking.
• Scale and Heterogeneity: Billions of diverse devices across multiple industries hinder the use of a single, standardized security protocol.
• Resource Constraints: Low processing power, limited memory, and small battery life restrict advanced built-in encryption and endpoint protection.
• User Awareness & Default Credentials: Widespread reliance on unchanged default passwords and neglected firmware updates exposes systems to automated exploits.

Question 2: Describe the CIA Triad (Confidentiality, Integrity, Availability) in the context of IoT with examples.

Confidentiality in IoT:
• Concept: Ensures private sensor data, camera feeds, and credentials remain accessible only to authorized users.
• Challenge: Unencrypted transmission over public networks and weak default authentication.
• Example & Solution: Encrypting medical telemetry and surveillance feeds using AES encryption and Multi-Factor Authentication (MFA).

Integrity in IoT:
• Concept: Guarantees sensor readings, control logic, and telemetry remain accurate and unaltered during storage and transit.
• Challenge: Unpatched firmware allowing hackers to tamper with control signals or inject fake sensor inputs.
• Example & Solution: Applying cryptographic hashing, digital signatures, and secure boot to prevent unauthorized control command tampering in smart grids.

Availability in IoT:
• Concept: Ensures IoT devices, gateways, and cloud control systems remain continuously accessible and operational.
• Challenge: Botnets launching Distributed Denial of Service (DDoS) floods or hardware/power outages.
• Example & Solution: Deploying rate-limiting, traffic monitoring, and redundant failovers to keep industrial automation systems online during DDoS attacks.
\fQuestion 3: Explain the IoT attack surface and identify potential risks in connected devices.

Three Layers of the IoT Attack Surface:
• Device Layer: Physical hardware and firmware. Risks include exposed debugging ports (JTAG/UART), weak default credentials, and unencrypted local storage.
• Network Layer: Communication protocols and transport media. Risks include unencrypted protocols (HTTP/Telnet), open network ports, weak Wi-Fi security, and Man-in-the-Middle (MitM) interception.
• Cloud & Application Layer: Mobile apps, web management portals, and cloud APIs. Risks include weak session management, insecure APIs, and unauthenticated administrative interfaces.

Potential Risks in Connected Devices:
• Unencrypted Data Transmission: Cleartext traffic exposure allowing password sniffing and data theft.
• Outdated Firmware: Unpatched, known vulnerabilities remaining exploitable indefinitely.
• Botnet Recruitment: Compromised endpoints weaponized into massive DDoS attack fleets.
• Lateral Network Pivoting: Exploiting an IoT device to access connected computers and servers on the same network.

Question 4: Discuss data privacy issues in IoT and suggest methods to improve privacy protection.

Data Privacy Issues in IoT:
• Continuous Data Collection: Constant, real-time tracking of location, health metrics, audio, and personal habits.
• Unexpected Profiling: Aggregating data across multiple devices reveals intimate lifestyle patterns (e.g., smart meter usage revealing sleep and home occupancy schedules).
• Unprotected Transmission & Storage: Unencrypted sensor data intercepted in transit or exposed via vulnerable cloud backends.
• Lack of Consent & Transparency: Constrained device UI prevents clear user notification regarding data collection, sharing, and commercial monetization.

Methods to Improve Privacy Protection:
• Privacy by Design: Integrating privacy architecture into devices at the initial engineering phase.
• Data Minimization: Collecting and storing strictly the minimum data required for device operation.
• Strong Encryption & Authentication: Mandating end-to-end AES encryption and Multi-Factor Authentication (MFA).
• Clear Consent & Transparency: Providing explicit privacy notifications and accessible user opt-out choices.
• Network Segmentation: Isolating privacy-sensitive devices on dedicated VLANs or guest networks.

Question 5: Explain the security requirements of IoT systems and justify the importance of secure IoT design.

Security Requirements across IoT Layers:
• Device Layer: Unique device identities, secure boot, tamper resistance, and disabled JTAG/UART debugging ports.
• Network Layer: Encrypted transport protocols (TLS/DTLS), network segmentation, and active intrusion monitoring.
• Cloud & Application Layer: Role-Based Access Control (RBAC), digitally signed OTA updates, and Software Bill of Materials (SBOM).
• Core Attributes: Confidentiality, Integrity, Availability, Authenticity, Non-Repudiation, and Privacy.
\fJustification for Secure IoT Design:
• Proactive Threat Mitigation: Builds security directly into hardware and software, eliminating vulnerabilities prior to mass deployment.
• Attack Surface Reduction: Disabling unused ports, remote management services, and default credentials minimizes exploitation vectors.
• Protection of Safety & Privacy: Ensures reliable operation in safety-critical sectors (healthcare, transportation, smart grids).
• Regulatory Compliance: Meets global cybersecurity mandates (ETSI EN 303 645, NISTIR 8259, EU Cyber Resilience Act, US IoT Cybersecurity Improvement Act).`;

  const PAGE_BREAK = "\f"; // explicit page-break sentinel inserted by "⏎ New Page" button
  const MAX_PAGES = 10;

  // Application State — single flowing content + computed paginated pages.
  const state = {
    content: IOT_DEMO_CONTENT,
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
      roll: "CS-2026-089",
      subject: "Cyber Security in IoT",
      assignment: "Assignment 3 Solutions",
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

    // Document Upload & IoT Demo
    btnTopUploadDoc: document.getElementById("btn-top-upload-doc"),
    btnTopDemoIot: document.getElementById("btn-top-demo-iot"),
    btnUploadDoc: document.getElementById("btn-upload-doc"),
    uploadModal: document.getElementById("upload-modal"),
    btnCloseModal: document.getElementById("btn-close-modal"),
    btnCancelModal: document.getElementById("btn-cancel-modal"),
    dropZone: document.getElementById("drop-zone"),
    docFileInput: document.getElementById("doc-file-input"),
    uploadStatus: document.getElementById("upload-status"),
    statusSpinner: document.getElementById("status-spinner"),
    statusIcon: document.getElementById("status-icon"),
    statusText: document.getElementById("status-text"),
    btnModalDemoIot: document.getElementById("btn-modal-demo-iot"),

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

  // Pagination engine: flow `state.content` across pages using font-accurate line wrapping.
  // Respects explicit \f (PAGE_BREAK) markers inserted by the "⏎ New Page" button.
  function computeLinesPerPage() {
    // A4 usable height (~780px at 96 DPI below header) divided by rule height.
    return Math.max(14, Math.floor(780 / Math.max(14, state.ruleHeight)));
  }

  const FONT_WIDTH_FACTORS = {
    "Caveat": 0.43,
    "Kalam": 0.46,
    "Patrick Hand": 0.42,
    "Shadows Into Light": 0.43,
    "Homemade Apple": 0.58
  };

  let _measureCtx = null;
  function measureStringWidth(text, fontSpec) {
    if (typeof document !== "undefined" && document.createElement) {
      if (!_measureCtx) {
        try {
          const c = document.createElement("canvas");
          _measureCtx = (c && typeof c.getContext === "function") ? c.getContext("2d") : null;
        } catch (e) {
          _measureCtx = null;
        }
      }
      if (_measureCtx && typeof _measureCtx.measureText === "function") {
        _measureCtx.font = fontSpec;
        return _measureCtx.measureText(text).width;
      }
    }
    const factor = FONT_WIDTH_FACTORS[state.fontFamily] || 0.46;
    return text.length * state.fontSize * factor;
  }

  function getUsableLineWidthPx() {
    const paperWidthMm = state.paperSize === "letter" ? 215.9 : 210.0;
    const leftMarginMm = state.pageStyle === "spiral"
      ? Math.max(state.marginMm + 4, 28)
      : (state.pageStyle === "blank" ? state.marginMm : state.marginMm + 4);
    const rightMarginMm = 18;
    const usableMm = Math.max(80, paperWidthMm - leftMarginMm - rightMarginMm);
    return usableMm * 3.7795; // 96 DPI: 1mm = 3.7795px
  }

  function wrapTextToLines(text, usableWidthPx, fontSpec) {
    const paragraphs = String(text || "").split("\n");
    const resultLines = [];
    for (let p = 0; p < paragraphs.length; p++) {
      const para = paragraphs[p];
      if (para === "") {
        resultLines.push("");
        continue;
      }
      let curLine = "";
      let curW = 0;
      const words = para.split(/( )/);
      for (const token of words) {
        if (token === "") continue;
        const tokenWidth = measureStringWidth(token, fontSpec);
        if (tokenWidth > usableWidthPx && token !== " ") {
          for (let c = 0; c < token.length; c++) {
            const ch = token[c];
            const chW = measureStringWidth(ch, fontSpec);
            if (curW + chW > usableWidthPx && curW > 0) {
              resultLines.push(curLine);
              curLine = "";
              curW = 0;
            }
            curLine += ch;
            curW += chW;
          }
          continue;
        }

        if (curW + tokenWidth > usableWidthPx && curW > 0) {
          resultLines.push(curLine);
          curLine = "";
          curW = 0;
        }
        curLine += token;
        curW += tokenWidth;
      }
      if (curLine.length > 0 || para === "") {
        resultLines.push(curLine);
      }
    }
    return resultLines.join("\n");
  }

  function paginate(content) {
    const usableWidthPx = getUsableLineWidthPx();
    const fontSpec = `${state.fontSize}px "${state.fontFamily}", cursive`;
    const sections = String(content || "").split(PAGE_BREAK);

    // If explicit page break markers exist, respect each section as an explicit page
    if (sections.length > 1) {
      const pages = [];
      for (let s = 0; s < sections.length; s++) {
        if (pages.length >= MAX_PAGES) break;
        const wrapped = wrapTextToLines(sections[s], usableWidthPx, fontSpec);
        pages.push(wrapped.replace(/\n+$/, ""));
      }
      return pages.length > 0 ? pages : [""];
    }

    // Natural flowing pagination when no explicit page breaks exist
    const linesPerPage = computeLinesPerPage();
    const pages = [];
    let page = "";
    let lineCount = 0;
    let currentLineWidth = 0;

    const pushPage = () => {
      if (pages.length < MAX_PAGES) pages.push(page.replace(/\n+$/, ""));
      page = "";
      lineCount = 0;
      currentLineWidth = 0;
    };

    const paragraphs = sections[0].split("\n");
    for (let p = 0; p < paragraphs.length; p++) {
      if (p > 0) {
        page += "\n";
        if (currentLineWidth > 0) lineCount++;
        currentLineWidth = 0;
      }
      if (lineCount >= linesPerPage) pushPage();

      const words = paragraphs[p].split(/( )/); // keep spaces as tokens
      for (const token of words) {
        if (token === "") continue;
        const tokenWidth = measureStringWidth(token, fontSpec);

        // If a single word/token exceeds the entire line width (e.g. long equation or URL), break it cleanly
        if (tokenWidth > usableWidthPx && token !== " ") {
          for (let c = 0; c < token.length; c++) {
            const ch = token[c];
            const chW = measureStringWidth(ch, fontSpec);
            if (currentLineWidth + chW > usableWidthPx && currentLineWidth > 0) {
              lineCount++;
              currentLineWidth = 0;
              page += "\n";
              if (lineCount >= linesPerPage) pushPage();
            }
            page += ch;
            currentLineWidth += chW;
          }
          continue;
        }

        if (currentLineWidth + tokenWidth > usableWidthPx && currentLineWidth > 0) {
          lineCount++;
          currentLineWidth = 0;
          page += "\n";
          if (lineCount >= linesPerPage) pushPage();
        }

        page += token;
        currentLineWidth += tokenWidth;
      }
    }

    if (currentLineWidth > 0) {
      lineCount++;
      currentLineWidth = 0;
    }
    if (lineCount >= linesPerPage) pushPage();
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
      const saved = localStorage.getItem("handtextai_state_v2");
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
        if (typeof parsed.realismIntensity === "number") state.realismIntensity = parsed.realismIntensity;
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
      localStorage.setItem("handtextai_state_v2", JSON.stringify({
        content: state.content,
        headerInfo: state.headerInfo,
        varyLetters: state.varyLetters,
        naturalMovement: state.naturalMovement,
        inkflow: state.inkflow,
        realismIntensity: state.realismIntensity,
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
    const presetPills = document.querySelectorAll(".btn-preset-pill");
    presetPills.forEach((p) => {
      const val = parseFloat(p.getAttribute("data-intensity"));
      p.classList.toggle("active", Math.abs(val - state.realismIntensity) < 0.05);
    });

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

    // Proportionally adjust line pitch & font size if page content exceeds standard line count
    const rawPage = state.paginatedPages[state.currentPage] || "";
    const pageLineCount = rawPage ? rawPage.split(/\r?\n/).length : 0;
    const normalCapacity = 26;
    let effectiveRuleHeight = state.ruleHeight;
    let effectiveFontSize = state.fontSize;
    if (pageLineCount > normalCapacity) {
      const scaleFactor = Math.min(1.0, normalCapacity / pageLineCount);
      effectiveRuleHeight = Math.max(16, Math.round(state.ruleHeight * scaleFactor));
      effectiveFontSize = Math.max(11, Math.round(state.fontSize * scaleFactor));
    }

    // CSS variables
    p.style.setProperty("--font-family", `"${state.fontFamily}", cursive`);
    p.style.setProperty("--font-size", `${effectiveFontSize}px`);
    p.style.setProperty("--rule-height", `${effectiveRuleHeight}px`);
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

  // Dynamic Ink Tone Shading Utility: calculates natural pigment concentration based on pen pressure
  function getDynamicInkColor(baseHex, pressure, isPunctuation) {
    let r = 26, g = 42, b = 140; // fallback royal blue
    if (baseHex && baseHex.startsWith("#")) {
      const hex = baseHex.slice(1);
      if (hex.length === 6) {
        r = parseInt(hex.slice(0, 2), 16);
        g = parseInt(hex.slice(2, 4), 16);
        b = parseInt(hex.slice(4, 6), 16);
      } else if (hex.length === 3) {
        r = parseInt(hex[0] + hex[0], 16);
        g = parseInt(hex[1] + hex[1], 16);
        b = parseInt(hex[2] + hex[2], 16);
      }
    }

    // Pressure factor centered around 0.88
    const factor = (pressure - 0.88) * 1.6;
    let nr = Math.min(255, Math.max(0, Math.round(r * (1 - factor * 0.32))));
    let ng = Math.min(255, Math.max(0, Math.round(g * (1 - factor * 0.32))));
    let nb = Math.min(255, Math.max(0, Math.round(b * (1 - factor * 0.32))));

    if (isPunctuation) {
      nr = Math.max(0, Math.round(nr * 0.88));
      ng = Math.max(0, Math.round(ng * 0.88));
      nb = Math.max(0, Math.round(nb * 0.88));
    }

    return `rgb(${nr}, ${ng}, ${nb})`;
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

    // Track repeated letters so consecutive identical glyphs (e.g. double 'e', 'l', 'o') receive alternate shapes
    const charOccurrences = {};

    lines.forEach((lineText, lineIdx) => {
      const lineEl = document.createElement("div");
      lineEl.className = "hand-line";

      if (lineText.length === 0) {
        lineEl.classList.add("empty-line");
        frag.appendChild(lineEl);
        return;
      }

      // 1. Natural Movement: Organic line start drift (margin drift), line tilt, and line-to-line spacing variance
      if (naturalMove) {
        const lineRand = mulberry32(baseSeed + lineIdx * 1337);
        const lineDrift = (Math.sin(lineIdx * 0.45) * 3.8 + (lineRand() - 0.5) * 3.2) * intensity;
        lineEl.style.paddingLeft = Math.max(0, lineDrift).toFixed(1) + "px";

        // Natural movement: arm pivot line tilt (-0.3deg to +0.3deg)
        const lineTilt = (Math.sin(lineIdx * 0.75) * 0.22 + (lineRand() - 0.5) * 0.26) * intensity;
        const lineSpacingJitter = (lineRand() - 0.5) * 1.6 * intensity;
        lineEl.style.transform = `translateY(${lineSpacingJitter.toFixed(2)}px) rotate(${lineTilt.toFixed(2)}deg)`;
        lineEl.style.transformOrigin = "left center";
      }

      // Split into words
      const words = lineText.split(" ");
      words.forEach((word, wordIdx) => {
        const wordEl = document.createElement("span");
        wordEl.className = "hand-word";

        // 2. Natural Movement: Word baseline wobble & variable word spacing
        if (naturalMove) {
          const wobble = Math.sin((lineIdx * 2.5 + wordIdx) * 0.7) * 1.35 * intensity;
          wordEl.style.transform = `translateY(${wobble.toFixed(2)}px)`;

          const wordRand = mulberry32(baseSeed + lineIdx * 100 + wordIdx * 17);
          const space = (0.34 + wordRand() * 0.20 * intensity).toFixed(2);
          wordEl.style.setProperty("--word-space", `${space}em`);
        }

        let prevCh = null;

        // Render characters within word
        for (let chIdx = 0; chIdx < word.length; chIdx++) {
          const ch = word[chIdx];
          const isDuplicate = prevCh && (ch.toLowerCase() === prevCh.toLowerCase());
          prevCh = ch;

          const glyphEl = document.createElement("span");
          glyphEl.className = "hand-glyph";
          glyphEl.textContent = ch;

          // Track letter occurrence to give repeated letters distinct alternate variations
          const occ = (charOccurrences[ch] = (charOccurrences[ch] || 0) + 1);

          // Deterministic PRNG for this glyph including occurrence count
          const glyphSeed = baseSeed + (lineIdx * 7919) + (wordIdx * 499) + (chIdx * 31) + (occ * 1337) + ch.charCodeAt(0);
          const glyphRand = mulberry32(glyphSeed);

          // 3. Vary each letter: Per-character random rotation, scale, slant/skew, micro-jitter, and duplicate letter differentiation
          if (varyLetter) {
            const r = () => (glyphRand() - 0.5) * 2;
            let rot = r() * 2.4 * intensity;
            let dy = r() * 1.15 * intensity;
            let sx = 1 + r() * 0.038 * intensity;
            let sy = 1 + r() * 0.038 * intensity;
            let skew = r() * 1.6 * intensity;
            let mr = r() * 0.45 * intensity;

            // Anti-detection: Consecutive duplicate letters (e.g. "oo", "ee", "ll", "ss", "tt") must be visibly differentiated
            if (isDuplicate) {
              rot = (-rot * 1.1) + ((glyphRand() > 0.5 ? 1.6 : -1.6) * intensity);
              dy = (-dy * 0.9) + ((glyphRand() - 0.5) * 1.2 * intensity);
              sx = sx * (glyphRand() > 0.5 ? 0.95 : 1.05);
              sy = sy * (glyphRand() > 0.5 ? 1.05 : 0.95);
              skew = -skew * 1.25;
              mr += (0.5 * intensity);
            }

            // Word role dynamics (initial vs terminal)
            if (chIdx === 0) {
              sx *= 1.02;
              sy *= 1.02;
            } else if (chIdx === word.length - 1 && !/[.,!?:;"'()[\]{}]/.test(ch)) {
              skew += (0.5 * intensity);
            }

            glyphEl.style.transform = `translateY(${dy.toFixed(2)}px) rotate(${rot.toFixed(2)}deg) skewX(${skew.toFixed(2)}deg) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`;
            glyphEl.style.marginRight = `${mr.toFixed(2)}px`;
          }

          // 4. Inkflow: Pressure changes stroke by stroke, dynamic pigment shading, and paper fiber bleed
          if (inkflow) {
            const isPunctuation = /[.,!?:;"'()[\]{}•\-]/.test(ch);
            const isStart = chIdx === 0;
            const isEnd = chIdx === word.length - 1;
            let pressure;
            let strokeWidth;

            if (isPunctuation) {
              pressure = 0.94 + glyphRand() * 0.06;
              strokeWidth = (0.34 * intensity).toFixed(2);
            } else if (isStart) {
              pressure = 0.91 + glyphRand() * 0.09;
              strokeWidth = (0.24 * intensity).toFixed(2);
            } else if (isEnd) {
              pressure = 0.78 + glyphRand() * 0.16;
              strokeWidth = ((0.08 + glyphRand() * 0.14) * intensity).toFixed(2);
            } else {
              pressure = 0.80 + glyphRand() * 0.18;
              strokeWidth = ((0.10 + glyphRand() * 0.18) * intensity).toFixed(2);
            }

            const inkTone = getDynamicInkColor(state.inkColor, pressure, isPunctuation);
            glyphEl.style.color = inkTone;
            glyphEl.style.opacity = Math.min(1.0, pressure).toFixed(2);
            glyphEl.style.webkitTextStroke = `${strokeWidth}px ${inkTone}`;
            const bleedRadius = isPunctuation ? 0.45 : (0.20 + glyphRand() * 0.28);
            glyphEl.style.textShadow = `0 0 ${bleedRadius.toFixed(2)}px ${inkTone}`;
          } else {
            glyphEl.style.color = state.inkColor;
            glyphEl.style.opacity = "1.0";
            glyphEl.style.webkitTextStroke = "0px transparent";
            glyphEl.style.textShadow = "none";
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
    const isSpiral = state.pageStyle === "spiral";
    const nbX = isSpiral ? 140 : 0;
    const nbY = isSpiral ? 60 : 0;
    const nbW = isSpiral ? (canvas.width - 200) : canvas.width;
    const nbH = isSpiral ? (canvas.height - 120) : canvas.height;

    const marginLineX = isSpiral ? (nbX + marginPx + 40) : marginPx;
    let headerBottomY = isSpiral ? (nbY + (35 / 25.4) * 300) : ((40 / 25.4) * 300);

    if (state.headerEnabled) {
      const hdrX = marginLineX + (isSpiral ? 20 : 40);
      const hdrW = isSpiral ? (nbX + nbW - hdrX - 40) : (canvas.width - hdrX - (18 / 25.4) * 300);
      const hdrTop = isSpiral ? (nbY + 25) : ((14 / 25.4) * 300);

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
      ctx.fillText(`${pageIndex + 1} of ${Math.max(1, state.paginatedPages.length)}`, hdrX + hdrW * 0.72 + 65, hdrTop + 90);

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

    // 3. Draw Ruled Lines and Red Margin Line
    if (state.pageStyle !== "blank") {
      ctx.save();
      // Red vertical margin line — strictly inside paper bounds
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 1.5 * scale;
      ctx.beginPath();
      ctx.moveTo(marginLineX, isSpiral ? nbY : 0);
      ctx.lineTo(marginLineX, isSpiral ? (nbY + nbH) : canvas.height);
      ctx.stroke();

      // Blue horizontal ruled lines — strictly inside paper bounds
      ctx.strokeStyle = "#9cbde8";
      ctx.lineWidth = 1.0 * scale;
      const ruledStartX = isSpiral ? (nbX + 15) : 0;
      const ruledEndX = isSpiral ? (nbX + nbW - 15) : canvas.width;
      const ruledLimitY = isSpiral ? (nbY + nbH - 60) : (canvas.height - 100);

      const raw = state.paginatedPages[pageIndex] || "";
      const lines = raw.split(/\r?\n/);

      // Dynamic rule pitch to prevent any line cutoff on canvas
      const maxAvailableH = ruledLimitY - headerBottomY - (20 * scale);
      const neededH = lines.length * rulePitchPx;
      const actualRulePitch = neededH > maxAvailableH
        ? Math.max(12 * scale, maxAvailableH / (lines.length + 0.5))
        : rulePitchPx;
      const actualFontSize = actualRulePitch < rulePitchPx
        ? Math.max(10 * scale, fontSizePx * (actualRulePitch / rulePitchPx))
        : fontSizePx;

      for (let y = headerBottomY + actualRulePitch; y < ruledLimitY; y += actualRulePitch) {
        ctx.beginPath();
        ctx.moveTo(ruledStartX, y);
        ctx.lineTo(ruledEndX, y);
        ctx.stroke();
      }
      ctx.restore();
    }

    // 4. Render Handwritten Text on Ruled Lines
    const raw = state.paginatedPages[pageIndex] || "";
    const lines = raw.split(/\r?\n/);
    const startX = isSpiral ? (marginLineX + 24) : (marginPx + (state.pageStyle === "blank" ? 0 : 40));
    const textStartY = headerBottomY;
    const baseSeed = hashStr(raw) ^ ((pageIndex + 1) * 0x9e3779b9);

    const ruledLimitY = isSpiral ? (nbY + nbH - 60) : (canvas.height - 100);
    const maxAvailableH = ruledLimitY - headerBottomY - (20 * scale);
    const neededH = lines.length * rulePitchPx;
    const actualRulePitch = neededH > maxAvailableH
      ? Math.max(12 * scale, maxAvailableH / (lines.length + 0.5))
      : rulePitchPx;
    const actualFontSize = actualRulePitch < rulePitchPx
      ? Math.max(10 * scale, fontSizePx * (actualRulePitch / rulePitchPx))
      : fontSizePx;

    ctx.save();
    ctx.fillStyle = state.inkColor;
    ctx.textBaseline = "alphabetic";

    const charOccurrences = {};

    lines.forEach((lineText, lineIdx) => {
      // Align text baseline exactly to ruled line
      const lineY = textStartY + (lineIdx + 1) * actualRulePitch - (2 * scale);
      if (lineY > (isSpiral ? (nbY + nbH - 70) : (canvas.height - 120))) return;

      let curX = startX;

      // Natural movement: line start drift, arm pivot line tilt, & line spacing jitter
      let lineSpacingJitter = 0;
      let lineTilt = 0;
      if (state.naturalMovement) {
        const lineRand = mulberry32(baseSeed + lineIdx * 1337);
        const lineDrift = (Math.sin(lineIdx * 0.45) * 3.8 + (lineRand() - 0.5) * 3.2) * state.realismIntensity * scale;
        curX += Math.max(0, lineDrift);
        lineTilt = (Math.sin(lineIdx * 0.75) * 0.22 + (lineRand() - 0.5) * 0.26) * state.realismIntensity;
        lineSpacingJitter = (lineRand() - 0.5) * 1.6 * state.realismIntensity * scale;
      }

      ctx.save();
      if (lineTilt !== 0) {
        ctx.translate(curX, lineY);
        ctx.rotate((lineTilt * Math.PI) / 180);
        ctx.translate(-curX, -lineY);
      }

      let prevCh = null;
      const words = lineText.split(" ");
      words.forEach((word, wordIdx) => {
        // Natural movement: baseline wobble & word spacing
        let wobbleY = 0;
        if (state.naturalMovement) {
          wobbleY = Math.sin((lineIdx * 2.5 + wordIdx) * 0.7) * 1.35 * state.realismIntensity * scale;
        }

        for (let chIdx = 0; chIdx < word.length; chIdx++) {
          const ch = word[chIdx];
          const isDuplicate = prevCh && (ch.toLowerCase() === prevCh.toLowerCase());
          prevCh = ch;

          const occ = (charOccurrences[ch] = (charOccurrences[ch] || 0) + 1);
          const glyphSeed = baseSeed + (lineIdx * 7919) + (wordIdx * 499) + (chIdx * 31) + (occ * 1337) + ch.charCodeAt(0);
          const glyphRand = mulberry32(glyphSeed);

          let rot = 0;
          let dy = 0;
          let sx = 1;
          let sy = 1;
          let skew = 0;

          if (state.varyLetters) {
            const r = () => (glyphRand() - 0.5) * 2;
            let rotDeg = r() * 2.4 * state.realismIntensity;
            dy = r() * 1.15 * state.realismIntensity * scale;
            sx = 1 + r() * 0.038 * state.realismIntensity;
            sy = 1 + r() * 0.038 * state.realismIntensity;
            let skewDeg = r() * 1.6 * state.realismIntensity;

            // Anti-detection: Consecutive duplicate letters differentiated
            if (isDuplicate) {
              rotDeg = (-rotDeg * 1.1) + ((glyphRand() > 0.5 ? 1.6 : -1.6) * state.realismIntensity);
              dy = (-dy * 0.9) + ((glyphRand() - 0.5) * 1.2 * state.realismIntensity * scale);
              sx = sx * (glyphRand() > 0.5 ? 0.95 : 1.05);
              sy = sy * (glyphRand() > 0.5 ? 1.05 : 0.95);
              skewDeg = -skewDeg * 1.25;
            }

            // Word role dynamics (initial vs terminal)
            if (chIdx === 0) {
              sx *= 1.02;
              sy *= 1.02;
            } else if (chIdx === word.length - 1 && !/[.,!?:;"'()[\]{}]/.test(ch)) {
              skewDeg += (0.5 * state.realismIntensity);
            }

            rot = (rotDeg * Math.PI) / 180;
            skew = (skewDeg * Math.PI) / 180;
          }

          let pressure = 1.0;
          const isPunctuation = /[.,!?:;"'()[\]{}•\-]/.test(ch);
          const isStart = chIdx === 0;
          const isEnd = chIdx === word.length - 1;

          if (state.inkflow) {
            if (isPunctuation) {
              pressure = 0.94 + glyphRand() * 0.06;
            } else if (isStart) {
              pressure = 0.91 + glyphRand() * 0.09;
            } else if (isEnd) {
              pressure = 0.78 + glyphRand() * 0.16;
            } else {
              pressure = 0.80 + glyphRand() * 0.18;
            }
          }

          const inkTone = state.inkflow ? getDynamicInkColor(state.inkColor, pressure, isPunctuation) : state.inkColor;
          ctx.fillStyle = inkTone;
          ctx.globalAlpha = state.inkflow ? Math.min(1.0, pressure) : 1.0;

          ctx.save();
          ctx.translate(curX, lineY + wobbleY + lineSpacingJitter + dy);
          if (rot !== 0) ctx.rotate(rot);
          if (skew !== 0) ctx.transform(1, 0, Math.tan(skew), 1, 0, 0);
          if (sx !== 1 || sy !== 1) ctx.scale(sx, sy);
          ctx.font = `${actualFontSize}px "${state.fontFamily}", cursive`;
          ctx.fillText(ch, 0, 0);

          // Inkflow fiber bleed simulation for heavy strokes & punctuation
          if (state.inkflow) {
            if (isPunctuation) {
              ctx.globalAlpha = 0.22;
              ctx.fillText(ch, 0.4 * scale, 0.4 * scale);
            } else if (pressure > 0.90) {
              ctx.globalAlpha = 0.15;
              ctx.fillText(ch, 0.35 * scale, 0.35 * scale);
            }
          }
          ctx.restore();

          const glyphWidth = ctx.measureText(ch).width;
          curX += glyphWidth + (state.varyLetters ? (glyphRand() - 0.5) * 2.0 : 0);
        }

        // Space between words
        const spaceRand = mulberry32(baseSeed + lineIdx * 100 + wordIdx * 17);
        const spaceW = (0.34 + spaceRand() * 0.20 * state.realismIntensity) * actualFontSize;
        curX += spaceW;
      });

      ctx.restore(); // restore line tilt
    });

    ctx.restore();

    // 5. Draw Page Number Footer — strictly inside paper bounds
    ctx.save();
    ctx.font = `${14 * scale}px "${state.fontFamily}", cursive`;
    ctx.fillStyle = "#64748b";
    ctx.textAlign = "right";
    const footerX = isSpiral ? (nbX + nbW - 60) : (canvas.width - (18 / 25.4) * 300);
    const footerY = isSpiral ? (nbY + nbH - 30) : (canvas.height - 40);
    ctx.fillText(`Page ${pageIndex + 1}`, footerX, footerY);
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

  // ==========================================================================
  // DOCUMENT EXTRACTION & UPLOAD (.docx, .pdf, .txt, .md)
  // ==========================================================================

  // Clean and normalize extracted text
  function cleanExtractedText(text) {
    if (typeof text !== "string") return "";
    return text
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\t/g, "    ")
      .replace(/[ \u00A0]+/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  // Fallback text extraction for PDF ArrayBuffer if pdfjsLib is unavailable
  function extractTextFromPdfFallback(arrayBuffer) {
    const bytes = new Uint8Array(arrayBuffer);
    let str = "";
    for (let i = 0; i < bytes.length; i++) {
      const b = bytes[i];
      if ((b >= 32 && b <= 126) || b === 10 || b === 13) {
        str += String.fromCharCode(b);
      }
    }
    const textMatches = [];
    const regex = /\(([^()]{2,})\)\s*T[jd]/g;
    let m;
    while ((m = regex.exec(str)) !== null) {
      textMatches.push(m[1].replace(/\\([()\\])/g, "$1"));
    }
    return textMatches.length > 0 ? textMatches.join(" ") : "";
  }

  // Extract text from PDF using pdfjsLib or fallback
  async function extractTextFromPdf(arrayBuffer) {
    if (typeof window !== "undefined" && window.pdfjsLib) {
      if (!window.pdfjsLib.GlobalWorkerOptions.workerSrc) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      }
      try {
        const typedarray = new Uint8Array(arrayBuffer);
        const loadingTask = window.pdfjsLib.getDocument({ data: typedarray });
        const pdf = await loadingTask.promise;
        const pageTexts = [];
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const lineMap = {};
          for (const item of textContent.items) {
            if (!item.str) continue;
            const y = Math.round(item.transform[5]);
            if (!lineMap[y]) lineMap[y] = [];
            lineMap[y].push(item.str);
          }
          const sortedYs = Object.keys(lineMap).map(Number).sort((a, b) => b - a);
          const pageLines = sortedYs.map(y => lineMap[y].join(" ").trim()).filter(l => l.length > 0);
          pageTexts.push(pageLines.join("\n"));
        }
        const combined = pageTexts.join(PAGE_BREAK);
        if (combined.trim().length > 0) return combined;
      } catch (err) {
        console.warn("pdfjsLib parsing error, attempting fallback:", err);
      }
    }
    return extractTextFromPdfFallback(arrayBuffer);
  }

  // Fallback text extraction for Word .docx ArrayBuffer if mammoth is unavailable
  function extractTextFromDocxFallback(arrayBuffer) {
    try {
      const bytes = new Uint8Array(arrayBuffer);
      const decoder = new TextDecoder("utf-8", { fatal: false });
      const raw = decoder.decode(bytes);
      const pMatches = raw.split(/<\/w:p>/g);
      const lines = [];
      for (const p of pMatches) {
        const tMatches = [];
        const tRegex = /<w:t[^>]*>([^<]+)<\/w:t>/g;
        let m;
        while ((m = tRegex.exec(p)) !== null) {
          tMatches.push(m[1]);
        }
        if (tMatches.length > 0) {
          lines.push(tMatches.join(""));
        }
      }
      if (lines.length > 0) {
        return lines.join("\n");
      }
    } catch (e) {
      // ignore
    }
    return "";
  }

  // Extract text from DOCX using mammoth or fallback
  async function extractTextFromDocx(arrayBuffer) {
    if (typeof window !== "undefined" && window.mammoth) {
      try {
        const result = await window.mammoth.extractRawText({ arrayBuffer });
        if (result && typeof result.value === "string" && result.value.trim().length > 0) {
          return result.value;
        }
      } catch (err) {
        console.warn("mammoth extraction error, attempting fallback:", err);
      }
    }
    return extractTextFromDocxFallback(arrayBuffer);
  }

  // Master document extractor supporting .docx, .pdf, .txt, .md
  async function extractDocument(file) {
    if (!file) throw new Error("No file selected.");
    const name = file.name || "document";
    const ext = name.slice(name.lastIndexOf(".")).toLowerCase();

    // 1. Text or Markdown
    if (ext === ".txt" || ext === ".md" || (file.type && file.type.startsWith("text/"))) {
      let raw = "";
      if (typeof file.text === "function") {
        raw = await file.text();
      } else {
        raw = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Failed to read text file."));
          reader.readAsText(file, "utf-8");
        });
      }
      const cleaned = cleanExtractedText(raw);
      if (!cleaned) throw new Error("The text file is empty.");
      return cleaned;
    }

    // 2. PDF Document
    if (ext === ".pdf" || file.type === "application/pdf") {
      let arrayBuffer;
      if (typeof file.arrayBuffer === "function") {
        arrayBuffer = await file.arrayBuffer();
      } else {
        arrayBuffer = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Failed to read PDF file."));
          reader.readAsArrayBuffer(file);
        });
      }
      const raw = await extractTextFromPdf(arrayBuffer);
      const cleaned = cleanExtractedText(raw);
      if (!cleaned) {
        throw new Error("Could not extract readable text from PDF. It may contain scanned images without OCR.");
      }
      return cleaned;
    }

    // 3. Microsoft Word (.docx)
    if (ext === ".docx" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      let arrayBuffer;
      if (typeof file.arrayBuffer === "function") {
        arrayBuffer = await file.arrayBuffer();
      } else {
        arrayBuffer = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => reject(new Error("Failed to read Word document."));
          reader.readAsArrayBuffer(file);
        });
      }
      const raw = await extractTextFromDocx(arrayBuffer);
      const cleaned = cleanExtractedText(raw);
      if (!cleaned) {
        throw new Error("Could not extract readable text from Word document.");
      }
      return cleaned;
    }

    throw new Error(`Unsupported format "${ext}". Please upload a .docx, .pdf, .txt, or .md file.`);
  }

  // 1-Click IoT Demo Assignment Loader
  function loadIotDemoAssignment() {
    state.content = IOT_DEMO_CONTENT;
    if (els.textInput) els.textInput.value = IOT_DEMO_CONTENT;

    // Header fields: Subject: "Cyber Security in IoT", Assignment: "Assignment 3 Solutions", Date: Current Date
    const today = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    state.headerInfo = Object.assign({}, state.headerInfo, {
      subject: "Cyber Security in IoT",
      assignment: "Assignment 3 Solutions",
      date: today
    });

    if (els.hdrSubject) els.hdrSubject.value = state.headerInfo.subject;
    if (els.hdrAssignment) els.hdrAssignment.value = state.headerInfo.assignment;
    if (els.hdrDate) els.hdrDate.value = state.headerInfo.date;

    state.currentPage = 0;
    recomputePages();
    render();
    saveState();
  }

  // Modal UI handlers
  function openUploadModal() {
    if (els.uploadModal) {
      els.uploadModal.classList.remove("hidden");
      resetUploadStatus();
      if (els.dropZone) els.dropZone.focus();
    }
  }

  function closeUploadModal() {
    if (els.uploadModal) {
      els.uploadModal.classList.add("hidden");
      resetUploadStatus();
      if (els.docFileInput) els.docFileInput.value = "";
    }
  }

  function resetUploadStatus() {
    if (!els.uploadStatus) return;
    els.uploadStatus.className = "upload-status hidden";
    if (els.statusSpinner) els.statusSpinner.classList.add("hidden");
    if (els.statusIcon) els.statusIcon.textContent = "ℹ️";
    if (els.statusText) els.statusText.textContent = "";
  }

  function setUploadStatus(type, message) {
    if (!els.uploadStatus) return;
    els.uploadStatus.className = `upload-status status-${type}`;
    els.uploadStatus.classList.remove("hidden");
    if (type === "loading") {
      if (els.statusSpinner) els.statusSpinner.classList.remove("hidden");
      if (els.statusIcon) els.statusIcon.textContent = "";
    } else {
      if (els.statusSpinner) els.statusSpinner.classList.add("hidden");
      if (els.statusIcon) els.statusIcon.textContent = type === "success" ? "✓" : "⚠️";
    }
    if (els.statusText) els.statusText.textContent = message;
  }

  async function handleFileUpload(file) {
    if (!file) return;
    setUploadStatus("loading", `Reading "${file.name}" and extracting text...`);
    try {
      const extractedText = await extractDocument(file);
      state.content = extractedText;
      if (els.textInput) els.textInput.value = extractedText;
      state.currentPage = 0;
      recomputePages();
      render();
      saveState();

      const pageCount = state.paginatedPages.length;
      setUploadStatus("success", `✓ Successfully imported "${file.name}" (${extractedText.length.toLocaleString()} characters across ${pageCount} ${pageCount === 1 ? 'page' : 'pages'})!`);

      setTimeout(() => {
        closeUploadModal();
      }, 1400);
    } catch (err) {
      console.error("Document upload error:", err);
      setUploadStatus("error", err.message || "Failed to process document. Please try another file.");
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

    const presetPills = document.querySelectorAll(".btn-preset-pill");

    els.jitterIntensity.addEventListener("input", (e) => {
      state.realismIntensity = parseFloat(e.target.value);
      els.jitterIntensityVal.textContent = state.realismIntensity.toFixed(1) + "x";
      presetPills.forEach((p) => {
        const val = parseFloat(p.getAttribute("data-intensity"));
        p.classList.toggle("active", Math.abs(val - state.realismIntensity) < 0.05);
      });
      renderText();
      saveState();
    });

    presetPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        const val = parseFloat(pill.getAttribute("data-intensity"));
        if (!isNaN(val)) {
          state.realismIntensity = val;
          els.jitterIntensity.value = val;
          els.jitterIntensityVal.textContent = val.toFixed(1) + "x";
          presetPills.forEach((p) => p.classList.toggle("active", p === pill));
          renderText();
          saveState();
        }
      });
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

    // 11. Document Upload & Modal Interactions
    if (els.btnTopUploadDoc) els.btnTopUploadDoc.addEventListener("click", openUploadModal);
    if (els.btnUploadDoc) els.btnUploadDoc.addEventListener("click", openUploadModal);
    if (els.btnCloseModal) els.btnCloseModal.addEventListener("click", closeUploadModal);
    if (els.btnCancelModal) els.btnCancelModal.addEventListener("click", closeUploadModal);

    if (els.uploadModal) {
      els.uploadModal.addEventListener("click", (e) => {
        if (e.target === els.uploadModal) closeUploadModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && els.uploadModal && !els.uploadModal.classList.contains("hidden")) {
        closeUploadModal();
      }
    });

    if (els.dropZone && els.docFileInput) {
      els.dropZone.addEventListener("click", () => els.docFileInput.click());
      els.dropZone.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          els.docFileInput.click();
        }
      });

      ["dragenter", "dragover"].forEach((eventName) => {
        els.dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          els.dropZone.classList.add("drag-over");
        });
      });

      ["dragleave", "drop"].forEach((eventName) => {
        els.dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          els.dropZone.classList.remove("drag-over");
        });
      });

      els.dropZone.addEventListener("drop", (e) => {
        const dt = e.dataTransfer;
        if (dt && dt.files && dt.files.length > 0) {
          handleFileUpload(dt.files[0]);
        }
      });

      els.docFileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files.length > 0) {
          handleFileUpload(e.target.files[0]);
        }
      });
    }

    // 12. 1-Click Load IoT Demo Assignment
    if (els.btnTopDemoIot) {
      els.btnTopDemoIot.addEventListener("click", loadIotDemoAssignment);
    }
    if (els.btnModalDemoIot) {
      els.btnModalDemoIot.addEventListener("click", () => {
        loadIotDemoAssignment();
        closeUploadModal();
      });
    }
  }

  // Initialization
  loadStoredState();
  recomputePages();
  setupSpiralRings();
  syncControlsToState();
  bindEvents();
  render();

  // Expose API for automated testing & external integrations
  const publicApi = {
    state,
    paginate,
    cleanExtractedText,
    extractDocument,
    extractTextFromPdf,
    extractTextFromDocx,
    loadIotDemoAssignment,
    IOT_DEMO_CONTENT
  };

  if (typeof window !== "undefined") {
    window.HandTextAI = publicApi;
  }
  if (typeof globalThis !== "undefined") {
    globalThis.HandTextAI = publicApi;
  }

})();
