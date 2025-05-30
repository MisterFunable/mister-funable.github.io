document.addEventListener('DOMContentLoaded', function () {
  fetch('/components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
      // Initialize language after navbar is loaded
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
      changeLanguage(savedLanguage);
    });
});