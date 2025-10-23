// Authentication JavaScript

// ============================================
// TAB SWITCHING
// ============================================
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');

loginTab.addEventListener('click', () => {
    loginTab.classList.add('text-ocean-blue', 'border-ocean-blue');
    loginTab.classList.remove('text-medium-gray', 'border-transparent');
    signupTab.classList.remove('text-ocean-blue', 'border-ocean-blue');
    signupTab.classList.add('text-medium-gray', 'border-transparent');
    
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('text-ocean-blue', 'border-ocean-blue');
    signupTab.classList.remove('text-medium-gray', 'border-transparent');
    loginTab.classList.remove('text-ocean-blue', 'border-ocean-blue');
    loginTab.classList.add('text-medium-gray', 'border-transparent');
    
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

// ============================================
// LOGIN FORM HANDLER
// ============================================
const loginFormElement = document.getElementById('login-form-element');
const loginError = document.getElementById('login-error');
const loginBtnText = document.getElementById('login-btn-text');
const loginSpinner = document.getElementById('login-spinner');

loginFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous errors
    loginError.classList.add('hidden');
    
    // Show loading state
    loginBtnText.classList.add('hidden');
    loginSpinner.classList.remove('hidden');
    
    const formData = new FormData(loginFormElement);
    const data = {
        email: formData.get('email'),
        password: formData.get('password')
    };
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Success - redirect to home
            window.location.href = '/';
        } else {
            // Show error
            loginError.textContent = result.error || 'Login failed';
            loginError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Login error:', error);
        loginError.textContent = 'Network error. Please try again.';
        loginError.classList.remove('hidden');
    } finally {
        // Reset button state
        loginBtnText.classList.remove('hidden');
        loginSpinner.classList.add('hidden');
    }
});

// ============================================
// SIGNUP FORM HANDLER
// ============================================
const signupFormElement = document.getElementById('signup-form-element');
const signupError = document.getElementById('signup-error');
const signupSuccess = document.getElementById('signup-success');
const signupBtnText = document.getElementById('signup-btn-text');
const signupSpinner = document.getElementById('signup-spinner');

signupFormElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Hide previous messages
    signupError.classList.add('hidden');
    signupSuccess.classList.add('hidden');
    
    const formData = new FormData(signupFormElement);
    const password = formData.get('password');
    const passwordConfirm = formData.get('passwordConfirm');
    
    // Validate password match
    if (password !== passwordConfirm) {
        signupError.textContent = 'Passwords do not match';
        signupError.classList.remove('hidden');
        return;
    }
    
    // Show loading state
    signupBtnText.classList.add('hidden');
    signupSpinner.classList.remove('hidden');
    
    const data = {
        email: formData.get('email'),
        password: password,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        phone: formData.get('phone')
    };
    
    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Success
            signupSuccess.textContent = result.message || 'Account created successfully! Redirecting...';
            signupSuccess.classList.remove('hidden');
            
            // Redirect after 1.5 seconds
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
        } else {
            // Show error
            signupError.textContent = result.error || 'Signup failed';
            signupError.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Signup error:', error);
        signupError.textContent = 'Network error. Please try again.';
        signupError.classList.remove('hidden');
    } finally {
        // Reset button state
        signupBtnText.classList.remove('hidden');
        signupSpinner.classList.add('hidden');
    }
});

// ============================================
// PASSWORD STRENGTH INDICATOR (Optional Enhancement)
// ============================================
const signupPassword = document.getElementById('signup-password');
if (signupPassword) {
    signupPassword.addEventListener('input', (e) => {
        const password = e.target.value;
        // You can add password strength visualization here
    });
}
