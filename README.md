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