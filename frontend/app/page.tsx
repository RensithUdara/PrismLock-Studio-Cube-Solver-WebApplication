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
    detail: "Use the reticle and live color map to sample one clean face at a time.",
    commands: ["Camera preview", "9-cell reticle", "Face order guide"],
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

const sampleMoves = ["R", "U", "R'", "U'", "F2", "D", "L'", "B", "U2", "R2", "F", "L2"];

function generateScramble() {
  return [...sampleMoves]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10)
    .join(" ");
}

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
      <header className="topbar">
        <BrandLockup />
        <nav className="nav-links" aria-label="Primary">
          <a className="active" href="#workflow">Workflow</a>
          <a href="#workflow">Features</a>
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
