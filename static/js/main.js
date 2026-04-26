/* ============================================================
   Yeildpredicto — js/main.js
   App entry point. Runs all init functions after page load.
   ============================================================ */

window.addEventListener('load', () => {

  // 1. Loader (index.html only, first visit per session)
  const loader = document.getElementById('loader');
  const isHome = document.body?.dataset?.page === 'home';
  const LOADER_KEY = 'yeildpredicto_loader_seen';
  if (loader) {
    const alreadySeen = sessionStorage.getItem(LOADER_KEY) === '1';
    if (!isHome || alreadySeen) {
      loader.classList.add('out');
      loader.style.display = 'none';
    } else {
      setTimeout(() => {
        loader.classList.add('out');
        sessionStorage.setItem(LOADER_KEY, '1');
      }, 2500);
    }
  }

  // 2. Build dynamic UI components (only if the page contains them)
  if (typeof buildWaterChips === 'function' && document.getElementById('wGrid')) buildWaterChips();
  if (typeof buildCalendar === 'function' && document.getElementById('calGrid')) buildCalendar();
  if (typeof buildMarquee === 'function' && document.getElementById('mtrack')) buildMarquee();

  // 3. Init scroll-based fade-in for .fi elements
  if (typeof initFadeIn === 'function' && document.querySelector('.fi')) initFadeIn();        // ui.js

  // 4. Init navbar shadow on scroll
  if (typeof initNavScroll === 'function' && document.getElementById('mainNav')) initNavScroll();     // ui.js

  // 5. Predict page only: auto-detect location after loader clears
  if (typeof autoDetectOnLoad === 'function' && document.getElementById('predict') && document.getElementById('locBottom')) {
    setTimeout(autoDetectOnLoad, 3200);  // form.js (predict.html only)
  }

  // 6. Set initial nav location pill (if present)
  if (document.getElementById('navLoc') && typeof DEFAULT_CITY !== 'undefined') {
    document.getElementById('navLoc').textContent = '📍 ' + DEFAULT_CITY;
  }

  // 7. Init language system (if loaded)
  if (typeof initLanguage === 'function') initLanguage();

});