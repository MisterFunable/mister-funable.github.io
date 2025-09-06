// Analytics Loader - Loads Google Analytics component
document.addEventListener('DOMContentLoaded', function () {
  // Set analytics path to always be at root
  const analyticsPath = '/components/analytics.html';

  // Fetch analytics from root path
  fetch(analyticsPath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      // Insert analytics code into the head
      const head = document.head;
      if (head) {
        head.insertAdjacentHTML('beforeend', data);
      }
    })
    .catch(error => {
      console.error('Error loading analytics:', error);
    });
});
