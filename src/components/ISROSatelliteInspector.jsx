import React, { useState } from 'react';
import { 
  Satellite, 
  Radio, 
  Zap, 
  Crosshair, 
  Eye, 
  Layers, 
  MapPin, 
  Gauge, 
  Calendar, 
  Rocket, 
  Compass, 
  CheckCircle2, 
  X, 
  AlertTriangle, 
  ShieldCheck, 
  Cpu, 
  RefreshCw,
  ExternalLink,
  ImageIcon,
  Sparkles
} from 'lucide-react';
import { searchCopernicusSentinel2 } from '../services/copernicusService';

const ISROSatelliteInspector = ({ satellite, onClose, onFocusOnGlobe }) => {
  const [taskingState, setTaskingState] = useState('idle'); // 'idle' | 'tasking' | 'tasked'
  const [taskingLog, setTaskingLog] = useState([]);
  const [copernicusScene, setCopernicusScene] = useState(null);
  const [isLoadingCopernicus, setIsLoadingCopernicus] = useState(false);
  const [isCopernicusExpanded, setIsCopernicusExpanded] = useState(false);

  const handleFetchCopernicus = async () => {
    setIsLoadingCopernicus(true);
    setIsCopernicusExpanded(true);
    try {
      const lat = satellite.lat || 28.6139;
      const lng = satellite.lng || 77.2090;
      const scene = await searchCopernicusSentinel2(lat, lng);
      setCopernicusScene(scene);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingCopernicus(false);
    }
  };

  if (!satellite) return null;

  const handleSimulateTasking = () => {
    setTaskingState('tasking');
    setTaskingLog([
      `[${new Date().toLocaleTimeString()}] INITIATING RAPID TASKING REQUEST: ${satellite.displayName}`,
      `[${new Date().toLocaleTimeString()}] Contacting ISRO ISTRAC Ground Network (TTC Station: ISTRAC Bengaluru / Port Blair)`,
      `[${new Date().toLocaleTimeString()}] Calculating SGP4 Nadir pass geometry over target sector...`,
      `[${new Date().toLocaleTimeString()}] Sensor Payload: ${satellite.primarySensor} armed for emergency pass`,
      `[${new Date().toLocaleTimeString()}] Downlink scheduled to NRSC Earth Station Shadnagar (X-Band 320 Mbps)`,
      `[${new Date().toLocaleTimeString()}] TASKING ORDER CONFIRMED: Bhuvan emergency raster product dispatch ready.`
    ]);

    setTimeout(() => {
      setTaskingState('tasked');
    }, 1800);
  };

  return (
    <div className="absolute top-20 right-4 md:right-6 w-[94vw] md:w-[460px] max-h-[85vh] overflow-y-auto custom-scrollbar glass-panel rounded-2xl border border-orange-500/40 shadow-2xl z-30 backdrop-blur-2xl animate-in fade-in slide-in-from-right-4 duration-200">
      
      {/* Header with ISRO Saffron glow */}
      <div className="sticky top-0 bg-slate-950/95 backdrop-blur-md p-4 border-b border-slate-800/80 z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-lg border"
            style={{ 
              backgroundColor: `${satellite.color}15`, 
              borderColor: `${satellite.color}50`,
              boxShadow: `0 0 15px ${satellite.color}30`
            }}
          >
            {satellite.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-100 tracking-wide font-mono">
                {satellite.displayName}
              </h2>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                ISRO / NRSC
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-400 font-semibold">{satellite.isLive ? 'LIVE SGP4 PROPAGATION' : 'ORBITAL TLE'}</span>
              <span>•</span>
              <span className="text-slate-400 uppercase">{satellite.coverageType}</span>
            </p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-4">

        {/* Live Dynamic Geographic Region & Observation Footprint Alert */}
        <div className="p-3 rounded-xl bg-orange-950/20 border border-orange-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-orange-400 shrink-0 animate-pulse" />
            <div>
              <div className="text-[9px] font-mono text-orange-300/80 uppercase">
                {satellite.isDeepSpace ? 'Mission Location' : satellite.isGeostationary ? 'Geostationary Orbital Slot' : 'Current Sub-Satellite Sector'}
              </div>
              <div className="text-xs font-bold text-slate-100">{satellite.currentRegion}</div>
            </div>
          </div>
          {!satellite.isDeepSpace && (
            <button
              onClick={() => onFocusOnGlobe && onFocusOnGlobe(satellite)}
              className="px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Crosshair className="w-3 h-3" />
              SWATH
            </button>
          )}
        </div>

        {/* Real-Time Flight Telemetry HUD Grid */}
        <div>
          <div className="text-[9px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            Flight Dynamics Telemetry (Instantaneous)
          </div>
          
          {satellite.isDeepSpace ? (
            /* Aditya-L1 Sun-Earth L1 Halo Telemetry */
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Lagrangian Coordinates</span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  Sun-Earth L1 Point
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Distance from Earth</span>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  ~1.50 Million km
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Halo Station Velocity</span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {satellite.velocity} km/s <span className="text-[9px] text-slate-500">(Lagrange Station)</span>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Observation Target</span>
                <span className="text-xs font-mono font-bold text-purple-300 truncate">
                  Solar Corona & CMEs
                </span>
              </div>
            </div>
          ) : satellite.isGeostationary ? (
            /* INSAT-3DR Geostationary 74.0°E Telemetry */
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Sub-Satellite Nadir</span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  0.000° N, 74.000° E
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Orbital Altitude</span>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  35,786.0 km (GEO)
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Orbital Velocity</span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  3.07 km/s <span className="text-[9px] text-slate-500">(Synchronous)</span>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Observation Swath</span>
                <span className="text-xs font-mono font-bold text-purple-300 truncate">
                  Full Earth Disk
                </span>
              </div>
            </div>
          ) : (
            /* LEO Sun-Synchronous Polar Telemetry */
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Sub-Satellite Nadir</span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  {satellite.lat.toFixed(3)}° {satellite.lat >= 0 ? 'N' : 'S'}, {Math.abs(satellite.lng).toFixed(3)}° {satellite.lng >= 0 ? 'E' : 'W'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Orbital Altitude</span>
                <span className="text-xs font-mono font-bold text-emerald-300">
                  {satellite.alt.toFixed(1)} km
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Orbital Velocity</span>
                <span className="text-xs font-mono font-bold text-amber-300">
                  {satellite.velocity} km/s <span className="text-[9px] text-slate-500">({(satellite.velocity * 3600).toFixed(0)} km/h)</span>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="text-[8px] font-mono text-slate-400 block uppercase">Observation Swath Width</span>
                <span className="text-xs font-mono font-bold text-purple-300">
                  {satellite.swathWidth.split(' ')[0]} km Swath
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sensor & Payload Architecture (The Key EO Feature) */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/90 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-400" />
              <span className="text-[10px] font-mono uppercase font-bold text-slate-200">Sensor & Payload Architecture</span>
            </div>
            <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {satellite.nrscPayloadId}
            </span>
          </div>

          <div>
            <div className="text-[9px] font-mono text-slate-400 uppercase">Primary Spaceborne Instrument</div>
            <div className="text-xs font-bold text-orange-300 mt-0.5">{satellite.primarySensor}</div>
          </div>

          <div className="p-2 rounded-lg bg-black/40 border border-slate-800/60">
            <div className="text-[8px] font-mono text-slate-400 uppercase mb-1">Radiometric & Spatial Specifications</div>
            <div className="text-[10px] font-mono text-slate-200 leading-relaxed">
              {satellite.sensorSpecs}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono pt-1">
            <div>
              <span className="text-slate-400 block">Nominal Swath:</span>
              <span className="text-slate-200 font-semibold">{satellite.swathWidth}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Revisit Cadence:</span>
              <span className="text-slate-200 font-semibold">{satellite.revisitCycle}</span>
            </div>
          </div>
        </div>

        {/* Mission Profile & Launch History */}
        <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 space-y-2">
          <div className="text-[10px] font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
            <Rocket className="w-3.5 h-3.5 text-blue-400" />
            ISRO Mission Profile
          </div>

          <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
            <div>
              <span className="text-slate-400 block">Orbit Configuration:</span>
              <span className="text-slate-200">{satellite.orbitType}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Launch Date:</span>
              <span className="text-slate-200">{satellite.launchDate}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Launch Vehicle:</span>
              <span className="text-slate-200 font-bold text-orange-300">{satellite.launchVehicle}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Downlink Earth Station:</span>
              <span className="text-slate-200">NRSC Shadnagar (IMGEOS)</span>
            </div>
          </div>
        </div>

        {/* Primary Operational Remote Sensing Uses */}
        <div className="space-y-1.5">
          <div className="text-[10px] font-mono uppercase font-bold text-slate-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            NRSC Operational Utilization Domains
          </div>
          <div className="space-y-1">
            {satellite.primaryUses?.map((use, i) => (
              <div key={i} className="flex items-start gap-2 p-1.5 rounded-lg bg-slate-900/40 text-[9px] font-mono text-slate-300 border border-slate-800/40">
                <span className="text-emerald-400 font-bold mt-0.5">•</span>
                <span>{use}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Copernicus Sentinel Hub Imagery Ingest & Cross-Calibration */}
        {!satellite.isDeepSpace && (
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-cyan-500/40 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-300">
                  Copernicus Sentinel Hub Imagery Ingest
                </span>
              </div>
              <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                STAC L2A API
              </span>
            </div>

            <p className="text-[9.5px] font-mono text-slate-300 leading-relaxed">
              Cross-calibrate {satellite.displayName} observation swath with ESA Copernicus Sentinel-2 MultiSpectral Instrument (10m BOA surface reflectance).
            </p>

            {!copernicusScene && !isLoadingCopernicus && (
              <button
                onClick={handleFetchCopernicus}
                className="w-full py-2 px-3 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 font-mono text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fetch Live Sentinel-2 Granule for Sector</span>
              </button>
            )}

            {isLoadingCopernicus && (
              <div className="py-2.5 px-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Querying Planetary Computer / Copernicus STAC API...
              </div>
            )}

            {copernicusScene && (
              <div className="space-y-2.5 pt-1">
                {/* Scene Preview Image */}
                <div className="relative w-full h-36 rounded-lg overflow-hidden border border-slate-700 bg-black group">
                  <img 
                    src={copernicusScene.previewUrl} 
                    alt="Copernicus Sentinel-2 True-Color Preview" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[8px] font-mono text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    COPERNICUS L2A 10M
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur text-[8px] font-mono text-slate-300 border border-slate-700">
                    Cloud: {copernicusScene.cloudCoverPct}%
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="p-2 rounded-lg bg-black/50 border border-slate-800 text-[9px] font-mono space-y-1">
                  <div className="flex justify-between text-slate-400">
                    <span>Scene Granule ID:</span>
                    <span className="text-slate-200 truncate max-w-[220px]" title={copernicusScene.id}>{copernicusScene.id}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Acquisition Time:</span>
                    <span className="text-cyan-300">{copernicusScene.acquisitionDate}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Ground Resolution:</span>
                    <span className="text-emerald-300">{copernicusScene.gsd}</span>
                  </div>
                </div>

                {/* Spectral Band Pills */}
                <div className="flex flex-wrap gap-1">
                  {(copernicusScene.bands || []).map((band, idx) => (
                    <span key={idx} className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[8px] font-mono text-slate-300">
                      {band}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleFetchCopernicus}
                  className="w-full py-1 text-[9px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Re-query Sentinel-2 Granule</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* AI Satellite Tasking Recommendation & Emergency Action */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-orange-950/30 to-slate-900 border border-orange-500/40 space-y-2.5 shadow-xl">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-orange-400" />
            <span className="text-[10px] font-mono uppercase font-bold text-orange-300">
              AI Satellite Tasking Recommendation
            </span>
          </div>

          <p className="text-[9.5px] font-mono text-slate-300 leading-relaxed">
            {satellite.taskingRecommendation}
          </p>

          {taskingState === 'idle' && (
            <button
              onClick={handleSimulateTasking}
              className="w-full py-2 px-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <Zap className="w-3.5 h-3.5 group-hover:animate-bounce" />
              Simulate Emergency Tasking Order
            </button>
          )}

          {taskingState === 'tasking' && (
            <div className="w-full py-2 px-3 rounded-xl bg-orange-950/70 border border-orange-500/60 text-orange-300 font-mono text-xs flex items-center justify-center gap-2 animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Uplinking to ISTRAC & Arming Payload...
            </div>
          )}

          {taskingState === 'tasked' && (
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/60 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>TASKING ORDER LOGGED: Emergency Pass Scheduled</span>
              </div>
              
              <div className="p-2 rounded-lg bg-black/60 border border-slate-800 text-[8px] font-mono text-slate-300 space-y-1 max-h-24 overflow-y-auto custom-scrollbar">
                {taskingLog.map((log, idx) => (
                  <div key={idx} className="text-emerald-400/90">{log}</div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ISROSatelliteInspector;
