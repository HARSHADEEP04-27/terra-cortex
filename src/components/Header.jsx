import React from 'react';
import { 
  Globe2, 
  Activity, 
  Layers, 
  Cpu, 
  Settings, 
  Map, 
  Database,
  CloudLightning,
  Wind
} from 'lucide-react';

const Header = ({ activeTab, setActiveTab, onOpenUplink, onOpenDataSources }) => {
  const menuItems = [
    { icon: Globe2, label: 'Global View' },
    { icon: Wind, label: 'Atmosphere & Ozone' },
    { icon: Map, label: 'Region Analysis' },
    { icon: Layers, label: 'Data Layers' },
    { icon: Activity, label: 'Real-time Alerts' },
    { icon: CloudLightning, label: 'Weather Systems' },
    { icon: Database, label: 'Data Sources' },
    { icon: Cpu, label: 'AI Models' },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 h-16 bg-[#050810]/95 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between px-4 md:px-6 z-20 transition-all duration-300">
      
      {/* Logo & Branding */}
      <div className="flex items-center gap-3">
        <Globe2 className="w-8 h-8 text-blue-500 shrink-0" />
        <div className="hidden md:block">
          <h1 className="text-slate-100 font-bold tracking-[0.2em] text-xs">TERRACORTEX</h1>
          <p className="text-orange-500 text-[9px] uppercase tracking-widest font-mono mt-0.5">ISRO / NRSC Command</p>
        </div>
      </div>

      {/* Center Navigation */}
      <div className="flex flex-1 justify-center overflow-x-auto custom-scrollbar px-4 h-full">
        <div className="flex items-center h-full gap-1 md:gap-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.label;
            return (
              <button
                key={index}
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center h-full px-3 md:px-4 transition-all duration-200 group relative
                  ${isActive 
                    ? 'text-blue-400 bg-blue-900/10' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
                title={item.label}
              >
                {/* Active Indicator Line (Bottom) */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>
                )}
                
                <Icon className={`w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0 ${item.label === 'Real-time Alerts' ? 'text-red-400 animate-pulse' : ''}`} />
                <span className="ml-1.5 text-[9px] xl:text-[10.5px] font-bold tracking-wide uppercase whitespace-nowrap">{item.label}</span>
                {item.label === 'Real-time Alerts' && (
                  <span className="ml-1 px-1 py-0.2 rounded-full text-[7.5px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/40 hidden sm:inline animate-pulse">
                    6 LIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right - Status & Data Transparency */}
      <div className="flex items-center gap-3 border-l border-slate-800/80 pl-4 md:pl-6 h-full">
        <button
          onClick={onOpenDataSources}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-950/30 hover:bg-orange-900/40 border border-orange-500/40 text-orange-300 text-[9px] font-mono font-bold transition-all cursor-pointer"
          title="Inspect Open Data Pedigree (ISRO Missions, NASA EONET, USGS, SGP4 Engine)"
        >
          <Database className="w-3.5 h-3.5 text-orange-400" />
          <span>DATA PEDIGREE</span>
        </button>

        <button 
          onClick={onOpenUplink}
          className="hidden xl:flex flex-col items-end justify-center hover:bg-slate-800/60 p-1.5 rounded-lg transition-colors group cursor-pointer text-right"
          title="Click to inspect Ground Station & RF Uplink Diagnostics"
        >
          <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest group-hover:text-slate-300">Uplink Telemetry</span>
          <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1 font-bold">
            <span className="relative flex h-1.5 w-1.5 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            NRSC SHADNAGAR
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
