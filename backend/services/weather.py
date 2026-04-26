import requests
import os

# ==============================
# HELPER: ESTIMATE ANNUAL RAINFALL
# ==============================
def estimate_annual_rainfall(rain_1h, humidity):
    """
    Convert hourly rain to annual estimate.
    Uses better heuristic than simple multiplication.
    """
    if rain_1h > 0:
        return round(rain_1h * 1000, 1)
    else:
        # fallback using humidity relation
        if humidity > 80:
            return 1200
        elif humidity > 60:
            return 900
        elif humidity > 40:
            return 700
        else:
            return 500


# ==============================
# MAIN FUNCTION
# ==============================
def get_weather(lat=17.3850, lon=78.4867):
    OPENWEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY")

    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}&units=metric"

    try:
        res = requests.get(url, timeout=20)
        data = res.json()

        # ==============================
        # VALIDATION
        # ==============================
        if res.status_code != 200 or "main" not in data:
            raise Exception(f"Invalid weather response: {data}")

        temp = data["main"]["temp"]
        humidity = data["main"]["humidity"]

        rain_1h = data.get("rain", {}).get("1h", 0)

        rainfall = estimate_annual_rainfall(rain_1h, humidity)

        # ==============================
        # SEASON DETECTION 🔥
        # ==============================
        if temp > 30:
            season = "summer"
        elif temp < 20:
            season = "winter"
        else:
            season = "moderate"

        return {
            "temperature": temp,
            "humidity": humidity,
            "rainfall": rainfall,
            "season": season,
            "wind_speed": data.get("wind", {}).get("speed", 0),
            "description": data.get("weather", [{}])[0].get("description", ""),
            "city_name": data.get("name", "")
        }

    except Exception as e:
        print("⚠️ Weather API Error:", e)

        # ==============================
        # SMART FALLBACK 🔥
        # ==============================
        return {
            "temperature": 28,
            "humidity": 65,
            "rainfall": 850,
            "season": "moderate",
            "wind_speed": 3.0,
            "description": "fallback weather",
            "city_name": "Unknown"
        }