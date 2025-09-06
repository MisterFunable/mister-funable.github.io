// Enhanced Google Analytics 4 Configuration for My Doll Inventory
class DollInventoryAnalytics {
  constructor() {
    this.measurementId = 'G-RJ7GFZ6R5Q'; // Replace with your actual GA4 Measurement ID
    this.isInitialized = false;
    this.init();
  }
  
  init() {
    // Wait for gtag to be available
    if (typeof gtag !== 'undefined') {
      this.setupEnhancedTracking();
    } else {
      // Retry after a short delay
      setTimeout(() => this.init(), 100);
    }
  }
  
  setupEnhancedTracking() {
    if (this.isInitialized) return;
    
    // Enhanced ecommerce tracking for collection browsing
    this.trackCollectionViews();
    this.trackSearchBehavior();
    this.trackUserEngagement();
    this.trackPagePerformance();
    
    this.isInitialized = true;
  }
  
  // Track collection category views
  trackCollectionViews() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href*="inventory"]');
      if (link) {
        const category = this.extractCategoryFromUrl(link.href);
        gtag('event', 'view_item_list', {
          event_category: 'Collection',
          event_label: category,
          items: [{
            item_id: category,
            item_name: category,
            item_category: 'Doll Collection',
            item_list_name: 'Collection Categories'
          }]
        });
      }
    });
  }
  
  // Track search behavior
  trackSearchBehavior() {
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
      let searchStartTime = null;
      
      searchBox.addEventListener('focus', () => {
        searchStartTime = Date.now();
        gtag('event', 'search', {
          event_category: 'Search',
          event_label: 'Search Focus',
          search_term: ''
        });
      });
      
      searchBox.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
          gtag('event', 'search', {
            event_category: 'Search',
            event_label: 'Search Query',
            search_term: query,
            value: query.length
          });
        }
      });
    }
  }
  
  // Track user engagement metrics
  trackUserEngagement() {
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
        maxScroll = scrollPercent;
        gtag('event', 'scroll', {
          event_category: 'Engagement',
          event_label: `${scrollPercent}%`,
          value: scrollPercent
        });
      }
    });
    
    // Track time on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      gtag('event', 'timing_complete', {
        name: 'time_on_page',
        value: timeOnPage
      });
    });
    
    // Track external link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="http"]');
      if (link && !link.href.includes(window.location.hostname)) {
        gtag('event', 'click', {
          event_category: 'External Link',
          event_label: link.href,
          transport_type: 'beacon'
        });
      }
    });
  }
  
  // Track page performance
  trackPagePerformance() {
    // Track page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          gtag('event', 'timing_complete', {
            name: 'page_load_time',
            value: Math.round(perfData.loadEventEnd - perfData.loadEventStart)
          });
        }
      }, 0);
    });
    
    // Track Core Web Vitals
    this.trackCoreWebVitals();
  }
  
  // Track Core Web Vitals
  trackCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      gtag('event', 'timing_complete', {
        name: 'lcp',
        value: Math.round(lastEntry.startTime)
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        gtag('event', 'timing_complete', {
          name: 'fid',
          value: Math.round(entry.processingStart - entry.startTime)
        });
      });
    }).observe({ entryTypes: ['first-input'] });
    
    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      gtag('event', 'timing_complete', {
        name: 'cls',
        value: Math.round(clsValue * 1000)
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  // Helper method to extract category from URL
  extractCategoryFromUrl(url) {
    const path = new URL(url).pathname;
    if (path.includes('accesories')) return 'Accessories';
    if (path.includes('bodies')) return 'Bodies';
    if (path.includes('heads')) return 'Heads';
    if (path.includes('products')) return 'Full Sets';
    if (path.includes('brands')) return 'Brands';
    if (path.includes('resin')) return 'Resin Figures';
    return 'Unknown';
  }
  
  // Custom event tracking method
  trackCustomEvent(eventName, parameters = {}) {
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, {
        event_category: 'Custom',
        ...parameters
      });
    }
  }
  
  // Track form submissions
  trackFormSubmission(formName, success = true) {
    gtag('event', 'form_submit', {
      event_category: 'Form',
      event_label: formName,
      value: success ? 1 : 0
    });
  }
  
  // Track video interactions (if you add videos later)
  trackVideoInteraction(action, videoTitle) {
    gtag('event', 'video_' + action, {
      event_category: 'Video',
      event_label: videoTitle
    });
  }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DollInventoryAnalytics();
});

// Export for use in other scripts
window.DollInventoryAnalytics = DollInventoryAnalytics;
