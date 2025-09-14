// Search functionality for My Doll Inventory
class DollInventorySearch {
  constructor() {
    this.searchBox = document.getElementById('searchBox');
    this.searchResults = document.getElementById('searchResults');
    this.searchData = [];
    this.debounceTimer = null;
    
    this.init();
  }
  
  init() {
    if (!this.searchBox || !this.searchResults) return;
    
    // Load search data
    this.loadSearchData();
    
    // Add event listeners
    this.searchBox.addEventListener('input', (e) => this.handleSearch(e));
    this.searchBox.addEventListener('focus', () => this.showResults());
    this.searchBox.addEventListener('blur', () => this.hideResults());
    
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
        this.hideResults();
      }
    });
  }
  
  
  loadSearchData() {
    // This would typically load from an API or JSON file
    // For now, we'll use static data that matches your site structure
    this.searchData = [
      {
        title: "1/6 Scale Dolls",
        description: "Browse 2500+ 1/6 scale dolls, bodies, and accessories",
        url: "/main-inventory.html",
        category: "Collections",
        keywords: ["1/6 scale", "dolls", "bodies", "accessories", "collectibles"]
      },
      {
        title: "Resin Figures",
        description: "High-quality resin figures and statues collection",
        url: "/inventory/resin.html",
        category: "Collections",
        keywords: ["resin", "figures", "statues", "anime", "collectibles"]
      },
      {
        title: "Doll Accessories",
        description: "Explore a wide variety of 1/6 scale accessories",
        url: "/inventory/1-6-scale/accesories.html",
        category: "1/6 Scale",
        keywords: ["accessories", "clothes", "shoes", "weapons", "props"]
      },
      {
        title: "Doll Heads",
        description: "Browse various 1/6 scale doll heads and face sculpts",
        url: "/inventory/1-6-scale/heads.html",
        category: "1/6 Scale",
        keywords: ["heads", "faces", "sculpts", "anime", "characters"]
      },
      {
        title: "Doll Bodies",
        description: "Find the perfect body for your 1/6 scale doll collection",
        url: "/inventory/1-6-scale/bodies.html",
        category: "1/6 Scale",
        keywords: ["bodies", "joints", "articulation", "materials"]
      },
      {
        title: "Full Sets",
        description: "Complete 1/6 scale doll sets with all accessories",
        url: "/inventory/1-6-scale/products.html",
        category: "1/6 Scale",
        keywords: ["full sets", "complete", "dolls", "packages"]
      },
      {
        title: "Brands",
        description: "Discover different brands and manufacturers",
        url: "/inventory/1-6-scale/brands.html",
        category: "1/6 Scale",
        keywords: ["brands", "manufacturers", "companies", "makers"]
      },
      {
        title: "Aliexpress Tips",
        description: "Expert tips for shopping on Aliexpress",
        url: "/info/aliexpress.html",
        category: "Guides",
        keywords: ["aliexpress", "shopping", "tips", "reviews", "safety"]
      },
      {
        title: "Lightsabers Fonts",
        description: "Lightsaber sound fonts and customization guides",
        url: "/info/lightsabers.html",
        category: "Guides",
        keywords: ["lightsabers", "fonts", "sounds", "customization", "star wars"]
      },
      {
        title: "Stores Review",
        description: "Reviews and ratings of various online stores",
        url: "/info/stores-review.html",
        category: "Guides",
        keywords: ["stores", "reviews", "ratings", "shopping", "reliability"]
      },
      {
        title: "Metal Build Mechs",
        description: "Metal Build mecha collection and information",
        url: "/metal-build.html",
        category: "Guides",
        keywords: ["metal build", "mechs", "gundam", "robots", "collectibles"]
      },
      {
        title: "Seamless Dolls Tips",
        description: "Tips and guides for seamless doll collecting",
        url: "/info/seamless-dolls.html",
        category: "Guides",
        keywords: ["seamless", "dolls", "tips", "maintenance", "care"]
      },
      {
        title: "Resin Lineups",
        description: "Resin figure lineups and release schedules",
        url: "/info/resin-inventory.html",
        category: "YouTube Notes",
        keywords: ["resin", "lineups", "releases", "schedules", "upcoming"]
      },
      {
        title: "Subscribers' Suggestions",
        description: "Community suggestions and recommendations",
        url: "/info/subscribers-suggestions.html",
        category: "YouTube Notes",
        keywords: ["suggestions", "community", "recommendations", "feedback"]
      },
      {
        title: "About",
        description: "Learn more about My Doll Inventory project",
        url: "/about.html",
        category: "General",
        keywords: ["about", "mission", "team", "project", "information"]
      }
    ];
  }
  
  handleSearch(e) {
    const query = e.target.value.trim().toLowerCase();
    
    // Clear previous timer
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    
    // Debounce search to avoid too many requests
    this.debounceTimer = setTimeout(() => {
      if (query.length < 2) {
        this.hideResults();
        return;
      }
      
      this.performSearch(query);
    }, 150);
  }
  
  performSearch(query) {
    const results = this.searchData.filter(item => {
      const searchText = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase();
      return searchText.includes(query);
    });
    
    this.displayResults(results, query);
    
    // Track search with Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'search', {
        search_term: query,
        event_category: 'Search',
        event_label: 'Site Search'
      });
    }
  }
  
  displayResults(results, query) {
    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-result-item">
          <div class="search-result-title">No results found</div>
          <div class="search-result-description">Try searching for "dolls", "accessories", "guides", or "brands"</div>
        </div>
      `;
    } else {
      this.searchResults.innerHTML = results.slice(0, 8).map(item => `
        <div class="search-result-item" onclick="window.location.href='${item.url}'">
          <div class="search-result-title">${this.highlightText(item.title, query)}</div>
          <div class="search-result-description">${item.description}</div>
          <div class="search-result-category">${item.category}</div>
        </div>
      `).join('');
    }
    
    this.showResults();
  }
  
  highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
  
  showResults() {
    this.searchResults.style.display = 'block';
  }
  
  hideResults() {
    this.searchResults.style.display = 'none';
  }
}

// Initialize search when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DollInventorySearch();
});
