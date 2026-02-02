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

    // Try to load custom banner image in order of preference:
    // 1. WebP (best compression, modern browsers)
    // 2. PNG (lossless, good for graphics)
    // 3. JPG (lossy, good for photos)
    tryLoadImage([
      `/assets/images/banners/${pageName}.webp`,
      `/assets/images/banners/${pageName}.png`,
      `/assets/images/banners/${pageName}.jpg`
    ], banner);
  }

  /**
   * Try loading images from an array of paths, using the first one that exists
   * @param {string[]} imagePaths - Array of image paths to try in order
   * @param {HTMLElement} banner - Banner element to apply image to
   */
  function tryLoadImage(imagePaths, banner) {
    if (imagePaths.length === 0) {
      console.log('No custom banner images found, using default gradient');
      return;
    }

    const currentPath = imagePaths[0];
    const img = new Image();

    img.onload = function() {
      // Image exists and loaded successfully
      banner.style.backgroundImage = `url('${currentPath}')`;
      banner.classList.add('has-custom-image');
      console.log(`Custom banner loaded: ${currentPath}`);
    };

    img.onerror = function() {
      // Try next image in the list
      tryLoadImage(imagePaths.slice(1), banner);
    };

    img.src = currentPath;
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
