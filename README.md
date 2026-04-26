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
