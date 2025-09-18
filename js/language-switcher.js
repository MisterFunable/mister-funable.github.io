let currentLanguage = 'en';  // Set English as default

function changeLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;

  // Update inline flag buttons active state
  const enBtn = document.getElementById('lang-en');
  const esBtn = document.getElementById('lang-es');
  if (enBtn && esBtn) {
    enBtn.classList.toggle('active', lang === 'en');
    esBtn.classList.toggle('active', lang === 'es');
    enBtn.setAttribute('aria-pressed', String(lang === 'en'));
    esBtn.setAttribute('aria-pressed', String(lang === 'es'));
  }

  // Remove any legacy dropdown selected states if present
  document.querySelectorAll('.language-list li').forEach(li => li.classList.remove('selected'));

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
  // No dropdown anymore; nothing to close
}

// Initialize language functionality
function initializeLanguageSwitcher() {
  const enBtn = document.getElementById('lang-en');
  const esBtn = document.getElementById('lang-es');

  if (enBtn) {
    enBtn.addEventListener('click', (e) => {
      e.preventDefault();
      changeLanguage('en');
    });
  }

  if (esBtn) {
    esBtn.addEventListener('click', (e) => {
      e.preventDefault();
      changeLanguage('es');
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
