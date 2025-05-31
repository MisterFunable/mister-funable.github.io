// Configuration for your Gists
const gistConfig = {
  'about': {
    en: 'YOUR_ENGLISH_GIST_ID',
    es: 'YOUR_SPANISH_GIST_ID'
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
  'aliexpress': {
    en: {
      id: '497cc5a1acc7be40f38985825cdd9197',
      file: 'shopping-tips.md'
    },
    es: {
      id: '497cc5a1acc7be40f38985825cdd9197',
      file: 'consejos-de-compras.md'
    }
  },
  'seamless-dolls': {
    en: {
      id: '209bc9db081e6316f135adbcf74fdf5e',
      file: 'seamless-dolls.md'
    },
    es: {
      id: '209bc9db081e6316f135adbcf74fdf5e',
      file: 'seamless-dolls.md'
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
  }
  // Add more pages as needed
};

// Function to fetch Gist content
async function fetchGistContent(gistConfig) {
  try {
    console.log('Fetching gist:', gistConfig.id, 'file:', gistConfig.file); // Debug log
    const response = await fetch(`https://api.github.com/gists/${gistConfig.id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Gist data received:', data); // Debug log

    // Get the specific file's content
    const fileContent = data.files[gistConfig.file];
    if (!fileContent) {
      throw new Error(`File ${gistConfig.file} not found in Gist`);
    }
    return fileContent.content;
  } catch (error) {
    console.error('Error fetching Gist:', error);
    return 'Error loading content';
  }
}

// Function to load content for a specific page
async function loadPageContent(pageName) {
  console.log('Loading page:', pageName); // Debug log
  const config = gistConfig[pageName];
  if (!config) {
    console.error('No configuration found for page:', pageName); // Debug log
    return;
  }

  try {
    const [enContent, esContent] = await Promise.all([
      fetchGistContent(config.en),
      fetchGistContent(config.es)
    ]);

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
  } catch (error) {
    console.error('Error loading page content:', error);
  }
}

// Function to show content in selected language
function showContent(lang) {
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(`content-${lang}`).classList.add('active');
}

// Update the language switcher to handle content
function changeLanguage(lang) {
  // Existing language switching code...
  showContent(lang);
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Get page name from URL, handling subdirectories
  const pathParts = window.location.pathname.split('/');
  const pageName = pathParts[pathParts.length - 1].replace('.html', '');
  console.log('Loading content for page:', pageName); // Debug log
  loadPageContent(pageName);
}); 