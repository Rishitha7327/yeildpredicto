/* ============================================================
   Yeildpredicto — js/lang.js
   Full translation support using own backend /api/utils/translate
   ============================================================ */

// ✅ FIX: Use your own backend instead of TranslatePlus
const BACKEND_URL = 'http://127.0.0.1:5000';

const LANG_CODE_MAP = {
  'en':  'en', 'hi':  'hi', 'te':  'te', 'ta':  'ta',
  'kn':  'kn', 'ml':  'ml', 'mr':  'mr', 'gu':  'gu',
  'pa':  'pa', 'bn':  'bn', 'or':  'or', 'as':  'as',
  'ur':  'ur', 'sa':  'sa', 'ne':  'ne'
};

// Cache: { lang: { originalText: translatedText } }
const translationCache = {};

// Current language
let currentLang = localStorage.getItem('yp_lang') || 'en';

// ── Core translate function ────────────────────────────────
async function translateText(text, targetLang) {
  if (!text || !text.trim()) return text;
  if (targetLang === 'en') return text;

  // Check cache
  if (translationCache[targetLang]?.[text]) {
    return translationCache[targetLang][text];
  }

  try {
    // ✅ FIX: Call your own backend translate endpoint
    const res = await fetch(`${BACKEND_URL}/api/utils/translate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text:   text,
        source: 'en',
        target: LANG_CODE_MAP[targetLang] || 'en'
      })
    });

    if (!res.ok) throw new Error('Translation API error');
    const data = await res.json();
    const translated = data?.translated_text || text;

    // Store in cache
    if (!translationCache[targetLang]) translationCache[targetLang] = {};
    translationCache[targetLang][text] = translated;
    return translated;

  } catch (err) {
    console.warn('Translation failed for:', text, err);
    return text; // Fallback to original
  }
}

// ── Batch translate multiple texts ─────────────────────────
async function translateBatch(texts, targetLang) {
  if (targetLang === 'en') return texts;

  try {
    // ✅ Use batch endpoint for efficiency
    const res = await fetch(`${BACKEND_URL}/api/utils/translate-batch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        texts:  texts,
        source: 'en',
        target: LANG_CODE_MAP[targetLang] || 'en'
      })
    });

    if (!res.ok) throw new Error('Batch translation failed');
    const data = await res.json();
    return data?.translations || texts;

  } catch (err) {
    console.warn('Batch translation failed, falling back one by one:', err);
    // Fallback: translate one by one
    const results = await Promise.all(texts.map(t => translateText(t, targetLang)));
    return results;
  }
}

// ── Get all translatable text nodes ───────────────────────
function getTranslatableNodes() {
  const selectors = [
    'h1, h2, h3, h4, h5, h6',
    'p',
    'label',
    'span:not(.no-translate)',
    'div.eyebrow',
    'div.loc-title',
    'div.loc-desc',
    'div.form-banner-title',
    'div.form-banner-sub',
    'div.yt-card-title',
    'div.yt-card-desc',
    'div.water-title',
    'div.res-section-title',
    'div.crc-name',
    'div.crc-sci',
    'div.testi-quote',
    'div.testi-name',
    'div.testi-place',
    'div.cdi-label',
    'div.cdi-val',
    'div.ydm-label',
    'div.hfc-label',
    'div.hfc-val',
    'div.tip-card h3',
    'div.tip-card p',
    'div.tip-badge',
    'div.stat-label',
    'div.how-card h3',
    'div.how-card p',
    'div.alt-crop-name',
    'div.alt-reason',
    'div.alt-advantage',
    'div.sub-crop-label span',
    'div.season-card-top h3',
    'div.season-card-top p',
    'div.sc-months',
    'div.sc-fact',
    'div.sc-crops-title',
    'div.tsc-title',
    'div.tsc-text',
    'div.cal-cta h2',
    'div.cal-cta p',
    'div.pro-item',
    'div.con-item',
    'div.alts-title',
    'div.alts-sub',
    'div.footer-tagline',
    'button:not(.no-translate)',
    '.btn-next',
    '.btn-back',
    '.detect-btn',
    '.ra-btn',
    '.cal-btn-main',
    '.cal-btn-ghost',
    '.cta-btn-main',
    '.cta-btn-ghost',
    '.step-btn',
    '.sidebar a',
    'option'
  ];

  const nodes = [];
  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (el.children.length === 0 || el.tagName === 'OPTION') {
        const text = el.textContent.trim();
        if (text && !/^[\d.,°%₹\s\+\-\/]+$/.test(text) && text.length > 1) {
          nodes.push(el);
        }
      }
    });
  });
  return nodes;
}

// ── Store original text before first translation ───────────
function storeOriginals() {
  document.querySelectorAll('[data-orig]').length === 0 &&
    getTranslatableNodes().forEach(el => {
      if (!el.dataset.orig) {
        el.dataset.orig = el.textContent.trim();
      }
    });
}

// ── Translate entire page ──────────────────────────────────
async function translatePage(targetLang) {
  // ✅ FIX: Removed early return — always translate when called

  storeOriginals();

  const nodes = document.querySelectorAll('[data-orig]');
  if (!nodes.length) storeOriginals();

  showTranslationLoader(true);

  const allNodes = Array.from(document.querySelectorAll('[data-orig]'));
  const texts    = allNodes.map(n => n.dataset.orig);

  // If going back to English, restore originals
  if (targetLang === 'en') {
    allNodes.forEach(n => { n.textContent = n.dataset.orig; });
    showTranslationLoader(false);
    return;
  }

  // Batch translate in chunks of 20 to avoid rate limits
  const CHUNK = 20;
  for (let i = 0; i < allNodes.length; i += CHUNK) {
    const chunk      = allNodes.slice(i, i + CHUNK);
    const chunkTexts = chunk.map(n => n.dataset.orig);
    const translated = await translateBatch(chunkTexts, targetLang);
    chunk.forEach((node, j) => {
      if (translated[j] && translated[j] !== chunkTexts[j]) {
        node.textContent = translated[j];
      }
    });
  }

  // Translate placeholders too
  document.querySelectorAll('[placeholder]').forEach(async el => {
    const orig = el.dataset.origPlaceholder || el.getAttribute('placeholder');
    if (!el.dataset.origPlaceholder) el.dataset.origPlaceholder = orig;
    if (targetLang === 'en') {
      el.setAttribute('placeholder', orig);
    } else {
      const translated = await translateText(orig, targetLang);
      el.setAttribute('placeholder', translated);
    }
  });

  showTranslationLoader(false);
}

// ── Translation loader indicator ───────────────────────────
function showTranslationLoader(show) {
  let loader = document.getElementById('translationLoader');
  if (!loader) {
    loader = document.createElement('div');
    loader.id = 'translationLoader';
    loader.style.cssText = `
      position: fixed; top: 16px; right: 280px; z-index: 9999;
      background: var(--forest); color: #fff;
      padding: 8px 16px; border-radius: 20px;
      font-size: 12px; font-weight: 600;
      display: none; align-items: center; gap: 8px;
      box-shadow: 0 4px 16px rgba(26,58,10,0.3);
    `;
    loader.innerHTML = '<div style="width:10px;height:10px;border:2px solid rgba(255,255,255,.4);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite"></div> Translating...';
    document.body.appendChild(loader);
  }
  loader.style.display = show ? 'flex' : 'none';
}

// ── Init language system ────────────────────────────────────
function initLanguage() {
  document.querySelectorAll('#languageSwitcher').forEach(sel => {
    sel.value = currentLang;
    sel.addEventListener('change', async function () {
      const newLang = this.value;
      document.querySelectorAll('#languageSwitcher').forEach(s => s.value = newLang);
      currentLang = newLang;
      localStorage.setItem('yp_lang', newLang);
      await translatePage(newLang);
    });
  });

  // Auto-translate if saved language isn't English
  if (currentLang && currentLang !== 'en') {
    setTimeout(() => translatePage(currentLang), 800);
  }
}
