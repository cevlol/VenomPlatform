/* ===================================
   SUNTECH SOLAR SYSTEMS - MAIN SCRIPT
   =================================== */

// Calculator data storage
let calculatedData = {
    customerName: '',
    customerAddress: '',
    nmi: '',
    solarSize: '',
    batterySize: '',
    annualSavings: 0,
    totalRebates: 0,
    paybackYears: 0,
    backupPower: ''
};

// Current selections
let selectedSolar = null;
let selectedBattery = null;

// Solar system data
const solarData = {
    '6.6kW': { systemSize: '6.6kW', yearlySavings: 1800, stcRebate: 2500, payback: 3.5 },
    '10kW': { systemSize: '10kW', yearlySavings: 2800, stcRebate: 3500, payback: 3.8 },
    '13.2kW': { systemSize: '13.2kW', yearlySavings: 3600, stcRebate: 4200, payback: 4.2 }
};

// Battery data
const batteryData = {
    'none': { capacity: 'No Battery', yearlySavings: 0, rebate: 0, backupPower: 'No' },
    '5kWh': { capacity: '5kWh Battery', yearlySavings: 600, rebate: 1400, backupPower: '4-6 hours' },
    '10kWh': { capacity: '10kWh Battery', yearlySavings: 1200, rebate: 2800, backupPower: '8-12 hours' },
    '15kWh': { capacity: '15kWh Battery', yearlySavings: 1800, rebate: 4200, backupPower: '12-18 hours' }
};

// Option button selection functions
function selectSolarOption(button) {
    // Remove selected class from all solar buttons
    document.querySelectorAll('#solarButtons .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    button.classList.add('selected');
    selectedSolar = button.getAttribute('data-value');
}

function selectBatteryOption(button) {
    // Remove selected class from all battery buttons
    document.querySelectorAll('#batteryButtons .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Add selected class to clicked button
    button.classList.add('selected');
    selectedBattery = button.getAttribute('data-value');
}

// Theme data for demographic targeting
const themes = {
    trust: {
        headline: "Stop Paying $600+ Quarterly<br>Start Saving Today",
        subtitle: "Join 300+ Victorian homeowners who've slashed their power bills by 85%. Get expert installation from our NETCC-certified team with 10-year warranty protection.",
        primaryBtn: "Calculate My Savings →",
        secondaryBtn: "Talk to Expert Now"
    },
    young: {
        headline: "Your First Home?<br>Make it Energy Smart",
        subtitle: "Young homeowners are saving $1,800+ yearly with solar. Lock in low energy costs before your first baby arrives. Interest-free payment plans available.",
        primaryBtn: "See My Savings →",
        secondaryBtn: "Book Free Consultation"
    },
    family: {
        headline: "Cut Your Family's<br>Energy Bills by 85%",
        subtitle: "With kids, pets, and constant laundry, energy bills add up fast. Join 200+ Bass Coast families who've slashed their quarterly bills from $650 to under $100.",
        primaryBtn: "Calculate Family Savings →",
        secondaryBtn: "Talk to a Parent Expert"
    },
    mature: {
        headline: "Secure Your Retirement<br>with Lower Bills",
        subtitle: "Fixed income? Rising power costs hurt. Our mature-age clients save $2,000+ yearly with solar. No upfront cost with government rebates. 25-year warranty for peace of mind.",
        primaryBtn: "View My Rebates →",
        secondaryBtn: "Speak to Specialist"
    },
    business: {
        headline: "Reduce Operating Costs<br>Increase Profit Margins",
        subtitle: "Commercial solar delivers 15-20% ROI. Write off 100% in year one. Join local businesses saving $8,000+ annually. Site assessment within 48 hours.",
        primaryBtn: "Business Quote →",
        secondaryBtn: "Call Commercial Team"
    },
    ev: {
        headline: "Charge Your EV for Free<br>with Home Solar",
        subtitle: "Stop paying $800+ yearly at charging stations. Power your EV with rooftop solar and save. Battery storage ensures 24/7 charging availability.",
        primaryBtn: "Calculate EV Savings →",
        secondaryBtn: "EV Solar Specialist"
    },
    battery: {
        headline: "Upgrade to Battery Storage<br>Never Lose Power Again",
        subtitle: "Already have solar? Add battery storage and become energy independent. $4,400 government rebate available. Keep fridges running during blackouts.",
        primaryBtn: "Battery Quote →",
        secondaryBtn: "Book Battery Assessment"
    },
    rural: {
        headline: "Rural Power Bills Out of Control?<br>Go Solar Today",
        subtitle: "Regional Victorians pay 30% more for electricity. Solar + battery gives you energy independence. We service all of Bass Coast and Gippsland.",
        primaryBtn: "Rural Solar Quote →",
        secondaryBtn: "Call Regional Team"
    },
    summer: {
        headline: "🌞 Summer Solar Sale<br>Save $3,500 on Installation",
        subtitle: "Limited time: Premium 6.6kW system for $3,999 (normally $7,499). Includes 10-year warranty, 25-year panel guarantee. Only 15 spots left this month!",
        primaryBtn: "Claim Summer Discount →",
        secondaryBtn: "Check Availability"
    }
};

// Calculate savings
function calculateSavings() {
    // Check if selections are made
    if (!selectedSolar || !selectedBattery) {
        alert('Please select both a solar system size and battery storage option');
        return;
    }

    // Get solar and battery data
    const solar = solarData[selectedSolar];
    const battery = batteryData[selectedBattery];
    const totalAnnual = solar.yearlySavings + battery.yearlySavings;
    const totalRebate = solar.stcRebate + battery.rebate;
    let payback = solar.payback;
    if (selectedBattery !== 'none') {
        payback += 0.5;
    }

    // Update calculated data
    calculatedData = {
        ...calculatedData,
        solarSize: solar.systemSize,
        batterySize: battery.capacity,
        annualSavings: totalAnnual,
        totalRebates: totalRebate,
        paybackYears: payback.toFixed(1),
        backupPower: battery.backupPower
    };

    // Display results
    document.getElementById('annualSavings').textContent = '$' + totalAnnual.toLocaleString();
    document.getElementById('totalRebate').textContent = '$' + totalRebate.toLocaleString();
    document.getElementById('payback').textContent = payback.toFixed(1) + ' yrs';
    document.getElementById('backupPower').textContent = battery.backupPower === 'No' ? 'None' : battery.backupPower;
    document.getElementById('results').classList.add('show');

    // Smooth scroll to results
    setTimeout(() => {
        document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

// Reset calculator
function resetCalculator() {
    // Clear button selections
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    selectedSolar = null;
    selectedBattery = null;
    
    document.getElementById('results').classList.remove('show');
    document.getElementById('calcTerminal').classList.remove('show');
}

// Bill upload processor with typewriter terminal effect
function processBill(input) {
    if (!input || !input.files || input.files.length === 0) return;
    
    const terminal = document.getElementById('calcTerminal');
    const fileName = input.files[0].name;
    
    terminal.classList.add('show');
    terminal.textContent = '';
    
    const messages = [
        '> Uploading ' + fileName + '...',
        '> Processing PDF...',
        '> Extracting customer details...',
        '> Extracting usage data...',
        '> Analyzing quarterly consumption...',
        '> ✓ Complete!\n',
        '  Customer: John Smith\n  Address: 123 Main St, Wonthaggi VIC\n  NMI: 1234567890\n  Daily usage: 27 kWh\n  Quarterly bill: $520\n  Recommended: 6.6kW system + 10kWh battery'
    ];
    
    let messageIndex = 0;
    
    function typeMessage() {
        if (messageIndex < messages.length) {
            terminal.textContent += messages[messageIndex] + '\n';
            messageIndex++;
            
            // Extract customer data when processing completes
            if (messageIndex === messages.length) {
                // Store extracted data from bill (mock data for demo)
                calculatedData.customerName = 'John Smith';
                calculatedData.customerAddress = '123 Main St, Wonthaggi VIC';
                calculatedData.nmi = '1234567890';
            }
            
            setTimeout(typeMessage, 600);
        }
    }
    
    typeMessage();
}
function openTallyWithData() {
    if (!calculatedData.solarSize) {
        alert('Please calculate your savings first!');
        return;
    }

    const tallyUrl = 'https://tally.so/r/EkzWlq';
    const params = new URLSearchParams({
        'customer_name': calculatedData.customerName || '',
        'customer_address': calculatedData.customerAddress || '',
        'nmi_number': calculatedData.nmi || '',
        'solar_system': calculatedData.solarSize,
        'battery_storage': calculatedData.batterySize,
        'estimated_annual_savings': `$${calculatedData.annualSavings}`,
        'total_rebates': `$${calculatedData.totalRebates}`,
        'payback_period': `${calculatedData.paybackYears} years`,
        'backup_power': calculatedData.backupPower
    });

    window.open(`${tallyUrl}?${params.toString()}`, '_blank');
    console.log('Calculator data sent to Tally:', calculatedData);
}

// Theme switching
function switchTheme(key) {
    console.log('Theme switched to:', key);
    const theme = themes[key] || themes.trust;

    // Update slogan content
    const headline = document.getElementById('sloganHeadline');
    const subtitle = document.getElementById('sloganSubtitle');
    const primaryBtn = document.querySelector('.slogan-btn-primary');
    const secondaryBtn = document.querySelector('.slogan-btn-secondary');

    if (headline) headline.innerHTML = theme.headline;
    if (subtitle) subtitle.textContent = theme.subtitle;
    if (primaryBtn) primaryBtn.innerHTML = theme.primaryBtn;
    if (secondaryBtn) secondaryBtn.textContent = theme.secondaryBtn;

    // Smooth fade animation
    const sloganContainer = document.getElementById('sloganContainer');
    if (sloganContainer) {
        sloganContainer.style.opacity = '0';
        setTimeout(() => {
            sloganContainer.style.transition = 'opacity 0.5s ease';
            sloganContainer.style.opacity = '1';
        }, 50);
    }

    // Store theme preference
    try {
        localStorage.setItem('selectedTheme', key);
    } catch (e) {
        console.log('Could not save theme preference');
    }
}

// Quick Quote functionality (sidebar)
let selectedPackage = null;

function selectPackage(kind) {
    selectedPackage = kind;
    let imgHtml = "";
    let packageInfo = "";

    if (kind === 'panels') {
        imgHtml = '<img src="assets/jinko.png" alt="Solar Panels" class="product-img" style="max-width: 200px; margin: 12px auto;"/>';
        packageInfo = 'Premium solar panels selected';
    }
    if (kind === 'battery') {
        imgHtml = '<img src="assets/growatt.png" alt="Battery Storage" class="product-img" style="max-width: 200px; margin: 12px auto;"/>';
        packageInfo = 'Battery storage selected';
    }
    if (kind === 'combo') {
        imgHtml = '<img src="assets/jinko.png" alt="Solar Panels" class="product-img" style="max-width: 150px; margin: 8px auto;"/><img src="assets/growatt.png" alt="Battery" class="product-img" style="max-width: 150px; margin: 8px auto;"/>';
        packageInfo = 'Complete solar + battery system selected';
    }

    const qqOut = document.getElementById('qqOutput');
    if (qqOut) {
        qqOut.innerHTML = `
            <div class="quote-summary" style="text-align: center; padding: 20px;">
                ${imgHtml}
                <p style="margin-top: 16px; color: var(--cyan); font-family: var(--font-ui);">
                    ${packageInfo}
                </p>
                <p style="margin-top: 12px; color: var(--text-muted); font-size: 14px;">
                    Upload your bill for a personalized quote
                </p>
            </div>
        `;
    }
}

// Image carousel rotation
function initializeCarousel() {
    const carousel = document.getElementById('imageCarousel');
    if (!carousel) return;

    const images = carousel.querySelectorAll('img');
    let currentIndex = 0;

    function rotateImages() {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
    }

    // Rotate every 4 seconds
    setInterval(rotateImages, 4000);
}

// Slogan highlight animation
function revealSloganHighlight() {
    const highlights = document.querySelectorAll('.slogan-highlight');
    highlights.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 200);
    });
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
}

// Bill upload processor (mock)
function processBill(input) {
    if (!input || !input.files || input.files.length === 0) return;

    const uploadResults = document.getElementById('uploadResults');
    if (uploadResults) {
        uploadResults.style.display = 'block';
        setTimeout(() => {
            document.getElementById('dailyUsage').textContent = '27kWh';
            document.getElementById('quarterlyAmt').textContent = '$520';
        }, 900);
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🌞 Suntech Solar Systems - Initialized');

    // Load saved theme
    try {
        const savedTheme = localStorage.getItem('selectedTheme');
        if (savedTheme && themes[savedTheme]) {
            switchTheme(savedTheme);
        } else {
            switchTheme('trust');
        }
    } catch (e) {
        switchTheme('trust');
    }

    // Initialize carousel
    initializeCarousel();

    // Initialize smooth scrolling
    initializeSmoothScroll();

    // Reveal slogan highlights
    setTimeout(revealSloganHighlight, 500);

    // Make functions globally available
    window.calculateSavings = calculateSavings;
    window.resetCalculator = resetCalculator;
    window.openTallyWithData = openTallyWithData;
    window.switchTheme = switchTheme;
    window.selectPackage = selectPackage;
    window.processBill = processBill;
    window.selectSolarOption = selectSolarOption;
    window.selectBatteryOption = selectBatteryOption;
});

// Anti-scrape protection (optional)
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

// Keyboard accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const active = document.activeElement;
        if (active && active.tagName === 'BUTTON') {
            active.click();
        }
    }
});

console.log('✅ Suntech Solar Systems v6.2.0 - Bebas Neue Edition');
