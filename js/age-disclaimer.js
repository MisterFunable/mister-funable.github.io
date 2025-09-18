// Avoid injecting or duplicating the modal unnecessarily
(function initAgeDisclaimer() {
  // If already accepted, don't load or inject the modal at all
  if (localStorage.getItem('ageDisclaimerAccepted')) return;

  // If modal already exists in DOM, avoid fetching again
  if (document.getElementById('age-disclaimer-modal')) return;

  // Load the disclaimer modal HTML only when needed
  fetch('/components/age-disclaimer.html')
    .then(response => response.text())
    .then(data => {
      // Insert at end of body to avoid layout shifts
      document.body.insertAdjacentHTML('beforeend', data);

      const modal = document.getElementById('age-disclaimer-modal');
      if (!modal) return;

      // Ensure it's visible even if utility classes aren't present
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      // Also keep existing utility classes for Tailwind-enabled pages
      modal.classList.remove('hidden');
      modal.classList.add('flex');

      const acceptBtn = document.getElementById('accept-age-btn');
      const leaveBtn = document.getElementById('leave-site-btn');

      if (acceptBtn) {
        acceptBtn.onclick = function () {
          localStorage.setItem('ageDisclaimerAccepted', 'true');
          document.body.style.overflow = '';
          // Remove the modal entirely to prevent any leftover layout effects
          if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
          }
        };
      }

      if (leaveBtn) {
        leaveBtn.onclick = function () {
          window.location.href = 'https://www.google.com';
        };
      }
    })
    .catch(() => {
      // Fail silently; do not block the page if the disclaimer cannot load
    });
})();