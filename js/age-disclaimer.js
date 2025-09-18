// Avoid duplicating the modal if it already exists
if (!document.getElementById('age-disclaimer-modal')) {
  // Load the disclaimer modal HTML
  fetch('/components/age-disclaimer.html')
  .then(response => response.text())
  .then(data => {
    // Insert at end of body to avoid layout shifts
    document.body.insertAdjacentHTML('beforeend', data);

    // Show disclaimer if not already accepted
    if (!localStorage.getItem('ageDisclaimerAccepted')) {
      const modal = document.getElementById('age-disclaimer-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    }

    document.getElementById('accept-age-btn').onclick = function () {
      localStorage.setItem('ageDisclaimerAccepted', 'true');
      const modal = document.getElementById('age-disclaimer-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = '';
    };

    document.getElementById('leave-site-btn').onclick = function () {
      window.location.href = "https://www.google.com";
    };

    // No manual close; user must choose one of the actions
  });
}