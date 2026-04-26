/* ============================================================
   Yeildpredicto — js/ui.js
   Builds dynamic UI components: marquee, calendar, water chips,
   subcategory crop card grid
   ============================================================ */

// ── Subcategory crop card grid ─────────────────────────────
// Called by onCropTypeChange() in form.js
function buildSubCropGrid(catKey) {
  const crops = CROP_SUBCATEGORIES[catKey] || [];
  const grid  = document.getElementById('subCropGrid');
  const sel   = document.getElementById('subCropType');

  if (!grid || !sel) return;
  if (!crops.length) {
    grid.innerHTML = '';
    return;
  }

  // Update hidden select (used by form submission)
  sel.innerHTML = '<option value="">-- select specific crop --</option>' +
    crops.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

  // Build visual card grid
  grid.innerHTML = crops.map(c => `
    <div class="sub-crop-card" id="sc-${c.id}" onclick="selectSubCrop('${c.id}', '${catKey}')">
      <img class="sc-img" src="${c.img}" alt="${c.name}"
        onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200'"/>
      <div class="sc-body">
        <div class="sc-name">${c.name}</div>
        <div class="sc-yield">${c.yield} t/acre</div>
        <div class="sc-water ${c.waterNeed.toLowerCase()}">${c.waterNeed} water</div>
      </div>
    </div>`).join('');
}

// Called when user clicks a sub-crop card
function selectSubCrop(id, catKey) {
  // Remove active from all
  document.querySelectorAll('.sub-crop-card').forEach(c => c.classList.remove('active'));
  // Add active to selected
  document.getElementById('sc-' + id)?.classList.add('active');
  // Sync the hidden select
  const subSel = document.getElementById('subCropType');
  if (subSel) subSel.value = id;

  // Show quick info strip
  const crop = (CROP_SUBCATEGORIES[catKey] || []).find(c => c.id === id);
  const infoEl = document.getElementById('subCropInfo');
  if (crop && infoEl) {
    infoEl.innerHTML = `
      <span>🌾 <strong>${crop.name}</strong></span>
      <span>💧 ${crop.waterNeed} water</span>
      <span>📅 ${crop.duration}</span>
      <span>💰 ₹${crop.marketPrice.toLocaleString('en-IN')}/quintal</span>
      <span>🏅 ${crop.score}% match</span>`;
    infoEl.style.display = 'flex';
  }
}

// ── Override onCropTypeChange to also build the grid ────────
// (Extends the function defined in form.js)
if (document.getElementById('cropType') && document.getElementById('subCropWrap')) {
  window.onCropTypeChange = function () {
    const cropType = document.getElementById('cropType');
    const subWrap  = document.getElementById('subCropWrap');
    const infoEl   = document.getElementById('subCropInfo');
    const subSel   = document.getElementById('subCropType');
    if (!cropType || !subWrap || !subSel) return;

    const catKey = cropType.value;
    if (!catKey || catKey === 'suggest') {
      subWrap.style.display = 'none';
      if (infoEl) infoEl.style.display = 'none';
      return;
    }

    buildSubCropGrid(catKey);
    subWrap.style.display = 'block';
    if (infoEl) infoEl.style.display = 'none';
    // Reset selection
    subSel.value = '';
  };
}

// ── Marquee strip ──────────────────────────────────────────
// Water resource chips
function buildWaterChips() {
  const grid = document.getElementById('wGrid');
  if (!grid || typeof WATER_OPTIONS === 'undefined') return;

  grid.innerHTML = WATER_OPTIONS.map(item => `
    <button class="wc" type="button" data-water="${item.label}" onclick="toggleWaterSource('${item.label.replace(/'/g, "\\'")}')">
      <span class="wc-details">${item.detail || 'Available farm water source'}</span>
      <span class="wc-icon">${item.icon}</span>
      <span>${item.label}</span>
      <span class="dot" aria-hidden="true"></span>
    </button>
  `).join('');

  if (!selectedWater.size && WATER_OPTIONS[0]) toggleWaterSource(WATER_OPTIONS[0].label);
  else renderWaterTags();
}

function toggleWaterSource(label) {
  if (typeof selectedWater === 'undefined') return;
  if (selectedWater.has(label)) selectedWater.delete(label);
  else selectedWater.add(label);
  renderWaterTags();
}

function renderWaterTags() {
  const tags = document.getElementById('wTags');
  const warn = document.getElementById('wWarn');
  if (!tags || typeof selectedWater === 'undefined') return;

  document.querySelectorAll('.wc').forEach(card => {
    card.classList.toggle('sel', selectedWater.has(card.dataset.water));
  });

  tags.innerHTML = [...selectedWater].map(label => `
    <span class="wtag">${label}<span class="wtag-remove" onclick="toggleWaterSource('${label.replace(/'/g, "\\'")}')">x</span></span>
  `).join('');

  if (warn) warn.style.display = selectedWater.size ? 'none' : 'flex';
}
function buildMarquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  const track = document.getElementById('mtrack');
  if (!track) return;
  track.innerHTML = doubled.map(item => `
    <div class="mi">
      <img src="${item.img}" alt="${item.label}"
        onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400'"/>
      <div class="mi-label">${item.label}</div>
    </div>`).join('');
}

// ── Crop calendar ──────────────────────────────────────────
function buildCalendar() {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const grid = document.getElementById('calGrid');
  if (!grid) return;

  grid.innerHTML = Object.keys(CALENDAR_DATA).map(month => {
    const isCurrent = month === currentMonth;
    const data      = CALENDAR_DATA[month];
    const cropsHTML = data.crops.map((crop, i) => `
      <div class="cal-crop-item">
        <span class="cal-dot${i % 2 === 1 ? ' gold' : ''}"></span>
        ${crop}
      </div>`).join('');

    return `
      <div class="cal-card" style="${isCurrent ? 'border:2px solid var(--forest);' : ''}">
        <img class="cal-card-img" src="${data.img}" alt="${month}"
          onerror="this.src='https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300'"/>
        <div class="cal-card-body">
          <div class="cal-month-name">${month}${isCurrent ? ' 🌱' : ''}</div>
          ${cropsHTML}
        </div>
      </div>`;
  }).join('');

  document.querySelectorAll('.cal-filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.cal-filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ── Scroll fade-in observer ────────────────────────────────
function initFadeIn() {
  if (typeof IntersectionObserver === 'undefined') return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fi').forEach(el => observer.observe(el));
}

// ── Mobile menu toggle ─────────────────────────────────────
function toggleMenu() {
  const links  = document.querySelector('.nav-links');
  const right  = document.querySelector('.nav-right');
  if (!links || !right) return;
  const isOpen = links.style.display === 'flex';
  if (isOpen) {
    links.style.display = '';
    right.style.display = '';
  } else {
    links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:68px;left:0;right:0;background:rgba(253,246,227,0.98);padding:20px 6%;gap:16px;z-index:400;border-bottom:1px solid rgba(26,58,10,0.1);backdrop-filter:blur(12px);';
    right.style.cssText = 'display:flex;flex-direction:column;position:fixed;left:0;right:0;padding:0 6% 20px;background:rgba(253,246,227,0.98);z-index:400;gap:10px;top:220px;';
  }
}

// ── Navbar shadow on scroll ────────────────────────────────
function initNavScroll() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── AI Chat Widget & Speech Recognition ────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const btnOpen = document.getElementById('chatBtn');
  const widget = document.getElementById('chatWidget');
  if (!btnOpen || !widget) return;
  
  const btnClose = document.getElementById('chatClose');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const btnSend = document.getElementById('chatSendBtn');
  const btnMic = document.getElementById('chatMicBtn');
  
  // Toggle visibility
  btnOpen.addEventListener('click', () => widget.classList.add('open'));
  btnClose.addEventListener('click', () => widget.classList.remove('open'));
  
  function addMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${sender}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
  
  function aiReply(userText) {
    const lower = userText.toLowerCase();
    let reply = "I'm not sure about that. Could you ask me about crops, weather, or soil?";
    if (lower.includes('hello') || lower.includes('hi')) reply = 'Hello there! Are you looking for crop advice today?';
    else if (lower.includes('weather') || lower.includes('rain')) reply = 'I can see the weather locally using our API. On the predict page, you can see if rain is expected.';
    else if (lower.includes('wheat') || lower.includes('rice')) reply = 'Rice is best for Kharif season and heavy water, while Wheat is best for Rabi. I can run a prediction for you!';
    else if (lower.includes('ndvi') || lower.includes('image')) reply = 'NDVI uses satellite imagery to determine vegetation health. Head to prediction step 3 to test our simulated NDVI analyzer!';
    else if (lower.includes('pest') || lower.includes('disease')) reply = 'If you notice spots on leaves, consider applying a mild neem oil spray or identifying the specific pest using an agronomist service.';
    else if (lower.includes('भाषा') || lower.includes('hindi')) reply = 'नमस्ते! मैं आपकी कैसे मदद कर सकता हूँ? (I can speak Hindi too!)';
    
    setTimeout(() => {
      addMessage(reply, 'ai');
    }, 700);
  }
  
  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    aiReply(text);
  }
  
  btnSend.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
  
  // Web Speech API
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    // Set language based on dropdown if you want, defaulting here to en-US
    recognition.lang = 'en-US'; 
    
    recognition.onstart = function() {
      btnMic.classList.add('recording');
      chatInput.placeholder = 'Listening...';
    };
    
    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      chatInput.value = transcript;
    };
    
    recognition.onerror = function(event) {
      console.error('Speech error:', event.error);
      chatInput.placeholder = 'Speech error. Try again.';
    };
    
    recognition.onend = function() {
      btnMic.classList.remove('recording');
      chatInput.placeholder = 'Type your question...';
      if (chatInput.value) {
        handleSend();
      }
    };
    
    btnMic.addEventListener('click', () => {
      // update language dynamically from the global setting if possible
      const selectedLang = document.getElementById('languageSwitcher')?.value || 'en';
      // Simple map from our lang codes to SpeechRecognition codes
      const langMap = { 'en': 'en-IN', 'hi': 'hi-IN', 'te': 'te-IN', 'ta': 'ta-IN' };
      recognition.lang = langMap[selectedLang] || 'en-IN';
      
      if (btnMic.classList.contains('recording')) {
        recognition.stop();
      } else {
        recognition.start();
      }
    });
  } else {
    btnMic.title = 'Microphone not supported in this browser';
    btnMic.style.opacity = '0.5';
    btnMic.style.cursor = 'not-allowed';
  }
});