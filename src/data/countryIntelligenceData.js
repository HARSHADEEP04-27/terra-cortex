// Comprehensive scientific intelligence data for countries in TerraCortex AI

export const COUNTRY_PROFILES = {
  'India': {
    name: 'India',
    iso: 'IND',
    region: 'South Asia',
    coordinates: '20.5937° N, 78.9629° E',
    satelliteConstellation: ['ISRO Bhuvan (EOS-04)', 'Sentinel-2 MSI (ESA)', 'Landsat-9 OLI-2', 'INSAT-3DR Sounder'],
    overallRisk: 'High',
    riskScore: 78,
    activeAlertsCount: 5,
    impactedPopulation: '14.2M Estimated',
    infrastructureAtRisk: '34 Critical Hubs (Dams, Coastal Pylons)',
    xaiConfidence: '94.6%',
    xaiPrimaryDriver: 'Abnormal monsoon spatial shift combined with high river discharge in Brahmaputra and Ganges tributaries.',
    hazardScores: [
      { name: 'Flood Risk', score: 84, level: 'CRITICAL', change: '+18.2%', color: '#38bdf8' },
      { name: 'Thermal Anomaly', score: 72, level: 'ELEVATED', change: '+2.8°C', color: '#f59e0b' },
      { name: 'Forest/NDVI Loss', score: 41, level: 'MODERATE', change: '-4.6%', color: '#10b981' },
      { name: 'Cyclonic Threat', score: 65, level: 'WATCH', change: 'Bay of Bengal Low', color: '#a855f7' }
    ],
    hotspots: [
      { 
        id: 'ind-1',
        placeName: 'Brahmaputra Basin (Dhubri & Kaziranga)', 
        stateProvince: 'Assam', 
        lat: 26.20, 
        lng: 92.93,
        hazardType: 'Flash Flood & Riverbank Inundation', 
        severity: 'Critical', 
        affectedPopulation: '2.8M People',
        satelliteProof: 'Sentinel-1 C-Band SAR detected 410 km² standing water expansion.',
        detail: 'River discharge reached 24,800 m³/s, breaching embankment buffer at 4 sectors. Wildlife sanctuary and agrarian floodplain submerged.',
        emergencyAction: 'Deploy NDRF inflatable rescue craft; activate embankment geo-bag reinforcement.'
      },
      { 
        id: 'ind-2',
        placeName: 'Wayanad Hill Sector (Meppadi & Chooralmala)', 
        stateProvince: 'Kerala', 
        lat: 11.68, 
        lng: 76.13,
        hazardType: 'Landslide & Debris Flow Susceptibility', 
        severity: 'Critical', 
        affectedPopulation: '420K People',
        satelliteProof: 'Soil moisture saturation 98.4% recorded by SMAP/AMSR2 microwave radar.',
        detail: 'Precipitation exceeded 310mm in 24h over tea plantation slopes. Deep shear strain detected on fragile Precambrian metamorphic bedrock.',
        emergencyAction: 'Immediate Tier-1 evacuation of downslope hamlets; establish hillside seismic acoustic monitors.'
      },
      { 
        id: 'ind-3',
        placeName: 'Vidarbha & Marathwada Agri-Belt', 
        stateProvince: 'Maharashtra', 
        lat: 21.14, 
        lng: 79.08,
        hazardType: 'Severe Agricultural Drought & Extreme Heat', 
        severity: 'High', 
        affectedPopulation: '4.1M People',
        satelliteProof: 'MODIS LST registered 43.8°C land surface temperature (+5.2°C vs baseline).',
        detail: 'Soil moisture index depleted to 14% field capacity. Cotton and soybean crops suffering critical vegetative wilting.',
        emergencyAction: 'Initiate emergency canal release; dispatch rural drinking water tanker convoys.'
      },
      { 
        id: 'ind-4',
        placeName: 'Sundarbans Mangrove Delta', 
        stateProvince: 'West Bengal', 
        lat: 21.94, 
        lng: 88.90,
        hazardType: 'Cyclonic Storm Surge & Salinity Intrusion', 
        severity: 'Elevated', 
        affectedPopulation: '1.9M People',
        satelliteProof: 'INSAT-3DR thermal channel tracked 992 hPa deep depression in central Bay of Bengal.',
        detail: 'High astronomical tide coupled with 85 km/h gale gusts threatening earthen dykes. Brackish water ingress endangering freshwater aquifers.',
        emergencyAction: 'Alert coastal warning sirens; position cyclone shelter provisions across 54 delta islands.'
      },
      { 
        id: 'ind-5',
        placeName: 'Joshimath & Dhauliganga Valley', 
        stateProvince: 'Uttarakhand', 
        lat: 30.55, 
        lng: 79.56,
        hazardType: 'Land Subsidence & Glacial Lake Influx', 
        severity: 'Elevated', 
        affectedPopulation: '85K People',
        satelliteProof: 'InSAR interferometric differential tracking measured 6.4 cm annual subsidence.',
        detail: 'Permafrost degradation and sub-surface water seepage causing continuous structural cracking in municipal buildings and road arteries.',
        emergencyAction: 'Halt heavy tunnel excavation; continuous geodetic prism monitoring on unstable spurs.'
      }
    ],
    historicalTrends: [
      { month: 'Nov 25', floodIndex: 35, thermalAnomaly: 1.1, forestHealth: 78, overallRisk: 42 },
      { month: 'Dec 25', floodIndex: 22, thermalAnomaly: 0.8, forestHealth: 76, overallRisk: 34 },
      { month: 'Jan 26', floodIndex: 18, thermalAnomaly: 1.4, forestHealth: 74, overallRisk: 31 },
      { month: 'Feb 26', floodIndex: 15, thermalAnomaly: 2.1, forestHealth: 71, overallRisk: 38 },
      { month: 'Mar 26', floodIndex: 20, thermalAnomaly: 3.4, forestHealth: 68, overallRisk: 46 },
      { month: 'Apr 26', floodIndex: 28, thermalAnomaly: 4.2, forestHealth: 62, overallRisk: 58 },
      { month: 'May 26', floodIndex: 45, thermalAnomaly: 4.8, forestHealth: 59, overallRisk: 67 },
      { month: 'Jun 26', floodIndex: 68, thermalAnomaly: 3.6, forestHealth: 65, overallRisk: 74 },
      { month: 'Jul 26', floodIndex: 82, thermalAnomaly: 2.4, forestHealth: 72, overallRisk: 81 },
      { month: 'Aug 26', floodIndex: 89, thermalAnomaly: 2.1, forestHealth: 74, overallRisk: 86 },
      { month: 'Sep 26', floodIndex: 86, thermalAnomaly: 2.6, forestHealth: 73, overallRisk: 82 },
      { month: 'Oct 26', floodIndex: 84, thermalAnomaly: 2.8, forestHealth: 71, overallRisk: 78 }
    ],
    xaiFactors: [
      { feature: 'Precipitation Anomaly', weight: 38, value: '+35% above seasonal normal' },
      { feature: 'River Discharge Level', weight: 28, value: 'Danger Threshold Exceeded (+2.8m)' },
      { feature: 'Soil Pore Saturation', weight: 19, value: '94% Hydrological Capacity' },
      { feature: 'Thermal Radar Anomaly', weight: 15, value: '+2.8°C Delta (MODIS Terra/Aqua)' }
    ],
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Trigger NDRF swift-water rescue deployment across Dhubri and Kaziranga sectors',
        '[T-1h Warning] Evacuate riverine islands (chars) and low-elevation floodplains to elevated multipurpose shelters',
        '[T-2h Exclusion] Issue red landslide alerts in Wayanad hills; seal downslope transit corridors'
      ],
      infrastructureProtocols: [
        'Throttle upstream dam sluice discharges in coordination with Central Water Commission (CWC)',
        'Isolate high-voltage substations in sub-surface flood zones to prevent secondary grid faults',
        'Deploy heavy-duty sand-fill geotextile tubes along critical embankment breach points'
      ],
      medicalAndLogistics: [
        'Pre-position 120,000 oral rehydration kits and water purification tablets at district health hubs',
        'Dispatch aerial drop food rations to marooned agricultural settlements via Indian Air Force Mi-17 helicopters',
        'Establish mobile medical response units for water-borne vector-borne disease prophylaxis'
      ],
      satellitePriority: 'Continuous ISRO EOS-04 C-Band SAR radar passes + Cartosat-3 sub-meter optical tasking'
    }
  },
  'United States': {
    name: 'United States',
    iso: 'USA',
    region: 'North America',
    coordinates: '37.0902° N, 95.7129° W',
    satelliteConstellation: ['Landsat-9 (USGS/NASA)', 'GOES-18 ABI (NOAA)', 'MODIS/VIIRS', 'Sentinel-2'],
    overallRisk: 'High',
    riskScore: 75,
    activeAlertsCount: 4,
    impactedPopulation: '6.8M Estimated',
    infrastructureAtRisk: '22 Power Grids, 14 Water Reservoirs',
    xaiConfidence: '96.1%',
    xaiPrimaryDriver: 'Severe vapor pressure deficit coupled with 60 km/h Santa Ana wind corridors sparking rapid fire ignition.',
    hazardScores: [
      { name: 'Wildfire Threat', score: 91, level: 'CRITICAL', change: '+32.4%', color: '#ef4444' },
      { name: 'Drought Index', score: 76, level: 'HIGH', change: 'Palmer D3/D4', color: '#f59e0b' },
      { name: 'Heat Stress', score: 68, level: 'ELEVATED', change: '+3.4°C', color: '#fb923c' },
      { name: 'Severe Storm', score: 44, level: 'MODERATE', change: 'Gulf Front Active', color: '#38bdf8' }
    ],
    hotspots: [
      { 
        id: 'usa-1',
        placeName: 'Sierra Nevada / Butte County', 
        stateProvince: 'California', 
        lat: 39.75, 
        lng: -121.60,
        hazardType: 'Catastrophic Wildfire Propagation', 
        severity: 'Critical', 
        affectedPopulation: '180K People',
        satelliteProof: 'VIIRS 375m I-Band detected 1,420 thermal radiative pixels.',
        detail: 'Fast-moving blaze driven by 65 km/h downslope canyon winds; burning in dense conifer timber with 8% fuel moisture.',
        emergencyAction: 'Mandatory zone-red evacuations; air tanker retardant drops on southern perimeter.'
      },
      { 
        id: 'usa-2',
        placeName: 'Lake Mead & Colorado River Basin', 
        stateProvince: 'Nevada / Arizona', 
        lat: 36.02, 
        lng: -114.73,
        hazardType: 'Hydrological Reservoir Depletion', 
        severity: 'High', 
        affectedPopulation: '25M Downstream',
        satelliteProof: 'Landsat-9 surface water extent contracted 18.4% compared to 2020.',
        detail: 'Water storage at 32% of active conservation capacity; Hoover Dam turbine minimum pool elevation under review.',
        emergencyAction: 'Mandate Tier-2 municipal water curtailments across Lower Basin states.'
      },
      { 
        id: 'usa-3',
        placeName: 'Mississippi Delta & Plaquemines Parish', 
        stateProvince: 'Louisiana', 
        lat: 29.80, 
        lng: -89.90,
        hazardType: 'Saltwater Wedge & Coastal Inundation', 
        severity: 'Elevated', 
        affectedPopulation: '840K People',
        satelliteProof: 'Sentinel-2 coastal turbidity & salinity sensors tracked marine wedge at Mile 64.',
        detail: 'Persistently low river discharge allowing Gulf of Mexico ocean saltwater intrusion to contaminate drinking water intakes.',
        emergencyAction: 'Construct emergency underwater sills; operate reverse osmosis purification plants.'
      },
      { 
        id: 'usa-4',
        placeName: 'Miami Coastal Barrier Islands', 
        stateProvince: 'Florida', 
        lat: 25.76, 
        lng: -80.19,
        hazardType: 'King Tide Sunny-Day Flooding & Storm Surge', 
        severity: 'Moderate', 
        affectedPopulation: '1.2M People',
        satelliteProof: 'Jason-3 radar altimetry recorded local sea level anomaly of +22 cm.',
        detail: 'Perigean spring tides overwhelming municipal stormwater drainage pumps; roadway inundation in low-elevation districts.',
        emergencyAction: 'Deploy mobile temporary stormwater barrier pumps along Biscayne Bay shoreline.'
      }
    ],
    historicalTrends: [
      { month: 'Nov 25', floodIndex: 25, thermalAnomaly: 0.9, forestHealth: 80, overallRisk: 35 },
      { month: 'Dec 25', floodIndex: 30, thermalAnomaly: 0.5, forestHealth: 78, overallRisk: 32 },
      { month: 'Jan 26', floodIndex: 38, thermalAnomaly: 1.2, forestHealth: 76, overallRisk: 39 },
      { month: 'Feb 26', floodIndex: 42, thermalAnomaly: 1.8, forestHealth: 74, overallRisk: 44 },
      { month: 'Mar 26', floodIndex: 34, thermalAnomaly: 2.3, forestHealth: 70, overallRisk: 48 },
      { month: 'Apr 26', floodIndex: 28, thermalArchive: 3.1, forestHealth: 66, overallRisk: 55 },
      { month: 'May 26', floodIndex: 22, thermalAnomaly: 3.8, forestHealth: 61, overallRisk: 64 },
      { month: 'Jun 26', floodIndex: 18, thermalAnomaly: 4.5, forestHealth: 54, overallRisk: 72 },
      { month: 'Jul 26', floodIndex: 15, thermalAnomaly: 5.2, forestHealth: 48, overallRisk: 82 },
      { month: 'Aug 26', floodIndex: 16, thermalAnomaly: 5.6, forestHealth: 44, overallRisk: 88 },
      { month: 'Sep 26', floodIndex: 20, thermalAnomaly: 4.4, forestHealth: 47, overallRisk: 81 },
      { month: 'Oct 26', floodIndex: 24, thermalAnomaly: 3.4, forestHealth: 52, overallRisk: 75 }
    ],
    xaiFactors: [
      { feature: 'Vapor Pressure Deficit', weight: 42, value: 'Record High (3.8 kPa)' },
      { feature: 'Sustained Wind Speed', weight: 26, value: '55 km/h gusts with dry shear' },
      { feature: 'Fine Fuel Moisture Code', weight: 20, value: 'Critically Dry (<6%)' },
      { feature: 'Satellite Thermal Hotspots', weight: 12, value: '640+ VIIRS detections/24h' }
    ],
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Enact mandatory Zone-Red evacuation for Butte County canyon corridors',
        '[T-1h Warning] Pre-position CalFire strike teams and National Guard DC-10 air tankers at McClellan',
        '[T-2h Exclusion] Shut down non-emergency highway transit routes; establish automated emergency broadcast sirens'
      ],
      infrastructureProtocols: [
        'Trigger Public Safety Power Shutoffs (PSPS) on high-voltage transmission lines through dry timber',
        'Initiate water reservoir reserve preservation across Lower Colorado Basin',
        'Install heavy underwater saltwater sills at Mississippi river navigation channels'
      ],
      medicalAndLogistics: [
        'Distribute N95/HEPA smoke mitigation filtration masks across downwind Sacramento metropolitan valley',
        'Deploy mobile air-conditioned emergency cooling and clean-air respites for vulnerable populations',
        'Pre-position burn trauma emergency units across regional university medical networks'
      ],
      satellitePriority: 'NOAA GOES-18 1-minute meso-scale rapid scans + Suomi-NPP VIIRS 375m active fire perimeter'
    }
  },
  'Brazil': {
    name: 'Brazil',
    iso: 'BRA',
    region: 'South America',
    coordinates: '14.2350° S, 51.9253° W',
    satelliteConstellation: ['Amazonia-1 (INPE)', 'Sentinel-2 MSI', 'Landsat-8/9', 'MODIS Terra'],
    overallRisk: 'Critical',
    riskScore: 88,
    activeAlertsCount: 4,
    impactedPopulation: '3.9M Estimated',
    infrastructureAtRisk: '19 River Ports, Trans-Amazonian Highway Nodes',
    xaiConfidence: '97.4%',
    xaiPrimaryDriver: 'Accelerated canopy loss along the Deforestation Arc compounding severe hydrological drought in Amazon river basin.',
    hazardScores: [
      { name: 'Deforestation Rate', score: 94, level: 'CRITICAL', change: '+44.1% vs 2025', color: '#ef4444' },
      { name: 'Drought / Low Water', score: 89, level: 'CRITICAL', change: 'Rio Negro -6.2m', color: '#f59e0b' },
      { name: 'Wildfire Influx', score: 85, level: 'CRITICAL', change: '8,400+ Fires', color: '#fb923c' },
      { name: 'Soil Degradation', score: 71, level: 'HIGH', change: 'Erosion Alert', color: '#a855f7' }
    ],
    hotspots: [
      { 
        id: 'bra-1',
        placeName: 'São Félix do Xingu & Pará Arc', 
        stateProvince: 'Pará', 
        lat: -6.64, 
        lng: -51.99,
        hazardType: 'Massive Clear-Cut Deforestation', 
        severity: 'Critical', 
        affectedPopulation: '140K People',
        satelliteProof: 'DETER/PRODES INPE flagged 1,840 km² loss in 60-day window.',
        detail: 'Heavy mechanical clearing and illegal cattle pasture burning cutting into indigenous territory buffers.',
        emergencyAction: 'Deploy federal environmental police IBAMA; freeze commercial transport corridors.'
      },
      { 
        id: 'bra-2',
        placeName: 'Manaus / Rio Negro Confluence', 
        stateProvince: 'Amazonas', 
        lat: -3.11, 
        lng: -60.02,
        hazardType: 'Historic Navigational Drought & Water Isolation', 
        severity: 'Critical', 
        affectedPopulation: '2.1M People',
        satelliteProof: 'Water level reached 12.7m (lowest depth recorded in 122 years).',
        detail: 'Tributaries impassable for freight barges carrying fuel and medical goods; mass riverine dolphin mortality.',
        emergencyAction: 'Declare federal state of calamity; initiate airlifts of water purification supplies.'
      },
      { 
        id: 'bra-3',
        placeName: 'Pantanal Biosphere Reserve', 
        stateProvince: 'Mato Grosso do Sul', 
        lat: -19.00, 
        lng: -57.65,
        hazardType: 'Sub-surface Peatland Wildfire', 
        severity: 'High', 
        affectedPopulation: '95K People',
        satelliteProof: 'Sentinel-1 SAR interferometry mapped subterranean thermal combustion fronts.',
        detail: 'Organic peat layers burning invisibly beneath dry wetland floor, flaring violently when surface vegetation ignites.',
        emergencyAction: 'Mobilize specialized amphibious firefighting teams with high-volume pump lines.'
      },
      { 
        id: 'bra-4',
        placeName: 'Taquari Valley & Porto Alegre Basin', 
        stateProvince: 'Rio Grande do Sul', 
        lat: -29.80, 
        lng: -51.95,
        hazardType: 'Atmospheric River Flash Inundation', 
        severity: 'High', 
        affectedPopulation: '1.4M People',
        satelliteProof: 'GPM satellite captured 440mm rainfall in 72h across headwater valleys.',
        detail: 'Severe flood wave exceeded historical gauge heights, flooding urban centers and disabling electrical substations.',
        emergencyAction: 'Reinforce municipal pump dikes; evacuate low-lying river bends.'
      }
    ],
    historicalTrends: [
      { month: 'Nov 25', floodIndex: 40, thermalAnomaly: 1.8, forestHealth: 72, overallRisk: 55 },
      { month: 'Dec 25', floodIndex: 50, thermalAnomaly: 1.5, forestHealth: 70, overallRisk: 58 },
      { month: 'Jan 26', floodIndex: 58, thermalAnomaly: 1.6, forestHealth: 68, overallRisk: 61 },
      { month: 'Feb 26', floodIndex: 64, thermalAnomaly: 1.9, forestHealth: 66, overallRisk: 63 },
      { month: 'Mar 26', floodIndex: 60, thermalAnomaly: 2.2, forestHealth: 64, overallRisk: 65 },
      { month: 'Apr 26', floodIndex: 52, thermalAnomaly: 2.8, forestHealth: 60, overallRisk: 69 },
      { month: 'May 26', floodIndex: 42, thermalAnomaly: 3.4, forestHealth: 55, overallRisk: 74 },
      { month: 'Jun 26', floodIndex: 32, thermalAnomaly: 4.1, forestHealth: 50, overallRisk: 79 },
      { month: 'Jul 26', floodIndex: 24, thermalAnomaly: 4.8, forestHealth: 44, overallRisk: 84 },
      { month: 'Aug 26', floodIndex: 18, thermalAnomaly: 5.6, forestHealth: 38, overallRisk: 91 },
      { month: 'Sep 26', floodIndex: 16, thermalAnomaly: 5.9, forestHealth: 35, overallRisk: 93 },
      { month: 'Oct 26', floodIndex: 20, thermalAnomaly: 5.2, forestHealth: 37, overallRisk: 88 }
    ],
    xaiFactors: [
      { feature: 'Canopy Loss Velocity', weight: 45, value: '+44.1% year-on-year increase' },
      { feature: 'River Discharge Deficit', weight: 28, value: 'Rio Negro -6.2m below threshold' },
      { feature: 'Thermal Radar Pixels', weight: 18, value: '8,420 thermal signatures detected' },
      { feature: 'Air Moisture Evapotranspiration', weight: 9, value: '-31% regional vapor pump drop' }
    ],
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Declare federal state of emergency for isolated river communities in Amazonas',
        '[T-1h Logistics] Dispatch Brazilian Navy hospital ships and amphibious craft with potable water',
        '[T-2h Environmental] Enforce immediate moratorium on land-clearing burning across Pará buffer corridors'
      ],
      infrastructureProtocols: [
        'Dredge emergency navigational trenches along critical Amazon cargo routes to sustain fuel supplies',
        'Construct localized firebreaks and peatland flood berms throughout the Pantanal biome',
        'Reinforce urban flood barriers and electrical pumping hubs in Porto Alegre'
      ],
      medicalAndLogistics: [
        'Airlift chlorine water purification units and rehydration supplies to remote indigenous villages',
        'Establish wildlife veterinary rescue triage facilities for burned and dehydrated endemic species',
        'Pre-position 50,000 emergency food hampers in Manaus logistics depots'
      ],
      satellitePriority: 'INPE Amazonia-1 wide-field camera + Sentinel-2 5-day multi-spectral deforestation alerts'
    }
  },
  'Australia': {
    name: 'Australia',
    iso: 'AUS',
    region: 'Oceania',
    coordinates: '25.2744° S, 133.7751° E',
    satelliteConstellation: ['Himawari-9 (JMA)', 'Sentinel-2 MSI', 'Landsat-9', 'Suomi-NPP VIIRS'],
    overallRisk: 'High',
    riskScore: 79,
    activeAlertsCount: 3,
    impactedPopulation: '2.1M Estimated',
    infrastructureAtRisk: '16 Agricultural Corridors, 8 Coastal Ports',
    xaiConfidence: '95.2%',
    xaiPrimaryDriver: 'Positive Indian Ocean Dipole inducing intense heatwave anomalies and vegetation dryness across Eastern territories.',
    hazardScores: [
      { name: 'Bushfire Risk', score: 88, level: 'CRITICAL', change: '+24.5%', color: '#ef4444' },
      { name: 'Heatwave Anomaly', score: 82, level: 'CRITICAL', change: '+3.9°C', color: '#f59e0b' },
      { name: 'Coral Bleaching', score: 74, level: 'HIGH', change: 'Sea Temp +1.8°C', color: '#fb923c' },
      { name: 'Agricultural Drought', score: 62, level: 'WATCH', change: 'Murray-Darling -22%', color: '#a855f7' }
    ],
    hotspots: [
      { 
        id: 'aus-1',
        placeName: 'Blue Mountains & Hunter Valley', 
        stateProvince: 'New South Wales', 
        lat: -33.71, 
        lng: 150.31,
        hazardType: 'Catastrophic Bushfire Warning', 
        severity: 'Critical', 
        affectedPopulation: '620K People',
        satelliteProof: 'Himawari-9 10-minute rapid scan captured pyro-cumulonimbus cloud formation.',
        detail: 'Forest Fire Danger Index (FFDI) exceeds 112; wind gusts over 70 km/h with dry lightning strikes.',
        emergencyAction: 'Implement total fire bans; stage remote area firefighting air tankers at Richmond RAAF.'
      },
      { 
        id: 'aus-2',
        placeName: 'Northern Great Barrier Reef', 
        stateProvince: 'Queensland', 
        lat: -14.50, 
        lng: 145.50,
        hazardType: 'Severe Marine Thermal Coral Bleaching', 
        severity: 'High', 
        affectedPopulation: 'Marine Ecosystem',
        satelliteProof: 'NOAA Coral Reef Watch Degree Heating Weeks (DHW) at 9.4°C-weeks.',
        detail: 'Sea surface temperatures +2.1°C above maximum monthly mean; 64% of shallow reefs displaying fluorescent stress expulsion.',
        emergencyAction: 'Deploy solar radiation shading pilot canopies; restrict recreational maritime anchorages.'
      },
      { 
        id: 'aus-3',
        placeName: 'Murray-Darling Agricultural Basin', 
        stateProvince: 'Victoria / NSW', 
        lat: -35.80, 
        lng: 144.90,
        hazardType: 'Hydrological Flow Collapse & Algal Toxins', 
        severity: 'Elevated', 
        affectedPopulation: '1.2M People',
        satelliteProof: 'Sentinel-2 chlorophyll-a sensor detected widespread blue-green toxic bloom.',
        detail: 'Water storage down to 38% capacity; stagnant weir pools experiencing severe hypoxic fish kills.',
        emergencyAction: 'Release environmental pulse flows from upstream headwaters; install aerator pumps.'
      }
    ],
    historicalTrends: [
      { month: 'Nov 25', floodIndex: 20, thermalAnomaly: 2.1, forestHealth: 68, overallRisk: 48 },
      { month: 'Dec 25', floodIndex: 18, thermalAnomaly: 2.8, forestHealth: 62, overallRisk: 60 },
      { month: 'Jan 26', floodIndex: 15, thermalAnomaly: 3.9, forestHealth: 54, overallRisk: 75 },
      { month: 'Feb 26', floodIndex: 22, thermalAnomaly: 4.2, forestHealth: 48, overallRisk: 82 },
      { month: 'Mar 26', floodIndex: 28, thermalAnomaly: 3.5, forestHealth: 51, overallRisk: 71 },
      { month: 'Apr 26', floodIndex: 24, thermalAnomaly: 2.2, forestHealth: 58, overallRisk: 58 },
      { month: 'May 26', floodIndex: 20, thermalAnomaly: 1.4, forestHealth: 64, overallRisk: 46 },
      { month: 'Jun 26', floodIndex: 22, thermalAnomaly: 0.9, forestHealth: 69, overallRisk: 39 },
      { month: 'Jul 26', floodIndex: 25, thermalAnomaly: 0.7, forestHealth: 71, overallRisk: 37 },
      { month: 'Aug 26', floodIndex: 22, thermalAnomaly: 1.2, forestHealth: 68, overallRisk: 44 },
      { month: 'Sep 26', floodIndex: 21, thermalAnomaly: 2.4, forestHealth: 62, overallRisk: 62 },
      { month: 'Oct 26', floodIndex: 20, thermalAnomaly: 3.6, forestHealth: 56, overallRisk: 79 }
    ],
    xaiFactors: [
      { feature: 'Forest Fire Danger Index', weight: 44, value: 'FFDI Peak: 112 (Extreme)' },
      { feature: 'Indian Ocean Dipole Phase', weight: 26, value: 'Strong Positive Phase (+1.2)' },
      { feature: 'Surface Moisture Evaporation', weight: 18, value: '-38% deficit in topsoil' },
      { feature: 'Coastal Sea Surface Temp', weight: 12, value: '+1.8°C thermal anomaly' }
    ],
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Declare "Catastrophic" fire danger and total fire ban across Greater Sydney and Hunter Valley',
        '[T-1h Warning] Order immediate evacuation of bushland fringe communities along ridge corridors',
        '[T-2h Safety] Station NSW Rural Fire Service heavy tankers at vulnerable asset protection zones'
      ],
      infrastructureProtocols: [
        'Deploy aerial retardant lines along electricity transmission easements',
        'Release emergency pulsed water flushes down the Murray River to prevent toxic cyanobacterial bloom blooms',
        'Activate automated sprinkler perimeter protections at remote communications towers'
      ],
      medicalAndLogistics: [
        'Establish air-filtered evacuation refuges equipped with oxygen and nebulizers in regional towns',
        'Coordinate livestock emergency relocation corridors out of high-temperature fire front paths',
        'Mobilize water resupply tankers for rural townships experiencing municipal reservoir exhaustion'
      ],
      satellitePriority: 'JMA Himawari-9 10-min geostationary scanning + MODIS Aqua/Terra thermal infrared'
    }
  },
  'Japan': {
    name: 'Japan',
    iso: 'JPN',
    region: 'East Asia',
    coordinates: '36.2048° N, 138.2529° E',
    satelliteConstellation: ['ALOS-2 PALSAR-2 (JAXA)', 'Himawari-9', 'Sentinel-1 SAR', 'Terra ASTER'],
    overallRisk: 'High',
    riskScore: 82,
    activeAlertsCount: 4,
    impactedPopulation: '18.5M Estimated',
    infrastructureAtRisk: 'Shinkansen High-Speed Rail, Coastal Seawalls, Nuclear Facilities',
    xaiConfidence: '96.8%',
    xaiPrimaryDriver: 'Nankai Trough subduction zone seismic deformation coupled with Western Pacific typhoon track convergence.',
    hazardScores: [
      { name: 'Seismic / Tsunami', score: 89, level: 'CRITICAL', change: 'Slow Slip +12%', color: '#ef4444' },
      { name: 'Typhoon / Surge', score: 84, level: 'CRITICAL', change: 'Typhoon Track Active', color: '#38bdf8' },
      { name: 'Volcanic Alert', score: 68, level: 'ELEVATED', change: 'Sakurajima Plume', color: '#f59e0b' },
      { name: 'Landslide Susceptibility', score: 74, level: 'HIGH', change: 'Pore Pressure High', color: '#a855f7' }
    ],
    hotspots: [
      {
        id: 'jpn-1',
        placeName: 'Nankai Trough Subduction Arc',
        stateProvince: 'Shizuoka & Kochi Offshore',
        lat: 33.20,
        lng: 135.80,
        hazardType: 'Megathrust Seismic Rupture Susceptibility',
        severity: 'Critical',
        affectedPopulation: '12.4M Coastal Population',
        satelliteProof: 'ALOS-2 InSAR detected 3.8 cm/yr differential crustal coupling strain.',
        detail: 'Continuous GNSS-Acoustic seafloor transponder drift indicates intense strain accumulation along the accretionary prism.',
        emergencyAction: 'Verify coastal tsunami seawall sluice readiness; trigger early earthquake warning train brake halts.'
      },
      {
        id: 'jpn-2',
        placeName: 'Sakurajima Volcanic Caldera',
        stateProvince: 'Kagoshima',
        lat: 31.59,
        lng: 130.65,
        hazardType: 'Explosive Eruption & Pyroclastic Ash Plume',
        severity: 'High',
        affectedPopulation: '600K People',
        satelliteProof: 'Himawari-9 SO2 column density and thermal infrared radiant flux 480 MW.',
        detail: 'Frequent vulcanian explosions ejecting ballistic bombs up to 2.5 km from Showa crater; ash column reaching 3,400m altitude.',
        emergencyAction: 'Enforce 3 km exclusion zone; ground regional turbo-prop flights in downwind corridor.'
      }
    ],
    historicalTrends: [
      { month: 'Nov 25', floodIndex: 28, thermalAnomaly: 0.8, forestHealth: 76, overallRisk: 52 },
      { month: 'Jan 26', floodIndex: 30, thermalAnomaly: 1.1, forestHealth: 74, overallRisk: 58 },
      { month: 'Mar 26', floodIndex: 34, thermalAnomaly: 1.4, forestHealth: 72, overallRisk: 64 },
      { month: 'May 26', floodIndex: 42, thermalAnomaly: 1.9, forestHealth: 69, overallRisk: 70 },
      { month: 'Jul 26', floodIndex: 65, thermalAnomaly: 2.8, forestHealth: 65, overallRisk: 78 },
      { month: 'Sep 26', floodIndex: 82, thermalAnomaly: 2.5, forestHealth: 68, overallRisk: 86 },
      { month: 'Oct 26', floodIndex: 78, thermalAnomaly: 2.1, forestHealth: 70, overallRisk: 82 }
    ],
    xaiFactors: [
      { feature: 'Crustal Strain Rate', weight: 42, value: '3.8 cm/yr GNSS seafloor slip' },
      { feature: 'Typhoon Central Pressure', weight: 30, value: '942 hPa eyewall barometric drop' },
      { feature: 'Precipitation Trigger Index', weight: 16, value: '180mm / 12h steep hillside slope' },
      { feature: 'Volcanic Gas Discharge', weight: 12, value: '1,400 tonnes/day SO2 plume' }
    ],
    precautions: {
      immediateLifeSafety: [
        '[T-0 Immediate] Trigger Shinkansen automated seismic deceleration upon P-wave detection',
        '[T-1m Alarm] Sound coastal tsunami warning sirens; mandate vertical evacuation to high-rise reinforced shelters',
        '[T-15m Evac] Enforce 3 km volcanic exclusion perimeter around active caldera vents'
      ],
      infrastructureProtocols: [
        'Close automated hydraulic storm surge gates across Tokyo Bay and Osaka Harbor',
        'Initiate safe shutdown sequences on coastal thermal and nuclear generation facilities',
        'Deploy mobile radar interferometry arrays on vulnerable expressway mountain cuts'
      ],
      medicalAndLogistics: [
        'Pre-position tsunami emergency survival kits on high-elevation municipal rooftops',
        'Dispatch volcanic ash protection goggles and dust respirators across Kagoshima prefecture',
        'Mobilize Japan Self-Defense Forces (JSDF) disaster relief helicopter battalions'
      ],
      satellitePriority: 'JAXA ALOS-2 L-Band InSAR crustal deformation + Himawari-9 rapid-scan cyclone imagery'
    }
  }
};

// Fallback dynamic generator for any country clicked that isn't hardcoded
export const getCountryIntelligence = (country) => {
  if (COUNTRY_PROFILES[country.name]) {
    return COUNTRY_PROFILES[country.name];
  }

  const baseScore = country.risk === 'Critical' ? 86 : country.risk === 'High' ? 74 : country.risk === 'Medium' ? 56 : 35;
  const factors = country.factors || ['Hydrological Anomaly', 'Atmospheric Shift'];

  return {
    name: country.name,
    iso: country.name.substring(0, 3).toUpperCase(),
    region: 'Global Terrestrial Node',
    coordinates: `${country.clickedLat || country.lat || 0}° N, ${country.clickedLng || country.lng || 0}° E`,
    satelliteConstellation: ['Sentinel-2 MSI', 'Landsat-9', 'Terra/Aqua MODIS', 'MetOp-C'],
    overallRisk: country.risk || 'Medium',
    riskScore: baseScore,
    activeAlertsCount: country.risk === 'Critical' ? 4 : 2,
    impactedPopulation: country.risk === 'Critical' ? '4.8M Estimated' : '1.2M Estimated',
    infrastructureAtRisk: '12 Essential Infrastructure Sectors',
    xaiConfidence: '91.8%',
    xaiPrimaryDriver: `Multi-sensor satellite consensus detected anomalies primarily related to ${factors.join(' and ')}.`,
    hazardScores: [
      { name: factors[0] || 'Hydro Disruption', score: baseScore, level: country.risk ? country.risk.toUpperCase() : 'ELEVATED', change: '+12.4%', color: '#38bdf8' },
      { name: factors[1] || 'Thermal Variance', score: Math.max(30, baseScore - 12), level: 'ELEVATED', change: '+1.9°C', color: '#f59e0b' },
      { name: 'Vegetation Drift', score: 48, level: 'MODERATE', change: '-2.8%', color: '#10b981' },
      { name: 'Atmospheric Pressure', score: 55, level: 'MONITORED', change: 'Stable System', color: '#a855f7' }
    ],
    hotspots: [
      { 
        id: 'gen-1',
        placeName: `${country.name} Northern Sector`, 
        stateProvince: 'Upper Watershed',
        lat: Number(country.clickedLat || country.lat || 0) + 2.5,
        lng: Number(country.clickedLng || country.lng || 0) + 1.2,
        hazardType: factors[0] || 'Environmental Stress', 
        severity: country.risk || 'High', 
        affectedPopulation: '1.2M People',
        satelliteProof: 'Spectral reflectance anomaly recorded across 3 consecutive orbits.',
        detail: `Multi-spectral observation indicates elevated ${factors[0] || 'activity'} across central coordinates with 14-day persistent baseline deviation.`,
        emergencyAction: 'Elevate regional civil protection readiness; deploy satellite ground truth calibration kits.'
      },
      { 
        id: 'gen-2',
        placeName: `${country.name} Coastal / River Corridor`, 
        stateProvince: 'Southern Basin',
        lat: Number(country.clickedLat || country.lat || 0) - 1.8,
        lng: Number(country.clickedLng || country.lng || 0) - 1.5,
        hazardType: factors[1] || 'Secondary Anomaly', 
        severity: 'Moderate', 
        affectedPopulation: '450K People',
        satelliteProof: 'Thermal infrared divergence +1.9°C relative to climatological mean.',
        detail: 'Automated baseline deviation recorded by orbital multispectral radiometric radiometer.',
        emergencyAction: 'Monitor drainage basin volume and maintain radio link with national disaster response agency.'
      }
    ],
    historicalTrends: [
      { month: 'Nov 25', floodIndex: 30, thermalAnomaly: 1.0, forestHealth: 75, overallRisk: baseScore - 18 },
      { month: 'Jan 26', floodIndex: 34, thermalAnomaly: 1.2, forestHealth: 73, overallRisk: baseScore - 12 },
      { month: 'Mar 26', floodIndex: 40, thermalAnomaly: 1.6, forestHealth: 70, overallRisk: baseScore - 8 },
      { month: 'May 26', floodIndex: 46, thermalAnomaly: 2.1, forestHealth: 66, overallRisk: baseScore - 4 },
      { month: 'Jul 26', floodIndex: 58, thermalAnomaly: 2.8, forestHealth: 61, overallRisk: baseScore + 2 },
      { month: 'Sep 26', floodIndex: 52, thermalAnomaly: 2.4, forestHealth: 64, overallRisk: baseScore },
      { month: 'Oct 26', floodIndex: 54, thermalAnomaly: 2.3, forestHealth: 63, overallRisk: baseScore }
    ],
    xaiFactors: [
      { feature: `${factors[0] || 'Hydrological Variance'}`, weight: 46, value: 'Primary Satellite Driver' },
      { feature: 'Thermal Radar Radiance', weight: 28, value: '+1.9°C Variance vs 10-Yr Mean' },
      { feature: 'Canopy Reflection Degradation', weight: 16, value: 'NDVI Delta -0.14' },
      { feature: 'Regional Soil Moisture', weight: 10, value: 'Moderately Depleted' }
    ],
    precautions: {
      immediateLifeSafety: [
        `[T-0 Immediate] Elevate national civil protection preparedness to ${country.risk || 'High'} alert level`,
        `[T-1h Warning] Issue localized hazard bulletins for vulnerable populations across ${country.name}`,
        `[T-2h Evacuation] Establish safe transit corridors away from primary ${factors[0] || 'risk'} zones`
      ],
      infrastructureProtocols: [
        'Place regional emergency power and telecommunication backup generators on hot standby',
        'Inspect major drainage works and transportation arteries for early structural impairment',
        'Verify satellite uplink communication continuity with regional disaster operations centers'
      ],
      medicalAndLogistics: [
        'Pre-position emergency water purification and medical first-aid reserves at district distribution hubs',
        'Establish inter-agency command liaison between municipal first responders and civil defense authorities',
        'Activate volunteer emergency response networks and community alert broadcasts'
      ],
      satellitePriority: 'Sentinel-2 MSI + Landsat-9 10m multi-spectral pass tasking'
    }
  };
};
