/* Suntech Solar Systems - Theme Switcher
   Version: 5.0.0 (Cleaned & Optimized)
   Multiple themes targeting different customer demographics
*/

// ==================== Theme Definitions ====================
const THEMES = {
  trust: {
    name: "Default Trust",
    accent: "#00ffff",
    background: "linear-gradient(180deg, #07122a, #0e1d3a)",
    slogan: "Confidence-first protections - our promise to local Victorians.",
    video: "assets/stock-video-1.mp4"
  },
  
  young: {
    name: "Young Professionals",
    accent: "#ff4df5",
    background: "linear-gradient(180deg, #1b003a, #470057)",
    slogan: "Go solar, stay vibrant - power your future with clean energy.",
    video: "assets/stock-video-2.mp4"
  },
  
  family: {
    name: "Family Focus",
    accent: "#ffc857",
    background: "linear-gradient(180deg, #1c2233, #303a52)",
    slogan: "For families who care - clean, safe, and lasting solar energy.",
    video: "assets/stock-video-3.mp4"
  },
  
  mature: {
    name: "Mature Homeowners",
    accent: "#64ffda",
    background: "linear-gradient(180deg, #0d1f22, #093a3e)",
    slogan: "Protect your retirement - invest in solar stability and comfort.",
    video: "assets/stock-video-4.mp4"
  },
  
  business: {
    name: "Business Focus",
    accent: "#ffb400",
    background: "linear-gradient(180deg, #141414, #2a2a2a)",
    slogan: "Cut costs, boost ROI - solar solutions for smart businesses.",
    video: "assets/stock-video-3.mp4"
  },
  
  ev: {
    name: "EV Owners",
    accent: "#33ff99",
    background: "linear-gradient(180deg, #001a11, #003322)",
    slogan: "Charge your car, power your home - zero emissions, zero hassle.",
    video: "assets/stock-video-2.mp4"
  },
  
  battery: {
    name: "Battery Upgrade",
    accent: "#ffcc00",
    background: "linear-gradient(180deg, #0a0a0a, #1c1c1c)",
    slogan: "Store more, stress less - battery storage for every home.",
    video: "assets/stock-video-3.mp4"
  },
  
  rural: {
    name: "Rural & Regional",
    accent: "#f7b267",
    background: "linear-gradient(180deg, #2e1a00, #4d2600)",
    slogan: "Power independence - solar freedom for rural Victoria.",
    video: "assets/stock-video-1.mp4"
  },
  
  summer: {
    name: "Summer Sale",
    accent: "#ff5f40",
    background: "linear-gradient(180deg, #000428, #004e92)",
    slogan: "Hot deals, cooler bills - summer solar savings are on!",
    video: "assets/stock-video-4.mp4"
  }
};

// ==================== Theme Application ====================
function applyTheme(theme) {
  if (!theme) {
    console.error("Invalid theme provided");
    return;
  }
  
  // Update background
  document.body.style.background = theme.background;
  
  // Update CSS variable for accent color
  document.documentElement.style.setProperty("--accent-color", theme.accent);
  
  // Update slogan
  const sloganElement = document.getElementById("sloganHeadline");
  if (sloganElement) {
    sloganElement.textContent = theme.slogan;
  }
  
  // Update hero video
  const videoElement = document.getElementById("heroVideo");
  if (videoElement && theme.video) {
    const currentSrc = videoElement.src;
    const newSrc = theme.video;
    
    // Only update if different to avoid unnecessary reloads
    if (!currentSrc.includes(newSrc)) {
      videoElement.src = newSrc;
      videoElement.load();
      videoElement.play().catch(err => {
        console.log("Video autoplay prevented:", err.message);
      });
    }
  }
  
  // Update accent colors on key elements
  updateAccentColors(theme.accent);
  
  console.log(`🎨 Theme applied: ${theme.name}`);
}

// ==================== Update Accent Colors ====================
function updateAccentColors(accentColor) {
  // Update headings
  const headings = document.querySelectorAll("h1, h2, h3");
  headings.forEach(heading => {
    heading.style.color = accentColor;
  });
  
  // Update buttons (optional - CSS variables handle most of this)
  // Keeping this for legacy support
  const primaryButtons = document.querySelectorAll(".btn-primary");
  primaryButtons.forEach(button => {
    button.style.borderColor = accentColor;
  });
  
  const outlineButtons = document.querySelectorAll(".btn-outline");
  outlineButtons.forEach(button => {
    button.style.borderColor = accentColor;
    button.style.color = accentColor;
  });
}

// ==================== Theme Switcher (Public API) ====================
window.switchTheme = function(themeKey) {
  const theme = THEMES[themeKey] || THEMES.trust;
  
  applyTheme(theme);
  
  // Save preference to localStorage
  try {
    localStorage.setItem("suntechTheme", themeKey);
  } catch (error) {
    console.warn("Could not save theme preference:", error.message);
  }
};

// ==================== Load Saved Theme on Page Load ====================
document.addEventListener("DOMContentLoaded", () => {
  let themeKey = "trust"; // Default theme
  
  // Try to load saved theme from localStorage
  try {
    const savedTheme = localStorage.getItem("suntechTheme");
    if (savedTheme && THEMES[savedTheme]) {
      themeKey = savedTheme;
    }
  } catch (error) {
    console.warn("Could not load saved theme:", error.message);
  }
  
  // Apply the theme
  switchTheme(themeKey);
  
  console.log("✅ Theme system initialized");
});

// ==================== Optional: Theme Preview ====================
// This function can be used to preview themes without saving
window.previewTheme = function(themeKey) {
  const theme = THEMES[themeKey] || THEMES.trust;
  applyTheme(theme);
  // Note: Does not save to localStorage
};

// ==================== Export for Module Systems (Optional) ====================
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    THEMES,
    switchTheme: window.switchTheme,
    previewTheme: window.previewTheme
  };
}
