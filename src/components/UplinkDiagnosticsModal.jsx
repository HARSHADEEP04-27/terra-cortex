import React, { useState } from 'react';
import { 
  Radio, Shield, Activity, Wifi, Lock, CheckCircle2, 
  RefreshCw, Server, X, ArrowUpRight, Signal
} from 'lucide-react';

const GROUND_STATIONS = [
  {
    name: 'Svalbard Satellite Station (SGS)',
    location: 'Spitsbergen, Norway (78.2° N)',
    satellite: 'Sentinel-2A & Sentinel-5P',
    freq: '8,145 MHz (X-Band)',
    snr: '24.8 dB',
    status: 'ACTIVE CONTACT',
    elevation: '42.8° Tracking'
  },
  {
    name: 'ISRO NRSC Earth Station',
    location: 'Shadnagar, Telangana (17.0° N)',
    satellite: 'EOS-04 (RISAT) & Oceansat-3',
    freq: '26,500 MHz (Ka-Band)',
    snr: '26.4 dB',
    status: 'ACTIVE CONTACT',
    elevation: '68.2° Zenital'
  },
  {
    name: 'NASA White Sands Complex (WSC)',
    location: 'New Mexico, USA (32.5° N)',
    satellite: 'Landsat-9 & Terra',
    freq: '8,212 MHz (X-Band)',
    snr: '23.1 dB',
    status: 'ACTIVE CONTACT',
    elevation: '35.4° Acquisition'
  },
  {
    name: 'Maspalomas Space Station',
    location: 'Gran Canaria, Spain (27.7° N)',
    satellite: 'Copernicus Sentinels Relay',
    freq: '8,050 MHz (X-Band)',
    snr: '25.6 dB',
    status: 'STANDBY (AOS in 8m)',
    elevation: 'Pre-Pass Horizon'
  }
];

const UplinkDiagnosticsModal = ({ isOpen, onClose }) => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null);

  if (!isOpen) return null;

  const handleLoopback = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult('ALL GROUND STATIONS VERIFIED (Zero Packet Drop • SNR > 22 dB)');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md animate-in fade-in duration-200 p-4">
      <div className="w-full max-w-xl glass-panel rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-700/60 bg-slate-900/90 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400">
              <Signal className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Satellite Uplink Diagnostics</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SECURE • CCSDS
                </span>
              </div>
              <p className="text-slate-400 text-xs font-mono mt-0.5">
                Multi-Mission Ground Tracking Station Network
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto custom-scrollbar space-y-4 text-xs font-sans">
          
          {/* Radio Frequency Telemetry Card */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Signal-to-Noise (SNR)</span>
              <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">24.8 dB</div>
              <span className="text-[9px] text-slate-500 font-mono">Margin: +12.8 dB</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Bit Error Rate (BER)</span>
              <div className="text-xl font-bold font-mono text-cyan-400 mt-0.5">1.4 × 10⁻¹⁰</div>
              <span className="text-[9px] text-slate-500 font-mono">Virtually Error-Free</span>
            </div>

            <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Encryption</span>
              <div className="text-sm font-bold font-mono text-slate-100 mt-1 flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                AES-256-GCM
              </div>
              <span className="text-[9px] text-slate-500 font-mono">Space Data Link Sec</span>
            </div>
          </div>

          {/* Ground Station Antennas List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                Active Ground Station Antennas
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">4 Global Hubs Locked</span>
            </div>

            <div className="space-y-2">
              {GROUND_STATIONS.map((station, i) => (
                <div key={i} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-200">{station.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                      station.status.includes('ACTIVE') 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {station.status}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono">
                    {station.location} • Downlink to: <span className="text-cyan-400">{station.satellite}</span>
                  </div>

                  <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80">
                    <span>RF: {station.freq}</span>
                    <span>SNR: {station.snr}</span>
                    <span>Elevation: {station.elevation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loopback Test Trigger */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleLoopback}
              disabled={isTesting}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Executing RF Loopback Ping...' : 'Run Global Station Loopback Diagnostic'}</span>
            </button>

            {testResult && (
              <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{testResult}</span>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#020617] border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span>COSPAR ID: 2026-TERRACORTEX-01</span>
          <span className="text-slate-500">CCSDS COMPLIANT</span>
        </div>

      </div>
    </div>
  );
};

export default UplinkDiagnosticsModal;
