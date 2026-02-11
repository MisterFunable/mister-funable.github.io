(function() {
  var posts = [
    {
      id: "01",
      title: "Running N8N Locally with Ngrok",
      category: "tech",
      image: "/medium/images/01/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/running-n8n-locally-with-ngrok-734af69e1530",
      file: "/medium/01 - Running N8N Locally with Ngrok.md",
      published: "2025-10-27"
    },
    {
      id: "02",
      title: "How (Not) to Work with Local Files in N8N",
      category: "tech",
      image: "/medium/images/02/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/how-not-to-work-with-local-files-in-n8n-8c4545a3f2b2",
      file: "/medium/02 - How (Not) to Work with Local Files in N8N.md",
      published: "2025-11-10"
    },
    {
      id: "03",
      title: "Getting Started with Meshtastic on Heltec V3 and LILYGO T-Beam",
      category: "tech",
      image: "/medium/images/03/img-01.png",
      mediumUrl: "https://radiohackers.com/getting-started-with-meshtastic-on-heltec-v3-and-lilygo-t-beam-e287f44df7b8",
      file: "/medium/03 - Getting Started with Meshtastic on Heltec V3 and LILYGO T-Beam.md",
      published: "2025-11-14"
    },
    {
      id: "04",
      title: "Meshtastic Questions I Had After Getting Started",
      category: "tech",
      image: "/medium/images/04/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/meshtastic-questions-i-had-after-getting-started-b0a634a39bae",
      file: "/medium/04 - Meshtastic Questions I Had After Getting Started.md",
      published: "2025-11-14"
    },
    {
      id: "05",
      title: "Setting Up a Local Meshtastic Message Forwarder",
      category: "tech",
      image: "/medium/images/05/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/setting-up-a-local-meshtastic-message-forwarder-c527bca2eb0e",
      file: "/medium/05 - Setting Up a Local Meshtastic Message Forwarder.md",
      published: "2025-11-14"
    },
    {
      id: "06",
      title: "N8N Nodes You Should Know (But Probably Don't)",
      category: "tech",
      image: "/medium/images/06/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/n8n-nodes-you-should-know-but-probably-dont-06d61b77c457",
      file: "/medium/06 - N8N Nodes You Should Know (But Probably Don't).md",
      published: "2025-11-16"
    },
    {
      id: "07",
      title: "Sony A6700 Settings for Unboxing and Figure Videos",
      category: "anime-dolls",
      image: "/medium/images/07/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/sony-a6700-settings-for-unboxing-and-figure-videos-4ca3ddd4ecac",
      file: "/medium/07 - Sony A6700 Settings for Unboxing and Figure Videos.md",
      published: "2025-11-17"
    },
    {
      id: "08",
      title: "Fixing N8N Docker Error: The X-Forwarded-For Issue + Bonus",
      category: "tech",
      image: "/medium/images/08/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/fixing-n8n-docker-error-the-x-forwarded-for-issue-bonus-d6924694b09a",
      file: "/medium/08 - Fixing N8N Docker Error The X-Forwarded-For Issue + Bonus.md",
      published: "2025-11-18"
    },
    {
      id: "09",
      title: "Getting Instagram Posts with N8N (The Simple Way Part 1)",
      category: "tech",
      image: "/medium/images/09/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/getting-instagram-posts-with-n8n-the-simple-way-part-1-c66cb5217054",
      file: "/medium/09 - Getting Instagram Posts with N8N (The Simple Way Part 1).md",
      published: "2025-11-18"
    },
    {
      id: "10",
      title: "Figma Body Alternatives: From Archetypes to\u2026 Art",
      category: "anime-dolls",
      image: "/medium/images/10/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/figma-body-alternatives-from-archetypes-to-art-b02c4a78390b",
      file: "/medium/10 - Figma Body Alternatives From Archetypes to\u2026 Art.md",
      published: "2025-11-19"
    },
    {
      id: "11",
      title: "How to Publish Your n8n Template",
      category: "tech",
      image: "/medium/images/11/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/how-to-publish-your-n8n-template-375832d8efd7",
      file: "/medium/11 - How to Publish Your n8n Template.md",
      published: "2025-11-21"
    },
    {
      id: "12",
      title: "About Prompts, AI and Playing with Nanobana Pro",
      category: "anime-dolls",
      image: "/medium/images/12/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/about-prompts-ai-and-playing-with-nanobana-pro-3737479e6f53",
      file: "/medium/12 - About Prompts, AI and Playing with Nanobana Pro.md",
      published: "2025-11-21"
    },
    {
      id: "13",
      title: "My Favorite Figmas \u2014 2025",
      category: "anime-dolls",
      image: "/medium/images/13/img-01.png",
      mediumUrl: "https://medium.com/@mister.funable/my-favorite-figmas-2025-a4dd70db6be4",
      file: "/medium/13 - My Favorite Figmas \u2014 2025.md",
      published: "2025-11-26"
    }
  ];

  function getPostById(id) {
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].id === id) return posts[i];
    }
    return null;
  }

  function formatDate(dateStr) {
    var d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function preprocessMarkdown(md) {
    // Strip HTML comment metadata lines at top
    md = md.replace(/^<!--[\s\S]*?-->\n*/gm, '');

    // Fix relative image paths to absolute
    md = md.replace(/\(images\//g, '(/medium/images/');
    md = md.replace(/src="images\//g, 'src="/medium/images/');

    // Strip the first h1 (title) since we display it in the header
    md = md.replace(/^# .+\n*/m, '');

    return md;
  }

  function showNotFound() {
    document.getElementById('article-content').innerHTML =
      '<div class="article-not-found">' +
        '<h2>Article not found</h2>' +
        '<p>The article you\'re looking for doesn\'t exist.</p>' +
        '<a href="/posts.html">&larr; Back to all posts</a>' +
      '</div>';
    document.title = 'Article Not Found';
  }

  function loadArticle() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    if (!id) {
      showNotFound();
      return;
    }

    // Pad single digit IDs
    if (id.length === 1) id = '0' + id;

    var post = getPostById(id);
    if (!post) {
      showNotFound();
      return;
    }

    // Set page title
    document.title = post.title + ' | My Doll Inventory';

    // Set header
    document.getElementById('article-title').textContent = post.title;
    document.getElementById('article-date').textContent = formatDate(post.published);
    document.getElementById('article-medium-link').href = post.mediumUrl;
    document.getElementById('article-header').style.display = '';

    // Fetch and render markdown
    fetch(post.file)
      .then(function(response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.text();
      })
      .then(function(md) {
        var processed = preprocessMarkdown(md);
        var html = marked.parse(processed);
        document.getElementById('article-content').innerHTML = html;
      })
      .catch(function(error) {
        console.error('Failed to load article:', error);
        document.getElementById('article-content').innerHTML =
          '<div class="article-not-found">' +
            '<h2>Failed to load article</h2>' +
            '<p>There was an error loading this article. You can read it on Medium instead.</p>' +
            '<a href="' + post.mediumUrl + '" target="_blank" rel="noopener">Read on Medium &rarr;</a>' +
          '</div>';
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadArticle);
  } else {
    loadArticle();
  }
})();
