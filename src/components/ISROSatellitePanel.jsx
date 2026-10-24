import React, { useState, useMemo } from 'react';
import { 
  X, Satellite, Radio, Eye, Database, CheckCircle2, 
  MapPin, Clock, Zap, Globe, ChevronRight, Layers, 
  Activity, ChevronDown, ChevronUp, Radar, Navigation 
} from 'lucide-react';

const getStatus = (lat, lng) => {
  if (lat == null || lng == null) return 'Unknown Position';
  if (lat >= 8 && lat <= 35 && lng >= 68 && lng <= 97) return 'Over India';
  if (lat >= -5 && lat < 8 && lng >= 55 && lng <= 97) return 'Approaching India';
  return 'Over Ocean/Region';
};

const Section = ({ title, icon: Icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-700/60 last:border-0">
      <div 
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-800/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 text-cyan-400">
          {Icon && <Icon size={16} />}
          <span className="text-xs font-semibold uppercase tracking-wider">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
      </div>
      {isOpen && <div className="p-3 pt-0">{children}</div>}
    </div>
  );
};

const ISROSatellitePanel = ({ 
  isroSatellites = [],
  selectedSatellite,
  onSelectSatellite,
  onClose,
  realHazards = [],
}) => {
  
  const stats = useMemo(() => {
    return isroSatellites.reduce((acc, sat) => {
      const type = sat.coverageType || 'other';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
  }, [isroSatellites]);

  return (
    <div className="absolute right-4 top-16 z-30 w-full max-w-[380px] max-h-[85vh] overflow-hidden glass-panel flex flex-col text-slate-200 border border-slate-700/60 rounded-xl shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-transparent shrink-0">
        <div className="flex items-center gap-2 text-orange-400">
          <Satellite size={20} />
          <h2 className="font-bold tracking-wide">ISRO Constellation</h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-mono border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            {isroSatellites.length} LIVE
          </div>
          <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
        
        {/* Satellite Detail Card */}
        {selectedSatellite && (
          <div className="p-4 border-b border-cyan-500/30 bg-cyan-900/10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-cyan-300">{selectedSatellite.displayName || selectedSatellite.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedSatellite.mission}</p>
              </div>
              <div className="text-3xl" style={{ color: selectedSatellite.color || '#fb923c' }}>
                {selectedSatellite.icon || '🛰️'}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono mb-4">
              <div className="bg-slate-950/50 p-2 border border-slate-800 rounded">
                <div className="text-slate-500 mb-1">LAUNCH DATE</div>
                <div className="text-slate-200">{selectedSatellite.launchDate || 'N/A'}</div>
              </div>
              <div className="bg-slate-950/50 p-2 border border-slate-800 rounded">
                <div className="text-slate-500 mb-1">VEHICLE</div>
                <div className="text-slate-200">{selectedSatellite.launchVehicle || 'N/A'}</div>
              </div>
              <div className="bg-slate-950/50 p-2 border border-slate-800 rounded">
                <div className="text-slate-500 mb-1">ORBIT TYPE</div>
                <div className="text-slate-200">{selectedSatellite.orbitType || 'N/A'}</div>
              </div>
              <div className="bg-slate-950/50 p-2 border border-slate-800 rounded">
                <div className="text-slate-500 mb-1">INCLINATION</div>
                <div className="text-slate-200">{selectedSatellite.inclination ? `${selectedSatellite.inclination}°` : 'N/A'}</div>
              </div>
              <div className="bg-slate-950/50 p-2 border border-slate-800 rounded">
                <div className="text-slate-500 mb-1">PERIOD</div>
                <div className="text-slate-200">{selectedSatellite.period ? `${selectedSatellite.period}m` : 'N/A'}</div>
              </div>
              <div className="bg-slate-950/50 p-2 border border-slate-800 rounded">
                <div className="text-slate-500 mb-1">NORAD ID</div>
                <div className="text-cyan-400">{selectedSatellite.noradId || 'N/A'}</div>
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-700/50 rounded p-3 mb-3">
              <div className="text-[10px] font-bold text-slate-400 uppercase mb-2 flex items-center gap-1">
                <Radio size={12} /> Sensor / Payload
              </div>
              <div className="text-sm font-medium text-slate-200 mb-2">{selectedSatellite.sensor || 'Unknown Sensor'}</div>
              <div className="flex gap-4 text-[10px] font-mono text-slate-400">
                <div>RES: <span className="text-slate-200">{selectedSatellite.resolution || 'N/A'}</span></div>
                <div>SWATH: <span className="text-slate-200">{selectedSatellite.swathWidth ? `${selectedSatellite.swathWidth}km` : 'N/A'}</span></div>
              </div>
            </div>

            {selectedSatellite.primaryUses && (
              <div className="mb-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Primary Uses</div>
                <div className="flex flex-wrap gap-1">
                  {selectedSatellite.primaryUses.map((use, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[9px] rounded-full border border-slate-700">
                      {use}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between bg-slate-950/80 p-2 rounded border border-slate-800">
              <div className="flex items-center gap-2">
                {selectedSatellite.isDeepSpace ? (
                  <>
                    <span className="text-xs">☀️</span>
                    <span className="text-xs font-mono text-amber-300">
                      Sun–Earth L1 Halo Orbit (~1.5M km)
                    </span>
                  </>
                ) : selectedSatellite.isGeostationary ? (
                  <>
                    <MapPin size={14} className="text-amber-400" />
                    <span className="text-xs font-mono text-amber-200">
                      0.00° N, 74.00° E (GEO Meridian)
                    </span>
                  </>
                ) : (
                  <>
                    <MapPin size={14} className="text-emerald-400" />
                    <span className="text-xs font-mono text-slate-200">
                      {selectedSatellite.lat?.toFixed(2)}°, {selectedSatellite.lng?.toFixed(2)}°
                    </span>
                  </>
                )}
              </div>
              <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border ${
                selectedSatellite.isDeepSpace 
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
                  : selectedSatellite.isGeostationary 
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' 
                  : 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
              }`}>
                <Activity size={10} /> 
                {selectedSatellite.isDeepSpace ? 'L1 HALO' : selectedSatellite.isGeostationary ? 'GEO SLOT' : 'LIVE SGP4'}
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        <Section title="Live Tracking" icon={Clock}>
          <div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto pr-1">
            {isroSatellites.map(sat => {
              const isSelected = selectedSatellite?.id === sat.id;
              const displayStatus = sat.isDeepSpace
                ? 'Sun–Earth L1 Halo Orbit'
                : sat.isGeostationary
                ? 'GEO Position: ~74.0°E'
                : (sat.currentRegion ? sat.currentRegion.replace('Current Ground Track: ', '').replace('Current Observation Sector: ', '') : 'Tracking');
              
              const statusColor = sat.isDeepSpace
                ? 'text-amber-400'
                : sat.isGeostationary
                ? 'text-amber-300'
                : displayStatus.includes('India')
                ? 'text-orange-400'
                : 'text-slate-400';
              
              return (
                <div 
                  key={sat.id}
                  onClick={() => onSelectSatellite?.(sat)}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer border transition-colors ${
                    isSelected ? 'bg-cyan-900/20 border-cyan-500/50' : 'bg-slate-800/30 border-transparent hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: sat.color || '#fb923c' }} />
                    <div>
                      <div className="text-xs font-bold text-slate-200">{sat.displayName || sat.name}</div>
                      <div className={`text-[10px] truncate max-w-[170px] ${statusColor}`}>{displayStatus}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-cyan-300">
                      {sat.isDeepSpace ? '1.5M km' : sat.alt ? `${Math.round(sat.alt)} km` : 'N/A'}
                    </div>
                    <div className="text-[9px] font-mono text-slate-500">{sat.velocity ? `${sat.velocity.toFixed(2)} km/s` : ''}</div>
                  </div>
                </div>
              );
            })}
            {isroSatellites.length === 0 && (
              <div className="text-xs text-slate-500 text-center py-4">No satellites tracked</div>
            )}
          </div>
        </Section>

        {/* Sensor Matrix */}
        <Section title="Payload Matrix" icon={Database} defaultOpen={false}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead className="bg-slate-800/50 text-slate-400">
                <tr>
                  <th className="p-2 font-medium">Satellite</th>
                  <th className="p-2 font-medium">Sensor</th>
                  <th className="p-2 font-medium">Swath</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {isroSatellites.map(sat => (
                  <tr key={sat.id} className="hover:bg-slate-800/30">
                    <td className="p-2 font-medium text-slate-300 whitespace-nowrap">{sat.name}</td>
                    <td className="p-2 text-slate-400 truncate max-w-[120px]">{sat.sensor || sat.mission || '-'}</td>
                    <td className="p-2 font-mono text-cyan-400">{sat.swathWidth ? `${sat.swathWidth}km` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Coverage Layers */}
        <Section title="Coverage Toggles" icon={Layers} defaultOpen={true}>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'optical', label: 'Optical', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
              { id: 'radar', label: 'Radar', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
              { id: 'weather', label: 'Weather', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
              { id: 'ocean', label: 'Ocean', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' }
            ].map(layer => (
              <button key={layer.id} className={`flex flex-col items-center justify-center p-2 rounded border ${layer.color} hover:brightness-110 transition-all`}>
                <span className="text-[10px] font-bold uppercase tracking-wider">{layer.label}</span>
                <span className="text-xs font-mono mt-1">{stats[layer.id] || 0} SATS</span>
              </button>
            ))}
          </div>
        </Section>
      </div>

      {/* Data Sources Footer */}
      <div className="bg-slate-950 p-3 border-t border-slate-800 mt-auto shrink-0">
        <div className="text-[9px] font-mono text-slate-400 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1"><Satellite size={10}/> ISRO Missions</span>
            <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={10}/> {isroSatellites.length} tracked</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1"><Globe size={10}/> NASA EONET</span>
            <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={10}/> Connected</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1"><Activity size={10}/> USGS Seismology</span>
            <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={10}/> Connected</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-1"><Zap size={10}/> CelesTrak TLE</span>
            <span className="text-emerald-500 flex items-center gap-1"><CheckCircle2 size={10}/> SGP4 Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ISROSatellitePanel;
