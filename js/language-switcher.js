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
}); 