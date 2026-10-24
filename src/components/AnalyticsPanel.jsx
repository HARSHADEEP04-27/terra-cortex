import React from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { AlertTriangle, TrendingUp, Droplets, Flame, Cpu, ArrowRight, ShieldCheck } from 'lucide-react';

const floodData = [
  { time: '00:00', level: 2.1 },
  { time: '04:00', level: 2.3 },
  { time: '08:00', level: 2.8 },
  { time: '12:00', level: 3.5 },
  { time: '16:00', level: 4.2 },
  { time: '20:00', level: 4.8 },
  { time: '24:00', level: 4.5 },
];

const thermalData = [
  { day: 'Mon', temp: 32, anomaly: 2 },
  { day: 'Tue', temp: 35, anomaly: 4 },
  { day: 'Wed', temp: 38, anomaly: 7 },
  { day: 'Thu', temp: 41, anomaly: 9 },
  { day: 'Fri', temp: 39, anomaly: 6 },
  { day: 'Sat', temp: 36, anomaly: 3 },
  { day: 'Sun', temp: 34, anomaly: 2 },
];

const AnalyticsPanel = ({ onOpenAICopilot }) => {
  return (
    <div className="absolute right-4 top-20 bottom-24 w-[24rem] glass-panel rounded-2xl flex flex-col z-10 overflow-y-auto custom-scrollbar">
      <div className="p-5 border-b border-slate-700/50 flex justify-between items-center sticky top-0 bg-slate-800/90 backdrop-blur-xl z-20">
        <div>
          <h2 className="text-slate-200 font-bold tracking-wide">REGION INTELLIGENCE</h2>
          <p className="text-slate-400 text-xs mt-1 font-mono">COORD: 34.0522° N, 118.2437° W</p>
        </div>
        <div className="px-2 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-xs font-mono">
          LIVE
        </div>
      </div>

      <div className="p-5 flex flex-col gap-6">
        {/* Risk Assessment */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Flood Risk</span>
            </div>
            <div className="text-2xl text-slate-200 font-mono mb-1">ELEVATED</div>
            <div className="text-xs text-slate-400">Probability: 68%</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <Flame className="w-4 h-4" />
              <span className="text-xs font-bold uppercase">Wildfire Risk</span>
            </div>
            <div className="text-2xl text-red-400 font-mono mb-1">CRITICAL</div>
            <div className="text-xs text-slate-400">Probability: 92%</div>
          </div>
        </div>

        {/* Flood Intelligence Chart */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-blue-400">
              <Droplets className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase">Hydrological Levels</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">+1.2m / 24h</span>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={floodData}>
                <defs>
                  <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={30} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLevel)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Thermal Anomalies */}
        <div className="bg-slate-900/50 border border-slate-700/50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-amber-400">
              <TrendingUp className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase">Thermal Anomalies</h3>
            </div>
            <span className="text-xs text-red-400 font-mono">ΔT +9.0°C</span>
          </div>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={thermalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} width={30} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                  labelStyle={{ color: '#94a3b8', fontSize: '10px' }}
                />
                <Line type="monotone" dataKey="anomaly" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
                <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Explainable Inference & Precautions Card */}
        <div className="bg-indigo-950/20 border border-indigo-500/40 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-400">
              <Cpu className="w-4 h-4 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider">AI Copilot Diagnostic</h3>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              96.8% F1
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            TerraNet-v4.2 multi-spectral fusion indicates elevated thermal-hydrological risk. Co-registered Sentinel-1 SAR and VIIRS active thermal signatures confirm anomalous baseline divergence.
          </p>

          <div className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="font-bold">Standard Mitigation Protocol:</span>
            </div>
            <div className="text-slate-400 pl-5">
              • Pre-position swift-water rescue craft<br/>
              • Maintain firebreak buffer clearance<br/>
              • Monitor orbital SAR repeat swaths
            </div>
          </div>

          {onOpenAICopilot && (
            <button
              onClick={() => onOpenAICopilot('Region Intelligence Analysis')}
              className="w-full py-2 px-3 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Open in Explainable AI Core</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;
