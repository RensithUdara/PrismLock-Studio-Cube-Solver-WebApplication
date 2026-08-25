"use client";

import Link from "next/link";
import dynamic from "next/dynamic";

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

export default function Home() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <BrandLockup />
        <nav className="nav-links" aria-label="Primary">
          <a className="active" href="#workflow">Workflow</a>
          <a href="#workflow">Features</a>
          <a href="#workspace">Workspace</a>
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
    </main>
  );
}
