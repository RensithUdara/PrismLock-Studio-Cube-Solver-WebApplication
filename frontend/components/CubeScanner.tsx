"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { scanFace, CubeColor, COLOR_MAP } from "@/lib/api";

interface Props {
  currentFaceIndex: number;
  onCapture: (faceKey: string, colors: string[]) => void;
}

const FACE_KEYS = ["U", "R", "F", "D", "L", "B"];
const GRID_SIZE = 270;
const CELL_SIZE = GRID_SIZE / 3;

export default function CubeScanner({ currentFaceIndex, onCapture }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [preview, setPreview] = useState<CubeColor[]>(Array(9).fill("?"));
  const [capturing, setCapturing] = useState(false);
  const [camError, setCamError] = useState("");
  const [flash, setFlash] = useState(false);
  const displayPreview = camError ? (Array(9).fill("B") as CubeColor[]) : preview;

  useEffect(() => {
    let stream: MediaStream | undefined;

    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 } })
      .then((nextStream) => {
        stream = nextStream;
        if (videoRef.current) {
          videoRef.current.srcObject = nextStream;
        }
      })
      .catch(() => setCamError("Camera permission is required for live scanning."));

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const captureFrame = useCallback(async (): Promise<CubeColor[] | null> => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    canvas.getContext("2d")?.drawImage(video, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(null);
          return;
        }

        try {
          const colors = await scanFace(blob);
          resolve(colors);
        } catch {
          resolve(Array(9).fill("W") as CubeColor[]);
        }
      }, "image/jpeg", 0.85);
    });
  }, []);

  useEffect(() => {
    const interval = window.setInterval(async () => {
      const colors = await captureFrame();
      if (colors) setPreview(colors);
    }, 400);

    return () => window.clearInterval(interval);
  }, [captureFrame]);

  const handleCapture = useCallback(async () => {
    if (capturing) return;

    setCapturing(true);
    setFlash(true);
    window.setTimeout(() => setFlash(false), 180);

    const colors = await captureFrame();
    if (colors) {
      onCapture(FACE_KEYS[currentFaceIndex], colors);
    }

    setCapturing(false);
  }, [capturing, captureFrame, currentFaceIndex, onCapture]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        event.preventDefault();
        handleCapture();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleCapture]);

  return (
    <div className="scanner-stack">
      <div className="camera-frame">
        {camError ? (
          <div className="mock-video" aria-hidden="true" />
        ) : (
          <video ref={videoRef} autoPlay playsInline muted />
        )}

        {flash && <div className="capture-flash" />}

        <div className="scan-reticle">
          {displayPreview.map((color, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            return (
              <div
                key={index}
                className="reticle-cell"
                style={{
                  left: col * CELL_SIZE,
                  top: row * CELL_SIZE,
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  background: color !== "?" ? `${COLOR_MAP[color]}55` : "rgba(255,255,255,0.05)",
                }}
              />
            );
          })}
          <span className="corner tl" />
          <span className="corner tr" />
          <span className="corner bl" />
          <span className="corner br" />
        </div>

        <div className="scanline" />
        <div className="video-label">
          FACE {currentFaceIndex + 1}/6 | {FACE_KEYS[currentFaceIndex]}
        </div>
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="swatch-row">
        <span>Live color map</span>
        <div className="swatches" aria-label="Live detected colors">
          {displayPreview.map((color, index) => (
            <div
              key={index}
              className="swatch"
              style={{ background: COLOR_MAP[color] }}
            />
          ))}
        </div>
      </div>

      <button className="button primary" onClick={handleCapture} disabled={capturing}>
        <span className="scan-icon" />
        {capturing ? "Capturing" : "Capture Face"}
      </button>

    </div>
  );
}
