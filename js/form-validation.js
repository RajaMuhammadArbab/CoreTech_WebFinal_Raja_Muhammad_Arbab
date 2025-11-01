// Form validation for contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // In a real application, you would send the form data to a server here
                // For this demo, we'll just show a success message
                showSuccessMessage();
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    document.getElementById('form-success').classList.add('hidden');
                }, 5000);
            }
        });
        
        // Real-time validation
        setupRealTimeValidation();
    }
});

function validateForm() {
    let isValid = true;
    
    // Name validation
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (!name.value.trim()) {
        showError(name, nameError, 'Please enter your name');
        isValid = false;
    } else {
        clearError(name, nameError);
    }
    
    // Email validation
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, emailError, 'Please enter your email address');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, emailError, 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email, emailError);
    }
    
    // Subject validation
    const subject = document.getElementById('subject');
    const subjectError = document.getElementById('subject-error');
    if (!subject.value.trim()) {
        showError(subject, subjectError, 'Please enter a subject');
        isValid = false;
    } else {
        clearError(subject, subjectError);
    }
    
    // Message validation
    const message = document.getElementById('message');
    const messageError = document.getElementById('message-error');
    if (!message.value.trim()) {
        showError(message, messageError, 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, messageError, 'Message must be at least 10 characters long');
        isValid = false;
    } else {
        clearError(message, messageError);
    }
    
    return isValid;
}

function showError(field, errorElement, message) {
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function clearError(field, errorElement) {
    field.classList.remove('error');
    errorElement.classList.add('hidden');
}

function showSuccessMessage() {
    const successElement = document.getElementById('form-success');
    successElement.classList.remove('hidden');
}

function setupRealTimeValidation() {
    const fields = ['name', 'email', 'subject', 'message'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId}-error`);
        
        if (field && errorElement) {
            field.addEventListener('blur', function() {
                validateField(fieldId);
            });
            
            field.addEventListener('input', function() {
                if (field.classList.contains('error')) {
                    validateField(fieldId);
                }
            });
        }
    });
}

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    switch(fieldId) {
        case 'name':
            if (!field.value.trim()) {
                showError(field, errorElement, 'Please enter your name');
            } else {
                clearError(field, errorElement);
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                showError(field, errorElement, 'Please enter your email address');
            } else if (!emailRegex.test(field.value)) {
                showError(field, errorElement, 'Please enter a valid email address');
            } else {
                clearError(field, errorElement);
            }
            break;
            
        case 'subject':
            if (!field.value.trim()) {
                showError(field, errorElement, 'Please enter a subject');
            } else {
                clearError(field, errorElement);
            }
            break;
            
        case 'message':
            if (!field.value.trim()) {
                showError(field, errorElement, 'Please enter your message');
            } else if (field.value.trim().length < 10) {
                showError(field, errorElement, 'Message must be at least 10 characters long');
            } else {
                clearError(field, errorElement);
            }
            break;
    }
}