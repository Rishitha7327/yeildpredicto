from flask import Blueprint, request, jsonify

from backend.services.weather import get_weather
from backend.services.soil import get_soil_data
from backend.services.agriculture import get_agriculture_data
from backend.services.satellite import get_satellite_data
from backend.services.water import get_water_data

from backend.utils.map import reverse_geocode

from backend.data.dataset import FEATURE_COLS
from backend.models.model import predict_yield

import pandas as pd
from new import get_db_connection, get_param_marker, get_now_fn

predict_bp = Blueprint("predict", __name__)

# ==============================
# DATABASE FUNCTIONS
# ==============================
def save_prediction_to_db(crop, lat, lon, prediction, confidence, weather_data, soil_data, location_name):
    """Save prediction results to database"""
    try:
        conn = get_db_connection()
        m = get_param_marker()
        now = get_now_fn()
        
        with conn.cursor() as cursor:
            # Example table structure - adjust according to your database schema
            sql = f"""
            INSERT INTO predictions
            (crop, latitude, longitude, predicted_yield, confidence,
             temperature, humidity, rainfall, soil_n, soil_p, soil_k, soil_ph, location_name, created_at)
            VALUES ({m}, {m}, {m}, {m}, {m}, {m}, {m}, {m}, {m}, {m}, {m}, {m}, {m}, {now})
            """
            cursor.execute(sql, (
                crop, lat, lon, prediction, confidence,
                weather_data.get("temperature"),
                weather_data.get("humidity"),
                weather_data.get("rainfall"),
                soil_data.get("N"),
                soil_data.get("P"),
                soil_data.get("K"),
                soil_data.get("ph"),
                location_name
            ))
            print(f"💾 Prediction saved to database for crop: {crop}")
    except Exception as e:
        print(f"❌ Database save error: {e}")
        raise

# ==============================
# PREDICT ROUTE
# ==============================
@predict_bp.route("/predict", methods=["POST"])
def predict():
    from backend.model_loader import get_models
    general_model, crop_models = get_models()

    try:
        data = request.json

        # ==============================
        # INPUT VALIDATION
        # ==============================
        crop = data.get("crop")
        lat = data.get("lat")
        lon = data.get("lng")
        water_sources = data.get("water", [])

        if not crop:
            return jsonify({"status": "error", "message": "Crop is required"}), 400

        if lat is None or lon is None:
            return jsonify({"status": "error", "message": "Location is required"}), 400

        # ==============================
        # FETCH LIVE DATA
        # ==============================
        weather = get_weather(lat=lat, lon=lon)
        soil = get_soil_data(lat=lat, lon=lon)
        agri = get_agriculture_data(crop_name=crop, lat=lat, lon=lon)
        sat = get_satellite_data(lat=lat, lon=lon)

        water = get_water_data(
            rainfall=weather["rainfall"],
            humidity=weather["humidity"],
            selected_sources=water_sources
        )

        location_name = reverse_geocode(lat, lon)

        # ==============================
        # PREPARE FEATURES
        # ==============================
        features = pd.DataFrame([[
            # Soil
            soil.get("N", 50),
            soil.get("P", 30),
            soil.get("K", 40),

            # Weather
            weather.get("temperature", 25),
            weather.get("humidity", 60),
            weather.get("rainfall", 100),

            # Soil extra
            soil.get("ph", 7),
            soil.get("soc", 1.5),
            soil.get("moisture", 20),

            # Satellite
            sat.get("solar_radiation", 15),

            # Agriculture
            agri.get("crop_duration", 120),
            agri.get("plant_population", 100000),

            # Encoded
            agri.get("state_encoded", 0),
            agri.get("season_encoded", 0),
            agri.get("year", 2024),
            soil.get("soil_type_encoded", 0),
            agri.get("crop_variety_encoded", 0)

        ]], columns=FEATURE_COLS)

        # ==============================
        # PREDICTION
        # ==============================
        result = predict_yield(
            crop_name=crop,
            features=features,
            crop_models=crop_models,
            general_model=general_model
        )
        # ==============================
        try:
            save_prediction_to_db(
                crop=crop,
                lat=lat,
                lon=lon,
                prediction=result["predicted_yield"],
                confidence=result["confidence"],
                weather_data=weather,
                soil_data=soil,
                location_name=location_name
            )
        except Exception as db_error:
            print(f"⚠️  Failed to save to database: {db_error}")
            # Continue with response even if DB save fails

        # ==============================
        # FINAL RESPONSE
        # ==============================
        return jsonify({
            "status": "success",
            "crop": result["crop"],
            "prediction_t_ha": result["predicted_yield"],
            "confidence": result["confidence"],
            "model_used": result["model_used"],

            "location": location_name,

            # Weather
            "temperature": weather["temperature"],
            "humidity": weather["humidity"],
            "rainfall": weather["rainfall"],

            # Soil
            "soil_N": soil["N"],
            "soil_P": soil["P"],
            "soil_K": soil["K"],
            "soil_ph": soil.get("ph"),

            # Water
            "water_status": water["water_status"],
            "irrigation_needed": water["irrigation_needed"],

            # Satellite
            "ndvi": sat.get("ndvi_score")
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500
    

@predict_bp.route('/test', methods=['GET'])
def test():
    return {"message": "API is working!"}    