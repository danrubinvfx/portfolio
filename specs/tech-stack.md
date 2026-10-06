# Technical Architecture & Stack Specification: Dan Rubin VFX Portfolio

**Version:** 1.0.0  
**Status:** DRAFT (Under Review)  
**Date:** October 2, 2026  
**Methodology:** Spec-Driven Development (SDD)  

---

## 1. Architecture Overview & Core Philosophy

The Dan Rubin VFX Portfolio is designed as a **zero-bloat, ultra-high-performance static web application**. It deliberately eschews complex frontend frameworks (such as React, Vue, Next.js, or complex bundlers) in favor of modern, standards-compliant web technologies.

```
┌─────────────────────────────────────────────────────────────┐
│                       Browser / View                        │
│   ┌─────────────────────────────────────────────────────┐   │
│   │ index.html (Semantic HTML5 Outline & ARIA Landmarks) │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│   ┌──────────────────────────┴──────────────────────────┐   │
│   │ styles.css (Light Minimalist Tokens & Arial Bold)   │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│   ┌──────────────────────────┴──────────────────────────┐   │
│   │ script.js (Controller, Video Switcher, Lightbox)    │   │
│   └──────────────────────────┬──────────────────────────┘   │
│                              │                              │
│   ┌──────────────────────────┴──────────────────────────┐   │
│   │ data.js (Centralized Structured Store: PORTFOLIO_DATA)  │
│   └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Key Principles
1. **Zero Runtime Dependencies:** Pure HTML5, Vanilla CSS, and Vanilla ES6 JavaScript. No framework overhead or vulnerability footprint.
2. **Instant Offline Portability:** 100% functional via local `file://` execution or any lightweight static web server (`python -m http.server`, GitHub Pages, Vercel, Netlify).
3. **Decoupled Data Architecture:** All text, credits, links, and media paths reside in a single centralized store (`data.js`), ensuring complete separation of concerns between content and presentation.
4. **Performance by Default:** Zero Flash of Invisible Text (FOIT), zero Total Blocking Time (TBT), and instant video streaming via faststart-muxed MP4s.

---

## 2. Technology Stack & Component Breakdown

| Layer | Technology | Rationale & Configuration |
| :--- | :--- | :--- |
| **Markup** | HTML5 Semantic Living Standard | Clean landmark structure (`<nav>`, `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`). Full WCAG 2.1 AA accessibility with `aria-*` roles. |
| **Styling** | Vanilla CSS3 Custom Properties | Lightweight design token system supporting the Image Engine light aesthetic. Native CSS Grid, Flexbox, and `clamp()` responsive typography. |
| **Typography** | Native Arial Bold / System Grotesk Stack | `font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;` provides instantaneous rendering, 0ms network latency, zero font-loading shifts (CLS: 0), and clean studio branding. |
| **Icons** | Lucide Icons (Inline / Vanilla) | Minimalist SVG vector icons for UI actions (play, download, close, external links). |
| **Data Layer** | Centralized JavaScript Store (`data.js`) | Single global object `PORTFOLIO_DATA` holding all portfolio information, verified media paths, and unaugmented resume text. |
| **Video Engine** | Native HTML5 `<video>` | Faststart-muxed H.264 MP4 playback with hardware acceleration, responsive aspect ratio boxes, and playback state management. |
| **Image Engine** | Native Responsive Images & Lightbox | Lossless/near-lossless PNG/JPEG stills with `loading="lazy"`, object-fit containment, and non-blocking Lightbox viewer. |

---

## 3. Design Token Architecture (Tier-1 Studio Benchmark: Image Engine, Digital Domain, Wētā FX, Eyeline)

The design system synthesizes the design tokens of the premier VFX facilities:
- **Image Engine:** Pure white `#ffffff` canvas, light surface cards `#f8f9fa`, expansive negative space.
- **Digital Domain:** Precision ruby/crimson accent (`--accent-crimson: #b91c1c;`) for active status indicators and key breakdown alerts.
- **Wētā FX:** Architectural grotesque typography stack (`"Avenir Next", Arial, "Helvetica Neue", sans-serif`), uppercase wide-tracked metadata (`letter-spacing: 0.12em`), and deep cinema letterbox frames (`#0c0e12`).
- **Eyeline Studios:** Virtual production tech badges, monospace data readouts (`--font-mono: "Space Mono", monospace`), and sleek floating pill controls.

```css
:root {
  /* Canvas & Backgrounds (Image Engine White Canvas) */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #f1f3f5;
  --bg-surface: #ffffff;
  --bg-cinema: #0c0e12;         /* Wētā FX Deep Cinema Matte */
  --bg-backdrop: rgba(12, 14, 18, 0.94);

  /* Typography Colors */
  --text-main: #111827;         /* Deep jet black */
  --text-secondary: #374151;    /* Dark slate */
  --text-muted: #6b7280;        /* Mid gray */
  --text-light: #9ca3af;
  --text-inverse: #ffffff;

  /* Structural & Border Lines */
  --border-light: #e5e7eb;
  --border-medium: #d1d5db;
  --border-dark: #111827;

  /* Studio Accent Palette */
  --accent-primary: #111827;     /* High-impact black */
  --accent-hover: #1f2937;
  --accent-crimson: #b91c1c;     /* Digital Domain Precision Ruby */
  --accent-crimson-bg: rgba(185, 28, 28, 0.08);
  --accent-crimson-border: rgba(185, 28, 28, 0.3);
  --accent-gold: #c59b27;        /* Emmy Award & Recognition Gold */
  --accent-tech: #0284c7;        /* Eyeline Tech / Pipeline Blue */

  /* Typography Stack (0ms FOIT, Wētā FX & Image Engine Scale) */
  --font-heading: "Avenir Next", Arial, "Helvetica Neue", Helvetica, sans-serif;
  --font-body: "Avenir Next", Arial, "Helvetica Neue", Helvetica, sans-serif;
  --font-mono: "Space Mono", "SFMono-Regular", Consolas, monospace;

  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Layout Constraints */
  --max-width: 1360px;
  --header-height: 72px;
}
```

---

## 4. Media & Video Engineering Pipeline

### 4.1 Video Specification
All videos must strictly comply with the following encoding parameters to guarantee instant, cross-browser compatibility:

- **Format:** MP4 container
- **Video Codec:** H.264 / AVC (High Profile, Level 4.1 or Main Profile)
- **Pixel Format:** `yuv420p` (8-bit standard color space, strictly no 10-bit HEVC or ProRes in browser pipeline)
- **Audio Codec:** AAC stereo, 48kHz, 160–192 kbps
- **Container Flag:** `movflags +faststart` (MOOV atom placed at the head of the file for instant pseudo-streaming without buffering the entire file)

### 4.2 Verified Media Matrix
| Video Identifier | Filename | Scope | Status |
| :--- | :--- | :--- | :--- |
| `reel-2026` | `videos/2026CompositingReel.mp4` | 2026 Artist Compositing Reel | Verified 1080p H.264 Faststart |
| `trailer-contra` | `videos/ContraElHuracan_Trailer.mp4` | Contra el Huracán (Netflix Trailer) | Verified 1080p H.264 Faststart |
| `breakdown-lift` | `videos/LIFTBreakdown.mp4` | Lift (Supervisory Breakdown) | Verified 1080p H.264 Faststart |
| `breakdown-kraven`| `videos/Kraven_Breakdown.mp4` | Kraven the Hunter (Breakdown) | Verified 1080p H.264 Faststart |
| `breakdown-aud` | `videos/AUD_Reel.mp4` | American Underdog (Python Crowd Tool) | Verified 1080p H.264 Faststart |
| `breakdown-ps3` | `videos/PS3-laserEffects.mp4` | The Princess Switch 3 (Laser VFX) | Verified 1080p H.264 Faststart |

### 4.3 Production Credits & Stills Schema
Every credit card in the visual filmography is driven by the centralized data model:

```typescript
interface ProjectCredit {
  id: string;             // Unique identifier (e.g., 'proj-spiderverse')
  title: string;          // Official theatrical or episodic title (e.g., 'Spider-Man: Into the Spider-Verse')
  year: string;           // Release year (e.g., '2018')
  role: string;           // EXACT credited role (e.g., 'Lead Compositor', 'Compositing Supervisor')
  studio: string;         // Production VFX studio (e.g., 'Sony Pictures Imageworks')
  client?: string;        // Studio client/distributor (e.g., 'Sony Pictures / Marvel')
  category: 'Feature Film' | 'Supervised Shows' | 'Episodic' | 'Deep';
  image: string;          // Verified local production still (e.g., 'images/stills/IntoTheSpiderverse_01.png')
  aspectRatio: string;    // '16:9' or '2.39:1'
  highlights?: string[];  // Sequence look-dev, award recognition, or technical innovations
  videoFile?: string;     // Optional local breakdown or trailer MP4
}
```

**Card Presentation Standards (Image Engine Benchmark):**
- Crisp white card frame with 1px border (`#e5e7eb`) and subtle hover elevation.
- 16:9 or 2.39:1 cinematic still with smooth zoom on hover and click-to-expand Lightbox trigger.
- Bold project title (`font-family: Arial; font-weight: 700; font-size: 18px; color: #111827;`).
- High-contrast credited role pill (`Compositing Supervisor`, `Lead Compositor`, `Senior Compositor`).
- Studio, client, and release year metadata line (`Sony Pictures Imageworks • 2018`).

### 4.4 Gamified Interaction Mechanics & State Management
1. **Reaction Engine:**
   - Reactions per still stored in `localStorage` under `dan_portfolio_reactions`.
   - Data structure: `{ [stillId]: { heart: number, fire: number, clap: number, cinema: number, userVoted: string[] } }`.
   - Micro-interaction: Pure CSS spring pop animation (`scale(1.3) -> scale(1.0)`) on click with zero delay.
2. **Button Bounce Physics:**
   - CSS timing function: `transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease`.
   - `:hover`: `transform: translateY(-2px);`
   - `:active`: `transform: scale(0.96) translateY(0);`
3. **Swipe Gesture Handler:**
   - Vanilla JS touch listener attached to carousel viewports and Lightbox.
   - Computes delta: `diffX = touchEndX - touchStartX`. If `Math.abs(diffX) > 45px`, triggers next/prev slide navigation.
   - Desktop drag-to-scroll enabled via `mousedown`, `mousemove`, `mouseup` with inertia smoothing.
4. **Click-to-Reveal Contribution Engine:**
   - Stills contain an interactive flip/detail drawer toggled via click or Enter key.
   - Accessible ARIA states (`aria-expanded="false|true"`, `aria-label="View Dan's contribution to [Film]"`).
   - Smooth GPU-accelerated CSS transition (`opacity: 1; transform: translateY(0);`).
5. **High-Frequency Stills Mosaic Architecture:**
   - 16-frame dense mosaic layout (4 columns on desktop, 3 on tablet, 2 on mobile).
   - Stills display borderless and 100% clean by default with zero text clutter.
   - Hover/tap smoothly fades in a high-contrast technical scrim (`.still-grid-overlay`) revealing shot title, credited role, studio, single-vote reaction chips, and Lightbox trigger.
   - Responsive CSS grid with GPU-accelerated micro-lift on card hover. Zero visual clutter.

### 4.5 Digital Business Card & Recruiter Landing Architecture
To serve as an instantaneous business card for VFX Recruiters and HODs:
1. **Above-the-Fold Contact Bar:**
   - Sticky/anchored header that condenses into a clean business card banner on scroll.
   - One-click native handlers:
     - `mailto:danielrubin76@gmail.com` with pre-filled subject line.
     - `tel:+16043458636` for instant mobile calling.
     - Citizenship indicator: `Vancouver, BC (Dual US & Canadian Citizen)` providing immediate work authorization clarity.
2. **Instant Executive Résumé Drawer:**
   - Direct 1-click download of the unaugmented original 3-page PDF (`Dan_Rubin_Resume.pdf`) preserving original formatting and layout.
   - Embedded native 3-page PDF viewer with fullscreen and open-in-tab actions.
   - One-click "Copy Clean Text" action with visual toast notification.
3. **External Profile Verification Matrix:**
   - Direct IMDb badge linking to `https://www.imdb.com/name/nm1885406/`.
   - Direct LinkedIn badge linking to `https://www.linkedin.com/in/dan-rubin-8371032/`.
   - Direct Vimeo badge linking to `https://vimeo.com/showcase/11081895` with interactive password copy chip (`pw: password`).
4. **Minimalist Floating Quick-Contact Pill:**
   - Docked at viewport bottom-right (`position: fixed; bottom: 24px; right: 24px; z-index: 9999`).
   - Clean, light Image Engine pill (`background: #ffffff; border: 1px solid var(--border-light); box-shadow: 0 8px 24px rgba(17,24,39,0.08); border-radius: 999px; padding: 6px 14px;`).
   - Houses quick action icons: Phone (`tel:`), Email (`mailto:` / Copy), and LinkedIn with tactile button bounce.
   - Automatically hides when the fullscreen Lightbox or Résumé Modal is open.

### 4.6 Zero-Friction Maintenance & Content Update Architecture
The codebase is structured so Dan can swap in a new reel, upload an updated résumé, or add new credits in under 60 seconds with zero technical friction:

1. **Top-of-File Quick Update Block (`data.js`):**
   A dedicated, clearly commented configuration block at the very top of `data.js` isolates the most frequent updates:
   ```javascript
   // =========================================================================
   // ⚡ QUICK UPDATE CONTROLS (EDIT HERE FOR INSTANT ZERO-BUILD UPDATES)
   // =========================================================================
   const ACTIVE_REEL_CONFIG = {
     title: "2026 Artist Compositing Reel",
     file: "videos/2026CompositingReel.mp4",        // Place new .mp4 into videos/
     downloadName: "Dan_Rubin_2026_Artist_Reel.mp4",
     poster: "images/stills/AvatarFireandAsh_01.png"
   };
   ```
2. **How to Swap a New Reel in 60 Seconds:**
   - Place the new video file into the `videos/` folder.
   - Change `file` and `title` in `ACTIVE_REEL_CONFIG` at the top of `data.js`.
   - Save and refresh. The showcase player, tab switcher, download button, and file metadata update automatically.
3. **How to Update Career Credits & Résumé in 60 Seconds:**
   - Add or edit job entries in `PORTFOLIO_DATA.experience` or `PORTFOLIO_DATA.projects` in `data.js`.
   - The interactive experience timeline, searchable credits gallery, and printable CV modal update synchronously.
4. **Zero Build, Zero Terminal Friction:**
   - Zero compilation, bundling, or command-line steps required. Edits made in `data.js` take effect immediately upon browser refresh.

---

## 5. Performance Budget & Quality Metrics

| Metric | Target | Method of Achievement |
| :--- | :--- | :--- |
| **First Contentful Paint (FCP)** | < 0.5s | Zero external web fonts (Arial system font), zero blocking CSS/JS frameworks. |
| **Total Blocking Time (TBT)** | 0ms | Pure vanilla JavaScript execution with no heavy hydration step. |
| **Cumulative Layout Shift (CLS)** | 0.00 | Fixed aspect-ratio wrappers (`aspect-ratio: 16/9`) on all media players and posters. |
| **Lighthouse Score** | ≥ 98 / 100 | Optimal accessibility, clean SEO meta tags, best practices, and lightweight payloads. |
| **Asset Audit Defect Count** | 0 missing | 100% disk-backed assets; no 404 image or video requests. |

---

## 6. Directory Layout & File Responsibilities

```
vfx-compositing-portfolio/
├── specs/
│   ├── mission.md              # Project constitution, personas, section hierarchy
│   ├── tech-stack.md           # This document (architecture & performance specs)
│   └── roadmap.md              # Phased implementation plan & verification gates
├── index.html                  # Semantic markup structure
├── styles.css                  # Light minimalist design system & typography
├── script.js                   # Application logic, tabs, modal, and lightbox
├── data.js                     # Single-source-of-truth data model
├── original_resume.txt         # Verbatim reference text for unaugmented CV
├── images/
│   ├── ContraElHuracan_poster.jpg # 1080p dynamic crashing wave still
│   ├── DanRubin_Headshot.jpg   # Profile photo
│   └── stills/                 # 75+ verified photoreal production frames
└── videos/                     # 100% verified 1080p H.264 faststart MP4s
```
