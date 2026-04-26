import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder

FEATURE_COLS = [
    "Nitrogen_kg_ha",
    "Phosphorus_kg_ha",
    "Potassium_kg_ha",
    "Avg_Temperature_C",
    "Humidity_Percent",
    "Annual_Rainfall_mm",
    "Soil_pH",
    "Organic_Matter_Percent",
    "Soil_Moisture_Percent",
    "Solar_Radiation_MJ_m2_day",
    "Crop_Duration_Days",
    "Plant_Population_per_ha",

    # 🔥 NEW FEATURES
    "State",
    "Season",
    "Year",
    "Soil_Type",
    "Crop_Variety"
]

TARGET_COL = "Yield_Tons_Per_Hectare"


def _get_df():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.abspath(
        os.path.join(base_dir, "../../dataset/all_india_crop_dataset_59crops.xlsx")
    )

    print(f"\n📂 Loading dataset from: {dataset_path}")

    df = pd.read_excel(dataset_path)
    print(f"✅ Original shape: {df.shape}")

    # 🔥 Encode categorical
    cat_cols = ["State", "Season", "Soil_Type", "Crop_Variety"]

    for col in cat_cols:
        df[col] = LabelEncoder().fit_transform(df[col].astype(str))

    # Remove NULLs
    df = df.dropna(subset=FEATURE_COLS + [TARGET_COL])
    print(f"✅ After removing NULLs: {df.shape}")

    # 🔥 Relaxed outlier removal
    for col in FEATURE_COLS:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1

        df = df[(df[col] >= Q1 - 2.5 * IQR) & (df[col] <= Q3 + 2.5 * IQR)]

    print(f"✅ After outlier removal: {df.shape}")

    # Type cleaning
    df[FEATURE_COLS] = df[FEATURE_COLS].apply(pd.to_numeric, errors="coerce")
    df = df.dropna(subset=FEATURE_COLS)

    print(f"✅ After type cleaning: {df.shape}")

    return df


def load_dataset():
    df = _get_df()
    X = df[FEATURE_COLS]
    y = df[TARGET_COL]

    print(f"\n📊 Final dataset: {X.shape}")
    return X, y


def load_dataset_by_crop():
    df = _get_df()
    crop_dict = {}

    print("\n🌾 Preparing crop datasets...")

    for crop_name, group in df.groupby("Crop"):
        if len(group) >= 50:
            X = group[FEATURE_COLS].reset_index(drop=True)
            y = group[TARGET_COL].reset_index(drop=True)

            crop_dict[crop_name] = (X, y)
            print(f"✅ {crop_name}: {len(group)} rows")

    print(f"📊 Total crops used: {len(crop_dict)}")
    return crop_dict