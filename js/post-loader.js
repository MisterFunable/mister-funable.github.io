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
    },
    {
      id: "14",
      title: "Backing Up N8N When the Data Lives in a Docker Volume",
      category: "tech",
      image: "/medium/images/14/img-01.png",
      mediumUrl: "https://funable.medium.com/backing-up-n8n-when-the-data-lives-in-a-docker-volume-62e200d79172",
      file: "/medium/14 - Backing Up N8N When the Data Lives in a Docker Volume.md",
      published: "2025-12-06"
    },
    {
      id: "15",
      title: "BoardGameGeek Player Resources / Aids",
      category: "tech",
      image: "/medium/images/15/img-01.png",
      mediumUrl: "https://funable.medium.com/boardgamegeek-player-resources-aids-b0a37d238455",
      file: "/medium/15 - BoardGameGeek Player Resources Aids.md",
      published: "2025-12-21"
    },
    {
      id: "16",
      title: "Marvel Champions Resources",
      category: "tech",
      image: "/medium/images/16/img-01.png",
      mediumUrl: "https://funable.medium.com/marvel-champions-resources-7f6cef0bffe7",
      file: "/medium/16 - Marvel Champions Resources.md",
      published: "2025-12-21"
    },
    {
      id: "17",
      title: "Sony A6700 Updated Settings for Turntables with a Green Background",
      category: "anime-dolls",
      image: "/medium/images/17/img-01.png",
      mediumUrl: "https://funable.medium.com/sony-a6700-updated-settings-for-turntables-with-a-green-background-657dcd66d160",
      file: "/medium/17 - Sony A6700 Updated Settings for Turntables with a Green Background.md",
      published: "2025-12-27"
    },
    {
      id: "18",
      title: "A Silly Little osascript Utility That Types Notes For You",
      category: "tech",
      image: "/medium/images/18/img-01.png",
      mediumUrl: "https://funable.medium.com/a-silly-little-osascript-utility-that-types-notes-for-you-dc5948a523d2",
      file: "/medium/18 - A Silly Little osascript Utility That Types Notes For You.md",
      published: "2025-12-29"
    },
    {
      id: "19",
      title: "How to Design Your Medium Profile",
      category: "tech",
      image: "/medium/images/19/img-01.png",
      mediumUrl: "https://funable.medium.com/how-to-design-your-medium-profile-47d93edd7e9d",
      file: "/medium/19 - How to Design Your Medium Profile.md",
      published: "2025-12-29"
    },
    {
      id: "20",
      title: "Getting Instagram Posts with N8N (The Simple Way Part 2: The Final Part)",
      category: "tech",
      image: "/medium/images/20/img-01.png",
      mediumUrl: "https://funable.medium.com/getting-instagram-posts-with-n8n-the-simple-way-part-2-the-final-part-fdad1e999d74",
      file: "/medium/20 - Getting Instagram Posts with N8N (The Simple Way Part 2 The Final Part).md",
      published: "2025-12-31"
    },
    {
      id: "21",
      title: "Adding Multiple Instagram Accounts to Your n8n Automation",
      category: "tech",
      image: "/medium/images/21/img-01.png",
      mediumUrl: "https://funable.medium.com/adding-multiple-instagram-accounts-to-your-n8n-automation-772fd26af4a1",
      file: "/medium/21 - Adding Multiple Instagram Accounts to Your n8n Automation.md",
      published: "2026-01-01"
    },
    {
      id: "22",
      title: "From Zero \u2014 YouTube Lessons Part 0",
      category: "tech",
      image: "/medium/images/22/img-01.png",
      mediumUrl: "https://funable.medium.com/from-zero-youtube-lessons-part-0-822bb8a9c883",
      file: "/medium/22 - From Zero \u2014 YouTube Lessons Part 0.md",
      published: "2026-01-03"
    },
    {
      id: "23",
      title: "From Zero \u2014 YouTube Lessons Part 1",
      category: "tech",
      image: "/medium/images/23/img-01.png",
      mediumUrl: "https://funable.medium.com/from-zero-youtube-lessons-part-1-efd9a93f2d1b",
      file: "/medium/23 - From Zero \u2014 YouTube Lessons Part 1.md",
      published: "2026-01-03"
    },
    {
      id: "24",
      title: "Part 3\u2014 Designing a Mascot/Logo: A Fresh Start",
      category: "tech",
      image: "/medium/images/24/img-01.png",
      mediumUrl: "https://funable.medium.com/part-3-designing-a-mascot-logo-a-fresh-start-45f17906c0d2",
      file: "/medium/24 - Part 3\u2014 Designing a MascotLogo A Fresh Start.md",
      published: "2026-01-05"
    },
    {
      id: "25",
      title: "Why Your AI Images Look Worse After Each Iteration",
      category: "tech",
      image: "/medium/images/25/img-01.png",
      mediumUrl: "https://funable.medium.com/why-your-ai-images-look-worse-after-each-iteration-b66abc24fced",
      file: "/medium/25 - Why Your AI Images Look Worse After Each Iteration.md",
      published: "2026-01-12"
    },
    {
      id: "26",
      title: "Uploading Instagram Videos to YouTube with n8n",
      category: "tech",
      image: "/medium/images/26/img-01.png",
      mediumUrl: "https://funable.medium.com/uploading-instagram-videos-to-youtube-with-n8n-6df5ad3c2523",
      file: "/medium/26 - Uploading Instagram Videos to YouTube with n8n.md",
      published: "2026-01-17"
    },
    {
      id: "27",
      title: "Side Notes #1: What Yu-Gi-Oh Taught Me About Leadership",
      category: "tech",
      image: "/medium/images/27/img-01.png",
      mediumUrl: "https://funable.medium.com/side-notes-1-what-yu-gi-oh-taught-me-about-leadership-cd13634fbde7",
      file: "/medium/27 - Side Notes #1 What Yu-Gi-Oh Taught Me About Leadership.md",
      published: "2026-01-23"
    },
    {
      id: "28",
      title: "Claude Code (Part 1): Do You Actually Need This If You Have Cursor?",
      category: "tech",
      image: "/medium/images/28/img-01.png",
      mediumUrl: "https://funable.medium.com/claude-code-part-1-do-you-actually-need-this-if-you-have-cursor-30b902668de4",
      file: "/medium/28 - Claude Code (Part 1) Do You Actually Need This If You Have Cursor.md",
      published: "2026-01-23"
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

    // Update meta tags for SEO
    var pageUrl = 'https://mydollinventory.com/posts/article.html?id=' + post.id;
    var pageImage = post.image ? 'https://mydollinventory.com' + post.image : 'https://mydollinventory.com/assets/images/mascot/bunny-suit.png';
    var pageDesc = post.title + ' - Read on My Doll Inventory';

    var metaUpdates = {
      'meta[name="description"]': { attr: 'content', val: pageDesc },
      'link[rel="canonical"]': { attr: 'href', val: pageUrl },
      'meta[property="og:title"]': { attr: 'content', val: post.title + ' | My Doll Inventory' },
      'meta[property="og:description"]': { attr: 'content', val: pageDesc },
      'meta[property="og:url"]': { attr: 'content', val: pageUrl },
      'meta[property="og:image"]': { attr: 'content', val: pageImage },
      'meta[name="twitter:title"]': { attr: 'content', val: post.title + ' | My Doll Inventory' },
      'meta[name="twitter:description"]': { attr: 'content', val: pageDesc },
      'meta[name="twitter:image"]': { attr: 'content', val: pageImage }
    };

    for (var selector in metaUpdates) {
      var el = document.querySelector(selector);
      if (el) el.setAttribute(metaUpdates[selector].attr, metaUpdates[selector].val);
    }

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
