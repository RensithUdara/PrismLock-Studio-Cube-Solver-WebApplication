<div align="center">

# 🧊✨ PrismLock Studio

### Camera-guided Rubik's Cube scanning, correction, validation, and solving workspace

<p>
  <strong>Scan faces</strong> · <strong>Correct stickers</strong> · <strong>Validate state</strong> · <strong>Play solution moves</strong>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Frontend-Next.js-111827?style=for-the-badge&logo=nextdotjs">
  <img alt="FastAPI" src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi">
  <img alt="Python" src="https://img.shields.io/badge/Solver-Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img alt="Three.js" src="https://img.shields.io/badge/3D-Three.js-000000?style=for-the-badge&logo=threedotjs">
</p>

</div>

---

## 🌟 Overview

**PrismLock Studio** is a modern Rubik's Cube solver app with a colorful scanner cockpit UI. It helps users capture each cube face with a webcam, correct misread stickers manually, validate the full 54-sticker cube state, and run a move-by-move solution workflow.

The project is split into:

- 🎨 **Frontend:** Next.js app with a neon space-themed interface and interactive 3D cube preview.
- 🧪 **Scanner API:** FastAPI endpoint that samples cube sticker colors from uploaded frames.
- 🧠 **Solver:** Python cube-state validation and IDA* search logic.
- 🧩 **Correction tools:** Face tabs, sticker painting, cube net preview, readiness checks, and demo loading.

---

## 🖼️ Preview

The current design uses the custom galaxy background and PrismLock cockpit layout.

| Home | Scanner |
| --- | --- |
| `frontend/home-expanded-check.png` | Open `/scan` in the running app |

> The home page screenshot is generated during UI checks and may be refreshed as the design changes.

---

## ✨ Key Features

### 🛰️ Modern Home Cockpit

- Large PrismLock Studio hero section
- Animated 3D cube preview
- Glassmorphism app bar
- Scanner CTA buttons
- Workflow feature sections
- Practice scramble pad
- Capture readiness checklist
- Studio telemetry strip

### 📷 Camera-Guided Scanning

- Six-face scan flow: `U R F D L B`
- Centered 3x3 reticle
- Live color swatch capture
- Static cube net preview
- Face progress indicator
- Demo loading for testing without a camera

### 🎨 Correction Lab

- Manual sticker painting
- Face selection tabs
- Color palette controls
- Sticker inventory counts
- Undo/reset actions
- Pre-solve validation support

### 🧠 Solver Workflow

- Converts frontend cube colors into internal solver state
- Validates all six colors have exactly nine stickers
- Runs an IDA* search strategy
- Returns solution moves, move count, node count, iterations, and timing stats
- Supports move playback in the UI

---

## 🧱 Tech Stack

### Frontend

- ⚛️ React 19
- ▲ Next.js 16
- 🎨 Tailwind CSS / custom CSS
- 🧊 Three.js
- 🎮 React Three Fiber
- 🎞️ Framer Motion
- 🧭 Zustand

### Backend

- 🐍 Python
- ⚡ FastAPI
- 🖼️ OpenCV
- 🔢 NumPy
- 🧠 Custom solver logic
- 🧩 Kociemba dependency available in requirements

---

## 📁 Project Structure

```text
Dynamic-Rubik-s-Cube-Solver-main/
├── backend/
│   ├── main.py              # FastAPI app and API routes
│   ├── scanner.py           # Image grid sampling logic
│   ├── solver.py            # Cube model, validation, IDA* solver
│   ├── util.py              # HSV color classification helpers
│   ├── test_moves.py        # Move logic tests / checks
│   └── requirements.txt     # Python dependencies
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Home page / PrismLock landing cockpit
│   │   ├── scan/page.tsx    # Scanner workspace
│   │   ├── globals.css      # Main visual system
│   │   └── layout.tsx       # App metadata and layout
│   ├── components/
│   │   ├── AnimatedCube3D.tsx
│   │   ├── CubeScanner.tsx
│   │   ├── CubeSolutionPlayer.tsx
│   │   ├── CubeState.tsx
│   │   └── FacePreview.tsx
│   ├── lib/api.ts           # Frontend API client
│   ├── public/background.png
│   └── package.json
│
├── package.json             # Root JS dependencies
└── README.md
```

---

## 🚀 Getting Started

### ✅ Prerequisites

Install these first:

- 🟢 **Node.js** 20+
- 🐍 **Python** 3.10+
- 📦 **npm**
- 🎥 A webcam for live scanning

---

## ⚙️ Backend Setup

Open a terminal from the project root:

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```bash
# Windows PowerShell
.venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the API:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Backend should be available at:

```text
http://127.0.0.1:8000
```

Health response:

```json
{
  "status": "CubeSolver API running"
}
```

---

## 🎨 Frontend Setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend should be available at:

```text
http://localhost:3000
```

Scanner page:

```text
http://localhost:3000/scan
```

---

## 🔌 Environment Variables

The frontend API client uses this default:

```text
http://localhost:8000
```

To override it, create:

```text
frontend/.env.local
```

Then add:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Restart the frontend dev server after changing environment variables.

---

## 🧪 Useful Commands

### Frontend

```bash
cd frontend
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Run production build
npm run lint     # Run ESLint
```

### Backend

```bash
cd backend
uvicorn main:app --reload --host 127.0.0.1 --port 8000
python test_moves.py
```

---

## 🌐 API Reference

### `GET /`

Health check.

**Response**

```json
{
  "status": "CubeSolver API running"
}
```

### `POST /scan-face`

Samples nine sticker colors from the center 3x3 grid of an uploaded frame.

**Body**

```text
multipart/form-data
file: image frame
```

**Response**

```json
{
  "colors": ["W", "W", "B", "G", "R", "Y", "O", "B", "G"]
}
```

### `POST /solve`

Solves a full cube state.

**Body**

```json
{
  "state": {
    "U": ["W", "W", "W", "W", "W", "W", "W", "W", "W"],
    "R": ["R", "R", "R", "R", "R", "R", "R", "R", "R"],
    "F": ["G", "G", "G", "G", "G", "G", "G", "G", "G"],
    "D": ["Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y", "Y"],
    "L": ["O", "O", "O", "O", "O", "O", "O", "O", "O"],
    "B": ["B", "B", "B", "B", "B", "B", "B", "B", "B"]
  }
}
```

**Success Response**

```json
{
  "success": true,
  "solution": ["R", "U", "R'", "U'"],
  "move_count": 4,
  "stats": {
    "iterations": 2,
    "nodes": 1200,
    "time_sec": 0.42
  }
}
```

**Error Response**

```json
{
  "success": false,
  "error": "Invalid scan: color for face 'U' appears 8 times (expected 9)."
}
```

---

## 🧊 Cube State Model

The app uses this face order:

```text
U R F D L B
```

Each face contains nine stickers:

```text
0 1 2
3 4 5
6 7 8
```

Color symbols:

| Symbol | Color |
| --- | --- |
| `W` | White |
| `Y` | Yellow |
| `R` | Red |
| `O` | Orange |
| `B` | Blue |
| `G` | Green |
| `?` | Unknown / unclassified |

---

## 🧭 User Workflow

1. 🏁 Open `http://localhost:3000`.
2. 📷 Click **Open Scanner**.
3. 🧊 Scan faces in order: `U R F D L B`.
4. 🎨 Use Correction Lab if any sticker color is wrong.
5. ✅ Check that all six colors appear exactly nine times.
6. ⚡ Run the solver.
7. 🎮 Play through the solution moves step by step.

---

## 🎯 Design Notes

PrismLock Studio uses a futuristic cube-lab interface:

- 🌌 Galaxy background image: `frontend/public/background.png`
- 🟪 Violet/magenta action buttons
- 🧊 Glass panels and neon borders
- 🎛️ Scanner cockpit layout
- 🧩 3D cube hero preview
- 📱 Responsive mobile layout

---

## 🧯 Troubleshooting

### Frontend cannot reach backend

Check that the backend is running:

```bash
curl http://127.0.0.1:8000
```

If needed, set:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Camera does not open

- Use `http://localhost:3000`, not a random local file path.
- Allow camera permission in the browser.
- Close other apps that may be using the webcam.
- Try the demo loading tools if you only want to test the UI.

### Scans produce wrong colors

- Use balanced light.
- Avoid glare on stickers.
- Keep all nine stickers inside the reticle.
- Repaint incorrect stickers in Correction Lab before solving.

### Build warning about multiple lockfiles

Next.js may warn that it found both root and frontend lockfiles. The app can still build successfully. If desired, configure `turbopack.root` in `frontend/next.config.ts` or clean up unused lockfiles.

---

## 🛣️ Roadmap Ideas

- 🧠 Add Kociemba-first solving mode
- 📸 Improve automatic color calibration
- 💾 Save previous cube sessions
- 🧪 Add backend unit test runner config
- 📱 Improve mobile scanner ergonomics
- 🌗 Add theme presets
- 🧾 Export solution algorithms as text

---

## 🤝 Contributing

Contributions are welcome. A good contribution should:

- Keep UI styling consistent with the PrismLock design system.
- Validate scanner and solver changes carefully.
- Run frontend lint/build before submitting.
- Avoid unrelated refactors in the same change.

Recommended checks:

```bash
cd frontend
npm run lint
npm run build
```

---

## 📜 License

No license file is currently included in this repository. Add one before publishing or distributing the project publicly.

---

<div align="center">

### 🧊 PrismLock Studio

**A colorful cube-solving cockpit for real-world scans.**

</div>
