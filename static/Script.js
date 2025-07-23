// External JavaScript file for Salary Predictor
// salary-predictor.js

// Matrix 3D Effect
function createMatrix3D() {
    const container = document.querySelector('.matrix-3d');
    if (!container) return; // Guard clause
    
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*(){}[]|\\:";\'<>?,./';
    
    for (let layer = 0; layer < 3; layer++) {
        const matrixLayer = document.createElement('div');
        matrixLayer.className = 'matrix-layer';
        matrixLayer.style.animationDelay = (layer * 10) + 's';
        
        for (let i = 0; i < 30; i++) {
            const cube = document.createElement('div');
            cube.className = 'matrix-cube';
            cube.setAttribute('data-char', characters[Math.floor(Math.random() * characters.length)]);
            cube.style.left = Math.random() * 100 + '%';
            cube.style.top = Math.random() * 100 + '%';
            cube.style.animationDelay = Math.random() * 6 + 's';
            cube.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            matrixLayer.appendChild(cube);
        }
        
        container.appendChild(matrixLayer);
    }
    
    // Update characters periodically
    setInterval(() => {
        const cubes = container.querySelectorAll('.matrix-cube');
        cubes.forEach(cube => {
            if (Math.random() < 0.1) {
                cube.setAttribute('data-char', characters[Math.floor(Math.random() * characters.length)]);
            }
        });
    }, 500);
}

// Form validation functions
function validateInputs() {
    const experienceInput = document.getElementById('experience');
    const ageInput = document.getElementById('age');
    
    if (!experienceInput || !ageInput) return true; // Guard clause
    
    const experience = parseInt(experienceInput.value);
    const age = parseInt(ageInput.value);
    
    // Remove previous error classes
    experienceInput.classList.remove('input-error', 'input-success');
    ageInput.classList.remove('input-error', 'input-success');
    
    let isValid = true;
    
    // Check if experience > age
    if (experience && age && experience >= age) {
        experienceInput.classList.add('input-error');
        ageInput.classList.add('input-error');
        isValid = false;
    } else {
        if (experience >= 0) experienceInput.classList.add('input-success');
        if (age > 0) ageInput.classList.add('input-success');
    }
    
    // Check for negative values
    if (experience < 0 && experienceInput.value !== '') {
        experienceInput.classList.add('input-error');
        isValid = false;
    }
    
    if (age <= 0 && ageInput.value !== '') {
        ageInput.classList.add('input-error');
        isValid = false;
    }
    
    return isValid;
}

function showValidationError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    
    field.classList.add('input-error');
    field.parentElement.classList.add('error');
    
    setTimeout(() => {
        field.classList.remove('input-error');
        field.parentElement.classList.remove('error');
    }, 3000);
}

// Plot functionality
function expandPlot(src) {
    const plotGrid = document.getElementById('plotGrid');
    const expandedView = document.getElementById('expandedView');
    const expandedImg = document.getElementById('expandedImg');
    
    if (plotGrid && expandedView && expandedImg) {
        plotGrid.style.display = 'none';
        expandedImg.src = src;
        expandedView.style.display = 'block';
    }
}

function collapsePlot() {
    const plotGrid = document.getElementById('plotGrid');
    const expandedView = document.getElementById('expandedView');
    
    if (plotGrid && expandedView) {
        expandedView.style.display = 'none';
        plotGrid.style.display = 'grid';
    }
}

// Theme switching functionality
let currentTheme = 'matrix'; // default theme
const themes = ['matrix', 'modern', 'static']; // Added static theme

function initTheme() {
    const savedTheme = localStorage.getItem('salary-predictor-theme') || 'matrix';
    setTheme(savedTheme);
}

function setTheme(theme) {
    currentTheme = theme;
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (!body || !themeBtn || !themeIcon || !themeText) return;
    
    // Remove all theme classes
    body.classList.remove('modern-theme', 'static-theme');
    
    // Apply theme based on selection
    switch(theme) {
        case 'modern':
            body.classList.add('modern-theme');
            themeIcon.textContent = '🎨';
            themeText.textContent = 'Static Mode';
            break;
        case 'static':
            body.classList.add('static-theme');
            themeIcon.textContent = '🔮';
            themeText.textContent = 'Matrix Mode';
            break;
        default: // matrix theme
            themeIcon.textContent = '🌙';
            themeText.textContent = 'Modern Mode';
            break;
    }
    
    localStorage.setItem('salary-predictor-theme', theme);
}

function toggleTheme() {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    setTheme(newTheme);
}

// Initialize everything when DOM is ready
function initializePage() {
    // Create Matrix 3D effect
    createMatrix3D();
    
    // Initialize theme
    initTheme();
    
    // Form elements
    const form = document.getElementById('salaryForm');
    const submitBtn = document.getElementById('submitBtn');
    const experienceInput = document.getElementById('experience');
    const ageInput = document.getElementById('age');
    const themeToggle = document.getElementById('themeToggle');
    
    // Add validation listeners
    if (experienceInput) {
        experienceInput.addEventListener('input', validateInputs);
    }
    if (ageInput) {
        ageInput.addEventListener('input', validateInputs);
    }
    
    // Form submit handler
    if (form && submitBtn) {
        form.addEventListener('submit', function(e) {
            if (!validateInputs()) {
                e.preventDefault();
                return false;
            }
            
            const loading = document.getElementById('loading');
            const result = document.getElementById('result');
            
            if (loading) loading.style.display = 'block';
            if (result) result.style.display = 'none';
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';
        });
    }
    
    // Enhanced form interactions
    document.querySelectorAll('input, select').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });

        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Theme toggle listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Auto-hide flash messages after 5 seconds
    setTimeout(function() {
        const flashMessages = document.querySelectorAll('.flash-message');
        flashMessages.forEach(msg => {
            msg.style.transition = 'opacity 0.5s ease';
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 500);
        });
    }, 5000);
    
    // Re-enable submit button if form submission fails
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = '🔮 Predict My Salary';
    }
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    // DOM is already loaded
    initializePage();
}

// Global functions that need to be accessible from HTML
window.expandPlot = expandPlot;
window.collapsePlot = collapsePlot;
