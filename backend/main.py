from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import math

app = FastAPI(
    title="TerraCortex AI — Earth Observation & XAI API",
    description="NRSC/ISRO Compliant Multi-Hazard Intelligence & Explainable AI Telemetry API",
    version="2.4.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TelemetryPayload(BaseModel):
    region_id: str
    latitude: float
    longitude: float
    bounding_box: List[float]
    satellites: List[str]

class PredictionResponse(BaseModel):
    hazard_type: str
    risk_score: float
    confidence: float
    lead_time_hours: int
    inundated_area_sq_km: float
    affected_villages: int
    affected_population: int
    shap_explanation: dict

@app.get("/")
def read_root():
    return {
        "status": "ONLINE",
        "system": "TerraCortex AI Telemetry Engine",
        "isro_bhuvan_sync": True,
        "satellites_active": ["Sentinel-2B", "Sentinel-1A C-SAR", "Landsat-9 TIRS", "Cartosat-3"]
    }

@app.get("/api/v1/telemetry/assam", response_model=PredictionResponse)
def get_assam_telemetry():
    return PredictionResponse(
        hazard_type="Hydrological Flood",
        risk_score=72.4,
        confidence=91.4,
        lead_time_hours=48,
        inundated_area_sq_km=410.2,
        affected_villages=450,
        affected_population=1240000,
        shap_explanation={
            "base_expected_risk": 18.2,
            "final_prediction": 72.4,
            "feature_attributions": [
                {"feature": "INSAT-3D_Precip_Anomaly", "value": "+38.2 mm/hr", "shap_weight": 28.4},
                {"feature": "Sentinel1_SAR_VV_Backscatter", "value": "-22.4 dB", "shap_weight": 16.1},
                {"feature": "SRTM_DEM_Flat_Slope", "value": "<1.2°", "shap_weight": 12.8},
                {"feature": "Brahmaputra_Gauge_Guwahati", "value": "49.42m MSL", "shap_weight": 10.5},
                {"feature": "Canopy_Absorption_Forest", "value": "High", "shap_weight": -3.6}
            ]
        }
    )

@app.get("/api/v1/copilot/query")
def query_copilot(question: str):
    return {
        "query": question,
        "confidence": 91.4,
        "explanation": "Assam Brahmaputra basin risk is 72.4% due to a +38.2% precipitation anomaly detected by INSAT-3D, combined with Sentinel-1 SAR VV backscatter specular reflection (-22.4 dB) confirming 410 sq km surface water expansion.",
        "recommended_action": [
            "Deploy Stage-3 alert to Barpeta DDMA.",
            "Pre-position 4 NDRF rescue battalions.",
            "Activate Copernicus EMS pass EMSR724."
        ]
    }

@app.get("/api/v1/simulation/flood")
def run_flood_simulation(rain_multiplier: float = Query(1.4, ge=1.0, le=2.0)):
    base_area = 140.0
    simulated_area = base_area * math.pow(rain_multiplier, 2.5)
    return {
        "scenario": f"+{int((rain_multiplier - 1.0) * 100)}% Precipitation Anomaly",
        "predicted_inundated_area_sq_km": round(simulated_area, 1),
        "peak_water_depth_meters": round(1.2 * rain_multiplier, 2),
        "threat_level": "CRITICAL" if simulated_area > 300 else "ELEVATED"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
