import pandas as pd
from backend.data.dataset import load_dataset


# ==============================
# MAIN FUNCTION (DATASET-BASED)
# ==============================
def get_soil_data(lat=17.3850, lon=78.4867):

    try:
        # Load dataset
        X, y = load_dataset()

        # ==============================
        # EXTRACT SOIL FEATURES
        # ==============================
        N = X["Nitrogen_kg_ha"].mean()
        P = X["Phosphorus_kg_ha"].mean()
        K = X["Potassium_kg_ha"].mean()

        ph = X["Soil_pH"].mean()
        soc = X["Organic_Matter_Percent"].mean()
        moisture = X["Soil_Moisture_Percent"].mean()

        # Simulated texture (if not present)
        clay = 30
        sand = 40
        silt = 30

        # ==============================
        # CLASSIFICATION
        # ==============================
        if clay > 40:
            soil_type = "Clay"
        elif clay > 25:
            soil_type = "Clay Loam"
        elif sand > 70:
            soil_type = "Sandy"
        else:
            soil_type = "Loam"

        # Fertility
        avg = (N + P + K) / 3
        if avg > 80:
            fertility = "High"
        elif avg > 50:
            fertility = "Medium"
        else:
            fertility = "Low"

        return {
            "N": round(N, 2),
            "P": round(P, 2),
            "K": round(K, 2),
            "ph": round(ph, 2),
            "clay": clay,
            "sand": sand,
            "silt": silt,
            "soc": round(soc, 2),

            "soil_type": soil_type,
            "moisture": round(moisture, 2),
            "fertility": fertility
        }

    except Exception as e:
        print("⚠️ Soil Dataset Error:", e)

        # Fallback
        return {
            "N": 80,
            "P": 40,
            "K": 40,
            "ph": 6.8,
            "clay": 28,
            "sand": 42,
            "silt": 30,
            "soc": 8,
            "soil_type": "Loam",
            "moisture": 30,
            "fertility": "Medium"
        }