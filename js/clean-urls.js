// Clean URLs - Remove .html extension from browser address bar
(function() {
    'use strict';
    
    // Flag to prevent multiple executions
    let hasExecuted = false;
    
    function handleCleanUrls() {
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
        
        // If the URL has .html, remove it from the address bar
        if (currentPath.includes('.html')) {
            const cleanUrl = currentPath.replace(/\.html$/, '');
            if (cleanUrl !== currentPath) {
                window.history.replaceState({}, document.title, cleanUrl);
            }
        }
        // If the URL is clean (no .html), try to load the .html version
        else if (!currentPath.endsWith('/') && currentPath !== '/') {
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
    
    // Run on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', handleCleanUrls);
})();
