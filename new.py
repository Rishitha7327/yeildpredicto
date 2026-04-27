"""
new.py — Database manager for Yeildpredicto
Tries MySQL first (production), falls back to SQLite (local dev).
"""

import os

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

DB_HOST     = os.getenv("DB_HOST", "localhost")
DB_PORT     = int(os.getenv("DB_PORT", 3306))
DB_USER     = os.getenv("DB_USER", "root")
DB_PASSWORD = os.getenv("DB_PASSWORD", "root")
DB_NAME     = os.getenv("DB_NAME", "crop_prediction_db")

_conn         = None
_using_sqlite = False

BASE_DIR    = os.path.dirname(os.path.abspath(__file__))
SQLITE_PATH = os.path.join(BASE_DIR, "yeildpredicto.db")


def _init_sqlite():
    import sqlite3
    global _conn, _using_sqlite
    _conn = sqlite3.connect(SQLITE_PATH, check_same_thread=False)
    _conn.row_factory = sqlite3.Row
    _using_sqlite = True
    _conn.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            crop            TEXT,
            latitude        REAL,
            longitude       REAL,
            predicted_yield REAL,
            confidence      REAL,
            temperature     REAL,
            humidity        REAL,
            rainfall        REAL,
            soil_n          REAL,
            soil_p          REAL,
            soil_k          REAL,
            soil_ph         REAL,
            location_name   TEXT,
            created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    _conn.commit()
    print(f"📦 SQLite DB ready: {SQLITE_PATH}")
    return _conn


def _init_mysql():
    import pymysql
    global _conn, _using_sqlite
    print(f"🔌 Connecting to MySQL: {DB_USER}@{DB_HOST}:{DB_PORT}/{DB_NAME}")
    _conn = pymysql.connect(
        host=DB_HOST, port=DB_PORT,
        user=DB_USER, password=DB_PASSWORD,
        database=DB_NAME, charset="utf8mb4",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
    )
    _using_sqlite = False
    print("✅ MySQL connected")
    return _conn


def init_db():
    try:
        return _init_mysql()
    except Exception as e:
        print(f"⚠️  MySQL unavailable ({e}) — using SQLite fallback")
        return _init_sqlite()


def get_db_connection():
    global _conn
    if _conn is None:
        init_db()
    return _conn


def close_db():
    global _conn
    if _conn:
        _conn.close()
        _conn = None
        print("🔌 DB connection closed")


def get_param_marker():
    """Returns %s for MySQL, ? for SQLite"""
    global _using_sqlite
    return "?" if _using_sqlite else "%s"


def get_now_fn():
    """Returns SQL function for current timestamp"""
    global _using_sqlite
    return "CURRENT_TIMESTAMP" if _using_sqlite else "NOW()"


class DatabaseManager:
    def connect(self):       return init_db()
    def get_connection(self): return get_db_connection()
    def close(self):         return close_db()
    def get_marker(self):    return get_param_marker()
    def get_now(self):       return get_now_fn()

db_manager = DatabaseManager()
