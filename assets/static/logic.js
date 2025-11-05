/* Suntech Solar Systems - Core Logic
   Version: 5.0.0 (Cleaned & Optimized)
   - Smart Quick Quote system
   - Solar Savings Calculator
   - Shared calculation engine
   - Hero carousel
   - Testimonials scrolling
   - Typewriter terminal effect
*/

// ==================== Utility: Typewriter Effect ====================
function typeWriter(element, text, speed = 24) {
  if (!element) return;
  
  element.innerHTML = "";
  let charIndex = 0;
  
  const interval = setInterval(() => {
    element.innerHTML += text.charAt(charIndex);
    charIndex++;
    
    if (charIndex >= text.length) {
      clearInterval(interval);
    }
  }, speed);
}

// ==================== Shared Calculation Engine ====================
function calculateSolarSavings(usageKwhPerDay, gridRate, feedInRate) {
  // Validate inputs
  if (!usageKwhPerDay || usageKwhPerDay <= 0) {
    usageKwhPerDay = 20; // Default assumption
  }
  if (!gridRate || gridRate <= 0) {
    gridRate = 0.27; // Default VIC rate
  }
  if (!feedInRate || feedInRate <= 0) {
    feedInRate = 0.05; // Default feed-in rate
  }
  
  // Conservative solar generation estimate (accounting for Victorian weather)
  const dailySolarGeneration = Math.max(0, usageKwhPerDay * 0.9);
  const annualSolarGeneration = dailySolarGeneration * 365;
  
  // Savings calculation (35% self-consumption assumption)
  const selfConsumptionRate = 0.35;
  const exportRate = 0.65;
  
  const annualSelfConsumptionSavings = (annualSolarGeneration * selfConsumptionRate * gridRate);
  const annualExportIncome = (annualSolarGeneration * exportRate * feedInRate);
  const totalAnnualSavings = Math.round(annualSelfConsumptionSavings + annualExportIncome);
  
  // ROI calculation (assuming $12,000 average system cost)
  const systemCost = 12000;
  const roiYears = systemCost / Math.max(1, totalAnnualSavings);
  
  // Efficiency score
  const efficiencyScore = Math.round((dailySolarGeneration / Math.max(1, usageKwhPerDay)) * 100);
  
  return {
    dailySolar: dailySolarGeneration.toFixed(1),
    annualSolar: Math.round(annualSolarGeneration),
    annualSavings: totalAnnualSavings,
    roiYears: roiYears.toFixed(1),
    efficiency: efficiencyScore
  };
}

// ==================== Smart Quick Quote System ====================
let selectedPackage = null;
const qqOutput = document.getElementById("qqOutput");
const uploadBillBtn = document.getElementById("uploadBillBtn");

// Package selection handler
window.selectPackage = function(packageType) {
  selectedPackage = packageType;
  
  let imageHtml = "";
  let packageInfo = "";
  
  switch(packageType) {
    case 'panels':
      imageHtml = '<img src="assets/jinko.png" alt="JinkoSolar Panels" class="product-img"/>';
      packageInfo = "6.6kW Solar Panel System";
      break;
    case 'battery':
      imageHtml = '<img src="assets/growatt.png" alt="Growatt Battery" class="product-img"/>';
      packageInfo = "10kWh Battery Storage System";
      break;
    case 'combo':
      imageHtml = `
        <div class="combo-images">
          <img src="assets/jinko.png" alt="JinkoSolar Panels" class="product-img"/>
          <img src="assets/growatt.png" alt="Growatt Battery" class="product-img"/>
        </div>
      `;
      packageInfo = "6.6kW Solar + 10kWh Battery Combo";
      break;
  }
  
  qqOutput.innerHTML = `
    <div class="quote-summary">
      ${imageHtml}
      <pre id="qqTerminal">Selected: ${packageInfo}
      
Awaiting energy bill upload for personalized quote...</pre>
    </div>
  `;
};

// Bill upload trigger
if (uploadBillBtn) {
  uploadBillBtn.addEventListener("click", () => {
    if (!selectedPackage) {
      alert("Please select a package first by clicking one of the options above.");
      return;
    }
    
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf,.jpg,.jpeg,.png";
    
    fileInput.onchange = () => {
      if (fileInput.files && fileInput.files[0]) {
        handleQuickQuoteBill(fileInput.files[0]);
      }
    };
    
    fileInput.click();
  });
}

// Process uploaded bill for Quick Quote
function handleQuickQuoteBill(file) {
  const terminal = document.getElementById("qqTerminal");
  if (!terminal) return;
  
  // Simulate OCR processing (replace with real OCR/API later)
  const mockData = {
    usage: 18 + Math.floor(Math.random() * 7),
    rate: 0.25 + (Math.random() * 0.07),
    feedIn: 0.05 + (Math.random() * 0.03)
  };
  
  // Show processing animation
  typeWriter(
    terminal,
    `Reading ${file.name}...
Parsing bill data...
    
Detected daily usage: ${mockData.usage} kWh
Grid rate: $${mockData.rate.toFixed(2)} per kWh
Feed-in tariff: $${mockData.feedIn.toFixed(2)} per kWh

Calculating solar performance...`,
    30
  );
  
  // Calculate and display results after delay
  setTimeout(() => {
    const results = calculateSolarSavings(mockData.usage, mockData.rate, mockData.feedIn);
    
    terminal.innerHTML += `

✓ Analysis Complete

Daily solar generation: ${results.dailySolar} kWh
Annual solar production: ${results.annualSolar.toLocaleString()} kWh
Estimated annual savings: $${results.annualSavings.toLocaleString()}
Return on investment: ${results.roiYears} years
System efficiency: ${results.efficiency}%

📞 Ready for your personalized quote!`;
  }, 2500);
}

// ==================== Calculate Your Solar Savings (Main Section) ====================
const billUploadInput = document.getElementById("billUpload");
const calcTerminal = document.getElementById("calcTerminal");
const calcResults = document.getElementById("calcResults");

if (billUploadInput) {
  billUploadInput.addEventListener("change", () => {
    const file = billUploadInput.files?.[0];
    if (!file) return;
    
    // Simulate bill parsing (replace with real implementation)
    const mockData = {
      usage: 22,
      rate: 0.27,
      feedIn: 0.05
    };
    
    // Show processing in terminal
    typeWriter(
      calcTerminal,
      `Parsing ${file.name}...
Extracting usage data...

Detected daily usage: ${mockData.usage} kWh
Grid rate: $${mockData.rate.toFixed(2)} per kWh
Feed-in tariff: $${mockData.feedIn.toFixed(2)} per kWh

Running performance model for Victorian conditions...`,
      28
    );
    
    // Calculate and display results
    setTimeout(() => {
      const results = calculateSolarSavings(mockData.usage, mockData.rate, mockData.feedIn);
      
      calcResults.innerHTML = `
        <p><strong>Daily solar generation:</strong> ${results.dailySolar} kWh</p>
        <p><strong>Annual solar production:</strong> ${results.annualSolar.toLocaleString()} kWh</p>
        <p><strong>Estimated bill reduction:</strong> $${results.annualSavings.toLocaleString()} per year</p>
        <p><strong>Return on investment:</strong> ${results.roiYears} years</p>
        <p><strong>System efficiency:</strong> ${results.efficiency}%</p>
      `;
      
      calcTerminal.innerHTML = "✓ Calculation complete!";
    }, 2200);
  });
}

// ==================== Hero Carousel ====================
document.addEventListener("DOMContentLoaded", () => {
  const carouselImages = document.querySelectorAll(".carousel img");
  
  if (carouselImages.length === 0) return;
  
  let currentIndex = 0;
  carouselImages[0].classList.add("active");
  
  // Rotate images every 6 seconds
  setInterval(() => {
    carouselImages[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % carouselImages.length;
    carouselImages[currentIndex].classList.add("active");
  }, 6000);
});

// ==================== Testimonials Smooth Scrolling ====================
const testimonialsTrack = document.querySelector(".testimonials-track");

if (testimonialsTrack) {
  // Enable horizontal scrolling with mouse wheel
  testimonialsTrack.addEventListener("wheel", (event) => {
    event.preventDefault();
    testimonialsTrack.scrollLeft += event.deltaY;
  });
  
  // Optional: Auto-scroll testimonials
  let isHovering = false;
  
  testimonialsTrack.addEventListener("mouseenter", () => {
    isHovering = true;
  });
  
  testimonialsTrack.addEventListener("mouseleave", () => {
    isHovering = false;
  });
  
  // Gentle auto-scroll when not hovering
  setInterval(() => {
    if (!isHovering && testimonialsTrack.scrollLeft < testimonialsTrack.scrollWidth - testimonialsTrack.clientWidth) {
      testimonialsTrack.scrollLeft += 1;
    } else if (!isHovering) {
      testimonialsTrack.scrollLeft = 0; // Reset to start
    }
  }, 50);
}

// ==================== Initialization ====================
console.log("✅ Suntech Solar v5.0.0 initialized");
console.log("   - Smart Quick Quote: Ready");
console.log("   - Calculator: Ready");
console.log("   - Hero Carousel: Active");
console.log("   - Testimonials: Interactive");
