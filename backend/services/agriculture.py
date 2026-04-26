import os
import requests

# ==============================
# ADD YOUR API KEY HERE 🔥
# ==============================
AGROMONITORING_API_KEY = os.environ.get("AGRO_KEY", "e9a64c8104d598eec149dbcad1c5d210")

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
        elif crop == "wheat":
            duration = 110
            population = 120000
        elif crop == "maize":
            duration = 100
            population = 90000
        else:
            duration = 120
            population = 100000

        return {
            "agri_temp": temp,
            "agri_humidity": humidity,
            "crop_duration": duration,
            "plant_population": population
        }

    except Exception as e:
        print("⚠️ Agriculture API Error:", e)

        # fallback (only if API fails)
        return {
            "agri_temp": 28,
            "agri_humidity": 60,
            "crop_duration": 120,
            "plant_population": 100000
        }