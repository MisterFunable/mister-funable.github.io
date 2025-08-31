// Enhanced iframe handling functionality
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('airtableFrame');
    if (!iframe) return;
    
    const loadingOverlay = document.getElementById('loading');
    const errorMessage = document.getElementById('error');
    
    // Get the iframe URL for direct access
    const iframeUrl = iframe.dataset.src || iframe.src;
    
    // Handle iframe loading
    let loadTimeout;
    const loadIframe = () => {
        // Show loading state immediately
        loadingOverlay.style.display = 'flex';
        errorMessage.style.display = 'none';
        iframe.style.opacity = '0';
        
        // Set the actual src from data-src
        if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
        }
        
        // Set timeout for loading state (reduced to 10 seconds)
        loadTimeout = setTimeout(() => {
            loadingOverlay.style.display = 'none';
            errorMessage.style.display = 'block';
        }, 10000); // 10 second timeout
        
        // Handle iframe load
        iframe.onload = () => {
            clearTimeout(loadTimeout);
            loadingOverlay.style.display = 'none';
            iframe.style.opacity = '1';
            iframe.classList.add('loaded');
        };
        
        // Handle iframe error
        iframe.onerror = () => {
            clearTimeout(loadTimeout);
            loadingOverlay.style.display = 'none';
            errorMessage.style.display = 'block';
        };
    };
    
    // Initial load with a small delay to ensure proper initialization
    setTimeout(loadIframe, 100);
    
    // Handle retry button
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            loadIframe();
        });
    }
    
    // Handle direct access button
    const directAccessBtn = document.getElementById('direct-access-btn');
    if (directAccessBtn && iframeUrl) {
        directAccessBtn.addEventListener('click', () => {
            window.open(iframeUrl, '_blank');
        });
    }
    
    // Handle mobile detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        const container = iframe.parentElement;
        // Add mobile-specific class
        container.classList.add('mobile-iframe');
        
        // Handle orientation changes
        window.addEventListener('orientationchange', () => {
            // Small delay to ensure proper resize
            setTimeout(() => {
                if (container.classList.contains('mobile-iframe')) {
                    const height = window.innerHeight * 0.8; // 80% of viewport height
                    container.style.height = `${height}px`;
                }
            }, 100);
        });
    }
});

// Fallback timeout for loading error (reduced to 12 seconds)
setTimeout(() => {
    const loadingOverlay = document.getElementById('loading');
    if (loadingOverlay && loadingOverlay.style.display !== 'none') {
        loadingOverlay.style.display = 'none';
        const errorMessage = document.getElementById('error');
        if (errorMessage) {
            errorMessage.style.display = 'block';
        }
    }
}, 12000);

// ... rest of the iframe handling code ... 