/**
 * Loading Screen with Ironic Messages
 * Shows funny messages while page content loads
 */

(function() {
  'use strict';

  // Ironic loading messages - feel free to add more!
  const loadingMessages = [
    "Do I look like a guy who can use a fast DB?",
    "Loading everything...",
    "Still loading...",
    "Fetching data from the slowest server in existence...",
    "Compiling all the dolls into one place...",
    "Asking Airtable politely to wake up...",
    "Converting coffee to code... wait, wrong script",
    "Counting all 2500+ items by hand...",
    "Teaching the hamsters to run faster...",
    "Upgrading from dial-up... just kidding",
    "Blaming it on the internet...",
    "Pretending this is intentional...",
    "Loading your patience meter...",
    "Organizing 150+ brands alphabetically... slowly",
    "Waiting for the servers to finish their coffee break",
    "Calculating the meaning of life... found: 42 dolls",
    "Convincing the database to share its secrets...",
    "Negotiating with the API... it's playing hard to get",
    "This would go faster if I paid for premium hosting",
    "Loading... because good things take time (apparently)",
    "Defragmenting the digital doll collection...",
    "Summoning data from the cloud... it's very cloudy today"
  ];

  let currentMessageIndex = 0;
  let messageInterval;
  let loadingScreen;
  let messageElement;
  let progressComplete = false;

  // Create loading screen HTML
  function createLoadingScreen() {
    const loadingHTML = `
      <div class="loading-screen" id="loading-screen">
        <img src="/assets/images/mascot/bunny-suit.png"
             alt="Loading"
             class="loading-mascot"
             onerror="this.style.display='none'">

        <div class="loading-spinner"></div>

        <div class="loading-message-container">
          <div class="loading-message" id="loading-message">
            ${loadingMessages[0]}
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="loading-submessage">
            This might take a moment... grab a coffee ☕
          </div>
        </div>

        <div class="loading-progress">
          <div class="loading-progress-bar"></div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
    loadingScreen = document.getElementById('loading-screen');
    messageElement = document.getElementById('loading-message');
  }

  // Rotate through messages with fade effect
  function rotateMessage() {
    if (!messageElement || progressComplete) return;

    messageElement.classList.add('fade');

    setTimeout(() => {
      currentMessageIndex = (currentMessageIndex + 1) % loadingMessages.length;
      messageElement.innerHTML = `
        ${loadingMessages[currentMessageIndex]}
        <div class="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      `;
      messageElement.classList.remove('fade');
    }, 500);
  }

  // Hide loading screen with fade out
  function hideLoadingScreen() {
    if (!loadingScreen) return;

    progressComplete = true;

    if (messageInterval) {
      clearInterval(messageInterval);
    }

    // Final message
    if (messageElement) {
      messageElement.classList.add('fade');
      setTimeout(() => {
        messageElement.innerHTML = 'Done! That wasn\'t so bad... was it? 🎉';
        messageElement.classList.remove('fade');
      }, 500);
    }

    // Fade out after showing final message
    setTimeout(() => {
      loadingScreen.classList.add('fade-out');

      // Remove from DOM after fade completes
      setTimeout(() => {
        if (loadingScreen && loadingScreen.parentNode) {
          loadingScreen.parentNode.removeChild(loadingScreen);
        }
      }, 800);
    }, 1500);
  }

  // Initialize loading screen
  function init() {
    createLoadingScreen();

    // Rotate messages every 3 seconds
    messageInterval = setInterval(rotateMessage, 3000);

    // Check if this is an iframe page
    const iframe = document.getElementById('airtableFrame');

    if (iframe) {
      // For iframe pages, wait for the iframe to load
      const checkIframeLoad = () => {
        // Load the iframe if it has a data-src
        if (iframe.dataset.src && !iframe.src) {
          iframe.src = iframe.dataset.src;
        }

        // Wait for iframe to load
        iframe.addEventListener('load', () => {
          setTimeout(hideLoadingScreen, 500);
        });

        // Fallback: force hide after 45 seconds
        setTimeout(() => {
          if (!progressComplete) {
            console.log('Loading screen timeout - force hiding');
            hideLoadingScreen();
          }
        }, 45000);
      };

      // Check if page is already loaded
      if (document.readyState === 'complete') {
        checkIframeLoad();
      } else {
        window.addEventListener('load', checkIframeLoad);
      }
    } else {
      // For non-iframe pages, wait for page to load
      if (document.readyState === 'complete') {
        setTimeout(hideLoadingScreen, 500);
      } else {
        window.addEventListener('load', () => {
          setTimeout(hideLoadingScreen, 500);
        });
      }

      // Fallback: force hide after 45 seconds
      setTimeout(() => {
        if (!progressComplete) {
          console.log('Loading screen timeout - force hiding');
          hideLoadingScreen();
        }
      }, 45000);
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose function to manually hide loading screen if needed
  window.hideLoadingScreen = hideLoadingScreen;
})();
