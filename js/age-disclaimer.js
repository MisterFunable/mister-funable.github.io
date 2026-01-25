/**
 * Modern Age Disclaimer Modal
 * Shows enhanced 18+ warning with image and animations
 */

(function initAgeDisclaimer() {
  'use strict';

  // If already accepted, don't load modal
  if (localStorage.getItem('ageDisclaimerAccepted')) return;

  // If modal already exists, avoid duplicating
  if (document.getElementById('age-disclaimer-modal')) return;

  // Load the disclaimer modal HTML
  fetch('/components/age-disclaimer.html')
    .then(response => response.text())
    .then(data => {
      // Insert at end of body
      document.body.insertAdjacentHTML('beforeend', data);

      const modal = document.getElementById('age-disclaimer-modal');
      if (!modal) return;

      // Prevent body scrolling
      document.body.style.overflow = 'hidden';

      const acceptBtn = document.getElementById('accept-age-btn');
      const leaveBtn = document.getElementById('leave-site-btn');

      // Accept button handler
      if (acceptBtn) {
        acceptBtn.onclick = function() {
          // Store acceptance
          localStorage.setItem('ageDisclaimerAccepted', 'true');

          // Fade out animation
          modal.style.opacity = '0';
          modal.style.transform = 'scale(0.95)';
          modal.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

          // Restore scrolling and remove modal after animation
          setTimeout(() => {
            document.body.style.overflow = '';
            if (modal && modal.parentNode) {
              modal.parentNode.removeChild(modal);
            }
          }, 400);
        };
      }

      // Leave button handler
      if (leaveBtn) {
        leaveBtn.onclick = function() {
          window.location.href = 'https://www.google.com';
        };
      }

      // Prevent closing by clicking outside (force user choice)
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          // Shake animation to indicate user must choose
          const content = modal.querySelector('.age-disclaimer-content');
          if (content) {
            content.style.animation = 'shake 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            setTimeout(() => {
              content.style.animation = '';
            }, 500);
          }
        }
      });

      // Add shake animation keyframes if not exists
      if (!document.querySelector('style[data-age-shake]')) {
        const style = document.createElement('style');
        style.setAttribute('data-age-shake', 'true');
        style.textContent = `
          @keyframes shake {
            0%, 100% { transform: translateX(0) scale(1); }
            25% { transform: translateX(-10px) scale(1.02); }
            75% { transform: translateX(10px) scale(1.02); }
          }
        `;
        document.head.appendChild(style);
      }

      // Update language if language switcher is available
      if (typeof updateLanguageForElement === 'function') {
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        modal.querySelectorAll('[data-lang-en]').forEach(el => {
          if (el.hasAttribute(`data-lang-${currentLang}`)) {
            if (el.tagName === 'BUTTON') {
              el.textContent = el.getAttribute(`data-lang-${currentLang}`);
            } else {
              el.textContent = el.getAttribute(`data-lang-${currentLang}`);
            }
          }
        });
      }
    })
    .catch(error => {
      console.warn('Age disclaimer failed to load:', error);
      // Fail gracefully - don't block site
    });
})();
