
    // Client-side validation
    const form = document.getElementById('salaryForm');
    const submitBtn = document.getElementById('submitBtn');
    const experienceInput = document.getElementById('experience');
    const ageInput = document.getElementById('age');

    // Real-time validation
    function validateInputs() {
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

    experienceInput.addEventListener('input', validateInputs);
    ageInput.addEventListener('input', validateInputs);

    form.addEventListener('submit', function(e) {
        if (!validateInputs()) {
            e.preventDefault();
            return false;
        }
        
        document.getElementById('loading').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
    });

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

    // Show result if prediction exists
    {% if predicted_salary %}
        document.getElementById('result').style.display = 'block';
    {% endif %}

    // Plot functionality
    function expandPlot(src) {
        document.getElementById('plotGrid').style.display = 'none';
        document.getElementById('expandedImg').src = src;
        document.getElementById('expandedView').style.display = 'block';
    }

    function collapsePlot() {
        document.getElementById('expandedView').style.display = 'none';
        document.getElementById('plotGrid').style.display = 'grid';
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

    // Form validation feedback
    function showValidationError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add('input-error');
        field.parentElement.classList.add('error');
        
        setTimeout(() => {
            field.classList.remove('input-error');
            field.parentElement.classList.remove('error');
        }, 3000);
    }

    // Re-enable submit button if form submission fails
    window.addEventListener('load', function() {
        submitBtn.disabled = false;
        submitBtn.textContent = '🔮 Predict My Salary';
        document.getElementById('loading').style.display = 'none';
    });
