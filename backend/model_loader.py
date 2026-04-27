"""
backend/model_loader.py
Singleton model loader — loads models once and caches them.
Routes import get_models() from here instead of from main.py.
"""
import os
import time

_general_model = None
_crop_models = None

RETRAIN_INTERVAL = 24 * 60 * 60  # 24 hours

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models/trained_model.pkl")


def _should_retrain():
    if not os.path.exists(MODEL_PATH):
        print("⚠️ No trained model found → training required")
        return True
    last_modified = os.path.getmtime(MODEL_PATH)
    return (time.time() - last_modified) > RETRAIN_INTERVAL


def get_models():
    global _general_model, _crop_models

    # Return cached models if already loaded
    if _general_model is not None and _crop_models is not None:
        return _general_model, _crop_models
    from backend.models.model import (
        train_model, train_crop_models,
        save_models, load_models
    ) 
    from dataset import load_dataset, load_dataset_by_crop

    if _should_retrain():
        print("🔄 Training models (first run or scheduled retrain)...")
        try:
            X, y = load_dataset()
            crop_data = load_dataset_by_crop()
            _general_model = train_model(X, y)
            _crop_models = train_crop_models(crop_data, _general_model)
            save_models(_general_model, _crop_models)
            print("✅ Models trained and saved")
        except FileNotFoundError as e:
            print(f"⚠️  Dataset file not found: {e}")
            print("⚠️  Using fallback mock models (predictions will be placeholder values)")
            _general_model, _crop_models = _fallback_models()
        except Exception as e:
            print(f"❌ Training failed: {e}")
            print("⚠️ Using fallback mock models")
            _general_model, _crop_models = _fallback_models()
    else:
        try:
            _general_model, _crop_models = load_models()
            print("✅ Models loaded from disk")
        except Exception as e:
            print(f"❌ Model load failed: {e}")
            _general_model, _crop_models = _fallback_models()

    return _general_model, _crop_models


def _fallback_models():
    """
    Returns simple mock models so the app works even without the dataset.
    Each 'model' has a predict() method that returns a plausible value.
    """
    import random

    class MockModel:
        def predict(self, X):
            return [round(random.uniform(1.5, 4.5), 2)]

    mock = {
        "models": {"rf": MockModel(), "gb": MockModel(), "xgb": MockModel()},
        "weights": {"rf": 0.33, "gb": 0.33, "xgb": 0.34},
        "crop_weights": {}
    }
    return mock, {}
