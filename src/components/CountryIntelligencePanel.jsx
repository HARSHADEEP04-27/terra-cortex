import React, { useState } from 'react';
import { 
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  AlertTriangle, Flame, Droplets, Wind, ShieldAlert, Cpu, 
  Satellite, TrendingUp, X, Activity, Layers, Info, MapPin, Users, Building,
  Sparkles, ArrowRight, ShieldCheck, Check, Clock
} from 'lucide-react';
import { getCountryIntelligence } from '../data/countryIntelligenceData';

const CountryIntelligencePanel = ({ country, onClose, onOpenAICopilot }) => {
  const [activeSubTab, setActiveSubTab] = useState('places'); // 'places' | 'charts' | 'hazards' | 'xai' | 'satellites'
  const [selectedMetric, setSelectedMetric] = useState('overallRisk'); // 'overallRisk' | 'thermalAnomaly' | 'floodIndex' | 'forestHealth'
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [xaiSubMode, setXaiSubMode] = useState('shap'); // 'shap' | 'precautions'
  const [acknowledgedTasks, setAcknowledgedTasks] = useState({});

  const data = getCountryIntelligence(country);

  const getMetricConfig = () => {
    switch(selectedMetric) {
      case 'thermalAnomaly':
        return { name: 'Thermal Anomaly (ΔT °C)', color: '#f59e0b', unit: '°C' };
      case 'floodIndex':
        return { name: 'Hydrological Flood Index', color: '#38bdf8', unit: '%' };
      case 'forestHealth':
        return { name: 'Vegetation Canopy Health (NDVI)', color: '#10b981', unit: 'pts' };
      default:
        return { name: 'Composite Disaster Risk Index', color: '#ef4444', unit: '/100' };
    }
  };

  const metricConfig = getMetricConfig();

  return (
    <div className="absolute right-4 top-20 bottom-24 w-[29rem] glass-panel rounded-2xl flex flex-col z-20 overflow-hidden border border-slate-700/70 shadow-2xl animate-in fade-in slide-in-from-right duration-300">
      
      {/* Top Header */}
      <div className="p-5 border-b border-slate-700/60 bg-slate-900/90 backdrop-blur-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-xl">
              <MapPin className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-100 uppercase tracking-wider">{data.name}</h2>
                <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono rounded">
                  {data.iso}
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono mt-0.5 flex items-center gap-1.5">
                <span>{data.coordinates}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">{data.region}</span>
              </p>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title="Close Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aggregate Threat Banner */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className={`p-2.5 rounded-xl border flex flex-col justify-between ${
            data.overallRisk === 'Critical' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
            data.overallRisk === 'High' ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' :
            'bg-amber-500/10 border-amber-500/30 text-amber-400'
          }`}>
            <span className="text-[9px] uppercase font-bold tracking-wider opacity-80">Threat Status</span>
            <span className="text-lg font-mono font-bold">{data.overallRisk}</span>
          </div>

          <div className="p-2.5 rounded-xl border border-slate-700/60 bg-slate-800/40 flex flex-col justify-between">
            <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Disaster Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-mono font-bold text-slate-100">{data.riskScore}</span>
              <span className="text-[10px] text-slate-400 font-mono">/100</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl border border-slate-700/60 bg-slate-800/40 flex flex-col justify-between">
            <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">Hazard Places</span>
            <div className="flex items-center gap-1 text-red-400 text-lg font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              {data.hotspots.length} Zones
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-1 mt-4 pt-3 border-t border-slate-800/80">
          {[
            { id: 'places', label: 'Hazard Places', icon: MapPin },
            { id: 'charts', label: 'Past Trends', icon: TrendingUp },
            { id: 'hazards', label: 'Hazard Matrix', icon: AlertTriangle },
            { id: 'xai', label: 'AI Reasoning', icon: Cpu },
            { id: 'satellites', label: 'Satellites', icon: Satellite }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`flex-1 py-1.5 px-1.5 rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-all ${
                  isActive 
                    ? 'bg-red-600/25 text-red-300 border border-red-500/40 shadow-sm font-semibold' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
        
        {/* TAB 0: DETAILED HAZARD PLACES & LOCALIZED HOTSPOTS */}
        {activeSubTab === 'places' && (
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Critical Hazard Hotspots & Municipalities
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                  Identified via Multi-Spectral & SAR Radar Observation
                </p>
              </div>
              <span className="text-[9px] font-mono text-red-400 bg-red-500/20 px-2 py-0.5 rounded border border-red-500/30">
                Pulsing on Globe
              </span>
            </div>

            {data.hotspots.map((place) => {
              const isSelected = selectedPlaceId === place.id;
              return (
                <div 
                  key={place.id}
                  onClick={() => setSelectedPlaceId(isSelected ? null : place.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-red-950/40 border-red-500/80 shadow-lg' 
                      : 'bg-slate-900/70 border-slate-700/60 hover:border-slate-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                        <span className="text-xs font-bold text-slate-100">{place.placeName}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 ml-5">
                        {place.stateProvince} • LAT: {place.lat}° | LNG: {place.lng}°
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      place.severity === 'Critical' ? 'bg-red-500/25 text-red-400 border border-red-500/40 animate-pulse' :
                      place.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {place.severity}
                    </span>
                  </div>

                  {/* Hazard type badge */}
                  <div className="flex items-center gap-2 my-2">
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono rounded">
                      {place.hazardType}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      👥 {place.affectedPopulation}
                    </span>
                  </div>

                  {/* Detail */}
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-2.5">
                    {place.detail}
                  </p>

                  {/* Satellite proof & action */}
                  <div className="pt-2.5 border-t border-slate-800/80 space-y-1.5 text-[10px]">
                    <div className="text-cyan-400 font-mono flex items-start gap-1.5">
                      <Satellite className="w-3 h-3 shrink-0 mt-0.5" />
                      <span>{place.satelliteProof}</span>
                    </div>
                    {place.emergencyAction && (
                      <div className="text-amber-300 font-mono flex items-start gap-1.5 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                        <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5 text-amber-400" />
                        <span>Action: {place.emergencyAction}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 1: HISTORICAL PAST TREND CHARTS */}
        {activeSubTab === 'charts' && (
          <div className="space-y-4">
            
            {/* Metric Selector Pills */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/60 rounded-xl border border-slate-800">
              {[
                { id: 'overallRisk', label: 'Composite Risk' },
                { id: 'floodIndex', label: 'Hydrology/Flood' },
                { id: 'thermalAnomaly', label: 'Temp Anomaly ΔT' },
                { id: 'forestHealth', label: 'Forest NDVI' }
              ].map(pill => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedMetric(pill.id)}
                  className={`flex-1 min-w-[100px] text-[10px] font-mono uppercase py-1 px-2 rounded-md transition-all ${
                    selectedMetric === pill.id
                      ? 'bg-blue-500 text-white font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Historical Graph Chart */}
            <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    {metricConfig.name}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500">12-Month Satellite Historical Baseline</span>
                </div>
                <div className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Nov 2025 - Oct 2026
                </div>
              </div>

              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {selectedMetric === 'thermalAnomaly' ? (
                    <LineChart data={data.historicalTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} width={28} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', fontSize: '11px' }}
                        itemStyle={{ color: '#f8fafc' }}
                        formatter={(val) => [`+${val}°C`, 'Thermal Delta']}
                      />
                      <Line type="monotone" dataKey="thermalAnomaly" stroke={metricConfig.color} strokeWidth={2.5} dot={{ fill: metricConfig.color, r: 3 }} />
                    </LineChart>
                  ) : (
                    <AreaChart data={data.historicalTrends}>
                      <defs>
                        <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={metricConfig.color} stopOpacity={0.4}/>
                          <stop offset="95%" stopColor={metricConfig.color} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="month" stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={9} tickLine={false} axisLine={false} width={28} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.5rem', fontSize: '11px' }}
                        itemStyle={{ color: '#f8fafc' }}
                        formatter={(val) => [`${val} ${metricConfig.unit}`, metricConfig.name]}
                      />
                      <Area type="monotone" dataKey={selectedMetric} stroke={metricConfig.color} strokeWidth={2} fillOpacity={1} fill="url(#metricGradient)" />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-mono">
                <span>Min: {Math.min(...data.historicalTrends.map(d => d[selectedMetric]))}</span>
                <span className="text-slate-300">Current: {data.historicalTrends[data.historicalTrends.length - 1][selectedMetric]} {metricConfig.unit}</span>
                <span>Max: {Math.max(...data.historicalTrends.map(d => d[selectedMetric]))}</span>
              </div>
            </div>

            {/* Impact Assessment Card */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-900/60 border border-slate-700/50 rounded-xl">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                  <Users className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Pop. Exposed</span>
                </div>
                <div className="text-sm font-bold font-mono text-slate-100">{data.impactedPopulation}</div>
                <div className="text-[9px] text-slate-500 mt-0.5">High-hazard buffer zones</div>
              </div>

              <div className="p-3.5 bg-slate-900/60 border border-slate-700/50 rounded-xl">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  <span className="font-semibold uppercase tracking-wider text-[10px]">Infrastructure</span>
                </div>
                <div className="text-xs font-semibold text-slate-200 mt-1 line-clamp-2">{data.infrastructureAtRisk}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MULTI-HAZARD DETAILED MATRIX */}
        {activeSubTab === 'hazards' && (
          <div className="space-y-4">
            
            {/* Hazard Score Bars */}
            <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-4 space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Comprehensive Hazard Index
              </h3>

              {data.hazardScores.map((h, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">{h.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">{h.change}</span>
                      <span className="font-mono font-bold text-xs" style={{ color: h.color }}>{h.score}/100</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${h.score}%`, backgroundColor: h.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Active Disaster Hotspots List */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Active Regional Hotspots</span>
                <span className="text-[10px] font-mono text-emerald-400 font-normal">Real-Time Sensor Sync</span>
              </h3>

              {data.hotspots.map((spot, index) => (
                <div key={index} className="p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl space-y-1.5 hover:border-slate-600 transition-colors">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-100">{spot.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold ${
                      spot.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      spot.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {spot.severity}
                    </span>
                  </div>
                  <div className="text-[10px] text-blue-400 font-mono uppercase">{spot.type}</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{spot.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXPLAINABLE AI (XAI) & PRECAUTIONS */}
        {activeSubTab === 'xai' && (
          <div className="space-y-4">
            
            {/* Sub-view toggle between SHAP Weights & Emergency Protocols */}
            <div className="flex p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] font-mono">
              <button
                onClick={() => setXaiSubMode('shap')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  xaiSubMode === 'shap'
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>SHAP Attribution</span>
              </button>
              <button
                onClick={() => setXaiSubMode('precautions')}
                className={`flex-1 py-1.5 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  xaiSubMode === 'precautions'
                    ? 'bg-red-600/30 text-red-300 border border-red-500/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                <span>Precautions ({data.precautions ? 'Active' : 'Standby'})</span>
              </button>
            </div>

            {xaiSubMode === 'shap' && (
              <div className="space-y-4">
                {/* Primary Driver */}
                <div className="p-4 bg-indigo-950/20 border border-indigo-500/30 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                      <Cpu className="w-4 h-4" />
                      Primary Inferred Driver
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono">
                      {data.xaiConfidence} Conf.
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {data.xaiPrimaryDriver}
                  </p>
                  <div className="pt-2 border-t border-indigo-500/20 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>Model: TerraNet-v4.2 Ensemble</span>
                    <span>Verification: EarthData Sync</span>
                  </div>
                </div>

                {/* Feature Importance Weights */}
                <div className="p-4 bg-slate-900/70 border border-slate-700/60 rounded-xl space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center justify-between">
                    <span>Feature Importance Weights</span>
                    <span className="text-[10px] text-slate-500 font-mono">SHAP Consensus</span>
                  </h3>

                  {data.xaiFactors.map((f, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300">{f.feature}</span>
                        <span className="font-mono text-indigo-400 font-semibold">{f.weight}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${f.weight * 2}%` }} />
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{f.value}</div>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-[11px] text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-300">Auditable Traceability: </span>
                  Inferences are calculated using pixel-level multi-spectral reflectance, SAR water expansion, and land surface temperature (LST) anomaly cross-validation.
                </div>
              </div>
            )}

            {xaiSubMode === 'precautions' && (
              <div className="space-y-3.5">
                
                {/* Immediate Life Safety (Phase 1) */}
                <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-red-300">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>Phase 1: Immediate Life Safety (T-0 to T+2h)</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-red-500/30 text-red-200">
                      CRITICAL
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {data.precautions?.immediateLifeSafety?.map((step, i) => (
                      <li key={i} className="leading-snug">{step}</li>
                    )) || (
                      <li>Immediate evacuation of primary identified risk perimeter</li>
                    )}
                  </ul>
                </div>

                {/* Infrastructure Protocols (Phase 2) */}
                <div className="p-3 bg-orange-950/20 border border-orange-500/30 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-orange-300">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                      <span>Phase 2: Critical Infrastructure Safeguards</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-orange-500/30 text-orange-200">
                      SECURITY
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {data.precautions?.infrastructureProtocols?.map((step, i) => (
                      <li key={i} className="leading-snug">{step}</li>
                    )) || (
                      <li>Isolate regional power grid sections and verify flood gate locks</li>
                    )}
                  </ul>
                </div>

                {/* Medical & Logistics (Phase 3) */}
                <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      <span>Phase 3: Medical & Supply Logistics</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-blue-500/30 text-blue-200">
                      DISPATCH
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {data.precautions?.medicalAndLogistics?.map((step, i) => (
                      <li key={i} className="leading-snug">{step}</li>
                    )) || (
                      <li>Pre-position emergency water purification kits and first-aid field posts</li>
                    )}
                  </ul>
                </div>

                {/* Satellite Tasking Priority */}
                {data.precautions?.satellitePriority && (
                  <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-lg text-[10px] font-mono text-cyan-300 flex items-center gap-2">
                    <Satellite className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Payload Priority: {data.precautions.satellitePriority}</span>
                  </div>
                )}
              </div>
            )}

            {/* Launch in AI Copilot Button */}
            {onOpenAICopilot && (
              <button
                onClick={() => onOpenAICopilot(data.name)}
                className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Cpu className="w-4 h-4 animate-pulse" />
                <span>Open Deep Neural Inference in AI Copilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

          </div>
        )}

        {/* TAB 4: SATELLITE CONSTELLATION TELEMETRY */}
        {activeSubTab === 'satellites' && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Active Downlink Constellation
            </h3>

            {data.satelliteConstellation.map((sat, i) => (
              <div key={i} className="p-3 bg-slate-900/60 border border-slate-700/50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400">
                    <Satellite className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{sat}</div>
                    <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      Direct Telemetry Active
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Revisit</span>
                  <div className="text-xs text-slate-300 font-mono">12-24h</div>
                </div>
              </div>
            ))}

            <div className="mt-4 p-3 bg-slate-900/40 border border-slate-800 rounded-xl text-[10px] text-slate-500 font-mono space-y-1">
              <div>LAST GROUND OVERPASS: 02 OCT 2026 06:45:12 UTC</div>
              <div>DATA PROTOCOL: COPERNICUS HUB / NASA EARTHDATA / ISRO BHUVAN</div>
              <div>SPECTRAL BANDS: 13-Band MSI + C-Band SAR</div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Status Bar */}
      <div className="p-3 bg-[#030712] border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>Real-Time Sensor Synchronized</span>
        </div>
        <span className="text-slate-500">UTC 06:58:30</span>
      </div>

    </div>
  );
};

export default CountryIntelligencePanel;
