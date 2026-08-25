"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const AnimatedCube3D = dynamic(() => import("@/components/AnimatedCube3D"), {
  ssr: false,
  loading: () => (
    <div style={{ width: 420, height: 420, display: "grid", placeItems: "center" }}>
      <div className="spinner" />
    </div>
  ),
});

function BrandMark() {
  const tiles = [
    "#ffffff",
    "#ffcc4d",
    "#ff6f61",
    "#35c46d",
    "#0d1117",
    "#4f8cff",
    "#ff8a3d",
    "#44d7b6",
    "#f7fafc",
  ];

  return (
    <div className="brand-mark" aria-hidden="true">
      {tiles.map((color, index) => (
        <span key={index} style={{ background: color }} />
      ))}
    </div>
  );
}

function BrandLockup() {
  return (
    <Link href="/" className="brand-lockup" aria-label="PrismLock Studio home">
      <BrandMark />
      <span className="brand-word">
        <strong>PrismLock</strong>
        <small>Studio</small>
      </span>
    </Link>
  );
}

const workflowSteps = [
  {
    number: "01",
    label: "Capture",
    title: "Lock every visible sticker",
    detail: "Use the reticle, face order guide, and live swatches to sample one clean side at a time.",
    commands: ["Camera preview", "9-cell reticle", "Live swatches"],
  },
  {
    number: "02",
    label: "Correct",
    title: "Repair noisy samples",
    detail: "Paint any misread sticker before solving so the final cube state stays valid.",
    commands: ["Sticker paint lab", "Color inventory", "Undo face"],
  },
  {
    number: "03",
    label: "Validate",
    title: "Check the cube state",
    detail: "Balance all six colors and confirm the scanner has a complete 54-cell state.",
    commands: ["6-face net", "Center check", "Readiness checks"],
  },
  {
    number: "04",
    label: "Solve",
    title: "Play the algorithm",
    detail: "Run the Kociemba solver, step through each move, and copy the sequence.",
    commands: ["Move playback", "Copy algorithm", "Practice mode"],
  },
];

const readinessItems = [
  "Balanced light",
  "Cube centered",
  "Six faces captured",
  "Correction pass",
];

const scannerDetails = [
  {
    label: "Capture Assist",
    title: "Reticle guided sampling",
    copy: "The scanner keeps every sticker inside a clean 3x3 target and shows the live color map before you save a face.",
  },
  {
    label: "Correction Lab",
    title: "Paint exact stickers",
    copy: "Switch faces, choose a cube color, and patch a single bad cell without restarting the scan.",
  },
  {
    label: "Cube Net",
    title: "See the whole state",
    copy: "Track all six faces in a static cube net so missing or duplicated colors are easy to spot.",
  },
];

const featureNotes = [
  "Face order: U R F D L B",
  "Manual color repair before solving",
  "State validation for all 54 stickers",
  "Step playback for every generated move",
];

const playbackDetails = [
  "Move-by-move playback with previous and next controls",
  "Copyable algorithm output for practice sessions",
  "Validation checks before sending a state to the solver",
  "Demo loading for testing the solver without a camera",
];

const sampleMoves = ["R", "U", "R'", "U'", "F2", "D", "L'", "B", "U2", "R2", "F", "L2"];

function generateScramble() {
  return [...sampleMoves]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)
    .join(" ");
}

const pageExpansionStyles = `
  .home-hero {
    min-height: calc(100vh - 78px);
    padding-top: clamp(34px, 5vw, 76px);
    padding-bottom: clamp(34px, 5vw, 76px);
    margin-bottom: 0;
  }

  .feature-showcase {
    scroll-margin-top: 92px;
    margin-top: 28px;
    margin-bottom: 28px;
    padding-top: clamp(26px, 4vw, 44px);
    padding-bottom: clamp(28px, 4vw, 44px);
  }

  .feature-heading {
    max-width: 960px;
    margin-bottom: 24px;
  }

  .feature-note-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
  }

  .feature-note-row span {
    min-height: 30px;
    display: inline-flex;
    align-items: center;
    padding: 0 10px;
    border: 1px solid rgba(36, 226, 184, 0.22);
    border-radius: 999px;
    color: var(--soft);
    background: rgba(36, 226, 184, 0.07);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    text-transform: uppercase;
  }

  .section-heading {
    max-width: 760px;
  }

  .section-heading h2 {
    margin: 8px 0 0;
    font-size: clamp(2rem, 4vw, 3.75rem);
    line-height: 1.05;
    letter-spacing: 0;
  }

  .section-heading p:not(.eyebrow) {
    margin: 18px 0 0;
    color: var(--soft);
    font-size: 1rem;
    line-height: 1.75;
  }

  .wide-heading {
    max-width: 920px;
  }

  .scanner-lab-section,
  .playback-section {
    margin: 0 clamp(18px, 4vw, 28px) 28px;
    padding: clamp(30px, 4vw, 52px) clamp(18px, 4vw, 46px);
    border: 1px solid rgba(36, 226, 184, 0.2);
    border-radius: 18px;
    background:
      radial-gradient(circle at 16% 20%, rgba(36, 226, 184, 0.15), transparent 34%),
      radial-gradient(circle at 82% 12%, rgba(255, 95, 217, 0.13), transparent 34%),
      linear-gradient(145deg, rgba(7, 16, 34, 0.84), rgba(6, 9, 23, 0.78));
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  }

  .scanner-lab-grid {
    display: grid;
    grid-template-columns: minmax(360px, 0.9fr) minmax(0, 1.1fr);
    gap: clamp(20px, 4vw, 48px);
    align-items: stretch;
    margin-top: 28px;
  }

  .scanner-preview-panel {
    position: relative;
    overflow: hidden;
    min-height: 360px;
    display: grid;
    place-items: center;
    border: 1px solid rgba(36, 226, 184, 0.48);
    border-radius: 18px;
    background:
      radial-gradient(circle at 50% 50%, rgba(12, 132, 255, 0.34), transparent 36%),
      linear-gradient(rgba(36, 226, 184, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(36, 226, 184, 0.05) 1px, transparent 1px),
      rgba(5, 13, 29, 0.72);
    background-size: auto, 22px 22px, 22px 22px, auto;
    box-shadow: 0 0 38px rgba(36, 226, 184, 0.16), inset 0 0 70px rgba(36, 226, 184, 0.08);
  }

  .preview-toolbar {
    position: absolute;
    top: 18px;
    left: 18px;
    right: 18px;
    display: flex;
    justify-content: space-between;
    color: var(--muted);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
  }

  .preview-toolbar b {
    color: var(--prism);
  }

  .preview-reticle {
    width: min(68%, 310px);
    aspect-ratio: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 12px;
    border: 2px solid rgba(36, 226, 184, 0.7);
    border-radius: 14px;
    box-shadow: 0 0 28px rgba(36, 226, 184, 0.24);
  }

  .preview-reticle span {
    border: 2px solid rgba(255, 255, 255, 0.72);
    border-radius: 6px;
    background: linear-gradient(145deg, rgba(22, 119, 255, 0.92), rgba(36, 226, 184, 0.38));
  }

  .preview-swatches {
    position: absolute;
    left: 22px;
    right: 22px;
    bottom: 22px;
    display: flex;
    gap: 8px;
  }

  .preview-swatches i {
    width: 34px;
    height: 34px;
    border: 1px solid rgba(255, 255, 255, 0.26);
    border-radius: 8px;
  }

  .scanner-detail-list {
    display: grid;
    gap: 12px;
  }

  .scanner-detail-list article {
    min-height: 106px;
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: 14px;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04)),
      rgba(255, 255, 255, 0.04);
  }

  .scanner-detail-list span {
    color: var(--prism);
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    text-transform: uppercase;
  }

  .scanner-detail-list h3 {
    margin: 10px 0 8px;
    font-size: 1.28rem;
  }

  .scanner-detail-list p {
    margin: 0;
    color: var(--soft);
    line-height: 1.65;
  }

  .playback-section {
    border-color: rgba(155, 124, 255, 0.28);
  }

  .playback-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(360px, 0.92fr);
    gap: 18px;
    margin-top: 26px;
  }

  .algorithm-card,
  .playback-checks {
    min-height: 248px;
    padding: 22px;
    border: 1px solid rgba(155, 124, 255, 0.34);
    border-radius: 18px;
    background:
      radial-gradient(circle at 70% 10%, rgba(255, 225, 92, 0.12), transparent 34%),
      linear-gradient(145deg, rgba(93, 140, 255, 0.12), rgba(255, 95, 115, 0.08)),
      rgba(255, 255, 255, 0.045);
  }

  .algorithm-card h3 {
    margin: 18px 0 22px;
    font-family: "JetBrains Mono", monospace;
    font-size: clamp(1.6rem, 3vw, 3rem);
    line-height: 1.2;
  }

  .algorithm-rail {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .algorithm-rail span {
    min-width: 48px;
    min-height: 42px;
    display: grid;
    place-items: center;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.055);
    font-family: "JetBrains Mono", monospace;
    font-weight: 800;
  }

  .algorithm-rail .current {
    color: var(--ink);
    border-color: transparent;
    background: linear-gradient(135deg, var(--prism), var(--prism-2));
    box-shadow: 0 0 24px rgba(36, 226, 184, 0.34);
  }

  .playback-checks {
    display: grid;
    gap: 12px;
  }

  .playback-checks div {
    display: grid;
    grid-template-columns: 46px 1fr;
    gap: 14px;
    align-items: center;
    padding: 14px;
    border: 1px solid var(--line);
    border-radius: var(--radius);
    background: rgba(255, 255, 255, 0.045);
  }

  .playback-checks span {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 999px;
    color: var(--ink);
    background: linear-gradient(135deg, var(--prism), var(--prism-2));
    font-family: "JetBrains Mono", monospace;
    font-size: 0.72rem;
    font-weight: 800;
  }

  .playback-checks p {
    margin: 0;
    color: var(--soft);
    line-height: 1.55;
  }

  .studio-tools {
    margin-bottom: 28px;
  }

  .telemetry-strip {
    margin-bottom: 46px;
  }

  @media (max-width: 980px) {
    .scanner-lab-grid,
    .playback-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .home-hero {
      min-height: calc(100vh - 116px);
      padding-top: 42px;
      padding-bottom: 44px;
    }

    .scanner-lab-section,
    .playback-section {
      margin-bottom: 20px;
      padding: 28px 14px;
    }

    .scanner-preview-panel,
    .algorithm-card,
    .playback-checks {
      min-height: 280px;
    }
  }
`;

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [scramble, setScramble] = useState("R U R' U' F2 D L' B U2 R2");
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState([0, 1]);

  const moves = useMemo(
    () => scramble.trim().split(/\s+/).filter(Boolean),
    [scramble],
  );

  const toggleReadiness = (index: number) => {
    setCheckedItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  };

  const copyScramble = async () => {
    if (!scramble.trim()) {
      return;
    }

    await navigator.clipboard.writeText(scramble);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  const selectedStep = workflowSteps[activeStep];

  return (
    <main className="app-shell">
      <style>{pageExpansionStyles}</style>
      <header className="topbar">
        <BrandLockup />
        <nav className="nav-links" aria-label="Primary">
          <a className="active" href="#workflow">Workflow</a>
          <a href="#workflow">Features</a>
          <a href="#scanner-lab">Scanner</a>
          <a href="#tools">Tools</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" aria-label="Theme settings" type="button">
            <span className="sun-icon" />
          </button>
          <Link href="/scan" className="button primary cta-glow">
            <span className="scan-icon" />
            Open Scanner
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
      </header>

      <section className="home-hero" id="workspace">
        <div className="hero-aura" aria-hidden="true" />
        <div>
          <p className="eyebrow pill">Camera guided cube solving</p>
          <h1 className="hero-title">PrismLock Studio</h1>
          <p className="hero-copy">
            A colorful cube-solving cockpit for live face capture, manual sticker
            correction, state validation, and move-by-move solution playback.
          </p>

          <div className="hero-actions">
            <Link href="/scan" className="button primary cta-glow">
              <span className="scan-icon" />
              Start a Scan
              <span aria-hidden="true">-&gt;</span>
            </Link>
            <a href="#workflow" className="button ghost">
              <span className="play-icon" />
              View Flow
            </a>
          </div>

          <div className="metric-strip" aria-label="Application capabilities">
            <div className="metric">
              <span className="metric-icon cube-glyph" />
              <strong>6 faces</strong>
              <span>guided capture path</span>
            </div>
            <div className="metric">
              <span className="metric-icon grid-glyph" />
              <strong>54 cells</strong>
              <span>live sticker sampling</span>
            </div>
            <div className="metric">
              <span className="metric-icon tool-glyph" />
              <strong>Lab tools</strong>
              <span>manual correction</span>
            </div>
          </div>
        </div>

        <div className="cube-stage" aria-label="Interactive cube preview">
          <div className="stage-panel">
            <div className="stage-header">
              <span><i /> Prism scan plane</span>
              <span>Ready <i className="violet-dot" /></span>
            </div>
            <div className="cube-mount">
              <div className="radar-ring" aria-hidden="true" />
              <AnimatedCube3D containerSize={430} />
            </div>
            <div className="stage-footer">
              <span>Face order <b>U R F D L B</b></span>
              <span>Solver core <b>Kociemba</b></span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-showcase" id="workflow" aria-label="Workflow">
        <div className="feature-heading">
          <p className="eyebrow">Modern solving workflow</p>
          <h2>Built for messy real-world scans</h2>
          <div className="feature-note-row" aria-label="Workflow details">
            {featureNotes.map((note) => (
              <span key={note}>{note}</span>
            ))}
          </div>
        </div>
        <div className="feature-grid">
          <article className="feature-tile tile-coral">
            <span>01</span>
            <h3>Live color swatches</h3>
            <p>See what the camera reads before committing the face.</p>
            <div className="card-visual lens-visual" aria-hidden="true" />
          </article>
          <article className="feature-tile tile-blue">
            <span>02</span>
            <h3>Manual sticker painting</h3>
            <p>Tap a face, choose a color, and repair one bad sample instantly.</p>
            <div className="card-visual brush-visual" aria-hidden="true" />
          </article>
          <article className="feature-tile tile-green">
            <span>03</span>
            <h3>One-click state solve</h3>
            <p>Run the solver after camera capture or after manual corrections.</p>
            <div className="card-visual play-visual" aria-hidden="true" />
          </article>
          <article className="feature-tile tile-gold">
            <span>04</span>
            <h3>Step sequence panel</h3>
            <p>Jump to any move and copy the full algorithm for practice.</p>
            <div className="card-visual bolt-visual" aria-hidden="true" />
          </article>
        </div>
      </section>

      <section className="scanner-lab-section" id="scanner-lab" aria-label="Scanner workspace details">
        <div className="section-heading wide-heading">
          <p className="eyebrow">Scanner workspace</p>
          <h2>Everything needed between camera input and a valid cube state</h2>
          <p>
            PrismLock keeps the solving flow visible: capture progress, cube net,
            correction controls, and final solver readiness all stay close together.
          </p>
        </div>
        <div className="scanner-lab-grid">
          <div className="scanner-preview-panel">
            <div className="preview-toolbar">
              <span>Live scan plane</span>
              <b>Face U</b>
            </div>
            <div className="preview-reticle" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <div className="preview-swatches" aria-hidden="true">
              {["#ffffff", "#ffd928", "#ff9630", "#ff4138", "#1677ff", "#35c46d"].map((color) => (
                <i key={color} style={{ background: color }} />
              ))}
            </div>
          </div>
          <div className="scanner-detail-list">
            {scannerDetails.map((item) => (
              <article key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="playback-section" aria-label="Solution playback details">
        <div className="section-heading">
          <p className="eyebrow">Solution control</p>
          <h2>From solved state to practice routine</h2>
        </div>
        <div className="playback-grid">
          <article className="algorithm-card">
            <span className="status-pill">Sample output</span>
            <h3>R U R&apos; U&apos; F2 D L&apos; B U2</h3>
            <div className="algorithm-rail" aria-hidden="true">
              {["R", "U", "R'", "U'", "F2", "D", "L'", "B", "U2"].map((move, index) => (
                <span className={index === 2 ? "current" : ""} key={`${move}-${index}`}>{move}</span>
              ))}
            </div>
          </article>
          <article className="playback-checks">
            {playbackDetails.map((item, index) => (
              <div key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </article>
        </div>
      </section>

      <section className="studio-tools" id="tools" aria-label="Studio tools">
        <article className="tool-panel workflow-inspector">
          <div className="tool-heading">
            <p className="eyebrow">Workflow inspector</p>
            <h2>Choose the next station</h2>
          </div>
          <div className="step-tabs" role="tablist" aria-label="Workflow stages">
            {workflowSteps.map((step, index) => (
              <button
                className={index === activeStep ? "step-tab active" : "step-tab"}
                key={step.number}
                onClick={() => setActiveStep(index)}
                type="button"
                role="tab"
                aria-selected={index === activeStep}
              >
                <span>{step.number}</span>
                {step.label}
              </button>
            ))}
          </div>
          <div className="active-step-card">
            <span className="status-pill">Active lane</span>
            <h3>{selectedStep.title}</h3>
            <p>{selectedStep.detail}</p>
            <div className="command-list">
              {selectedStep.commands.map((command) => (
                <span key={command}>{command}</span>
              ))}
            </div>
          </div>
        </article>

        <article className="tool-panel scramble-tool">
          <div className="tool-heading">
            <p className="eyebrow">Practice utility</p>
            <h2>Scramble pad</h2>
          </div>
          <label className="scramble-input">
            <span>Algorithm</span>
            <textarea
              value={scramble}
              onChange={(event) => setScramble(event.target.value)}
              rows={3}
              spellCheck={false}
            />
          </label>
          <div className="move-chip-row" aria-label="Parsed moves">
            {moves.length ? (
              moves.map((move, index) => (
                <span className="move-chip" key={`${move}-${index}`}>{move}</span>
              ))
            ) : (
              <span className="empty-chip">No moves yet</span>
            )}
          </div>
          <div className="tool-actions">
            <button className="button primary" onClick={() => setScramble(generateScramble())} type="button">
              Generate
            </button>
            <button className="button ghost" onClick={copyScramble} type="button">
              {copied ? "Copied" : "Copy"}
            </button>
            <button className="button ghost" onClick={() => setScramble("")} type="button">
              Clear
            </button>
            <span className="move-count">{moves.length} moves</span>
          </div>
        </article>

        <article className="tool-panel readiness-panel">
          <div className="tool-heading">
            <p className="eyebrow">Capture readiness</p>
            <h2>Pre-scan checks</h2>
          </div>
          <div className="readiness-list">
            {readinessItems.map((item, index) => {
              const active = checkedItems.includes(index);
              return (
                <button
                  className={active ? "readiness-item active" : "readiness-item"}
                  key={item}
                  onClick={() => toggleReadiness(index)}
                  type="button"
                  aria-pressed={active}
                >
                  <span>{active ? "Ready" : "Check"}</span>
                  {item}
                </button>
              );
            })}
          </div>
          <Link href="/scan" className="button primary cta-glow tool-scan">
            <span className="scan-icon" />
            Launch Scanner
            <span aria-hidden="true">-&gt;</span>
          </Link>
        </article>
      </section>

      <section className="telemetry-strip" aria-label="Studio status">
        <div>
          <span>Scanner</span>
          <strong>Guided capture</strong>
        </div>
        <div>
          <span>Solver</span>
          <strong>Kociemba core</strong>
        </div>
        <div>
          <span>State model</span>
          <strong>54 sticker cells</strong>
        </div>
        <div>
          <span>Playback</span>
          <strong>Step controls</strong>
        </div>
      </section>
    </main>
  );
}
