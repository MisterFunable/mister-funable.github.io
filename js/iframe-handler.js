// Iframe handling functionality
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('airtableFrame');
    if (!iframe) return;
    
    const loadingOverlay = document.getElementById('loading');
    const errorMessage = document.getElementById('error');
    
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
        
        // Set timeout for loading state
        loadTimeout = setTimeout(() => {
            loadingOverlay.style.display = 'none';
            errorMessage.style.display = 'block';
        }, 15000); // 15 second timeout
        
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

// Timeout for loading error
setTimeout(() => {
    const loadingOverlay = document.getElementById('loading');
    if (loadingOverlay && loadingOverlay.style.display !== 'none') {
        loadingOverlay.style.display = 'none';
        document.getElementById('error').style.display = 'block';
    }
}, 30000);

// ... rest of the iframe handling code ... 