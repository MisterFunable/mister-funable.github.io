document.addEventListener('DOMContentLoaded', function () {
  fetch('components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
    });

  // Load language switcher script if not already loaded
  if (!document.querySelector('script[src="js/language-switcher.js"]')) {
    const script = document.createElement('script');
    script.src = 'js/language-switcher.js';
    script.defer = true;
    document.body.appendChild(script);
  }
});