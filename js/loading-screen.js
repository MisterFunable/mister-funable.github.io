/**
 * Loading Screen with Ironic Messages
 * Shows funny messages while page content loads
 */

(function() {
  'use strict';

  // Ironic loading messages - feel free to add more!
  const loadingMessages = [
    "Waking up the database... it's not a morning person",
    "Asking Airtable nicely to cooperate... please?",
    "Teaching hamsters to run faster on the server wheel",
    "Loading at the speed of a Monday morning",
    "Convincing the pixels to arrange themselves properly",
    "Your patience is appreciated and mildly impressive",
    "Pretending this loading time was intentional",
    "Counting dolls... lost count... starting over",
    "Negotiating with the API... it wants a raise",
    "Buffering your enthusiasm (and this page)",
    "Loading... blame the previous developer",
    "This would load faster with carrier pigeons",
    "Calculating if you'll actually wait this long",
    "Still faster than shipping from AliExpress",
    "Brewing digital coffee for the server",
    "Manifesting faster internet speeds for you",
    "Error 404: Loading speed not found",
    "Fun fact: You could've blinked 47 times by now",
    "Powered by hopes, dreams, and free hosting",
    "Loading... because instant gratification is overrated"
  ];

  let usedMessages = [];
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

  // Get random message without immediate repetition
  function getRandomMessage() {
    // If all messages used, reset the pool
    if (usedMessages.length >= loadingMessages.length) {
      usedMessages = [];
    }

    // Get available messages
    const availableMessages = loadingMessages.filter((msg, index) => !usedMessages.includes(index));

    // Pick random from available
    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    const messageIndex = loadingMessages.indexOf(availableMessages[randomIndex]);

    // Mark as used
    usedMessages.push(messageIndex);

    return loadingMessages[messageIndex];
  }

  // Rotate through messages with fade effect
  function rotateMessage() {
    if (!messageElement || progressComplete) return;

    messageElement.classList.add('fade');

    setTimeout(() => {
      const randomMessage = getRandomMessage();
      messageElement.innerHTML = `
        ${randomMessage}
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
