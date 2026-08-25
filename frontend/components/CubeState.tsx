import { CubeState, CubeColor, COLOR_MAP } from "@/lib/api";

interface Props {
  state: Partial<CubeState>;
  currentFace?: string;
}

const EMPTY_FACE: CubeColor[] = Array(9).fill("?");
const NET_LAYOUT = [
  [null, "U", null, null],
  ["L", "F", "R", "B"],
  [null, "D", null, null],
];

export default function CubeStateDisplay({ state, currentFace }: Props) {
  return (
    <div className="cube-net" aria-label="Cube net preview">
      {NET_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="cube-net-row">
          {row.map((face, cellIndex) => {
            if (!face) {
              return <div key={cellIndex} className="net-spacer" />;
            }

            const colors = (state as CubeState)?.[face as keyof CubeState] ?? EMPTY_FACE;
            const isScanned = Boolean(state[face as keyof CubeState]);
            const isCurrent = face === currentFace;

            return (
              <div
                key={cellIndex}
                className={`net-face ${isScanned ? "scanned" : ""} ${isCurrent ? "current" : ""}`}
              >
                <span className="net-label">{face}</span>
                <div className="net-grid">
                  {colors.map((color, index) => (
                    <div
                      key={index}
                      className="net-cell"
                      style={{
                        backgroundColor: COLOR_MAP[color],
                        opacity: isScanned ? 1 : 0.24,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
