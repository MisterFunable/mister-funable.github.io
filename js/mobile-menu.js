document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
  mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
  
  const navOverlay = document.createElement('div');
  navOverlay.className = 'nav-overlay';
  
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  
  if (navbar && navLinks) {
    navbar.insertBefore(mobileMenuBtn, navLinks);
    document.body.appendChild(navOverlay);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      navOverlay.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking overlay
    navOverlay.addEventListener('click', function() {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
    
    // Handle dropdowns in mobile view
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const btn = dropdown.querySelector('.dropdown-btn');
      if (btn) {
        btn.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
          }
        });
      }
    });
    
    // Close menu when clicking a link
    const navItems = navLinks.querySelectorAll('a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('active');
          navOverlay.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768) {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('active');
          navOverlay.classList.remove('active');
          document.body.classList.remove('menu-open');
          dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
      }, 250);
    });
  }
}); 