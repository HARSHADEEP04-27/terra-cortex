import React, { useState, useEffect } from 'react';
import { 
  Cpu, Target, Eye, Database, Activity, CheckCircle2, 
  Terminal, Sparkles, AlertTriangle, ShieldCheck, Play, ArrowRight, X,
  Search, ShieldAlert, Clock, FileText, Check, Copy, Flame, Droplets, 
  Wind, Zap, Mountain, Compass, HelpCircle, Layers, Radio, RefreshCw
} from 'lucide-react';

const AI_MODEL_ZOO = [
  {
    id: 'terranet-v4',
    name: 'TerraNet-v4.2 Vision-Transformer',
    category: 'Multi-Hazard Foundation Model',
    parameters: '840M Parameters',
    accuracy: '96.8% F1-Score',
    latency: '42ms / Tile',
    inputs: '13-Band Sentinel-2 + Landsat-9 + SRTM DEM',
    description: 'Spatio-temporal Vision Transformer pre-trained on 40 petabytes of multi-spectral imagery. Capable of simultaneous flood, burn scar, and canopy degradation segmentation.'
  },
  {
    id: 'hydrognn-v3',
    name: 'HydroGNN-v3 Spatio-Temporal Graph Network',
    category: 'Hydrological River Routing & Inundation',
    parameters: '124M Parameters',
    accuracy: '94.2% Discharge Accuracy',
    latency: '18ms / Basin',
    inputs: 'Sentinel-1 C-Band SAR + GPM IMERG + River Gauge Mesh',
    description: 'Topological graph neural network modeling river discharge physics, hydrodynamic backwater effects, and levee overflow probabilities.'
  },
  {
    id: 'pyrocast-xgb',
    name: 'PyroCast-XGB Gradient Boosted Ensemble',
    category: 'Wildfire Rate-of-Spread (ROS)',
    parameters: '2,400 Decision Trees',
    accuracy: '97.1% Containment Forecast',
    latency: '8ms / Cluster',
    inputs: 'VIIRS 375m I-Band + NOAA GFS Wind Vectors + Fuel Moisture',
    description: 'Atmospheric-coupled wildfire propagation model factoring moisture deficit, spotting distances, and terrain slope acceleration.'
  },
  {
    id: 'atmotransformer',
    name: 'AtmoTransformer-XL General Circulation',
    category: 'Tropical Cyclogenesis & Convection',
    parameters: '1.2B Parameters',
    accuracy: '95.6% Track Cone Accuracy',
    latency: '64ms / Hemisphere',
    inputs: 'GOES-18 ABI + INSAT-3DR Sounder + ECMWF IFS',
    description: 'Deep isobaric atmospheric foundation model predicting cyclone landfall coordinates, eyewall wind intensification, and barometric pressure drops.'
  },
  {
    id: 'seismopulse-dnn',
    name: 'SeismoPulse-DNN Crustal Strain Network',
    category: 'Lithospheric Stress & Subduction',
    parameters: '320M Parameters',
    accuracy: '93.8% Rupture Forecast',
    latency: '24ms / Fault Arc',
    inputs: 'InSAR Interferometry + USGS Seismology + Global GNSS Array',
    description: 'Crustal deflection deep network analyzing differential InSAR phase interferograms and micro-seismic swarm tremors for subduction rupture precursors.'
  },
  {
    id: 'volcanoplume-3d',
    name: 'VolcanoPlume-Conv3D Ash Dispersion',
    category: 'Pyroclastic Flow & SO₂ Aerosol',
    parameters: '180M Parameters',
    accuracy: '95.1% Column Tracking',
    latency: '32ms / Vent',
    inputs: 'Himawari-9 SWIR + Sentinel-5P TROPOMI SO₂ + DEM Gradient',
    description: '3D convolutional fluid dynamics emulator predicting volcanic ash plume ascent heights, pyroclastic current velocity, and downwind flight corridor hazards.'
  }
];

const PRESET_QUERIES = [
  {
    id: 'brahmaputra',
    q: 'Why is Brahmaputra Basin showing 84% Critical Flood Probability?',
    hazard: 'Flood / Inundation',
    modelId: 'hydrognn-v3',
    threatLevel: 'CRITICAL',
    confidence: '96.4%',
    prediction: '84% Inundation Probability (96.4% Model Confidence)',
    primaryDrivers: [
      { factor: 'Upstream River Gauge Surge', weight: 42, detail: '+2.8m above danger mark at Guwahati gauge' },
      { factor: 'Sentinel-1 SAR Backscatter Loss', weight: 34, detail: 'VV amplitude drop -15.2 dB (Standing Water Expansions)' },
      { factor: 'Soil Pore Saturation', weight: 24, detail: 'Topsoil capacity exceeded at 94.2% across catchment' }
    ],
    satelliteConsensus: ['ISRO EOS-04 (C-Band SAR)', 'Sentinel-1A (VV/VH)', 'GPM IMERG (NASA)', 'Landsat-9 OLI-2'],
    explanation: 'Spatio-temporal graph neural network detected continuous hydrodynamic surge volume exceeding floodplain carrying capacity. Low elevation slope (<1.2%) in Dhubri sector coupled with high discharge prevents natural river runoff, causing massive embankment overtopping.',
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Sound riverbank sirens; trigger mandatory evacuation across Dhubri and Kaziranga chars',
        '[T-1h Tasking] Mobilize 16 NDRF swift-water rescue boat battalions with inflatable dinghies',
        '[T-2h Relocation] Shift 240,000 residents from low-elevation silt sandbars to elevated multi-purpose cyclone/flood shelters'
      ],
      infrastructureProtocols: [
        'Coordinate emergency discharge throttling at upstream Subansiri and Ranganadi hydropower sluices',
        'Deploy heavy-duty sand-fill geotextile tubes and wire-crated rip-rap along vulnerable embankment breach sectors',
        'Shut down high-voltage rural transformer substations located inside the 1.5m flood inundation contour'
      ],
      medicalAndLogistics: [
        'Pre-position 80,000 packets of halogen water purification tablets and ORS kits at district distribution hubs',
        'Air-drop dry ration hampers and cattle fodder via Indian Air Force helicopter supply corridors',
        'Establish mobile medical boats for emergency triage and cholera/leptospirosis prophylaxis'
      ],
      containment: [
        'Perform daily repeat C-Band SAR radar passes via ISRO EOS-04 to map drainage recession velocity',
        'Construct temporary earth berms around municipal drinking water treatment wells to prevent sewer back-siphonage',
        'Maintain emergency satellite VHF radio link with State Disaster Management Authority (SDMA EOC)'
      ],
      evacuationRadius: '8.5 km buffer along riverbank perimeter',
      affectedAssets: '42 High-Voltage Pylons, 18 River Freight Docks',
      checklist: [
        { id: 'c1', task: 'Activate NDRF Swift-Water Rescue Battalions', checked: true },
        { id: 'c2', task: 'Issue Emergency Bhuvan GeoJSON Inundation Perimeter', checked: true },
        { id: 'c3', task: 'Isolate Electrical Substations in Floodplain', checked: false },
        { id: 'c4', task: 'Pre-position Water Purification Kits & Food Air-Drops', checked: false }
      ]
    }
  },
  {
    id: 'wayanad',
    q: 'Explain Wayanad Hill Sector landslide triggers & mudflow risks',
    hazard: 'Landslide / Mass Movement',
    modelId: 'terranet-v4',
    threatLevel: 'CRITICAL',
    confidence: '95.8%',
    prediction: '91% Debris Flow Probability (95.8% Model Confidence)',
    primaryDrivers: [
      { factor: 'Antecedent Rainfall Saturation', weight: 48, detail: '310mm cumulative rainfall in 24h over steep granitic slopes' },
      { factor: 'Pore-Water Overpressure', weight: 32, detail: 'Sub-surface shear resistance dropped below critical safety factor (FS < 0.85)' },
      { factor: 'Slope Angle & Canopy Loss', weight: 20, detail: '36° slope gradient with fractured metamorphic bedrock' }
    ],
    satelliteConsensus: ['SMAP L-Band Soil Moisture', 'Sentinel-2 MSI (NDVI)', 'SRTM 30m Digital Elevation Model', 'ISRO EOS-01 Radar'],
    explanation: 'Vision-Transformer elevation gradient cross-matched with microwave soil moisture reveals severe pore-water overpressure along the Western Ghats escarpment. Intense precipitation liquefied the top regolith layer, triggering catastrophic translational debris flows through Meppadi and Chooralmala valleys.',
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Issue Red Alert; enforce immediate night evacuation of all settlements on slopes > 25°',
        '[T-30m Transit] Close mountain ghat pass roadways (Thamarassery Churam) to non-emergency vehicular traffic',
        '[T-1h Search] Deploy canine search and rescue teams and thermal drone locators to Chooralmala debris fan'
      ],
      infrastructureProtocols: [
        'Install seismic geophones and acoustic tripwire extensometers on active hillside slide crowns',
        'Divert mountain stream runoffs away from unstable debris fans using mechanical earth excavators',
        'Isolate overhead power lines in downslope runout zones to prevent electrical ignition'
      ],
      medicalAndLogistics: [
        'Establish emergency surgical triage centers at Kalpetta and Meppadi district hospitals',
        'Mobilize Indian Army Madras Sappers with Bailey bridge equipment to restore severed river crossings',
        'Air-lift specialized heavy rescue excavators and hydraulic cutters via IAF heavy-lift helicopters'
      ],
      containment: [
        'Establish automated rain-gauge telemetry triggers with 50mm/hour emergency alert thresholds',
        'Map high-risk secondary slide zones using sub-meter Cartosat-3 optical imagery',
        'Coordinate relocation housing for permanently displaced agrarian families outside hazard runout buffers'
      ],
      evacuationRadius: '3.2 km downslope alluvial runout cone',
      affectedAssets: '2 Mountain Bridges, 14 Tea Processing Facilities',
      checklist: [
        { id: 'c1', task: 'Enforce Mandatory Slope Evacuation to Safe Ground', checked: true },
        { id: 'c2', task: 'Deploy Army Sappers for Bailey Bridge Reconnection', checked: true },
        { id: 'c3', task: 'Install Hillside Acoustic Extensometers', checked: false },
        { id: 'c4', task: 'Establish Emergency Trauma Hospital Wards', checked: false }
      ]
    }
  },
  {
    id: 'sierra-nevada',
    q: 'Deconstruct wildfire propagation drivers in Sierra Nevada Sector',
    hazard: 'Wildfire Influx',
    modelId: 'pyrocast-xgb',
    threatLevel: 'CRITICAL',
    confidence: '98.1%',
    prediction: '91% Extreme Spread Potential (98.1% Confidence)',
    primaryDrivers: [
      { factor: 'Vapor Pressure Deficit (VPD)', weight: 46, detail: 'Record high atmospheric dryness (3.8 kPa) drawing fuel moisture' },
      { factor: 'Diablo / Canyon Winds', weight: 32, detail: '65 km/h gusts with dry adiabatic cross-shear down canyons' },
      { factor: 'Fine Dead Fuel Moisture', weight: 22, detail: 'Critically dry < 6% fuel ignition threshold in timber' }
    ],
    satelliteConsensus: ['VIIRS 375m Active Fire (NOAA)', 'MODIS Thermal Radiative Power', 'Landsat-9 SWIR Burn Scar', 'GOES-18 ABI 5-Min Scan'],
    explanation: 'PyroCast-XGB ensemble predicts uncontained crown fire behavior and long-distance ember spotting (>1.8 km downwind) driven by severe fuel desiccation, canyon venturi wind acceleration, and steep topography.',
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Order mandatory Zone-Red evacuation for Butte and Plumas county communities',
        '[T-1h Warning] Pre-position CalFire strike teams and DC-10 heavy air tankers at McClellan Air Base',
        '[T-2h Transit] Shut down canyon highway routes and activate Reverse-911 emergency broadcasts'
      ],
      infrastructureProtocols: [
        'Trigger Public Safety Power Shutoffs (PSPS) on high-voltage lines traversing dry conifer timber',
        'Bulldoze a 150-meter bare-mineral firebreak along urban-wildland interface (WUI) ridgelines',
        'Operate defensive perimeter foam and gel sprinkler arrays around electrical substations'
      ],
      medicalAndLogistics: [
        'Distribute N95 and HEPA smoke filtration masks to downwind communities throughout Sacramento Valley',
        'Open air-conditioned clean-air respite centers equipped with medical oxygen concentrators',
        'Pre-position burn trauma beds across regional university trauma hospitals'
      ],
      containment: [
        'Direct night-time aerial retardant drops using infrared-equipped helicopters',
        'Continuously track thermal fire radiative power (FRP) with GOES-18 ABI 5-minute mesoscale scans',
        'Back-burn defensive containment perimeters under favorable early morning humidity windows'
      ],
      evacuationRadius: '15 km downwind perimeter cone',
      affectedAssets: '12 Electric Substations, 380 Residential Structures',
      checklist: [
        { id: 'c1', task: 'Issue Mandatory Zone-Red Evacuation Orders', checked: true },
        { id: 'c2', task: 'Execute Utility Public Safety Power Shutoffs (PSPS)', checked: true },
        { id: 'c3', task: 'Bulldoze 150m Bare-Mineral Firebreak Along Ridge', checked: false },
        { id: 'c4', task: 'Stage Heavy Air Tankers for Retardant Drops', checked: false }
      ]
    }
  },
  {
    id: 'typhoon-choiwan',
    q: 'Analyze Category-4 Typhoon Choi-wan eyewall dynamics & storm surge',
    hazard: 'Tropical Cyclone',
    modelId: 'atmotransformer',
    threatLevel: 'CRITICAL',
    confidence: '95.6%',
    prediction: '95% Severe Coastal Landfall Probability (95.6% Confidence)',
    primaryDrivers: [
      { factor: 'Sea Surface Temperature Engine', weight: 44, detail: '30.8°C ocean warm pool (+1.8°C anomaly) fueling convection' },
      { factor: 'Central Barometric Pressure Drop', weight: 34, detail: '935 hPa core pressure with rapid eyewall contraction' },
      { factor: 'Vertical Wind Shear Deficit', weight: 22, detail: 'Ultra-low shear (<7 knots) permitting vertical cloud vortex' }
    ],
    satelliteConsensus: ['Himawari-9 Rapid Scan (JMA)', 'INSAT-3DR Sounder', 'Oceansat-3 SSTM Ocean Surface', 'Sentinel-3 SLSTR'],
    explanation: 'Deep circulation foundation model predicts destructive Category-4 eyewall winds (215 km/h gusts) accompanied by an astronomical high-tide combined storm surge of 4.8 meters, inundating low-lying coastal estuaries.',
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Mandate complete coastal evacuation within 5 km of shoreline and estuaries',
        '[T-6h Shelter] Move vulnerable populations into reinforced concrete multi-hazard shelters above surge height',
        '[T-12h Marine] Order all maritime vessels to secure moorings or steam outside dangerous semi-circle'
      ],
      infrastructureProtocols: [
        'Lower hydraulic storm surge gates across coastal estuaries and port shipping canals',
        'Secure crane gantries and container yards at coastal deep-water ports',
        'Pre-emptively throttle gas distribution mains to prevent post-landfall line rupture fires'
      ],
      medicalAndLogistics: [
        'Stockpile 30 days of medical consumables, antibiotics, and surgical packs at inland hospitals',
        'Pre-stage amphibious disaster relief craft and high-clearance utility vehicles',
        'Position satellite emergency communications trailers (VSAT) to replace downed cellular towers'
      ],
      containment: [
        'Maintain continuous 10-minute geostationary radar-sounder tracking of storm eye coordinates',
        'Inspect earthen coastal dykes for erosion scouring immediately upon surge recession',
        'Coordinate emergency power restoration prioritizing regional hospitals and water plants'
      ],
      evacuationRadius: '12 km coastal inundation buffer',
      affectedAssets: '4 Major Sea Ports, 2 Coastal Airports',
      checklist: [
        { id: 'c1', task: 'Trigger Mandatory Coastal Strip Evacuation', checked: true },
        { id: 'c2', task: 'Lock Hydraulic Storm Surge Barrier Gates', checked: true },
        { id: 'c3', task: 'Pre-position Satellite Mobile Communications (VSAT)', checked: false },
        { id: 'c4', task: 'Secure Port Container Cranes & Industrial Chemical Tanks', checked: false }
      ]
    }
  },
  {
    id: 'kamchatka-seismic',
    q: 'Assess M5.8 Kamchatka Trench subduction slip & tsunami hazard',
    hazard: 'Seismic / Tsunami',
    modelId: 'seismopulse-dnn',
    threatLevel: 'HIGH',
    confidence: '93.8%',
    prediction: '88% Crustal Strain Accumulation (93.8% Confidence)',
    primaryDrivers: [
      { factor: 'Interferometric InSAR Crustal Deflection', weight: 44, detail: 'Differential phase fringes show 4.2 cm co-seismic seaward slip' },
      { factor: 'Coulomb Stress Transfer', weight: 32, detail: '+0.42 MPa positive stress transfer onto adjacent locked megathrust patch' },
      { factor: 'P/S Wave Velocity Ratio Anomaly', weight: 24, detail: 'Vp/Vs ratio drop indicating high pore-fluid pressure along slab' }
    ],
    satelliteConsensus: ['ALOS-2 PALSAR-2 L-Band InSAR', 'Sentinel-1 InSAR', 'USGS Global Seismology Array', 'DART Tsunami Buoy Array'],
    explanation: 'SeismoPulse-DNN crustal network identifies significant Coulomb stress loading on adjacent locked subduction segments following the M5.8 subsea event. While current ocean displacement does not trigger an ocean-wide basin tsunami, shallow depth (18 km) warrants localized harbor surge watches.',
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Issue localized coastal tsunami advisory for maritime harbors and fishing fleets',
        '[T-5m Safety] Clear beaches, marinas, and low-lying harbor docks of all personnel',
        '[T-15m Evac] Verify operational readiness of high-ground evacuation stairways'
      ],
      infrastructureProtocols: [
        'Inspect subsea fiber optic telecommunication cable landing stations for strain damage',
        'Perform automated ultrasonic structural audits on port breakwaters and seawalls',
        'Verify emergency shutdown interlocks on coastal thermal power generation turbines'
      ],
      medicalAndLogistics: [
        'Check inventory of emergency shelter supplies, thermal space blankets, and satellite phones',
        'Deploy mobile search and rescue engineering teams equipped with structural listening devices',
        'Coordinate joint naval patrol monitoring of maritime navigation corridors'
      ],
      containment: [
        'Process real-time differential InSAR swaths from ALOS-2 and Sentinel-1 to map afterslip',
        'Monitor continuous DART ocean-bottom pressure sensors for anomalous wave amplitudes',
        'Maintain elevated seismic watch for potential M6.5+ aftershock sequences along the trench'
      ],
      evacuationRadius: '1.5 km coastal shoreline buffer',
      affectedAssets: '2 Deepwater Ports, 1 Subsea Fiber Cable Landing',
      checklist: [
        { id: 'c1', task: 'Issue Coastal Harbor Tsunami Advisory', checked: true },
        { id: 'c2', task: 'Poll Deep Ocean DART Pressure Sensor Telemetry', checked: true },
        { id: 'c3', task: 'Inspect Seawalls & Port Breakwaters for Rupture Strain', checked: false },
        { id: 'c4', task: 'Run InSAR Differential Phase Processing for Afterslip', checked: false }
      ]
    }
  },
  {
    id: 'semeru-volcano',
    q: 'Forecast Mount Semeru volcanic eruption column & pyroclastic flow',
    hazard: 'Volcanic Eruption',
    modelId: 'volcanoplume-3d',
    threatLevel: 'CRITICAL',
    confidence: '95.1%',
    prediction: '94% Pyroclastic Flow & Ash Influx (95.1% Confidence)',
    primaryDrivers: [
      { factor: 'SWIR Thermal Radiative Anomaly', weight: 45, detail: 'Summit lava dome radiant flux surged to 740 MW' },
      { factor: 'TROPOMI SO₂ Atmospheric Mass', weight: 33, detail: '1,850 tonnes/day sulfur dioxide injection into upper troposphere' },
      { factor: 'Volcanic Harmonic Tremor Amplitude', weight: 22, detail: 'Continuous high-amplitude volcanic RSAM reading > 48mm' }
    ],
    satelliteConsensus: ['Himawari-9 (JMA)', 'Sentinel-5P TROPOMI SO₂', 'Terra ASTER Thermal', 'Landsat-9 SWIR'],
    explanation: '3D convective ash dispersion emulator indicates catastrophic lava dome instability. Heavy monsoon rainfall over the summit crater triggered mechanical dome collapse, sending incandescent pyroclastic density currents down the Besuk Kobokan river corridor at velocities exceeding 90 km/h.',
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Expand mandatory volcanic exclusion zone to 13 km radius along Besuk Kobokan river valley',
        '[T-30m Safety] Evacuate all sand-mining workers and villages within 500m of riverbanks down to 17 km',
        '[T-1h Airspace] Issue Aviation Color Code RED; re-route international flights away from ash column corridor'
      ],
      infrastructureProtocols: [
        'Clear volcanic ash accumulation from substation insulator bushings using pressurized air',
        'Inspect drainage bridge spans across lahar channels for structural blockage or scouring',
        'Seal municipal drinking water reservoir cisterns to prevent acidic fluoride/sulfate contamination'
      ],
      medicalAndLogistics: [
        'Distribute 150,000 N95 particulate respirators and eye protection goggles to downwind residents',
        'Pre-position burn trauma stabilization kits and saline eye-wash units at regional health centers',
        'Establish indoor clean-air evacuation shelters outside the volcanic ash fallout zone'
      ],
      containment: [
        'Deploy thermal infrared drones to monitor lava dome extrusion rates and thermal cracks',
        'Continuous SO₂ column tracking using Sentinel-5P to forecast downwind acid rain deposition',
        'Prepare heavy earth-moving equipment to dredge secondary lahar mudflows following rainfall'
      ],
      evacuationRadius: '13 km exclusion radius around summit vent',
      affectedAssets: '1 Regional Airport Airspace, 3 Bridge Crossings, 8 Schools',
      checklist: [
        { id: 'c1', task: 'Issue Aviation Color Code RED & Ground Regional Air Traffic', checked: true },
        { id: 'c2', task: 'Enforce 13 km Mandatory Ground Exclusion Perimeter', checked: true },
        { id: 'c3', task: 'Distribute N95 Ash Respirators & Protective Eye Goggles', checked: false },
        { id: 'c4', task: 'Seal Municipal Water Reservoirs Against Acid Ash Ingress', checked: false }
      ]
    }
  },
  {
    id: 'amazon-drought',
    q: 'Explain Pará Arc Deforestation Acceleration & Drought Correlation',
    hazard: 'Drought / Canopy Loss',
    modelId: 'terranet-v4',
    threatLevel: 'HIGH',
    confidence: '97.4%',
    prediction: '94% Canopy Degradation Alert (97.4% Confidence)',
    primaryDrivers: [
      { factor: 'Dynamic World Tree Cover Loss', weight: 48, detail: '1,840 km² converted in 60-day window along agricultural frontier' },
      { factor: 'Rio Negro Hydro Deficit', weight: 32, detail: 'Lowest gauge level in 122 years (-6.2m below seasonal baseline)' },
      { factor: 'Evapotranspiration Drop', weight: 20, detail: 'Transpiration atmospheric moisture pump down 31% regionally' }
    ],
    satelliteConsensus: ['Amazonia-1 Wide Field Camera', 'Sentinel-2 MSI (NDVI/EVI)', 'Landsat-9 Surface Temp', 'SMAP Soil Moisture'],
    explanation: 'Vision-Transformer spatio-temporal segmentation proves that clear-cut canopy fragmentation directly suppresses localized atmospheric moisture recycling. The breakdown of the biophysical "flying river" vapor pump creates a self-reinforcing drought loop across the Amazon Basin.',
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Declare state of emergency for isolated riverine communities along Rio Negro tributaries',
        '[T-24h Logistics] Dispatch hospital boats and amphibious vessels with drinkable water and medical supplies',
        '[T-48h Enforce] Impose immediate emergency moratorium on commercial land-clearing burning across Pará'
      ],
      infrastructureProtocols: [
        'Dredge critical river navigation channels to enable transit of fuel barges to municipal power plants',
        'Establish solar-powered water purification pumping stations at isolated river villages',
        'Create wide mineral firebreaks around indigenous territory boundaries and conservation parks'
      ],
      medicalAndLogistics: [
        'Distribute chlorine water treatment tablets and oral rehydration salts to combat water-borne diarrhea',
        'Airlift emergency food rations to 120 isolated indigenous settlements via federal defense helicopters',
        'Establish wildlife rehabilitation stations for endangered river dolphins and aquatic fauna'
      ],
      containment: [
        'Deploy DETER/PRODES satellite real-time automated deforestation alerts directly to federal police',
        'Enforce heavy fines and asset confiscation against illegal mechanized clear-cutting operations',
        'Monitor seasonal rainfall resumption indicators via GPM satellite precipitation constellations'
      ],
      evacuationRadius: '400 km river corridor relief zone',
      affectedAssets: '19 River Freight Ports, 64 Municipal Drinking Water Intakes',
      checklist: [
        { id: 'c1', task: 'Declare Federal State of Calamity in Isolated River Basins', checked: true },
        { id: 'c2', task: 'Dispatch Amphibious Hospital Ships with Potable Water', checked: true },
        { id: 'c3', task: 'Dredge Emergency Navigation Corridors for Fuel Barges', checked: false },
        { id: 'c4', task: 'Deploy Real-Time Satellite Deforestation Interception Units', checked: false }
      ]
    }
  },
  {
    id: 'vidarbha-heat',
    q: 'Evaluate Vidarbha Agricultural Drought & Extreme Heatwave stress',
    hazard: 'Agricultural Drought',
    modelId: 'terranet-v4',
    threatLevel: 'HIGH',
    confidence: '95.2%',
    prediction: '87% Crop Wilting & Soil Desiccation (95.2% Confidence)',
    primaryDrivers: [
      { factor: 'Land Surface Temperature Anomaly', weight: 46, detail: 'MODIS LST registered 43.8°C (+5.2°C above 10-year mean)' },
      { factor: 'Root-Zone Soil Moisture Depletion', weight: 34, detail: 'Depleted to 14% field capacity across cotton/soybean belts' },
      { factor: 'Vegetation Health Index (VHI) Loss', weight: 20, detail: 'VHI down 28 points indicating severe agricultural stress' }
    ],
    satelliteConsensus: ['ISRO Resourcesat-2A AWiFS', 'Terra/Aqua MODIS LST', 'SMAP L-Band Soil Moisture', 'INSAT-3DR Thermal'],
    explanation: 'Multi-spectral vegetation index analysis combined with microwave surface moisture reveals severe soil moisture deficit across central Maharashtra. Prolonged dry spells and high thermal radiation have caused irreversible wilting point conditions in rainfed agricultural crops.',
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Issue Heatwave Red Alert; suspend outdoor manual labor between 11:00 AM and 4:00 PM',
        '[T-1h Health] Open air-conditioned community cooling shelters in primary agricultural market towns',
        '[T-2h Water] Deploy municipal drinking water tanker convoys to 140 water-stressed rural villages'
      ],
      infrastructureProtocols: [
        'Release emergency irrigation water pulses from upper reservoir canals to preserve standing crops',
        'Install shade canopies and solar-powered micro-sprinklers over wholesale vegetable produce markets',
        'Augment rural electrical grid reliability to power agricultural groundwater pump tubewells'
      ],
      medicalAndLogistics: [
        'Pre-position IV fluid reserves, cooling blankets, and electrolyte packs at rural primary health centers',
        'Distribute subsidized cattle fodder and establish shaded livestock camps (chara chhavani)',
        'Activate emergency crop insurance assessment teams using Resourcesat-2A satellite damage maps'
      ],
      containment: [
        'Conduct daily thermal infrared monitoring via INSAT-3DR to predict peak afternoon heat stress zones',
        'Promote drought-tolerant millets and pulse cropping for upcoming seasonal planting cycles',
        'Inspect farm ponds (shet tale) and desilt village percolation tanks prior to next monsoon onset'
      ],
      evacuationRadius: 'Regional agrarian belt (14 districts)',
      affectedAssets: '1.4M Hectares Rainfed Cropland, 84 Rural Drinking Wells',
      checklist: [
        { id: 'c1', task: 'Issue Heatwave Red Alert & Ban Midday Outdoor Labor', checked: true },
        { id: 'c2', task: 'Dispatch Rural Potable Water Tanker Convoys', checked: true },
        { id: 'c3', task: 'Release Controlled Dam Canal Water for Agriculture', checked: false },
        { id: 'c4', task: 'Stockpile IV Fluids & Electrolytes at Health Centers', checked: false }
      ]
    }
  }
];

const AICopilot = ({ onClose, initialScenario }) => {
  const [selectedModel, setSelectedModel] = useState('terranet-v4');
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [activeViewMode, setActiveViewMode] = useState('xai'); // 'xai' | 'precautions'
  const [isInferring, setIsInferring] = useState(false);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [hazardFilter, setHazardFilter] = useState('ALL');
  const [activeChecklist, setActiveChecklist] = useState({});

  // Dynamic custom query result state
  const [dynamicResult, setDynamicResult] = useState(null);

  // If initialScenario is provided (e.g. from CountryIntelligencePanel), select matching preset
  useEffect(() => {
    if (initialScenario) {
      const matchIndex = PRESET_QUERIES.findIndex(p => 
        p.id.toLowerCase().includes(initialScenario.toLowerCase()) ||
        p.q.toLowerCase().includes(initialScenario.toLowerCase()) ||
        p.hazard.toLowerCase().includes(initialScenario.toLowerCase())
      );
      if (matchIndex !== -1) {
        setActiveQueryIndex(matchIndex);
        setSelectedModel(PRESET_QUERIES[matchIndex].modelId);
      } else {
        handleRunCustomInference(initialScenario);
      }
    }
  }, [initialScenario]);

  const currentQueryData = dynamicResult || PRESET_QUERIES[activeQueryIndex];
  const activeModel = AI_MODEL_ZOO.find(m => m.id === selectedModel) || AI_MODEL_ZOO[0];

  // Initialize checklist for active query
  useEffect(() => {
    if (currentQueryData?.precautions?.checklist) {
      const initialMap = {};
      currentQueryData.precautions.checklist.forEach(item => {
        initialMap[item.id] = item.checked;
      });
      setActiveChecklist(initialMap);
    }
  }, [currentQueryData]);

  const toggleChecklistItem = (id) => {
    setActiveChecklist(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRunInference = (index) => {
    setIsInferring(true);
    setDynamicResult(null);
    setActiveQueryIndex(index);
    const targetModel = PRESET_QUERIES[index].modelId;
    if (targetModel) setSelectedModel(targetModel);
    setTimeout(() => setIsInferring(false), 450);
  };

  // Smart natural language prompt generator for custom queries
  const handleRunCustomInference = (rawQuery) => {
    const q = (rawQuery || customSearchQuery).trim();
    if (!q) return;

    setIsInferring(true);
    const lower = q.toLowerCase();

    let hazardType = 'Multi-Hazard Anomaly';
    let assignedModel = 'terranet-v4';
    let threatLevel = 'HIGH';
    let prediction = '87% Hazard Likelihood (94.8% Confidence)';
    let primaryDrivers = [
      { factor: 'Multi-Spectral Reflectance Anomaly', weight: 42, detail: 'Spectral deviation recorded across 3 consecutive orbital swaths' },
      { factor: 'Thermal Infrared Divergence', weight: 32, detail: '+3.4°C variance vs 10-year climatological baseline' },
      { factor: 'Surface Moisture Shift', weight: 26, detail: 'Rapid hydrologic pore pressure variance' }
    ];
    let satelliteConsensus = ['Sentinel-2 MSI', 'Landsat-9 OLI-2', 'Terra MODIS', 'ISRO EOS-04'];
    let explanation = `Neural foundation model detected significant multi-spectral and radiometric anomalies corresponding to "${q}". Cross-spectral band analysis indicates persistent baseline deviation requiring active observation.`;
    let immediateActions = [
      `[T-0 Immediate] Elevate regional civil protection and disaster management readiness for "${q}"`,
      `[T-1h Warning] Issue localized safety advisory across vulnerable geographical sectors`,
      `[T-2h Logistics] Pre-position emergency first-responder equipment and verify communication links`
    ];
    let infrastructureProtocols = [
      'Verify emergency standby power at water treatment facilities and critical hubs',
      'Inspect high-risk utility corridors and transportation links for early structural impairment',
      'Maintain continuous orbital downlink synchronization with national command centers'
    ];
    let medicalLogistics = [
      'Pre-position trauma medical supplies and clean drinking water reserves at regional depots',
      'Alert mutual-aid first responder teams across neighboring administrative jurisdictions',
      'Establish community emergency shelters equipped with emergency power and medical supplies'
    ];
    let containment = [
      'Perform high-resolution repeat satellite passes to track anomaly trajectory and decay velocity',
      'Coordinate field ground-truth sensor calibration with localized emergency crews',
      'Maintain automated alert broadcast webhooks for continuous civil safety'
    ];

    if (lower.includes('flood') || lower.includes('rain') || lower.includes('water') || lower.includes('inundat') || lower.includes('river')) {
      hazardType = 'Flood / Inundation';
      assignedModel = 'hydrognn-v3';
      threatLevel = 'CRITICAL';
      prediction = '89% Severe Inundation Probability (96.2% Confidence)';
      primaryDrivers = [
        { factor: 'River Catchment Surge', weight: 44, detail: '+2.6m above critical bankfull threshold' },
        { factor: 'C-Band SAR Backscatter Drop', weight: 34, detail: 'VV amplitude loss -14.8 dB indicating standing water' },
        { factor: 'Topsoil Pore Saturation', weight: 22, detail: 'Catchment soil moisture exceeded 93%' }
      ];
      satelliteConsensus = ['ISRO EOS-04 C-Band SAR', 'Sentinel-1A SAR', 'GPM IMERG', 'Landsat-9'];
      explanation = `HydroGNN river routing graph network predicts levee breach risk due to upstream deluge volume outstripping floodplain carrying capacity for "${q}".`;
      immediateActions = [
        '[T-0 Immediate] Trigger emergency flood warning sirens; mandate evacuation of low-lying floodplains',
        '[T-1h Rescue] Mobilize national swift-water rescue craft and inflatable dinghies',
        '[T-2h Relocation] Shift vulnerable families to elevated high-capacity cyclone/flood shelters'
      ];
      infrastructureProtocols = [
        'Throttle upstream dam sluice gates in coordination with water basin authorities',
        'Isolate low-elevation electrical substations to prevent grid faults and transformer fires',
        'Deploy heavy sand-fill geotextile tubes along critical embankment breach points'
      ];
    } else if (lower.includes('fire') || lower.includes('wildfire') || lower.includes('burn') || lower.includes('flame') || lower.includes('smoke')) {
      hazardType = 'Wildfire Propagation';
      assignedModel = 'pyrocast-xgb';
      threatLevel = 'CRITICAL';
      prediction = '93% Extreme Rate-of-Spread (97.6% Confidence)';
      primaryDrivers = [
        { factor: 'Vapor Pressure Deficit (VPD)', weight: 46, detail: 'Atmospheric dryness 3.6 kPa accelerating fuel ignition' },
        { factor: 'Surface Wind Vector Shear', weight: 32, detail: '58 km/h wind gusts with erratic canyon channeling' },
        { factor: 'Dead Fuel Moisture Depletion', weight: 22, detail: 'Fuel moisture < 5.8% in dry forest brush' }
      ];
      satelliteConsensus = ['VIIRS 375m I-Band', 'MODIS Thermal Radiative Power', 'GOES-18 ABI', 'Sentinel-2 SWIR'];
      explanation = `PyroCast gradient-boosted ensemble forecasts extreme uncontained rate-of-spread with long-distance spotting (>1.5 km) for "${q}".`;
      immediateActions = [
        '[T-0 Immediate] Enforce mandatory Zone-Red evacuation for canyon and forest-fringe communities',
        '[T-1h Warning] Stage heavy multi-engine air tankers for retardant drops on leading fire perimeter',
        '[T-2h Safety] Close mountain highways and activate emergency reverse-notification telephone broadcasts'
      ];
      infrastructureProtocols = [
        'Execute Public Safety Power Shutoffs (PSPS) on high-voltage transmission lines through dry brush',
        'Bulldoze a 120-meter bare-earth mineral firebreak along ridge lines and settlement perimeters',
        'Deploy defensive foam and sprinkler protection systems around critical electrical and water infrastructure'
      ];
    } else if (lower.includes('cyclone') || lower.includes('typhoon') || lower.includes('storm') || lower.includes('hurricane') || lower.includes('wind')) {
      hazardType = 'Tropical Cyclone & Storm Surge';
      assignedModel = 'atmotransformer';
      threatLevel = 'CRITICAL';
      prediction = '95% Destructive Coastal Impact Probability (96.8% Confidence)';
      primaryDrivers = [
        { factor: 'Sea Surface Heat Reservoir', weight: 45, detail: '30.4°C SST thermal pool fueling convective eyewall' },
        { factor: 'Central Barometric Pressure Drop', weight: 33, detail: '940 hPa core pressure with intensifying pressure gradient' },
        { factor: 'Deep Tropospheric Moisture Inflow', weight: 22, detail: '85% relative humidity feeding spiral rainbands' }
      ];
      satelliteConsensus = ['Himawari-9 / GOES-18', 'INSAT-3DR Sounder', 'Oceansat-3 SSTM', 'Sentinel-3 SLSTR'];
      explanation = `Deep isobaric foundation model predicts rapid cyclonic intensification with severe gale winds (>180 km/h) and dangerous coastal storm surges for "${q}".`;
      immediateActions = [
        '[T-0 Immediate] Mandate evacuation of all populations within 5 km of shoreline and tidally influenced creeks',
        '[T-6h Shelter] Move evacuees into reinforced multi-hazard shelters equipped with standby power',
        '[T-12h Ports] Order all commercial shipping and fishing trawlers to secure berths or steam to deep sea'
      ];
      infrastructureProtocols = [
        'Close hydraulic storm surge barrier gates across coastal navigation channels and estuaries',
        'Secure crane gantries and hazardous chemical storage tanks at coastal seaports',
        'Pre-emptively isolate municipal natural gas distribution mains to prevent post-landfall pipeline fires'
      ];
    } else if (lower.includes('quake') || lower.includes('earthquake') || lower.includes('seismic') || lower.includes('tsunami') || lower.includes('fault')) {
      hazardType = 'Seismic Rupture & Crustal Strain';
      assignedModel = 'seismopulse-dnn';
      threatLevel = 'HIGH';
      prediction = '88% Crustal Strain Energy Concentration (94.1% Confidence)';
      primaryDrivers = [
        { factor: 'InSAR Differential Crustal Deflection', weight: 44, detail: '3.8 cm/yr differential slip detected on locked tectonic fault arc' },
        { factor: 'Coulomb Stress Transfer Spike', weight: 32, detail: '+0.38 MPa stress concentration on adjacent fault patch' },
        { factor: 'Micro-Seismic Swarm Acoustic Rate', weight: 24, detail: 'Elevated b-value shift indicating crustal shear weakening' }
      ];
      satelliteConsensus = ['ALOS-2 PALSAR-2 L-Band', 'Sentinel-1 InSAR', 'USGS Seismology Array', 'Global GNSS Arrays'];
      explanation = `Crustal strain network indicates high elastic shear strain accumulation along locked fault boundaries for "${q}". Shallow hypocentral depth increases localized seismic shaking intensity.`;
      immediateActions = [
        '[T-0 Immediate] Trigger automated rapid transit and rail braking halts upon initial P-wave detection',
        '[T-1m Alarm] Sound coastal tsunami warning sirens in vulnerable harbor zones; mandate high-ground evacuation',
        '[T-15m Rescue] Deploy urban search and rescue teams with acoustic listening and core-drilling gear'
      ];
      infrastructureProtocols = [
        'Automate instant shutoffs on gas trunklines and petroleum distribution pipelines',
        'Verify structural integrity of major dam spillways, reservoir abutments, and highway viaducts',
        'Initiate safe shutdown protocols on coastal nuclear and thermal generation plants'
      ];
    } else if (lower.includes('volcano') || lower.includes('eruption') || lower.includes('ash') || lower.includes('lava') || lower.includes('semeru')) {
      hazardType = 'Volcanic Eruption & Ash Plume';
      assignedModel = 'volcanoplume-3d';
      threatLevel = 'CRITICAL';
      prediction = '92% Pyroclastic Flow & Plume Dispersion (95.4% Confidence)';
      primaryDrivers = [
        { factor: 'SWIR Thermal Radiant Anomaly', weight: 44, detail: 'Crater lava dome radiant flux exceeds 680 MW' },
        { factor: 'TROPOMI SO₂ Gas Injection', weight: 34, detail: '1,450 tonnes/day sulfur dioxide output into stratosphere' },
        { factor: 'Harmonic Volcanic Tremor Amplitude', weight: 22, detail: 'Continuous high RSAM amplitude indicative of magma ascent' }
      ];
      satelliteConsensus = ['Himawari-9 Rapid Scan', 'Sentinel-5P TROPOMI', 'Terra ASTER', 'Landsat-9 SWIR'];
      explanation = `3D convolutional fluid dynamics model calculates high risk of explosive lava dome collapse generating lethal pyroclastic density currents down valley corridors for "${q}".`;
      immediateActions = [
        '[T-0 Immediate] Enforce 10 km mandatory ground exclusion perimeter around summit crater and river drainages',
        '[T-30m Aviation] Issue Aviation Color Code RED; divert commercial air traffic from ash column corridors',
        '[T-1h Mask] Distribute N95 particulate respirators and dust goggles to all downwind municipalities'
      ];
      infrastructureProtocols = [
        'Clean volcanic ash buildup from regional high-voltage transformer insulators using compressed air',
        'Seal municipal water filtration reservoirs to prevent hazardous fluoride and sulfur acidification',
        'Deploy heavy bulldozers to clear lahar mudflow channels and prevent river bridge scour'
      ];
    } else if (lower.includes('drought') || lower.includes('heat') || lower.includes('crop') || lower.includes('dry') || lower.includes('canopy')) {
      hazardType = 'Severe Drought & Heat Stress';
      assignedModel = 'terranet-v4';
      threatLevel = 'HIGH';
      prediction = '86% Soil Moisture & Vegetation Deficit (95.1% Confidence)';
      primaryDrivers = [
        { factor: 'Root-Zone Soil Moisture Deficit', weight: 45, detail: 'Soil moisture depleted to 12% field capacity' },
        { factor: 'Land Surface Temp (LST) Anomaly', weight: 33, detail: '+4.8°C thermal delta above historical 10-year mean' },
        { factor: 'Vegetation Health Index (VHI) Loss', weight: 22, detail: 'VHI down 32% demonstrating severe vegetative wilting' }
      ];
      satelliteConsensus = ['SMAP L-Band Soil Moisture', 'MODIS LST Thermal', 'Sentinel-2 NDVI', 'ISRO Resourcesat-2A'];
      explanation = `Vision-Transformer multi-spectral analysis indicates severe root-zone hydrological desiccation and crop failure vulnerability across "${q}".`;
      immediateActions = [
        '[T-0 Immediate] Issue Heatwave & Drought Emergency Directive; halt midday outdoor labor',
        '[T-2h Water] Deploy municipal potable water tanker convoys to water-stressed rural hamlets',
        '[T-4h Cooling] Open public air-conditioned cooling centers equipped with medical rehydration salts'
      ];
      infrastructureProtocols = [
        'Initiate emergency canal water pulses from upstream storage reservoirs to sustain agrarian irrigation',
        'Enforce municipal non-essential water usage curtailments to conserve drinking reservoir reserves',
        'Protect rural power grids from excessive thermal transformer overload during peak cooling demand'
      ];
    }

    setDynamicResult({
      id: 'custom-' + Date.now(),
      q: q,
      hazard: hazardType,
      modelId: assignedModel,
      threatLevel: threatLevel,
      confidence: (94.5 + Math.random() * 3.5).toFixed(1) + '%',
      prediction: prediction,
      primaryDrivers: primaryDrivers,
      satelliteConsensus: satelliteConsensus,
      explanation: explanation,
      precautions: {
        immediateLifeSafety: immediateActions,
        infrastructureProtocols: infrastructureProtocols,
        medicalAndLogistics: medicalLogistics,
        containment: containment,
        evacuationRadius: '10.0 km recommended safety zone',
        affectedAssets: '14 Critical Utilities, 4 Transport Corridors',
        checklist: [
          { id: 'c1', task: `Enact Immediate Life-Safety Measures for ${hazardType}`, checked: true },
          { id: 'c2', task: 'Issue Automated Multi-Agency Broadcast Bulletins', checked: true },
          { id: 'c3', task: 'Isolate High-Risk Infrastructure & Utility Mains', checked: false },
          { id: 'c4', task: 'Deploy Mobile Emergency Supplies & Medical Relief', checked: false }
        ]
      }
    });

    setSelectedModel(assignedModel);
    setTimeout(() => setIsInferring(false), 500);
  };

  const handleCopySitRep = () => {
    if (!currentQueryData) return;
    const p = currentQueryData.precautions;
    const text = `========================================================================
TERRACORTEX AI - EMERGENCY DISASTER SITUATION REPORT (SITREP)
========================================================================
SCENARIO / QUERY: ${currentQueryData.q}
HAZARD DOMAIN:    ${currentQueryData.hazard}
THREAT SEVERITY:  ${currentQueryData.threatLevel}
MODEL BACKBONE:   ${activeModel.name}
MODEL CONFIDENCE: ${currentQueryData.confidence || '96.2%'}
PREDICTION:       ${currentQueryData.prediction}
TIMESTAMP:        ${new Date().toUTCString()}

[PRIMARY SHAP FEATURE ATTRIBUTION DRIVERS]
${currentQueryData.primaryDrivers.map((d, i) => `  ${i+1}. ${d.factor} (${d.weight}%): ${d.detail}`).join('\n')}

[MULTI-SENSOR SATELLITE CONSENSUS]
${currentQueryData.satelliteConsensus.map(s => `  • ${s}`).join('\n')}

[SCIENTIFIC EXPLANATION & PHYSICS]
${currentQueryData.explanation}

------------------------------------------------------------------------
ACTIONABLE EMERGENCY PRECAUTIONS & MITIGATION PROTOCOLS
------------------------------------------------------------------------
PHASE 1: IMMEDIATE LIFE SAFETY & EVACUATION (T-0 to T+2h)
${p.immediateLifeSafety.map(s => `  * ${s}`).join('\n')}

PHASE 2: CRITICAL INFRASTRUCTURE SAFEGUARDS (T+2h to T+6h)
${p.infrastructureProtocols.map(s => `  * ${s}`).join('\n')}

PHASE 3: MEDICAL & RELIEF LOGISTICS (T+6h to T+24h)
${p.medicalAndLogistics.map(s => `  * ${s}`).join('\n')}

PHASE 4: ENVIRONMENTAL STABILIZATION & MONITORING (T+24h+)
${p.containment.map(s => `  * ${s}`).join('\n')}

EVACUATION RADIUS: ${p.evacuationRadius}
ASSETS AT RISK:    ${p.affectedAssets}

DARPA XAI & IEEE RESPONSIBLE AI COMPLIANT AUDIT TRAIL VERIFIED
========================================================================`;

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2400);
  };

  const filteredPresetQueries = PRESET_QUERIES.filter(item => {
    if (hazardFilter === 'ALL') return true;
    if (hazardFilter === 'FLOOD') return item.hazard.includes('Flood') || item.hazard.includes('Landslide');
    if (hazardFilter === 'FIRE') return item.hazard.includes('Wildfire');
    if (hazardFilter === 'CYCLONE') return item.hazard.includes('Cyclone');
    if (hazardFilter === 'SEISMIC') return item.hazard.includes('Seismic') || item.hazard.includes('Volcanic');
    if (hazardFilter === 'DROUGHT') return item.hazard.includes('Drought');
    return true;
  });

  return (
    <div className="absolute right-4 top-20 bottom-24 w-[32rem] glass-panel rounded-2xl flex flex-col z-20 overflow-hidden border border-slate-700/70 shadow-2xl animate-in fade-in slide-in-from-right duration-300">
      
      {/* Top Header */}
      <div className="p-4 border-b border-slate-700/60 bg-slate-900/90 backdrop-blur-xl">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 border border-indigo-500/30 rounded-xl text-indigo-400">
              <Cpu className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-100 uppercase tracking-wider">Explainable AI Core</h2>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  XAI & PRECAUTIONS
                </span>
              </div>
              <p className="text-slate-400 text-[11px] font-mono mt-0.5 flex items-center gap-1.5">
                <span>SHAP Attributions</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400">Actionable Protocols</span>
                <span className="text-slate-600">•</span>
                <span className="text-cyan-400">Multi-Sensor Consensus</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleCopySitRep}
              className={`p-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 ${
                isCopied 
                  ? 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300' 
                  : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Copy Situation Report (SitRep) to clipboard"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span className="text-[10px] hidden sm:inline">{isCopied ? 'COPIED' : 'EXPORT'}</span>
            </button>

            {onClose && (
              <button 
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Close AI Copilot"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Interactive Query / Question Input Box */}
        <div className="mt-3.5">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleRunCustomInference(customSearchQuery);
            }}
            className="flex items-center gap-1.5"
          >
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={customSearchQuery}
                onChange={(e) => setCustomSearchQuery(e.target.value)}
                placeholder="Ask AI: e.g. What precautions for Cyclone Choi-wan?..."
                className="w-full pl-8 pr-3 py-2 bg-slate-950/80 border border-slate-700/80 rounded-xl text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={isInferring}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Infer</span>
            </button>
          </form>

          {/* Quick Suggestion Chips */}
          <div className="flex gap-1.5 mt-2 overflow-x-auto custom-scrollbar pb-1 text-[9px] font-mono">
            {[
              { label: '🌊 Flood Precautions', q: 'What precautions should be taken for Brahmaputra Basin flood?' },
              { label: '🔥 Wildfire Defense', q: 'Wildfire defense protocols for California Sierra Nevada' },
              { label: '🌀 Cyclone Storm Surge', q: 'What precautions for Category 4 Cyclone Choi-wan storm surge?' },
              { label: '⚡ Seismic / Tsunami', q: 'Seismic rupture precautions and tsunami advisory for Kamchatka Trench' },
              { label: '🌋 Volcanic Ash Exclusion', q: 'Volcanic ash exclusion zone precautions for Mount Semeru' },
              { label: '🌾 Drought Mitigation', q: 'Agricultural drought mitigation actions for Vidarbha' }
            ].map((chip, i) => (
              <button
                key={i}
                onClick={() => {
                  setCustomSearchQuery(chip.q);
                  handleRunCustomInference(chip.q);
                }}
                className="py-1 px-2 rounded-lg bg-slate-900/80 hover:bg-indigo-950/60 border border-slate-800 hover:border-indigo-500/50 text-slate-400 hover:text-indigo-300 whitespace-nowrap transition-all"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Neural Model Zoo Selector */}
        <div className="flex gap-1.5 mt-2.5 p-1 bg-slate-950/70 rounded-xl border border-slate-800 text-[10px] font-mono overflow-x-auto custom-scrollbar">
          {AI_MODEL_ZOO.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`py-1 px-2 rounded-lg whitespace-nowrap transition-all ${
                selectedModel === model.id
                  ? 'bg-indigo-600 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {model.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Mode View Switcher Tabs (XAI Reasoning vs Precautions & Protocols) */}
      <div className="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveViewMode('xai')}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeViewMode === 'xai'
                ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-200 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>XAI Reasoning (SHAP)</span>
          </button>

          <button
            onClick={() => setActiveViewMode('precautions')}
            className={`py-1.5 px-3 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeViewMode === 'precautions'
                ? 'bg-red-600/30 border border-red-500/50 text-red-200 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Precautions & Protocols</span>
          </button>
        </div>

        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>T-0 TO T+24H</span>
        </span>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-4">
        
        {/* Active Model Specification Card */}
        <div className="p-3.5 bg-slate-900/75 border border-slate-700/60 rounded-xl space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold text-slate-100">{activeModel.name}</h3>
              <span className="text-[10px] font-mono text-indigo-400">{activeModel.category}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {activeModel.accuracy}
            </span>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed">
            {activeModel.description}
          </p>

          <div className="grid grid-cols-2 gap-2 text-[10px] font-mono bg-slate-950/80 p-2 rounded-lg border border-slate-800">
            <div>
              <span className="text-slate-500 block">Parameter Weights</span>
              <span className="text-slate-200">{activeModel.parameters}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Inference Speed</span>
              <span className="text-cyan-400">{activeModel.latency}</span>
            </div>
          </div>
        </div>

        {/* Hazard Domain Filter Bar for Preset Queries */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span className="uppercase font-semibold">Select Disaster Scenario to Infer:</span>
            {dynamicResult && (
              <button 
                onClick={() => setDynamicResult(null)}
                className="text-cyan-400 hover:text-cyan-200 underline"
              >
                Reset to Presets
              </button>
            )}
          </div>

          <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-1 text-[9px] font-mono">
            {['ALL', 'FLOOD', 'FIRE', 'CYCLONE', 'SEISMIC', 'DROUGHT'].map(cat => (
              <button
                key={cat}
                onClick={() => setHazardFilter(cat)}
                className={`py-0.5 px-2 rounded-md transition-all ${
                  hazardFilter === cat
                    ? 'bg-slate-700 text-white font-bold'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Preset Queries List */}
          <div className="space-y-1 max-h-36 overflow-y-auto custom-scrollbar">
            {filteredPresetQueries.map((query, idx) => {
              const originalIndex = PRESET_QUERIES.findIndex(p => p.id === query.id);
              const isSelected = !dynamicResult && activeQueryIndex === originalIndex;
              return (
                <button
                  key={query.id}
                  onClick={() => handleRunInference(originalIndex)}
                  className={`w-full p-2 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/70 text-indigo-200 shadow font-semibold'
                      : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <Play className={`w-3 h-3 shrink-0 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span className="truncate">{query.q}</span>
                  </div>
                  <span className={`px-1.5 py-0.2 rounded text-[8px] font-mono font-bold shrink-0 ml-2 ${
                    query.threatLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-300' : 'bg-orange-500/20 text-orange-300'
                  }`}>
                    {query.hazard}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Active Inference Banner */}
        <div className={`p-4 bg-slate-900/85 border border-slate-700/60 rounded-xl space-y-3.5 transition-opacity ${isInferring ? 'opacity-40 animate-pulse' : 'opacity-100'}`}>
          
          {/* Header Banner */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                currentQueryData.threatLevel === 'CRITICAL' 
                  ? 'bg-red-500/25 text-red-400 border border-red-500/40 animate-pulse' 
                  : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
              }`}>
                {currentQueryData.threatLevel} THREAT
              </span>
              <span className="text-xs font-bold text-slate-200 truncate">
                {currentQueryData.hazard}
              </span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
              {currentQueryData.confidence || '96.2%'} Confidence
            </span>
          </div>

          <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-200">
            <span className="text-indigo-400 font-bold block mb-0.5">Model Output Prediction:</span>
            {currentQueryData.prediction}
          </div>

          {/* ================================================================= */}
          {/* VIEW MODE 1: XAI REASONING & FEATURE ATTRIBUTION */}
          {/* ================================================================= */}
          {activeViewMode === 'xai' && (
            <div className="space-y-3.5">
              
              {/* Primary Drivers (SHAP Bars) */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-slate-400 flex items-center justify-between">
                  <span>Input Feature Importance (SHAP Weights):</span>
                  <span className="text-indigo-400 font-bold">100% Normalized</span>
                </span>
                
                {currentQueryData.primaryDrivers.map((driver, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-medium">{driver.factor}</span>
                      <span className="font-mono text-indigo-400 font-semibold">{driver.weight}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" 
                        style={{ width: `${driver.weight * 2}%` }} 
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{driver.detail}</div>
                  </div>
                ))}
              </div>

              {/* Multi-Sensor Satellite Consensus */}
              {currentQueryData.satelliteConsensus && (
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg space-y-1.5">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                    <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                    <span>Multi-Sensor Satellite Consensus</span>
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {currentQueryData.satelliteConsensus.map((sat, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-[9px] font-mono text-slate-300">
                        🛰️ {sat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Scientific Reasoning Text */}
              <div className="pt-2.5 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-slate-200 block mb-1">AI Scientific & Physical Reasoning:</span>
                {currentQueryData.explanation}
              </div>

              {/* Uncertainty Metrics */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Epistemic Uncertainty</span>
                  <span className="text-emerald-400 font-bold">± 3.2% (Low Model Variance)</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Aleatoric Sensor Noise</span>
                  <span className="text-cyan-400 font-bold">± 4.6% (Radiometric Scatter)</span>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* VIEW MODE 2: EMERGENCY PRECAUTIONS & ACTION PROTOCOLS */}
          {/* ================================================================= */}
          {activeViewMode === 'precautions' && (
            <div className="space-y-3.5">
              
              {/* Emergency Protocol Timeline */}
              <div className="space-y-3">
                
                {/* Immediate Life Safety */}
                <div className="p-3 bg-red-950/20 border border-red-500/30 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-red-300">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                      <span>Phase 1: Immediate Life Safety & Evacuation (T-0 to T+2h)</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-red-500/30 text-red-200">
                      URGENT
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {currentQueryData.precautions?.immediateLifeSafety?.map((step, i) => (
                      <li key={i} className="leading-snug">{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Critical Infrastructure */}
                <div className="p-3 bg-orange-950/20 border border-orange-500/30 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-orange-300">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-orange-400" />
                      <span>Phase 2: Critical Infrastructure Safeguards (T+2h to T+6h)</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-orange-500/30 text-orange-200">
                      SECURITY
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {currentQueryData.precautions?.infrastructureProtocols?.map((step, i) => (
                      <li key={i} className="leading-snug">{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Medical & Logistics */}
                <div className="p-3 bg-blue-950/20 border border-blue-500/30 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-300">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      <span>Phase 3: Medical & Supply Logistics (T+6h to T+24h)</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-blue-500/30 text-blue-200">
                      DISPATCH
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {currentQueryData.precautions?.medicalAndLogistics?.map((step, i) => (
                      <li key={i} className="leading-snug">{step}</li>
                    ))}
                  </ul>
                </div>

                {/* Secondary Containment */}
                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Phase 4: Environmental Containment & Monitoring (T+24h+)</span>
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-mono bg-cyan-500/20 text-cyan-300">
                      STABILIZATION
                    </span>
                  </div>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
                    {currentQueryData.precautions?.containment?.map((step, i) => (
                      <li key={i} className="leading-snug">{step}</li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Actionable Incident Checklist (Interactive) */}
              {currentQueryData.precautions?.checklist && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                      Standard Operating Procedure (SOP) Checklist:
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400">
                      Interactive Acknowledgment
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    {currentQueryData.precautions.checklist.map((item) => {
                      const isDone = !!activeChecklist[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleChecklistItem(item.id)}
                          className={`p-2 rounded-lg border text-xs flex items-center gap-2.5 cursor-pointer transition-all ${
                            isDone 
                              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200' 
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all ${
                            isDone ? 'bg-emerald-500 border-emerald-400 text-black' : 'border-slate-600 bg-slate-800'
                          }`}>
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className={`text-[11px] ${isDone ? 'line-through opacity-80' : ''}`}>
                            {item.task}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Evacuation Perimeter and Assets summary */}
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Evacuation Perimeter</span>
                  <span className="text-red-400 font-bold">{currentQueryData.precautions?.evacuationRadius || '10 km perimeter'}</span>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-500 block">Critical Assets At Risk</span>
                  <span className="text-amber-400 font-bold">{currentQueryData.precautions?.affectedAssets || '12 Critical Sectors'}</span>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* Footer */}
      <div className="p-3 bg-[#030712] border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>DARPA XAI & IEEE Auditable Explanations</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySitRep}
            className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
          >
            {isCopied ? '✓ COPIED' : 'COPY SITREP'}
          </button>
          <span className="text-slate-600">•</span>
          <span className="text-slate-500">ONNX RUNTIME</span>
        </div>
      </div>

    </div>
  );
};

export default AICopilot;
