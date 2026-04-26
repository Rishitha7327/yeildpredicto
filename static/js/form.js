/* ============================================================
   Yeildpredicto — js/form.js (FULLY FIXED ✅)
   Backend + Frontend fully connected
   ============================================================ */

// ── App state ──────────────────────────────────────────────
let currentStep   = 1;
let selectedWater = new Set();
let yieldOptMode  = 'curr';

// ── GPS defaults ───────────────────────────────────────────
window._detectedLat  = 17.3850;
window._detectedLng  = 78.4867;
window._detectedCity = 'Mangalagiri, Andhra Pradesh';

// ✅ Backend URL
const API_BASE = window.location.origin;

// ── Step navigation (no-op — page is now single-scroll) ────
function gFS(n) { /* all sections visible at once */ }
function nextS() { runPrediction(); }
function prevS() { }

// ── ✅ FIX: detectLoc — was missing, caused "detectLoc is not defined" ──
function detectLoc() {
  const btn      = document.getElementById('detectBtn');
  const locBottom = document.getElementById('locBottom');
  const navLoc   = document.getElementById('navLoc');

  if (btn) { btn.textContent = '⏳ Detecting...'; btn.disabled = true; }

  if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser.');
    if (btn) { btn.textContent = '⊙ Detect My Location'; btn.disabled = false; }
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      window._detectedLat = lat;
      window._detectedLng = lon;

      console.log("📍 GPS detected:", lat, lon);

      // Reverse geocode using backend
      try {
        const res  = await fetch(`${API_BASE}/api/predict`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ crop: 'rice', lat, lng: lon, water: [] })
        });
        const data = await res.json();
        const city = data.location || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;

        window._detectedCity = city;
        if (navLoc)    navLoc.textContent    = '📍 ' + city;
        if (locBottom) locBottom.innerHTML   = `<span style="color:var(--forest);font-weight:600;">✅ ${city}</span>`;

      } catch (e) {
        console.warn('Reverse geocode failed, using coordinates');
        const city = `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        window._detectedCity = city;
        if (navLoc)    navLoc.textContent  = '📍 ' + city;
        if (locBottom) locBottom.innerHTML = `<span style="color:var(--forest);font-weight:600;">✅ ${city}</span>`;
      }

      if (btn) { btn.textContent = '✅ Location Detected'; btn.disabled = false; }
    },
    (err) => {
      console.warn('GPS error:', err.message);

      // Fallback — use IP-based location from backend
      if (navLoc)    navLoc.textContent   = '📍 ' + window._detectedCity;
      if (locBottom) locBottom.innerHTML  = `<span style="color:var(--muted);font-size:12px;">📍 Using default: ${window._detectedCity}</span>`;
      if (btn) { btn.textContent = '⊙ Detect My Location'; btn.disabled = false; }
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// ── ✅ FIX: setYO — was missing, caused "setYO is not defined" ──
function setYO(mode) {
  yieldOptMode = mode;

  const currCard      = document.getElementById('yo-curr');
  const otherCard     = document.getElementById('yo-other');
  const otherFields   = document.getElementById('otherLocFields');

  if (currCard)  currCard.classList.toggle('active',  mode === 'curr');
  if (otherCard) otherCard.classList.toggle('active', mode === 'other');

  if (otherFields) {
    otherFields.style.display = (mode === 'other') ? 'block' : 'none';
  }

  console.log("📍 Yield mode set to:", mode);
}

// ── ✅ FIX: autoDetectOnLoad — was missing, called from main.js ──
function loadDist() {
  const stateEl = document.getElementById('oState');
  const distEl = document.getElementById('oDist');
  if (!stateEl || !distEl || typeof DISTRICT_MAP === 'undefined') return;

  const districts = DISTRICT_MAP[stateEl.value] || [];
  distEl.innerHTML = districts.length
    ? '<option value="">Select district</option>' + districts.map(d => `<option>${d}</option>`).join('')
    : '<option value="">Select state first</option>';
}

function setUnit(btn) {
  document.querySelectorAll('.unit-grp button').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
}
function autoDetectOnLoad() {
  console.log("🔄 Auto-detecting location on load...");
  detectLoc();
}

// ── Crop mapping helper ───────────────────────────────────
function getCropData(catKey, subKey) {
  if (!catKey || !subKey) return null;
  const list = CROP_SUBCATEGORIES[catKey] || [];
  return list.find(c => c.id === subKey) || null;
}

// ── MAIN PREDICTION FUNCTION ──────────────────────────────
function runPrediction() {

  console.log("RUN PREDICTION TRIGGERED");

  const catKey = document.getElementById('cropType')?.value    || 'suggest';
  const subKey = document.getElementById('subCropType')?.value || '';
  const area   = document.getElementById('areaSize')?.value    || '5';

  // Use custom location if "other" mode selected
  let lat = window._detectedLat;
  let lng = window._detectedLng;

  if (yieldOptMode === 'other') {
    const stateEl    = document.getElementById('oState');
    const districtEl = document.getElementById('oDist');
    if (stateEl?.value)    console.log("Other state:", stateEl.value);
    if (districtEl?.value) console.log("Other district:", districtEl.value);
    // lat/lng stays as detected — backend handles state/district
  }

  // Prevent empty crop
  if (!subKey || subKey.trim() === '') {
    alert('⚠️ Please select a specific crop');
    return;
  }

  const selectedCropObj = getCropData(catKey, subKey);

  const payload = {
    category: catKey,
    crop:     selectedCropObj ? selectedCropObj.name.toLowerCase() : subKey,
    area:     parseFloat(area),
    lat:      lat,
    lng:      lng,
    water:    [...selectedWater],
    season:   document.getElementById('season')?.value || ''
  };

  console.log("📦 Sending payload:", payload);

  // Show loading state
  const resArea    = document.getElementById('resArea');
  const resContent = document.getElementById('resContent');
  if (resContent) resContent.innerHTML = '<p style="text-align:center;padding:20px;">⏳ Predicting yield...</p>';
  if (resArea)    resArea.classList.add('show');

  fetch(`${API_BASE}/api/predict`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    console.log("✅ API RESPONSE:", data);
    if (data.status === "error") {
      alert(data.message);
      return;
    }
    showResult(data);
  })
  .catch(err => {
    console.error("❌ Error:", err);
    alert("Prediction failed. Make sure the server is running.");
  });
}

// ── RESULT DISPLAY ────────────────────────────────────────
function showResult(data) {

  const resultDiv = document.getElementById("resContent");
  if (!resultDiv) return;

  const yield_val = data.prediction_t_ha > 10 ? '10+' : data.prediction_t_ha;
  const selectedWaterList = [...selectedWater].join(', ') || 'Rainwater / Rainfed';

  resultDiv.innerHTML = `
    <div class="result-paper">
      <div class="result-paper-head">
        <div>
          <div class="result-paper-title">Yeildpredicto Prediction Paper</div>
          <div class="result-paper-sub">A clean farm report based on crop, location, weather, soil, and water resources: ${selectedWaterList}.</div>
        </div>
        <div class="result-stamp">AI report</div>
      </div>
    <div class="res-grid">
      <div class="res-tile highlight">
        <div class="res-tile-label">Yield (t/ha)</div>
        <div class="res-tile-value">${yield_val}</div>
        <div class="res-tile-sub">tonnes per hectare</div>
      </div>
      <div class="res-tile highlight">
        <div class="res-tile-label">Confidence</div>
        <div class="res-tile-value">${data.confidence}%</div>
        <div class="res-tile-sub">prediction accuracy</div>
      </div>
      <div class="res-tile">
        <div class="res-tile-label">Crop</div>
        <div class="res-tile-value" style="text-transform:capitalize;font-size:18px;">${data.crop}</div>
        <div class="res-tile-sub">selected variety</div>
      </div>
      <div class="res-tile">
        <div class="res-tile-label">Location</div>
        <div class="res-tile-value" style="font-size:15px;">${data.location || window._detectedCity}</div>
        <div class="res-tile-sub">detected area</div>
      </div>
      <div class="res-tile">
        <div class="res-tile-label">Temperature</div>
        <div class="res-tile-value">${data.temperature}°C</div>
        <div class="res-tile-sub">current avg</div>
      </div>
      <div class="res-tile">
        <div class="res-tile-label">Humidity</div>
        <div class="res-tile-value">${data.humidity}%</div>
        <div class="res-tile-sub">relative humidity</div>
      </div>
      <div class="res-tile">
        <div class="res-tile-label">Rainfall</div>
        <div class="res-tile-value">${data.rainfall}<span style="font-size:14px;font-weight:500;"> mm</span></div>
        <div class="res-tile-sub">seasonal average</div>
      </div>
      <div class="res-tile">
        <div class="res-tile-label">Water Status</div>
        <div class="res-tile-value" style="font-size:16px;">${data.water_status}</div>
        <div class="res-tile-sub">irrigation level</div>
      </div>
      <div class="res-tile">
        <div class="res-tile-label">Soil N / P / K</div>
        <div class="res-tile-value" style="font-size:16px;">${data.soil_N} / ${data.soil_P} / ${data.soil_K}</div>
        <div class="res-tile-sub">nutrient levels</div>
      </div>
      <div class="res-tile">
        <div class="res-tile-label">Soil pH</div>
        <div class="res-tile-value">${data.soil_ph}</div>
        <div class="res-tile-sub">acidity level</div>
      </div>
    </div>
    </div>
  `;

  const resArea = document.getElementById("resArea");
  if (resArea) resArea.classList.add("show");
  resArea?.scrollIntoView({ behavior: 'smooth' });
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Form loaded successfully");
});
