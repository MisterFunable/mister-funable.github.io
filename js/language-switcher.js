let currentLanguage = 'en';  // Set English as default

function changeLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;

  // Update selected language display
  const languageSelected = document.querySelector('.language-selected');
  if (languageSelected) {
    languageSelected.textContent = lang.toUpperCase();
  }

  // Update selected state in list
  document.querySelectorAll('.language-list li').forEach(li => {
    li.classList.remove('selected');
    if (li.querySelector('a').getAttribute('onclick').includes(lang)) {
      li.classList.add('selected');
    }
  });

  // Update all elements with language data
  document.querySelectorAll('[data-lang-en]').forEach(element => {
    const key = element.getAttribute(`data-lang-${lang}`);
    if (key) {  // Only update if the attribute exists
      element.textContent = key;
    }
  });

  // Save language preference
  localStorage.setItem('preferredLanguage', lang);
}

// Initialize with saved language preference or default to English
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  changeLanguage(savedLanguage);

  // Add click handler for language switcher
  const languageSwitcher = document.querySelector('.language-switcher');
  const languageBtn = document.querySelector('.language-btn');

  if (languageBtn) {
    languageBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      languageSwitcher.classList.toggle('active');
    });
  }

  // Close language switcher when clicking outside
  document.addEventListener('click', (e) => {
    if (languageSwitcher && !languageSwitcher.contains(e.target)) {
      languageSwitcher.classList.remove('active');
    }
  });

  // Handle keyboard navigation
  if (languageBtn) {
    languageBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        languageSwitcher.classList.toggle('active');
      } else if (e.key === 'Escape') {
        languageSwitcher.classList.remove('active');
      }
    });
  }
}); 