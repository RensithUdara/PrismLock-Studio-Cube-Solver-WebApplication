"use client";

import { useMemo, useState } from "react";
import CubeStateDisplay from "@/components/CubeState";
import { type CubeState } from "@/lib/api";

interface Props {
  moves: string[];
  moveCount: number;
  cubeState: CubeState;
  onReset: () => void;
}

const MOVE_COLORS: Record<string, string> = {
  U: "#ffffff",
  D: "#ffcc4d",
  R: "#ff6f61",
  L: "#ff8a3d",
  F: "#35c46d",
  B: "#4f8cff",
};

function moveColor(move: string) {
  return MOVE_COLORS[move[0]] || "#9aa7b5";
}

export default function CubeSolutionPlayer({ moves, moveCount, cubeState, onReset }: Props) {
  const [activeStep, setActiveStep] = useState(0);
  const activeMove = moves[activeStep];
  const completed = activeStep >= moves.length - 1;

  const progress = useMemo(() => {
    if (!moves.length) return 0;
    return Math.round(((activeStep + 1) / moves.length) * 100);
  }, [activeStep, moves.length]);

  const copyMoves = () => {
    navigator.clipboard.writeText(moves.join(" "));
  };

  return (
    <div className="solution-card">
      <div className="solution-stage" style={{ padding: 20 }}>
        <div className="panel-header" style={{ marginBottom: 22 }}>
          <div>
            <p className="eyebrow">Solution path</p>
            <h2 className="panel-title">{moveCount} moves</h2>
          </div>
          <span className="status-pill">{progress}%</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(220px, auto)",
            gap: 20,
            alignItems: "center",
          }}
        >
          <div>
            <p className="panel-copy" style={{ marginBottom: 10 }}>Current move</p>
            <div
              style={{
                width: 132,
                height: 132,
                display: "grid",
                placeItems: "center",
                border: `1px solid ${moveColor(activeMove)}`,
                borderRadius: "var(--radius)",
                color: moveColor(activeMove),
                background: `${moveColor(activeMove)}18`,
                fontFamily: "JetBrains Mono, monospace",
                fontSize: "3.5rem",
                fontWeight: 700,
              }}
            >
              {activeMove}
            </div>
          </div>

          <CubeStateDisplay state={cubeState} />
        </div>
      </div>

      <div className="solution-controls">
        <button
          className="button ghost"
          onClick={() => setActiveStep((step) => Math.max(step - 1, 0))}
          disabled={activeStep === 0}
        >
          Previous
        </button>
        <button
          className="button primary"
          onClick={() => setActiveStep((step) => Math.min(step + 1, moves.length - 1))}
          disabled={completed}
          style={{ flex: 1 }}
        >
          Next Move
        </button>
      </div>

      <div className="panel">
        <div className="panel-header">
          <p className="eyebrow">Move sequence</p>
          <span className="status-pill">{activeStep + 1}/{moveCount}</span>
        </div>
        <div className="move-grid">
          {moves.map((move, index) => {
            const isActive = index === activeStep;
            const isPast = index < activeStep;
            const color = moveColor(move);
            return (
              <button
                key={`${move}-${index}`}
                className={`move-badge ${isActive ? "next" : ""}`}
                onClick={() => setActiveStep(index)}
                style={{
                  color: isActive ? color : isPast ? "var(--muted)" : "var(--text)",
                  borderColor: isActive ? color : "var(--line)",
                  opacity: isPast ? 0.62 : 1,
                }}
              >
                <span style={{ fontSize: "0.7rem" }}>{index + 1}</span>
                {move}
              </button>
            );
          })}
        </div>
      </div>

      <div className="action-row">
        <button className="button ghost" onClick={copyMoves}>
          Copy Moves
        </button>
        <button className="button primary" onClick={onReset}>
          New Scan
        </button>
      </div>
    </div>
  );
}
