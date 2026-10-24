import React, { useState, useEffect } from 'react';
import { Satellite, Radio, Clock, Activity, Cpu, Wifi, ArrowDownCircle } from 'lucide-react';

const SATELLITE_CHANNELS = [
  { 
    id: 's2a',
    name: 'Sentinel-2A (MSI)', 
    agency: 'ESA Copernicus', 
    band: 'X-Band 8.1 GHz', 
    baseDownlink: 480, 
    lat: 21.42, 
    lng: 79.18, 
    alt: '786 km',
    spectral: '13 Bands (VNIR/SWIR)',
    color: '#38bdf8'
  },
  { 
    id: 'l9',
    name: 'Landsat-9 (OLI-2/TIRS-2)', 
    agency: 'NASA / USGS', 
    band: 'Ka-Band 26 GHz', 
    baseDownlink: 384, 
    lat: 37.09, 
    lng: -95.71, 
    alt: '705 km',
    spectral: 'Thermal Infrared + Panchromatic',
    color: '#34d399'
  },
  { 
    id: 'eos4',
    name: 'EOS-04 RISAT-1A', 
    agency: 'ISRO', 
    band: 'C-Band 5.35 GHz SAR', 
    baseDownlink: 520, 
    lat: 14.18, 
    lng: 80.02, 
    alt: '529 km',
    spectral: 'Full Polarimetric SAR',
    color: '#fb923c'
  },
  { 
    id: 'iss',
    name: 'ISS (Expedition 76)', 
    agency: 'NASA/ESA/JAXA/CSA', 
    band: 'Ku-Band TDRSS', 
    baseDownlink: 600, 
    lat: -12.45, 
    lng: 45.28, 
    alt: '420 km',
    spectral: 'ECOSTRESS + GEDI Lidar',
    color: '#f43f5e'
  },
  { 
    id: 's5p',
    name: 'Sentinel-5P (TROPOMI)', 
    agency: 'ESA Earth Observation', 
    band: 'S-Band 2.2 GHz', 
    baseDownlink: 310, 
    lat: 51.50, 
    lng: -0.12, 
    alt: '824 km',
    spectral: 'UV-VIS-NIR-SWIR Atmospheric',
    color: '#06b6d4'
  }
];

const LiveMonitoring = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeSatIndex, setActiveSatIndex] = useState(0);
  const [bitrateJitter, setBitrateJitter] = useState(482);
  const [ingestedTiles, setIngestedTiles] = useState(142850);
  const [latencyMs, setLatencyMs] = useState(24);
  const [snrDb, setSnrDb] = useState(14.2);

  // Live Real-Time 1-second pulse
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setIngestedTiles((prev) => prev + Math.floor(Math.random() * 8 + 4));
      setBitrateJitter(
        SATELLITE_CHANNELS[activeSatIndex].baseDownlink + 
        Math.floor(Math.sin(now.getTime() / 1200) * 16)
      );
      setLatencyMs(22 + Math.floor(Math.random() * 5));
      setSnrDb(+(14.0 + Math.sin(now.getTime() / 2500) * 0.8).toFixed(1));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeSatIndex]);

  // Smooth satellite downlink auto-cycling every 7 seconds
  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setActiveSatIndex((prev) => (prev + 1) % SATELLITE_CHANNELS.length);
    }, 7000);
    return () => clearInterval(cycleTimer);
  }, []);

  const sat = SATELLITE_CHANNELS[activeSatIndex];

  // Live formatted Zulu UTC timestamp
  const utcString = currentTime.toUTCString().replace('GMT', 'UTC');
  const localString = currentTime.toLocaleTimeString();

  return (
    <div className="absolute bottom-3 left-3 right-3 xl:left-6 xl:right-6 h-14 glass-panel rounded-xl flex items-center justify-between px-3 md:px-6 z-20 border border-slate-700/60 shadow-2xl backdrop-blur-xl overflow-x-auto whitespace-nowrap custom-scrollbar">
      
      {/* Left: Operational Link Status & Active Telemetry Feed */}
      <div className="flex items-center gap-4 md:gap-6 text-xs text-slate-300 font-mono">
        
        {/* Live System Optimal Indicator */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold tracking-wider text-[10px] uppercase">LIVE UPLINK</span>
          <span className="text-[9px] text-emerald-300/80">({latencyMs}ms)</span>
        </div>

        <div className="h-4 w-px bg-slate-700 hidden sm:block"></div>

        {/* Live Satellite Downlink Channel */}
        <div className="flex items-center gap-2">
          <Satellite className="w-4 h-4" style={{ color: sat.color }} />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-100">{sat.name}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {sat.band}
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-slate-700 hidden md:block"></div>

        {/* Dynamic Downlink Bitrate with Real-time Jitter */}
        <div className="hidden md:flex items-center gap-2 text-cyan-400">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>Downlink: <span className="font-bold text-cyan-200">{bitrateJitter} Mbps</span></span>
          <span className="text-[10px] text-slate-400">SNR: {snrDb} dB</span>
        </div>

        <div className="h-4 w-px bg-slate-700 hidden lg:block"></div>

        {/* Live Google Earth Engine Ingestion Stream */}
        <div className="hidden lg:flex items-center gap-1.5 text-amber-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>GEE Pipeline:</span>
          <span className="font-bold text-amber-200 font-mono">
            {ingestedTiles.toLocaleString()} tiles/s
          </span>
        </div>
      </div>

      {/* Right: Live Real-Time Clocks (UTC Zulu & Local Time) */}
      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono shrink-0 ml-4">
        
        {/* Sub-Satellite Point coordinates */}
        <div className="hidden xl:flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          <span className="text-slate-500">SSP:</span>
          <span className="text-blue-400 font-bold">{sat.lat.toFixed(2)}°N, {sat.lng.toFixed(2)}°E</span>
          <span className="text-slate-500 text-[9px]">({sat.alt})</span>
        </div>

        {/* Real-Time UTC Zulu Clock */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700/80 text-cyan-300 shadow-inner">
          <Clock className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '60s' }} />
          <span className="font-bold tracking-wider text-[11px]">{utcString}</span>
        </div>

        {/* Local time badge */}
        <div className="hidden sm:block text-[10px] text-slate-400 font-mono">
          LOC: <span className="text-slate-200 font-semibold">{localString}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
