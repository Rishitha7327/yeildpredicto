import os
import requests

def get_location(city="Hyderabad"):
    API_KEY = "bdf347af35934b0083104db48a2d34c5"

    url = f"https://api.opencagedata.com/geocode/v1/json?q={city}&key={API_KEY}&limit=1&countrycode=in"

    try:
        res = requests.get(url, timeout=8)
        data = res.json()


        if "results" not in data or len(data["results"]) == 0:
            raise Exception("No location data found")

        loc       = data["results"][0]["geometry"]
        components = data["results"][0].get("components", {})

        return {
            "latitude":  loc.get("lat", 17.3850),
            "longitude": loc.get("lng", 78.4867),
            "city":      components.get("city") or components.get("town") or city,
            "state":     components.get("state", ""),
            "country":   components.get("country", "India"),
        }

    except Exception as e:
        print("Map API Error:", e)
        return {
            "latitude":  17.3850,
            "longitude": 78.4867,
            "city":      city,
            "state":     "Telangana",
            "country":   "India",
        }


def reverse_geocode(lat, lon):
    """Convert lat/lng back to a city/district name."""
    API_KEY = os.environ.get("OPENCAGE_API_KEY", "637c4e752bbf4061a4ae9c96b521f0e6")

    url = f"https://api.opencagedata.com/geocode/v1/json?q={lat}+{lon}&key={API_KEY}&limit=1"

    try:
        res = requests.get(url, timeout=8)
        data = res.json()

        if "results" not in data or len(data["results"]) == 0:
            raise Exception("Reverse geocode failed")

        components = data["results"][0].get("components", {})
        city  = components.get("city") or components.get("town") or components.get("village") or "Unknown"
        state = components.get("state", "")

        return f"{city}, {state}" if state else city

    except Exception as e:
        print("Reverse Geocode Error:", e)
        return "Your Location"