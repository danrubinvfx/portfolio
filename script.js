/**
 * Dan Rubin – VFX Compositing Supervisor and Artist, Mentor & Educator
 * Interactive Portfolio Controller & Gamification Engine
 * 
 * Features:
 * - Multi-source video showcase (Contra el Huracán, 2026 Artist Reel, Breakdowns)
 * - Featured Kinetic Stills Carousel (~15-20 curated flagship shots) with floating side peek previews
 * - Gamified reactions (❤️, 🔥, 👏, 🎬) with localStorage persistence & spring physics
 * - Touch & mouse drag swipe gesture engine
 * - Click-to-reveal technical/artistic contribution cards
 * - Theater-grade Lightbox with pinned top exit bar [✕ BACK TO PORTFOLIO (ESC)]
 * - Filterable credits & production stills catalog
 * - Verbatim Executive Résumé modal & 3-page print engine matching uploaded PDF
 */

document.addEventListener("DOMContentLoaded", () => {
  const {
    personal,
    supervision,
    teaching,
    projects,
    experience
  } = PORTFOLIO_DATA;

  // 1. Populate Hero & Metadata
  setText("hero-name", personal.fullName);
  setText("hero-title", personal.title);
  setText("hero-subtitle", personal.subtitle);
  setText("hero-bio", personal.bio);
  setHref("link-email", `mailto:${personal.email}`);

  // 2. Initialize Video Showcase & Supervisory 2x2 Grid
  initVideoShowcase();

  // 3. Initialize Shot Gallery (High-Frequency Stills Grid)
  initKineticCarousel();

  // 4. Initialize Verbatim Experience Timeline
  renderExperience(experience);

  // 5. Initialize Résumé Modal (Unaugmented Intact 3-Page PDF)
  initResumeModal();

  // 6. Initialize Content & Media Protection Security Layer
  initSecurityProtection();

  // 13. Create Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/**
 * ============================================================================
 * HELPER: ARRAY SHUFFLE (Fisher-Yates)
 * ============================================================================
 */
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * ============================================================================
 * GAMIFIED REACTIONS ENGINE (localStorage Persistence & Spring Micro-Animations)
 * ============================================================================
 */
const STORAGE_KEY_REACTIONS = "dan_portfolio_reactions_v2";

// Purge any legacy artificial baseline numbers
try {
  localStorage.removeItem("dan_portfolio_reactions");
} catch (e) {}

function getAllReactions() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_REACTIONS);
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.warn("localStorage unavailable:", e);
    return {};
  }
}

function getReactionsForStill(stillId) {
  const all = getAllReactions();
  if (!all[stillId]) {
    // Pure clean baseline: all reaction counters start at 0
    all[stillId] = {
      heart: 0,
      fire: 0,
      clap: 0,
      cinema: 0,
      userVoted: []
    };
    try {
      localStorage.setItem(STORAGE_KEY_REACTIONS, JSON.stringify(all));
    } catch (e) {}
  }
  return all[stillId];
}

window.handleReactionClick = function(event, stillId, reactionType) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  const all = getAllReactions();
  const data = getReactionsForStill(stillId);

  if (!data.userVoted) data.userVoted = [];

  const isUndo = data.userVoted.includes(reactionType);

  if (isUndo) {
    // User is undoing their vote: remove vote and decrement count
    data.userVoted = data.userVoted.filter(t => t !== reactionType);
    data[reactionType] = Math.max(0, (data[reactionType] || 1) - 1);
  } else {
    // First time voting for this emoji type: add vote and increment count exactly once
    data.userVoted.push(reactionType);
    data[reactionType] = (data[reactionType] || 0) + 1;
  }

  all[stillId] = data;
  try {
    localStorage.setItem(STORAGE_KEY_REACTIONS, JSON.stringify(all));
  } catch (e) {}

  const getReactionName = (type) => {
    switch (type) {
      case 'heart': return 'Love';
      case 'fire': return 'Fire';
      case 'clap': return 'Applaud';
      case 'cinema': return 'Cinematic';
      default: return type;
    }
  };

  const getUnvotedTitle = (type) => {
    switch (type) {
      case 'heart': return 'Love this shot';
      case 'fire': return 'Fire composite';
      case 'clap': return 'Applaud';
      case 'cinema': return 'Cinematic quality';
      default: return `React with ${type}`;
    }
  };

  const btn = event?.currentTarget;
  if (btn) {
    if (isUndo) {
      btn.classList.remove("active", "voted");
      btn.classList.add("unpop");
      btn.setAttribute("title", getUnvotedTitle(reactionType));
      setTimeout(() => btn.classList.remove("unpop"), 240);
    } else {
      btn.classList.add("pop", "active", "voted");
      btn.setAttribute("title", `You reacted with ${getReactionName(reactionType)} (Click to undo)`);
      setTimeout(() => btn.classList.remove("pop"), 280);
    }

    const countEl = btn.querySelector(".reaction-count");
    if (countEl) {
      countEl.textContent = data[reactionType] > 0 ? data[reactionType] : "";
    }
  }

  // Synchronize count and voted state across all matching emoji elements in the DOM
  document.querySelectorAll(`[data-reaction-still="${stillId}"][data-reaction-type="${reactionType}"]`).forEach(otherBtn => {
    if (isUndo) {
      otherBtn.classList.remove("active", "voted");
      otherBtn.setAttribute("title", getUnvotedTitle(reactionType));
    } else {
      otherBtn.classList.add("active", "voted");
      otherBtn.setAttribute("title", `You reacted with ${getReactionName(reactionType)} (Click to undo)`);
    }
    const countEl = otherBtn.querySelector(".reaction-count");
    if (countEl) {
      countEl.textContent = data[reactionType] > 0 ? data[reactionType] : "";
    }
  });
};

/**
 * ============================================================================
 * VIDEO SHOWCASE & SWITCHER TABS
 * Allows switching between:
 * 1. Contra el Huracán (Netflix) Trailer — Eyeline VFX (Autoplays muted by default)
 * 2. Lift (Netflix) — Breakdown, Image Engine
 * 3. Kraven the Hunter — Breakdown, Image Engine
 * 4. 2026 Artist Compositing Reel
 * 5. American Underdog — Python Crowd Tool, FuseFX
 * 6. The Princess Switch 3 — Laser Effects Breakdown, FuseFX
 * ============================================================================
 */
let currentVideoId = "trailer-contra";
let isYouTubeMode = false;

function initVideoShowcase() {
  // Autoplay muted on load for Artist Reel
  const artistVid = document.getElementById("artist-showreel-video");
  if (artistVid) {
    artistVid.muted = true;
    artistVid.autoplay = true;
    artistVid.play().catch(e => {
      console.log("Artist reel autoplay restriction handled:", e);
    });
  }

  const gridContainer = document.getElementById("supervisory-grid");
  const mobileCarousel = document.getElementById("mobile-supervisory-carousel");
  const allVideos = PORTFOLIO_DATA.showcaseVideos || [];
  if (!gridContainer || !allVideos.length) return;

  // Filter out artist reel and take 4 supervisory breakdown shows
  const supervisoryVideos = allVideos.filter(v => v.id !== "reel-2026").slice(0, 4);

  // Render desktop 2x2 grid
  gridContainer.innerHTML = supervisoryVideos.map(v => renderSupervisoryCardHtml(v, false)).join("");

  // Render mobile 1-reel carousel
  if (mobileCarousel && supervisoryVideos.length) {
    mobileCarousel.innerHTML = `
      <div class="mobile-reel-header-controls">
        <button class="mobile-reel-btn" id="mobile-reel-prev" onclick="navigateMobileReel(-1)" aria-label="Previous breakdown reel">
          <i data-lucide="chevron-left" style="width:14px;height:14px;"></i>
          <span>Prev Reel</span>
        </button>
        <div class="mobile-reel-tracker" id="mobile-reel-tracker">
          Reel <span id="mobile-reel-current">1</span> of <span>${supervisoryVideos.length}</span>
        </div>
        <button class="mobile-reel-btn" id="mobile-reel-next" onclick="navigateMobileReel(1)" aria-label="Next breakdown reel">
          <span>Next Reel</span>
          <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        </button>
      </div>

      <div class="mobile-reel-viewport" id="mobile-reel-viewport" tabindex="0" aria-label="Supervisory Breakdown Reel Carousel">
        <div class="mobile-reel-card-wrap" id="mobile-reel-card-wrap">
          ${renderSupervisoryCardHtml(supervisoryVideos[currentMobileReelIdx], true)}
        </div>
      </div>

      <div class="gallery-swipe-hint-bar" style="margin-top:14px;">
        <span class="gallery-hint-text">
          <i data-lucide="move-horizontal" style="width:13px;height:13px;"></i>
          <span>Swipe left / right for next / previous reel</span>
        </span>
      </div>
    `;

    initMobileReelSwipe(supervisoryVideos);
    updateMobileReelNav(supervisoryVideos);
  }

  if (window.lucide) window.lucide.createIcons();
}

let currentMobileReelIdx = 0;

function renderSupervisoryCardHtml(v, isMobile = false) {
  return `
    <div class="supervisory-card ${isMobile ? 'mobile-supervisory-card' : ''}">
      <div class="supervisory-player-wrap" oncontextmenu="return false;">
        <video controls controlsList="nodownload noplaybackrate nofullscreen" disablePictureInPicture loop playsinline preload="none" poster="${v.poster || ''}" oncontextmenu="return false;">
          <source src="${v.file}" type="video/mp4">
          <p style="color:#888;padding:24px;font-family:monospace;font-size:12px;">Browser cannot play video inline.</p>
        </video>
        <div class="cinema-watermark">&copy; Dan Rubin &bull; Proprietary VFX Material</div>
      </div>
      <div class="supervisory-card-meta">
        <div class="supervisory-card-title">${v.title}</div>
        <div class="supervisory-card-sub">${v.role || v.badge} &bull; ${v.studio}</div>
      </div>
    </div>
  `;
}

window.navigateMobileReel = function(delta) {
  const allVideos = PORTFOLIO_DATA.showcaseVideos || [];
  const supervisoryVideos = allVideos.filter(v => v.id !== "reel-2026").slice(0, 4);
  if (!supervisoryVideos.length) return;

  const nextIdx = currentMobileReelIdx + delta;
  if (nextIdx < 0 || nextIdx >= supervisoryVideos.length) return;

  // CRITICAL: Pause any currently playing video on mobile stage before switching
  const currentVideo = document.querySelector("#mobile-reel-card-wrap video");
  if (currentVideo && !currentVideo.paused) {
    currentVideo.pause();
  }

  currentMobileReelIdx = nextIdx;
  const wrap = document.getElementById("mobile-reel-card-wrap");
  if (wrap) {
    wrap.style.transition = "opacity 0.15s ease, transform 0.15s ease";
    wrap.style.opacity = "0";
    wrap.style.transform = delta > 0 ? "translateX(-20px)" : "translateX(20px)";

    setTimeout(() => {
      wrap.innerHTML = renderSupervisoryCardHtml(supervisoryVideos[currentMobileReelIdx], true);
      wrap.style.transform = delta > 0 ? "translateX(20px)" : "translateX(-20px)";
      requestAnimationFrame(() => {
        wrap.style.transition = "opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)";
        wrap.style.opacity = "1";
        wrap.style.transform = "translateX(0)";
        if (window.lucide) window.lucide.createIcons();
      });
    }, 150);
  }

  updateMobileReelNav(supervisoryVideos);
};

function updateMobileReelNav(supervisoryVideos) {
  const prevBtn = document.getElementById("mobile-reel-prev");
  const nextBtn = document.getElementById("mobile-reel-next");
  const curSpan = document.getElementById("mobile-reel-current");

  if (curSpan) curSpan.textContent = currentMobileReelIdx + 1;
  if (prevBtn) {
    const isFirst = currentMobileReelIdx === 0;
    prevBtn.disabled = isFirst;
    prevBtn.style.opacity = isFirst ? "0.35" : "1";
    prevBtn.style.pointerEvents = isFirst ? "none" : "auto";
  }
  if (nextBtn) {
    const isLast = currentMobileReelIdx === supervisoryVideos.length - 1;
    nextBtn.disabled = isLast;
    nextBtn.style.opacity = isLast ? "0.35" : "1";
    nextBtn.style.pointerEvents = isLast ? "none" : "auto";
  }
}

function initMobileReelSwipe(supervisoryVideos) {
  const viewport = document.getElementById("mobile-reel-viewport");
  if (!viewport) return;

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let isSwiping = false;

  viewport.addEventListener("touchstart", (e) => {
    if (!e.touches.length) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    distX = 0;
    distY = 0;
    isSwiping = true;
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    if (!isSwiping || !e.touches.length) return;
    distX = e.touches[0].clientX - startX;
    distY = e.touches[0].clientY - startY;
  }, { passive: true });

  viewport.addEventListener("touchend", () => {
    if (!isSwiping) return;
    isSwiping = false;
    if (Math.abs(distX) > 40 && Math.abs(distX) > Math.abs(distY) * 1.2) {
      if (distX < 0) {
        navigateMobileReel(1);
      } else {
        navigateMobileReel(-1);
      }
    }
  });

  // Mouse drag support
  let isMouseDown = false;
  let mouseStartX = 0;
  viewport.addEventListener("mousedown", (e) => {
    if (e.target && e.target.tagName === 'VIDEO') return;
    isMouseDown = true;
    mouseStartX = e.clientX;
  });
  window.addEventListener("mouseup", (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;
    const diff = e.clientX - mouseStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        navigateMobileReel(1);
      } else {
        navigateMobileReel(-1);
      }
    }
  });

  // Keyboard navigation when focused
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      navigateMobileReel(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      navigateMobileReel(1);
    }
  });
}

window.switchToTab = function(videoId) {
  if (videoId === "reel-2026") {
    const artistSection = document.getElementById("artist-reel");
    if (artistSection) {
      artistSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  } else {
    const showreelSection = document.getElementById("supervisory-reels");
    if (showreelSection) {
      showreelSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
};

window.playShowcaseVideo = function(videoId) {
  const videos = PORTFOLIO_DATA.showcaseVideos || [];
  const videoItem = videos.find(v => v.id === videoId);
  if (!videoItem) return;

  currentVideoId = videoId;
  isYouTubeMode = false;

  // Update tabs active state
  document.querySelectorAll(".video-tab-btn").forEach(btn => {
    btn.classList.remove("active");
    btn.setAttribute("aria-selected", "false");
  });
  const activeBtn = document.getElementById(`tab-btn-${videoId}`);
  if (activeBtn) {
    activeBtn.classList.add("active");
    activeBtn.setAttribute("aria-selected", "true");
  }

  // Hide YouTube iframe if active
  const ytFrame = document.getElementById("youtube-embed-frame");
  const mainVideo = document.getElementById("main-showreel-video");

  if (ytFrame) {
    ytFrame.style.display = "none";
    ytFrame.innerHTML = "";
  }
  if (mainVideo) {
    mainVideo.style.display = "block";
    mainVideo.pause();

    // Set new source
    mainVideo.src = videoItem.file;
    if (videoItem.poster) {
      mainVideo.poster = videoItem.poster;
    } else {
      mainVideo.removeAttribute("poster");
    }

    mainVideo.muted = true;
    mainVideo.loop = true;
    mainVideo.load();
    mainVideo.play().catch(e => {
      console.log("Playback interaction requirement handled:", e);
    });
  }

  updateVideoMetadata(videoItem);

  if (window.lucide) window.lucide.createIcons();
};

function updateVideoMetadata(videoItem) {
  setText("showreel-title", videoItem.title);
  setText("showreel-desc", videoItem.desc);
  setText("video-section-badge", videoItem.badge || "Video Showcase");


  // YouTube Toggle Button
  const ytBtn = document.getElementById("btn-toggle-youtube");
  const ytBtnText = document.getElementById("btn-toggle-youtube-text");
  if (ytBtn) {
    if (videoItem.embedUrl || videoItem.youtubeUrl) {
      ytBtn.style.display = "inline-flex";
      if (ytBtnText) ytBtnText.textContent = isYouTubeMode ? "Switch to Local 1080p MP4" : "Watch on YouTube";
    } else {
      ytBtn.style.display = "none";
    }
  }

  // Active video footer card
  setText("video-meta-role", videoItem.role || videoItem.badge);
  setText("video-meta-studio", `${videoItem.studio || 'Dan Rubin'}`);
  setText("video-meta-note", videoItem.desc || "");
}

window.toggleYouTubeEmbed = function() {
  const videos = PORTFOLIO_DATA.showcaseVideos || [];
  const videoItem = videos.find(v => v.id === currentVideoId);
  if (!videoItem || (!videoItem.embedUrl && !videoItem.youtubeUrl)) return;

  const ytFrame = document.getElementById("youtube-embed-frame");
  const mainVideo = document.getElementById("main-showreel-video");
  const ytBtnText = document.getElementById("btn-toggle-youtube-text");

  isYouTubeMode = !isYouTubeMode;

  if (isYouTubeMode) {
    if (mainVideo) {
      mainVideo.pause();
      mainVideo.style.display = "none";
    }
    if (ytFrame) {
      ytFrame.style.display = "block";
      ytFrame.innerHTML = `
        <iframe width="100%" height="100%"
                src="${videoItem.embedUrl || 'https://www.youtube-nocookie.com/embed/zKApuso5SCo'}?autoplay=1&rel=0"
                title="${videoItem.title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style="border-radius:8px;width:100%;aspect-ratio:16/9;">
        </iframe>
      `;
    }
    if (ytBtnText) ytBtnText.textContent = "Switch to Local 1080p MP4";
  } else {
    if (ytFrame) {
      ytFrame.style.display = "none";
      ytFrame.innerHTML = "";
    }
    if (mainVideo) {
      mainVideo.style.display = "block";
      mainVideo.play().catch(e => console.log(e));
    }
    if (ytBtnText) ytBtnText.textContent = "Watch on YouTube";
  }
};

/**
 * ============================================================================
 * TOP CYCLING BANNER OF PRODUCTION STILLS
 * Continuous smooth horizontal ribbon of Dan's real work stills with pause-on-hover.
 * Randomized on every page load.
 * ============================================================================
 */
let currentBannerSet = [];

function initTopCyclingBanner() {
  const track = document.getElementById("top-banner-track");
  const rawImages = PORTFOLIO_DATA.topBannerImages;
  if (!track || !rawImages || !rawImages.length) return;

  const images = shuffleArray(rawImages);
  currentBannerSet = [...images, ...images];

  track.innerHTML = currentBannerSet.map((item, idx) => `
    <div class="banner-item"
         title="${(item.title || '').replace(/"/g, '&quot;')} &bull; ${(item.role || '').replace(/"/g, '&quot;')}"
         onclick="openBannerStill(${idx})">
      <img src="${item.src}" alt="${(item.title || 'Production Still').replace(/"/g, '&quot;')}" loading="lazy" decoding="async" draggable="false">
      <div class="banner-item-overlay">
        <div class="banner-item-title">${item.title || ''}</div>
        <div class="banner-item-role">${item.role || 'VFX Still'}</div>
      </div>
    </div>
  `).join("");

  const leftBtn = document.getElementById("banner-scroll-left");
  const rightBtn = document.getElementById("banner-scroll-right");
  const viewport = document.getElementById("top-banner-viewport");

  if (leftBtn && viewport) {
    leftBtn.addEventListener("click", () => {
      viewport.scrollBy({ left: -340, behavior: "smooth" });
    });
  }

  if (rightBtn && viewport) {
    rightBtn.addEventListener("click", () => {
      viewport.scrollBy({ left: 340, behavior: "smooth" });
    });
  }

  // Drag-to-scroll support on top ribbon
  let isDown = false;
  let startX;
  let scrollLeft;

  if (viewport) {
    viewport.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
    });
    viewport.addEventListener("mouseleave", () => { isDown = false; });
    viewport.addEventListener("mouseup", () => { isDown = false; });
    viewport.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      viewport.scrollLeft = scrollLeft - walk;
    });
  }
}

/**
 * ============================================================================
 * FEATURED KINETIC STILLS CAROUSEL (~15-20 Curated Flagship Shots)
 * Smooth side-to-side track slide with floating side peek previews.
 * Hover/tap overlay, reaction chips, swipe gesture detection, zero thumbnail clutter.
 * ============================================================================
 */
/**
 * ============================================================================
 * FEATURED STILLS (High-Frequency Grid Pattern)
 * 16 curated flagship production stills with hover-only technical scrim
 * and single-vote emoji reactions.
 * ============================================================================
 */
/**
 * ============================================================================
 * FEATURED STILLS / SHOT GALLERY (Randomized Swipable Grid Engine)
 * - Swiping left or right reveals fresh random stills from the 77-still pool.
 * - Invariant: Zero duplicates within any visible set ("never seen at the same time").
 * - Supports touch gestures, mouse drag, arrow buttons, and keyboard left/right.
 * - Single-vote emoji reactions and Lightbox integration preserved.
 * ============================================================================
 */
let kineticSlidesData = [];
let galleryHistory = [];
let galleryHistoryIndex = 0;
let isGalleryAnimating = false;

function getGalleryBatchSize() {
  const isMobile = window.innerWidth <= 768 || (window.matchMedia && window.matchMedia("(max-width: 768px)").matches);
  if (isMobile) return 12; // Strictly 3 across * 4 down = 12 stills on mobile
  if (window.innerWidth <= 1024) return 12;
  return 16;
}

function generateRandomBatch(batchSize, previousBatch = []) {
  const allStills = PORTFOLIO_DATA.galleryStills || [];
  if (!allStills.length) return [];

  const targetSize = Math.min(batchSize, allStills.length);
  const shuffled = shuffleArray(allStills);

  // Filter out items in previousBatch so the new batch maximizes novelty
  const prevIds = new Set((previousBatch || []).map(p => p.id));
  const freshItems = shuffled.filter(s => !prevIds.has(s.id));

  const picked = [];
  const pickedIds = new Set();

  // First pick from fresh items
  for (const s of freshItems) {
    if (!pickedIds.has(s.id)) {
      pickedIds.add(s.id);
      picked.push(s);
      if (picked.length === targetSize) break;
    }
  }

  // If we need more items to reach targetSize, pick from remaining shuffled items (strictly no duplicates)
  if (picked.length < targetSize) {
    for (const s of shuffled) {
      if (!pickedIds.has(s.id)) {
        pickedIds.add(s.id);
        picked.push(s);
        if (picked.length === targetSize) break;
      }
    }
  }

  return picked;
}

function renderGalleryBatch(batch, direction, isInitial = false) {
  const container = document.getElementById("stills-grid-container");
  if (!container || !batch.length) return;

  // Enforce strict batch size cap (12 on mobile = 3 across * 4 down; 16 on desktop = 4 across * 4 down)
  const targetBatchSize = getGalleryBatchSize();
  const visibleBatch = batch.slice(0, targetBatchSize);
  kineticSlidesData = visibleBatch;

  const renderCardsHTML = () => {
    container.innerHTML = visibleBatch.map((s, idx) => {
      const rx = getReactionsForStill(s.id || `still-${idx}`);
      const displayTitle = (s.year && !s.title.includes(s.year)) ? `${s.title} (${s.year})` : s.title;

      return `
        <div class="still-grid-card" onclick="openKineticStill(${idx})" data-index="${idx}">
          <img src="${s.image}" alt="${s.title}" loading="lazy" decoding="async" draggable="false" class="still-grid-img">
          
          <!-- Hover-Only Scrim (Text ONLY appears when hovered over) -->
          <div class="still-grid-overlay">
            <div class="still-grid-title">${displayTitle}</div>
            <div class="still-grid-sub">${s.role} &bull; ${s.studio}</div>
            
            <!-- Single-Vote Emoji Reaction Chips -->
            <div class="still-grid-reactions" onclick="event.stopPropagation()">
              <button class="reaction-chip ${rx.userVoted.includes('heart') ? 'active voted' : ''}"
                      data-reaction-still="${s.id || `still-${idx}`}"
                      data-reaction-type="heart"
                      onclick="handleReactionClick(event, '${s.id || `still-${idx}`}', 'heart')"
                      title="${rx.userVoted.includes('heart') ? 'You reacted with Love (Click to undo)' : 'Love this shot'}">
                <span>❤️</span>
                <span class="reaction-count">${rx.heart > 0 ? rx.heart : ''}</span>
              </button>
              <button class="reaction-chip ${rx.userVoted.includes('fire') ? 'active voted' : ''}"
                      data-reaction-still="${s.id || `still-${idx}`}"
                      data-reaction-type="fire"
                      onclick="handleReactionClick(event, '${s.id || `still-${idx}`}', 'fire')"
                      title="${rx.userVoted.includes('fire') ? 'You reacted with Fire (Click to undo)' : 'Fire composite'}">
                <span>🔥</span>
                <span class="reaction-count">${rx.fire > 0 ? rx.fire : ''}</span>
              </button>
              <button class="reaction-chip ${rx.userVoted.includes('clap') ? 'active voted' : ''}"
                      data-reaction-still="${s.id || `still-${idx}`}"
                      data-reaction-type="clap"
                      onclick="handleReactionClick(event, '${s.id || `still-${idx}`}', 'clap')"
                      title="${rx.userVoted.includes('clap') ? 'You reacted with Applaud (Click to undo)' : 'Applaud'}">
                <span>👏</span>
                <span class="reaction-count">${rx.clap > 0 ? rx.clap : ''}</span>
              </button>
              <button class="reaction-chip ${rx.userVoted.includes('cinema') ? 'active voted' : ''}"
                      data-reaction-still="${s.id || `still-${idx}`}"
                      data-reaction-type="cinema"
                      onclick="handleReactionClick(event, '${s.id || `still-${idx}`}', 'cinema')"
                      title="${rx.userVoted.includes('cinema') ? 'You reacted with Cinematic (Click to undo)' : 'Cinematic quality'}">
                <span>🎬</span>
                <span class="reaction-count">${rx.cinema > 0 ? rx.cinema : ''}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  };

  if (isInitial || !direction) {
    renderCardsHTML();
    return;
  }

  isGalleryAnimating = true;
  const outClass = direction === 'left' ? 'anim-sliding-out-left' : 'anim-sliding-out-right';
  const preEnterClass = direction === 'left' ? 'anim-pre-enter-left' : 'anim-pre-enter-right';

  container.classList.add(outClass);

  setTimeout(() => {
    renderCardsHTML();
    container.classList.remove(outClass);
    container.classList.add(preEnterClass);

    // Force browser reflow to register pre-enter position
    void container.offsetHeight;

    container.classList.remove(preEnterClass);
    setTimeout(() => {
      isGalleryAnimating = false;
    }, 320);
  }, 160);
}

window.swipeGallery = function(direction) {
  if (isGalleryAnimating) return;

  const batchSize = getGalleryBatchSize();

  if (direction === 'left') {
    // Next / Advance
    if (galleryHistoryIndex < galleryHistory.length - 1) {
      galleryHistoryIndex++;
      renderGalleryBatch(galleryHistory[galleryHistoryIndex], 'left');
    } else {
      const nextBatch = generateRandomBatch(batchSize, kineticSlidesData);
      galleryHistory.push(nextBatch);
      galleryHistoryIndex = galleryHistory.length - 1;
      renderGalleryBatch(nextBatch, 'left');
    }
  } else if (direction === 'right') {
    // Prev / Back
    if (galleryHistoryIndex > 0) {
      galleryHistoryIndex--;
      renderGalleryBatch(galleryHistory[galleryHistoryIndex], 'right');
    } else {
      const prevBatch = generateRandomBatch(batchSize, kineticSlidesData);
      galleryHistory.unshift(prevBatch);
      galleryHistoryIndex = 0;
      renderGalleryBatch(prevBatch, 'right');
    }
  }
};

window.kineticCarouselNext = function() { swipeGallery('left'); };
window.kineticCarouselPrev = function() { swipeGallery('right'); };

function initKineticCarousel() {
  const container = document.getElementById("stills-grid-container");
  const viewport = document.getElementById("stills-swipe-viewport");
  const rawStills = PORTFOLIO_DATA.galleryStills || [];
  if (!container || !rawStills.length) return;

  // Initialize first batch of unique random stills
  const batchSize = getGalleryBatchSize();
  const initialBatch = generateRandomBatch(batchSize);
  galleryHistory = [initialBatch];
  galleryHistoryIndex = 0;

  renderGalleryBatch(initialBatch, null, true);

  if (!viewport) return;

  // Touch Swipe Gesture Listeners
  let touchStartX = 0;
  let touchStartY = 0;
  let isTouchSwiping = false;

  viewport.addEventListener("touchstart", (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isTouchSwiping = true;
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    if (!isTouchSwiping || !e.touches || e.touches.length === 0) return;
    const diffX = e.touches[0].clientX - touchStartX;
    const diffY = e.touches[0].clientY - touchStartY;
    // If predominantly horizontal, prevent native scroll so swipe feels responsive
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
      if (e.cancelable) e.preventDefault();
    }
  }, { passive: false });

  viewport.addEventListener("touchend", (e) => {
    if (!isTouchSwiping) return;
    isTouchSwiping = false;
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    const diffX = e.changedTouches[0].clientX - touchStartX;
    const diffY = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        swipeGallery('left'); // Swiped left -> next
      } else {
        swipeGallery('right'); // Swiped right -> prev
      }
    }
  }, { passive: true });

  // Desktop Mouse Drag Gesture Listeners
  let isMouseDown = false;
  let mouseStartX = 0;
  let hasDragged = false;

  viewport.addEventListener("mousedown", (e) => {
    // Only left click
    if (e.button !== 0) return;
    // Don't intercept button clicks inside overlay
    if (e.target.closest("button")) return;
    isMouseDown = true;
    mouseStartX = e.clientX;
    hasDragged = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    const diffX = e.clientX - mouseStartX;
    if (Math.abs(diffX) > 8) {
      hasDragged = true;
      viewport.classList.add("is-dragging");
    }
  });

  window.addEventListener("mouseup", (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;
    viewport.classList.remove("is-dragging");

    if (hasDragged) {
      const diffX = e.clientX - mouseStartX;
      if (Math.abs(diffX) > 40) {
        if (diffX < 0) {
          swipeGallery('left');
        } else {
          swipeGallery('right');
        }
      }
    }
  });

  // Capture click after dragging to avoid accidentally opening still when user was dragging
  viewport.addEventListener("click", (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      hasDragged = false;
    }
  }, true);

  // Keyboard navigation when gallery viewport is focused or section is in viewport
  viewport.addEventListener("keydown", (e) => {
    const lightboxModal = document.getElementById("lightbox-modal");
    if (lightboxModal && !lightboxModal.classList.contains("hidden")) return;

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      swipeGallery('right');
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      swipeGallery('left');
    }
  });

  // Re-sync batch size if user resizes across mobile / desktop breakpoint
  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const currentExpectedSize = getGalleryBatchSize();
      if (kineticSlidesData && kineticSlidesData.length !== currentExpectedSize) {
        const freshBatch = generateRandomBatch(currentExpectedSize);
        galleryHistory = [freshBatch];
        galleryHistoryIndex = 0;
        renderGalleryBatch(freshBatch, null, true);
      }
    }, 150);
  });
}

/**
 * ============================================================================
 * FULLSCREEN LIGHTBOX MODAL (With Fixed Exit Bar & Keyboard/Navigation Controls)
 * ============================================================================
 */
let lightboxCurrentIndex = 0;
let lightboxCurrentList = [];

function updateLightboxContent(index) {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-image");
  const cap = document.getElementById("lightbox-caption");
  const titleEl = document.getElementById("lightbox-title");

  if (!modal || !img) return;

  const list = lightboxCurrentList.length ? lightboxCurrentList : (PORTFOLIO_DATA.galleryStills || []);
  if (!list || !list.length) return;

  lightboxCurrentIndex = ((index % list.length) + list.length) % list.length;
  const item = list[lightboxCurrentIndex];

  img.src = item.image || item.src;
  if (titleEl) titleEl.textContent = item.title || "Production Still";
  if (cap) {
    const studioPart = item.studio ? ` (${item.studio})` : '';
    cap.innerHTML = `<strong>${item.title || ''}</strong> &bull; ${item.role || ''}${studioPart}`;
  }
}

window.openBannerStill = function(idx) {
  const item = currentBannerSet[idx];
  if (!item) return;
  openLightbox(item.src, `${item.title || 'Production Still'} &bull; ${item.role || 'VFX Still'}`);
};

window.openKineticStill = function(idx) {
  const s = kineticSlidesData[idx];
  if (!s) return;
  openLightbox(s.image, `${s.title || 'Production Still'} &bull; ${s.role || 'VFX Still'}`);
};

window.openProjectStill = function(pIdx) {
  const p = currentProjectsRendered[pIdx];
  if (!p) return;
  openLightbox(p.image, `${p.title || 'Project Still'} &bull; ${p.role || 'Credited Role'}`);
};

window.openLightbox = function(srcOrIndex, captionText) {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;

  // Use all gallery stills as the master list
  lightboxCurrentList = PORTFOLIO_DATA.galleryStills || [];

  if (typeof srcOrIndex === "number") {
    lightboxCurrentIndex = srcOrIndex;
  } else {
    const idx = lightboxCurrentList.findIndex(s => s.image === srcOrIndex || s.src === srcOrIndex);
    if (idx !== -1) {
      lightboxCurrentIndex = idx;
    } else {
      // Check topBannerImages
      const bIdx = (PORTFOLIO_DATA.topBannerImages || []).findIndex(b => b.src === srcOrIndex);
      if (bIdx !== -1) {
        lightboxCurrentList = PORTFOLIO_DATA.topBannerImages;
        lightboxCurrentIndex = bIdx;
      } else {
        lightboxCurrentIndex = 0;
      }
    }
  }

  updateLightboxContent(lightboxCurrentIndex);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("modal-open");

  if (window.lucide) window.lucide.createIcons();
};

window.closeLightbox = function() {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("modal-open");
};

window.handleLightboxBackdropClick = function(event) {
  if (event.target.id === "lightbox-modal" || event.target.classList.contains("lightbox-modal-backdrop")) {
    closeLightbox();
  }
};

window.lightboxPrev = function(event) {
  if (event) event.stopPropagation();
  updateLightboxContent(lightboxCurrentIndex - 1);
};

window.lightboxNext = function(event) {
  if (event) event.stopPropagation();
  updateLightboxContent(lightboxCurrentIndex + 1);
};

// Global Keyboard Navigation (ESC to exit, Arrow keys to navigate)
document.addEventListener("keydown", function(e) {
  const lightboxModal = document.getElementById("lightbox-modal");
  const isLightboxOpen = lightboxModal && !lightboxModal.classList.contains("hidden");

  if (e.key === "Escape" || e.keyCode === 27) {
    if (isLightboxOpen) {
      closeLightbox();
    } else {
      if (typeof closeResumeModal === "function") closeResumeModal();
      if (typeof closeProjectModal === "function") closeProjectModal();
      if (typeof closeNotesArchiveModal === "function") closeNotesArchiveModal();
    }
  } else if (isLightboxOpen) {
    if (e.key === "ArrowLeft" || e.keyCode === 37) {
      lightboxPrev();
    } else if (e.key === "ArrowRight" || e.keyCode === 39) {
      lightboxNext();
    }
  }
});

// Lightbox Touch Swiping Listener
(function initLightboxSwipe() {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;
  let startX = 0;
  modal.addEventListener("touchstart", (e) => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });
  modal.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].screenX;
    const diff = endX - startX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) {
        lightboxNext();
      } else {
        lightboxPrev();
      }
    }
  }, { passive: true });
})();

/**
 * ============================================================================
 * SUPERVISORY METHODOLOGY & MILESTONES
 * ============================================================================
 */
function renderSupervision(supervision) {
  if (!supervision) return;

  const pillarsContainer = document.getElementById("supervision-pillars");
  if (pillarsContainer && supervision.pillars) {
    pillarsContainer.innerHTML = supervision.pillars.map(p => `
      <div class="supervision-card">
        <div style="font-size:20px;color:var(--text-main);margin-bottom:8px;">
          <i data-lucide="${p.icon}" style="width:20px;height:20px;"></i>
        </div>
        <div class="supervision-card-title">${p.title}</div>
        <div class="supervision-card-desc">${p.desc}</div>
      </div>
    `).join("");
  }

  const milestonesContainer = document.getElementById("supervision-milestones");
  if (milestonesContainer && supervision.milestones) {
    milestonesContainer.innerHTML = supervision.milestones.map(m => `
      <div class="milestone-item">
        <div class="milestone-year" style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span>${m.studio}</span>
          ${getStudioBadgeHtml(m.studio)}
        </div>
        <div class="milestone-title">${m.project}</div>
        <div style="font-size:12px;font-family:var(--font-mono);color:var(--text-muted);margin-bottom:6px;">${m.scope}</div>
        <div class="milestone-desc">${m.summary}</div>
      </div>
    `).join("");
  }
}

/**
 * ============================================================================
 * TEACHING & MENTORSHIP
 * ============================================================================
 */
function renderTeaching(teaching) {
  if (!teaching) return;

  const philosophyEl = document.getElementById("teaching-philosophy");
  if (philosophyEl && teaching.philosophy) {
    philosophyEl.innerHTML = teaching.philosophy;
  }

  const cardsContainer = document.getElementById("teaching-cards");
  if (cardsContainer && teaching.appointments) {
    cardsContainer.innerHTML = teaching.appointments.map(a => `
      <div class="teaching-card">
        <div style="display:inline-block;font-size:10px;font-family:var(--font-mono);background:var(--bg-secondary);border:1px solid var(--border-medium);padding:2px 8px;border-radius:4px;color:var(--text-muted);margin-bottom:8px;text-transform:uppercase;">
          ${a.type}
        </div>
        <div class="teaching-card-title">${a.title}</div>
        <div style="font-size:12px;font-family:var(--font-mono);color:var(--text-muted);margin-bottom:8px;">${a.institution} &bull; ${a.period}</div>
        <div class="teaching-card-desc">${a.description}</div>
      </div>
    `).join("");
  }

  const topicsContainer = document.getElementById("teaching-topics");
  if (topicsContainer && teaching.topics) {
    topicsContainer.innerHTML = teaching.topics.map(t => `
      <div class="topic-item">
        <div class="topic-title">${t.name}</div>
        <div class="topic-sub">${t.detail}</div>
      </div>
    `).join("");
  }
}

/**
 * ============================================================================
 * SELECTED PROJECTS / FILMOGRAPHY & DETAIL MODAL
 * Cards feature:
 * - 16:9 Production Still (click to open Lightbox)
 * - Project Title & Release Year
 * - Exact Credited Role Badge (e.g. Compositing Supervisor, Lead Compositor)
 * - Studio & Client
 * - Reaction Chips with localStorage persistence
 * - Interactive Click-to-Reveal Technical Contribution drawer
 * ============================================================================
 */
/**
 * Generates an authoritative Tier-1 Studio Badge HTML chip
 * Synthesizes Wētā FX, Eyeline VFX, Digital Domain, Image Engine, Sony Imageworks, and FuseFX
 */
function getStudioBadgeHtml(studioString) {
  if (!studioString) return '';
  const s = String(studioString).toLowerCase();
  let badgeClass = 'studio-badge-default';
  let label = studioString;

  if (s.includes('weta')) {
    badgeClass = 'studio-badge-weta';
    label = 'Wētā FX';
  } else if (s.includes('eyeline')) {
    badgeClass = 'studio-badge-eyeline';
    label = 'Eyeline VFX';
  } else if (s.includes('digital domain')) {
    badgeClass = 'studio-badge-dd';
    label = 'Digital Domain';
  } else if (s.includes('image engine')) {
    badgeClass = 'studio-badge-ie';
    label = 'Image Engine';
  } else if (s.includes('sony') || s.includes('imageworks')) {
    badgeClass = 'studio-badge-spi';
    label = 'Sony Imageworks';
  } else if (s.includes('fuse')) {
    badgeClass = 'studio-badge-fuse';
    label = 'FuseFX';
  }

  return `<span class="studio-badge ${badgeClass}">${label}</span>`;
}

let currentProjectsRendered = [];

function renderProjects(projectsList) {
  const container = document.getElementById("projects-grid");
  if (!container) return;

  currentProjectsRendered = projectsList;

  container.innerHTML = projectsList.map((p, pIdx) => {
    const rx = getReactionsForStill(p.id || `proj-${pIdx}`);
    return `
      <div class="project-card" id="card-${p.id}">
        <!-- Thumbnail Wrap (Click opens Lightbox) -->
        <div class="project-thumb-wrap" onclick="openProjectStill(${pIdx})">
          <img src="${p.image}" alt="${p.title}" class="project-thumb" loading="lazy" decoding="async" draggable="false">
          <span class="project-role-badge">${p.role}</span>
          ${getStudioBadgeHtml(p.studio)}
          <span class="project-expand-hint">
            <i data-lucide="maximize-2" style="width:12px;height:12px;"></i>
            Expand
          </span>
        </div>

        <!-- Project Body -->
        <div class="project-body">
          <div class="project-meta">${p.year} &bull; ${p.category} &bull; ${p.studio}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>

          <!-- Click-to-reveal contribution drawer -->
          <div class="project-contrib-drawer" id="drawer-${p.id}">
            <strong>Dan's Contribution:</strong> ${p.actualContribution || p.description}
            ${p.shotsDelivered ? `<div style="margin-top:6px;font-family:var(--font-mono);font-size:11px;color:var(--text-muted);">Scope: ${p.shotsDelivered}</div>` : ''}
          </div>

          <!-- Footer Row: Reactions + Contribution Toggle Button -->
          <div class="project-footer-row">
            <div class="kinetic-reactions">
              <button class="reaction-chip ${rx.userVoted.includes('heart') ? 'active voted' : ''}"
                      data-reaction-still="${p.id}"
                      data-reaction-type="heart"
                      onclick="handleReactionClick(event, '${p.id}', 'heart')"
                      title="${rx.userVoted.includes('heart') ? 'Already reacted with Love' : 'Love this project'}">
                <span>❤️</span>
                <span class="reaction-count">${rx.heart > 0 ? rx.heart : ''}</span>
              </button>
              <button class="reaction-chip ${rx.userVoted.includes('fire') ? 'active voted' : ''}"
                      data-reaction-still="${p.id}"
                      data-reaction-type="fire"
                      onclick="handleReactionClick(event, '${p.id}', 'fire')"
                      title="${rx.userVoted.includes('fire') ? 'Already reacted with Fire' : 'Fire work'}">
                <span>🔥</span>
                <span class="reaction-count">${rx.fire > 0 ? rx.fire : ''}</span>
              </button>
              <button class="reaction-chip ${rx.userVoted.includes('clap') ? 'active voted' : ''}"
                      data-reaction-still="${p.id}"
                      data-reaction-type="clap"
                      onclick="handleReactionClick(event, '${p.id}', 'clap')"
                      title="${rx.userVoted.includes('clap') ? 'Already reacted with Applaud' : 'Applaud'}">
                <span>👏</span>
                <span class="reaction-count">${rx.clap > 0 ? rx.clap : ''}</span>
              </button>
            </div>

            <button class="btn-reveal-contrib" onclick="toggleProjectContribution('${p.id}')">
              Details ▾
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");

  if (window.lucide) window.lucide.createIcons();
}

window.toggleProjectContribution = function(projectId) {
  const drawer = document.getElementById(`drawer-${projectId}`);
  if (drawer) {
    drawer.classList.toggle("open");
  }
};

function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-slate-900", "text-white", "font-bold");
        b.classList.add("bg-slate-100", "text-slate-700", "hover:bg-slate-200");
      });
      btn.classList.add("bg-slate-900", "text-white", "font-bold");
      btn.classList.remove("bg-slate-100", "text-slate-700", "hover:bg-slate-200");

      const category = btn.getAttribute("data-category");
      const allProjects = PORTFOLIO_DATA.projects;
      if (category === "All") {
        renderProjects(allProjects);
      } else {
        const catLower = category.toLowerCase();
        const filtered = allProjects.filter(p => {
          const matchCat = p.category && p.category.toLowerCase().includes(catLower);
          const matchTag = p.tags && p.tags.some(t => t.toLowerCase().includes(catLower));
          const matchBadge = p.badge && p.badge.toLowerCase().includes(catLower);
          const matchRole = p.role && p.role.toLowerCase().includes(catLower);
          if (catLower === "supervisor") {
            return matchRole || (p.tags && p.tags.some(t => t.toLowerCase().includes("supervisor")));
          }
          if (catLower === "deep") {
            return matchCat || matchTag || matchBadge || 
                   (p.tags && p.tags.some(t => t.toLowerCase().includes("stereo")));
          }
          return matchCat || matchTag || matchBadge;
        });
        renderProjects(filtered);
      }
    });
  });
}

/**
 * ============================================================================
 * PROFESSIONAL EXPERIENCE TIMELINE (Verbatim Resume)
 * ============================================================================
 */
let currentMobileJobIdx = 0;

function renderJobCardHtml(job, isMobile = false) {
  return `
    <div class="exp-card ${isMobile ? 'mobile-job-card' : ''}">
      <div class="exp-card-header">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span class="exp-card-company">${job.company}</span>
          ${getStudioBadgeHtml(job.company)}
        </div>
        <div class="exp-card-period">${job.period}</div>
      </div>
      <div class="exp-card-role">${job.role} &bull; ${job.location}</div>
      ${job.summary ? `<div class="exp-card-summary">${job.summary}</div>` : ""}
      ${job.featuredTrailer ? `
        <div style="margin: 12px 0;">
          <button onclick="switchToTab('trailer-contra')" class="btn-primary" style="font-size:11px;padding:6px 14px;">
            <i data-lucide="film" style="width:13px;height:13px;"></i>
            Watch Contra el Huracán Trailer (Eyeline VFX)
          </button>
        </div>
      ` : ""}
      ${job.bulletPoints && job.bulletPoints.length ? `
        <ul class="exp-card-highlights">
          ${job.bulletPoints.map(pt => `<li>${pt}</li>`).join("")}
        </ul>
      ` : ""}
    </div>
  `;
}

function renderExperience(experienceList) {
  const container = document.getElementById("experience-timeline");
  if (!container || !experienceList.length) return;

  const desktopCardsHtml = `
    <div class="desktop-exp-timeline">
      ${experienceList.map(job => renderJobCardHtml(job, false)).join("")}
    </div>
  `;

  const mobileCarouselHtml = `
    <div class="mobile-exp-carousel" id="mobile-exp-carousel">
      <div class="mobile-exp-header-controls">
        <button class="mobile-exp-btn" id="mobile-exp-prev" onclick="navigateMobileJob(-1)" aria-label="Previous role">
          <i data-lucide="chevron-left" style="width:14px;height:14px;"></i>
          <span>Prev Role</span>
        </button>
        <div class="mobile-exp-tracker" id="mobile-exp-tracker">
          Role <span id="mobile-exp-current">1</span> of <span>${experienceList.length}</span>
        </div>
        <button class="mobile-exp-btn" id="mobile-exp-next" onclick="navigateMobileJob(1)" aria-label="Next role">
          <span>Next Role</span>
          <i data-lucide="chevron-right" style="width:14px;height:14px;"></i>
        </button>
      </div>

      <div class="mobile-exp-viewport" id="mobile-exp-viewport">
        <div class="mobile-exp-card-wrap" id="mobile-exp-card-wrap">
          ${renderJobCardHtml(experienceList[currentMobileJobIdx], true)}
        </div>
      </div>

      <div class="gallery-swipe-hint-bar" style="margin-top:14px;">
        <span class="gallery-hint-text">
          <i data-lucide="move-horizontal" style="width:13px;height:13px;"></i>
          <span>Swipe left / right for next / previous role</span>
        </span>
      </div>
    </div>
  `;

  container.innerHTML = desktopCardsHtml + mobileCarouselHtml;

  initMobileJobSwipe(experienceList);
  updateMobileJobNav(experienceList);
  if (window.lucide) window.lucide.createIcons();
}

window.navigateMobileJob = function(delta) {
  const { experience } = PORTFOLIO_DATA;
  if (!experience || !experience.length) return;

  const nextIdx = currentMobileJobIdx + delta;
  if (nextIdx < 0 || nextIdx >= experience.length) return;

  currentMobileJobIdx = nextIdx;
  const wrap = document.getElementById("mobile-exp-card-wrap");
  if (wrap) {
    wrap.style.transition = "opacity 0.15s ease, transform 0.15s ease";
    wrap.style.opacity = "0";
    wrap.style.transform = delta > 0 ? "translateX(-20px)" : "translateX(20px)";

    setTimeout(() => {
      wrap.innerHTML = renderJobCardHtml(experience[currentMobileJobIdx], true);
      wrap.style.transform = delta > 0 ? "translateX(20px)" : "translateX(-20px)";
      requestAnimationFrame(() => {
        wrap.style.transition = "opacity 0.22s ease, transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)";
        wrap.style.opacity = "1";
        wrap.style.transform = "translateX(0)";
        if (window.lucide) window.lucide.createIcons();
      });
    }, 150);
  }

  updateMobileJobNav(experience);
};

function updateMobileJobNav(experience) {
  const prevBtn = document.getElementById("mobile-exp-prev");
  const nextBtn = document.getElementById("mobile-exp-next");
  const curSpan = document.getElementById("mobile-exp-current");

  if (curSpan) curSpan.textContent = currentMobileJobIdx + 1;
  if (prevBtn) {
    const isFirst = currentMobileJobIdx === 0;
    prevBtn.disabled = isFirst;
    prevBtn.style.opacity = isFirst ? "0.35" : "1";
    prevBtn.style.pointerEvents = isFirst ? "none" : "auto";
  }
  if (nextBtn) {
    const isLast = currentMobileJobIdx === experience.length - 1;
    nextBtn.disabled = isLast;
    nextBtn.style.opacity = isLast ? "0.35" : "1";
    nextBtn.style.pointerEvents = isLast ? "none" : "auto";
  }
}

function initMobileJobSwipe(experience) {
  const viewport = document.getElementById("mobile-exp-viewport");
  if (!viewport) return;

  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;
  let isSwiping = false;

  viewport.addEventListener("touchstart", (e) => {
    if (!e.touches.length) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    distX = 0;
    distY = 0;
    isSwiping = true;
  }, { passive: true });

  viewport.addEventListener("touchmove", (e) => {
    if (!isSwiping || !e.touches.length) return;
    distX = e.touches[0].clientX - startX;
    distY = e.touches[0].clientY - startY;
  }, { passive: true });

  viewport.addEventListener("touchend", () => {
    if (!isSwiping) return;
    isSwiping = false;
    if (Math.abs(distX) > 40 && Math.abs(distX) > Math.abs(distY) * 1.2) {
      if (distX < 0) {
        navigateMobileJob(1);
      } else {
        navigateMobileJob(-1);
      }
    }
  });

  let isMouseDown = false;
  let mouseStartX = 0;
  viewport.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    mouseStartX = e.clientX;
  });
  window.addEventListener("mouseup", (e) => {
    if (!isMouseDown) return;
    isMouseDown = false;
    const diff = e.clientX - mouseStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) navigateMobileJob(1);
      else navigateMobileJob(-1);
    }
  });
}

/**
 * ============================================================================
 * INTERACTIVE RÉSUMÉ MODAL & PRINT ENGINE
 * Exact Verbatim Document from Dan Rubin's 3-Page Uploaded Resume PDF
 * ============================================================================
 */
let activeResumeTab = "pdf";

function initResumeModal() {
  // Performance optimization: PDF iframe is lazy-loaded on demand when openResumeModal() is clicked
}

window.openResumeModal = function() {
  const modal = document.getElementById("resume-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("modal-open");
  renderResumeDocument();
  if (window.lucide) window.lucide.createIcons();
};

window.closeResumeModal = function() {
  const modal = document.getElementById("resume-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("modal-open");
};

function renderResumeDocument() {
  const container = document.getElementById("resume-modal-content");
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;align-items:center;justify-content:space-between;background:var(--bg-secondary);border:1px solid var(--border-light);padding:12px 16px;border-radius:8px;font-size:12px;color:var(--text-main);flex-wrap:wrap;gap:10px;">
        <div style="display:flex;align-items:center;gap:8px;">
          <i data-lucide="file-check" style="width:16px;height:16px;color:#0284c7;"></i>
          <span><strong>Original PDF Intact:</strong> 3 Pages &bull; Cover Letter &bull; 25-Year Experience &bull; Awards &bull; Notables</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <a href="Dan_Rubin_Resume.pdf" download="Dan_Rubin_Resume.pdf" class="btn-primary" style="padding:6px 14px;font-size:11px;display:inline-flex;align-items:center;gap:6px;" title="Download Original PDF (3 Pages)">
            <i data-lucide="download" style="width:13px;height:13px;"></i>
            Download Original PDF
          </a>
          <a href="Dan_Rubin_Resume.pdf" target="_blank" rel="noopener" class="btn-outline" style="padding:6px 12px;font-size:11px;display:inline-flex;align-items:center;gap:4px;" title="Open in New Window / Fullscreen">
            <i data-lucide="external-link" style="width:13px;height:13px;"></i>
            Open Fullscreen
          </a>
        </div>
      </div>
      <div class="resume-pdf-frame-wrap">
        <iframe src="Dan_Rubin_Resume.pdf#view=FitH" class="resume-pdf-frame" title="Dan Rubin Original Résumé PDF (3 Pages Intact)"></iframe>
      </div>
    </div>
  `;
  if (window.lucide) window.lucide.createIcons();
}

function populatePrintContainer() {
  const printContainer = document.getElementById("printable-resume-container");
  if (!printContainer) return;

  const { personal, experience, educationAndCerts, awards, notables } = PORTFOLIO_DATA;

  printContainer.innerHTML = `
    <div style="background:#ffffff;color:#111827;font-family:Arial,sans-serif;padding:12mm 15mm;font-size:10pt;line-height:1.45;">
      <div style="display:flex;justify-content:space-between;border-bottom:2pt solid #111827;padding-bottom:8pt;margin-bottom:12pt;">
        <div>
          <h1 style="font-size:18pt;font-weight:900;color:#111827;margin:0 0 2pt;text-transform:uppercase;">${personal.fullName}</h1>
          <div style="font-size:10pt;font-weight:700;color:#374151;">Compositing Supervisor and Artist</div>
        </div>
        <div style="text-align:right;font-size:8.5pt;font-family:monospace;color:#374151;line-height:1.45;">
          <div style="font-weight:700;color:#111827;">${personal.phone}</div>
          <div>${personal.email}</div>
          <div>Vimeo: https://vimeo.com/showcase/11081895 (pw: password)</div>
          <div>LinkedIn: https://www.linkedin.com/in/dan-rubin-8371032/</div>
        </div>
      </div>

      <div style="font-size:10pt;font-weight:800;text-transform:uppercase;border-bottom:1pt solid #111827;margin-bottom:6pt;padding-bottom:2pt;">Compositing Experience</div>
      <div style="display:flex;flex-direction:column;gap:7pt;">
        ${experience.map(job => `
          <div>
            <div style="display:flex;justify-content:space-between;font-size:9.5pt;">
              <div>
                <strong>${job.company}</strong> &mdash; ${job.role}
              </div>
              <div style="font-family:monospace;font-size:8.5pt;color:#6b7280;">${job.period}</div>
            </div>
            ${job.bulletPoints && job.bulletPoints.length ? `
              <ul style="margin:2pt 0 0;padding-left:14pt;font-size:8.5pt;color:#374151;line-height:1.4;">
                ${job.bulletPoints.map(bp => `<li>${bp}</li>`).join("")}
              </ul>
            ` : (job.summary ? `<div style="font-size:8.5pt;color:#4b5563;margin-top:1pt;">${job.summary}</div>` : '')}
          </div>
        `).join("")}
      </div>

      <div style="font-size:10pt;font-weight:800;text-transform:uppercase;border-bottom:1pt solid #111827;margin:12pt 0 4pt;padding-bottom:2pt;">Education</div>
      <div style="font-size:9pt;color:#374151;">
        ${educationAndCerts.map(e => `
          <div style="display:flex;justify-content:space-between;">
            <div><strong>${e.institution}</strong> &mdash; ${e.degree}</div>
            <div style="font-family:monospace;font-size:8.5pt;color:#6b7280;">${e.year}</div>
          </div>
        `).join("")}
      </div>

      <div style="font-size:10pt;font-weight:800;text-transform:uppercase;border-bottom:1pt solid #111827;margin:12pt 0 4pt;padding-bottom:2pt;">Awards and Honors</div>
      <div style="display:flex;flex-direction:column;gap:3pt;font-size:9pt;color:#374151;">
        ${awards.map(a => `
          <div><strong>${a.year} ${a.title}</strong> &mdash; ${a.show} (${a.category})</div>
        `).join("")}
      </div>

      <div style="font-size:10pt;font-weight:800;text-transform:uppercase;border-bottom:1pt solid #111827;margin:12pt 0 4pt;padding-bottom:2pt;">Notables</div>
      <ul style="margin:4pt 0 0;padding-left:14pt;font-size:8.5pt;color:#374151;line-height:1.45;">
        ${notables.map(n => `<li>${n}</li>`).join("")}
      </ul>
    </div>
  `;
}

window.triggerPrintResume = function() {
  const link = document.createElement("a");
  link.href = "Dan_Rubin_Resume.pdf";
  link.download = "Dan_Rubin_Resume.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Downloading Dan Rubin's original unaugmented résumé PDF...");
};

window.copyResumeText = function() {
  const text = getFullVerbatimResumeText();
  copyToClipboard(text, "Dan Rubin Résumé");
};

function getFullVerbatimResumeText() {
  const { personal, experience, educationAndCerts, awards, notables } = PORTFOLIO_DATA;
  let lines = [];

  lines.push(`Dan Rubin                                 ${personal.phone}`);
  lines.push(`Compositing Supervisor and Artist                 ${personal.email}`);
  lines.push(`${personal.vimeoUrl}.  password: password`);
  lines.push(`${personal.linkedinUrl}`);
  lines.push("");
  lines.push(personal.coverLetter);
  lines.push("");
  lines.push("================================================================================");
  lines.push("");
  lines.push(`Dan Rubin                                 ${personal.phone}`);
  lines.push(`Compositing Supervisor and Artist           ${personal.email}`);
  lines.push("Compositing Experience");
  lines.push("");

  experience.forEach(job => {
    lines.push(`${job.company} - ${job.role}                                    ${job.period}`);
    if (job.bulletPoints && job.bulletPoints.length) {
      job.bulletPoints.forEach(bp => lines.push(bp));
    } else if (job.summary) {
      lines.push(job.summary);
    }
    lines.push("");
  });

  lines.push("Education");
  educationAndCerts.forEach(e => {
    lines.push(`${e.institution}                              ${e.year}`);
    lines.push(e.degree);
  });
  lines.push("");

  lines.push("Awards and Honors");
  awards.forEach(a => {
    lines.push(`${a.year} ${a.title}                                            ${a.show} - ${a.category}`);
  });
  lines.push("");

  lines.push("Notables");
  notables.forEach(n => lines.push(n));

  return lines.join("\n");
}

/**
 * ============================================================================
 * AI NOTES & ARCHIVE MODAL
 * ============================================================================
 */
function initAiNotes() {
  const notes = PORTFOLIO_DATA.aiNotes || [];
  const featured = notes.filter(n => n.featured);
  const container = document.getElementById("featured-notes-grid");
  if (!container) return;

  container.innerHTML = featured.map(note => `
    <article class="note-card">
      <div class="note-date">${note.date} &bull; ${note.sourceName}</div>
      <h3 class="note-title">${note.headline}</h3>
      <p class="note-desc">${note.summary}</p>
      <div style="background:var(--bg-secondary);border-left:3px solid var(--accent);padding:10px 14px;border-radius:0 6px 6px 0;font-size:12px;color:var(--text-body);line-height:1.6;margin-top:12px;">
        <strong style="color:var(--text-main);display:block;font-size:10px;font-family:var(--font-mono);text-transform:uppercase;margin-bottom:2px;">Dan's Take:</strong>
        ${note.commentary}
      </div>
    </article>
  `).join("");
}

window.openNotesArchiveModal = function() {
  const modal = document.getElementById("ai-notes-archive-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.classList.add("modal-open");
  renderArchiveList(PORTFOLIO_DATA.aiNotes || []);

  const searchInput = document.getElementById("archive-search-input");
  if (searchInput) {
    searchInput.value = "";
    searchInput.oninput = (e) => {
      const q = e.target.value.toLowerCase();
      const filtered = (PORTFOLIO_DATA.aiNotes || []).filter(n =>
        n.headline.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.commentary.toLowerCase().includes(q) ||
        (n.tags && n.tags.some(t => t.toLowerCase().includes(q)))
      );
      renderArchiveList(filtered);
    };
  }
};

window.closeNotesArchiveModal = function() {
  const modal = document.getElementById("ai-notes-archive-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.classList.remove("modal-open");
};

function renderArchiveList(notes) {
  const list = document.getElementById("archive-notes-list");
  if (!list) return;

  if (!notes.length) {
    list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-muted);font-family:var(--font-mono);">No entries match your search.</div>`;
    return;
  }

  list.innerHTML = notes.map(n => `
    <article style="background:#ffffff;border:1px solid var(--border-light);border-radius:8px;padding:20px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:11px;font-family:var(--font-mono);color:var(--text-muted);">
        <span>${n.date} &bull; ${n.sourceName}</span>
        <div style="display:flex;gap:4px;">
          ${(n.tags || []).map(t => `<span style="background:var(--bg-secondary);border:1px solid var(--border-light);padding:2px 6px;border-radius:3px;">${t}</span>`).join("")}
        </div>
      </div>
      <h4 style="font-size:15px;font-weight:700;color:var(--text-main);margin:0 0 8px;">${n.headline}</h4>
      <p style="font-size:12px;color:var(--text-body);margin:0 0 12px;line-height:1.6;">${n.summary}</p>
      <div style="background:var(--bg-secondary);border-left:3px solid var(--accent);padding:10px 14px;border-radius:0 6px 6px 0;font-size:12px;color:var(--text-body);line-height:1.6;">
        <strong style="color:var(--text-main);display:block;font-size:10px;font-family:var(--font-mono);text-transform:uppercase;margin-bottom:2px;">Dan's Take:</strong>
        ${n.commentary}
      </div>
    </article>
  `).join("");
}

/**
 * ============================================================================
 * INQUIRY FORM
 * ============================================================================
 */
function initInquiryForm() {
  const form = document.getElementById("inquiry-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("form-name").value;
    const subjectType = document.getElementById("form-subject").value;
    const message = document.getElementById("form-message").value;

    const subject = encodeURIComponent(`[Portfolio Inquiry] ${subjectType} - from ${name}`);
    const body = encodeURIComponent(`Hi Dan,\n\n${message}\n\nBest regards,\n${name}`);
    const mailto = `mailto:${PORTFOLIO_DATA.personal.email}?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    showToast("Opening pre-filled draft in your email client...");
  });
}

/**
 * ============================================================================
 * DIGITAL ASSET PROTECTION & SECURITY ENGINE
 * - Hardens HTML5 video against right-click context menu, stream ripping, PIP
 * - Prevents right-click and saving of proprietary VFX stills and production frames
 * - Disables image drag-and-drop extraction across all devices
 * - Intercepts save shortcuts (Ctrl+S / Cmd+S)
 * - Guards against unauthorized client-side text editing or tampering
 * ============================================================================
 */
function initSecurityProtection() {
  // Prevent contextmenu (right-click) on media assets
  document.addEventListener("contextmenu", (e) => {
    const mediaEl = e.target.closest("img, video, .lightbox-img-frame, .project-thumb, .carousel-image, .showreel-player, #top-banner-track, .lightbox-shield");
    if (mediaEl) {
      e.preventDefault();
      showToast("© Dan Rubin • Media downloading is restricted to protect proprietary studio assets.");
    }
  });

  // Prevent dragging of any image or video asset
  document.addEventListener("dragstart", (e) => {
    if (e.target.nodeName === "IMG" || e.target.nodeName === "VIDEO" || e.target.closest("img, video")) {
      e.preventDefault();
      return false;
    }
  });

  // Intercept Save-Page (Ctrl+S / Cmd+S)
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
      e.preventDefault();
      showToast("Saving is disabled • Portfolio content is copyright protected.");
    }
  });

  // Protect all <img> tags explicitly with draggable=false
  document.querySelectorAll("img").forEach(img => {
    img.setAttribute("draggable", "false");
  });

  // Protect all video elements
  document.querySelectorAll("video").forEach(v => {
    v.setAttribute("controlsList", "nodownload noplaybackrate nofullscreen");
    v.setAttribute("disablePictureInPicture", "true");
    v.addEventListener("contextmenu", (e) => e.preventDefault());
  });
}

/**
 * ============================================================================
 * UTILITY HELPERS
 * ============================================================================
 */
window.copyContactInfoAndIntro = function() {
  const { personal } = PORTFOLIO_DATA;
  const resumeUrl = (typeof window !== "undefined" && window.location.protocol.startsWith("http") && !window.location.hostname.includes("localhost") && !window.location.hostname.includes("127.0.0.1"))
    ? new URL("Dan_Rubin_Resume.pdf", window.location.href).href
    : (personal.resumeUrl || "https://danrubinvfx.github.io/portfolio/Dan_Rubin_Resume.pdf");

  const introText = `${personal.fullName} — ${personal.title} • ${personal.subtitle}

${personal.bio}

Contact & Portfolio:
• Email: ${personal.email}
• Résumé: ${resumeUrl}
• LinkedIn: ${personal.linkedinUrl}
• Vimeo Showcase: ${personal.vimeoUrl} (password: ${personal.vimeoPassword})
• IMDb: ${personal.imdbUrl}
• Location: ${personal.location}`;

  copyToClipboard(introText, "Contact info & introduction");
};

window.copyToClipboard = function(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label || 'Text'} copied to clipboard!`);
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
};

function fallbackCopy(text, label) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  ta.style.top = "0";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand("copy");
    showToast(`${label || "Text"} copied to clipboard!`);
  } catch (err) {
    showToast("Unable to copy automatically. Please copy manually.");
  }
  document.body.removeChild(ta);
}

let toastTimeoutId = null;
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:#22c55e;"><polyline points="20 6 9 17 4 12"></polyline></svg> <span>${message}</span>`;
  toast.style.opacity = "1";
  toast.style.transform = "translateX(-50%) translateY(0)";

  if (toastTimeoutId) clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(12px)";
  }, 3200);
}

function setText(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.textContent = val;
}

function setHref(id, val) {
  const el = document.getElementById(id);
  if (el && val) el.setAttribute("href", val);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
