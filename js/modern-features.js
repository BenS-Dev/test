// Modern Features JavaScript for Gulfshine Services
// Clean and functional website with proper form handling

// Initialize AOS Animation Library
AOS.init({
  duration: 1000,
  easing: 'ease-out-cubic',
  once: true,
  offset: 100
});

// Initialize hero slider with Swiper
const heroSlider = new Swiper('.hero-slider', {
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  loop: true,
  speed: 1500,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

// Reviews slider
const reviewsSwiper = new Swiper('.reviews-swiper', {
  slidesPerView: 1.15,
  spaceBetween: 24,
  loop: true,
  speed: 9000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  },
  pagination: {
    el: '.reviews-pagination',
    clickable: true
  },
  breakpoints: {
    640: {
      slidesPerView: 1.6
    },
    768: {
      slidesPerView: 2.3
    },
    1024: {
      slidesPerView: 3.2
    },
    1280: {
      slidesPerView: 3.6
    }
  }
});

// Phone input formatting (digits only display)
document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;

  const formatPhone = (digits) => {
    const area = digits.slice(0, 3);
    const prefix = digits.slice(3, 6);
    const line = digits.slice(6, 10);

    if (digits.length <= 3) return area ? `(${area}` : '';
    if (digits.length <= 6) return `(${area}) ${prefix}`.trim();
    return `(${area}) ${prefix}-${line}`.trim();
  };

  const enforceDigits = () => {
    const digits = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    phoneInput.value = formatPhone(digits);
  };

  phoneInput.addEventListener('input', enforceDigits);
  phoneInput.addEventListener('focus', () => phoneInput.setCustomValidity(''));
  phoneInput.addEventListener('blur', () => {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (!digits) {
      phoneInput.value = '';
      phoneInput.setCustomValidity('');
      return;
    }

    if (digits.length !== 10) {
      phoneInput.setCustomValidity('Please enter a 10-digit phone number.');
    } else {
      phoneInput.setCustomValidity('');
      phoneInput.value = formatPhone(digits);
    }
  });
});

// Typing animation for hero title
class TypingAnimation {
  constructor(element, text, speed = 100) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
    this.start();
  }

  start() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.start(), this.speed);
    }
  }
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
  const typingElement = document.querySelector('.typing-text');
  if (typingElement) {
    typingElement.textContent = '';
    new TypingAnimation(typingElement, 'Sparkling Clean Windows', 80);
  }
});

// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll('.counter');

  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current);
        }, 20);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

// Initialize counters
document.addEventListener('DOMContentLoaded', animateCounters);

// Floating Action Button (FAB) functionality
class FloatingActionButton {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    const mainFab = document.getElementById('main-fab');
    const fabContainer = document.querySelector('.fab-container');

    if (mainFab && fabContainer) {
      mainFab.addEventListener('click', () => this.toggle());

      // Close FAB when clicking outside
      document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target) && this.isOpen) {
          this.close();
        }
      });
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    const fabContainer = document.querySelector('.fab-container');
    if (fabContainer) {
      fabContainer.classList.add('open');
    }
  }

  close() {
    this.isOpen = false;
    const fabContainer = document.querySelector('.fab-container');
    if (fabContainer) {
      fabContainer.classList.remove('open');
    }
  }
}

// Initialize FAB
new FloatingActionButton();

// Before/After Image Slider
class BeforeAfterSlider {
  constructor(container) {
    this.container = container;
    this.handle = container.querySelector('.slider-handle');
    this.beforeImage = container.querySelector('.before-image');
    this.afterImage = container.querySelector('.after-image');
    this.isDragging = false;

    this.init();
  }

  init() {
    this.handle.addEventListener('mousedown', (e) => this.startDrag(e));
    this.handle.addEventListener('touchstart', (e) => this.startDrag(e));

    document.addEventListener('mousemove', (e) => this.onDrag(e));
    document.addEventListener('touchmove', (e) => this.onDrag(e));

    document.addEventListener('mouseup', () => this.stopDrag());
    document.addEventListener('touchend', () => this.stopDrag());
  }

  startDrag(e) {
    this.isDragging = true;
    e.preventDefault();
  }

  onDrag(e) {
    if (!this.isDragging) return;

    const rect = this.container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;

    const clampedX = Math.min(Math.max(x, 0), 100);

    this.handle.style.left = `${clampedX}%`;
    this.afterImage.style.clipPath = `inset(0 0 0 ${clampedX}%)`;
  }

  stopDrag() {
    this.isDragging = false;
  }
}

// Initialize before/after sliders
document.querySelectorAll('.before-after-slider').forEach(slider => {
  new BeforeAfterSlider(slider);
});

// Form handling for Web3Forms
class Web3FormHandler {
  constructor(formId, options = {}) {
    this.form = document.getElementById(formId);
    if (!this.form) return;

    this.submitButton = this.form.querySelector('[type="submit"]');
    this.originalButtonText = this.submitButton?.innerHTML;
    this.successMessage = options.successMessage || this.defaultSuccessMessage();
    this.errorMessage = options.errorMessage || this.defaultErrorMessage();
    this.autoReset = options.autoReset ?? true;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  async handleSubmit(e) {
    e.preventDefault();

    const accessKeyInput = this.form.querySelector('input[name="access_key"]');
    const accessKey = accessKeyInput?.value?.trim();
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      alert('Please configure your Web3Forms access key in the HTML file.');
      return;
    }

    try {
      const formData = new FormData(this.form);

      const services = formData.getAll('services[]');
      if (services.length) {
        formData.set('services', services.join(', '));
        formData.delete('services[]');
      } else if (this.form.querySelectorAll('input[name="services[]"]').length) {
        this.renderMessage('error', `
          <div style="background: #EF4444; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;">
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Please choose at least one service.</strong>
          </div>
        `);
        return;
      }

      if (!formData.has('form_origin')) {
        formData.set('form_origin', this.form.getAttribute('data-form-label') || this.form.id);
      }

      this.setLoading(true);

      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        this.showSuccess();
        if (this.autoReset) {
          this.form.reset();
        }
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      this.showError();
      console.error('Form submission error:', error);
    } finally {
      this.setLoading(false);
    }
  }

  setLoading(loading) {
    if (!this.submitButton) return;

    if (loading) {
      this.submitButton.disabled = true;
      this.submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    } else {
      this.submitButton.disabled = false;
      this.submitButton.innerHTML = this.originalButtonText;
    }
  }

  showSuccess() {
    this.renderMessage('success', this.successMessage);
  }

  showError() {
    this.renderMessage('error', this.errorMessage);
  }

  renderMessage(type, html) {
    this.clearMessages();
    const wrapper = document.createElement('div');
    wrapper.className = `form-${type}`;
    wrapper.innerHTML = html;
    this.form.appendChild(wrapper);
    setTimeout(() => {
      wrapper.remove();
    }, 5000);
  }

  clearMessages() {
    const existingMessages = this.form.querySelectorAll('.form-success, .form-error');
    existingMessages.forEach(msg => msg.remove());
  }

  defaultSuccessMessage() {
    return `
      <div style="background: #10B981; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;">
        <i class="fas fa-check-circle"></i>
        <strong>Thanks for reaching out!</strong><br>
        We'll get back to you within one business day.
      </div>
    `;
  }

  defaultErrorMessage() {
    return `
      <div style="background: #EF4444; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;">
        <i class="fas fa-exclamation-triangle"></i>
        <strong>Something went wrong.</strong><br>
        Please try again or call us directly at <a href="tel:+18444853744" style="color: white; text-decoration: underline;">1-844-485-3744</a>
      </div>
    `;
  }
}

new Web3FormHandler('quote-form', {
  successMessage: `
    <div style="background: #10B981; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; text-align: center;">
      <i class="fas fa-check-circle"></i>
      <strong>Request sent successfully!</strong><br>
      We'll respond within 24 hours with your detailed estimate.
    </div>
  `
});

// Smooth scrolling for anchor links
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

// Parallax effect for hero section
function parallaxEffect() {
  const hero = document.querySelector('.hero-section');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
}

window.addEventListener('scroll', parallaxEffect);

// Add micro-interactions and hover effects
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects to service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
      this.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
      this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    });
  });

  // Add pulse animation to trust badges
  const trustBadges = document.querySelectorAll('.trust-badge');
  trustBadges.forEach((badge, index) => {
    setTimeout(() => {
      badge.style.animation = 'pulse 2s infinite';
    }, index * 200);
  });
});

console.log('✅ Gulfshine modern features loaded successfully!');
