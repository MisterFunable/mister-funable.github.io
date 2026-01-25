/**
 * Page Banner with Smart Image Loading
 * Checks for custom banner images and falls back to gradient
 */

(function() {
  'use strict';

  function initPageBanner() {
    const banner = document.querySelector('.page-banner');
    if (!banner) return;

    // Get page name from data attribute or current path
    const pageName = banner.dataset.page || getPageNameFromPath();

    if (!pageName) {
      console.log('No page name found for banner image');
      return;
    }

    // Try to load custom banner image
    const customImagePath = `/assets/images/banners/${pageName}.png`;
    const img = new Image();

    img.onload = function() {
      // Image exists and loaded successfully
      banner.style.backgroundImage = `url('${customImagePath}')`;
      banner.classList.add('has-custom-image');
      console.log(`Custom banner loaded: ${customImagePath}`);
    };

    img.onerror = function() {
      // Image doesn't exist, use default gradient (already set in CSS)
      console.log(`No custom banner found for ${pageName}, using default gradient`);

      // Try alternate formats
      const jpgPath = `/assets/images/banners/${pageName}.jpg`;
      const jpgImg = new Image();

      jpgImg.onload = function() {
        banner.style.backgroundImage = `url('${jpgPath}')`;
        banner.classList.add('has-custom-image');
        console.log(`Custom banner loaded: ${jpgPath}`);
      };

      jpgImg.onerror = function() {
        // No custom image found, stick with gradient
        console.log(`No custom banner images found for ${pageName}`);
      };

      jpgImg.src = jpgPath;
    };

    img.src = customImagePath;
  }

  /**
   * Extract page name from URL path
   * Examples:
   *   /one-sixth.html -> one-sixth
   *   /info/guides.html -> guides
   *   /inventory/1-6-scale/products.html -> products
   */
  function getPageNameFromPath() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop(); // Get last segment
    const pageName = fileName.replace(/\.html$/, ''); // Remove .html extension

    return pageName || 'index';
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageBanner);
  } else {
    initPageBanner();
  }
})();
