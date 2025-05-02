// Load the disclaimer modal HTML
fetch('components/age-disclaimer.html')
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('afterbegin', data);

    // Show disclaimer if not already accepted
    if (!localStorage.getItem('ageDisclaimerAccepted')) {
      document.getElementById('age-disclaimer-modal').style.display = 'flex';
      document.body.style.overflow = 'hidden';
    }

    document.getElementById('accept-age-btn').onclick = function() {
      localStorage.setItem('ageDisclaimerAccepted', 'true');
      document.getElementById('age-disclaimer-modal').style.display = 'none';
      document.body.style.overflow = '';
    };

    document.getElementById('leave-site-btn').onclick = function() {
      window.location.href = "https://www.google.com";
    };
  });