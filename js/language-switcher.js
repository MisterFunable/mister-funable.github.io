let currentLanguage = 'en';

function changeLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;

  // Update selected language display
  document.querySelector('.language-selected').textContent = lang.toUpperCase();

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
    if (element.tagName === 'H2') {
      element.textContent = key;
    } else if (element.tagName === 'P') {
      element.textContent = key;
    }
  });

  // Save language preference
  localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  changeLanguage(savedLanguage);
}); 