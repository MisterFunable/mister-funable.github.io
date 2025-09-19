let currentLanguage = 'en';  // Set English as default

function changeLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;

  // Update inline flag buttons active state
  const enBtn = document.getElementById('lang-en');
  const esBtn = document.getElementById('lang-es');
  const clBtn = document.getElementById('lang-cl');
  if (enBtn) {
    enBtn.classList.toggle('active', lang === 'en');
    enBtn.setAttribute('aria-pressed', String(lang === 'en'));
  }
  if (esBtn) {
    esBtn.classList.toggle('active', lang === 'es');
    esBtn.setAttribute('aria-pressed', String(lang === 'es'));
  }
  if (clBtn) {
    clBtn.classList.toggle('active', lang === 'cl');
    clBtn.setAttribute('aria-pressed', String(lang === 'cl'));
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
  const effectiveLang = (lang === 'cl') ? 'es' : lang; // Chile uses Spanish content
  document.querySelectorAll('[data-lang-en]').forEach(element => {
    const key = element.getAttribute(`data-lang-${effectiveLang}`);
    if (key) {
      element.textContent = key;
    }
  });

  // Homepage mascot handling: if dual mascots exist, let homepage script handle toggling
  const hasDualMascots = document.querySelector('.hero-mascot-right');
  if (!hasDualMascots) {
    // Legacy fallback: single mascot swap (non-home pages that might still use it)
    const mascotImage = document.querySelector('.mascot-image');
    if (mascotImage) {
      if (lang === 'cl') {
        mascotImage.src = 'assets/images/iratsutoya-style/chilean-dress.png';
        mascotImage.classList.remove('mascot-clicked');
      } else {
        const normalSrc = mascotImage.dataset.normal;
        if (normalSrc) {
          mascotImage.src = normalSrc;
        }
      }
    }
  }

  // Save language preference
  localStorage.setItem('preferredLanguage', lang);
  // Notify listeners on pages that react to language changes
  try {
    window.dispatchEvent(new CustomEvent('language-changed', { detail: { lang } }));
  } catch (e) {}
  if (typeof window.toggleMascotsForLanguage === 'function') {
    try { window.toggleMascotsForLanguage(lang); } catch (e) {}
  }
  // No dropdown anymore; nothing to close
}

// Initialize language functionality
function initializeLanguageSwitcher() {
  const enBtn = document.getElementById('lang-en');
  const esBtn = document.getElementById('lang-es');
  const clBtn = document.getElementById('lang-cl');

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

  if (clBtn) {
    clBtn.addEventListener('click', (e) => {
      e.preventDefault();
      changeLanguage('cl');
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
  window.changeLanguage = changeLanguage;
}
