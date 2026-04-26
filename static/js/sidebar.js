/* ============================================================
   Yeildpredicto — js/sidebar.js
   Unified sidebar injected into every page.
   Include BEFORE main.js in all HTML files.
   ============================================================ */

(function () {
  // ── Sidebar config ──────────────────────────────────────
  const NAV_ITEMS = [
    { href: '/',    icon: '🏠', label: 'Home' },
    { href: '/predict',  icon: '🌾', label: 'Prediction' },
    { href: '/how',      icon: '⚙️', label: 'How It Works' },
    { href: '/calendar', icon: '📅', label: 'Crop Calendar' },
    { href: '/tips',     icon: '💡', label: 'Tips & Insights' },
  ];

  const LANGUAGES = [
    { value: 'en',  label: 'English' },
    { value: 'hi',  label: 'हिन्दी' },
    { value: 'te',  label: 'తెలుగు' },
    { value: 'ta',  label: 'தமிழ்' },
    { value: 'kn',  label: 'ಕನ್ನಡ' },
    { value: 'ml',  label: 'മലയാളം' },
    { value: 'mr',  label: 'मराठी' },
    { value: 'gu',  label: 'ગુજરાતી' },
    { value: 'pa',  label: 'ਪੰਜਾਬੀ' },
    { value: 'bn',  label: 'বাংলা' },
    { value: 'or',  label: 'ଓଡ଼ିଆ' },
    { value: 'as',  label: 'অসমীয়া' },
    { value: 'ur',  label: 'اردو' },
    { value: 'sa',  label: 'संस्कृत' },
    { value: 'ne',  label: 'Nepali' },
  ];

  const STORAGE_KEY   = 'yp_sidebar_collapsed';
  const LANG_KEY      = 'yp_lang';

  // ── Determine current page ──────────────────────────────
  const currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  // ── Build sidebar HTML ──────────────────────────────────
  function buildSidebar() {
    const savedLang = localStorage.getItem(LANG_KEY) || 'en';

    const navItemsHTML = NAV_ITEMS.map(item => {
      const isActive = window.location.pathname === item.href;
      return `
        <a href="${item.href}" class="yp-nav-item${isActive ? ' active' : ''}" title="${item.label}">
          <span class="yp-nav-item-icon">${item.icon}</span>
          <span class="yp-nav-item-label">${item.label}</span>
        </a>`;
    }).join('');

    const langOptionsHTML = LANGUAGES.map(l =>
      `<option value="${l.value}"${l.value === savedLang ? ' selected' : ''}>${l.label}</option>`
    ).join('');

    return `
      <!-- YP Unified Sidebar -->
      <aside class="yp-sidebar" id="ypSidebar" role="navigation" aria-label="Main navigation">
        <a href="/" class="yp-sidebar-brand">
          <div style="display:flex;flex-direction:column;overflow:hidden;">
            <span class="yp-sidebar-brand-name">Yeild<span>predicto</span></span>
            <span style="font-size:10px;color:rgba(255,255,255,0.35);margin-top:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">AI Crop Intelligence</span>
          </div>
          <button class="yp-collapse-btn" id="ypCollapseBtn" title="Collapse sidebar" aria-label="Toggle sidebar">‹</button>
        </a>

        <nav class="yp-sidebar-nav">
          <div class="yp-nav-section">Navigation</div>
          ${navItemsHTML}
        </nav>

        <div class="yp-sidebar-footer">
          <div class="yp-sidebar-lang-label">🌐 Language</div>
          <select class="yp-sidebar-lang-select" id="ypLangSelect" aria-label="Select language">
            ${langOptionsHTML}
          </select>
          <div class="yp-sidebar-loc no-translate" id="ypSidebarLoc">📍 Detecting...</div>
        </div>
      </aside>

      <!-- Mobile toggle button -->
      <button class="yp-sidebar-toggle" id="ypSidebarToggle" aria-label="Open navigation menu" aria-expanded="false">
        <span></span>
      </button>

      <!-- Mobile overlay -->
      <div class="yp-sidebar-overlay" id="ypSidebarOverlay"></div>
    `;
  }

  // ── Inject sidebar into DOM ─────────────────────────────
  function injectSidebar() {
    const container = document.createElement('div');
    container.innerHTML = buildSidebar();
    // Insert before first child of body
    document.body.insertBefore(container, document.body.firstChild);
  }

  // ── Sidebar collapse logic (desktop) ───────────────────
  function initCollapseLogic() {
    const btn  = document.getElementById('ypCollapseBtn');
    const body = document.body;
    const isCollapsed = localStorage.getItem(STORAGE_KEY) === '1';

    const setCollapsed = (collapsed) => {
      body.classList.toggle('sidebar-collapsed', collapsed);
      if (btn) btn.textContent = collapsed ? '›' : '‹';
      localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0');
    };

    setCollapsed(isCollapsed);
    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      setCollapsed(!body.classList.contains('sidebar-collapsed'));
    });
  }

  // ── Mobile sidebar open/close ───────────────────────────
  function initMobileLogic() {
    const toggleBtn = document.getElementById('ypSidebarToggle');
    const overlay   = document.getElementById('ypSidebarOverlay');
    const sidebar   = document.getElementById('ypSidebar');

    const setOpen = (open) => {
      sidebar?.classList.toggle('open', open);
      overlay?.classList.toggle('open', open);
      toggleBtn?.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    toggleBtn?.addEventListener('click', () => setOpen(!sidebar?.classList.contains('open')));
    overlay?.addEventListener('click', () => setOpen(false));

    // Close on nav item click (mobile)
    document.querySelectorAll('.yp-nav-item').forEach(a => {
      a.addEventListener('click', () => {
        if (window.innerWidth <= 768) setOpen(false);
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // ── Sync language select with main nav languageSwitcher ──
  function initLangSync() {
    const ypSel   = document.getElementById('ypLangSelect');
    const savedLang = localStorage.getItem(LANG_KEY) || 'en';

    // Sync all existing language selectors
    const syncAll = (val) => {
      document.querySelectorAll('#languageSwitcher').forEach(s => s.value = val);
      if (ypSel) ypSel.value = val;
    };

    syncAll(savedLang);

    // When sidebar selector changes
    ypSel?.addEventListener('change', async function () {
      const newLang = this.value;
      syncAll(newLang);
      localStorage.setItem(LANG_KEY, newLang);
      // Trigger translation if lang.js is loaded
      if (typeof translatePage === 'function') {
        await translatePage(newLang);
      }
      // Also trigger any existing languageSwitcher handlers
      document.querySelectorAll('#languageSwitcher').forEach(s => {
        s.dispatchEvent(new Event('change'));
      });
    });

    // When existing nav selector changes, sync to sidebar
    document.querySelectorAll('#languageSwitcher').forEach(s => {
      s.addEventListener('change', function () {
        if (ypSel) ypSel.value = this.value;
      });
    });
  }

  // ── Update location pill ────────────────────────────────
  function initLocPill() {
    const pill  = document.getElementById('ypSidebarLoc');
    const navLoc = document.getElementById('navLoc');

    const update = (text) => {
      if (pill) pill.textContent = text;
      if (navLoc) navLoc.textContent = text;
    };

    // Watch navLoc for changes (form.js updates it)
    if (navLoc) {
      const observer = new MutationObserver(() => {
        if (pill) pill.textContent = navLoc.textContent;
      });
      observer.observe(navLoc, { childList: true, characterData: true, subtree: true });
    }

    // Default
    const DEFAULT = typeof DEFAULT_CITY !== 'undefined' ? '📍 ' + DEFAULT_CITY : '📍 Detecting...';
    update(DEFAULT);
  }

  // ── Run on DOM ready ────────────────────────────────────
  function run() {
    injectSidebar();
    initCollapseLogic();
    initMobileLogic();

    // Wait for rest of DOM to load
    window.addEventListener('load', () => {
      initLangSync();
      initLocPill();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();