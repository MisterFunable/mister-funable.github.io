// Enhanced iframe handling functionality
document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('airtableFrame');
    if (!iframe) return;
    
    // Create error popup if it doesn't exist
    function createErrorPopup() {
        if (document.getElementById('error-popup')) return;
        
        const popup = document.createElement('div');
        popup.id = 'error-popup';
        popup.className = 'iframe-error-popup';
        popup.innerHTML = `
            <div class="iframe-error-message">
                <button class="close-btn" onclick="closeErrorPopup()" aria-label="Close">&times;</button>
                <span class="error-icon">⚠️</span>
                <h3 class="error-title" data-lang-en="Error al Cargar Colección" data-lang-es="Error al Cargar Colección">Error al Cargar Colección</h3>
                <p class="error-description" data-lang-en="No pudimos cargar la colección en la vista integrada. Esto puede deberse a problemas de red o Airtable estando temporalmente no disponible." data-lang-es="No pudimos cargar la colección en la vista integrada. Esto puede deberse a problemas de red o Airtable estando temporalmente no disponible.">
                    No pudimos cargar la colección en la vista integrada. Esto puede deberse a problemas de red o Airtable estando temporalmente no disponible.
                </p>
                <div class="button-group">
                    <button id="retry-btn" data-lang-en="Intentar de Nuevo" data-lang-es="Intentar de Nuevo">Intentar de Nuevo</button>
                    <button id="direct-access-btn" data-lang-en="Abrir en Airtable" data-lang-es="Abrir en Airtable">Abrir en Airtable</button>
                </div>
            </div>
        `;
        document.body.appendChild(popup);
    }
    
    // Show error popup
    function showErrorPopup() {
        createErrorPopup();
        const popup = document.getElementById('error-popup');
        if (popup) {
            popup.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }
    
    // Close error popup
    window.closeErrorPopup = function() {
        const popup = document.getElementById('error-popup');
        if (popup) {
            popup.classList.remove('show');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }
    
    // Close popup when clicking outside
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('error-popup');
        if (popup && popup.classList.contains('show') && e.target === popup) {
            closeErrorPopup();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeErrorPopup();
        }
    });
    
    // Get the iframe URL for direct access
    const iframeUrl = iframe.dataset.src || iframe.src;
    
    // Handle iframe loading
    let loadTimeout;
    const loadIframe = () => {
        // Set the actual src from data-src
        if (iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
        }

        // Set timeout for loading state (45 seconds to match loading screen)
        loadTimeout = setTimeout(() => {
            showErrorPopup();
        }, 45000);

        // Handle iframe load
        iframe.onload = () => {
            clearTimeout(loadTimeout);
            iframe.style.opacity = '1';
            iframe.classList.add('loaded');

            // Hide the loading screen if it exists
            if (window.hideLoadingScreen) {
                window.hideLoadingScreen();
            }
        };

        // Handle iframe error
        iframe.onerror = () => {
            clearTimeout(loadTimeout);
            showErrorPopup();

            // Hide the loading screen if it exists
            if (window.hideLoadingScreen) {
                window.hideLoadingScreen();
            }
        };
    };
    
    // Initial load with a small delay to ensure proper initialization
    setTimeout(loadIframe, 100);
    
    // Handle retry button (both inline and popup)
    function setupRetryButton() {
        const retryBtn = document.getElementById('retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                closeErrorPopup();
                loadIframe();
            });
        }
    }
    
    // Setup retry button initially
    setupRetryButton();
    
    // Setup retry button when popup is created
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const retryBtn = document.getElementById('retry-btn');
                if (retryBtn && !retryBtn.hasAttribute('data-listener-added')) {
                    retryBtn.addEventListener('click', () => {
                        closeErrorPopup();
                        loadIframe();
                    });
                    retryBtn.setAttribute('data-listener-added', 'true');
                }
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Handle direct access button (both inline and popup)
    function setupDirectAccessButton() {
        const directAccessBtn = document.getElementById('direct-access-btn');
        if (directAccessBtn && iframeUrl) {
            directAccessBtn.addEventListener('click', () => {
                closeErrorPopup();
                window.open(iframeUrl, '_blank');
            });
        }
    }
    
    // Setup direct access button initially
    setupDirectAccessButton();
    
    // Setup direct access button when popup is created
    const directAccessObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                const directAccessBtn = document.getElementById('direct-access-btn');
                if (directAccessBtn && !directAccessBtn.hasAttribute('data-listener-added')) {
                    directAccessBtn.addEventListener('click', () => {
                        closeErrorPopup();
                        window.open(iframeUrl, '_blank');
                    });
                    directAccessBtn.setAttribute('data-listener-added', 'true');
                }
            }
        });
    });
    
    directAccessObserver.observe(document.body, { childList: true, subtree: true });
    
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

 