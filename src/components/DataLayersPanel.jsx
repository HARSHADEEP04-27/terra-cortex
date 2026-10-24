import React, { useState } from 'react';
import { Layers, Eye, EyeOff, Radio, Database, SlidersHorizontal } from 'lucide-react';

const DataLayersPanel = () => {
  const [layers, setLayers] = useState([
    { id: 'flood', name: 'Flood Intelligence', satellite: 'Sentinel-1 SAR', resolution: '10m', active: true, color: 'text-blue-400', bg: 'bg-blue-500' },
    { id: 'forest', name: 'Forest Monitoring', satellite: 'Landsat-8', resolution: '30m', active: false, color: 'text-emerald-400', bg: 'bg-emerald-500' },
    { id: 'thermal', name: 'Thermal Anomalies', satellite: 'MODIS/VIIRS', resolution: '375m', active: true, color: 'text-amber-400', bg: 'bg-amber-500' },
    { id: 'ndvi', name: 'Vegetation Index (NDVI)', satellite: 'Sentinel-2 MSI', resolution: '10m', active: false, color: 'text-green-400', bg: 'bg-green-500' },
    { id: 'aerosol', name: 'Aerosol Optical Depth', satellite: 'Terra', resolution: '1km', active: false, color: 'text-purple-400', bg: 'bg-purple-500' },
  ]);

  const toggleLayer = (id) => {
    setLayers(layers.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  return (
    <div className="absolute right-4 top-20 bottom-24 w-[24rem] glass-panel rounded-2xl flex flex-col z-10 overflow-hidden">
      <div className="p-5 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/90 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Layers className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-slate-200 font-bold tracking-wide uppercase text-sm">Active Data Layers</h2>
            <p className="text-slate-400 text-[10px] uppercase font-mono mt-0.5">Multiplexed Sensor Feed</p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
        {layers.map((layer) => (
          <div 
            key={layer.id} 
            className={`border rounded-xl p-4 transition-all duration-300 ${layer.active ? 'bg-slate-800/80 border-slate-600' : 'bg-slate-900/50 border-slate-800/50 opacity-70'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${layer.active ? layer.bg : 'bg-slate-600'}`}></div>
                <h3 className={`font-semibold text-sm ${layer.active ? 'text-slate-200' : 'text-slate-400'}`}>{layer.name}</h3>
              </div>
              <button 
                onClick={() => toggleLayer(layer.id)}
                className={`p-1.5 rounded-md transition-colors ${layer.active ? 'bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30' : 'bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300'}`}
              >
                {layer.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-slate-900/80 rounded border border-slate-800 p-2 flex items-center gap-2">
                <Radio className="w-3 h-3 text-slate-500" />
                <div>
                  <div className="text-[9px] text-slate-500 uppercase">Instrument</div>
                  <div className="text-xs text-slate-300 font-mono">{layer.satellite}</div>
                </div>
              </div>
              <div className="bg-slate-900/80 rounded border border-slate-800 p-2 flex items-center gap-2">
                <Database className="w-3 h-3 text-slate-500" />
                <div>
                  <div className="text-[9px] text-slate-500 uppercase">Resolution</div>
                  <div className="text-xs text-slate-300 font-mono">{layer.resolution}</div>
                </div>
              </div>
            </div>
            
            {layer.active && (
              <div className="mt-3 pt-3 border-t border-slate-700/50">
                <div className="flex justify-between text-[10px] uppercase text-slate-500 mb-1">
                  <span>Opacity</span>
                  <span className="font-mono">85%</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${layer.bg}`} style={{ width: '85%' }}></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataLayersPanel;
