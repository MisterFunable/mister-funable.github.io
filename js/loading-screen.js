/**
 * Loading Screen with Ironic Messages
 * Shows funny messages while page content loads
 */

(function() {
  'use strict';

  // Ironic loading messages - multilingual support
  const loadingMessages = {
    en: [
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
    ],
    jp: [
      "データベースを起こしています...朝が苦手なようです",
      "Airtableに協力をお願いしています...お願いします？",
      "サーバーのホイールで走るハムスターを速く走らせています",
      "月曜日の朝のスピードで読み込んでいます",
      "ピクセルたちを説得して正しく並べています",
      "あなたの忍耐に感謝します。かなり印象的です",
      "この読み込み時間は意図的だったことにしています",
      "ドールを数えています...数え間違えました...最初からやり直し",
      "APIと交渉中...給料アップを要求されています",
      "あなたの熱意（とこのページ）をバッファリング中",
      "読み込み中...前の開発者のせいにしてください",
      "伝書鳩の方が速いかもしれません",
      "あなたが本当にこんなに待つか計算中",
      "それでもAliExpressの配送よりは速いです",
      "サーバーにデジタルコーヒーを淹れています",
      "より速いインターネット速度をあなたのために顕在化中",
      "エラー404：読み込み速度が見つかりません",
      "豆知識：今までに47回まばたきできました",
      "希望と夢と無料ホスティングで動いています",
      "読み込み中...即座の満足は過大評価されています"
    ],
    es: [
      "Despertando la base de datos... no es una persona matutina",
      "Pidiendo amablemente a Airtable que coopere... ¿por favor?",
      "Enseñando a los hámsters a correr más rápido en la rueda del servidor",
      "Cargando a la velocidad de un lunes por la mañana",
      "Convenciendo a los píxeles de que se organicen correctamente",
      "Tu paciencia es apreciada y levemente impresionante",
      "Pretendiendo que este tiempo de carga fue intencional",
      "Contando muñecas... perdí la cuenta... empezando de nuevo",
      "Negociando con la API... quiere un aumento",
      "Buffering tu entusiasmo (y esta página)",
      "Cargando... culpa al desarrollador anterior",
      "Esto cargaría más rápido con palomas mensajeras",
      "Calculando si realmente esperarás tanto tiempo",
      "Aún más rápido que el envío desde AliExpress",
      "Preparando café digital para el servidor",
      "Manifestando velocidades de internet más rápidas para ti",
      "Error 404: Velocidad de carga no encontrada",
      "Dato curioso: Podrías haber parpadeado 47 veces ya",
      "Impulsado por esperanzas, sueños y hosting gratuito",
      "Cargando... porque la gratificación instantánea está sobrevalorada"
    ]
  };

  const submessages = {
    en: "This might take a moment... grab a coffee ☕",
    jp: "少し時間がかかるかもしれません...コーヒーでも☕",
    es: "Esto puede tomar un momento... toma un café ☕"
  };

  const finalMessages = {
    en: "Done! That wasn't so bad... was it? 🎉",
    jp: "完了！そんなに悪くなかったでしょ？🎉",
    es: "¡Hecho! No fue tan malo... ¿verdad? 🎉"
  };

  // Get current language from localStorage
  function getCurrentLanguage() {
    const lang = localStorage.getItem('preferredLanguage') || 'en';
    // Map 'cl' to 'es' as per site's language switcher
    return lang === 'cl' ? 'es' : lang;
  }

  let usedMessages = [];
  let currentMessageIndex = 0;
  let messageInterval;
  let loadingScreen;
  let messageElement;
  let progressComplete = false;

  // Create loading screen HTML
  function createLoadingScreen() {
    const lang = getCurrentLanguage();
    const messages = loadingMessages[lang] || loadingMessages.en;
    const submessage = submessages[lang] || submessages.en;

    const loadingHTML = `
      <div class="loading-screen" id="loading-screen">
        <img src="/assets/images/mascot/bunny-suit.png"
             alt="Loading"
             class="loading-mascot"
             onerror="this.style.display='none'">

        <div class="loading-spinner"></div>

        <div class="loading-message-container">
          <div class="loading-message" id="loading-message">
            ${messages[0]}
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="loading-submessage">
            ${submessage}
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
    const lang = getCurrentLanguage();
    const messages = loadingMessages[lang] || loadingMessages.en;

    // If all messages used, reset the pool
    if (usedMessages.length >= messages.length) {
      usedMessages = [];
    }

    // Get available messages
    const availableMessages = messages.filter((msg, index) => !usedMessages.includes(index));

    // Pick random from available
    const randomIndex = Math.floor(Math.random() * availableMessages.length);
    const messageIndex = messages.indexOf(availableMessages[randomIndex]);

    // Mark as used
    usedMessages.push(messageIndex);

    return messages[messageIndex];
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
      const lang = getCurrentLanguage();
      const finalMessage = finalMessages[lang] || finalMessages.en;

      messageElement.classList.add('fade');
      setTimeout(() => {
        messageElement.innerHTML = finalMessage;
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
