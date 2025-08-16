// Toggle menu mobile
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Scroll animations
function handleScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    // Observe all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Close mobile menu when clicking on a link
function initMobileMenuClose() {
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.remove('active');
        });
    });
}

// Handle contact form with Formspree
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Verificar si el formulario fue enviado exitosamente
        checkFormSubmissionStatus();

        contactForm.addEventListener('submit', function(e) {
            // No prevenir el comportamiento por defecto - permitir que Formspree maneje el envío

            // Mostrar indicador de carga
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;

            // Agregar clase de loading al formulario
            contactForm.classList.add('form-submitting');

            // Restaurar el botón después de un tiempo (por si hay error de red)
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                contactForm.classList.remove('form-submitting');
            }, 10000);
        });
    }
}

// Verificar si el formulario fue enviado exitosamente
function checkFormSubmissionStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('enviado') === 'true') {
        // Mostrar mensaje de éxito
        showSuccessMessage();
        // Limpiar la URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Mostrar mensaje de éxito
function showSuccessMessage() {
    // Crear un elemento de notificación
    const successDiv = document.createElement('div');
    successDiv.className = 'success-notification';
    successDiv.innerHTML = `
        <div class="success-content">
            <span class="success-icon">✅</span>
            <div class="success-message">
                <h4>¡Mensaje enviado exitosamente!</h4>
                <p>Nos pondremos en contacto contigo pronto.</p>
            </div>
            <button class="success-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    // Insertar al inicio del body
    document.body.insertBefore(successDiv, document.body.firstChild);

    // Auto-remover después de 8 segundos
    setTimeout(() => {
        if (successDiv.parentElement) {
            successDiv.style.opacity = '0';
            setTimeout(() => {
                if (successDiv.parentElement) {
                    successDiv.remove();
                }
            }, 300);
        }
    }, 8000);
}

// Mostrar mensaje de error (opcional)
function showErrorMessage() {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <span class="error-icon">❌</span>
            <div class="error-message">
                <h4>Error al enviar el mensaje</h4>
                <p>Por favor, inténtalo nuevamente o contáctanos directamente.</p>
            </div>
            <button class="error-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;

    document.body.insertBefore(errorDiv, document.body.firstChild);

    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.style.opacity = '0';
            setTimeout(() => {
                if (errorDiv.parentElement) {
                    errorDiv.remove();
                }
            }, 300);
        }
    }, 8000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
    initSmoothScrolling();
    initMobileMenuClose();
    initContactForm();

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');

        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
});

// Handle window resize
window.addEventListener('resize', function() {
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});