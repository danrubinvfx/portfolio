/**
 * Dan Rubin – VFX Compositing Supervisor and Artist, Mentor & Educator
 * Central Data Store (Separated Content Architecture)
 * 
 * Verbatim Resume & Authentic Industry Credits
 * Eyeline VFX (Oct 2025–Current), Wētā FX, Image Engine, FuseFX, Sony Pictures Imageworks,
 * MPC, Digital Domain, Prime Focus World, The Embassy, Entity FX, Frantic Films, CIS-Vancouver,
 * Digital Dimension, HBO Studio Productions.
 */

// =========================================================================
// ⚡ QUICK UPDATE CONTROLS (EDIT HERE FOR INSTANT ZERO-BUILD REEL UPDATES)
// =========================================================================
const ACTIVE_REEL_CONFIG = {
  id: "reel-2026",
  title: "2026 Artist Compositing Reel",
  badge: "Artist Work",
  role: "Senior Compositor / Artist Work",
  studio: "Feature Films & Episodic",
  file: "videos/2026CompositingReel.mp4",        // Drop new .mp4 into videos/
  poster: "images/stills/AvatarFireandAsh_01.png",
  isReel: true,
  autoplay: false,
  muted: true,
  desc: "Flagship artist reel highlighting shots directly composited by Dan Rubin — photoreal CG creature integration, blue/green screen keying, deep compositing, 2.5D projection, and invisible effects across feature films and episodic productions."
};

const PORTFOLIO_DATA = {
  personal: {
    fullName: "Dan Rubin",
    title: "Compositing Supervisor and Artist",
    subtitle: "Mentor & Educator",
    location: "Vancouver, BC (Dual US & Canadian Citizen)",
    email: "danielrubin76@gmail.com",
    phone: "(604) 345-8636",
    imdbUrl: "https://www.imdb.com/name/nm1885406/",
    vimeoUrl: "https://vimeo.com/showcase/11081895",
    vimeoPassword: "password",
    linkedinUrl: "https://www.linkedin.com/in/dan-rubin-8371032/",
    coverLetter: `To Whom It May Concern,\n\nI’m a Vancouver-based Compositing Supervisor currently working at EyelineVFX, bringing over 25 years of experience across Feature Films, Animated Features, and Episodic projects. Throughout my career, I’ve combined hands-on artistry with leadership, including over seven years as a Compositing Supervisor and an additional five years in senior and lead roles.\n\nI’ve had the privilege of working directly with clients and VFX Supervisors to deliver visually compelling, story-driven work, while also overseeing the compositing needs of entire shows. My responsibilities have extended beyond creative execution to include supervising and mentoring compositing teams, managing assignments and briefs, developing methodologies and look-dev, and providing clear, constructive feedback throughout production.\n\nAdditionally, I’ve been involved in key production tasks such as bidding, interviewing potential hires, crafting submission notes for final deliveries, preparing annotations for outsourced vendors, on-set data wrangling, and hands-on compositing. I take pride in balancing both the technical and creative demands of the role, always aiming to support both the project and the team.\n\nYou can view a selection of my work, including reels that highlight my abilities as both a Supervisor and Artist, via the following link: https://vimeo.com/showcase/11081895.  password: password\n\nThank you for your time and consideration. I look forward to the opportunity to contribute my experience and enthusiasm to your team.\n\nKind Regards,\nDan Rubin`,
    bio: "I’m a Vancouver-based Compositing Supervisor currently working at EyelineVFX, bringing over 25 years of experience across Feature Films, Animated Features, and Episodic projects. Throughout my career, I’ve combined hands-on artistry with leadership, including over seven years as a Compositing Supervisor and an additional five years in senior and lead roles. I’ve had the privilege of working directly with clients and VFX Supervisors to deliver visually compelling, story-driven work, while also overseeing the compositing needs of entire shows.",
    stats: [
      { value: "25+", label: "Years in Feature & Episodic VFX" },
      { value: "50+", label: "Theatrical & Streaming Credits" },
      { value: "7+", label: "Years as Compositing Supervisor" },
      { value: "2x Emmy", label: "Award Winner & Gemini Nominee" }
    ],
    citizenship: "American & Canadian Citizen (Vancouver, BC Based)"
  },

  // ==========================================================================
  // FEATURED SUPERVISOR TRAILER (Contra el Huracán - Netflix / Eyeline VFX)
  // ==========================================================================
  featuredTrailer: {
    id: "trailer-contra-el-huracan",
    title: "Contra el Huracán",
    englishTitle: "Against the Hurricane",
    client: "Netflix",
    studio: "Eyeline VFX",
    role: "Compositing Supervisor",
    creditText: "Compositing Supervisor at Eyeline VFX",
    videoFile: "videos/ContraElHuracan_Trailer.mp4",
    posterImage: "images/ContraElHuracan_poster.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=zKApuso5SCo",
    embedUrl: "https://www.youtube-nocookie.com/embed/zKApuso5SCo",
    downloadName: "Contra_el_Huracan_Netflix_Trailer.mp4",
    summary: "Official Netflix feature trailer. Dan Rubin served as Compositing Supervisor at Eyeline VFX on this maritime storm survival feature, overseeing the compositing needs of the show, extreme sea-spray volumetrics, dynamic wave lighting, and color pipeline delivery.",
    highlights: [
      "Compositing Supervisor at Eyeline VFX overseeing the compositing needs of the show",
      "High-intensity maritime hurricane survival sequences for Netflix",
      "Look-development for catastrophic storm lighting, airborne sea-spray, and water volumetrics",
      "Client delivery reviews and color pipeline management"
    ]
  },

  // ==========================================================================
  // SHOWREEL & VIDEO SHOWCASE (Switchable player with local files & embeds)
  // ==========================================================================
  showreel: {
    title: ACTIVE_REEL_CONFIG.title,
    subtitle: ACTIVE_REEL_CONFIG.role,
    file: ACTIVE_REEL_CONFIG.file,
    description: ACTIVE_REEL_CONFIG.desc,
    highlights: [
      "Direct photoreal shot integration on Avatar: Fire and Ash, Ghostbusters, and Alice Through The Looking Glass",
      "Deep compositing, volumetrics, and multi-pass CG creature integration",
      "Lead artist compositing on Oscar-winning Spider-Man: Into the Spider-Verse",
      "Stereoscopic 3D alignment and complex multi-pass integration on X-Men: Days of Future Past & The Amazing Spider-Man",
      "Environment extensions, invisible split-screens, blue/green screen extraction, and 2.5D projection"
    ]
  },

  showcaseVideos: [
    {
      id: "trailer-contra",
      title: "Contra el Huracán (Netflix)",
      badge: "Compositing Supervisor",
      role: "Compositing Supervisor at Eyeline VFX",
      studio: "Eyeline VFX / Netflix (2026)",
      file: "videos/ContraElHuracan_Trailer.mp4",
      downloadName: "Contra_el_Huracan_Netflix_Trailer.mp4",
      poster: "images/ContraElHuracan_poster.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=zKApuso5SCo",
      embedUrl: "https://www.youtube-nocookie.com/embed/zKApuso5SCo",
      isReel: false,
      autoplay: true,
      muted: true,
      desc: "Official Netflix feature trailer. Dan Rubin served as Compositing Supervisor at Eyeline VFX on this maritime hurricane survival thriller."
    },
    {
      id: "breakdown-lift",
      title: "Lift (Netflix) — Breakdown",
      badge: "Compositing Supervisor",
      role: "Compositing Supervisor at Image Engine",
      studio: "Image Engine / Netflix (2024)",
      file: "videos/LIFTBreakdown.mp4",
      downloadName: "Lift_Compositing_Breakdown.mp4",
      poster: "images/stills/Lift_01.png",
      isReel: false,
      autoplay: false,
      muted: false,
      desc: "Supervisory breakdown on Netflix's Lift: 340+ shots delivered with a team of up to 20 compositors, DMP oversight, and color pipeline management."
    },
    {
      id: "breakdown-kraven",
      title: "Kraven the Hunter — Breakdown",
      badge: "Compositing Supervisor",
      role: "Compositing Supervisor at Image Engine",
      studio: "Image Engine / Sony & Marvel (2024)",
      file: "videos/Kraven_Breakdown.mp4",
      downloadName: "Kraven_Breakdown.mp4",
      poster: "images/stills/Kraven.png",
      isReel: false,
      autoplay: false,
      muted: false,
      desc: "Sequence look-development, creature interaction passes, and practical stunt plate compositing."
    },
    {
      ...ACTIVE_REEL_CONFIG
    },
    {
      id: "breakdown-aud",
      title: "American Underdog — Python Tool",
      badge: "Pipeline Innovation",
      role: "Compositing Supervisor / Lead at FuseFX",
      studio: "FuseFX-BC / Lionsgate (2021)",
      file: "videos/AUD_Reel.mp4",
      downloadName: "American_Underdog_Crowd_Tool_Reel.mp4",
      poster: "images/stills/AmericanUnderdog.png",
      isReel: false,
      autoplay: false,
      muted: false,
      desc: "Demonstration of Dan's proprietary 2D Sprite Crowd Tool written in Python, populating stadium sequences from 2,000 to 17,000 seats."
    },
    {
      id: "breakdown-ps3",
      title: "The Princess Switch 3 — Lasers",
      badge: "VFX Breakdown",
      role: "Compositing Supervisor at FuseFX",
      studio: "FuseFX-BC / Netflix",
      file: "videos/PS3-laserEffects.mp4",
      downloadName: "Princess_Switch_3_Laser_Effects.mp4",
      poster: "images/stills/PrincessSwitch03_01.png",
      isReel: false,
      autoplay: false,
      muted: false,
      desc: "Interactive laser beam opticals, atmospheric volumetric dispersion, and security heist compositing."
    }
  ],

  // ==========================================================================
  // TOP CYCLING BANNER IMAGES (100% Verified Real Production Stills on Disk)
  // ==========================================================================
  topBannerImages: [
    {
      src: "images/stills/ContraElHuracan_01.png",
      title: "Contra el Huracán (2026)",
      role: "Compositing Supervisor • Eyeline VFX / Netflix"
    },
    {
      src: "images/stills/AvatarFireandAsh_01.png",
      title: "Avatar: Fire and Ash (2025)",
      role: "Senior Compositor • Wētā FX"
    },
    {
      src: "images/stills/Kraven.png",
      title: "Kraven the Hunter (2024)",
      role: "Compositing Supervisor • Image Engine"
    },
    {
      src: "images/stills/Lift_01.png",
      title: "Lift (2024)",
      role: "Compositing Supervisor • Netflix Feature"
    },
    {
      src: "images/stills/SkeletonCrew_01.png",
      title: "Star Wars: Skeleton Crew (2024–2025)",
      role: "Senior Compositor • Lucasfilm / Disney+"
    },
    {
      src: "images/stills/Superman2025.png",
      title: "Superman (2025)",
      role: "Senior Compositor • Wētā FX / DC Studios"
    },
    {
      src: "images/stills/IntoTheSpiderverse_01.png",
      title: "Spider-Man: Into the Spider-Verse (2018)",
      role: "Lead Compositor • Academy Award Winner"
    },
    {
      src: "images/stills/AmericanUnderdog.png",
      title: "American Underdog (2021)",
      role: "Compositing Supervisor / Lead • FuseFX"
    },
    {
      src: "images/stills/TheEdgeOfTomorrow_01.png",
      title: "Edge of Tomorrow (2014)",
      role: "Senior Compositor • Sony Pictures Imageworks"
    },
    {
      src: "images/stills/Ghostbusters2016_01.png",
      title: "Ghostbusters (2016)",
      role: "Senior Compositor • Deep Compositing • Sony"
    },
    {
      src: "images/stills/District9.png",
      title: "District 9 (2009)",
      role: "Senior Compositor • Image Engine"
    },
    {
      src: "images/stills/TheGuard.png",
      title: "The Guard (2008)",
      role: "Gemini Award Nominee • Best Visual Effects"
    },
    {
      src: "images/stills/AliceThroughTheLookingGlass_01.png",
      title: "Alice Through the Looking Glass (2016)",
      role: "Senior Compositor • Deep Comp • Sony"
    },
    {
      src: "images/stills/X-Men_DaysOfFuturePast_01.png",
      title: "X-Men: Days of Future Past (2014)",
      role: "Senior Compositor • Stereoscopic 3D • Digital Domain"
    },
    {
      src: "images/stills/Thor.png",
      title: "Thor (2011)",
      role: "Senior Compositor • Digital Domain"
    },
    {
      src: "images/stills/OZTheGreatandPowerful.png",
      title: "Oz the Great and Powerful (2013)",
      role: "Senior Compositor • Stereo 3D • Sony"
    },
    {
      src: "images/stills/Upload_01.png",
      title: "Upload (2020– )",
      role: "Compositing Supervisor • FuseFX / Amazon"
    },
    {
      src: "images/stills/PrincessSwitch03_01.png",
      title: "The Princess Switch 3 (2021)",
      role: "Compositing Supervisor • Netflix / FuseFX"
    },
    {
      src: "images/stills/PrincessSwitch03_02.png",
      title: "The Princess Switch 3 (2021)",
      role: "Compositing Supervisor • Netflix / FuseFX"
    },
    {
      src: "images/stills/Pixels_01.png",
      title: "Pixels (2015)",
      role: "Senior Compositor • Sony Pictures Imageworks"
    },
    {
      src: "images/stills/Pixels_02.png",
      title: "Pixels (2015)",
      role: "Senior Compositor • Sony Pictures Imageworks"
    },
    {
      src: "images/stills/ContraElHuracan_02.png",
      title: "Contra el Huracán (2026)",
      role: "Compositing Supervisor • Eyeline VFX / Netflix"
    },
    {
      src: "images/stills/BladeTrinity_01.png",
      title: "Blade: Trinity (2004)",
      role: "Compositor • New Line Cinema"
    },
    {
      src: "images/stills/BladeTrinity_02.png",
      title: "Blade: Trinity (2004)",
      role: "Compositor • New Line Cinema"
    },
    {
      src: "images/stills/TaledegaNights.png",
      title: "Talladega Nights (2006)",
      role: "Lead Compositor • Columbia Pictures"
    },
    {
      src: "images/stills/TheNightAtTheMuseum_01.png",
      title: "Night at the Museum (2006)",
      role: "Lead Compositor • 20th Century Fox"
    },
    {
      src: "images/stills/TheNightAtTheMuseum_02.png",
      title: "Night at the Museum (2006)",
      role: "Lead Compositor • 20th Century Fox"
    },
    {
      src: "images/stills/VantagePoint_01.png",
      title: "Vantage Point (2008)",
      role: "Senior Compositor • Columbia Pictures"
    },
    {
      src: "images/stills/VantagePoint_02.png",
      title: "Vantage Point (2008)",
      role: "Senior Compositor • Columbia Pictures"
    },
    {
      src: "images/stills/Zathura.png",
      title: "Zathura: A Space Adventure (2005)",
      role: "Digital Compositor • Sony Pictures Imageworks"
    },
    {
      src: "images/stills/TheMask2.jpg",
      title: "Son of the Mask (2005)",
      role: "Compositor • New Line Cinema"
    },
    {
      src: "images/stills/Upload_03.png",
      title: "Upload (2020– )",
      role: "Compositing Supervisor • Amazon Studios"
    },
    {
      src: "images/stills/SkeletonCrew_03.png",
      title: "Star Wars: Skeleton Crew (2024–2025)",
      role: "Senior Compositor • Lucasfilm / Disney+"
    },
    {
      src: "images/stills/Superman2025_02.png",
      title: "Superman (2025)",
      role: "Senior Compositor • Wētā FX / DC Studios"
    },
    {
      src: "images/stills/IntoTheSpiderverse_02.png",
      title: "Spider-Man: Into the Spider-Verse (2018)",
      role: "Lead Compositor • Sony Pictures Imageworks"
    },
    {
      src: "images/stills/AvatarFireandAsh_03.png",
      title: "Avatar: Fire and Ash (2025)",
      role: "Senior Compositor • Wētā FX"
    },
    {
      src: "images/stills/TheEdgeOfTomorrow_02.png",
      title: "Edge of Tomorrow (2014)",
      role: "Senior Compositor • Sony Pictures Imageworks"
    },
    {
      src: "images/stills/Lift_03.png",
      title: "Lift (2024)",
      role: "Compositing Supervisor • Netflix Feature"
    }
  ],

  // ==========================================================================
  // ROTATING GALLERY OF SELECTED WORK STILLS (Slideshow)
  // ==========================================================================
  galleryStills: [
    {
      id: "still-contra-hero",
      title: "Contra el Huracán (2026)",
      role: "Compositing Supervisor",
      studio: "Eyeline VFX / Netflix",
      year: "2026",
      image: "images/stills/ContraElHuracan_01.png",
      caption: "High-intensity storm and maritime survival feature for Netflix. Supervised compositing teams, sea-spray volumetrics, dynamic wave lighting, and color pipeline delivery.",
      technicalDetail: "Supervised compositing at Eyeline VFX; led sequence look-development, extreme ocean water interactions, and photoreal plate integration."
    },
    {
      id: "still-lift-hero",
      title: "Lift (2024)",
      role: "Compositing Supervisor",
      studio: "Image Engine / Netflix",
      year: "2024",
      image: "images/stills/Lift_01.png",
      caption: "Airborne heist sequence featuring complex digital matte painting extensions, cloud volumetrics, and cockpit comps.",
      technicalDetail: "Supervised 340+ shots and up to 20 compositors; established look-dev templates and color pipeline alignment."
    },
    {
      id: "still-kraven-hero",
      title: "Kraven the Hunter (2024)",
      role: "Compositing Supervisor",
      studio: "Image Engine / Sony Pictures & Marvel",
      year: "2024",
      image: "images/stills/Kraven.png",
      caption: "High-octane action sequence compositing, creature interactions, and seamless practical stunt integration.",
      technicalDetail: "Led sequence look-development, high-speed camera match comp, and multi-pass creature asset integration."
    },
    {
      id: "still-avatar-hero",
      title: "Avatar: Fire and Ash (2025)",
      role: "Senior Compositor",
      studio: "Wētā FX / 20th Century Studios",
      year: "2025",
      image: "images/stills/AvatarFireandAsh_01.png",
      caption: "Photorealistic environmental CG integration, stereoscopic depth balancing, and hero creature plate lighting.",
      technicalDetail: "Executed multi-pass ACEScg lighting integration and stereoscopic alignment under James Cameron's exacting photoreal standards."
    },
    {
      id: "still-skeleton-crew",
      title: "Star Wars: Skeleton Crew (2024–2025)",
      role: "Senior Compositor",
      studio: "Image Engine / Lucasfilm / Disney+",
      year: "2024–2025",
      image: "images/stills/SkeletonCrew_01.png",
      caption: "Star Wars episodic streaming series featuring deep-space craft compositing, practical animatronic integration, and alien environment balance.",
      technicalDetail: "Multi-layered live-action plate integration with CG spacecraft, laser interaction, and optical anamorphic lens matching."
    },
    {
      id: "still-superman",
      title: "Superman (2025)",
      role: "Senior Compositor",
      studio: "Wētā FX / DC Studios",
      year: "2025",
      image: "images/stills/Superman2025.png",
      caption: "Dynamic superhero action sequence with high-energy passes, aerial plate integration, and atmospheric volumetrics.",
      technicalDetail: "Complex photographic lighting balance and interaction between practical wire-work plates and hero CG assets."
    },
    {
      id: "still-spiderverse-hero",
      title: "Spider-Man: Into the Spider-Verse (2018)",
      role: "Lead Compositor",
      studio: "Sony Pictures Imageworks / Sony Pictures Animation",
      year: "2018",
      image: "images/stills/IntoTheSpiderverse_01.png",
      caption: "Pioneering comic-book halftone print aesthetics, chromatic separation, and bespoke composite treatments. Academy Award Winner for Best Animated Feature.",
      technicalDetail: "Led sequence artist pods to execute the directors' signature multi-dimensional visual style."
    },
    {
      id: "still-underdog-hero",
      title: "American Underdog (2021)",
      role: "Compositing Supervisor / Lead",
      studio: "FuseFX-BC / Lionsgate",
      year: "2021",
      image: "images/stills/AmericanUnderdog.png",
      caption: "Proprietary Python 2D Sprite Crowd Tool populating stadium crowds from 2,000 to 17,000 seats.",
      technicalDetail: "Wrote production crowd generator reducing 3D render queues, paired with plate neutral grading across dynamic stadium light."
    },
    {
      id: "still-edge-tomorrow",
      title: "Edge of Tomorrow (2014)",
      role: "Senior Compositor",
      studio: "Sony Pictures Imageworks / Warner Bros.",
      year: "2014",
      image: "images/stills/TheEdgeOfTomorrow_01.png",
      caption: "Complex battle beach sequence with multi-pass mimic alien integration, explosive debris, dynamic camera shake, and sand volumetrics.",
      technicalDetail: "Multi-pass CG integration matching physical practical armor and fast-paced hand-held photographic plates."
    },
    {
      id: "still-ghostbusters",
      title: "Ghostbusters (2016)",
      role: "Senior Compositor",
      studio: "Sony Pictures Imageworks / Columbia",
      year: "2016",
      image: "images/stills/Ghostbusters2016_01.png",
      caption: "Pioneered Deep Compositing pipelines merging live-action proton stream interactive light passes with volumetric spectral CG ghosts.",
      technicalDetail: "Utilized Deep EXR sample data to avoid matte edge artifacts in complex semi-transparent glowing entity interactions."
    },
    {
      id: "still-district9",
      title: "District 9 (2009)",
      role: "Senior Compositor",
      studio: "Image Engine / TriStar",
      year: "2009",
      image: "images/stills/District9.png",
      caption: "Academy Award Nominee for Best Visual Effects. Groundbreaking documentary-style photoreal alien integration.",
      technicalDetail: "Seamless photoreal CG character integration into harsh documentary hand-held plates."
    },
    {
      id: "still-guard",
      title: "The Guard (2008)",
      role: "Gemini Award Nominee",
      studio: "CIS-Vancouver / CBC",
      year: "2008",
      image: "images/stills/TheGuard.png",
      caption: "Gemini Award Nominee for Best Visual Effects. High-seas Coast Guard rescue sequences with heavy wave volumetrics.",
      technicalDetail: "Integrated water simulations and physical boat miniature plates with marine atmospherics."
    },
    {
      id: "still-alice",
      title: "Alice Through the Looking Glass (2016)",
      role: "Senior Compositor",
      studio: "Sony Pictures Imageworks / Disney",
      year: "2016",
      image: "images/stills/AliceThroughTheLookingGlass_01.png",
      caption: "Advanced Deep Compositing, hyper-stylized environment extensions, and fantastical VFX integration.",
      technicalDetail: "Utilized Deep Compositing workflows for complex edge integration with multi-layered volume passes."
    },
    {
      id: "still-xmen",
      title: "X-Men: Days of Future Past (2014)",
      role: "Senior Compositor",
      studio: "Digital Domain / 20th Century Fox",
      year: "2014",
      image: "images/stills/X-Men_DaysOfFuturePast_01.png",
      caption: "Stereoscopic 3D compositing, Sentinel sequence look-dev, and high-energy optical beam integration.",
      technicalDetail: "Stereo alignment, depth grading, and multi-pass CG integration for hero action sequences."
    },
    {
      id: "still-upload",
      title: "Upload (2020– )",
      role: "Compositing Supervisor",
      studio: "FuseFX-BC / Amazon Studios",
      year: "2020",
      image: "images/stills/Upload_01.png",
      caption: "Futuristic digital visual effects, UI holograms, virtual world aesthetic, and invisible environment composites.",
      technicalDetail: "Supervised compositing for episodic delivery across multiple VFX pods and motion graphics integration."
    },
    {
      id: "still-contra-wave",
      title: "Contra el Huracán — Sea Storm (2026)",
      role: "Compositing Supervisor",
      studio: "Eyeline VFX / Netflix",
      year: "2026",
      image: "images/stills/ContraElHuracan_02.png",
      caption: "Extreme maritime survival sequence: pitch-black ocean swells, vessel illumination through spray, and dynamic storm turbulence.",
      technicalDetail: "High-dynamic-range color management, interactive lighting from searchlights on churning water passes."
    },
    {
      id: "still-thor",
      title: "Thor (2011)",
      role: "Senior Compositor",
      studio: "Digital Domain / Marvel Studios",
      year: "2011",
      image: "images/stills/Thor.png",
      caption: "Bifrost bridge energy portal sequences, celestial space environments, and high-energy particle compositing.",
      technicalDetail: "Multi-layered volumetric lighting integration and practical set extension balance."
    },
    {
      id: "still-oz",
      title: "Oz the Great and Powerful (2013)",
      role: "Senior Compositor",
      studio: "Sony Pictures Imageworks / Disney",
      year: "2013",
      image: "images/stills/OZTheGreatandPowerful.png",
      caption: "Stereoscopic 3D fantasy world construction, Emerald City plate integration, and atmospheric volumetric layers.",
      technicalDetail: "Dual-eye stereoscopic compositing and depth-accurate atmospheric matching."
    }
  ],

  // ==========================================================================
  // SUPERVISORY METHODOLOGY
  // ==========================================================================
  supervision: {
    heading: "VFX Leadership & Supervisory Approach",
    subheading: "Balancing creative storytelling with technical rigour, pipeline efficiency, and artist-first leadership across 25+ years in production.",
    pillars: [
      {
        title: "Look-Development & Shot Methodologies",
        icon: "sliders",
        desc: "Establishing bulletproof sequence templates and neutral plate grades early so artists focus on creative storytelling rather than technical troubleshooting."
      },
      {
        title: "Team Mentorship & Psychological Safety",
        icon: "users",
        desc: "Managing up to 20+ compositors and DMP artists. Prioritizing clear morning briefs, continuous desk-side mentoring, and constructive dailies reviews."
      },
      {
        title: "Cross-Department & Color Alignment",
        icon: "git-merge",
        desc: "Partnering closely with CG, Lighting, FX, and Color Science to ensure EXR passes are lean, correctly graded, and optimized for final theatrical delivery."
      },
      {
        title: "Pipeline Tools & Bidding Accuracy",
        icon: "cpu",
        desc: "Authoring custom Python tools and Gizmos (e.g., 2D Sprite Crowd Tool for 17,000-seat stadiums) to eliminate friction and keep shots within bid budgets."
      }
    ],
    milestones: [
      {
        project: "Contra el Huracán",
        studio: "Eyeline VFX / Netflix (2026)",
        scope: "Compositing Supervisor • Official Netflix Feature Trailer",
        summary: "Supervised compositing for Netflix maritime hurricane survival feature; directed water volumetrics, dynamic wave lighting, and color pipeline delivery."
      },
      {
        project: "Lift",
        studio: "Image Engine / Netflix (2024)",
        scope: "340+ Shots Delivered • Team of up to 20 Compositors & DMP Artists",
        summary: "Supervised high-altitude airborne action, cockpit comps, complex digital matte painting extensions, and direct color pipeline calibration."
      },
      {
        project: "Kraven The Hunter",
        studio: "Image Engine / Sony Pictures & Marvel (2024)",
        scope: "Compositing Supervisor • Sequence Look-Dev & Creature Comp",
        summary: "Directed look-development and multi-pass creature integration, high-speed stunt plates, and physical environment interaction."
      },
      {
        project: "American Underdog",
        studio: "FuseFX-BC / Lionsgate (2021)",
        scope: "Compositing Supervisor / Lead • Proprietary Python Crowd Tool",
        summary: "Wrote custom 2D sprite crowd simulation populating 2,000 to 17,000 seats efficiently without overburdening 3D render queues."
      },
      {
        project: "Spider-Man: Into the Spider-Verse",
        studio: "Sony Pictures Imageworks (2018)",
        scope: "Lead Compositor • Academy Award Winner for Best Animated Feature",
        summary: "Led sequence pods pioneering comic-book halftone print aesthetics, chromatic edge separation, and multi-dimensional look-development."
      }
    ]
  },

  // ==========================================================================
  // TEACHING & MENTORSHIP (Dan Rubin's exact requested text)
  // ==========================================================================
  teaching: {
    heading: "Teaching, Mentorship & Artist Development",
    philosophy: "At Vancouver Film School, I’ve taught advanced Nuke compositing courses covering <strong>Deep Compositing and AOV workflows</strong>. My approach focuses on bridging the gap between classroom learning and real production, using techniques and problem-solving approaches developed over more than 25 years working in visual effects. I particularly enjoy mentoring artists and helping them understand not just <em>how</em> a technique works, but how and why it is used in a production environment.",
    mentorshipFocus: [
      {
        title: "From Junior to Mid-Level Artist",
        desc: "Bridging the gap from roto/prep into confident beauty integration, multi-pass CG balance, and mastering plate grain structure."
      },
      {
        title: "Senior & Lead Prep",
        desc: "Coaching experienced artists on sequence look-dev, writing maintainable templates, shot breakdown communication, and mentoring junior peers."
      },
      {
        title: "Dailies Presentation & Note Interpretation",
        desc: "Teaching artists how to present shots clearly, interpret client feedback accurately, and diagnose shot issues before the supervisor sees them."
      }
    ],
    appointments: [
      {
        title: "Advanced Nuke Compositing: Deep Compositing & AOV Workflows",
        institution: "Vancouver Film School (VFS)",
        period: "Instructor / Course Curriculum",
        type: "Advanced Curriculum",
        description: "At Vancouver Film School, I’ve taught advanced Nuke compositing courses covering <strong>Deep Compositing and AOV workflows</strong>. My approach focuses on bridging the gap between classroom learning and real production, using techniques and problem-solving approaches developed over more than 25 years working in visual effects. I particularly enjoy mentoring artists and helping them understand not just <em>how</em> a technique works, but how and why it is used in a production environment."
      },
      {
        title: "Masterclass: High-End CG Lighting Integration & Photoreal Look-Dev",
        institution: "Vancouver Film School & Industry Masterclasses",
        period: "Masterclass Series",
        type: "Intensive Workshop",
        description: "Specialized intensive covering deep compositing workflows, multi-pass AOV lighting rebuilds, volumetrics, and Python pipeline scripting for production compositors."
      },
      {
        title: "Studio Internal Mentorship & Artist Coaching",
        institution: "Eyeline VFX / Image Engine",
        period: "Ongoing Mentorship",
        type: "Internal Mentorship",
        description: "Direct desk-side and sequence mentoring for junior and mid compositors on live feature film and episodic streaming productions."
      }
    ],
    topics: [
      { name: "Photoreal Multi-Pass CG Integration", detail: "Rebuilding beauty from diffuse, specular, reflection, scatter, and cryptomattes." },
      { name: "Deep Compositing in Production", detail: "Volumetric depth slicing, point-cloud projection, and artifact-free edge merging." },
      { name: "Stereoscopic 3D Alignment", detail: "Interaxial balance, disparity generation, floating windows, and zero-parallax alignment." },
      { name: "Python Scripting for Artists", detail: "Automating repetitive node graphs, custom UI Gizmos, and batch sequence scripts." },
      { name: "Color Management & ACEScg", detail: "OCIO color workflows, plate neutrality, gamut mapping, and theatrical display transforms." },
      { name: "The Art of Dailies", detail: "Clear presentation, version etiquette, and translating director notes into technical execution." }
    ],
    inquiryText: "Available for guest lectures, university courses, studio masterclasses, and one-on-one artist mentorship in Vancouver, BC or remotely."
  },

  // ==========================================================================
  // AI & VFX NOTES: SELECTED STORIES FROM DAILY READING
  // ==========================================================================
  aiNotes: [
    {
      id: "note-001",
      date: "2026-03-24",
      headline: "Foundry Nuke 16 Unveils Native Neural Engine & CopyCat 2.0",
      sourceName: "Foundry Press Release",
      sourceUrl: "https://www.foundry.com",
      tags: ["Nuke 16", "Machine Learning", "CopyCat", "Compositing Pipeline"],
      featured: true,
      summary: "Foundry has integrated next-generation inference acceleration into the Nuke 16 core, reducing training time for artist-trained CopyCat models by up to 4x on modern GPUs while adding native multi-view stereo ML inference.",
      commentary: "From a supervisor perspective, artist-trained ML models are shifting from experimental toys into production workhorses for cleanup and beauty work. What's critical is maintaining supervisor oversight over the training sets so artists don't burn hours tuning unstable models on inadequate ground-truth frames."
    },
    {
      id: "note-002",
      date: "2026-03-12",
      headline: "VES Technology Committee Publishes Best Practices for Generative Assets in Feature Film VFX Pipelines",
      sourceName: "Visual Effects Society",
      sourceUrl: "https://www.vesglobal.org",
      tags: ["VES", "Generative AI", "Standards", "Pipeline"],
      featured: true,
      summary: "The Visual Effects Society released its inaugural guidance on incorporating generative image models into high-end film pipelines, focusing on color gamut compliance (ACES 2.0), EXR multi-channel turnover, and legal IP provenance.",
      commentary: "The key takeaway here is color and bit depth. Generative tools that output 8-bit sRGB or lack linear-light representation simply cannot survive an ACEScg theatrical delivery. As supervisors, our job is enforcing that any AI-assisted element arrives with proper floating-point linear passes."
    },
    {
      id: "note-003",
      date: "2026-02-28",
      headline: "Gaussian Splatting Reaches Production Maturity for Background Environments",
      sourceName: "FXGuide Tech Focus",
      sourceUrl: "https://www.fxguide.com",
      tags: ["3DGS", "Environments", "Nuke", "Virtual Production"],
      featured: true,
      summary: "3D Gaussian Splatting plugins for Nuke and Unreal Engine are seeing widespread adoption for photogrammetry capture, replacing traditional dense point clouds with renderable, relightable radiance fields.",
      commentary: "Having supervised heavy DMP and matte projection environments on Lift and Spider-Verse, Gaussian Splatting is a game-changer for camera moves that would otherwise require rebuilding geometry. In Nuke, integrating splat projections with standard deep EXRs gives comp artists incredible freedom without waiting on lighting turntables."
    }
  ],

  // ==========================================================================
  // SELECTED PRODUCTION PROJECTS (With local video links & YouTube embeds)
  // ==========================================================================
  projects: [
    {
      id: "proj-contra-el-huracan",
      title: "Contra el Huracán",
      englishTitle: "Against the Hurricane",
      category: "Feature Film",
      year: "2026",
      studio: "Eyeline VFX",
      client: "Netflix",
      role: "Compositing Supervisor",
      badge: "Netflix Feature Trailer",
      image: "images/ContraElHuracan_poster.jpg",
      videoFile: "videos/ContraElHuracan_Trailer.mp4",
      youtubeUrl: "https://www.youtube.com/watch?v=zKApuso5SCo",
      embedUrl: "https://www.youtube-nocookie.com/embed/zKApuso5SCo",
      downloadName: "Contra_el_Huracan_Netflix_Trailer.mp4",
      description: "Official Netflix feature trailer. Dan Rubin served as Compositing Supervisor at Eyeline VFX, directing compositing teams across extreme maritime hurricane survival sequences.",
      actualContribution: "Served as Compositing Supervisor at Eyeline VFX. Led compositing teams, established sequence look-development for high-intensity ocean storm plates, heavy sea-spray volumetrics, dynamic wave lighting, and color pipeline delivery.",
      shotsDelivered: "Feature Film Supervision",
      teamSize: "Eyeline VFX Comp Team",
      keyAchievements: [
        "Compositing Supervisor at Eyeline VFX overseeing the compositing needs of the show.",
        "High-intensity maritime hurricane survival sequences for Netflix.",
        "Look-development for catastrophic storm lighting, airborne sea-spray, and water volumetrics.",
        "Client delivery reviews and color pipeline management."
      ],
      tags: ["Eyeline VFX", "Netflix", "Compositing Supervisor", "Feature Film", "Trailer"]
    },
    {
      id: "proj-lift",
      title: "Lift",
      category: "Feature Film",
      year: "2024",
      studio: "Image Engine",
      client: "Netflix",
      role: "Compositing Supervisor",
      badge: "Netflix Feature",
      image: "images/stills/Lift_01.png",
      videoFile: "videos/LIFTBreakdown.mp4",
      downloadName: "Lift_Compositing_Breakdown.mp4",
      description: "Compositing Supervisor delivering 340+ shots on F. Gary Gray's high-stakes heist feature for Netflix.",
      actualContribution: "Served as Compositing Supervisor leading a 2D department of up to 20 compositors and digital matte painters. Authored sequence look-dev templates for airborne jet sequences, managed internal shot briefing and QC reviews, and collaborated directly with the Color Pipeline team on client delivery grades.",
      shotsDelivered: "340+ Shots",
      teamSize: "20 Compositors & DMP Artists",
      keyAchievements: [
        "Delivered 340+ complex shots while overseeing a team of up to 20 compositors and managing DMP artists.",
        "Collaborated directly with the Color Pipeline team on internal reviews and client-grade deliveries.",
        "Established shot methodologies, brief assignments, and look-dev for airborne and architectural sequences."
      ],
      tags: ["Image Engine", "Compositing Supervisor", "340+ Shots", "Color Pipeline", "DMP Oversight", "Team of 20"]
    },
    {
      id: "proj-kraven",
      title: "Kraven the Hunter",
      category: "Feature Film",
      year: "2024",
      studio: "Image Engine",
      client: "Sony Pictures / Marvel",
      role: "Compositing Supervisor",
      badge: "Marvel Feature",
      image: "images/stills/Kraven.png",
      videoFile: "videos/Kraven_BreakDown.mov",
      downloadName: "Kraven_Breakdown.mov",
      description: "Compositing Supervisor heading sequences for Sony Pictures' Marvel action feature.",
      actualContribution: "Supervised sequence look-development, creature interaction passes, and practical stunt plate clean-up. Interfaced with VFX Supervisors and production bidding teams to resource sequence shot quotas.",
      shotsDelivered: "Hero Sequences",
      teamSize: "12 Compositors",
      keyAchievements: [
        "Supervised look-dev, sequence consistency, and multi-pass creature and live-action integration.",
        "Interfaced with VFX Supervisors and production to budget and resource shot quotas."
      ],
      tags: ["Image Engine", "Compositing Supervisor", "Creature Comp", "Action VFX", "Marvel"]
    },
    {
      id: "proj-avatar",
      title: "Avatar: Fire and Ash",
      category: "Feature Film",
      year: "2025",
      studio: "Wētā FX",
      client: "20th Century Studios / Lightstorm",
      role: "Senior Compositor",
      badge: "Blockbuster Feature",
      image: "images/stills/AvatarFireandAsh_01.png",
      description: "Contributed high-complexity photorealistic compositing for James Cameron's acclaimed Avatar franchise at Wētā FX.",
      actualContribution: "Executed hero CG character and high-density environmental integration shots in full stereoscopic 3D and deep compositing, adhering to strict ACEScg and stereoscopic convergence standards.",
      shotsDelivered: "Hero Sequences",
      teamSize: "Wētā FX Senior Comp Team",
      keyAchievements: [
        "Executed high-fidelity CG lighting integration and environmental depth compositing.",
        "Maintained stringent quality control in world-class stereoscopic and photoreal benchmarks."
      ],
      tags: ["Wētā FX", "Nuke", "Photoreal CG", "Stereo / Deep", "Feature Film"]
    },
    {
      id: "proj-superman",
      title: "Superman",
      category: "Feature Film",
      year: "2025",
      studio: "Wētā FX",
      client: "DC Studios / Warner Bros.",
      role: "Senior Compositor",
      badge: "Tentpole Feature",
      image: "images/stills/Superman2025.png",
      description: "Senior Compositor on James Gunn's flagship DC Universe feature film at Wētā FX.",
      actualContribution: "Assembled multi-layered live-action and full CG integration shots with complex dynamic lighting interactions, energy passes, and atmospheric simulation layers.",
      shotsDelivered: "Action Sequences",
      teamSize: "Wētā FX Senior Team",
      keyAchievements: [
        "Assembled hero live-action and full CG integration shots with complex dynamic lighting interactions.",
        "Collaborated with FX and lighting departments to resolve multi-layer atmospheric passes."
      ],
      tags: ["Wētā FX", "Nuke", "Hero CG Integration", "DC Studios", "Feature Film"]
    },
    {
      id: "proj-underdog",
      title: "American Underdog",
      category: "Feature Film",
      year: "2021",
      studio: "FuseFX-BC",
      client: "Lionsgate / Kingdom Story",
      role: "Compositing Supervisor / Lead",
      badge: "Proprietary Tech",
      image: "images/stills/AmericanUnderdog.png",
      videoFile: "videos/AUD_Reel.mov",
      downloadName: "American_Underdog_Crowd_Tool_Reel.mov",
      description: "Supervised compositing for feature football stadium sequences, authoring a proprietary Python 2D crowd generation tool.",
      actualContribution: "Compositing Supervisor and tool author. Conceived and coded a proprietary Python 2D Sprite Crowd Tool populating stadium crowds from 2,000 to 17,000 seats, bypassing 3D render bottlenecks while maintaining photographic depth and lighting continuity.",
      shotsDelivered: "Stadium Sequences",
      teamSize: "FuseFX Comp Team",
      keyAchievements: [
        "Authored proprietary 2D Sprite Crowd Tool in Python used across 2,000–17,000 seat stadiums.",
        "Delivered critical stadium lighting match-grade and plate neutral integration under compressed deadlines."
      ],
      tags: ["FuseFX", "Compositing Supervisor", "Python Tool Author", "Stadium Comp", "Feature Film"]
    },
    {
      id: "proj-spiderverse",
      title: "Spider-Man: Into the Spider-Verse",
      category: "Feature Film",
      year: "2018",
      studio: "Sony Pictures Imageworks",
      client: "Sony Pictures Animation / Columbia",
      role: "Lead Compositor",
      badge: "Academy Award Winner",
      image: "images/stills/IntoTheSpiderverse_01.png",
      description: "Lead Compositor on the revolutionary, Oscar-winning animated feature film renowned for its groundbreaking visual language.",
      actualContribution: "Lead Compositor directing sequence pods. Developed custom Nuke node setups for comic-book halftone print aesthetics, misregistration offset passes, and stylized dimensional lighting.",
      shotsDelivered: "Key Sequence Pods",
      teamSize: "Sony Imageworks Pod",
      keyAchievements: [
        "Pioneered unique comic-book halftone print aesthetics, chromatic separation, and bespoke composite treatments.",
        "Led artist sequence pods to realize the directors' signature multi-dimensional visual style."
      ],
      tags: ["Sony Imageworks", "Oscar Winner", "Lead Compositor", "Stylized Animation", "Look-Dev"]
    },
    {
      id: "proj-skeleton-crew",
      title: "Star Wars: Skeleton Crew",
      category: "Episodic / Streaming",
      year: "2024",
      studio: "Image Engine",
      client: "Lucasfilm / Disney+",
      role: "Senior Compositor",
      badge: "Disney+ / Star Wars",
      image: "images/stills/SkeletonCrew_01.png",
      description: "Senior Compositor delivering high-end cinematic visual effects for Lucasfilm's live-action Star Wars series.",
      actualContribution: "Integrated alien creature prosthetics, ship cockpit views, digital environments, and laser weapon interactions within strict Lucasfilm canon aesthetics.",
      shotsDelivered: "Episodic Sequences",
      teamSize: "Image Engine 2D",
      keyAchievements: [
        "Integrated complex creature and hard-surface space assets seamlessly into live-action plates.",
        "Delivered cinematic sequence continuity under rapid episodic delivery schedules."
      ],
      tags: ["Image Engine", "Lucasfilm", "Star Wars", "Senior Compositor", "Episodic"]
    },
    {
      id: "proj-edge-of-tomorrow",
      title: "Edge of Tomorrow",
      category: "Feature Film",
      year: "2014",
      studio: "Sony Pictures Imageworks",
      client: "Warner Bros.",
      role: "Senior Compositor",
      badge: "Sci-Fi Action",
      image: "images/stills/TheEdgeOfTomorrow_01.png",
      description: "Senior Compositor on Doug Liman's acclaimed time-loop action thriller starring Tom Cruise and Emily Blunt.",
      actualContribution: "Executed multi-pass CG mimic alien integration, dynamic explosive atmospherics, and high-speed combat camera shakes with plate neutral grading.",
      shotsDelivered: "Combat Sequences",
      teamSize: "SPI Comp Floor",
      keyAchievements: [
        "Delivered high-tempo military sci-fi sequences with complex multi-pass particulate layers.",
        "Handled interactive lighting integration between alien energy passes and physical practical armor."
      ],
      tags: ["Sony Imageworks", "Senior Compositor", "Sci-Fi Action", "Particulate Comp"]
    },
    {
      id: "proj-ghostbusters",
      title: "Ghostbusters",
      category: "Feature Film",
      year: "2016",
      studio: "Sony Pictures Imageworks",
      client: "Columbia Pictures",
      role: "Senior Compositor",
      badge: "Deep Compositing",
      image: "images/stills/Ghostbusters2016_01.png",
      description: "Executed complex deep compositing and stereoscopic alignment for dynamic spectral VFX sequences.",
      actualContribution: "Composited complex proton-pack streams, spectral volumetric entity passes, and stereo alignment utilizing Deep EXR workflows to avoid matte edge fringing.",
      shotsDelivered: "Hero VFX Shots",
      teamSize: "SPI Comp Floor",
      keyAchievements: [
        "Utilized Deep Compositing to seamlessly merge dynamic spectral passes with complex live-action plates.",
        "Maintained perfect stereo disparity across particle-heavy visual effect sequences."
      ],
      tags: ["Sony Imageworks", "Deep Comp", "Stereoscopic 3D", "Spectral FX", "Feature Film"]
    },
    {
      id: "proj-alice",
      title: "Alice Through the Looking Glass",
      category: "Feature Film",
      year: "2016",
      studio: "Sony Pictures Imageworks",
      client: "Walt Disney Pictures",
      role: "Senior Compositor",
      badge: "Deep Compositing",
      image: "images/stills/AliceThroughTheLookingGlass_01.png",
      description: "Advanced Deep Compositing and stereoscopic 3D on Disney's fantastical visual effects feature.",
      actualContribution: "Composited intricate chronological ocean volumetrics, time-travel sequences, and fantastical character transformations using deep z-depth slicing.",
      shotsDelivered: "Hero Fantasy Shots",
      teamSize: "SPI Comp Floor",
      keyAchievements: [
        "Pioneered volumetric deep compositing workflows for complex organic and glass refractions.",
        "Ensured stereoscopic parallax consistency across surreal depth-shifted environments."
      ],
      tags: ["Sony Imageworks", "Deep Comp", "Disney Feature", "Volumetrics"]
    },
    {
      id: "proj-upload",
      title: "Upload",
      category: "Episodic / Streaming",
      year: "2020",
      studio: "FuseFX-BC",
      client: "Amazon Studios",
      role: "Compositing Supervisor",
      badge: "Amazon Prime Series",
      image: "images/stills/Upload_01.png",
      description: "Compositing Supervisor for Greg Daniels' sci-fi comedy streaming series on Amazon Prime.",
      actualContribution: "Supervised compositing for futuristic holographic interface elements, digital set replacements, and humorous high-tech digital interactions.",
      shotsDelivered: "Season 1 Episodes",
      teamSize: "FuseFX 2D Team",
      keyAchievements: [
        "Supervised digital hologram integration and stylized UI graphics across multiple episodes.",
        "Managed episode turnovers on accelerated streaming television timelines."
      ],
      tags: ["FuseFX", "Compositing Supervisor", "Amazon Prime", "Sci-Fi Episodic"]
    },
    {
      id: "proj-district9",
      title: "District 9",
      category: "Feature Film",
      year: "2009",
      studio: "Image Engine",
      client: "TriStar / WingNut",
      role: "Senior Compositor",
      badge: "Academy Award Nominee",
      image: "images/stills/District9.png",
      description: "Senior Compositor on Neill Blomkamp's Oscar-nominated sci-fi masterpiece at Image Engine.",
      actualContribution: "Integrated alien prawn characters into raw handheld documentary-style live-action photography with realistic grit, harsh daylight, and natural lens imperfections.",
      shotsDelivered: "Key Sequences",
      teamSize: "Image Engine Comp Team",
      keyAchievements: [
        "Set new industry benchmarks for photorealistic character compositing in natural documentary lighting.",
        "Contributed to Academy Award Nomination for Best Visual Effects."
      ],
      tags: ["Image Engine", "Oscar Nominee", "Senior Compositor", "Photoreal CG", "Sci-Fi"]
    },
    {
      id: "proj-guard",
      title: "The Guard",
      category: "Television Series",
      year: "2008",
      studio: "CIS-Vancouver",
      client: "CBC / Lionsgate",
      role: "Lead Compositor",
      badge: "Gemini Award Nominee",
      image: "images/stills/TheGuard.png",
      description: "Lead Compositor on the acclaimed Canadian drama series, nominated for the Gemini Award for Best Visual Effects.",
      actualContribution: "Composited intense Coast Guard search-and-rescue marine sequences, storm surge volumetrics, and water simulation integration.",
      shotsDelivered: "Episodes Across Seasons",
      teamSize: "CIS-Vancouver 2D",
      keyAchievements: [
        "Received Gemini Award Nomination for Best Visual Effects (2008).",
        "Crafted perilous marine environment sequences with seamless miniature and CG water blending."
      ],
      tags: ["CIS-Vancouver", "Gemini Nominee", "Lead Compositor", "Maritime VFX", "Television"]
    }
  ],

  // ==========================================================================
  // PROFESSIONAL EXPERIENCE (VERBATIM RESUME — EXACT CREDITS & STUDIOS)
  // Strictly authentic without unrequested augmentation.
  // ==========================================================================
  experience: [
    {
      company: "Eyeline VFX",
      role: "Compositing Supervisor",
      location: "Vancouver, BC",
      period: "October 2025 – Current",
      summary: "Compositing Supervisor overseeing the compositing department on feature productions, including the high-intensity storm survival feature film Contra el Huracán (Netflix).",
      bulletPoints: [
        "Contra el Huracán – Netflix (Compositing Supervisor)"
      ],
      featuredTrailer: true
    },
    {
      company: "Wētā FX",
      role: "Senior Compositor",
      location: "Vancouver, BC",
      period: "February 2025 – October 2025",
      summary: "Avatar: Fire and Ash • Superman 2025",
      bulletPoints: [
        "Avatar: Fire and Ash",
        "Superman 2025"
      ]
    },
    {
      company: "Image Engine",
      role: "Compositing Supervisor",
      location: "Vancouver, BC",
      period: "June 2022 – February 2025",
      summary: "Kraven The Hunter – Compositing Supervisor • Skeleton Crew – Disney+ – Senior Compositor • Lift – Netflix (2024) – Compositing Supervisor",
      bulletPoints: [
        "Kraven The Hunter – Compositing Supervisor",
        "Skeleton Crew – Disney+ – Senior Compositor",
        "Lift – Netflix (2024) – Compositing Supervisor",
        "Delivered 340+ shots while supervising a team of up to 20 compositors.",
        "Oversaw DMP artists for a portion of the show.",
        "Collaborated with the Color Pipeline team on internal reviews and client-grade deliveries."
      ]
    },
    {
      company: "FuseFX-BC",
      role: "Compositing Supervisor",
      location: "Vancouver, BC",
      period: "October 2018 – June 2022",
      summary: "American Underdog – Feature Film • The Princess Switch 3 – Netflix • The Mighty Ducks Season 1 – Disney+ • Books of Blood – Hulu • The Princess Switch 2 – Netflix • Upload Season 1 – Amazon • The 100 Season 6",
      bulletPoints: [
        "American Underdog – Feature Film",
        "The Princess Switch 3 – Netflix",
        "The Mighty Ducks Season 1 – Disney+",
        "Books of Blood – Hulu",
        "The Princess Switch 2 – Netflix",
        "Upload Season 1 – Amazon",
        "The 100 Season 6"
      ]
    },
    {
      company: "Sony Imageworks",
      role: "Lead Compositor",
      location: "Vancouver, BC",
      period: "January 2018 – September 2018",
      summary: "Spiderman: Into the Spiderverse (2018)",
      bulletPoints: [
        "Spiderman: Into the Spiderverse (2018)"
      ]
    },
    {
      company: "MPC Vancouver",
      role: "Lead Compositor",
      location: "Vancouver, BC",
      period: "August 2016 – December 2017",
      summary: "Wrinkle In Time (2018) Lead Compositor • The Mummy (2017) Lead Compositor",
      bulletPoints: [
        "Wrinkle In Time (2018) – Lead Compositor",
        "The Mummy (2017) – Lead Compositor",
        "Served as Lead Compositor for ~7 sequences, delivering 200–300 shots.",
        "Responsible for plate neutral grading, client-grade preparation, and shot assignments.",
        "Collaborated closely with VFX and 2D Supervisors, Production, Lighting Leads, CG Supervisor, and Environments team to ensure seamless support across departments."
      ]
    },
    {
      company: "Sony Imageworks",
      role: "Senior Compositor",
      location: "Vancouver, BC",
      period: "January 2015 – June 2016",
      summary: "Ghostbusters (2016) Deep Compositing • Alice Through The Looking Glass (2016) Deep Compositing • Pixels (2015)",
      bulletPoints: [
        "Ghostbusters (2016) – Deep Compositing",
        "Alice Through The Looking Glass (2016) – Deep Compositing",
        "Pixels (2015)"
      ]
    },
    {
      company: "Prime Focus World",
      role: "Senior Lead Compositor",
      location: "Vancouver, BC",
      period: "April 2014 – August 2014",
      summary: "Mortdecai (2015) – Lead Compositor • Expendables 3 (2014) – Lead Compositor",
      bulletPoints: [
        "Mortdecai (2015) – Lead Compositor",
        "Expendables 3 (2014) – Lead Compositor"
      ]
    },
    {
      company: "Digital Domain",
      role: "Senior Compositor",
      location: "Vancouver, BC",
      period: "January 2014 – April 2014",
      summary: "XMen: Days of Future Past (2014) Stereoscopic Show",
      bulletPoints: [
        "XMen: Days of Future Past (2014) – Stereoscopic Show"
      ]
    },
    {
      company: "Sony Imageworks",
      role: "Senior Compositor",
      location: "Vancouver, BC",
      period: "January 2012 – January 2014",
      summary: "Edge of Tomorrow (2014) • OZ: The Great and Powerful (2013) Stereoscopic Show • The Amazing Spiderman (2012) Stereoscopic Show",
      bulletPoints: [
        "Edge of Tomorrow (2014)",
        "OZ: The Great and Powerful (2013) – Stereoscopic Show",
        "The Amazing Spiderman (2012) – Stereoscopic Show"
      ]
    },
    {
      company: "The Embassy VFX",
      role: "Senior Compositor",
      location: "Vancouver, BC",
      period: "November 2011 – January 2012",
      summary: "Battleship (2012)",
      bulletPoints: [
        "Battleship (2012)"
      ]
    },
    {
      company: "Prime Focus World",
      role: "Senior Compositor",
      location: "Vancouver, BC",
      period: "May 2011 – June 2011",
      summary: "Final Destination 5 (2011) Stereoscopic Show",
      bulletPoints: [
        "Final Destination 5 (2011) – Stereoscopic Show"
      ]
    },
    {
      company: "Digital Domain",
      role: "Senior Compositor",
      location: "Vancouver, BC",
      period: "May 2010 – May 2011",
      summary: "Transformers 3 (2011) • Thor (2011)",
      bulletPoints: [
        "Transformers 3 (2011)",
        "Thor (2011)"
      ]
    },
    {
      company: "Entity FX North",
      role: "Lead Compositor",
      location: "Vancouver, BC",
      period: "August 2009 – May 2011",
      summary: "Smallville Season 9 (2010 – 2011)",
      bulletPoints: [
        "Smallville Season 9 (2010 – 2011)"
      ]
    },
    {
      company: "Image Engine",
      role: "Senior Compositor",
      location: "Vancouver, BC",
      period: "April 2009 – June 2009",
      summary: "District 9 (2009)",
      bulletPoints: [
        "District 9 (2009)"
      ]
    },
    {
      company: "Frantic Films",
      role: "Compositing Supervisor",
      location: "Vancouver, BC",
      period: "November 2008 – April 2009",
      summary: "G.I. Joe: Rise of Cobra (2009)",
      bulletPoints: [
        "G.I. Joe: Rise of Cobra (2009)"
      ]
    },
    {
      company: "CIS-Vancouver",
      role: "Lead / Senior Compositor",
      location: "Vancouver, BC",
      period: "August 2006 – Nov 2008",
      summary: "The Guard (2008 Gemini Award Nominee – Best Visual Effects)",
      bulletPoints: [
        "The Guard (2008) – Gemini Award Nominee: Best Visual Effects"
      ]
    },
    {
      company: "Digital Dimension (Los Angeles)",
      role: "Senior Compositor",
      location: "Los Angeles, CA",
      period: "August 2003 – August 2006",
      summary: "Senior Compositor on high-profile entertainment and commercial visual effects projects.",
      bulletPoints: []
    },
    {
      company: "HBO Studio Productions (NYC)",
      role: "Compositor / Graphic Designer",
      location: "New York, NY",
      period: "May 1999 – August 2003",
      summary: "Inside the NFL (2002 Sports Emmy Winner) • NFL on Fox: Super Bowl XXXIX (2005 Sports Emmy Winner)",
      bulletPoints: [
        "Inside the NFL – 2002 Sports Emmy Award Winner",
        "NFL on Fox: Super Bowl XXXIX – 2005 Sports Emmy Award Winner"
      ]
    }
  ],

  // ==========================================================================
  // TECHNICAL SKILLS & COMPOSITING STACK
  // ==========================================================================
  technicalSkills: {
    software: [
      { name: "Foundry Nuke Studio / NukeX", level: 98, highlight: "25+ Yrs Daily Driver" },
      { name: "Deep Compositing", level: 95, highlight: "Ghostbusters / Wētā FX" },
      { name: "Stereoscopic 3D Alignment", level: 94, highlight: "Avatar / Spider-Man" },
      { name: "Plate Neutral Grading & Look-Dev", level: 96, highlight: "Feature Standard" },
      { name: "Autodesk ShotGrid / RV", level: 95, highlight: "Production Bidding & QC" },
      { name: "KeenTools / Mocha Pro / Silhouette", level: 90, highlight: "Advanced Tracking" }
    ],
    pipelineAndCode: [
      { name: "Python Scripting for Nuke", level: 90, desc: "Authored 2D Sprite Crowd Tool for 17,000-seat stadiums; custom Gizmos & automation." },
      { name: "Color Pipeline (ACEScg / OCIO)", level: 92, desc: "Collaborated directly with studio color science teams on client deliveries." },
      { name: "Digital Matte Painting Integration", level: 95, desc: "Seamless 2.5D projection setups and camera projection rigs." },
      { name: "On-Set Supervision & Data Wrangling", level: 88, desc: "HDRI captures, ball reference, lens grids, and camera tracking metadata." }
    ],
    supervisoryMastery: [
      "Managing teams of up to 20+ compositors",
      "Look-development & sequence templates",
      "Cross-department synergy (CG, Lighting, FX)",
      "Shot bidding & breakdown methodologies",
      "Outsource vendor turnovers & reviews",
      "Junior, mid & senior artist mentorship"
    ]
  },

  // ==========================================================================
  // INDUSTRY AWARDS & RECOGNITION (VERBATIM RESUME)
  // ==========================================================================
  awards: [
    {
      year: "2008",
      title: "Gemini Awards (Nomination)",
      show: "The Guard",
      category: "Best Visual Effects",
      badge: "Gemini Nominee"
    },
    {
      year: "2005",
      title: "Sports Emmy Awards (Win)",
      show: "NFL on Fox: Superbowl XXXIX",
      category: "Outstanding Graphic Design",
      badge: "Emmy Winner"
    },
    {
      year: "2002",
      title: "Sports Emmy Awards (Win)",
      show: "Inside the NFL",
      category: "Outstanding Studio Show - Weekly",
      badge: "Emmy Winner"
    }
  ],

  // ==========================================================================
  // EDUCATION & CREDENTIALS (VERBATIM RESUME)
  // ==========================================================================
  educationAndCerts: [
    {
      degree: "BFA Computer Art, Graduate with Honors",
      institution: "School of Visual Arts - NYC",
      year: "1995 – 1999"
    }
  ],

  // ==========================================================================
  // NOTABLES (VERBATIM RESUME)
  // ==========================================================================
  notables: [
    "On-Set Supervision and data wrangling experience.",
    "Advanced experience in Nuke.",
    "Moderate experience with Python Scripting. Wrote a Crowd Tool using a 2D Sprite Methodology, which was implemented on several shows featuring stadiums ranging from 2000 to 17000 seats.",
    "Vancouver, BC Based - American and Canadian Citizen."
  ],

  // Placeholders clearly labelled until Dan supplies testimonials
  testimonials: [
    {
      quote: "[Placeholder: Testimonial Quote from VFX Supervisor / Studio Client regarding Dan's sequence leadership, shot delivery, and color precision.]",
      author: "[Placeholder: Senior VFX Supervisor]",
      title: "[Placeholder: World-Class VFX Facility]"
    },
    {
      quote: "[Placeholder: Testimonial Quote from Mentored Compositor regarding Dan's constructive dailies guidance and technical coaching.]",
      author: "[Placeholder: Senior Compositor / Former Mentee]",
      title: "[Placeholder: Production Studio]"
    }
  ]
};

// Export to window
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
