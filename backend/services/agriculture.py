import os
import requests
from sklearn.preprocessing import LabelEncoder

# ==============================
# ADD YOUR API KEY HERE 🔥
# ==============================
AGROMONITORING_API_KEY = os.environ.get("AGRO_KEY", "e9a64c8104d598eec149dbcad1c5d210")

# Encoders for categorical values
STATE_ENCODER = LabelEncoder()
SEASON_ENCODER = LabelEncoder()
CROP_VARIETY_ENCODER = LabelEncoder()

# Sample values for encoding (should match training data)
STATE_ENCODER.fit(['Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Punjab', 'Uttar Pradesh', 'Rajasthan', 'Gujarat', 'Haryana', 'Madhya Pradesh', 'Tamil Nadu', 'West Bengal', 'Telangana', 'Odisha', 'Bihar'])
SEASON_ENCODER.fit(['Winter', 'Summer', 'Monsoon', 'Spring'])
CROP_VARIETY_ENCODER.fit(['HYV', 'Local', 'Hybrid', 'Certified'])

# ==============================
# MAIN FUNCTION
# ==============================
def get_agriculture_data(crop_name="rice", lat=17.3850, lon=78.4867):

    url = f"http://api.agromonitoring.com/agro/1.0/weather?lat={lat}&lon={lon}&appid={AGROMONITORING_API_KEY}"

    try:
        res = requests.get(url, timeout=8)
        data = res.json()

        if "main" not in data:
            raise Exception(data)

        temp = data["main"]["temp"]
        humidity = data["main"]["humidity"]

        # ==============================
        # CROP-SPECIFIC LOGIC 🔥
        # ==============================
        crop = crop_name.lower()

        if crop == "rice":
            duration = 120
            population = 150000
            variety = "HYV"
            state = "Andhra Pradesh"
            season = "Monsoon"
        elif crop == "wheat":
            duration = 110
            population = 120000
            variety = "Hybrid"
            state = "Punjab"
            season = "Winter"
        elif crop == "maize":
            duration = 100
            population = 90000
            variety = "Hybrid"
            state = "Karnataka"
            season = "Summer"
        else:
            duration = 120
            population = 100000
            variety = "Local"
            state = "Maharashtra"
            season = "Monsoon"

        # Encode categorical values
        try:
            state_encoded = int(STATE_ENCODER.transform([state])[0])
            season_encoded = int(SEASON_ENCODER.transform([season])[0])
            crop_variety_encoded = int(CROP_VARIETY_ENCODER.transform([variety])[0])
        except:
            state_encoded = 0
            season_encoded = 0
            crop_variety_encoded = 0

        return {
            "agri_temp": temp,
            "agri_humidity": humidity,
            "crop_duration": duration,
            "plant_population": population,
            "state": state,
            "season": season,
            "state_encoded": state_encoded,
            "season_encoded": season_encoded,
            "crop_variety_encoded": crop_variety_encoded
        }

    except Exception as e:
        print("⚠️ Agriculture API Error:", e)

        # Fallback
        return {
            "agri_temp": 28,
            "agri_humidity": 60,
            "crop_duration": 120,
            "plant_population": 100000,
            "state": "Maharashtra",
            "season": "Monsoon",
            "state_encoded": 3,
            "season_encoded": 2,
            "crop_variety_encoded": 1
        }