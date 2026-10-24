# TerraCortex AI — Explainable AI Platform for Multi-Hazard Earth Observation Intelligence

> **NRSC / ISRO Competition-Grade Architecture**  
> Predict. Understand. Protect.

TerraCortex AI is an explainable AI (XAI) platform designed for real-time multi-hazard Earth observation monitoring, disaster forecasting, and scientific telemetry attribution using multi-modal satellite data (Sentinel-2, Sentinel-1 SAR, Landsat 9, INSAT-3D, Cartosat-3).

---

## 🚀 Quick Start & Installation

### Workspace Recommendation
Set `C:\Users\K.HARSHADEEP\.gemini\antigravity\scratch\terracortex-ai` as your active workspace in your IDE / Antigravity environment.

### 1. Launch FastAPI Backend Telemetry Server
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend API will run at `http://localhost:8000`. Direct Swagger UI available at `http://localhost:8000/docs`.

### 2. View Interactive Prototype
Open `terracortex_prototype.html` directly in your browser or IDE side pane to inspect all 8 screens live:
- 🌍 **Screen 1**: 3D Earth Orbit Simulator
- 📊 **Screen 2**: Main Intelligence Dashboard
- 🗺️ **Screen 3**: GIS Layer Inspector (Leaflet GIS, Band Math, Sentinel-1 SAR Backscatter)
- 🤖 **Screen 4**: AI Copilot (Natural Language Disaster Command)
- 🧠 **Screen 5**: Explainable AI SHAP Physics Engine ($f(x) = \phi_0 + \sum \phi_i$)
- 🌊 **Screen 6**: Hydrodynamic Disaster Simulator
- 🚨 **Screen 7**: Multi-Hazard Global Feed (Floods, Fires, Deforestation)
- 📄 **Screen 8**: ISRO/NRSC Compliant PDF Report Generator

---

## 🛰️ Multi-Modal Satellite Data Fusion

| Sensor Suite | Resolution | Spectral Band / Channel | Physical Indicator |
| :--- | :--- | :--- | :--- |
| **Sentinel-2B MSI** | 10m | B03 (Green), B08 (NIR) | NDWI Surface Water Index |
| **Sentinel-1A C-SAR** | 20m | VV/VH C-Band | Radar Specular Reflection (-22.4 dB) |
| **Landsat 9 TIRS** | 100m | Band 10 / Band 11 | Land Surface Temperature (LST) |
| **INSAT-3D** | 4km | Sounder / Hydro-Estimator | 3-Hour Precipitation Anomaly |
| **SRTM DEM v3** | 30m | Topographic Elevation | Drainage Slope Vector (<1.2°) |

---

## 🔬 Explainable AI (SHAP) Attribution Math

Predictions are calculated using KernelSHAP feature attribution decomposition:
$$f(x) = \phi_0 + \sum_{i=1}^{M} \phi_i$$

Where:
- $\phi_0 = 18.2\%$ (Baseline expected risk)
- $\phi_1 = +28.4\%$ (INSAT-3D Rainfall Anomaly)
- $\phi_2 = +16.1\%$ (Sentinel-1 SAR Specular Mask)
- $\phi_3 = +12.8\%$ (SRTM DEM Flat Terrain Slope)
- $\phi_4 = +10.5\%$ (Brahmaputra Hydrological Gauge Height)
- $\phi_5 = -3.6\%$ (Upper Catchment Canopy Absorption Offset)

**Final Predicted Risk $f(x) = 72.4\%$ (CRITICAL).**
