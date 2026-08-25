"use client";

import { useState } from "react";
import Link from "next/link";
import CubeScanner from "@/components/CubeScanner";
import CubeStateDisplay from "@/components/CubeState";
import CubeSolutionPlayer from "@/components/CubeSolutionPlayer";
import { solveCube, CubeState, FACE_ORDER, FACE_LABELS, COLOR_MAP, type CubeColor, type FaceKey } from "@/lib/api";

type PageStatus = "scanning" | "solving" | "solved" | "error";
type SolveResponse = {
  success: boolean;
  solution: string[];
  move_count: number;
  error?: string;
};

const FACE_SHORT_LABELS: Record<FaceKey, string> = {
  U: "Up",
  R: "Right",
  F: "Front",
  D: "Down",
  L: "Left",
  B: "Back",
};

const COLOR_LABELS: Record<CubeColor, string> = {
  W: "White",
  Y: "Yellow",
  R: "Red",
  O: "Orange",
  B: "Blue",
  G: "Green",
  "?": "Unknown",
};

const EDIT_COLORS: CubeColor[] = ["W", "Y", "R", "O", "B", "G"];

const SOLVED_STATE: CubeState = {
  U: Array(9).fill("W") as CubeColor[],
  R: Array(9).fill("R") as CubeColor[],
  F: Array(9).fill("G") as CubeColor[],
  D: Array(9).fill("Y") as CubeColor[],
  L: Array(9).fill("O") as CubeColor[],
  B: Array(9).fill("B") as CubeColor[],
};

function BrandMark() {
  const tiles = ["#fff", "#ffcc4d", "#ff6f61", "#35c46d", "#0d1117", "#4f8cff", "#ff8a3d", "#44d7b6", "#f7fafc"];
  return (
    <div className="brand-mark" aria-hidden="true">
      {tiles.map((color, index) => (
        <span key={index} style={{ background: color }} />
      ))}
    </div>
  );
}

function ScanTitle({ status, currentFace }: { status: PageStatus; currentFace: FaceKey }) {
  if (status === "solving") return <>Building solution path</>;
  if (status === "solved") return <>Solution playback</>;
  if (status === "error") return <>Review required</>;
  return <>Scan {FACE_LABELS[currentFace]}</>;
}

export default function ScanPage() {
  const [cubeState, setCubeState] = useState<Partial<CubeState>>({});
  const [currentFace, setCurrentFace] = useState(0);
  const [status, setStatus] = useState<PageStatus>("scanning");
  const [solution, setSolution] = useState<SolveResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [editFace, setEditFace] = useState<FaceKey>("U");
  const [paintColor, setPaintColor] = useState<CubeColor>("W");

  const activeFace = FACE_ORDER[currentFace] ?? "B";
  const scannedCount = Object.keys(cubeState).length;
  const colorCounts = EDIT_COLORS.map((color) => ({
    color,
    count: FACE_ORDER.reduce((total, face) => {
      return total + (cubeState[face]?.filter((sticker) => sticker === color).length ?? 0);
    }, 0),
  }));

  const solveCurrentCube = async (state: CubeState) => {
    setStatus("solving");
    try {
      const result = await solveCube(state);
      if (result.success) {
        setSolution(result);
        setStatus("solved");
      } else {
        setErrorMsg(result.error || "The cube state could not be solved.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("The PrismLock API is unavailable at http://localhost:8000.");
      setStatus("error");
    }
  };

  const handleFaceCaptured = async (faceKey: string, colors: string[]) => {
    const updated = { ...cubeState, [faceKey]: colors } as Partial<CubeState>;
    setCubeState(updated);
    setEditFace(FACE_ORDER[Math.min(currentFace + 1, FACE_ORDER.length - 1)] ?? "U");

    if (currentFace < FACE_ORDER.length - 1) {
      setCurrentFace((index) => index + 1);
      return;
    }

    await solveCurrentCube(updated as CubeState);
  };

  const handleReset = () => {
    setCubeState({});
    setCurrentFace(0);
    setStatus("scanning");
    setSolution(null);
    setErrorMsg("");
    setEditFace("U");
    setPaintColor("W");
  };

  const handleUndoFace = () => {
    if (scannedCount === 0) return;
    const nextIndex = Math.max(currentFace - 1, 0);
    const faceToRemove = FACE_ORDER[Math.min(scannedCount - 1, FACE_ORDER.length - 1)];
    const updated = { ...cubeState };
    delete updated[faceToRemove];
    setCubeState(updated);
    setCurrentFace(nextIndex);
    setEditFace(faceToRemove);
    setStatus("scanning");
    setSolution(null);
    setErrorMsg("");
  };

  const handleLoadDemo = () => {
    setCubeState(SOLVED_STATE);
    setCurrentFace(FACE_ORDER.length - 1);
    setEditFace("U");
    setStatus("scanning");
    setSolution(null);
    setErrorMsg("");
  };

  const handleStickerPaint = (face: FaceKey, index: number) => {
    const existing = cubeState[face] ?? (Array(9).fill("?") as CubeColor[]);
    const updatedFace = [...existing] as CubeColor[];
    updatedFace[index] = paintColor;
    setCubeState({ ...cubeState, [face]: updatedFace });
  };

  const handleManualSolve = () => {
    const isComplete = FACE_ORDER.every((face) => cubeState[face]?.length === 9);
    if (!isComplete) {
      setErrorMsg("Complete or edit all six faces before solving.");
      setStatus("error");
      return;
    }
    solveCurrentCube(cubeState as CubeState);
  };

  return (
    <main className="app-shell scan-page">
      <header className="topbar">
        <Link href="/" className="brand-lockup" aria-label="PrismLock Studio home">
          <BrandMark />
          <span className="brand-word">
            <strong>PrismLock</strong>
            <small>Scanner</small>
          </span>
        </Link>
        <span className="status-pill">{status}</span>
        <div className="top-actions">
          <button className="button ghost" onClick={handleUndoFace} disabled={scannedCount === 0}>
            <span className="undo-icon" />
            Undo Face
          </button>
          <button className="button ghost" onClick={handleReset}>
            <span className="reset-icon" />
            Reset
          </button>
        </div>
      </header>

      <section className="scan-progress" aria-label="Face progress">
        {FACE_ORDER.map((face, index) => {
          const done = index < currentFace || status === "solved";
          const active = index === currentFace && status === "scanning";
          return (
            <div key={face} className={`face-step ${done ? "done" : ""} ${active ? "active" : ""}`}>
              <div className="face-token">{done ? "OK" : face}</div>
              <small>{FACE_SHORT_LABELS[face]}</small>
            </div>
          );
        })}
      </section>

      <section className="scan-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Step {Math.min(scannedCount + 1, 6)} of 6</p>
              <h1 className="panel-title">
                <ScanTitle status={status} currentFace={activeFace} />
              </h1>
            </div>
            <span className="status-pill live-pill">Live Preview</span>
          </div>

          {status === "scanning" && (
            <CubeScanner currentFaceIndex={currentFace} onCapture={handleFaceCaptured} />
          )}

          {status === "solving" && (
            <div className="solving-panel">
              <div>
                <div className="spinner" style={{ margin: "0 auto 18px" }} />
                <p className="eyebrow">Solver core</p>
                <p className="panel-copy">Computing a valid move sequence from the scanned state.</p>
              </div>
            </div>
          )}

          {status === "solved" && solution && (
            <CubeSolutionPlayer
              moves={solution.solution}
              moveCount={solution.move_count}
              cubeState={cubeState as CubeState}
              onReset={handleReset}
            />
          )}

          {status === "error" && (
            <div className="error-panel">
              <div>
                <p className="eyebrow" style={{ color: "var(--danger)" }}>Scan failed</p>
                <h2 className="panel-title">State could not be processed</h2>
                <p className="panel-copy" style={{ maxWidth: 420 }}>{errorMsg}</p>
                <button className="button danger" onClick={handleReset} style={{ marginTop: 18 }}>
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="side-stack">
          <div className="panel vivid-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Static view</p>
              <h2 className="panel-title">Cube net</h2>
            </div>
            <span className="status-pill">{activeFace}</span>
          </div>

          <CubeStateDisplay
            state={cubeState}
            currentFace={status === "scanning" ? activeFace : undefined}
          />
          </div>

          {status === "scanning" && (
            <div className="panel correction-lab">
              <div className="panel-header">
                <div>
                  <p className="eyebrow">Correction lab</p>
                  <h2 className="panel-title">Paint stickers</h2>
                </div>
                <div className="lab-header-actions">
                  <button className="button mini" onClick={handleLoadDemo}>
                    Load Demo
                  </button>
                  <button className="button mini primary" onClick={handleManualSolve}>
                    Solve
                  </button>
                </div>
              </div>

              <div className="face-tabs" aria-label="Choose face to edit">
                {FACE_ORDER.map((face) => (
                  <button
                    key={face}
                    className={editFace === face ? "active" : ""}
                    onClick={() => setEditFace(face)}
                    type="button"
                  >
                    {face}
                  </button>
                ))}
              </div>

              <div className="paint-row" aria-label="Paint color">
                {EDIT_COLORS.map((color) => (
                  <button
                    key={color}
                    className={paintColor === color ? "active" : ""}
                    onClick={() => setPaintColor(color)}
                    type="button"
                    title={COLOR_LABELS[color]}
                    style={{ background: COLOR_MAP[color] }}
                  />
                ))}
              </div>

              <div className="sticker-editor" aria-label={`${editFace} face sticker editor`}>
                {(cubeState[editFace] ?? (Array(9).fill("?") as CubeColor[])).map((color, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleStickerPaint(editFace, index)}
                    style={{ background: COLOR_MAP[color] }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="color-inventory" aria-label="Sticker color inventory">
                {colorCounts.map(({ color, count }) => (
                  <div key={color} className={count === 9 ? "balanced" : ""}>
                    <span style={{ background: COLOR_MAP[color] }} />
                    <strong>{count}</strong>
                  </div>
                ))}
              </div>

            </div>
          )}

          {status === "scanning" && (
            <div className="tips-band">
              <p className="eyebrow">Capture checks</p>
              <ul className="tip-list" style={{ marginTop: 14 }}>
                <li>Use balanced light across the visible face.</li>
                <li>Keep all nine stickers inside the reticle.</li>
                <li>Wait for the swatches to stabilize before capture.</li>
                <li>Use Correction Lab when one sticker is misread.</li>
              </ul>
              <div className="mini-cube-visual" aria-hidden="true" />
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
