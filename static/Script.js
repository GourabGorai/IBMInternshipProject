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
            // Create a wrapper for interaction
            const wrapper = document.createElement('div');
            wrapper.className = 'matrix-cube-wrapper';
            
            // Create the cube itself for animation
            const cube = document.createElement('div');
            cube.className = 'matrix-cube';
            
            // Set properties on the wrapper for positioning
            wrapper.style.left = Math.random() * 100 + '%';
            wrapper.style.top = Math.random() * 100 + '%';
            
            // Set properties on the cube for animation and character
            cube.setAttribute('data-char', characters[Math.floor(Math.random() * characters.length)]);
            cube.style.animationDelay = Math.random() * 6 + 's';
            cube.style.animationDuration = (Math.random() * 4 + 4) + 's';
            
            // Append cube to wrapper, and wrapper to layer
            wrapper.appendChild(cube);
            matrixLayer.appendChild(wrapper);
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

/**
 * NEW: Initializes mouse interaction to make background cubes avoid the cursor.
 */
function initMouseInteraction() {
    // Select the wrappers for interaction
    const wrappers = document.querySelectorAll('.matrix-cube-wrapper');
    if (wrappers.length === 0) return;

    const repulsionRadius = 150; // Distance from the mouse to start pushing cubes
    const repulsionForce = 80;   // How strongly the cubes are pushed

    // Initialize mouse position off-screen so cubes are not affected on load
    let mouseX = -repulsionRadius;
    let mouseY = -repulsionRadius;

    // Update mouse coordinates on move
    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    // Animation loop to update cube positions
    function updatePositions() {
        wrappers.forEach(wrapper => {
            const rect = wrapper.getBoundingClientRect();
            // Calculate the center of the wrapper
            const wrapperX = rect.left + rect.width / 2;
            const wrapperY = rect.top + rect.height / 2;

            // Calculate vector and distance from mouse to wrapper
            const dx = wrapperX - mouseX;
            const dy = wrapperY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // If the mouse is within the repulsion radius, push the cube away
            if (distance < repulsionRadius) {
                const force = (repulsionRadius - distance) / repulsionRadius;
                const angle = Math.atan2(dy, dx);
                
                const tx = Math.cos(angle) * repulsionForce * force;
                const ty = Math.sin(angle) * repulsionForce * force;
                
                wrapper.style.transform = `translateX(${tx}px) translateY(${ty}px)`;
            } else {
                // Otherwise, reset the transform to let it return to its original position
                wrapper.style.transform = 'translateX(0px) translateY(0px)';
            }
        });
        
        // Continue the animation loop
        requestAnimationFrame(updatePositions);
    }
    // Start the animation loop
    requestAnimationFrame(updatePositions);
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
            themeIcon.textContent = '🌟';
            themeText.textContent = 'Static Mode';
            break;
        case 'static':
            body.classList.add('static-theme');
            themeIcon.textContent = '💻';
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
    
    // NEW: Initialize the mouse avoidance interaction
    initMouseInteraction();

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

// Popup functionality
function openPopup(htmlFile = 'document.html') {
    const modal = document.getElementById('popupModal');
    const iframe = document.getElementById('popupIframe');
    const loading = document.getElementById('popupLoading');
    
    if (!modal || !iframe || !loading) return;
    
    // Show modal
    modal.style.display = 'block';
    
    // Show loading, hide iframe
    loading.style.display = 'flex';
    iframe.style.display = 'none';
    
    // Load the HTML file
    iframe.src = htmlFile;
    
    // Handle iframe load
    iframe.onload = function() {
        loading.style.display = 'none';
        iframe.style.display = 'block';
    };
    
    // Handle iframe error
    iframe.onerror = function() {
        loading.innerHTML = '<p style="color: #ff6b6b;">⚠️ Failed to load document</p>';
    };
}

function closePopup() {
    const modal = document.getElementById('popupModal');
    const iframe = document.getElementById('popupIframe');
    
    if (modal && iframe) {
        modal.style.display = 'none';
        iframe.src = ''; // Clear iframe content
    }
}

// Add event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openPopup');
    const closeBtn = document.getElementById('closePopup');
    const modal = document.getElementById('popupModal');
    
    if (openBtn) {
        openBtn.addEventListener('click', () => openPopup('static/salary_predictor_readme.html')); // Change 'your-file.html' to your actual file name
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }
    
    // Close popup when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePopup();
            }
        });
    }
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });
});

// Make functions globally accessible
window.openPopup = openPopup;
window.closePopup = closePopup;
