// Iframe handling functionality
document.addEventListener('DOMContentLoaded', function() {
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        const container = iframe.parentElement;
        if (!container) return;
        
        // Add loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'iframe-loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="spinner"></div>
            <p>Loading content...</p>
        `;
        container.appendChild(loadingOverlay);
        
        // Add error message container (hidden by default)
        const errorMessage = document.createElement('div');
        errorMessage.className = 'iframe-error-message';
        errorMessage.style.display = 'none';
        errorMessage.innerHTML = `
            <p>Unable to load content</p>
            <button class="retry-btn">Retry</button>
        `;
        container.appendChild(errorMessage);
        
        // Handle iframe loading
        let loadTimeout;
        const loadIframe = () => {
            // Show loading state immediately
            loadingOverlay.classList.add('active');
            errorMessage.style.display = 'none';
            iframe.style.opacity = '0';
            
            // Set the actual src from data-src
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
            }
            
            // Set timeout for loading state
            loadTimeout = setTimeout(() => {
                loadingOverlay.classList.remove('active');
                errorMessage.style.display = 'block';
            }, 15000); // 15 second timeout
            
            // Handle iframe load
            iframe.onload = () => {
                clearTimeout(loadTimeout);
                loadingOverlay.classList.remove('active');
                iframe.style.opacity = '1';
                iframe.classList.add('loaded');
            };
            
            // Handle iframe error
            iframe.onerror = () => {
                clearTimeout(loadTimeout);
                loadingOverlay.classList.remove('active');
                errorMessage.style.display = 'block';
            };
        };
        
        // Initial load with a small delay to ensure proper initialization
        setTimeout(loadIframe, 100);
        
        // Handle retry button
        const retryBtn = errorMessage.querySelector('.retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                loadIframe();
            });
        }
        
        // Handle mobile detection
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
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
    
    // Handle lazy loading for iframes
    const lazyLoadIframes = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    if (iframe.dataset.src) {
                        iframe.src = iframe.dataset.src;
                        iframe.removeAttribute('data-src');
                    }
                    observer.unobserve(iframe);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        iframes.forEach(iframe => {
            if (iframe.dataset.src) {
                observer.observe(iframe);
            }
        });
    };
    
    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        lazyLoadIframes();
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        iframes.forEach(iframe => {
            if (iframe.dataset.src) {
                iframe.src = iframe.dataset.src;
                iframe.removeAttribute('data-src');
            }
        });
    }
});

function handleIframeLoad() {
    document.getElementById('loading').style.display = 'none';
}

function handleIframeError() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('error').style.display = 'block';
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.onclick = function() {
            document.getElementById('error').style.display = 'none';
            document.getElementById('loading').style.display = 'flex';
            // Reload the iframe
            const iframe = document.getElementById('airtableFrame');
            iframe.src = iframe.src;
        };
    }
}

// Timeout for loading error
setTimeout(() => {
    if (document.getElementById('loading').style.display !== 'none') {
        handleIframeError();
    }
}, 30000);

// ... rest of the iframe handling code ... 