// Flags to prevent multiple executions
let contentLoaded = false;
let domContentLoaded = false;

// Configuration for your Gists
const gistConfig = {
  'about': {
    en: 'YOUR_ENGLISH_GIST_ID',
    es: 'YOUR_SPANISH_GIST_ID'
  },
  'resin-inventory': {
    en: {
      id: 'a59bc0b0db41e68ade5598c58bdea9c1',
      file: 'en-resin-inventory.md'
    },
    es: {
      id: 'a59bc0b0db41e68ade5598c58bdea9c1',
      file: 'en-resin-inventory.md'
    }
  },
  'subscribers-suggestions': {
    en: {
      id: '54e5fc9e6994014c85e96b6fa5380331',
      file: 'en-subscribers-suggestions.md'
    },
    es: {
      id: '54e5fc9e6994014c85e96b6fa5380331',
      file: 'en-subscribers-suggestions.md'
    }
  },
  'lightsabers': {
    en: {
      id: '4fe2e2d97a6ca98549e4fa4c5a008556',
      file: 'lightsabers-fonts.md'
    },
    es: {
      id: '4fe2e2d97a6ca98549e4fa4c5a008556',
      file: 'lightsabers-fonts.md'
    }
  },
  'stores-review': {
    en: {
      id: '73d7afa3aa3f6d596152a1928c697fd0',
      file: 'en-stores-review.md'
    },
    es: {
      id: '73d7afa3aa3f6d596152a1928c697fd0',
      file: 'es-stores-review.md'
    }
  },
  'aliexpress': {
    en: {
      id: '497cc5a1acc7be40f38985825cdd9197',
      file: 'en-aliexpress-advices.md'
    },
    es: {
      id: '497cc5a1acc7be40f38985825cdd9197',
      file: 'es-aliexpress-advices.md'
    }
  },
  'seamless-dolls': {
    en: {
      id: '209bc9db081e6316f135adbcf74fdf5e',
      file: 'en-seamless-dolls.md'
    },
    es: {
      id: '209bc9db081e6316f135adbcf74fdf5e',
      file: 'es-seamless-dolls.md'
    }
  },
  'advise': {
    en: {
      id: '497cc5a1acc7be40f38985825cdd9197',
      file: 'shopping-tips.md'
    },
    es: {
      id: '497cc5a1acc7be40f38985825cdd9197',
      file: 'shopping-tips.md'
    }
  },
  'metal-build': {
    en: {
      id: '3541088165092cfad95cd92b65cb10b0',
      file: 'en-metal-build.md'
    },
    es: {
      id: '3541088165092cfad95cd92b65cb10b0',
      file: 'es-metal-build.md'
    }
  }
  // Add more pages as needed
};

// Function to fetch Gist content
async function fetchGistContent(gistConfig) {
  try {
    console.log('Fetching gist:', gistConfig.id, 'file:', gistConfig.file); // Debug log
    
    // Try multiple approaches to fetch the gist content
    const approaches = [
      // Approach 1: Direct gist URL
      `https://gist.githubusercontent.com/anonymous/${gistConfig.id}/raw/${gistConfig.file}`,
      // Approach 2: CORS proxy
      `https://cors-anywhere.herokuapp.com/https://gist.githubusercontent.com/anonymous/${gistConfig.id}/raw/${gistConfig.file}`,
      // Approach 3: Alternative CORS proxy
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://gist.githubusercontent.com/anonymous/${gistConfig.id}/raw/${gistConfig.file}`)}`,
      // Approach 4: GitHub API with CORS proxy
      `https://cors-anywhere.herokuapp.com/https://api.github.com/gists/${gistConfig.id}`
    ];
    
    for (let i = 0; i < approaches.length; i++) {
      try {
        console.log(`Trying approach ${i + 1}:`, approaches[i]);
        const response = await fetch(approaches[i]);
        
        if (response.ok) {
          if (i === 3) {
            // GitHub API approach - need to parse JSON
            const data = await response.json();
            const fileContent = data.files[gistConfig.file];
            if (fileContent) {
              console.log(`Content loaded successfully using approach ${i + 1}`);
              return fileContent.content;
            }
          } else {
            // Direct content approaches
            const content = await response.text();
            if (content && !content.includes('Error') && !content.includes('Not Found')) {
              console.log(`Content loaded successfully using approach ${i + 1}`);
              return content;
            }
          }
        }
      } catch (approachError) {
        console.log(`Approach ${i + 1} failed:`, approachError.message);
        continue;
      }
    }
    
    throw new Error('All fetch approaches failed');
  } catch (error) {
    console.error('Error fetching Gist:', error);
    return 'Error loading content';
  }
}

// Function to load content for a specific page
async function loadPageContent(pageName) {
  // Prevent multiple loads
  if (contentLoaded) {
    console.log('Content already loaded, skipping...');
    return;
  }
  
  console.log('Loading page:', pageName); // Debug log
  const config = gistConfig[pageName];
  if (!config) {
    console.error('No configuration found for page:', pageName); // Debug log
    // Set error message only if content hasn't been loaded yet
    if (!contentLoaded) {
      document.getElementById('content-en').innerHTML = '<p>Error: Page configuration not found</p>';
      document.getElementById('content-es').innerHTML = '<p>Error: Page configuration not found</p>';
      contentLoaded = true;
    }
    return;
  }

  try {
    const [enContent, esContent] = await Promise.all([
      fetchGistContent(config.en),
      fetchGistContent(config.es)
    ]);

    // Only update content if it hasn't been loaded yet
    if (!contentLoaded) {
      // Render markdown content
      document.getElementById('content-en').innerHTML = marked.parse(enContent);
      document.getElementById('content-es').innerHTML = marked.parse(esContent);

      // Initialize syntax highlighting
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });

      // Show content in current language
      const currentLang = localStorage.getItem('preferredLanguage') || 'en';
      showContent(currentLang);
      
      contentLoaded = true;
    }
  } catch (error) {
    console.error('Error loading page content:', error);
    // Set error message only if content hasn't been loaded yet
    if (!contentLoaded) {
      document.getElementById('content-en').innerHTML = '<p>Error loading content</p>';
      document.getElementById('content-es').innerHTML = '<p>Error loading content</p>';
      contentLoaded = true;
    }
  }
}

// Function to show content in selected language
function showContent(lang) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.style.display = 'none';
  });
  const activeSection = document.getElementById(`content-${lang}`);
  if (activeSection) {
    activeSection.style.display = 'block';
  }
}

// Update the language switcher to handle content
function changeLanguage(lang) {
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

  // Show content in selected language
  showContent(lang);
  
  // Save language preference
  localStorage.setItem('preferredLanguage', lang);
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Prevent multiple executions
  if (domContentLoaded) {
    console.log('DOMContentLoaded already executed, skipping...');
    return;
  }
  domContentLoaded = true;
  
  // Get page name from URL, handling subdirectories and clean URLs
  const pathParts = window.location.pathname.split('/').filter(part => part !== '');
  let pageName = '';
  
  // Handle different URL structures
  if (pathParts.length === 0 || (pathParts.length === 1 && pathParts[0] === '')) {
    // Root page
    pageName = 'about';
  } else if (pathParts.length === 1) {
    // Direct page like /aliexpress
    pageName = pathParts[0];
  } else if (pathParts.length === 2 && pathParts[0] === 'info') {
    // Info page like /info/aliexpress
    pageName = pathParts[1];
  } else {
    // Fallback - use last part and remove .html
    pageName = pathParts[pathParts.length - 1].replace('.html', '');
  }
  
  console.log('Loading content for page:', pageName); // Debug log
  console.log('URL pathname:', window.location.pathname); // Debug log
  console.log('Path parts:', pathParts); // Debug log
  
  // Initialize with saved language preference
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  
  // Load content and then show in correct language
  loadPageContent(pageName).then(() => {
    showContent(savedLanguage);
  });
}); 