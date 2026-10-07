# Specification Document: Dan Rubin VFX Portfolio Website
**Version:** 1.0.0  
**Methodology:** Spec-Driven Development (SDD)  
**Author:** Antigravity Pairing Assistant & Dan Rubin  
**Status:** COMPLETE / VERIFIED PRODUCTION READY  
**Date:** October 2, 2026  

---

## 1. Executive Summary & Vision

### 1.1 Objective
Build a world-class, high-performance personal portfolio website for **Dan Rubin**, an accomplished Visual Effects professional with **25+ years of experience** spanning Hollywood feature films, streaming epics, and award-winning television. 

The site serves as the authoritative showcase for his dual roles:
1. **Compositing Supervisor & Senior Compositor** (Image Engine, Eyeline VFX, Wētā FX, Sony Pictures Imageworks, Digital Domain, FuseFX).
2. **Mentor & Educator** (Vancouver Film School instructor specializing in Deep Compositing & AOV workflows).

### 1.2 Design Philosophy & Aesthetics
Inspired by the clean, media-centric layout of [danimation.com](https://www.danimation.com/):
- **Cinematic Dark Palette:** Deep blacks (`#0a0b0e`), slate charcoals (`#12161f`), and warm studio gold accents (`#e5a93b`).
- **Media-First UX:** Video reels, breakdown breakdowns, and photoreal production stills take center stage with zero unnecessary UI friction.
- **Unencumbered Header:** Logo/Identity on the left, clear direct action buttons on the right (`[Résumé]`, `[LinkedIn]`, `[Vimeo pw: password]`, `[Contact]`). No cluttered middle navigation menu.
- **Zero-Dependency Core:** Pure semantic HTML5, modern vanilla CSS (CSS Grid, Flexbox, custom properties), and modular vanilla JavaScript. Fast load times, no heavy frontend frameworks, 100% offline-ready.

---

## 2. Target Personas & User Journeys

| Persona | Primary Goal | Key Interaction / Journey |
| :--- | :--- | :--- |
| **VFX Producer / Studio Head** | Evaluate supervisory & leadership credentials for major productions | Watched *Contra el Huracán* and *Lift* breakdown, reviews credits list, checks verified résumé. |
| **Compositing Supervisor / Lead** | Assess technical compositing depth, deep comp, and stereo 3D skills | Plays 2026 Artist Reel in 1080p, reviews breakdown tabs, inspects still gallery in fullscreen. |
| **Film School Director / Student** | Evaluate teaching methodology, course depth, and mentorship approach | Reads Vancouver Film School teaching statement, reviews AOV/Deep comp course topics. |
| **Talent Recruiter / HR** | Verify work history, contact details, and social verification | Clicks direct `[Résumé]` modal for full PDF-identical CV, copies LinkedIn / Vimeo links, uses Contact form. |

---

## 3. System Architecture & File Structure

```
vfx-compositing-portfolio/
├── SPEC.md                      # Source-of-truth specification (this file)
├── index.html                   # Semantic markup & document structure
├── styles.css                   # Unified design system, responsive styles, animations
├── script.js                    # UI logic, state management, lightbox, video switcher
├── data.js                      # Single-source-of-truth data model
├── original_resume.txt          # Verbatim reference CV (unaugmented source text)
├── README.md                    # Project overview & documentation
├── images/
│   ├── ContraElHuracan_poster.jpg # 1080p dynamic crashing wave still
│   ├── DanRubin_Headshot.jpg    # Professional profile portrait
│   ├── candidates/              # Working reference frames
│   └── stills/                  # 75+ verified real production stills
│       ├── ContraElHuracan_01.png
│       ├── ContraElHuracan_02.png
│       ├── AvatarFireandAsh_*.png
│       ├── SkeletonCrew_*.png
│       ├── Kraven_*.png
│       ├── Lift_*.png
│       └── ...
├── videos/                      # Browser-ready MP4s with faststart metadata
│   ├── 2026CompositingReel.mp4  # H.264 1080p Artist Compositing Reel
│   ├── ContraElHuracan_Trailer.mp4 # 1080p Netflix Feature Trailer
│   ├── LIFTBreakdown.mp4        # 1080p Supervisory Breakdown
│   ├── Kraven_Breakdown.mp4     # 1080p Sequence Breakdown
│   ├── AUD_Reel.mp4             # 1080p Python Crowd Tool Breakdown
│   └── PS3-laserEffects.mp4     # 1080p Laser Effects Breakdown
└── tools/                       # Build/media processing utilities (ffmpeg, yt-dlp)
```

---

## 4. Functional Requirements & Feature Specifications

### 4.1 Header & Brand Identity (Section 1)
- **Left Region:**
  - Name: `Dan Rubin` (No "Hi, I'm" prefix).
  - Subtitle: `Compositing Supervisor • Mentor & Educator`.
- **Right Region (Direct Actions Only):**
  - `[Résumé]`: Triggers interactive full-CV modal with print and download capabilities.
  - `[LinkedIn]`: Direct link to `https://www.linkedin.com/in/dan-rubin-8371032/` (opens in new tab with `noopener`).
  - `[Vimeo]`: Direct link to `https://vimeo.com/showcase/11081895` with visible password chip (`pw: password`).
  - `[Contact]`: Smooth scroll to footer/contact section.
- **Constraints:** No middle anchor navigation menu (`REEL | STILLS | ...` is strictly removed).

### 4.2 Top Production Stills Ribbon (Section 2)
- **Layout:** Continuous, infinite horizontal scrolling ribbon spanning the full screen width.
- **Interactions:**
  - Hover to pause animation.
  - Rollover tooltip showing film/episodic title and role.
  - Left (`‹`) and Right (`›`) manual scroll buttons for direct navigation.
  - Click any still to expand into the fullscreen Lightbox.
- **Randomization:** Order of stills must be randomized on every page load using the Fisher-Yates shuffle algorithm.
- **Data Integrity:** Must pull strictly from verified existing files on disk (zero broken images).

### 4.3 Hero Section & Video Showcase (Section 3)
- **Primary Reel:** 2026 Artist Compositing Reel (explicitly designated as Dan Rubin's **Artist Reel**, not flagship supervisor showreel).
- **Playback Behavior:** Autoplays muted on page load, looped, with full player controls.
- **Switcher Tabs Bar:** Horizontal tab strip to switch between all 6 showcase videos:
  1. `2026 Artist Compositing Reel` (Local 1080p MP4)
  2. `Contra el Huracán (Netflix)` (Local 1080p MP4 + YouTube link)
  3. `Lift (Netflix) — Breakdown` (Local 1080p MP4)
  4. `Kraven the Hunter — Breakdown` (Local 1080p MP4)
  5. `American Underdog — Python Tool` (Local 1080p MP4)
  6. `The Princess Switch 3 — Lasers` (Local 1080p MP4)
- **Video Metadata Panel:** Synchronously updates project title, supervisory/artist scope, studio, and download link on tab switch.
- **Styling:** Custom dark switcher tabs with hidden default browser scrollbars.

### 4.4 Featured Feature Spotlight: *Contra el Huracán* (Section 4)
- **Role:** Compositing Supervisor at **Eyeline VFX**.
- **Still Artwork:** Must use dynamic, high-stakes VFX hurricane shot (`images/ContraElHuracan_poster.jpg` - boat engulfed by giant explosive wave in turbulent seas with searchlights cutting through volumetric spray).
- **Actions:**
  - "Play 1080p Trailer" (switches video showcase player).
  - "Watch on YouTube" (external link to official trailer).
  - "Download Trailer (38 MB MP4)" (direct file download).

### 4.5 Production Stills Slideshow & Interactive Gallery (Section 5)
- **Requirement:** User explicitly requested keeping this slideshow active.
- **Features:**
  - Auto-advancing slideshow with automatic pause on mouse hover.
  - Synchronized thumbnail strip with active indicator and click-to-jump.
  - Live metadata display: Project title, role, studio, year, technical breakdown text, and slide counter (`X / 18`).
  - Order randomized on every page load.
  - "Expand" button to enter fullscreen Lightbox.

### 4.6 Fullscreen Lightbox Modal (Section 6)
- **Accessibility & Return Paths (Must Never Trap the User):**
  - **Fixed Top Bar:** Prominent, permanent bar anchored to the top of the viewport (`z-index: 100000`) with title, counter, and high-contrast button:
    `[✕ BACK TO PORTFOLIO (ESC)]`.
  - **Keyboard Support:** <kbd>ESC</kbd> key immediately exits fullscreen. Left/Right arrow keys navigate stills.
  - **Backdrop Exit:** Clicking anywhere outside the image closes the lightbox.
  - **In-Modal Navigation:** Large floating `‹` and `›` buttons to flip through the entire gallery without exiting.
  - **Hint Bar:** Informative hint text at bottom: `Press ESC or click Back to Portfolio to return • Click anywhere on dark background to close`.

### 4.7 Mentorship & Educator Statement (Section 7)
- **Description Text (Strictly Verbatim):**
  > "At Vancouver Film School, I’ve taught advanced Nuke compositing courses covering **Deep Compositing and AOV workflows**. My approach focuses on bridging the gap between classroom learning and real production, using techniques and problem-solving approaches developed over more than 25 years working in visual effects. I particularly enjoy mentoring artists and helping them understand not just *how* a technique works, but how and why it is used in a production environment."
- **Key Highlights:** Nuke node architecture, Deep EXR sample merging, multi-channel AOVs, and studio readiness.

### 4.8 Complete Career Credits & Unaugmented Résumé (Section 8)
- **Resume Integrity:** Strictly identical to Dan Rubin's original resume (`original_resume.txt` / uploaded PDF). No augmented dates, no rewritten descriptions, no fictional credits.
- **Format:** Accessible both via in-page searchable/filterable credit cards and the full-screen printable/downloadable Résumé Modal.

---

## 5. Non-Functional & Technical Specifications

### 5.1 Performance & Media Optimization
- All videos encoded as H.264 Main/High Profile, YUV420p, faststart MOOV atom placed at head of container for instant streaming.
- Stills compressed with lossless/near-lossless PNG/JPEG with lazy loading on non-critical images.
- Google Fonts preconnected (`Syne` and `Space Mono`).

### 5.2 Responsive Breakpoints
- **Mobile (< 768px):** Single-column stacked layout, full-width touch-friendly buttons, reduced banner still height.
- **Tablet (768px – 1023px):** 2-column grid for cards, comfortable touch padding, horizontal scrolling tabs.
- **Desktop (1024px+):** Full cinematic presentation, max-width 1360px centered containers, expanded hero display.

### 5.3 Cross-Browser Compatibility
- Validated on Chrome, Firefox, Microsoft Edge, and Safari (macOS / iOS).
- Fallbacks for CSS backdrop-filter and Webkit custom scrollbars.

---

## 6. Acceptance Criteria (Definition of Done)

- [x] **AC-1:** Navigation header displays "Dan Rubin" and "Compositing Supervisor and Artist • Mentor & Educator" on left, with direct `[Résumé]`, `[LinkedIn]`, `[Vimeo pw: password]`, and `[Contact]` buttons on right. No middle menu is present.
- [x] **AC-2:** 2026 Artist Compositing Reel autoplays on mute and is labeled "2026 Artist Compositing Reel".
- [x] **AC-3:** Video switcher switches cleanly between all 6 videos without console errors or playback stalls.
- [x] **AC-4:** *Contra el Huracán* card uses the dynamic wave-explosion still and links to local trailer MP4 and YouTube.
- [x] **AC-5:** Top stills ribbon is strictly horizontal, scrolls smoothly, randomizes order on load, and has zero broken image icons.
- [x] **AC-6:** Stills slideshow works smoothly with auto-play, thumbnail jumps, metadata, and randomized order.
- [x] **AC-7:** Expanding any still opens a Lightbox with a fixed, visible `[✕ BACK TO PORTFOLIO (ESC)]` button, working <kbd>ESC</kbd> key handler, backdrop click close, and left/right slide arrows.
- [x] **AC-8:** Teaching description matches verbatim the user-provided VFS statement.
- [x] **AC-9:** Résumé is strictly unaugmented and matches the user's source text verbatim.
