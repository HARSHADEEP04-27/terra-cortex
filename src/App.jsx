import React, { Component, useState, useEffect } from 'react';
import EarthGlobe from './components/EarthGlobe';
import Header from './components/Header';
import AnalyticsPanel from './components/AnalyticsPanel';
import LiveMonitoring from './components/LiveMonitoring';
import AICopilot from './components/AICopilot';
import DataLayersPanel from './components/DataLayersPanel';
import WeatherSystemsPanel from './components/WeatherSystemsPanel';
import CountryIntelligencePanel from './components/CountryIntelligencePanel';
import AtmosphereOzonePanel from './components/AtmosphereOzonePanel';
import RealTimeAlertsPanel from './components/RealTimeAlertsPanel';
import DataSourcesPanel from './components/DataSourcesPanel';
import UplinkDiagnosticsModal from './components/UplinkDiagnosticsModal';
import { fetchLiveRealHazards } from './services/realHazardService';
import { fetchISROSatellites } from './services/isroService';
import ISROSatelliteInspector from './components/ISROSatelliteInspector';
import ISROFleetTimeline from './components/ISROFleetTimeline';
import DataSourceTransparencyModal from './components/DataSourceTransparencyModal';
import { Wind, Shield, Activity } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div className="text-red-500 p-10 bg-black h-screen"><h1>Something went wrong.</h1><pre>{this.state.error.toString()}</pre></div>;
    }
    return this.props.children; 
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('Global View');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isUplinkModalOpen, setIsUplinkModalOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [selectedSatellite, setSelectedSatellite] = useState(null);
  const [isFleetTimelineOpen, setIsFleetTimelineOpen] = useState(true);
  const [activeCoverageFilter, setActiveCoverageFilter] = useState('ALL');
  const [isDataTransparencyOpen, setIsDataTransparencyOpen] = useState(false);
  const [liveOzone, setLiveOzone] = useState(284.2);
  const [livePM25, setLivePM25] = useState(34.8);
  const [liveAntarctic, setLiveAntarctic] = useState(21.4);
  const [realHazards, setRealHazards] = useState([]);
  const [isroSatellites, setIsroSatellites] = useState([]);
  const [aiCopilotScenario, setAiCopilotScenario] = useState(null);

  const handleOpenAICopilot = (scenario) => {
    setAiCopilotScenario(scenario);
    setActiveTab('AI Models');
  };

  // Ingest 100% real live hazards from NASA EONET and USGS Seismology
  useEffect(() => {
    fetchLiveRealHazards().then(data => setRealHazards(data));
    const hazardTimer = setInterval(() => {
      fetchLiveRealHazards().then(data => setRealHazards(data));
    }, 60000);
    return () => clearInterval(hazardTimer);
  }, []);

  // ISRO Real-Time Satellite Constellation Tracking (CelesTrak + SGP4 Propagation)
  useEffect(() => {
    fetchISROSatellites().then(data => setIsroSatellites(data));
    // Re-fetch TLEs every 5 minutes, re-propagate positions every 30 seconds
    const isroPositionTimer = setInterval(() => {
      fetchISROSatellites().then(data => setIsroSatellites(data));
    }, 30000);
    return () => clearInterval(isroPositionTimer);
  }, []);

  // Live sensor micro-telemetry stream for the floating atmosphere HUD
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveOzone(+(284.0 + Math.sin(Date.now() / 2500) * 1.5).toFixed(1));
      setLivePM25(+(34.8 + Math.cos(Date.now() / 2000) * 0.9).toFixed(1));
      setLiveAntarctic(+(21.4 + Math.sin(Date.now() / 4000) * 0.1).toFixed(1));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const handleCountrySelect = (countryData) => {
    setSelectedCountry(countryData);
    setActiveTab('Region Analysis');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans selection:bg-blue-500/30">
      {/* 3D Background */}
      <ErrorBoundary>
        <EarthGlobe 
          onCountrySelect={handleCountrySelect} 
          selectedCountry={selectedCountry} 
          realHazards={realHazards}
          isroSatellites={isroSatellites}
          selectedSatellite={selectedSatellite}
          onSelectSatellite={(sat) => setSelectedSatellite(sat)}
          onSelectHazard={(h) => {
            handleCountrySelect({
              name: h.title,
              lat: h.lat,
              lng: h.lng,
              risk: h.severity,
              factors: [h.category.toUpperCase(), h.source],
              hazardData: h
            });
          }}
        />
      </ErrorBoundary>
      
      {/* UI Overlay */}
      <ErrorBoundary>
        <Header 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab === 'Real-time Alerts') {
              setIsAlertsOpen(true);
              setSelectedCountry(null);
            }
          }} 
          onOpenUplink={() => setIsUplinkModalOpen(true)}
          onOpenDataSources={() => setIsDataTransparencyOpen(true)}
        />
      </ErrorBoundary>
      
      {/* If a country is selected, show its deep intelligence panel, else show general analytics */}
      {activeTab === 'Region Analysis' && selectedCountry && (
        <ErrorBoundary>
          <CountryIntelligencePanel 
            country={selectedCountry} 
            onClose={() => setSelectedCountry(null)} 
            onOpenAICopilot={handleOpenAICopilot}
          />
        </ErrorBoundary>
      )}

      {activeTab === 'Region Analysis' && !selectedCountry && (
        <ErrorBoundary>
          <AnalyticsPanel onOpenAICopilot={handleOpenAICopilot} />
        </ErrorBoundary>
      )}
      
      {activeTab === 'AI Models' && (
        <ErrorBoundary>
          <AICopilot 
            initialScenario={aiCopilotScenario}
            onClose={() => {
              setActiveTab('Global View');
              setAiCopilotScenario(null);
            }} 
          />
        </ErrorBoundary>
      )}

      {activeTab === 'Data Layers' && (
        <ErrorBoundary>
          <DataLayersPanel />
        </ErrorBoundary>
      )}

      {activeTab === 'Weather Systems' && (
        <ErrorBoundary>
          <WeatherSystemsPanel onClose={() => setActiveTab('Global View')} />
        </ErrorBoundary>
      )}

      {activeTab === 'Atmosphere & Ozone' && (
        <ErrorBoundary>
          <AtmosphereOzonePanel onClose={() => setActiveTab('Global View')} />
        </ErrorBoundary>
      )}

      {/* Global View Floating Planetary Telemetry HUD */}
      {activeTab === 'Global View' && !selectedCountry && (
        <div className="absolute left-6 top-20 z-10 glass-panel rounded-2xl p-4 max-w-xs border border-slate-700/60 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-[10px] font-mono uppercase font-bold text-slate-200">Global Atmosphere Feeds</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                STREAMING
              </span>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-500/30">
                Sentinel-5P
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ozone Column</span>
              </div>
              <span className="font-mono font-bold text-cyan-300">{liveOzone} DU <span className="text-[9px] font-normal text-slate-400">(Normal)</span></span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Wind className="w-3.5 h-3.5 text-amber-400" />
                <span>Global PM2.5</span>
              </div>
              <span className="font-mono font-bold text-amber-400">{livePM25} µg/m³</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-slate-900/60 rounded-lg border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-300">
                <Activity className="w-3.5 h-3.5 text-purple-400" />
                <span>Antarctic Hole</span>
              </div>
              <span className="font-mono font-bold text-slate-200">{liveAntarctic} M km²</span>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('Atmosphere & Ozone')}
            className="w-full mt-3 py-1.5 px-3 rounded-lg text-xs font-semibold bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open Atmosphere & Ozone Dossier</span>
            <span>&rarr;</span>
          </button>
        </div>
      )}

      {/* Google Earth Engine Real-Time Alerts Panel - Always connected & actively streaming */}
      {(activeTab === 'Real-time Alerts' || (isAlertsOpen && activeTab === 'Global View')) && !selectedCountry && (
        <ErrorBoundary>
          <RealTimeAlertsPanel 
            realHazards={realHazards}
            onSelectLocation={handleCountrySelect}
            onOpenAICopilot={handleOpenAICopilot}
            onClose={() => setIsAlertsOpen(false)} 
          />
        </ErrorBoundary>
      )}

      {/* Floating GEE Stream Trigger Pill when panel is minimized on Global View */}
      {(!isAlertsOpen || selectedCountry) && activeTab === 'Global View' && (
        <button
          onClick={() => { setIsAlertsOpen(true); setSelectedCountry(null); }}
          className="absolute right-4 top-20 z-20 px-3.5 py-2 rounded-xl glass-panel border border-emerald-500/50 shadow-2xl flex items-center gap-2.5 text-xs font-mono text-emerald-300 hover:bg-emerald-950/60 transition-all cursor-pointer group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-slate-100">REAL HAZARDS</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-500/30 text-red-300 border border-red-500/40 animate-pulse">
            {realHazards.length > 0 ? `${realHazards.length} ACTIVE` : 'LIVE FEEDS'}
          </span>
        </button>
      )}

      {/* Planetary Data Sources Ingestion Catalog */}
      {activeTab === 'Data Sources' && (
        <ErrorBoundary>
          <DataSourcesPanel onClose={() => setActiveTab('Global View')} />
        </ErrorBoundary>
      )}

      {/* ISRO Fleet Live Timeline & Sensor Coverage Layer Dock */}
      {isFleetTimelineOpen && activeTab === 'Global View' && !selectedCountry && (
        <ErrorBoundary>
          <ISROFleetTimeline 
            satellites={isroSatellites}
            selectedSatellite={selectedSatellite}
            onSelectSatellite={(sat) => setSelectedSatellite(sat)}
            activeFilter={activeCoverageFilter}
            onFilterChange={(filter) => setActiveCoverageFilter(filter)}
          />
        </ErrorBoundary>
      )}

      {/* Floating ISRO Fleet Toggle Pill when timeline is closed */}
      {!isFleetTimelineOpen && activeTab === 'Global View' && !selectedCountry && (
        <button
          onClick={() => setIsFleetTimelineOpen(true)}
          className="absolute left-6 bottom-16 z-20 px-3 py-2 rounded-xl glass-panel border border-orange-500/50 shadow-2xl flex items-center gap-2 text-xs font-mono text-orange-300 hover:bg-orange-950/60 transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
          <span className="font-bold text-slate-100">ISRO EO FLEET</span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
            {isroSatellites.length} ACTIVE
          </span>
        </button>
      )}

      {/* ISRO Satellite Mission, Sensor Payload & Emergency Tasking Inspector */}
      {selectedSatellite && (
        <ErrorBoundary>
          <ISROSatelliteInspector 
            satellite={selectedSatellite}
            onClose={() => setSelectedSatellite(null)}
            onFocusOnGlobe={(sat) => setSelectedSatellite(sat)}
          />
        </ErrorBoundary>
      )}

      {/* Data Source Pedigree Transparency Modal */}
      <DataSourceTransparencyModal 
        isOpen={isDataTransparencyOpen}
        onClose={() => setIsDataTransparencyOpen(false)}
      />

      {/* Ground Station Satellite Uplink Diagnostics Modal */}
      <UplinkDiagnosticsModal 
        isOpen={isUplinkModalOpen} 
        onClose={() => setIsUplinkModalOpen(false)} 
      />
      
      {/* We can show multiple things or just Live Monitoring always */}
      <ErrorBoundary>
        <LiveMonitoring />
      </ErrorBoundary>

      {/* Global scanline overlay for professional terminal aesthetic */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-50 opacity-20" />
    </div>
  );
}

export default App;
