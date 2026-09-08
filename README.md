# 🎨 Blu-BGS Overlay App & Dashboard

> **A customizable neon-powered overlay control center for streamers, creators, and visual-content projects.**

**Blu-BGS Overlay App & Dashboard** is a customizable dashboard and overlay-management application designed to make it easy to create, configure, preview, and control visually rich streaming overlays.

The project focuses on a **premium neon / cyber-interface aesthetic**, while keeping the underlying system modular enough to support different overlay styles, animations, widgets, visualizers, and OBS browser sources.

---

## ✨ Overview

Blu-BGS is intended to provide a centralized control panel for managing streaming overlays without having to manually edit individual HTML/CSS/JavaScript files every time a visual element needs to change.

The dashboard can serve as the central control interface for:

- 🎛️ Overlay configuration
- 🌈 Neon border systems
- 🎨 Theme and color controls
- 🔊 Audio-reactive visualizers
- 🎵 Now Playing information
- 🖼️ Backgrounds and artwork
- ✨ Animated effects
- 📐 Overlay sizing and positioning
- 🔗 OBS Browser Sources
- 💾 Saved configurations
- 🧩 Modular widgets
- ⚡ Real-time preview
- 🖥️ Desktop/local overlay services

---

# 🚀 Core Concept

Blu-BGS separates the project into two primary experiences:

```text
┌──────────────────────────────────────────────┐
│              BLU-BGS DASHBOARD               │
│                                              │
│  Configure • Preview • Customize • Control   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│               OVERLAY ENGINE                 │
│                                              │
│  Widgets • Borders • Visualizers • Effects   │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                    OBS                       │
│                                              │
│              Browser Source                 │
└──────────────────────────────────────────────┘
```

The dashboard acts as the **control center**, while the overlay is the **visual output**.

---

# 🎨 Design System

Blu-BGS uses a highly customizable visual system built around:

- Neon lighting
- Cyber interfaces
- Dark backgrounds
- Glassmorphism
- Metallic accents
- Glow effects
- Animated borders
- RGB / rainbow effects
- Reactive lighting
- High-contrast typography
- Futuristic HUD elements

The visual system is designed so that the **same underlying overlay engine can support multiple themes**.

---

# 💡 Neon Border Library

Blu-BGS supports a modular border system designed for overlay widgets and OBS sources.

### 01 — Classic Neon Tube

A continuous rounded neon tube with:

- Bright internal core
- Soft outer glow
- Adjustable intensity
- Adjustable thickness
- Rounded corners

### 02 — Double-Line Neon

Two parallel glowing lines.

Features:

- Inner bright line
- Outer glow
- Independent line spacing
- Adjustable intensity

### 03 — Broken Neon Border

A neon border containing intentional gaps and segments.

Useful for:

- HUDs
- Cyber interfaces
- Sci-fi layouts
- Minimal overlays

### 04 — Corner-Bracket Neon

Only the corners are illuminated.

Useful for:

- Minimal layouts
- Camera frames
- Gaming HUDs
- Futuristic dashboards

### 05 — Circuit-Traced Border

A circuit-board-inspired border containing:

- Branching paths
- Nodes
- Electronic traces
- Animated signal movement
- Pulsing connection points

---

# 🌈 Color System

The overlay engine should support dynamic color configuration.

Example presets:

| Theme | Primary | Secondary |
|---|---|---|
| Cyber Blue | Electric Blue | Cyan |
| Ultraviolet | Purple | Magenta |
| Plasma | Cyan | Hot Pink |
| Rainbow | RGB | Spectrum |
| Toxic | Lime | Green |
| Fire | Orange | Red |
| Ice | White | Blue |
| Chrome | Silver | White |

Users should be able to customize:

- Primary color
- Secondary color
- Accent color
- Glow color
- Background color
- Border color
- Text color
- Visualizer color

---

# 🔊 Audio Reactive System

Blu-BGS can be used with audio-reactive visual elements.

Possible reactive properties include:

```text
Audio Input
    │
    ├── Bass
    ├── Mid
    ├── Treble
    ├── Volume
    └── Beat Detection
          │
          ▼
     Visual Engine
          │
     ┌────┼─────┐
     ▼    ▼     ▼
   Glow  Border  Visualizer
```

Audio can control:

- Border brightness
- Glow intensity
- Particle movement
- Spectrum visualizers
- Pulse animations
- Background effects
- RGB cycling
- Logo effects
- Widget animations

---

# 🎵 Now Playing

The dashboard can be used to control a customizable **Now Playing** overlay.

Potential information:

- Song title
- Artist
- Album
- Album artwork
- Progress
- Duration
- Playback status
- Audio visualization

Example:

```text
┌──────────────────────────────────────────────┐
│  ◉ NOW PLAYING                               │
│                                              │
│  [ ALBUM ]   SONG TITLE                     │
│              ARTIST NAME                    │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━○──────             │
│  02:14                         04:32         │
└──────────────────────────────────────────────┘
```

---

# 🧩 Widget Architecture

Widgets should be designed as independent modules.

Example:

```text
widgets/
├── now-playing/
├── audio-visualizer/
├── clock/
├── social/
├── logo/
├── chat/
├── alerts/
├── progress/
└── custom/
```

Each widget can have its own:

- HTML
- CSS
- JavaScript
- Configuration
- Animation system
- Data source
- Theme settings

This makes it possible to add new widgets without redesigning the entire application.

---

# 🎛️ Dashboard

The dashboard is intended to provide centralized control over the overlay system.

Possible dashboard sections:

### Dashboard

General system overview.

```text
┌─────────────────────────────────────────┐
│ BLU-BGS                                 │
│ OVERLAY CONTROL CENTER                  │
├─────────────────────────────────────────┤
│                                         │
│  OVERLAY STATUS     ● ONLINE            │
│                                         │
│  AUDIO               ████████░░          │
│  FPS                 60                  │
│  CONNECTION          CONNECTED           │
│                                         │
└─────────────────────────────────────────┘
```

### Overlay Editor

Configure:

- Position
- Size
- Scale
- Opacity
- Visibility
- Borders
- Effects
- Animation

### Theme Editor

Configure:

- Colors
- Typography
- Glow
- Background
- Shadows
- Transparency

### Animation Editor

Configure:

- Entrance animation
- Exit animation
- Idle animation
- Pulse
- Glow
- Flicker
- Rainbow cycle
- Audio reaction

---

# ⚙️ Configuration

A typical configuration can be represented as:

```json
{
  "overlay": {
    "enabled": true,
    "theme": "cyber-neon",
    "border": "classic-neon",
    "opacity": 1,
    "scale": 1
  },
  "colors": {
    "primary": "#00E5FF",
    "secondary": "#7A00FF",
    "accent": "#FF00AA"
  },
  "effects": {
    "glow": true,
    "particles": true,
    "animation": true
  },
  "audio": {
    "enabled": true,
    "sensitivity": 0.75
  }
}
```

> The actual configuration format should match the implementation used by the application.

---

# 🖥️ OBS Integration

Blu-BGS is designed to work with **OBS Browser Sources**.

Typical workflow:

```text
Blu-BGS Dashboard
        │
        ▼
Configure Overlay
        │
        ▼
Start Overlay Server
        │
        ▼
Copy Overlay URL
        │
        ▼
OBS Browser Source
        │
        ▼
       LIVE
```

### Example OBS configuration

Recommended starting values:

```text
Width:       1920
Height:      1080
FPS:         60
Shutdown URL: Disabled
Refresh:     Enabled when scene becomes active
```

Adjust these values according to the specific overlay.

---

# 🌐 Local Overlay Server

For local development, Blu-BGS can operate as a local web application.

Example architecture:

```text
Browser
   │
   ▼
Dashboard
   │
   ├───────────────┐
   │               │
   ▼               ▼
API / WebSocket   Overlay Server
                       │
                       ▼
                  OBS Browser
```

The server can provide:

- Overlay pages
- Configuration data
- WebSocket communication
- Real-time updates
- Metadata
- Audio information
- Dashboard synchronization

---

# 🔌 Real-Time Communication

Where supported, WebSockets can be used to synchronize the dashboard and overlays.

Example:

```text
Dashboard
    │
    │ WebSocket
    ▼
Overlay Server
    │
    │ WebSocket
    ▼
OBS Overlay
```

This allows changes made in the dashboard to appear immediately in OBS without manually refreshing the browser source.

---

# 📁 Suggested Project Structure

A recommended structure for the project is:

```text
Blu-Bgs-Overlay-app-dashboard/
│
├── app/
│   ├── dashboard/
│   ├── overlays/
│   ├── widgets/
│   └── components/
│
├── assets/
│   ├── fonts/
│   ├── images/
│   ├── icons/
│   └── backgrounds/
│
├── config/
│   ├── themes/
│   ├── overlays/
│   └── widgets/
│
├── server/
│   ├── api/
│   ├── websocket/
│   └── services/
│
├── public/
│
├── scripts/
│
├── README.md
├── LICENSE
└── package.json
```

> Update this section if the actual repository uses a different structure.

---

# 🛠️ Installation

## Requirements

Depending on the implementation, Blu-BGS may require:

- Windows 10/11
- Node.js
- npm / pnpm / yarn
- Git
- OBS Studio
- A modern Chromium-based browser

---

## Clone the Repository

```bash
git clone https://github.com/UrkelTech-Incorp/Blu-Bgs-Overlay-app-dashboard.git
```

Enter the project:

```bash
cd Blu-Bgs-Overlay-app-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development environment:

```bash
npm run dev
```

> If the repository uses a different package manager or start command, replace these commands with the project's actual scripts.

---

# 🧪 Development

Run the development server:

```bash
npm run dev
```

Build the project:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run tests:

```bash
npm test
```

> Commands should be synchronized with the scripts defined in `package.json`.

---

# 🎨 Customization

Blu-BGS is intended to be heavily customizable.

Developers can customize:

### Colors

```css
--bgs-primary:
--bgs-secondary:
--bgs-accent:
--bgs-glow:
--bgs-background:
```

### Neon Effects

```css
--neon-intensity:
--neon-blur:
--neon-thickness:
--neon-opacity:
```

### Animation

```css
--animation-speed:
--pulse-speed:
--flicker-speed:
```

---

# 🧱 Neon Border Modes

Recommended border mode identifiers:

```text
classic
double
broken
corner
circuit
pulse
rainbow
chrome
```

This allows the dashboard to switch border systems without changing the underlying widget.

---

# ✨ Animation Modes

Suggested animation modes:

```text
none
fade
slide
scale
pulse
flicker
glow
scan
energy
rainbow
audio-reactive
```

---

# 🌈 Rainbow Modes

The color system can support multiple rainbow behaviors.

### Rainbow Cycle

Colors continuously rotate around the spectrum.

### Rainbow Pulse

The entire border pulses through the spectrum.

### Rainbow Flow

Color travels around the border.

### Audio Rainbow

Audio intensity controls the speed and brightness of the rainbow.

### Static Rainbow

Each section of the border receives a fixed spectrum color.

---

# 🔐 Environment Variables

If the application requires environment variables, create:

```text
.env
```

Example:

```env
PORT=3000
HOST=127.0.0.1
NODE_ENV=development
```

Do **not** commit secrets to Git.

Add environment files to `.gitignore`:

```gitignore
.env
.env.local
.env.*.local
```

---

# 🐛 Troubleshooting

## Port Already in Use

If the application reports:

```text
EADDRINUSE
```

another process may already be using the configured port.

Windows:

```powershell
netstat -ano | findstr :PORT
```

Then identify the process:

```powershell
tasklist | findstr PID
```

Terminate it if appropriate:

```powershell
taskkill /PID PID /F
```

Replace `PORT` and `PID` with the appropriate values.

---

## OBS Overlay Is Blank

Check:

1. The overlay server is running.
2. The URL is correct.
3. The browser can open the URL directly.
4. The OBS Browser Source has the correct dimensions.
5. JavaScript errors are not preventing the overlay from loading.
6. Required API/WebSocket services are running.

---

## Dashboard Changes Aren't Updating

Check:

```text
Dashboard
   ↓
API/WebSocket
   ↓
Overlay
```

If the overlay doesn't update, inspect:

- WebSocket connection
- Browser console
- Server logs
- API endpoint
- Configuration state

---

# 🧪 Recommended Development Workflow

```text
1. Start development server
        ↓
2. Open Blu-BGS Dashboard
        ↓
3. Configure overlay
        ↓
4. Open overlay URL
        ↓
5. Add overlay to OBS
        ↓
6. Test animations
        ↓
7. Test audio reactivity
        ↓
8. Test resolution/scaling
        ↓
9. Build production version
        ↓
10. Create release
```

---

# 🚀 Roadmap

Potential future features:

- [ ] Complete overlay editor
- [ ] Drag-and-drop widget positioning
- [ ] Real-time preview
- [ ] Neon border library
- [ ] Advanced color editor
- [ ] Gradient editor
- [ ] Animation presets
- [ ] Audio-reactive engine
- [ ] Now Playing integration
- [ ] OBS integration
- [ ] WebSocket synchronization
- [ ] Saved overlay profiles
- [ ] Import/export configurations
- [ ] Preset library
- [ ] Custom font manager
- [ ] Background manager
- [ ] Particle effects
- [ ] GPU-accelerated effects
- [ ] Multi-overlay support
- [ ] Mobile dashboard
- [ ] Remote dashboard
- [ ] Plugin system
- [ ] Theme marketplace

---

# 🤝 Contributing

Contributions are welcome.

### 1. Fork the repository

```bash
git fork
```

### 2. Create a feature branch

```bash
git checkout -b feature/my-new-feature
```

### 3. Make your changes

Test the dashboard and overlay before submitting.

### 4. Commit

```bash
git commit -m "Add new overlay feature"
```

### 5. Push

```bash
git push origin feature/my-new-feature
```

### 6. Open a Pull Request

Please include:

- What changed
- Why it changed
- Screenshots/video when applicable
- Testing performed
- Any known limitations

---

# 📜 License

This project is maintained by **UrkelTech-Incorp**.

Add the project's official license here once the repository license has been finalized.

Example:

```text
Copyright © 2026 UrkelTech-Incorp
```

---

# 👤 Project

**Blu-BGS Overlay App & Dashboard**

Developed by:

**UrkelTech-Incorp**

Repository:

`https://github.com/UrkelTech-Incorp/Blu-Bgs-Overlay-app-dashboard`

---

# 💙 Blu-BGS

**Build the overlay.  
Control the visuals.  
Own the stream.**

> A dashboard built around the idea that your OBS overlays shouldn't just display information — they should become part of the visual identity of your stream.
