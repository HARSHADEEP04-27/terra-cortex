import React, { useState } from 'react';
import { 
  Satellite, 
  Layers, 
  Radio, 
  Crosshair, 
  Compass, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  Eye, 
  Sparkles, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

const COVERAGE_FILTERS = [
  { id: 'ALL', label: 'ALL', color: '#94a3b8' },
  { id: 'RADAR', label: 'RADAR (SAR)', color: '#fb923c' },
  { id: 'OPTICAL', label: 'OPTICAL', color: '#f59e0b' },
  { id: 'OCEAN', label: 'OCEAN', color: '#06b6d4' },
  { id: 'WEATHER', label: 'WEATHER', color: '#a78bfa' },
  { id: 'SOLAR', label: 'SOLAR (L1)', color: '#fbbf24' },
];

const ISROFleetTimeline = ({ 
  satellites = [], 
  selectedSatellite, 
  onSelectSatellite, 
  activeFilter = 'ALL', 
  onFilterChange 
}) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const filteredSatellites = satellites.filter(sat => {
    if (activeFilter === 'ALL') return true;
    return sat.coverageType === activeFilter;
  });

  return (
    <div className={`absolute bottom-16 left-4 md:left-6 z-20 transition-all duration-300 ${
      isMinimized ? 'w-auto' : 'w-[94vw] md:w-[380px]'
    }`}>
      <div className="glass-panel rounded-2xl border border-orange-500/40 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-orange-400">
              <Satellite className="w-4 h-4 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-slate-100 tracking-wide uppercase">
                  ISRO Fleet Timeline
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-orange-500/30 text-orange-300 border border-orange-500/40 animate-pulse">
                  {satellites.length} ACTIVE
                </span>
              </div>
              <span className="text-[8px] font-mono text-slate-400 block">
                Live SGP4 Orbital Overpasses
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            title={isMinimized ? 'Expand Fleet Timeline' : 'Minimize Fleet Timeline'}
          >
            {isMinimized ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Content Body when not minimized */}
        {!isMinimized && (
          <div className="p-3 space-y-3">
            
            {/* Sensor / Coverage Layer Filters (Feature 5) */}
            <div>
              <div className="text-[8px] font-mono uppercase text-slate-400 font-bold mb-1.5 flex items-center justify-between">
                <span>Coverage Sensor Layer</span>
                <span className="text-cyan-400">{filteredSatellites.length} Selected</span>
              </div>
              <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1">
                {COVERAGE_FILTERS.map(filter => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => onFilterChange && onFilterChange(filter.id)}
                      className={`px-2 py-1 rounded-lg text-[8px] font-mono font-bold whitespace-nowrap transition-all border cursor-pointer ${
                        isActive
                          ? 'bg-slate-800 text-white shadow-md'
                          : 'bg-slate-900/40 text-slate-400 border-slate-800/80 hover:text-slate-200'
                      }`}
                      style={{
                        borderColor: isActive ? filter.color : undefined,
                        boxShadow: isActive ? `0 0 10px ${filter.color}40` : undefined,
                      }}
                    >
                      {filter.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Satellite Live Timeline List (Feature 2) */}
            <div className="space-y-1.5 max-h-[260px] overflow-y-auto custom-scrollbar pr-0.5">
              {filteredSatellites.map(sat => {
                const isSelected = selectedSatellite?.id === sat.id;
                return (
                  <div
                    key={sat.id}
                    onClick={() => onSelectSatellite && onSelectSatellite(sat)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-orange-950/40 border-orange-500/80 shadow-lg'
                        : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0 border"
                        style={{
                          backgroundColor: `${sat.color}15`,
                          borderColor: `${sat.color}40`,
                        }}
                      >
                        {sat.icon}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-bold font-mono text-slate-100 truncate">
                            {sat.displayName}
                          </span>
                          <span 
                            className="text-[7.5px] font-mono font-bold px-1 rounded uppercase shrink-0"
                            style={{
                              backgroundColor: `${sat.color}20`,
                              color: sat.color,
                              border: `1px solid ${sat.color}40`,
                            }}
                          >
                            {sat.coverageType}
                          </span>
                        </div>

                        {/* Live Region & Sub-Satellite dynamics */}
                        <div className="text-[8.5px] font-mono text-slate-300 truncate mt-0.5 flex items-center gap-1">
                          <Compass className="w-2.5 h-2.5 text-orange-400 shrink-0" />
                          <span className="text-orange-300 font-semibold truncate">{sat.currentRegion}</span>
                        </div>

                        <div className="text-[8px] font-mono text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>
                            {sat.isDeepSpace ? 'Dist: ' : 'Alt: '}
                            <strong className="text-slate-200">
                              {sat.isDeepSpace ? '~1.5M km (L1)' : `${sat.alt.toFixed(0)} km`}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>Vel: <strong className="text-slate-200">{sat.velocity} km/s</strong></span>
                        </div>
                      </div>
                    </div>

                    <button 
                      className={`px-2 py-1 rounded-lg text-[8px] font-mono font-bold transition-all shrink-0 ml-2 flex items-center gap-1 ${
                        isSelected 
                          ? 'bg-orange-500 text-white shadow-md' 
                          : 'bg-slate-800 text-slate-300 group-hover:bg-orange-500/30 group-hover:text-orange-200'
                      }`}
                    >
                      <Crosshair className="w-2.5 h-2.5" />
                      {sat.isDeepSpace ? 'SOLAR' : sat.isGeostationary ? 'FULL DISK' : 'SWATH'}
                    </button>
                  </div>
                );
              })}

              {filteredSatellites.length === 0 && (
                <div className="text-center py-6 text-slate-500 font-mono text-xs">
                  No satellites matching this sensor category.
                </div>
              )}
            </div>

            {/* Live Indicator footer */}
            <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[7.5px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Orbit Propagator: SGP4 / SDP4</span>
              </span>
              <span className="text-orange-400 font-bold">ISRO / NRSC</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ISROFleetTimeline;
