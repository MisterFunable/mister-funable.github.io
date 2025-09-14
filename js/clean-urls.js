// Clean URLs - Remove .html extension from browser address bar
(function() {
    'use strict';
    
    // Only run on pages that have .html in the URL
    if (window.location.pathname.includes('.html')) {
        // Get the clean URL (remove .html)
        const cleanUrl = window.location.pathname.replace(/\.html$/, '');
        
        // Update the URL without reloading the page
        if (cleanUrl !== window.location.pathname) {
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }
    
    // Handle navigation to clean URLs
    function handleCleanUrlNavigation() {
        const currentPath = window.location.pathname;
        
        // If the path doesn't end with .html and doesn't end with /
        if (!currentPath.endsWith('.html') && !currentPath.endsWith('/') && currentPath !== '/') {
            // Check if the .html version exists by trying to fetch it
            fetch(currentPath + '.html')
                .then(response => {
                    if (response.ok) {
                        // If .html version exists, redirect to it
                        window.location.href = currentPath + '.html';
                    }
                })
                .catch(() => {
                    // If .html version doesn't exist, do nothing
                    // This allows for custom 404 handling
                });
        }
    }
    
    // Run on page load
    document.addEventListener('DOMContentLoaded', handleCleanUrlNavigation);
    
    // Also run immediately in case DOMContentLoaded already fired
    handleCleanUrlNavigation();
})();
