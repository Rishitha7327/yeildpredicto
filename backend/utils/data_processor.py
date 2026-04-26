"""
Data Retrieval & Processing Module
Retrieve and process predictions from MySQL database
"""

import pandas as pd
from datetime import datetime, timedelta
from new import get_db_connection


# ==============================
# RETRIEVE ALL PREDICTIONS
# ==============================
def get_all_predictions():
    """Fetch all predictions from database"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM predictions ORDER BY created_at DESC")
            predictions = cursor.fetchall()
            return predictions
    except Exception as e:
        print(f"❌ Error fetching predictions: {e}")
        return []


# ==============================
# RETRIEVE PREDICTIONS AS DATAFRAME
# ==============================
def get_predictions_dataframe():
    """Convert predictions to pandas DataFrame for analysis"""
    try:
        conn = get_db_connection()
        df = pd.read_sql("SELECT * FROM predictions ORDER BY created_at DESC", conn)
        return df
    except Exception as e:
        print(f"❌ Error converting to DataFrame: {e}")
        return pd.DataFrame()


# ==============================
# FILTER PREDICTIONS
# ==============================
def get_predictions_by_crop(crop_name):
    """Get predictions for specific crop"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM predictions WHERE crop = %s ORDER BY created_at DESC",
                (crop_name,)
            )
            return cursor.fetchall()
    except Exception as e:
        print(f"❌ Error filtering by crop: {e}")
        return []


def get_predictions_by_location(lat, lon, radius_km=10):
    """Get predictions near specific location (within radius in km)"""
    try:
        conn = get_db_connection()
        # Approximate: 1 degree = ~111 km
        degree_radius = radius_km / 111.0
        
        with conn.cursor() as cursor:
            sql = """
            SELECT * FROM predictions 
            WHERE latitude BETWEEN %s AND %s 
            AND longitude BETWEEN %s AND %s
            ORDER BY created_at DESC
            """
            cursor.execute(sql, (
                lat - degree_radius,
                lat + degree_radius,
                lon - degree_radius,
                lon + degree_radius
            ))
            return cursor.fetchall()
    except Exception as e:
        print(f"❌ Error filtering by location: {e}")
        return []


def get_predictions_by_date_range(start_date, end_date):
    """Get predictions within date range"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute(
                """SELECT * FROM predictions 
                   WHERE created_at BETWEEN %s AND %s 
                   ORDER BY created_at DESC""",
                (start_date, end_date)
            )
            return cursor.fetchall()
    except Exception as e:
        print(f"❌ Error filtering by date: {e}")
        return []


# ==============================
# STATISTICS & ANALYTICS
# ==============================
def get_statistics():
    """Get statistics from all predictions"""
    try:
        df = get_predictions_dataframe()
        
        if df.empty:
            print("⚠️  No predictions found in database")
            return {"status": "no_data", "message": "No predictions found in database"}
        
        stats = {
            "status": "success",
            "total_predictions": len(df),
            "average_yield": round(float(df['predicted_yield'].mean()), 2),
            "max_yield": round(float(df['predicted_yield'].max()), 2),
            "min_yield": round(float(df['predicted_yield'].min()), 2),
            "std_yield": round(float(df['predicted_yield'].std()), 2),
            "average_confidence": round(float(df['confidence'].mean()), 2),
            "unique_crops": int(df['crop'].nunique()),
            "average_temperature": round(float(df['temperature'].mean()), 2),
            "average_humidity": round(float(df['humidity'].mean()), 2),
            "average_rainfall": round(float(df['rainfall'].mean()), 2),
            "average_soil_moisture": round(float(df['soil_moisture'].mean()), 2),
            "average_soil_ph": round(float(df['soil_ph'].mean()), 2),
        }
        print("✅ Statistics calculated successfully")
        return stats
    except Exception as e:
        print(f"❌ Error calculating statistics: {e}")
        import traceback
        traceback.print_exc()
        return {"status": "error", "message": str(e)}


def get_crop_statistics(crop_name):
    """Get statistics for specific crop"""
    try:
        conn = get_db_connection()
        df = pd.read_sql(
            "SELECT * FROM predictions WHERE crop = %s",
            conn,
            params=(crop_name,)
        )
        
        if df.empty:
            return {"error": f"No predictions found for {crop_name}"}
        
        stats = {
            "crop": crop_name,
            "total_predictions": len(df),
            "average_yield": float(df['predicted_yield'].mean()),
            "max_yield": float(df['predicted_yield'].max()),
            "min_yield": float(df['predicted_yield'].min()),
            "std_yield": float(df['predicted_yield'].std()),
            "average_confidence": float(df['confidence'].mean()),
            "optimal_temperature": float(df['temperature'].mean()),
            "optimal_humidity": float(df['humidity'].mean()),
            "optimal_rainfall": float(df['rainfall'].mean()),
            "optimal_soil_ph": float(df['soil_ph'].mean()),
        }
        return stats
    except Exception as e:
        print(f"❌ Error calculating crop statistics: {e}")
        return {}


# ==============================
# GROUP & AGGREGATE
# ==============================
def get_predictions_grouped_by_crop():
    """Group predictions by crop with aggregate stats"""
    try:
        df = get_predictions_dataframe()
        
        if df.empty:
            return {}
        
        grouped = df.groupby('crop').agg({
            'predicted_yield': ['count', 'mean', 'max', 'min', 'std'],
            'confidence': 'mean',
            'temperature': 'mean',
            'humidity': 'mean',
            'rainfall': 'sum'
        }).round(2)
        
        return grouped.to_dict()
    except Exception as e:
        print(f"❌ Error grouping by crop: {e}")
        return {}


def get_top_yielding_predictions(n=10):
    """Get top N highest yielding predictions"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute(
                """SELECT * FROM predictions 
                   ORDER BY predicted_yield DESC LIMIT %s""",
                (n,)
            )
            return cursor.fetchall()
    except Exception as e:
        print(f"❌ Error fetching top predictions: {e}")
        return []


def get_high_confidence_predictions(min_confidence=0.85, n=10):
    """Get predictions with high confidence (default: 85%)"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute(
                """SELECT * FROM predictions 
                   WHERE confidence >= %s 
                   ORDER BY confidence DESC LIMIT %s""",
                (min_confidence, n)
            )
            return cursor.fetchall()
    except Exception as e:
        print(f"❌ Error fetching high confidence predictions: {e}")
        return []


# ==============================
# EXPORT DATA
# ==============================
def export_to_csv(filename="predictions_export.csv"):
    """Export all predictions to CSV"""
    try:
        df = get_predictions_dataframe()
        df.to_csv(filename, index=False)
        print(f"✅ Data exported to {filename}")
        return filename
    except Exception as e:
        print(f"❌ Error exporting to CSV: {e}")
        return None


def export_to_json(filename="predictions_export.json"):
    """Export all predictions to JSON"""
    try:
        df = get_predictions_dataframe()
        df.to_json(filename, orient='records', indent=2, default_handler=str)
        print(f"✅ Data exported to {filename}")
        return filename
    except Exception as e:
        print(f"❌ Error exporting to JSON: {e}")
        return None


# ==============================
# RECENT PREDICTIONS
# ==============================
def get_recent_predictions(hours=24):
    """Get predictions from last N hours"""
    try:
        time_threshold = datetime.now() - timedelta(hours=hours)
        conn = get_db_connection()
        
        with conn.cursor() as cursor:
            cursor.execute(
                """SELECT * FROM predictions 
                   WHERE created_at >= %s 
                   ORDER BY created_at DESC""",
                (time_threshold,)
            )
            return cursor.fetchall()
    except Exception as e:
        print(f"❌ Error fetching recent predictions: {e}")
        return []


# ==============================
# TREND ANALYSIS
# ==============================
def get_yield_trends_by_crop(crop_name, days=30):
    """Analyze yield trends over time for specific crop"""
    try:
        conn = get_db_connection()
        time_threshold = datetime.now() - timedelta(days=days)
        
        df = pd.read_sql(
            """SELECT created_at, predicted_yield, confidence 
               FROM predictions 
               WHERE crop = %s AND created_at >= %s 
               ORDER BY created_at""",
            conn,
            params=(crop_name, time_threshold)
        )
        
        if df.empty:
            return {"error": f"No data for {crop_name} in last {days} days"}
        
        df['created_at'] = pd.to_datetime(df['created_at'])
        df = df.set_index('created_at')
        
        # Calculate rolling averages
        rolling_7day = df['predicted_yield'].rolling(window=7).mean()
        rolling_14day = df['predicted_yield'].rolling(window=14).mean()
        
        return {
            "crop": crop_name,
            "period_days": days,
            "total_predictions": len(df),
            "average_yield": float(df['predicted_yield'].mean()),
            "trend": "increasing" if df['predicted_yield'].iloc[-1] > df['predicted_yield'].iloc[0] else "decreasing",
            "data": df.to_dict(orient='index')
        }
    except Exception as e:
        print(f"❌ Error analyzing trends: {e}")
        return {}
