/**
 * Breadcrumb Navigation Builder
 * Automatically generates breadcrumb trail from URL path
 */

(function initBreadcrumbs() {
  'use strict';

  // Breadcrumb translations
  const breadcrumbData = {
    'inventory': {
      en: 'Inventory',
      es: 'Inventario',
      jp: 'インベントリ',
      cl: 'Inventario'
    },
    '1-6-scale': {
      en: '1/6 Scale',
      es: 'Escala 1/6',
      jp: '1/6スケール',
      cl: 'Escala 1/6'
    },
    '1-1-scale': {
      en: '1/1 Scale',
      es: 'Escala 1/1',
      jp: '1/1スケール',
      cl: 'Escala 1/1'
    },
    'products': {
      en: 'Full Sets',
      es: 'Sets Completos',
      jp: 'フルセット',
      cl: 'Sets Completos'
    },
    'accessories': {
      en: 'Accessories',
      es: 'Accesorios',
      jp: 'アクセサリー',
      cl: 'Accesorios'
    },
    'accessories': {
      en: 'Accessories',
      es: 'Accesorios',
      jp: 'アクセサリー',
      cl: 'Accesorios'
    },
    'brands': {
      en: 'Brands',
      es: 'Marcas',
      jp: 'ブランド',
      cl: 'Marcas'
    },
    'heads': {
      en: 'Heads',
      es: 'Cabezas',
      jp: 'ヘッド',
      cl: 'Cabezas'
    },
    'bodies': {
      en: 'Bodies',
      es: 'Cuerpos',
      jp: 'ボディ',
      cl: 'Cuerpos'
    },
    'tips': {
      en: 'Tips & Guides',
      es: 'Consejos y Guías',
      jp: 'ヒントとガイド',
      cl: 'Consejos y Guías'
    },
    'resin': {
      en: 'Resin Figures',
      es: 'Figuras de Resina',
      jp: 'レジンフィギュア',
      cl: 'Figuras de Resina'
    },
    'sets': {
      en: 'Complete Sets',
      es: 'Sets Completos',
      jp: '完全なセット',
      cl: 'Sets Completos'
    },
    'guides': {
      en: 'Guides',
      es: 'Guías',
      jp: 'ガイド',
      cl: 'Guías'
    },
    'companies': {
      en: 'Companies',
      es: 'Compañías',
      jp: '企業',
      cl: 'Compañías'
    },
    'forms': {
      en: 'Forms',
      es: 'Formularios',
      jp: 'フォーム',
      cl: 'Formularios'
    },
    'add-product': {
      en: 'Add Product',
      es: 'Agregar Producto',
      jp: '製品を追加',
      cl: 'Agregar Producto'
    },
    'add-custom': {
      en: 'Add Custom',
      es: 'Agregar Personalizado',
      jp: 'カスタムを追加',
      cl: 'Agregar Personalizado'
    },
    'info': {
      en: 'Info',
      es: 'Info',
      jp: '情報',
      cl: 'Info'
    },
    'aliexpress': {
      en: 'Aliexpress Tips',
      es: 'Consejos Aliexpress',
      jp: 'アリエクスプレスのヒント',
      cl: 'Consejos Aliexpress'
    },
    'lightsabers': {
      en: 'Lightsaber Fonts',
      es: 'Fuentes de Sables',
      jp: 'ライトセーバーフォント',
      cl: 'Fuentes de Sables'
    },
    'stores-review': {
      en: 'Store Reviews',
      es: 'Reseñas de Tiendas',
      jp: '店舗レビュー',
      cl: 'Reseñas de Tiendas'
    },
    'seamless-dolls': {
      en: 'Seamless Dolls Tips',
      es: 'Consejos Muñecas',
      jp: 'シームレスドールのヒント',
      cl: 'Consejos Muñecas'
    },
    'resin-inventory': {
      en: 'Resin Inventory',
      es: 'Inventario de Resina',
      jp: 'レジンインベントリ',
      cl: 'Inventario de Resina'
    },
    'subscribers-suggestions': {
      en: 'Subscriber Suggestions',
      es: 'Sugerencias de Suscriptores',
      jp: 'サブスクライバーの提案',
      cl: 'Sugerencias de Suscriptores'
    },
    'advise': {
      en: 'Advice',
      es: 'Consejos',
      jp: 'アドバイス',
      cl: 'Consejos'
    }
  };

  // Get current language
  function getCurrentLanguage() {
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    return lang === 'cl' ? 'es' : lang; // Map cl to es
  }

  // Get translated text
  function getTranslation(key) {
    const lang = getCurrentLanguage();
    const data = breadcrumbData[key];

    if (!data) {
      // Capitalize first letter if no translation found
      return key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ');
    }

    return data[lang] || data['en'] || key;
  }

  // Build breadcrumb trail
  function buildBreadcrumbs() {
    const breadcrumbList = document.getElementById('breadcrumb-list');
    if (!breadcrumbList) return;

    // Get path segments
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment && segment !== 'index.html');

    // Remove .html extension from last segment
    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1];
      if (lastSegment.endsWith('.html')) {
        segments[segments.length - 1] = lastSegment.replace('.html', '');
      }
    }

    // Build breadcrumb items
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += '/' + segment;
      const isLast = index === segments.length - 1;

      const li = document.createElement('li');
      li.className = 'breadcrumb-item';

      const translation = getTranslation(segment);

      if (isLast) {
        // Last item - no link
        li.textContent = translation;
      } else {
        // Create link
        const a = document.createElement('a');
        const linkPath = segment.endsWith('.html') ? currentPath : currentPath + '.html';
        a.href = linkPath;
        a.textContent = translation;

        // Add data attributes for language switching
        Object.keys(breadcrumbData[segment] || {}).forEach(lang => {
          if (breadcrumbData[segment]) {
            a.setAttribute(`data-lang-${lang}`, breadcrumbData[segment][lang]);
          }
        });

        li.appendChild(a);
      }

      breadcrumbList.appendChild(li);
    });
  }

  // Load breadcrumb component and build trail
  function initializeBreadcrumbs() {
    const container = document.getElementById('breadcrumb-container');
    if (!container) return;

    // Fetch breadcrumb HTML
    fetch('/components/breadcrumbs.html')
      .then(response => response.text())
      .then(html => {
        container.innerHTML = html;
        // Build breadcrumb trail after HTML is loaded
        buildBreadcrumbs();

        // Listen for language changes
        document.addEventListener('language-changed', function() {
          const breadcrumbList = document.getElementById('breadcrumb-list');
          if (breadcrumbList) {
            // Clear existing items except Home
            while (breadcrumbList.children.length > 1) {
              breadcrumbList.removeChild(breadcrumbList.lastChild);
            }
            buildBreadcrumbs();
          }
        });
      })
      .catch(error => {
        console.warn('Breadcrumb component failed to load:', error);
      });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBreadcrumbs);
  } else {
    initializeBreadcrumbs();
  }
})();
