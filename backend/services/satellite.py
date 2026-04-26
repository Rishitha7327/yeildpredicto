import requests
from datetime import datetime, timedelta


# ==============================
# GET DATE RANGE
# ==============================
def get_date_range():
    end_date = datetime.today()
    start_date = end_date - timedelta(days=7)

    return start_date.strftime("%Y%m%d"), end_date.strftime("%Y%m%d")


# ==============================
# CLEAN INVALID VALUES 🔥
# ==============================
def clean_values(data_dict):
    """
    Remove invalid NASA values (-999 etc.)
    """
    return [v for v in data_dict.values() if v is not None and v > -100]


# ==============================
# MAIN FUNCTION
# ==============================
def get_satellite_data(lat=17.3850, lon=78.4867):

    start, end = get_date_range()

    url = (
        f"https://power.larc.nasa.gov/api/temporal/daily/point"
        f"?start={start}&end={end}"
        f"&latitude={lat}&longitude={lon}"
        f"&community=ag"
        f"&parameters=T2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN"
        f"&header=true"
    )

    try:
        res = requests.get(url, timeout=10)
        res.raise_for_status()
        data = res.json()

        params = data.get("properties", {}).get("parameter", {})

        # Extract raw data
        temp_data = params.get("T2M", {})
        rain_data = params.get("PRECTOT", {})
        solar_data = params.get("ALLSKY_SFC_SW_DWN", {})

        # 🔥 CLEAN INVALID VALUES
        temp_vals = clean_values(temp_data)
        rain_vals = clean_values(rain_data)
        solar_vals = clean_values(solar_data)

        # Safe averages
        avg_temp = sum(temp_vals) / len(temp_vals) if temp_vals else 28
        avg_rain = sum(rain_vals) / len(rain_vals) if rain_vals else 5
        avg_solar = sum(solar_vals) / len(solar_vals) if solar_vals else 15

        # ==============================
        # NDVI-LIKE SCORE 🔥
        # ==============================
        ndvi_score = (avg_rain / 10 + avg_solar / 20) / 2
        ndvi_score = round(min(max(ndvi_score, 0.2), 0.9), 2)

        # Classification
        if ndvi_score > 0.7:
            ndvi_status = "Very Healthy"
        elif ndvi_score > 0.5:
            ndvi_status = "Healthy"
        elif ndvi_score > 0.3:
            ndvi_status = "Moderate"
        else:
            ndvi_status = "Poor"

        return {
            "avg_temperature": round(avg_temp, 2),
            "avg_rainfall": round(avg_rain, 2),
            "solar_radiation": round(avg_solar, 2),

            "ndvi_score": ndvi_score,
            "ndvi_status": ndvi_status
        }

    except Exception as e:
        print("⚠️ NASA API Error:", e)

        return {
            "avg_temperature": 28,
            "avg_rainfall": 5,
            "solar_radiation": 15,
            "ndvi_score": 0.5,
            "ndvi_status": "Moderate"
        }