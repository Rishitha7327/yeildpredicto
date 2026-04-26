"""
Data Retrieval API Endpoints
Endpoints to fetch and process predictions from database
"""

from flask import Blueprint, request, jsonify, send_file
from backend.utils.data_processor import (
    get_all_predictions,
    get_predictions_dataframe,
    get_predictions_by_crop,
    get_predictions_by_location,
    get_predictions_by_date_range,
    get_statistics,
    get_crop_statistics,
    get_predictions_grouped_by_crop,
    get_top_yielding_predictions,
    get_high_confidence_predictions,
    export_to_csv,
    export_to_json,
    get_recent_predictions,
    get_yield_trends_by_crop
)
from datetime import datetime

data_bp = Blueprint("data", __name__)


# ==============================
# GET ALL DATA
# ==============================
@data_bp.route("/data/all", methods=["GET"])
def get_all_data():
    """Get all predictions"""
    try:
        predictions = get_all_predictions()
        return jsonify({
            "status": "success",
            "count": len(predictions),
            "data": predictions
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# GET BY CROP
# ==============================
@data_bp.route("/data/by-crop/<crop_name>", methods=["GET"])
def get_by_crop(crop_name):
    """Get predictions for specific crop"""
    try:
        predictions = get_predictions_by_crop(crop_name)
        return jsonify({
            "status": "success",
            "crop": crop_name,
            "count": len(predictions),
            "data": predictions
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# GET BY LOCATION
# ==============================
@data_bp.route("/data/by-location", methods=["GET"])
def get_by_location():
    """Get predictions near location
    Query params: lat, lon, radius_km (optional, default=10)
    """
    try:
        lat = request.args.get("lat", type=float)
        lon = request.args.get("lng", type=float)
        radius = request.args.get("radius_km", 10, type=float)
        
        if lat is None or lon is None:
            return jsonify({"status": "error", "message": "lat and lng required"}), 400
        
        predictions = get_predictions_by_location(lat, lon, radius)
        return jsonify({
            "status": "success",
            "location": {"lat": lat, "lon": lon},
            "radius_km": radius,
            "count": len(predictions),
            "data": predictions
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# GET BY DATE RANGE
# ==============================
@data_bp.route("/data/by-date", methods=["GET"])
def get_by_date():
    """Get predictions in date range
    Query params: start_date, end_date (format: YYYY-MM-DD)
    """
    try:
        start_date = request.args.get("start_date")
        end_date = request.args.get("end_date")
        
        if not start_date or not end_date:
            return jsonify({"status": "error", "message": "start_date and end_date required"}), 400
        
        predictions = get_predictions_by_date_range(start_date, end_date)
        return jsonify({
            "status": "success",
            "date_range": {"start": start_date, "end": end_date},
            "count": len(predictions),
            "data": predictions
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# STATISTICS
# ==============================
@data_bp.route("/data/statistics", methods=["GET"])
def get_stats():
    """Get overall statistics"""
    try:
        stats = get_statistics()
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@data_bp.route("/data/statistics/<crop_name>", methods=["GET"])
def get_crop_stats(crop_name):
    """Get statistics for specific crop"""
    try:
        stats = get_crop_statistics(crop_name)
        return jsonify({
            "status": "success",
            "statistics": stats
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# GROUPED DATA
# ==============================
@data_bp.route("/data/grouped-by-crop", methods=["GET"])
def get_grouped():
    """Get predictions grouped by crop"""
    try:
        grouped = get_predictions_grouped_by_crop()
        return jsonify({
            "status": "success",
            "grouped_data": grouped
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# TOP PREDICTIONS
# ==============================
@data_bp.route("/data/top-yields", methods=["GET"])
def get_top_yields():
    """Get top N highest yielding predictions"""
    try:
        n = request.args.get("n", 10, type=int)
        predictions = get_top_yielding_predictions(n)
        return jsonify({
            "status": "success",
            "top_n": n,
            "count": len(predictions),
            "data": predictions
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# HIGH CONFIDENCE PREDICTIONS
# ==============================
@data_bp.route("/data/high-confidence", methods=["GET"])
def get_confidence():
    """Get high confidence predictions"""
    try:
        min_conf = request.args.get("min_confidence", 0.85, type=float)
        n = request.args.get("n", 10, type=int)
        predictions = get_high_confidence_predictions(min_conf, n)
        return jsonify({
            "status": "success",
            "min_confidence": min_conf,
            "count": len(predictions),
            "data": predictions
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# RECENT PREDICTIONS
# ==============================
@data_bp.route("/data/recent", methods=["GET"])
def get_recent():
    """Get recent predictions (last N hours)"""
    try:
        hours = request.args.get("hours", 24, type=int)
        predictions = get_recent_predictions(hours)
        return jsonify({
            "status": "success",
            "hours": hours,
            "count": len(predictions),
            "data": predictions
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# TREND ANALYSIS
# ==============================
@data_bp.route("/data/trends/<crop_name>", methods=["GET"])
def get_trends(crop_name):
    """Get yield trends for specific crop"""
    try:
        days = request.args.get("days", 30, type=int)
        trends = get_yield_trends_by_crop(crop_name, days)
        return jsonify({
            "status": "success",
            "trends": trends
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# EXPORT DATA
# ==============================
@data_bp.route("/data/export-csv", methods=["GET"])
def export_csv():
    """Export all predictions to CSV"""
    try:
        filename = export_to_csv("/tmp/predictions_export.csv")
        return send_file(filename, as_attachment=True, download_name="predictions.csv"), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@data_bp.route("/data/export-json", methods=["GET"])
def export_json_endpoint():
    """Export all predictions to JSON"""
    try:
        filename = export_to_json("/tmp/predictions_export.json")
        return send_file(filename, as_attachment=True, download_name="predictions.json"), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


# ==============================
# DASHBOARD SUMMARY
# ==============================
@data_bp.route("/data/dashboard", methods=["GET"])
def get_dashboard():
    """Get dashboard summary"""
    try:
        stats = get_statistics()
        recent = get_recent_predictions(24)
        top_yields = get_top_yielding_predictions(5)
        
        return jsonify({
            "status": "success",
            "dashboard": {
                "overall_statistics": stats,
                "recent_predictions": recent,
                "top_yields": top_yields
            }
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
