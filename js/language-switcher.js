let currentLanguage = 'en';  // Set English as default

function changeLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;

  // Update selected language display in desktop navbar
  const languageSelected = document.querySelector('.language-selected');
  const flagIcon = document.querySelector('.language-btn .flag-icon');
  
  if (languageSelected) {
    languageSelected.textContent = lang.toUpperCase();
  }
  
  if (flagIcon) {
    flagIcon.src = `/assets/img/flags/${lang}.png`;
    flagIcon.alt = lang === 'en' ? 'English' : 'Español';
  }

  // Update selected state in desktop dropdown list
  document.querySelectorAll('.language-list li').forEach(li => {
    li.classList.remove('selected');
    const link = li.querySelector('a');
    if (link && link.getAttribute('onclick').includes(lang)) {
      li.classList.add('selected');
      link.setAttribute('aria-current', 'true');
    } else if (link) {
      link.removeAttribute('aria-current');
    }
  });

  // Update mobile language switcher active states
  document.querySelectorAll('.mobile-language-switcher .lang-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const activeMobileBtn = document.querySelector(`#mobile-lang-${lang}`);
  if (activeMobileBtn) {
    activeMobileBtn.classList.add('active');
  }

  // Update all elements with language data
  document.querySelectorAll('[data-lang-en]').forEach(element => {
    const key = element.getAttribute(`data-lang-${lang}`);
    if (key) {  // Only update if the attribute exists
      element.textContent = key;
    }
  });

  // Save language preference
  localStorage.setItem('preferredLanguage', lang);
  
  // Close language dropdown after selection
  const languageSwitcher = document.querySelector('.language-switcher');
  const languageBtn = document.querySelector('.language-btn');
  
  if (languageSwitcher) {
    languageSwitcher.classList.remove('active');
    // Also remove focus to close hover-based dropdown
    if (languageBtn) {
      languageBtn.blur();
      languageBtn.setAttribute('aria-expanded', 'false');
    }
  }
}

// Initialize language functionality
function initializeLanguageSwitcher() {
  const languageSwitcher = document.querySelector('.language-switcher');
  const languageBtn = document.querySelector('.language-btn');
  const languageList = document.querySelector('.language-list');

  if (languageBtn && languageSwitcher) {
    // Toggle language dropdown on click
    languageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = languageBtn.getAttribute('aria-expanded') === 'true';
      languageBtn.setAttribute('aria-expanded', !isExpanded);
      languageSwitcher.classList.toggle('active');
    });

    // Keyboard navigation
    languageBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isExpanded = languageBtn.getAttribute('aria-expanded') === 'true';
        languageBtn.setAttribute('aria-expanded', !isExpanded);
        languageSwitcher.classList.toggle('active');
      } else if (e.key === 'Escape') {
        languageBtn.setAttribute('aria-expanded', 'false');
        languageSwitcher.classList.remove('active');
      }
    });
  }

  // Close language switcher when clicking outside
  document.addEventListener('click', (e) => {
    if (languageSwitcher && !languageSwitcher.contains(e.target)) {
      languageSwitcher.classList.remove('active');
      if (languageBtn) {
        languageBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Handle language selection clicks
  if (languageList) {
    languageList.addEventListener('click', (e) => {
      if (e.target.closest('.lang-btn')) {
        e.preventDefault();
        e.stopPropagation();
        // Close the dropdown immediately
        if (languageSwitcher) {
          languageSwitcher.classList.remove('active');
        }
        if (languageBtn) {
          languageBtn.setAttribute('aria-expanded', 'false');
          languageBtn.blur();
        }
      }
    });
  }

  // Initialize with saved language preference or default to English
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  changeLanguage(savedLanguage);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit for navbar to load
  setTimeout(() => {
    initializeLanguageSwitcher();
  }, 100);
});

// Also initialize when called from navbar loader
if (typeof window !== 'undefined') {
  window.initializeLanguageSwitcher = initializeLanguageSwitcher;
}
