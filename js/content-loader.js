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
    
    // Owner can be provided; default to account owner
    const DEFAULT_GIST_OWNER = 'MisterFunable';
    const owner = gistConfig.owner || DEFAULT_GIST_OWNER;
    const revision = gistConfig.revision || gistConfig.rev || gistConfig.sha || '';
    
    const rawOwnerUrl = revision
      ? `https://gist.githubusercontent.com/${owner}/${gistConfig.id}/raw/${revision}/${gistConfig.file}`
      : `https://gist.githubusercontent.com/${owner}/${gistConfig.id}/raw/${gistConfig.file}`;
    const rawAnonUrl = revision
      ? `https://gist.githubusercontent.com/anonymous/${gistConfig.id}/raw/${revision}/${gistConfig.file}`
      : `https://gist.githubusercontent.com/anonymous/${gistConfig.id}/raw/${gistConfig.file}`;

    // Try multiple approaches to fetch the gist content
    const approaches = [
      // Approach 1: Direct gist URL with owner
      rawOwnerUrl,
      // Approach 2: Direct gist URL (anonymous fallback)
      rawAnonUrl,
      // Approach 3: GitHub API (usually CORS enabled)
      `https://api.github.com/gists/${gistConfig.id}`,
      // Approach 4: CORS proxy (owner)
      `https://cors-anywhere.herokuapp.com/${rawOwnerUrl}`,
      // Approach 5: Alternative CORS proxy (owner)
      `https://api.allorigins.win/raw?url=${encodeURIComponent(rawOwnerUrl)}`,
      // Approach 6: CORS proxy for API
      `https://cors-anywhere.herokuapp.com/https://api.github.com/gists/${gistConfig.id}`
    ];
    
    for (let i = 0; i < approaches.length; i++) {
      try {
        console.log(`Trying approach ${i + 1}:`, approaches[i]);
        const response = await fetch(approaches[i]);
        
        if (response.ok) {
          // GitHub API response (approach 3 or 6)
          if (approaches[i].includes('api.github.com/gists/')) {
            const data = await response.json();
            const fileContent = data.files && data.files[gistConfig.file];
            if (fileContent && typeof fileContent.content === 'string') {
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
  // Try direct match first
  let config = gistConfig[pageName];
  
  // Fallbacks: normalize page name and try common variants
  if (!config && typeof pageName === 'string') {
    const candidates = [];
    const lower = pageName.toLowerCase();
    const noHtml = pageName.replace(/\.html$/i, '');
    const lowerNoHtml = lower.replace(/\.html$/i, '');
    candidates.push(lower, noHtml, lowerNoHtml);
    for (let i = 0; i < candidates.length; i++) {
      const key = candidates[i];
      if (gistConfig[key]) {
        console.warn('Resolved page key from', pageName, 'to', key);
        config = gistConfig[key];
        break;
      }
    }
  }
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

      // Apply Tailwind styles to rendered tables
      tailwindifyTables('en');
      tailwindifyTables('es');

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
  document.querySelectorAll('.content-section, .info-content-section').forEach(section => {
    section.style.display = 'none';
  });
  const activeSection = document.getElementById(`content-${lang}`);
  if (activeSection) {
    activeSection.style.display = 'block';
  }
}

// Add Tailwind-like utility classes to markdown tables
function tailwindifyTables(lang) {
  const container = document.getElementById(`content-${lang}`);
  if (!container) return;
  const tables = Array.from(container.querySelectorAll('table'));
  tables.forEach((table) => {
    // Wrap for horizontal scroll on small screens
    if (!table.parentElement.classList.contains('tw-table-wrap')) {
      const wrap = document.createElement('div');
      wrap.className = 'tw-table-wrap overflow-x-auto rounded-lg border border-gray-200 shadow-sm my-4';
      table.parentElement.insertBefore(wrap, table);
      wrap.appendChild(table);
    }
    table.classList.add('w-full', 'text-left', 'text-gray-700');
    const thead = table.querySelector('thead');
    if (thead) thead.classList.add('bg-gray-50');
    table.querySelectorAll('th').forEach((th) => th.classList.add('px-4', 'py-2', 'font-semibold', 'text-gray-700', 'border-b', 'border-gray-200'));
    table.querySelectorAll('td').forEach((td) => td.classList.add('px-4', 'py-2', 'border-b', 'border-gray-100'));
    const rows = Array.from(table.querySelectorAll('tbody tr'));
    rows.forEach((tr, idx) => {
      tr.classList.add(idx % 2 === 0 ? 'bg-white' : 'bg-gray-50', 'hover:bg-gray-100');
    });
  });
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
    // Direct page like /aliexpress or /aliexpress.html
    pageName = pathParts[0].replace('.html', '');
  } else if (pathParts.length === 2 && pathParts[0] === 'info') {
    // Info page like /info/aliexpress or /info/aliexpress.html
    pageName = pathParts[1].replace('.html', '');
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