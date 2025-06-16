document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const dropdowns = document.querySelectorAll('.dropdown');
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  document.body.appendChild(navOverlay);

  // Handle mobile menu toggle
  function toggleMenu() {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  }

  // Handle dropdown toggles
  function toggleDropdown(dropdown) {
    const button = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    button.setAttribute('aria-expanded', !isExpanded);
    content.style.display = isExpanded ? 'none' : 'block';
  }

  // Handle keyboard navigation
  function handleKeyboardNavigation(event) {
    const target = event.target;
    
    // Handle dropdown keyboard navigation
    if (target.classList.contains('dropdown-btn')) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleDropdown(target.closest('.dropdown'));
      }
    }
    
    // Handle mobile menu keyboard navigation
    if (target.classList.contains('mobile-menu-btn')) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleMenu();
      }
    }
  }

  // Close mobile menu when clicking outside
  function handleOutsideClick(event) {
    if (!navLinks.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
      if (navLinks.classList.contains('active')) {
        toggleMenu();
      }
    }
  }

  // Handle focus trap in mobile menu
  function handleFocusTrap(event) {
    if (!navLinks.classList.contains('active')) return;

    const focusableElements = navLinks.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusable) {
          event.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          event.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }

  // Event Listeners
  mobileMenuBtn.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);
  document.addEventListener('keydown', handleKeyboardNavigation);
  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleFocusTrap);

  // Handle dropdown hover states
  dropdowns.forEach(dropdown => {
    const button = dropdown.querySelector('.dropdown-btn');
    const content = dropdown.querySelector('.dropdown-content');

    // Handle mouse events
    dropdown.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        button.setAttribute('aria-expanded', 'true');
        content.style.display = 'block';
      }
    });

    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        button.setAttribute('aria-expanded', 'false');
        content.style.display = 'none';
      }
    });

    // Handle touch events for mobile
    button.addEventListener('click', (event) => {
      if (window.innerWidth <= 768) {
        event.preventDefault();
        toggleDropdown(dropdown);
      }
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  });
}); 