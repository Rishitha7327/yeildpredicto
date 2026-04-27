"""
app.py — Yeildpredicto Flask Application
Production-ready (Render compatible)
"""

import os
import sys
import atexit
import traceback

from flask import Flask, jsonify, render_template, send_from_directory
from flask_cors import CORS


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)


try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    print("dotenv not installed")

# ──────────────────────────────────────────────────────────
# Flask setup
# ──────────────────────────────────────────────────────────
STATIC_DIR = os.path.join(BASE_DIR, 'static')
TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')

app = Flask(__name__, static_folder=STATIC_DIR, template_folder=TEMPLATES_DIR)
CORS(app)

# ──────────────────────────────────────────────────────────
# Database init (safe)
# ──────────────────────────────────────────────────────────
try:
    from new import init_db, close_db
    init_db()
    print("Database connected successfully")
    atexit.register(close_db)
except Exception as e:
    print(f"DB init failed (continuing): {e}")

# ──────────────────────────────────────────────────────────
# ✅ FIX: Correct imports (Absolute paths)
# ──────────────────────────────────────────────────────────
try:
    from backend.routes.predict import predict_bp
    from backend.routes.translate import translate_bp
    from backend.routes.data import data_bp

    app.register_blueprint(predict_bp, url_prefix="/api")
    app.register_blueprint(translate_bp, url_prefix="/api")
    app.register_blueprint(data_bp, url_prefix="/api")

    print("Routes loaded successfully")

except ImportError as e:
    print(f"ImportError loading routes: {e}")
    # Fallback for local dev if backend is not in path correctly
    try:
        from routes.predict import predict_bp
        # ...
    except:
        traceback.print_exc()
except Exception as e:
    print("ERROR loading routes:", e)
    traceback.print_exc()

# ──────────────────────────────────────────────────────────
# Page routes
# ──────────────────────────────────────────────────────────
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict')
@app.route('/predict.html')
def predict():
    return render_template('predict.html')

@app.route('/calendar')
@app.route('/calendar.html')
def calendar():
    return render_template('calendar.html')

@app.route('/how')
@app.route('/how.html')
def how():
    return render_template('how.html')

@app.route('/tips')
@app.route('/tips.html')
def tips():
    return render_template('tips.html')

# ──────────────────────────────────────────────────────────
# Favicon
# ──────────────────────────────────────────────────────────
@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
        os.path.join(STATIC_DIR, 'images'),
        'favicon.svg',
        mimetype='image/svg+xml'
    )

# ──────────────────────────────────────────────────────────
# Health check (important for Render)
# ──────────────────────────────────────────────────────────
@app.route('/api/health')
def health():
    return jsonify({"status": "ok", "service": "Yeildpredicto"})

# ──────────────────────────────────────────────────────────
# Catch-all (SPA support)
# ──────────────────────────────────────────────────────────
@app.route('/<path:path>')
def catch_all(path):
    static_file = os.path.join(STATIC_DIR, path)

    if os.path.isfile(static_file):
        return send_from_directory(STATIC_DIR, path)

    return render_template('index.html')

# ──────────────────────────────────────────────────────────
# Global error handler
# ──────────────────────────────────────────────────────────
@app.errorhandler(Exception)
def handle_exception(e):
    print("ERROR:", str(e))
    traceback.print_exc()
    return jsonify({"error": str(e)}), 500

# ──────────────────────────────────────────────────────────
# Startup
# ──────────────────────────────────────────────────────────
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))   # ✅ FIX for Render
    debug_mode = os.environ.get("FLASK_DEBUG", "False").lower() == "true"

    print("\n" + "="*50)
    print("Yeildpredicto Server Starting")
    print(f"Port  : {port}")
    print(f"Debug : {debug_mode}")
    print("="*50 + "\n")

    print("Routes:")
    for rule in app.url_map.iter_rules():
        print(f"{rule.methods} {rule.rule}")

    app.run(host='0.0.0.0', port=port, debug=debug_mode)