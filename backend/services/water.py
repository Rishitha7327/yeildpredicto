# ==============================
# WATER ANALYSIS SERVICE 💧
# ==============================

def calculate_water_score(rainfall, humidity):
    """
    Convert rainfall + humidity into water score (0–100)
    """
    score = (rainfall / 1200) * 70 + (humidity / 100) * 30
    return round(min(score, 100), 2)


def classify_water(score):
    if score > 75:
        return "abundant"
    elif score > 50:
        return "adequate"
    elif score > 30:
        return "moderate"
    else:
        return "scarce"


def irrigation_advice(score, has_sources):
    if score < 50 and not has_sources:
        return "High irrigation needed"
    elif score < 50:
        return "Moderate irrigation needed"
    else:
        return "Low irrigation needed"


# ==============================
# MAIN FUNCTION
# ==============================
def get_water_data(rainfall=800, humidity=60, selected_sources=None, crop=None):

    selected = selected_sources or []

    # ==============================
    # SOURCE CHECK 🔥
    # ==============================
    has_borewell = any("borewell" in s.lower() for s in selected)
    has_canal    = any("canal" in s.lower() for s in selected)
    has_river    = any("river" in s.lower() or "stream" in s.lower() for s in selected)
    has_drip     = any("drip" in s.lower() for s in selected)

    has_sources = has_borewell or has_canal or has_river

    # ==============================
    # WATER SCORE 🔥
    # ==============================
    water_score = calculate_water_score(rainfall, humidity)

    # ==============================
    # ADJUST BASED ON SOURCES
    # ==============================
    if has_sources:
        water_score += 15

    if has_drip:
        water_score += 10  # efficient irrigation bonus

    water_score = min(water_score, 100)

    # ==============================
    # CLASSIFICATION
    # ==============================
    water_status = classify_water(water_score)

    # ==============================
    # IRRIGATION LOGIC
    # ==============================
    advice = irrigation_advice(water_score, has_sources)

    irrigation_needed = water_score < 60

    return {
        "water_status": water_status,
        "water_score": water_score,
        "irrigation_needed": irrigation_needed,
        "irrigation_advice": advice,

        "has_borewell": has_borewell,
        "has_canal": has_canal,
        "has_river": has_river,
        "has_drip": has_drip,
        "sources_count": len(selected)
    }