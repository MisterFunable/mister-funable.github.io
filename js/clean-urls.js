// Clean URLs - Remove .html extension from browser address bar
(function() {
    'use strict';
    
    // Flag to prevent multiple executions
    let hasExecuted = false;
    
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
        // Prevent multiple executions
        if (hasExecuted) return;
        hasExecuted = true;
        
        const currentPath = window.location.pathname;
        
        // Check if we're running locally (file:// protocol or localhost)
        const isLocal = window.location.protocol === 'file:' || 
                       window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1' ||
                       window.location.hostname === '';
        
        // Skip clean URL handling for local development
        if (isLocal) {
            console.log('Local development: skipping clean URL redirects');
            return;
        }
        
        // If the path doesn't end with .html and doesn't end with /
        if (!currentPath.endsWith('.html') && !currentPath.endsWith('/') && currentPath !== '/') {
            // For production, use fetch to check if the file exists
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
    
    // Run only on DOMContentLoaded to prevent immediate execution
    document.addEventListener('DOMContentLoaded', handleCleanUrlNavigation);
})();
