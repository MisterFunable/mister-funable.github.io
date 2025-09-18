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
      const navbarPlaceholder = document.getElementById('navbar-placeholder');
      if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = data;
        
        // Initialize navbar functionality after loading
        initializeNavbar();
        
        // Initialize language after navbar is loaded
        if (typeof initializeLanguageSwitcher === 'function') {
          initializeLanguageSwitcher();
        } else {
          // Fallback if language switcher script hasn't loaded yet
          const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
          if (typeof changeLanguage === 'function') {
            setTimeout(() => {
              changeLanguage(savedLanguage);
            }, 100);
          }
        }

        // Ensure age disclaimer script is loaded exactly once
        const hasModal = !!document.getElementById('age-disclaimer-modal');
        const hasScriptTag = !!document.querySelector('script[src$="/js/age-disclaimer.js"], script[src$="js/age-disclaimer.js"]');
        const injectedOnce = !!document.querySelector('script[data-age-disclaimer="true"]');
        if (!hasScriptTag && !injectedOnce) {
          const ageScript = document.createElement('script');
          ageScript.src = '/js/age-disclaimer.js';
          ageScript.defer = true;
          ageScript.setAttribute('data-age-disclaimer', 'true');
          document.body.appendChild(ageScript);
        }
      }
    })
    .catch(error => {
      console.error('Error loading navbar:', error);
      const navbarPlaceholder = document.getElementById('navbar-placeholder');
      if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = '<div class="navbar-error">Error loading navigation</div>';
      }
    });
});

function initializeNavbar() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Create overlay for mobile menu
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    navOverlay.addEventListener('click', closeMobileMenu);
  }

  // Initialize dropdowns
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');
    
    if (button && content) {
      // Desktop hover is handled by CSS
      
      // Click handling for dropdown buttons
      button.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          // On mobile, prevent default and toggle dropdown
          e.preventDefault();
          e.stopPropagation();
          toggleDropdown(dropdown);
        } else {
          // On desktop, allow the link to work normally
          // The dropdown will still show on hover via CSS
        }
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (!e.target.closest('.dropdown')) {
        closeAllDropdowns();
      }
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMobileMenu();
      closeAllDropdowns();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);

  function toggleMobileMenu() {
    const isOpen = navLinks.classList.contains('active');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileMenuBtn.classList.add('active');
    navLinks.classList.add('active');
    navOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    closeAllDropdowns();
  }

  function toggleDropdown(dropdown) {
    const button = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');
    const isOpen = dropdown.classList.contains('active');
    
    // Close other dropdowns at the same level
    const siblings = Array.from(dropdown.parentElement.children)
      .filter(child => child !== dropdown && child.classList.contains('dropdown'));
    siblings.forEach(sibling => {
      sibling.classList.remove('active');
      const siblingBtn = sibling.querySelector('.dropdown-btn');
      if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
    });
    
    if (isOpen) {
      dropdown.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
    } else {
      dropdown.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  }

  function closeAllDropdowns() {
    dropdowns.forEach(dropdown => {
      dropdown.classList.remove('active');
      const button = dropdown.querySelector('.dropdown-btn');
      if (button) button.setAttribute('aria-expanded', 'false');
    });
  }

  function handleKeyboardNavigation(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
      if (navLinks.classList.contains('active')) {
        closeMobileMenu();
      }
    }
    
    // Handle dropdown keyboard navigation
    if (e.target.classList.contains('dropdown-btn')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const dropdown = e.target.closest('.dropdown');
        if (window.innerWidth <= 768) {
          toggleDropdown(dropdown);
        }
      }
    }
  }

  // Set active state for current page
  const currentPath = window.location.pathname;
  const navLinksElements = document.querySelectorAll('.nav-links a');
  navLinksElements.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
}
