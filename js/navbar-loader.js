document.addEventListener('DOMContentLoaded', function () {
  // Set navbar path to always be at root
  const navbarPath = '/components/navbar.html';

  // Fetch navbar from root path
  fetch(navbarPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
      // Initialize language after navbar is loaded
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
      if (typeof changeLanguage === 'function') {
        changeLanguage(savedLanguage);
      }
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      document.getElementById('navbar-placeholder').innerHTML = 'Error loading navigation';
    });
});