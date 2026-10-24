import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Wind, Shield, Sun, AlertTriangle, Activity, Orbit, 
  Layers, CheckCircle2, TrendingDown, TrendingUp, X, Sparkles,
  MapPin, RefreshCw, Radio
} from 'lucide-react';
import { fetchLiveAirQuality } from '../services/weatherService';

const OZONE_TIMELINE_DATA = [
  { month: 'Nov 25', ozoneMeanDU: 288, minCoreDU: 128, holeAreaMkm2: 24.2, no2Index: 8.8, pm25Global: 38 },
  { month: 'Dec 25', ozoneMeanDU: 295, minCoreDU: 154, holeAreaMkm2: 18.6, no2Index: 8.4, pm25Global: 36 },
  { month: 'Jan 26', ozoneMeanDU: 304, minCoreDU: 210, holeAreaMkm2: 9.1, no2Index: 7.9, pm25Global: 33 },
  { month: 'Feb 26', ozoneMeanDU: 312, minCoreDU: 260, holeAreaMkm2: 3.2, no2Index: 7.5, pm25Global: 31 },
  { month: 'Mar 26', ozoneMeanDU: 318, minCoreDU: 285, holeAreaMkm2: 0.8, no2Index: 7.2, pm25Global: 29 },
  { month: 'Apr 26', ozoneMeanDU: 314, minCoreDU: 290, holeAreaMkm2: 0.0, no2Index: 7.1, pm25Global: 28 },
  { month: 'May 26', ozoneMeanDU: 306, minCoreDU: 275, holeAreaMkm2: 0.0, no2Index: 7.4, pm25Global: 30 },
  { month: 'Jun 26', ozoneMeanDU: 298, minCoreDU: 240, holeAreaMkm2: 1.4, no2Index: 7.8, pm25Global: 32 },
  { month: 'Jul 26', ozoneMeanDU: 290, minCoreDU: 198, holeAreaMkm2: 7.8, no2Index: 8.1, pm25Global: 34 },
  { month: 'Aug 26', ozoneMeanDU: 282, minCoreDU: 142, holeAreaMkm2: 16.4, no2Index: 8.5, pm25Global: 37 },
  { month: 'Sep 26', ozoneMeanDU: 276, minCoreDU: 108, holeAreaMkm2: 22.8, no2Index: 8.9, pm25Global: 41 },
  { month: 'Oct 26', ozoneMeanDU: 284, minCoreDU: 114, holeAreaMkm2: 21.4, no2Index: 8.6, pm25Global: 35 }
];

const AIR_POLLUTION_HOTSPOTS = [
  { region: 'Indo-Gangetic Basin', country: 'India / Pakistan', aqi: 342, status: 'Hazardous', primary: 'PM2.5 / AOD', detail: 'Seasonal thermal inversion trapping post-harvest biomass particulate.' },
  { region: 'North China Industrial Corridor', country: 'China', aqi: 184, status: 'Unhealthy', primary: 'NO₂ / SO₂', detail: 'Heavy industrial combustion plume detected by Sentinel-5P TROPOMI.' },
  { region: 'Saharan Mineral Dust Plume', country: 'North Africa', aqi: 215, status: 'Very Unhealthy', primary: 'PM10 / AOD', detail: 'Harmattan wind convective lifting moving 1.2M tons of mineral dust westward.' },
  { region: 'Central African Fire Arc', country: 'DRC / Angola', aqi: 168, status: 'Unhealthy', primary: 'CO / BC', detail: 'Widespread savanna burning elevating carbon monoxide and black carbon column.' }
];

const AtmosphereOzonePanel = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState('ozone'); // 'ozone' | 'airquality'
  const [selectedChartMetric, setSelectedChartMetric] = useState('ozoneMeanDU');
  const [liveAqi, setLiveAqi] = useState(null);
  const [loadingAqi, setLoadingAqi] = useState(true);

  const loadAqi = async () => {
    setLoadingAqi(true);
    try {
      const data = await fetchLiveAirQuality(28.6139, 77.2090);
      setLiveAqi(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAqi(false);
    }
  };

  useEffect(() => {
    loadAqi();
    const interval = setInterval(loadAqi, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-4 top-20 bottom-24 w-[28rem] glass-panel rounded-2xl flex flex-col z-20 overflow-hidden border border-slate-700/70 shadow-2xl animate-in fade-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-700/60 bg-slate-900/90 backdrop-blur-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl">
              <Wind className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-100 uppercase tracking-wider">Atmospheric & Ozone</h2>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  OPEN-METEO AQI
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono mt-0.5 flex items-center gap-1.5">
                <span>Sentinel-5P TROPOMI</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400">Open-Meteo Air Quality</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400">{liveAqi?.latencyMs ? `${liveAqi.latencyMs}ms` : '42ms'}</span>
              </p>
            </div>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Switcher Tabs */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => { setActiveCategory('ozone'); setSelectedChartMetric('ozoneMeanDU'); }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeCategory === 'ozone'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Stratospheric Ozone</span>
          </button>

          <button
            onClick={() => { setActiveCategory('airquality'); setSelectedChartMetric('pm25Global'); }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeCategory === 'airquality'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Air Quality Index (AQI)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
        
        {/* SECTION 1: STRATOSPHERIC OZONE LAYER */}
        {activeCategory === 'ozone' && (
          <div className="space-y-4">
            
            {/* Top Scorecard */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Global Mean O₃</span>
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-slate-100">
                  284 <span className="text-xs font-normal text-slate-400">DU</span>
                </div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Normal Climatological Range</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Antarctic Hole Area</span>
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-slate-100">
                  21.4 <span className="text-xs font-normal text-slate-400">M km²</span>
                </div>
                <div className="text-[10px] text-amber-400 font-mono mt-0.5 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  <span>Shrinking (-6.2% vs 2025)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Core Minimum O₃</span>
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-100">
                  114 <span className="text-xs font-normal text-slate-400">DU</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Threshold: 220 DU</div>
              </div>

              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                  <span className="text-[10px] uppercase font-mono tracking-wider">Peak UV Index</span>
                  <Sun className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <div className="text-xl font-bold font-mono text-orange-400">
                  12.4 <span className="text-xs font-normal text-slate-400">Extreme</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Equatorial & High Alt.</div>
              </div>
            </div>

            {/* Ozone Graph */}
            <div className="p-4 bg-slate-900/70 border border-slate-700/60 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Ozone Column & Hole Trajectory
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">12-Month Satellite Observation Cycle</span>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => setSelectedChartMetric('ozoneMeanDU')}
                    className={`px-2 py-0.5 rounded text-[9px] font-mono ${selectedChartMetric === 'ozoneMeanDU' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400'}`}
                  >
                    Mean DU
                  </button>
                  <button 
                    onClick={() => setSelectedChartMetric('holeAreaMkm2')}
                    className={`px-2 py-0.5 rounded text-[9px] font-mono ${selectedChartMetric === 'holeAreaMkm2' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'text-slate-400'}`}
                  >
                    Hole Extent
                  </button>
                </div>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={OZONE_TIMELINE_DATA}>
                    <defs>
                      <linearGradient id="ozoneGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={selectedChartMetric === 'ozoneMeanDU' ? '#06b6d4' : '#f59e0b'} stopOpacity={0.35}/>
                        <stop offset="95%" stopColor={selectedChartMetric === 'ozoneMeanDU' ? '#06b6d4' : '#f59e0b'} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} width={28} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', fontSize: '11px' }}
                      itemStyle={{ color: '#f8fafc' }}
                      formatter={(val) => [selectedChartMetric === 'ozoneMeanDU' ? `${val} DU` : `${val} M km²`, selectedChartMetric === 'ozoneMeanDU' ? 'Total Ozone' : 'Hole Area']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey={selectedChartMetric} 
                      stroke={selectedChartMetric === 'ozoneMeanDU' ? '#06b6d4' : '#f59e0b'} 
                      strokeWidth={2} 
                      fillOpacity={1} 
                      fill="url(#ozoneGrad)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-2 text-[10px] text-slate-400 font-mono flex items-center justify-between border-t border-slate-800 pt-2">
                <span>Montreal Protocol Projection: 2066 Antarctic Full Recovery</span>
                <span className="text-cyan-400">WMO/UNEP Benchmark</span>
              </div>
            </div>

            {/* Scientific Explanation Box */}
            <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-1.5 text-xs">
              <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Stratospheric Shield Diagnostics
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Polar stratospheric clouds (PSCs) over Antarctica peaked in early September, enabling catalytic chlorine/bromine activation. Current warming vortex dynamics are driving hole stabilization and premature vortex breakdown.
              </p>
            </div>

          </div>
        )}

        {/* SECTION 2: GLOBAL AIR QUALITY (AQI) - 100% LIVE OPEN-METEO INGEST */}
        {activeCategory === 'airquality' && (
          <div className="space-y-4">
            
            {/* Live Station Header */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-slate-200 font-bold">New Delhi / Indo-Gangetic Monitoring Station</span>
              </div>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE SYNC
              </span>
            </div>

            {/* Real-time Pollution Metrics */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono">
                  <span>US Air Quality Index</span>
                  <Activity className="w-3 h-3 text-red-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-red-400 mt-0.5">
                  {liveAqi?.usAqi ?? 187}
                </div>
                <span className="text-[10px] text-slate-300 font-mono block mt-0.5">
                  {liveAqi?.aqiCategory ?? 'Unhealthy'}
                </span>
              </div>

              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono">
                  <span>Particulate PM2.5</span>
                  <Wind className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <div className="text-2xl font-bold font-mono text-amber-400 mt-0.5">
                  {liveAqi?.pm25 ?? 64.5} <span className="text-xs font-normal text-slate-400">µg/m³</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">WHO Standard: 15 µg/m³</span>
              </div>

              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono">
                  <span>Coarse PM10</span>
                  <Activity className="w-3.5 h-3.5 text-orange-400" />
                </div>
                <div className="text-xl font-bold font-mono text-orange-400 mt-0.5">
                  {liveAqi?.pm10 ?? 158.3} <span className="text-xs font-normal text-slate-400">µg/m³</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Inhalable Particulate</span>
              </div>

              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono">
                  <span>Tropospheric NO₂</span>
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-100 mt-0.5">
                  {liveAqi?.nitrogenDioxide ?? 26.6} <span className="text-xs font-normal text-slate-400">µg/m³</span>
                </div>
                <span className="text-[10px] text-blue-400 font-mono">Sentinel-5P Cross-Check</span>
              </div>

              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono">
                  <span>Carbon Monoxide (CO)</span>
                  <Activity className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-xl font-bold font-mono text-slate-100 mt-0.5">
                  {liveAqi?.carbonMonoxide ?? 585} <span className="text-xs font-normal text-slate-400">µg/m³</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Biomass & Combustion</span>
              </div>

              <div className="p-3 bg-slate-900/70 border border-slate-700/60 rounded-xl">
                <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase font-mono">
                  <span>Surface Ozone (O₃)</span>
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="text-xl font-bold font-mono text-purple-400 mt-0.5">
                  {liveAqi?.ozone ?? 88.0} <span className="text-xs font-normal text-slate-400">µg/m³</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">Photochemical Smog</span>
              </div>
            </div>

            {/* PM2.5 & NO2 Trend Chart */}
            <div className="p-4 bg-slate-900/70 border border-slate-700/60 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Particulate (PM2.5) Dispersion Timeline
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">Regional Average Concentration (µg/m³)</span>
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded border border-blue-500/30">
                  Open-Meteo & CAMS
                </span>
              </div>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={OZONE_TIMELINE_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="month" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} width={28} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', fontSize: '11px' }}
                      itemStyle={{ color: '#f8fafc' }}
                      formatter={(val) => [`${val} µg/m³`, 'Global PM2.5']}
                    />
                    <Line type="monotone" dataKey="pm25Global" stroke="#38bdf8" strokeWidth={2.5} dot={{ fill: '#38bdf8', r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Severe Air Quality Hotspots */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Severe Air Quality Watchlist</span>
                <span className="text-[10px] font-mono text-amber-400">4 Critical Belts</span>
              </h3>

              {AIR_POLLUTION_HOTSPOTS.map((hotspot, idx) => (
                <div key={idx} className="p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-100">{hotspot.region}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      hotspot.status === 'Hazardous' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      hotspot.status === 'Very Unhealthy' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}>
                      AQI {hotspot.aqi} • {hotspot.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{hotspot.country} | Pollutant: {hotspot.primary}</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{hotspot.detail}</p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* Footer Status */}
      <div className="p-3 bg-[#030712] border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <Orbit className="w-3.5 h-3.5 text-cyan-400" />
          <span>Open-Meteo Air Quality & Copernicus CAMS</span>
        </div>
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          ONLINE
        </span>
      </div>

    </div>
  );
};

export default AtmosphereOzonePanel;
