// Iframe handling functionality
document.addEventListener('DOMContentLoaded', function() {
    // Fix for iOS viewport height issues
    const updateVh = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateVh();
    window.addEventListener('resize', updateVh);

    // Fix for mobile scrolling issues
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const iframe = document.getElementById('airtableFrame');
        iframe.style.height = `calc(100vh - 50px)`;
    }

    // Use MutationObserver instead of DOMNodeInserted
    const targetNode = document.getElementById('airtableFrame');
    const config = { attributes: true, childList: true, subtree: true };
    
    const observer = new MutationObserver((mutationsList, observer) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                handleIframeLoad();
            }
        }
    });

    observer.observe(targetNode, config);
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