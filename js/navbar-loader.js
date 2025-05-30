document.addEventListener('DOMContentLoaded', function () {
  // Use relative path that works from any subdirectory
  const navbarPath = window.location.pathname.includes('/tips/')
    ? '../components/navbar.html'  // Go up one level if in tips/
    : 'components/navbar.html';    // Use normal path if in root

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