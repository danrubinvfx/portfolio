# Dan Rubin | VFX Compositing Supervisor, Educator & Mentor Portfolio

A cinematic, modern dark-tech portfolio and executive resume web application tailored for **Dan Rubin** — Vancouver-based Compositing Supervisor with over 25 years of visual effects experience across Feature Films, Animated Features, and Episodic productions.

Designed with clear architectural inspiration from reference industry portfolios (direct introduction, prominent reel, dedicated supervision and teaching pillars, project contribution breakdowns, and daily reading notes), featuring an original visual design and layout.

---

## 🌟 Key Sections & Architecture

1. **Homepage Introduction & Flagship Reel (`#showreel`)**:
   - Direct personal intro: Vancouver-based Compositing Supervisor currently at Eyeline VFX, Dual US/Canadian citizen, 2x Emmy winner, Gemini nominee.
   - High-impact widescreen HTML5 video player streaming Dan's **`videos/2026CompositingReel.mov`** with direct download button and supervisory breakdown highlights (*Lift*, *Spider-Verse*, *Ghostbusters*, etc.).

2. **Rotating Gallery of Selected Work Stills (`#stills-gallery`)**:
   - Accessible carousel (`role="region" aria-roledescription="carousel"`) with manual prev/next controls, dot indicators, and slide counter.
   - **Pause on Hover & Focus**: Automatically pauses rotation when mouse hovers over or when focused via keyboard.
   - **Accessible Keyboard Navigation**: Left and right arrow keys cycle through stills.
   - Each still features an editable **Project Title, Role, Studio, and Shot Caption**.
   - Comes preloaded with 5 cinematic SVG production slate placeholders in `images/stills/` clearly indicating where to drop final comp frame grabs.

3. **Supervision & Leadership Section (`#supervision`)**:
   - Focused on experience, leadership, and operational methodology.
   - Core philosophy quote box.
   - **4 Operational Pillars**:
     1. Sequence Look-Development & Bidding
     2. Team Leadership & Mentorship (teams of up to 20+ compositors)
     3. Cross-Department & Color Alignment (Lighting, FX, Color Pipeline)
     4. Pipeline Tools & Bidding Accuracy
   - Case studies detailing *Lift* (340+ shots / 20 artists), *Kraven The Hunter*, *American Underdog*, and *Spider-Man: Into the Spider-Verse*.

4. **Teaching, Mentorship & Curriculum Section (`#teaching`)**:
   - Mentorship philosophy & artist development strategy (Junior to Mid acceleration, Senior/Lead coaching, Dailies presentation).
   - Core curriculum topics: Multi-Pass CG Integration, Deep Comp, Stereoscopic 3D, Python for Nuke, Color Management & ACEScg, and The Art of Dailies.
   - Classes, workshops, and appointment cards with clearly marked placeholders ready for Dan's schedule.
   - Direct booking callout for university courses, guest lectures, and studio masterclasses.

5. **Selected Filmography & Project Contribution Pages (`#projects`)**:
   - Project cards with category filters (*All*, *Features*, *Episodic*, *Stereo & Deep*).
   - Each project features a dedicated **"Dan's Actual Contribution"** section breaking down what Dan personally supervised, look-deved, scripted, or composited.
   - Deep-linking URL hash support (e.g., `#project/lift`, `#project/kraven`, `#project/underdog`).

6. **Sequence Showcase & Video Breakdowns (`#showcase`)**:
   - Responsive grid of 4 breakdown videos from `videos/`:
     - *Lift* Sequence Breakdown (`LIFTBreakdown.mp4`, 03:57)
     - *American Underdog* Crowd Breakdown (`AUD_Reel.mov`, 01:58)
     - *Kraven The Hunter* Action Breakdown (`Kraven_BreakDown.mov`, 00:47)
     - *PlayStation 3* Laser Effects Commercial (`PS3-laserEffects.mp4`, 01:30)
   - **Smart Audio Playback Coordinator**: Playing any video automatically pauses other active players to eliminate audio overlap.
   - **Vimeo Online Master Showcase Vault**: Standout full-width banner linking to `vimeo.com/showcase/11081895` with a 1-click password copy badge for `password`.

7. **AI & VFX Notes: Curated Daily Reading (`#ai-notes`)**:
   - 3 Featured daily reading stories on the homepage covering machine learning in Nuke (CopyCat), generative inpainting vs sub-pixel parallax, and OpenEXR deep comp standards.
   - Each entry features: **Headline, Original Source Link, Date, Short Summary, and Dan's Commentary**.
   - **Interactive Full Archive Modal**: Complete searchable and filterable database of notes with real-time keyword search.

8. **Printable Executive Resume (`Ctrl+P`)**:
   - Click the "PDF Resume" button or press `Ctrl+P` to format Dan's 25-year career into a clean, 2-page print document for studios and talent recruiters.

---

## 🛠️ Content Editing Options & Ongoing Costs

Before choosing a content management system, here is an objective comparison of the practical options:

| Option | How It Works | Monthly Cost | Pros | Cons |
| :--- | :--- | :--- | :--- | :--- |
| **1. Static Data File (`data.js`) (Current)** | Content is stored in a clean JavaScript file ([data.js](data.js)). You edit text/images directly in VS Code or Notepad. | **\$0 / month forever** | Zero build steps, instant loading, 100% portable, no server maintenance or security vulnerabilities. | Requires opening a text file to edit. |
| **2. Headless Git CMS (Decap CMS / TinaCMS)** | A lightweight web admin portal (`/admin`) connects to your GitHub repository. You log in to a web form to add stories or upload images. | **\$0 / month** | Clean visual web form editor, drag-and-drop image uploads, automatically commits to GitHub and deploys. | Requires a GitHub repository setup and initial 15-minute configuration. |
| **3. Notion / Airtable as Headless Backend** | You write your stories and notes in a private Notion page or Airtable table; the website pulls content dynamically via API. | **\$0 / month** (Free tier) | Familiar, flexible interface on desktop and mobile. | Depends on third-party API availability and potential rate limits. |
| **4. Hosted Website Builders (Webflow, Squarespace, WordPress)** | Proprietary hosted CMS platforms. | **\$16 – \$39+ / month** (\$200–\$450+/yr) | Visual page builder. | High recurring cost, vendor lock-in, slower page load speeds, difficult to customize fine-grained code. |

**Recommendation**: Start with **Option 1 (Separated `data.js`)**. It costs nothing, gives you complete ownership with zero lock-in, and loads faster than any database-driven site. When you want a visual browser-based form to type from your phone or laptop without opening code, we can easily connect **Option 2 (Decap CMS)** on top of it at zero ongoing cost.

---

## 📝 How to Add a Story and Change a Still

All website content is cleanly separated into [`data.js`](data.js).

### 1. How to Add a New "AI & VFX Note"
Open [`data.js`](data.js) and locate the `aiNotes` array (around line 170). Copy and paste this block at the top of the array:

```javascript
{
  id: "note-my-new-story",
  featured: true, // Set true to show on homepage (top 3), false for archive only
  headline: "Your Article Headline Here",
  date: "October 2026",
  sourceName: "Foundry / Cinefex / befores & afters",
  sourceUrl: "https://example.com/article-url",
  category: "Machine Learning / Color Science / Deep Comp",
  summary: "A 2-3 sentence summary of the news or development.",
  commentary: "Your personal perspective as a supervisor on how this impacts production, artists, or sequence workflows."
},
```
Save the file and refresh your browser. The new story immediately appears on the homepage.

---

### 2. How to Replace or Reorder a Still
1. Drop your new image file (PNG, JPG, or WebP) into the `images/stills/` folder (e.g., `images/stills/lift_cockpit_shot.jpg`).
2. Open [`data.js`](data.js) and locate `galleryStills` (around line 50).
3. Update the entry or add a new one:

```javascript
{
  id: "still-lift-cockpit",
  title: "Lift",
  role: "Compositing Supervisor",
  studio: "Image Engine / Netflix",
  year: "2024",
  image: "images/stills/lift_cockpit_shot.jpg", // Path to your new image
  caption: "Airborne cockpit shot showing multi-layer digital matte painting and interactive cloud volumetrics.",
  technicalDetail: "Supervised 340+ shots; look-dev and color pipeline integration."
}
```
To change the display order in the gallery, simply cut and paste the `{ ... }` blocks up or down in the array.

---

## 📋 Short List of Real Content Needed Next

To replace the placeholders with your authentic materials, please supply:

1. **Work Stills (5+ Frame Grabs)**:
   - High-resolution frame grabs or sequence plates (1920×1080 or higher) for *Avatar: Fire and Ash*, *Lift*, *Kraven*, *Spider-Verse*, and *American Underdog*.
2. **Teaching & Mentorship Details**:
   - Formal school or university appointments (e.g., Vancouver Film School, Think Tank, Capilano, or studio internal programs).
   - Course titles, workshop topics, or guest lectures you have taught.
3. **AI & VFX Reading Stories**:
   - Any specific articles, whitepapers, or newsletters from your daily reading that you would like featured, along with your brief commentary.
4. **Endorsements / Testimonials (Optional)**:
   - 1 or 2 brief quotes from VFX Supervisors, Directors, or artists you have mentored.
