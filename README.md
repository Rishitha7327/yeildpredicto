# 🌾 Yeildpredicto — AI Crop Yield Predictor

AI-powered crop yield prediction using live weather, soil, and satellite data.

## 🚀 Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/yeildpredicto.git
cd yeildpredicto

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Copy and edit env file
cp .env.example .env
# Edit .env with your API keys

# 5. Run
python app.py
```

Open **http://localhost:5000** in your browser.

> **Note:** MySQL is optional. If it's not running, the app automatically uses SQLite.

## 📁 Project Structure

```
yeildpredicto/
├── app.py                        # Flask entry point — all routes
├── new.py                        # DB manager (MySQL + SQLite fallback)
├── requirements.txt
├── Procfile                      # Deploy on Render/Heroku
├── .env                          # Your API keys (not committed)
├── .env.example                  # Template
│
├── backend/
│   ├── model_loader.py           # Loads/caches ML models
│   ├── routes/
│   │   ├── predict.py            # POST /api/predict
│   │   ├── translate.py          # POST /api/utils/translate
│   │   └── data.py               # GET  /api/data/...
│   ├── services/
│   │   ├── weather.py            # OpenWeatherMap API
│   │   ├── soil.py               # Soil data from dataset
│   │   ├── agriculture.py        # Agromonitoring API
│   │   ├── satellite.py          # NASA POWER API
│   │   └── water.py              # Water score logic
│   ├── models/
│   │   └── model.py              # RandomForest + XGBoost ensemble
│   ├── data/
│   │   └── dataset.py            # Dataset loader + feature columns
│   └── utils/
│       ├── map.py                # Geocoding (OpenCage)
│       └── data_processor.py     # DB query helpers
│
├── templates/
│   ├── index.html
│   ├── predict.html
│   ├── calendar.html
│   ├── how.html
│   └── tips.html
│
└── static/
    ├── css/style.css
    ├── js/
    │   ├── sidebar.js
    │   ├── data.js
    │   ├── form.js
    │   ├── ui.js
    │   ├── lang.js
    │   └── main.js
    └── images/
```

## 🤖 Machine Learning Model

### Model Architecture
The crop yield prediction system uses an **ensemble learning approach** combining multiple machine learning algorithms for maximum accuracy and robustness.

#### Algorithms Used
- **Random Forest Regressor**
  - 100+ decision trees
  - Captures non-linear relationships
  - Handles feature interactions well
  - Good at generalizing across different crop types

- **XGBoost (Gradient Boosting)**
  - Sequential tree boosting
  - Better handling of outliers
  - Superior performance on structured data
  - Reduces prediction variance

- **Ensemble Strategy**
  - Weighted averaging of both models
  - Combines strengths of both algorithms
  - More stable predictions
  - Better performance than individual models

### Input Features

The model uses **15+ carefully selected features** from multiple data sources:

#### Weather Features (Real-time from OpenWeatherMap API)
- Temperature (min, max, average)
- Humidity levels
- Rainfall/Precipitation
- Wind speed
- Cloud coverage
- Atmospheric pressure

#### Soil Features (From dataset analysis)
- pH level
- Nitrogen content (N)
- Phosphorus content (P)
- Potassium content (K)
- Soil texture classification
- Soil moisture

#### Satellite/Agricultural Features (From NASA POWER API & Agromonitoring)
- Solar radiation
- NDVI (Normalized Difference Vegetation Index)
- Growing Degree Days (GDD)
- Crop stage/phenology

#### Geographic & Crop Features
- Latitude & Longitude
- Crop type
- Planting season
- Days since planting

### Model Training

- **Dataset:** 59+ crop types from across India
- **Training Data:** Historical yield records with weather and soil conditions
- **Feature Engineering:** Automated data scaling, encoding, and normalization
- **Validation:** Cross-validation to prevent overfitting
- **Model Persistence:** Trained models saved as `.pkl` files for fast inference

### Prediction Output

The model provides:
```json
{
  "predicted_yield": "45.2 quintals/hectare",
  "confidence_level": "High (85%)",
  "factors": {
    "positive": ["Optimal temperature", "Good rainfall"],
    "concerns": ["Low soil NPK", "High humidity"]
  },
  "recommendations": ["Increase irrigation", "Apply nitrogen fertilizer"]
}
```

---

## 📊 Data Visualizations & Graphs

The platform provides multiple interactive graphs and charts to help farmers understand yield predictions and trends.

### Dashboard Visualizations

#### 1. **Yield Trend Graph** 📈
- **Type:** Line Chart with Multiple Series
- **Shows:** Historical yield predictions over time
- **Time Range:** Last 30/90/180 days (selectable)
- **Features:** 
  - Compare multiple crops simultaneously
  - Hover tooltips with exact values and dates
  - Zoom and pan functionality
  - Export as PNG
- **Use Case:** Track yield performance and identify seasonal patterns
- **Sample Data:**
  ```
  Jan: 42.5 qt/ha → Feb: 44.8 qt/ha → Mar: 48.2 qt/ha → Apr: 51.6 qt/ha
  ```

#### 2. **Crop Yield Comparison Chart** 📊
- **Type:** Bar Chart (Horizontal or Vertical)
- **Shows:** Side-by-side yield comparison across different crops
- **Sorted By:** Best to worst performing crops
- **Colors:** Gradient from green (high yield) to orange (low yield)
- **Helps identify:** Which crops perform best in your region
- **Data Source:** Real predictions from your farm records
- **Example:**
  ```
  Wheat:      48.2 qt/ha ████████████████████
  Rice:       52.5 qt/ha ████████████████████████
  Maize:      38.7 qt/ha ████████████████
  Soybean:    35.2 qt/ha ███████████████
  Cotton:     28.9 qt/ha ███████████
  ```

#### 3. **Weather Impact Analysis** 🌦️
- **Type:** Scatter Plot + Trend Line
- **Shows:** Relationship between weather factors and yield predictions
- **Multiple Views:**
  - **Rainfall vs Yield:** Positive correlation visualization
  - **Temperature vs Yield:** Optimal temperature zone highlighted
  - **Humidity vs Yield:** Shows humidity sweet spot
  - **Wind Speed vs Yield:** Impact on crop health
- **Interactive Features:**
  - Click points to see detailed record
  - Fit different trend lines (linear, polynomial, exponential)
  - R² score shows correlation strength
- **Insight Value:** Understand which weather factors affect your specific crop most

#### 4. **Soil Nutrients Heatmap** 🌱
- **Type:** Color-coded Heatmap/Grid
- **Shows:** NPK (Nitrogen, Phosphorus, Potassium) levels across your fields
- **Color Coding:** 
  - 🟢 **Green** = Optimal (75-100%)
  - 🟡 **Yellow** = Moderate (50-75%)
  - 🟠 **Orange** = Low (25-50%)
  - 🔴 **Red** = Deficient (<25%)
- **Data Layout:**
  ```
  Field Layout:
  [GREEN]  [YELLOW] [RED]
  [YELLOW] [GREEN]  [YELLOW]
  [RED]    [YELLOW] [GREEN]
  ```
- **Use Case:** Identify specific areas needing fertilizer application
- **Export:** Download fertilizer recommendation map

#### 5. **Geographic Map View** 🗺️
- **Type:** Interactive Map with Markers & Clustering
- **Technology:** Leaflet.js + OpenStreetMap
- **Shows:** 
  - Your farm location (highlighted)
  - Nearby farms with predictions
  - Weather stations
  - Soil sampling locations
- **Features:**
  - OpenCage geocoding for address search
  - Zoom in/out for different scales
  - Click markers for yield details
  - Heatmap overlay showing yield zones
  - Basemap options (satellite, terrain, streets)
- **Sample Display:**
  ```
  Marker Colors:
  🟢 Green  = High Yield (>50 qt/ha)
  🟡 Yellow = Medium Yield (30-50 qt/ha)
  🔴 Red    = Low Yield (<30 qt/ha)
  ```

#### 6. **Seasonal Calendar** 📅
- **Type:** Calendar Heatmap (One year view)
- **Shows:** Best planting dates for each crop by color intensity
- **Color Intensity:** Darker = Higher yield potential
- **Layout:** 
  ```
  January        February       March
  Mo Tu We Th    Mo Tu We Th    Mo Tu We Th
  ██ ██ ██ ██    ██ ██ ██ ██    ▓▓ ▓▓ ▓▓ ▓▓
  ██ ██ ░░ ░░    ▓▓ ▓▓ ██ ██    ██ ██ ██ ██
  ```
- **Tooltip:** Hover to see yield estimate for that date
- **Benefit:** Plan planting schedule 3-6 months in advance
- **Features:**
  - Select multiple crops to compare
  - View historical accuracy
  - Set reminders for optimal planting dates

#### 7. **Model Confidence Gauge** 🎯
- **Type:** Speedometer/Gauge Chart
- **Shows:** Confidence level of current predictions (0-100%)
- **Visual Representation:**
  ```
  ┌─────────────────────┐
  │    LOW    │ HIGH    │
  │  0   ↓    │    ↓100 │
  │           ⚪        │ ← 87% Confidence
  │    ✓ GOOD          │
  └─────────────────────┘
  ```
- **Color Zones:**
  - 🔴 Red (0-33%): Low confidence, use with caution
  - 🟡 Yellow (33-66%): Moderate confidence, consider other factors
  - 🟢 Green (66-100%): High confidence, reliable prediction
- **Factors affecting confidence:**
  - Data quality & completeness
  - Historical accuracy on similar conditions
  - Feature data availability
  - Model training robustness
- **Confidence Breakdown Panel:**
  ```
  Data Completeness:    ████████░░ 80%
  Historical Match:     ██████████ 95%
  Feature Quality:      ███████░░░ 70%
  Overall Confidence:   ████████░░ 87%
  ```

#### 8. **Feature Importance Chart** 📋
- **Type:** Horizontal Bar Chart (Sorted)
- **Shows:** Which factors most influence yield predictions for YOUR crop
- **Display Format:**
  ```
  Feature Importance Breakdown:
  1. Rainfall           ████████████████░░ 28%
  2. Temperature       ██████████░░░░░░░░ 22%
  3. Soil NPK         ███████████░░░░░░░ 19%
  4. Humidity         ██████░░░░░░░░░░░░ 12%
  5. Solar Radiation  █████░░░░░░░░░░░░░ 10%
  6. Previous Yield   ███░░░░░░░░░░░░░░░ 6%
  7. Wind Speed       ██░░░░░░░░░░░░░░░░ 3%
  ```
- **Typical Top Factors by Crop:**
  - **Rice:** Rainfall (35%), Temperature (25%), Humidity (20%)
  - **Wheat:** Temperature (30%), Rainfall (25%), Soil NPK (20%)
  - **Cotton:** Rainfall (30%), Temperature (25%), Solar Radiation (20%)
  - **Maize:** Rainfall (32%), Temperature (28%), Soil NPK (18%)
- **Interactive:** Click each bar to see correlation strength details

#### 9. **Prediction Accuracy Chart** ✔️
- **Type:** Area Chart
- **Shows:** Model's prediction accuracy over time
- **Compares:** Predicted yield vs. Actual yield
- **Display:**
  ```
  Actual Yield    ╱╲      ╱╲
                 ╱  ╲    ╱  ╲
  Predicted ────╱────╲──╱────╲─── (Follows closely)
                     ╲╱
  
  Accuracy: 92% (Mean Absolute Error: ±3.2 qt/ha)
  ```
- **Metrics Shown:**
  - R² Score (Coefficient of Determination)
  - RMSE (Root Mean Square Error)
  - MAE (Mean Absolute Error)
  - MAPE (Mean Absolute Percentage Error)
- **Use Case:** Assess model reliability for your region

#### 10. **Comparative Analysis - Year over Year** 📊
- **Type:** Multi-Series Line Chart
- **Shows:** Yield trends across multiple years
- **Example:**
  ```
  2022 ──┬─────────────────────  Current Year (This Season)
         │
  2021 ──┼─────────────────────  Last Year (Historical)
         │
  2020 ──┴─────────────────────  2 Years Ago (Reference)
  ```
- **Features:**
  - Overlay multiple years for comparison
  - Highlight anomalies and deviations
  - Identify improving or declining trends
  - Account for seasonal variations

### Chart Technologies & Libraries

**Frontend Charting:**
- **Chart.js** - Simple, lightweight charts (line, bar, pie)
- **Plotly.js** - Advanced interactive visualizations
- **Leaflet.js** - Interactive maps and geospatial data
- **D3.js** (optional) - Custom advanced visualizations
- **Canvas rendering** - Smooth performance with large datasets

**Backend Support:**
- **Backend:** `data.js` route provides real-time data
- **Caching:** MongoDB/SQLite caches frequently accessed data
- **Aggregation:** Database queries compute statistics efficiently

### Real-time Data Updates

- **Auto-refresh:** Charts update every 30 minutes with new weather data
- **Manual refresh:** Click "Refresh" button for instant update
- **Live prediction:** New predictions appear immediately on charts
- **Historical sync:** Database maintains complete prediction history
- **Data persistence:** All charts exportable as CSV/JSON

### Export & Reporting Features

- **Download Options:**
  - Save individual charts as PNG/SVG
  - Export data as CSV
  - Generate PDF farm report with all charts
- **Sharing:**
  - Download charts for presentation to advisors
  - Email reports to stakeholders
  - Print-friendly chart layouts
- **Report Structure:**
  ```
  Farm Report - April 2026
  ├── Summary Dashboard
  ├── Yield Predictions (all crops)
  ├── Weather Analysis
  ├── Soil Nutrient Status
  ├── Seasonal Planning Calendar
  ├── Confidence & Accuracy Metrics
  └── Recommendations
  ```

### Mobile-Responsive Design

- **Responsive:** Charts adapt to phone, tablet, and desktop screens
- **Touch:** Pinch to zoom, swipe to pan
- **Performance:** Optimized for mobile networks
- **Offline:** Charts display cached data even without internet

---

## 🔑 API Keys needed (.env)

| Key | Where to get |
|-----|--------------|
| `OPENWEATHER_API_KEY` | [openweathermap.org](https://openweathermap.org/api) |
| `OPENCAGE_API_KEY` | [opencagedata.com](https://opencagedata.com) |
| `AGROMONITORING_API_KEY` | [agromonitoring.com](https://agromonitoring.com) |

All APIs have free tiers. The app works with fallback data even without keys.

## 🌐 Deploy on Render

1. Push to GitHub (dataset `.xlsx` and `.pkl` model files are gitignored — models retrain on first run)
2. Render → New Web Service → Connect repo
3. **Build Command:** `pip install -r requirements.txt`
4. **Start Command:** `gunicorn app:app`
5. Add env vars in Render dashboard

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/predict` | Crop yield prediction |
| POST | `/api/utils/translate` | Text translation |
| POST | `/api/utils/translate-batch` | Batch translation |
| GET | `/api/data/all` | All predictions from DB |
| GET | `/api/data/by-crop/<name>` | Filter by crop |
| GET | `/api/data/statistics` | Aggregate stats |
| GET | `/api/data/recent` | Last 24h predictions |
| GET | `/api/health` | Health check |
| POST | `/api/chat` | Grok AI chat for agriculture questions |

## 💬 Grok AI Chatbot

The platform now includes a **floating Grok chatbot** available on every page that helps farmers with agriculture-related questions.

### Features
- 🤖 AI-powered answers about crop yields, farming techniques, and agriculture
- 📱 Floating widget available on all pages
- 💾 Chat history saved locally in browser
- 🔄 Real-time responses using Grok API
- 📲 Badge notification for unread messages

### Setup Grok Chatbot

1. **Get a Grok API Key:**
   - Visit [console.x.ai](https://console.x.ai)
   - Create an account and generate an API key

2. **Add to .env file:**
   ```bash
   GROK_API_KEY=your_api_key_here
   ```

3. **Install dependencies:**
   The `openai` library is already in `requirements.txt` for Grok API compatibility.

4. **The chatbot will automatically:**
   - Appear as a floating icon on all pages (bottom-right)
   - Show on home, prediction, calendar, tips, and how-it-works pages
   - Store conversation history locally
   - Work without requiring user authentication
## 🔧 Troubleshooting

### Deploy fails with "Exited with status 1"

**Problem:** Build succeeds but app crashes on startup.

**Cause:** The dataset file (`dataset/all_india_crop_dataset_59crops.xlsx`) is missing on Render. This file is gitignored because it's too large to commit.

**Solution:**
1. The app now has a fallback mechanism — it will start even without the dataset
2. Models will use placeholder predictions until trained
3. **To train real models:** Upload your dataset file locally, run `python app.py` to train, then commit the `backend/models/trained_model.pkl` file
4. Or provide the dataset via a private storage service and download it during the build

**Option A: Use pre-trained model (Recommended)**
```bash
# Local: train model first
python app.py  # This trains on your dataset

# Then commit the trained model
git add backend/models/trained_model.pkl
git commit -m "Add trained model"
git push
```

**Option B: Download dataset during deploy**
Add to `Procfile`:
```
web: curl -o dataset/all_india_crop_dataset_59crops.xlsx https://your-storage-url/dataset.xlsx && gunicorn app:app
```

### API key errors

If you see warnings about missing API keys in logs, the app still works with fallback data. Add keys in Render dashboard Settings → Environment Variables.

### Database connection errors

The app uses SQLite by default on Render. To use MySQL:
```bash
# In Render dashboard, add:
DB_HOST=your-mysql-host.com
DB_USER=username
DB_PASSWORD=password
DB_NAME=yeildpredicto
```

If MySQL isn't available, SQLite is used automatically.

## 📜 License

MIT — Feel free to use for personal or commercial projects!

## 🤝 Contributing

Pull requests welcome! Please follow the existing code style.