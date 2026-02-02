/**
 * Page Navigation (Previous/Next)
 * Adds navigation links between related content pages
 */

(function initPageNavigation() {
  'use strict';

  // Page sequence - defines the order of pages
  const pageSequence = [
    {
      path: '/info/aliexpress',
      title: {
        en: 'Aliexpress Tips',
        es: 'Consejos Aliexpress',
        jp: 'アリエクスプレスのヒント'
      }
    },
    {
      path: '/info/seamless-dolls',
      title: {
        en: 'Seamless Dolls Tips',
        es: 'Consejos Muñecas',
        jp: 'シームレスドールのヒント'
      }
    },
    {
      path: '/info/stores-review',
      title: {
        en: 'Store Reviews',
        es: 'Reseñas de Tiendas',
        jp: '店舗レビュー'
      }
    },
    {
      path: '/info/lightsabers',
      title: {
        en: 'Lightsaber Fonts',
        es: 'Fuentes de Sables',
        jp: 'ライトセーバーフォント'
      }
    },
    {
      path: '/metal-build',
      title: {
        en: 'Metal Build Manuals',
        es: 'Manuales Metal Build',
        jp: 'メタルビルドマニュアル'
      }
    },
    {
      path: '/info/advise',
      title: {
        en: 'Advice',
        es: 'Consejos',
        jp: 'アドバイス'
      }
    },
    {
      path: '/info/resin-inventory',
      title: {
        en: 'Resin Inventory',
        es: 'Inventario de Resina',
        jp: 'レジンインベントリ'
      }
    },
    {
      path: '/info/subscribers-suggestions',
      title: {
        en: 'Subscriber Suggestions',
        es: 'Sugerencias de Suscriptores',
        jp: 'サブスクライバーの提案'
      }
    }
  ];

  // Get current language
  function getCurrentLanguage() {
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    return lang === 'cl' ? 'es' : lang; // Map cl to es
  }

  // Get translated title
  function getTitle(page) {
    const lang = getCurrentLanguage();
    return page.title[lang] || page.title['en'] || page.path;
  }

  // Find current page in sequence
  function findCurrentPageIndex() {
    const currentPath = window.location.pathname.replace('.html', '');
    return pageSequence.findIndex(page => {
      return currentPath === page.path || currentPath === page.path + '.html';
    });
  }

  // Render navigation links
  function renderNavigation() {
    const currentIndex = findCurrentPageIndex();

    // If current page is not in sequence, don't show navigation
    if (currentIndex === -1) return;

    const prevPage = currentIndex > 0 ? pageSequence[currentIndex - 1] : null;
    const nextPage = currentIndex < pageSequence.length - 1 ? pageSequence[currentIndex + 1] : null;

    // Update previous link
    const prevLink = document.getElementById('page-nav-prev');
    const prevTitle = document.getElementById('prev-title');
    if (prevLink && prevTitle && prevPage) {
      prevLink.href = prevPage.path + '.html';
      prevTitle.textContent = getTitle(prevPage);
      prevLink.style.display = 'flex';
    }

    // Update next link
    const nextLink = document.getElementById('page-nav-next');
    const nextTitle = document.getElementById('next-title');
    if (nextLink && nextTitle && nextPage) {
      nextLink.href = nextPage.path + '.html';
      nextTitle.textContent = getTitle(nextPage);
      nextLink.style.display = 'flex';
    }
  }

  // Load component and render navigation
  function initializePageNavigation() {
    const container = document.getElementById('page-nav-container');
    if (!container) return;

    // Fetch component HTML
    fetch('/components/page-navigation.html')
      .then(response => response.text())
      .then(html => {
        container.innerHTML = html;
        // Render navigation after HTML is loaded
        renderNavigation();

        // Listen for language changes
        document.addEventListener('language-changed', function() {
          renderNavigation();
        });
      })
      .catch(error => {
        console.warn('Page navigation component failed to load:', error);
      });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePageNavigation);
  } else {
    initializePageNavigation();
  }
})();
