document.addEventListener('DOMContentLoaded', () => {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
      fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
          footerPlaceholder.innerHTML = data;
          
          // Initialize footer scroll behavior after loading
          initFooterScroll();
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
    
    // Show footer when user is within 150px of bottom or at the very bottom
    const nearBottom = scrollTop + windowHeight >= documentHeight - 150;
    const atBottom = scrollTop + windowHeight >= documentHeight;
    
    if (nearBottom && !isFooterVisible) {
      footer.classList.add('show');
      isFooterVisible = true;
    } else if (!nearBottom && isFooterVisible && !atBottom) {
      footer.classList.remove('show');
      isFooterVisible = false;
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
}