document.addEventListener('DOMContentLoaded', () => {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
          footerPlaceholder.innerHTML = data;

          // Initialize footer scroll behavior after loading
          initFooterScroll();
        })
        .catch(error => {
          console.error('Failed to load footer:', error);
        });
    }
  });

function initFooterScroll() {
  const footer = document.querySelector('.footer');
  if (!footer) return;

  let isFooterVisible = false;
  let scrollTimeout;

  // Function to check if user is near bottom of page
  function checkScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Show footer when user is within 50px of bottom or at the very bottom
    const nearBottom = scrollTop + windowHeight >= documentHeight - 50;
    const atBottom = scrollTop + windowHeight >= documentHeight - 10; // 10px tolerance for "at bottom"
    
    if (nearBottom && !isFooterVisible) {
      footer.classList.add('show');
      isFooterVisible = true;
    } else if (!nearBottom && isFooterVisible && !atBottom) {
      footer.classList.remove('show');
      isFooterVisible = false;
    }
    
    // Add transparent class when at bottom
    if (atBottom) {
      footer.classList.add('at-bottom');
    } else {
      footer.classList.remove('at-bottom');
    }
  }

  // Throttled scroll handler for better performance
  function handleScroll() {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      checkScrollPosition();
      scrollTimeout = null;
    }, 100);
  }

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Check initial position
  checkScrollPosition();

  // Also check on window resize
  window.addEventListener('resize', checkScrollPosition);

  // If page is too short to scroll, show footer immediately
  setTimeout(() => {
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Only show footer if page is MUCH shorter than viewport (can't scroll at all)
    if (documentHeight <= windowHeight + 10) {
      footer.classList.add('show');
      isFooterVisible = true;
    }
  }, 100);
}