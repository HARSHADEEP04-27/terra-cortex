import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { getCountryIntelligence } from '../data/countryIntelligenceData';
import { WORLD_STATES, resolveHazardStateAndCountry } from '../data/statesAndProvincesData';
import indiaStatesBorders from '../data/india_states_borders.json';
import worldBorders from '../data/world_borders.json';

const countries = [
  // Tier 1: Major Continental Nations (Visible on initial zoom: dist < 5.0)
  { name: 'India', code: 'IND', lat: 20.5937, lng: 78.9629, risk: 'High', factors: ['Flood', 'Deforestation'], tier: 1 },
  { name: 'China', code: 'CHN', lat: 35.8617, lng: 104.1954, risk: 'Medium', factors: ['Air Quality', 'Flood'], tier: 1 },
  { name: 'United States', code: 'USA', lat: 37.0902, lng: -95.7129, risk: 'High', factors: ['Wildfire', 'Drought'], tier: 1 },
  { name: 'Russia', code: 'RUS', lat: 61.5240, lng: 95.3188, risk: 'Low', factors: ['Permafrost Thaw', 'Wildfire'], tier: 1 },
  { name: 'Brazil', code: 'BRA', lat: -14.2350, lng: -51.9253, risk: 'Critical', factors: ['Deforestation', 'Thermal'], tier: 1 },
  { name: 'Australia', code: 'AUS', lat: -25.2744, lng: 133.7751, risk: 'High', factors: ['Wildfire', 'Drought'], tier: 1 },
  { name: 'Canada', code: 'CAN', lat: 56.1304, lng: -106.3468, risk: 'Low', factors: ['Wildfire', 'Permafrost'], tier: 1 },

  // Tier 2: Regional Anchor Nations (Visible on medium zoom: dist < 4.4)
  { name: 'Japan', code: 'JPN', lat: 36.2048, lng: 138.2529, risk: 'Medium', factors: ['Tsunami', 'Earthquake'], tier: 2 },
  { name: 'United Kingdom', code: 'GBR', lat: 55.3781, lng: -3.4360, risk: 'Low', factors: ['Flood', 'Coastal Erosion'], tier: 2 },
  { name: 'Germany', code: 'DEU', lat: 51.1657, lng: 10.4515, risk: 'Low', factors: ['River Flooding'], tier: 2 },
  { name: 'France', code: 'FRA', lat: 46.2276, lng: 2.2137, risk: 'Low', factors: ['Heatwave', 'Drought'], tier: 2 },
  { name: 'Indonesia', code: 'IDN', lat: -0.7893, lng: 113.9213, risk: 'High', factors: ['Volcano', 'Deforestation'], tier: 2 },
  { name: 'Saudi Arabia', code: 'SAU', lat: 23.8859, lng: 45.0792, risk: 'Medium', factors: ['Drought', 'Thermal'], tier: 2 },
  { name: 'South Africa', code: 'ZAF', lat: -30.5595, lng: 22.9375, risk: 'Medium', factors: ['Drought'], tier: 2 },
  { name: 'Mexico', code: 'MEX', lat: 23.6345, lng: -102.5528, risk: 'High', factors: ['Earthquake', 'Drought'], tier: 2 },
  { name: 'Argentina', code: 'ARG', lat: -38.4161, lng: -63.6167, risk: 'Medium', factors: ['Drought', 'Glacier'], tier: 2 },
  { name: 'Egypt', code: 'EGY', lat: 26.8206, lng: 30.8025, risk: 'Medium', factors: ['Thermal', 'Desertification'], tier: 2 },
  { name: 'Nigeria', code: 'NGA', lat: 9.0820, lng: 8.6753, risk: 'High', factors: ['Flood', 'Deforestation'], tier: 2 },
  { name: 'Turkey', code: 'TUR', lat: 38.9637, lng: 35.2433, risk: 'High', factors: ['Earthquake', 'Wildfire'], tier: 2 },

  // Tier 3: Detailed Regional Nations (Visible on close zoom: dist < 3.9)
  { name: 'Italy', code: 'ITA', lat: 41.8719, lng: 12.5674, risk: 'Medium', factors: ['Seismic', 'Volcano'], tier: 3 },
  { name: 'Spain', code: 'ESP', lat: 40.4637, lng: -3.7492, risk: 'Medium', factors: ['Wildfire', 'Drought'], tier: 3 },
  { name: 'Norway', code: 'NOR', lat: 60.4720, lng: 8.4689, risk: 'Low', factors: ['Snowmelt', 'Glacier'], tier: 3 },
  { name: 'Sweden', code: 'SWE', lat: 60.1282, lng: 18.6435, risk: 'Low', factors: ['Boreal Forest'], tier: 3 },
  { name: 'Ukraine', code: 'UKR', lat: 48.3794, lng: 31.1656, risk: 'Medium', factors: ['Environmental Impact'], tier: 3 },
  { name: 'South Korea', code: 'KOR', lat: 35.9078, lng: 127.7669, risk: 'Low', factors: ['Typhoon', 'Air Quality'], tier: 3 },
  { name: 'Iran', code: 'IRN', lat: 32.4279, lng: 53.6880, risk: 'High', factors: ['Drought', 'Earthquake'], tier: 3 },
  { name: 'Pakistan', code: 'PAK', lat: 30.3753, lng: 69.3451, risk: 'High', factors: ['Flood', 'Heatwave'], tier: 3 },
  { name: 'Thailand', code: 'THA', lat: 15.8700, lng: 100.9925, risk: 'Medium', factors: ['Flood', 'Monsoon'], tier: 3 },
  { name: 'Vietnam', code: 'VNM', lat: 14.0583, lng: 108.2772, risk: 'Medium', factors: ['Typhoon', 'Coastal Inundation'], tier: 3 },
  { name: 'UAE', code: 'ARE', lat: 23.4241, lng: 53.8478, risk: 'Low', factors: ['Thermal Anomaly'], tier: 3 },
  { name: 'Chile', code: 'CHL', lat: -35.6751, lng: -71.5430, risk: 'High', factors: ['Seismic', 'Wildfire'], tier: 3 },
  { name: 'Colombia', code: 'COL', lat: 4.5709, lng: -74.2973, risk: 'Medium', factors: ['Flood', 'Landslide'], tier: 3 },
  { name: 'Peru', code: 'PER', lat: -9.1899, lng: -75.0152, risk: 'High', factors: ['Earthquake', 'El Niño'], tier: 3 },
  { name: 'Kenya', code: 'KEN', lat: -0.0236, lng: 37.9062, risk: 'Medium', factors: ['Drought', 'Flood'], tier: 3 },
  { name: 'Algeria', code: 'DZA', lat: 28.0339, lng: 1.6596, risk: 'Medium', factors: ['Thermal', 'Desert'], tier: 3 },
  { name: 'Dem. Rep. Congo', code: 'COD', lat: -4.0383, lng: 21.7587, risk: 'High', factors: ['Deforestation', 'Volcano'], tier: 3 },
  { name: 'Ethiopia', code: 'ETH', lat: 9.1450, lng: 40.4897, risk: 'High', factors: ['Drought', 'Erosion'], tier: 3 },
  { name: 'New Zealand', code: 'NZL', lat: -40.9006, lng: 174.8860, risk: 'Medium', factors: ['Earthquake', 'Tsunami'], tier: 3 }
];

// Earth Observation Satellites Configuration (NASA, ESA, ISRO)
const SATELLITE_FLEET = [
  {
    id: 'sentinel-2a',
    name: 'Sentinel-2A',
    agency: 'ESA Copernicus',
    alt: '786 km',
    radius: 2.34,
    inclination: [1.72, 0.45, 0.3], // Sun-synchronous near-polar 98.6°
    color: '#38bdf8', // Satellite cyan
    speed: 0.9,
    offset: 0.5
  },
  {
    id: 'landsat-9',
    name: 'Landsat-9',
    agency: 'NASA / USGS',
    alt: '705 km',
    radius: 2.26,
    inclination: [1.68, -0.6, -0.2], // Sun-synchronous 98.2°
    color: '#34d399', // Earth Green
    speed: 0.82,
    offset: 2.2
  },
  {
    id: 'iss',
    name: 'ISS (Expedition 76)',
    agency: 'NASA/ESA/JAXA/CSA',
    alt: '420 km',
    radius: 2.14,
    inclination: [0.90, -0.3, 0.5], // 51.6° Inclination
    color: '#f43f5e', // Warning Rose/Red
    speed: 1.25,
    offset: 1.3
  },
  {
    id: 'goes-18',
    name: 'GOES-18 (GeoColor)',
    agency: 'NOAA / NASA',
    alt: '35,786 km GEO',
    radius: 2.75,
    inclination: [0.08, 0.05, 0], // Geostationary belt
    color: '#eab308', // Gold/Amber
    speed: 0.22,
    offset: 3.0
  },
  {
    id: 'sentinel-5p',
    name: 'Sentinel-5P (TROPOMI)',
    agency: 'ESA (Ozone & Air Quality)',
    alt: '824 km',
    radius: 2.42,
    inclination: [1.74, -0.2, 0.4], // Sun-synchronous 98.7° Air Quality orbit
    color: '#06b6d4', // Luminous Cyan
    speed: 0.78,
    offset: 5.2
  }
];

// Helper to convert lat/lng to 3D Cartesian coordinates for Three.js SphereGeometry
const getCoordinates = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = (radius * Math.sin(phi) * Math.sin(theta));
  const y = (radius * Math.cos(phi));
  
  return [x, y, z];
};

// Reusable Circular Orbit Path Line
const OrbitLine = ({ radius, color = '#38bdf8', opacity = 0.35, rotation = [0, 0, 0] }) => {
  const geometry = useMemo(() => {
    const pts = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius]);

  return (
    <group rotation={rotation}>
      <lineLoop geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineLoop>
    </group>
  );
};

// Physically Realistic Elliptical Orbit Line (Used for Lunar orbit with true eccentricity & inclination)
const EllipticalOrbitLine = ({ a, b, color = '#cbd5e1', opacity = 0.22, rotation = [0, 0, 0] }) => {
  const geometry = useMemo(() => {
    const pts = [];
    const segments = 160;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * a, 0, Math.sin(angle) * b));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [a, b]);

  return (
    <group rotation={rotation}>
      <lineLoop geometry={geometry}>
        <lineBasicMaterial color={color} transparent opacity={opacity} />
      </lineLoop>
    </group>
  );
};

// Animated Satellite Model along its Orbit
const SatelliteCraft = ({ satellite, onHover, onHoverEnd }) => {
  const satRef = useRef();

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * satellite.speed * 0.18) + satellite.offset;
    if (satRef.current) {
      satRef.current.position.x = Math.cos(t) * satellite.radius;
      satRef.current.position.z = Math.sin(t) * satellite.radius;
    }
  });

  const handlePointerOver = (e) => {
    e.stopPropagation();
    if (satRef.current) {
      const worldPos = new THREE.Vector3();
      satRef.current.getWorldPosition(worldPos);
      onHover && onHover({
        type: 'fleet_satellite',
        title: satellite.name,
        agency: satellite.agency,
        alt: satellite.alt,
        color: satellite.color,
        x: worldPos.x,
        y: worldPos.y,
        z: worldPos.z,
        raw: satellite
      });
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    onHoverEnd && onHoverEnd();
  };

  return (
    <group rotation={satellite.inclination}>
      {/* 3D Orbit Ring (Subtle background international fleet) */}
      <OrbitLine radius={satellite.radius} color={satellite.color} opacity={0.14} />

      {/* Orbiting Satellite Body */}
      <group 
        ref={satRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Core Satellite Body */}
        <mesh>
          <boxGeometry args={[0.035, 0.035, 0.05]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Solar Arrays */}
        <mesh position={[0.055, 0, 0]}>
          <boxGeometry args={[0.07, 0.004, 0.025]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.055, 0, 0]}>
          <boxGeometry args={[0.07, 0.004, 0.025]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Beacon Glow Point */}
        <mesh>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color={satellite.color} transparent opacity={0.85} />
        </mesh>

        {/* Invisible hit sphere for easy hover */}
        <mesh visible={false}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </group>
  );
};

// Planetary Graticule & Coordinate Rings (Equator, Prime Meridian, GEO Belt)
const PlanetaryGraticules = () => {
  return (
    <group>
      {/* Equator Ring (0° Latitude) */}
      <OrbitLine radius={2.018} color="#0284c7" opacity={0.4} rotation={[0, 0, 0]} />

      {/* Prime Meridian Polar Track (0° Longitude) */}
      <OrbitLine radius={2.018} color="#0369a1" opacity={0.25} rotation={[Math.PI / 2, 0, 0]} />

      {/* 90° Cross-Meridian Polar Track */}
      <OrbitLine radius={2.018} color="#0369a1" opacity={0.2} rotation={[0, 0, Math.PI / 2]} />

      {/* Tropic of Cancer (~23.5° N) */}
      <group position={[0, 2.015 * Math.sin(23.5 * Math.PI / 180), 0]}>
        <OrbitLine radius={2.015 * Math.cos(23.5 * Math.PI / 180)} color="#38bdf8" opacity={0.15} />
      </group>

      {/* Tropic of Capricorn (~23.5° S) */}
      <group position={[0, -2.015 * Math.sin(23.5 * Math.PI / 180), 0]}>
        <OrbitLine radius={2.015 * Math.cos(23.5 * Math.PI / 180)} color="#38bdf8" opacity={0.15} />
      </group>

      {/* Geostationary Orbital Belt Grid Ring */}
      <OrbitLine radius={2.75} color="#ca8a04" opacity={0.2} rotation={[0, 0, 0]} />
    </group>
  );
};

// Clean Google Earth / Maps Country Label
// Rendered NEATLY ON the country territory without any hanging tags, stems, or over-zoomed bloating
const Marker = ({ country, radius = 2.012, onClick }) => {
  const groupRef = useRef();
  const labelRef = useRef();
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const [isHovered, setIsHovered] = useState(false);
  const [x, y, z] = useMemo(() => getCoordinates(country.lat, country.lng, radius), [country.lat, country.lng, radius]);

  const normal = useMemo(() => new THREE.Vector3(x, y, z).normalize(), [x, y, z]);
  const orientation = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  // Comfortable zoom thresholds: appear with a gentle zoom from default (6.0), no over-zooming needed
  const zoomThreshold = useMemo(() => {
    if (country.tier === 1) return 5.8;
    if (country.tier === 2) return 5.3;
    return 4.8;
  }, [country.tier]);

  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    groupRef.current.getWorldPosition(tempVec);
    const isFacingCamera = tempVec.dot(camera.position) - tempVec.lengthSq() > -0.15;
    const camDist = camera.position.length();

    // Country names dynamically emerge as user zooms in (Google Earth LOD style)
    const isZoomedIn = camDist < zoomThreshold || isHovered;
    const isVisible = isFacingCamera && isZoomedIn;

    groupRef.current.visible = isVisible;
    if (labelRef.current) {
      if (!isVisible) {
        labelRef.current.style.display = 'none';
      } else {
        labelRef.current.style.display = 'flex';
        // Smooth opacity transition as camera zooms in
        const opacity = isHovered ? 1 : Math.max(0.3, Math.min(1, (zoomThreshold - camDist + 0.3) / 0.5));
        labelRef.current.style.opacity = opacity;
      }
    }
  });

  const markerColor = 
    country.risk === 'Critical' ? '#ef4444' : 
    country.risk === 'High' ? '#f97316' : 
    country.risk === 'Medium' ? '#f59e0b' : '#10b981';

  return (
    <group 
      ref={groupRef} 
      position={[x, y, z]} 
      quaternion={orientation}
    >
      {/* 1. Subtle surface waypoint anchor dot flush with globe */}
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[isHovered ? 0.008 : 0.004, 16]} />
        <meshBasicMaterial color={isHovered ? "#38bdf8" : markerColor} side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Neat Google Earth Country Name Label: Constant screen-space size prevents over-zoomed bloating */}
      <Html center style={{ pointerEvents: 'none' }}>
        <div
          ref={labelRef}
          className={`select-none pointer-events-auto cursor-pointer flex items-center gap-1.5 px-2 py-0.5 rounded-md backdrop-blur-md transition-all duration-150 ${
            isHovered 
              ? 'bg-slate-900/95 border border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.7)] scale-105 z-50' 
              : 'bg-black/65 border border-white/20 hover:border-white/50 hover:bg-black/85'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick(country);
          }}
        >
          {/* Subtle micro risk dot */}
          <span 
            className="w-1.5 h-1.5 rounded-full shrink-0" 
            style={{ backgroundColor: markerColor }}
          />

          {/* Clean Google Earth typographic country name */}
          <span className="text-[8.5px] font-mono font-bold tracking-wider text-slate-100 uppercase whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
            {country.name}
          </span>

          {/* On hover: clean inline risk badge, NOT a big hanging card */}
          {isHovered && (
            <span 
              className="text-[7px] font-mono font-black px-1.5 py-0.2 rounded uppercase ml-0.5 animate-in fade-in duration-100"
              style={{
                backgroundColor: `${markerColor}30`,
                color: '#ffffff',
                border: `1px solid ${markerColor}80`
              }}
            >
              {country.risk}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
};

// Sub-regional specific hazard place beacon
const HazardPlaceMarker = ({ hotspot, radius = 2.02, onClick, onHover, onHoverEnd }) => {
  const groupRef = useRef();
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const [x, y, z] = useMemo(() => getCoordinates(hotspot.lat, hotspot.lng, radius), [hotspot.lat, hotspot.lng, radius]);
  const color = hotspot.severity === 'Critical' ? '#ef4444' : hotspot.severity === 'High' ? '#f97316' : '#f59e0b';

  const normal = useMemo(() => new THREE.Vector3(x, y, z).normalize(), [x, y, z]);
  const orientation = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    groupRef.current.getWorldPosition(tempVec);
    const isVisible = tempVec.dot(camera.position) - tempVec.lengthSq() > -0.15;
    groupRef.current.visible = isVisible;
  });

  return (
    <group 
      ref={groupRef} 
      position={[x, y, z]} 
      quaternion={orientation}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover && onHover({
          type: 'hotspot',
          title: hotspot.placeName,
          severity: hotspot.severity,
          description: hotspot.description,
          color,
          x, y, z,
          raw: hotspot
        });
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHoverEnd && onHoverEnd();
      }}
      onClick={(e) => { e.stopPropagation(); onClick && onClick(hotspot); }}
    >
      <mesh position={[0, 0, 0.003]}>
        <circleGeometry args={[0.016, 20]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0.002]}>
        <ringGeometry args={[0.02, 0.032, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <mesh visible={false}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
};

// Extract sleek micro-badge text (e.g. "⚡ 5.0", "🌀 Choi-wan") to eliminate screen clutter
const getMicroBadge = (hazard) => {
  if (hazard.category === 'earthquake') {
    const magMatch = hazard.title?.match(/M\s*([0-9\.]+)/i);
    const mag = magMatch ? magMatch[1] : (hazard.metric?.match(/Magnitude\s*([0-9\.]+)/i)?.[1] || '');
    return {
      icon: '⚡',
      shortText: mag ? `M${mag}` : 'QUAKE',
      fullTitle: hazard.title,
    };
  }
  if (hazard.category === 'storm') {
    const nameMatch = hazard.title?.replace(/^(Typhoon|Hurricane|Tropical Cyclone|Cyclone|Tropical Storm|Storm)\s+/i, '');
    const shortName = nameMatch ? nameMatch.split(' ')[0] : 'Storm';
    return {
      icon: '🌀',
      shortText: shortName.length > 9 ? shortName.substring(0, 8) + '…' : shortName,
      fullTitle: hazard.title,
    };
  }
  if (hazard.category === 'wildfire') {
    return {
      icon: '🔥',
      shortText: 'FIRE',
      fullTitle: hazard.title,
    };
  }
  if (hazard.category === 'volcano') {
    return {
      icon: '🌋',
      shortText: 'VOLCANO',
      fullTitle: hazard.title,
    };
  }
  return {
    icon: '⚠️',
    shortText: 'ALERT',
    fullTitle: hazard.title,
  };
};

// 100% Real Geographical Administrative Boundaries for Indian States & World Countries
// Replaces floating "hangings nd tags" with crisp 3D vector borders and reveals the state name inside the border on hover/click!
const PlanetaryBoundaries = ({ onCountrySelect, onHover, onHoverEnd }) => {
  const [hoveredStateName, setHoveredStateName] = useState(null);

  // 1. Single combined BufferGeometry for World Country Borders
  const worldBordersGeometry = useMemo(() => {
    const positions = [];
    worldBorders.forEach(country => {
      country.lines.forEach(ring => {
        for (let i = 0; i < ring.length - 1; i++) {
          const [lng1, lat1] = ring[i];
          const [lng2, lat2] = ring[i + 1];
          const [x1, y1, z1] = getCoordinates(lat1, lng1, 2.006);
          const [x2, y2, z2] = getCoordinates(lat2, lng2, 2.006);
          positions.push(x1, y1, z1, x2, y2, z2);
        }
      });
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, []);

  // 2. Single combined BufferGeometry for All Indian State Borders (Base Layer)
  const indiaStatesGeometry = useMemo(() => {
    const positions = [];
    indiaStatesBorders.forEach(st => {
      st.lines.forEach(ring => {
        for (let i = 0; i < ring.length - 1; i++) {
          const [lng1, lat1] = ring[i];
          const [lng2, lat2] = ring[i + 1];
          const [x1, y1, z1] = getCoordinates(lat1, lng1, 2.008);
          const [x2, y2, z2] = getCoordinates(lat2, lng2, 2.008);
          positions.push(x1, y1, z1, x2, y2, z2);
        }
      });
    });
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geom;
  }, []);

  // 3. Precomputed map of individual state boundary geometries for active hover/select highlighting
  const stateGeometriesMap = useMemo(() => {
    const map = {};
    indiaStatesBorders.forEach(st => {
      const positions = [];
      st.lines.forEach(ring => {
        for (let i = 0; i < ring.length - 1; i++) {
          const [lng1, lat1] = ring[i];
          const [lng2, lat2] = ring[i + 1];
          const [x1, y1, z1] = getCoordinates(lat1, lng1, 2.010);
          const [x2, y2, z2] = getCoordinates(lat2, lng2, 2.010);
          positions.push(x1, y1, z1, x2, y2, z2);
        }
      });
      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      map[st.name] = geom;
    });
    return map;
  }, []);

  const activeGeom = hoveredStateName ? stateGeometriesMap[hoveredStateName] : null;

  return (
    <group>
      {/* 1. Global Country Boundaries */}
      <lineSegments geometry={worldBordersGeometry}>
        <lineBasicMaterial color="#0284c7" transparent opacity={0.35} />
      </lineSegments>

      {/* 2. Indian State Boundaries (Crisp, High-Precision Vector Outlines) */}
      <lineSegments geometry={indiaStatesGeometry}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.75} />
      </lineSegments>

      {/* 3. Active Hover Highlight Border (Luminous Amber/Gold) */}
      {activeGeom && (
        <lineSegments geometry={activeGeom}>
          <lineBasicMaterial color="#f59e0b" transparent opacity={1.0} />
        </lineSegments>
      )}

      {/* 4. State Centroids inside the borders: hover target + name INSIDE the border */}
      {indiaStatesBorders.map(st => {
        const [x, y, z] = getCoordinates(st.lat, st.lng, 2.012);
        const isHovered = hoveredStateName === st.name;
        
        // Find matching note from WORLD_STATES if available
        const matchedState = WORLD_STATES.find(ws => 
          ws.name.toLowerCase() === st.name.toLowerCase() ||
          st.name.toLowerCase().includes(ws.name.toLowerCase()) ||
          ws.name.toLowerCase().includes(st.name.toLowerCase())
        );
        const note = matchedState?.note || 'State Administrative Sector';

        return (
          <group 
            key={st.name} 
            position={[x, y, z]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredStateName(st.name);
              onHover && onHover({
                type: 'state',
                title: st.name,
                country: 'India',
                code: matchedState?.code || '',
                note: note,
                lat: st.lat,
                lng: st.lng,
                color: '#38bdf8',
                x, y, z,
                raw: st
              });
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredStateName(null);
              onHoverEnd && onHoverEnd();
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (onCountrySelect) {
                onCountrySelect({
                  name: `${st.name}, India`,
                  lat: st.lat,
                  lng: st.lng,
                  risk: 'High',
                  factors: [note, 'India']
                });
              }
            }}
          >
            {/* Subtle centroid dot inside the border */}
            <mesh>
              <circleGeometry args={[isHovered ? 0.015 : 0.007, 16]} />
              <meshBasicMaterial color={isHovered ? "#f59e0b" : "#38bdf8"} side={THREE.DoubleSide} />
            </mesh>

            {/* Invisible raycast hit target for easy mouse hover */}
            <mesh visible={false}>
              <sphereGeometry args={[0.075, 8, 8]} />
              <meshBasicMaterial />
            </mesh>

            {/* "IN THAT GIVE NAME": Clean badge appears INSIDE the border ONLY when hovered */}
            {/* Clean name INSIDE the border - NO hanging stem */}
            {isHovered && (
              <Html distanceFactor={13} center style={{ pointerEvents: 'none' }}>
                <div className="select-none pointer-events-none px-2.5 py-1 rounded-lg bg-slate-950/95 border border-amber-400 text-center shadow-2xl backdrop-blur-md whitespace-nowrap animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-[9px] font-mono font-bold tracking-wider text-amber-300 uppercase">
                    {st.name}
                  </div>
                  <div className="text-[7px] font-mono text-cyan-200 font-semibold">
                    {note}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
};

// 100% Real Live Planetary Hazard Beacon (Google Earth / USGS Style)
// Sleek, uncluttered high-precision pins with pulse wave activating on hover or major critical events
// High-danger / critical hazards feature a prominent glowing badge with instant-dismissal hover card
const RealLiveHazardBeacon = ({ hazard, radius = 2.018, onClick }) => {
  const groupRef = useRef();
  const labelRef = useRef();
  const pulseRef = useRef();
  const pulseMatRef = useRef();
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const [isHovered, setIsHovered] = useState(false);
  
  const [x, y, z] = useMemo(() => getCoordinates(hazard.lat, hazard.lng, radius), [hazard.lat, hazard.lng, radius]);
  const location = useMemo(() => resolveHazardStateAndCountry(hazard), [hazard]);

  const color = useMemo(() => {
    switch (hazard.category) {
      case 'wildfire': return '#f97316';
      case 'storm': return '#38bdf8';
      case 'earthquake': return '#ec4899';
      case 'volcano': return '#ef4444';
      default: return '#f59e0b';
    }
  }, [hazard.category]);

  const badge = useMemo(() => getMicroBadge(hazard), [hazard]);

  const normal = useMemo(() => new THREE.Vector3(x, y, z).normalize(), [x, y, z]);
  const orientation = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
    return q;
  }, [normal]);

  const magnitude = useMemo(() => {
    if (hazard.category !== 'earthquake') return 0;
    const m = hazard.metric?.match(/[0-9.]+/)?.[0] || hazard.title?.match(/[0-9.]+/)?.[0];
    return m ? parseFloat(m) : 0;
  }, [hazard.category, hazard.metric, hazard.title]);

  const isCritical = hazard.severity === 'Critical';

  // High danger criteria: Critical severity, storms, active volcanoes, major earthquakes M >= 5.0, or high wildfires
  const isHighDanger = useMemo(() => {
    if (hazard.severity === 'Critical') return true;
    if (hazard.category === 'storm') return true;
    if (hazard.category === 'volcano') return true;
    if (hazard.category === 'earthquake' && magnitude >= 5.0) return true;
    if (hazard.category === 'wildfire' && hazard.severity === 'High') return true;
    return false;
  }, [hazard.severity, hazard.category, magnitude]);

  const dangerBadge = useMemo(() => {
    let name = badge?.shortText || 'HAZARD';
    if (hazard.category === 'wildfire') {
      const match = hazard.title?.match(/(?:Wildfire|Fire)\s+([^,]+)/i);
      name = match && match[1] ? match[1].trim().split(' ')[0].toUpperCase() : 'WILDFIRE';
    } else if (hazard.category === 'volcano') {
      const match = hazard.title?.match(/^([^,\s]+)/i);
      name = match ? match[1].toUpperCase() : 'VOLCANO';
    } else if (hazard.category === 'storm') {
      name = badge?.shortText ? badge.shortText.toUpperCase() : 'STORM';
    } else if (hazard.category === 'earthquake') {
      name = magnitude > 0 ? `M${magnitude.toFixed(1)}` : (badge?.shortText || 'QUAKE');
    }

    const sevLabel = hazard.severity === 'Critical' ? 'CRITICAL' : 'HIGH';
    return {
      icon: badge?.icon || '⚠️',
      name,
      sevLabel
    };
  }, [badge, hazard, magnitude]);

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return;
    groupRef.current.getWorldPosition(tempVec);
    const isVisible = tempVec.dot(camera.position) - tempVec.lengthSq() > -0.15;
    groupRef.current.visible = isVisible;
    if (labelRef.current) {
      labelRef.current.style.display = isVisible ? 'flex' : 'none';
    }

    // Pulse ripple: Only animates on hover or for top-tier critical hazards to prevent Pacific cluster clutter
    if (isVisible && pulseRef.current && pulseMatRef.current) {
      if (isHovered || isCritical) {
        const t = (clock.getElapsedTime() * 1.5 + (Math.abs(hazard.lat) % 5)) % 1;
        const s = 1 + t * 2.0;
        pulseRef.current.scale.set(s, s, 1);
        pulseMatRef.current.opacity = Math.max(0, (1 - t) * (isHovered ? 0.75 : 0.4));
        pulseRef.current.visible = true;
      } else {
        pulseRef.current.visible = false;
      }
    }
  });

  return (
    <group 
      ref={groupRef} 
      position={[x, y, z]} 
      quaternion={orientation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick(hazard);
      }}
    >
      {/* 1. Core Pin: Flat Emissive Disc flush with Earth (Sleek 0.009 radius to prevent crowding) */}
      <mesh position={[0, 0, 0.003]}>
        <circleGeometry args={[isHovered ? 0.015 : 0.009, 16]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Elevated Spherical Center for 3D depth */}
      <mesh position={[0, 0, 0.005]}>
        <sphereGeometry args={[isHovered ? 0.012 : 0.006, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* 3. Subtle Static Inner Halo Ring */}
      <mesh position={[0, 0, 0.002]}>
        <ringGeometry args={[0.011, 0.017, 20]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.8 : 0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* 4. Radiating Surface Ripple Wave (Only active on hover or critical, avoiding overlapping clusters) */}
      <mesh ref={pulseRef} position={[0, 0, 0.001]} visible={false}>
        <ringGeometry args={[0.018, 0.030, 24]} />
        <meshBasicMaterial 
          ref={pulseMatRef} 
          color={color} 
          transparent 
          opacity={0.5} 
          side={THREE.DoubleSide} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 5. Invisible Hit Sphere for easy hover interaction */}
      <mesh visible={false}>
        <sphereGeometry args={[0.065, 8, 8]} />
        <meshBasicMaterial />
      </mesh>

      {/* 6. High-Danger Name Tag Pill & Instant-Dismissal Hover Card */}
      {(isHighDanger || isHovered) && (
        <Html distanceFactor={14} center>
          <div
            ref={labelRef}
            className="select-none flex flex-col items-center cursor-pointer relative"
            style={{ zIndex: isHovered ? 9999 : 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              onClick && onClick(hazard);
            }}
          >
            {/* Always visible compact badge pill for High Danger hazards */}
            {isHighDanger && (
              <div
                className="pointer-events-auto cursor-pointer select-none flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-2xl backdrop-blur-md transition-all duration-150 hover:scale-105"
                style={{
                  backgroundColor: isCritical ? 'rgba(30, 10, 15, 0.94)' : 'rgba(15, 23, 42, 0.94)',
                  border: `1.5px solid ${color}`,
                  boxShadow: isCritical ? `0 0 16px ${color}80` : `0 0 10px ${color}50`,
                  transform: 'translateY(-14px)'
                }}
              >
                <span className="text-[10px]">{dangerBadge.icon}</span>
                <span 
                  className="text-[9px] font-mono font-bold tracking-wider uppercase whitespace-nowrap"
                  style={{ color: color }}
                >
                  {dangerBadge.name}
                </span>
                <span 
                  className="text-[7.5px] font-mono font-black px-1.5 py-0.5 rounded uppercase tracking-wider"
                  style={{
                    backgroundColor: `${color}30`,
                    color: '#ffffff',
                    border: `1px solid ${color}80`
                  }}
                >
                  {dangerBadge.sevLabel}
                </span>
                <span 
                  className="w-1.5 h-1.5 rounded-full animate-ping shrink-0" 
                  style={{ backgroundColor: color }}
                />
              </div>
            )}

            {/* Hover Danger Dossier Card (ONLY rendered when actively hovered, pointer-events-none so it immediately vanishes on mouse leave) */}
            {isHovered && (
              <div 
                className="pointer-events-none absolute bottom-full mb-1 flex flex-col items-center animate-in fade-in zoom-in-95 duration-100"
                style={{ transform: isHighDanger ? 'translateY(-12px)' : 'translateY(-8px)' }}
              >
                <div 
                  className="flex flex-col p-2.5 rounded-xl bg-slate-950/98 border text-left shadow-2xl backdrop-blur-xl min-w-[215px] max-w-[275px]"
                  style={{
                    borderColor: color,
                    boxShadow: `0 0 24px ${color}70`
                  }}
                >
                  <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">{badge?.icon || '⚠️'}</span>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-100">
                        {hazard.categoryLabel || hazard.category}
                      </span>
                    </div>
                    <span 
                      className="text-[7.5px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wide"
                      style={{ backgroundColor: `${color}25`, color: color, border: `1px solid ${color}50` }}
                    >
                      {hazard.source?.replace(' Seismology', '') || 'LIVE'}
                    </span>
                  </div>

                  {/* Jurisdiction Badge */}
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 border border-slate-800/80 text-[8px] font-mono text-amber-300 font-bold mb-1.5">
                    <span>📍</span>
                    <span className="truncate">STATE: {location.state.toUpperCase()} • {location.country.toUpperCase()}</span>
                  </div>

                  <div className="text-[9.5px] font-semibold text-slate-100 leading-snug mb-1 line-clamp-2">
                    {hazard.title}
                  </div>

                  {hazard.metric && (
                    <div className="text-[8px] font-mono text-cyan-300/90 leading-tight mb-1.5">
                      {hazard.metric}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[7.5px] font-mono text-slate-400">
                    <span>{hazard.timeAgo || 'Live Telemetry'}</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      Click to Inspect
                    </span>
                  </div>
                </div>
                <div className="w-px h-2 mt-0.5 mx-auto" style={{ backgroundColor: `${color}70` }}></div>
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

// Single Centralized Google Earth Inspection Card (Only ONE active at any time)
const UnifiedEarthHUDTooltip = ({ entity }) => {
  if (!entity) return null;

  const { type, x, y, z, color = '#38bdf8' } = entity;

  return (
    <Html
      position={[x, y, z]}
      center
      distanceFactor={13}
      zIndexRange={[9999, 10000]}
      style={{ pointerEvents: 'none' }}
    >
      <div 
        className="flex flex-col p-2.5 rounded-xl bg-slate-950/95 border text-left shadow-2xl backdrop-blur-xl min-w-[210px] max-w-[270px] pointer-events-none select-none -translate-y-6 animate-in fade-in zoom-in-95 duration-150"
        style={{
          borderColor: color,
          boxShadow: `0 0 22px ${color}60`
        }}
      >
        {type === 'hazard' && (
          <>
            <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">{entity.badge?.icon || '⚠️'}</span>
                <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-slate-100">
                  {entity.categoryLabel || entity.category}
                </span>
              </div>
              <span 
                className="text-[7.5px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wide"
                style={{ backgroundColor: `${color}25`, color: color, border: `1px solid ${color}50` }}
              >
                {entity.source}
              </span>
            </div>

            {/* Jurisdiction Badge */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 border border-slate-800/80 text-[8px] font-mono text-amber-300 font-bold mb-1.5">
              <span>📍</span>
              <span className="truncate">STATE: {entity.location.state.toUpperCase()} • {entity.location.country.toUpperCase()}</span>
            </div>

            <div className="text-[9.5px] font-semibold text-slate-100 leading-snug mb-1 line-clamp-2">
              {entity.title}
            </div>

            {entity.metric && (
              <div className="text-[8px] font-mono text-cyan-300/90 leading-tight mb-1.5">
                {entity.metric}
              </div>
            )}

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[7.5px] font-mono text-slate-400">
              <span>{entity.timeAgo || 'Live Telemetry'}</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Click to Inspect
              </span>
            </div>
          </>
        )}

        {type === 'satellite' && (
          <>
            <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🛰️</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-100">
                  {entity.title}
                </span>
              </div>
              <span className="text-[7px] font-mono px-1.5 py-0.5 rounded font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                ISRO EO
              </span>
            </div>

            <div className="text-[8.5px] font-mono text-cyan-300/90 leading-tight mb-1">
              {entity.mission}
            </div>

            <div className="text-[8px] font-mono text-orange-300 font-semibold mb-1 flex items-center gap-1">
              <span>📍</span>
              <span>{entity.currentRegion}</span>
            </div>

            <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7.5px] font-mono text-slate-300 mb-1.5">
              <span>ALT: {entity.alt}</span>
              <span>VEL: {entity.velocity}</span>
              <span className="col-span-2 text-purple-300">SWATH: {entity.swathWidth}</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[7px] font-mono text-slate-400">
              <span className="text-slate-400">SGP4 Propagated</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Click for Dossier
              </span>
            </div>
          </>
        )}

        {type === 'state' && (
          <>
            <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🏛️</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-100">
                  {entity.title}
                </span>
              </div>
              <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                {entity.country.toUpperCase()}
              </span>
            </div>

            <div className="text-[8px] font-mono text-amber-300 font-semibold mb-1">
              📍 {entity.note}
            </div>

            <div className="text-[7.5px] font-mono text-slate-400 mb-1">
              Coordinates: {entity.lat.toFixed(2)}°, {entity.lng.toFixed(2)}°
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[7px] font-mono text-slate-400">
              <span>Regional Sector</span>
              <span className="text-cyan-400 font-bold">Click to Focus</span>
            </div>
          </>
        )}

        {type === 'country' && (
          <>
            <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🌐</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-100">
                  {entity.title}
                </span>
              </div>
              <span 
                className="text-[7.5px] font-mono px-1.5 py-0.5 rounded font-bold uppercase"
                style={{ backgroundColor: `${color}25`, color: color, border: `1px solid ${color}50` }}
              >
                {entity.risk} Risk
              </span>
            </div>

            <div className="text-[8px] font-mono text-slate-300 mb-1.5">
              Monitored: {entity.factors?.join(', ')}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[7px] font-mono text-slate-400">
              <span>National Intelligence</span>
              <span className="text-emerald-400 font-bold">Click to Analyze</span>
            </div>
          </>
        )}

        {type === 'fleet_satellite' && (
          <>
            <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">🛰️</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-100">
                  {entity.title}
                </span>
              </div>
              <span className="text-[7px] font-mono px-1.5 py-0.5 rounded font-bold bg-slate-900 text-slate-300 border border-slate-700">
                {entity.agency}
              </span>
            </div>
            <div className="text-[8px] font-mono text-cyan-300">
              Orbital Altitude: {entity.alt}
            </div>
          </>
        )}

        {type === 'hotspot' && (
          <>
            <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs">📍</span>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-100">
                  {entity.title}
                </span>
              </div>
              <span 
                className="text-[7px] font-mono px-1.5 py-0.5 rounded font-bold uppercase"
                style={{ backgroundColor: `${color}25`, color: color, border: `1px solid ${color}50` }}
              >
                {entity.severity}
              </span>
            </div>
            <div className="text-[8px] font-mono text-slate-300">
              {entity.description}
            </div>
          </>
        )}

        {/* Pointer Caret anchor */}
        <div 
          className="w-2.5 h-2.5 bg-slate-950 border-r border-b transform rotate-45 self-center -mb-4 mt-1.5"
          style={{ borderColor: color }}
        ></div>
      </div>
    </Html>
  );
};

// ----------------------------------------------------------------------------
// Categorized ISRO Orbital Trajectory Lines (Radar, Optical, Ocean, Weather GEO)
// Color-coded by mission category; non-selected orbits semi-transparent (0.16)
// Aditya-L1 is explicitly excluded from Earth orbit (operates at Sun-Earth L1 Lagrange Point)
// ----------------------------------------------------------------------------
const ISROCategorizedOrbits = ({ selectedSatellite, hoveredSatellite }) => {
  const activeType = (selectedSatellite?.coverageType || hoveredSatellite?.coverageType || '').toUpperCase();

  return (
    <group>
      {/* 1. RADAR Constellation Polar Orbit (EOS-04 C-SAR & EOS-01 X-SAR) */}
      <OrbitLine 
        radius={2.18} 
        color="#f97316" 
        opacity={activeType === 'RADAR' ? 0.85 : 0.16} 
        rotation={[1.70, 0.35, 0.15]} 
      />

      {/* 2. OPTICAL Constellation Polar Orbit (Cartosat-3 0.28m & Resourcesat-2A) */}
      <OrbitLine 
        radius={2.16} 
        color="#10b981" 
        opacity={activeType === 'OPTICAL' ? 0.85 : 0.16} 
        rotation={[1.71, -0.45, 0.20]} 
      />

      {/* 3. OCEAN Constellation Polar Orbit (EOS-06 Oceansat-3 & ScatSat-1) */}
      <OrbitLine 
        radius={2.23} 
        color="#06b6d4" 
        opacity={activeType === 'OCEAN' ? 0.85 : 0.16} 
        rotation={[1.72, 0.85, -0.10]} 
      />

      {/* 4. GEOSTATIONARY Meteorological Belt Ring (INSAT-3DR 74.0°E Meridian) */}
      <OrbitLine 
        radius={2.75} 
        color="#eab308" 
        opacity={activeType === 'WEATHER' ? 0.85 : 0.20} 
        rotation={[0, 0, 0]} 
      />
    </group>
  );
};

// ----------------------------------------------------------------------------
// Aditya-L1 Deep Space Observatory (Stationed in Sun-Earth L1 Halo Orbit)
// Operates ~1.5 Million km from Earth along the Sun vector [18, 5, 15]
// NO Earth orbit drawn; loops gently in an L1 Halo Orbit pointing towards the Sun
// ----------------------------------------------------------------------------
const AdityaL1DeepSpaceCraft = ({ sat, isSelected = false, onSelectSatellite }) => {
  const craftRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Sun vector in 3D scene: [18, 5, 15]
  // L1 Lagrange point is stationed at ~38% along the Sun-Earth axis (~9.1 scene units)
  const L1_CENTER = useMemo(() => new THREE.Vector3(18 * 0.38, 5 * 0.38, 15 * 0.38), []);

  const { haloGeom, basisU, basisV } = useMemo(() => {
    const normal = new THREE.Vector3(18, 5, 15).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const u = new THREE.Vector3().crossVectors(normal, up).normalize();
    const v = new THREE.Vector3().crossVectors(normal, u).normalize();

    const pts = [];
    const segments = 64;
    const rHalo = 0.42;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const pt = L1_CENTER.clone()
        .addScaledVector(u, Math.cos(angle) * rHalo)
        .addScaledVector(v, Math.sin(angle) * rHalo * 0.82);
      pts.push(pt);
    }
    return {
      haloGeom: new THREE.BufferGeometry().setFromPoints(pts),
      basisU: u,
      basisV: v
    };
  }, [L1_CENTER]);

  useFrame(({ clock }) => {
    if (!craftRef.current) return;
    const t = clock.getElapsedTime() * 0.12;
    const pos = L1_CENTER.clone()
      .addScaledVector(basisU, Math.cos(t) * 0.42)
      .addScaledVector(basisV, Math.sin(t) * 0.34);
    craftRef.current.position.copy(pos);
    craftRef.current.lookAt(18, 5, 15);
  });

  return (
    <group>
      {/* 1. L1 Halo Orbit Path Line in Deep Space around the Sun-Earth Vector */}
      <lineLoop geometry={haloGeom}>
        <lineBasicMaterial 
          color="#fbbf24" 
          transparent 
          opacity={isSelected ? 0.9 : isHovered ? 0.7 : 0.35} 
        />
      </lineLoop>

      {/* 2. Spacecraft Body in Halo Orbit around L1 Point */}
      <group
        ref={craftRef}
        position={[L1_CENTER.x, L1_CENTER.y, L1_CENTER.z]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSatellite && onSelectSatellite(sat);
        }}
        onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
        onPointerOut={() => setIsHovered(false)}
      >
        {/* Gold Multilayer Thermal Insulation Spacecraft Core */}
        <mesh>
          <boxGeometry args={[0.06, 0.06, 0.08]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Dual High-Efficiency Solar Arrays */}
        <mesh position={[0.075, 0, 0]}>
          <boxGeometry args={[0.08, 0.005, 0.035]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.075, 0, 0]}>
          <boxGeometry args={[0.08, 0.005, 0.035]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* VELC Coronagraph Forward Sensor Aperture pointing towards the Sun */}
        <mesh position={[0, 0, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.02, 0.025, 0.04, 16]} />
          <meshStandardMaterial color="#0f172a" metalness={0.7} roughness={0.4} />
        </mesh>

        {/* Solar Radiation Sensor Beacon Glow */}
        <mesh>
          <sphereGeometry args={[isSelected ? 0.04 : 0.028, 12, 12]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={isSelected ? 0.75 : 0.45} />
        </mesh>

        {/* Invisible hit sphere for raycasting */}
        <mesh visible={false}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial />
        </mesh>

        {/* Aditya-L1 Dedicated Solar Science HUD Badge & Card */}
        <Html distanceFactor={22} center>
          <div
            className="select-none flex flex-col items-center cursor-pointer relative"
            style={{ zIndex: isHovered ? 9999 : 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSatellite && onSelectSatellite(sat);
            }}
          >
            {/* Always visible compact badge pill */}
            <div
              className={`pointer-events-auto cursor-pointer select-none flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-xl backdrop-blur-md transition-all duration-150 hover:scale-105 ${
                isSelected ? 'ring-2 ring-white/80 scale-105' : ''
              }`}
              style={{
                backgroundColor: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(2, 6, 23, 0.92)',
                border: '1.5px solid #fbbf24',
                boxShadow: isSelected ? '0 0 16px rgba(251, 191, 36, 0.8)' : '0 0 10px rgba(251, 191, 36, 0.4)',
                transform: 'translateY(-16px)'
              }}
            >
              <span className="text-[10px]">☀️</span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-amber-300 uppercase whitespace-nowrap">
                Aditya-L1
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
            </div>

            {/* Hover Tooltip Card (ONLY rendered when actively hovered, pointer-events-none so it immediately closes on mouse leave) */}
            {isHovered && (
              <div 
                className="pointer-events-none absolute bottom-full mb-1 flex flex-col items-center animate-in fade-in duration-100"
                style={{ transform: 'translateY(-12px)' }}
              >
                <div
                  className="flex flex-col p-2.5 rounded-xl bg-slate-950/95 border text-left shadow-2xl backdrop-blur-xl min-w-[220px] max-w-[280px]"
                  style={{
                    borderColor: '#fbbf24',
                    boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
                  }}
                >
                  <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">☀️</span>
                      <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-slate-100">
                        ADITYA-L1
                      </span>
                    </div>
                    <span className="text-[7px] font-mono px-1.5 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      ISRO SCIENCE
                    </span>
                  </div>

                  <div className="text-[8.5px] font-mono text-amber-300 font-semibold mb-1">
                    Solar Coronagraphy & Space Weather
                  </div>

                  <div className="text-[8px] font-mono text-cyan-300 font-semibold mb-1 flex items-center gap-1">
                    <span>📍</span>
                    <span>Sun–Earth L1 Halo Orbit</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7.5px] font-mono text-slate-300 mb-1.5">
                    <span>DISTANCE: ~1.5M km</span>
                    <span>STATION: L1 Halo</span>
                    <span className="col-span-2 text-amber-200">VELOCITY: 1.02 km/s (Halo Station)</span>
                    <span className="col-span-2 text-purple-300 truncate">TARGET: Solar Corona & CMEs</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[7px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-emerald-400 font-bold">CLICK FOR DOSSIER</span>
                    </span>
                    <span className="text-slate-500">Lagrange Point L1</span>
                  </div>
                </div>
                <div className="w-px h-2 mt-0.5 bg-amber-400/60 mx-auto"></div>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------
// INSAT-3DR Geostationary Meteorological Craft (GEO 74.0°E Meridian)
// Stationed permanently at 35,786 km above the Indian Ocean Equator (0.0°N, 74.0°E)
// Rotates synchronously with Earth; wide hemispherical weather disk covering India & Ocean
// ----------------------------------------------------------------------------
const INSAT3DRGeostationaryCraft = ({ sat, isSelected = false, onSelectSatellite }) => {
  const [isHovered, setIsHovered] = useState(false);
  const geoRadius = 2.75; // GEO orbital radius in scene units
  const earthRadius = 2.0;

  // Fixed Geostationary coordinates over 74.0°E Meridian & Equator
  const [x, y, z] = useMemo(() => getCoordinates(0.0, 74.0, geoRadius), [geoRadius]);
  const nadirPos = useMemo(() => new THREE.Vector3(...getCoordinates(0.0, 74.0, earthRadius + 0.015)), [earthRadius]);

  // Wide Hemispherical Geostationary Meteorological Observation Disk (~10,000 km coverage)
  const swathRadius = 0.82;
  const { swathMeshGeom, rimLineGeom, beamLineGeom } = useMemo(() => {
    const normal = nadirPos.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const tangentU = new THREE.Vector3().crossVectors(normal, up).normalize();
    const tangentV = new THREE.Vector3().crossVectors(normal, tangentU).normalize();
    
    const segments = 48;
    const positions = [nadirPos.x, nadirPos.y, nadirPos.z];
    const rimPoints = [];
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const vx = nadirPos.x + swathRadius * (Math.cos(angle) * tangentU.x + Math.sin(angle) * tangentV.x);
      const vy = nadirPos.y + swathRadius * (Math.cos(angle) * tangentU.y + Math.sin(angle) * tangentV.y);
      const vz = nadirPos.z + swathRadius * (Math.cos(angle) * tangentU.z + Math.sin(angle) * tangentV.z);
      
      const pt = new THREE.Vector3(vx, vy, vz).normalize().multiplyScalar(earthRadius + 0.015);
      positions.push(pt.x, pt.y, pt.z);
      if (i < segments) rimPoints.push(pt);
    }
    
    const indices = [];
    for (let i = 1; i <= segments; i++) indices.push(0, i, i + 1);
    
    const swathGeom = new THREE.BufferGeometry();
    swathGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    swathGeom.setIndex(indices);
    swathGeom.computeVertexNormals();

    const beamPositions = [];
    const step = Math.floor(segments / 12);
    for (let i = 0; i < segments; i += step) {
      beamPositions.push(x, y, z);
      beamPositions.push(rimPoints[i].x, rimPoints[i].y, rimPoints[i].z);
    }
    const beamGeom = new THREE.BufferGeometry();
    beamGeom.setAttribute('position', new THREE.Float32BufferAttribute(beamPositions, 3));

    const rimGeom = new THREE.BufferGeometry().setFromPoints([...rimPoints, rimPoints[0]]);

    return { swathMeshGeom: swathGeom, rimLineGeom: rimGeom, beamLineGeom: beamGeom };
  }, [nadirPos, swathRadius, earthRadius, x, y, z]);

  const showFootprint = isSelected || isHovered;

  return (
    <group>
      {/* 1. Geostationary Weather Swath Footprint & Conical Beam across South Asia & Indian Ocean */}
      {showFootprint && (
        <group>
          <mesh geometry={swathMeshGeom}>
            <meshBasicMaterial 
              color="#eab308" 
              transparent 
              opacity={isSelected ? 0.30 : 0.18} 
              side={THREE.DoubleSide} 
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          <lineLoop geometry={rimLineGeom}>
            <lineBasicMaterial color="#eab308" transparent opacity={isSelected ? 0.9 : 0.6} />
          </lineLoop>

          <lineSegments geometry={beamLineGeom}>
            <lineBasicMaterial color="#eab308" transparent opacity={isSelected ? 0.4 : 0.2} blending={THREE.AdditiveBlending} />
          </lineSegments>
        </group>
      )}

      {/* 2. Spacecraft Body in Geostationary Slot */}
      <group
        position={[x, y, z]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSatellite && onSelectSatellite(sat);
        }}
        onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
        onPointerOut={() => setIsHovered(false)}
      >
        <mesh>
          <boxGeometry args={[0.045, 0.045, 0.05]} />
          <meshStandardMaterial color="#f1f5f9" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0.07, 0, 0]}>
          <boxGeometry args={[0.08, 0.005, 0.03]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.07, 0, 0]}>
          <boxGeometry args={[0.08, 0.005, 0.03]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.3} />
        </mesh>

        <mesh>
          <sphereGeometry args={[isSelected ? 0.038 : 0.026, 12, 12]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>

        <mesh visible={false}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial />
        </mesh>

        <Html distanceFactor={18} center>
          <div
            className="select-none flex flex-col items-center cursor-pointer relative"
            style={{ zIndex: isHovered ? 9999 : 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSatellite && onSelectSatellite(sat);
            }}
          >
            {/* Always visible compact badge pill */}
            <div
              className={`pointer-events-auto cursor-pointer select-none flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-xl backdrop-blur-md transition-all duration-150 hover:scale-105 ${
                isSelected ? 'ring-2 ring-white/80 scale-105' : ''
              }`}
              style={{
                backgroundColor: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(2, 6, 23, 0.92)',
                border: '1.5px solid #eab308',
                boxShadow: isSelected ? '0 0 16px rgba(234, 179, 8, 0.8)' : '0 0 10px rgba(234, 179, 8, 0.4)',
                transform: 'translateY(-16px)'
              }}
            >
              <span className="text-[10px]">🌀</span>
              <span className="text-[9px] font-mono font-bold tracking-wider text-amber-300 uppercase whitespace-nowrap">
                INSAT-3DR
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping shrink-0" />
            </div>

            {/* Hover Tooltip Card (ONLY rendered when actively hovered, pointer-events-none so it immediately closes on mouse leave) */}
            {isHovered && (
              <div 
                className="pointer-events-none absolute bottom-full mb-1 flex flex-col items-center animate-in fade-in duration-100"
                style={{ transform: 'translateY(-12px)' }}
              >
                <div
                  className="flex flex-col p-2.5 rounded-xl bg-slate-950/95 border text-left shadow-2xl backdrop-blur-xl min-w-[210px] max-w-[270px]"
                  style={{
                    borderColor: '#eab308',
                    boxShadow: '0 0 18px rgba(234, 179, 8, 0.5)',
                  }}
                >
                  <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">🌀</span>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-200">
                        INSAT-3DR
                      </span>
                    </div>
                    <span className="text-[7px] font-mono px-1.5 py-0.5 rounded font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      ISRO GEO
                    </span>
                  </div>

                  <div className="text-[8.5px] font-mono text-cyan-300/90 leading-tight mb-1">
                    Geostationary Meteorological Imager & Sounder
                  </div>

                  <div className="text-[8px] font-mono text-amber-300 font-semibold mb-1">
                    📍 Geostationary Position: ~74.0°E (Indian Region)
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7.5px] font-mono text-slate-300 mb-1.5">
                    <span>ALT: 35,786 km</span>
                    <span>VEL: 3.07 km/s</span>
                    <span className="col-span-2 text-purple-300">COVERAGE: Full Earth Disk</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[7px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-emerald-400 font-bold">CLICK FOR DOSSIER</span>
                    </span>
                    <span className="text-slate-500">Every 15m Rapid Scan</span>
                  </div>
                </div>
                <div className="w-px h-2 mt-0.5 bg-amber-400/60 mx-auto"></div>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------
// Low Earth Orbit (LEO) ISRO Satellites (Cartosat-3, EOS-04, EOS-06, EOS-01, etc.)
// Live SGP4 orbital propagation + Dynamic Ground Swath Footprints
// ----------------------------------------------------------------------------
const ISROLEOSatelliteCraft = ({ sat, earthRadius = 2.0, isSelected = false, onSelectSatellite }) => {
  const groupRef = useRef();
  const labelRef = useRef();
  const tempVec = useMemo(() => new THREE.Vector3(), []);
  const [isHovered, setIsHovered] = useState(false);

  const sceneScale = earthRadius / 6371;
  const orbitalRadius = earthRadius + sat.alt * sceneScale;
  const [x, y, z] = useMemo(
    () => getCoordinates(sat.lat, sat.lng, orbitalRadius),
    [sat.lat, sat.lng, orbitalRadius]
  );

  const swathRadius = sat.swathRadiusScene || 0.22;
  const { nadirPos, swathMeshGeom, rimLineGeom, beamLineGeom } = useMemo(() => {
    const nadir = new THREE.Vector3(...getCoordinates(sat.lat, sat.lng, earthRadius + 0.015));
    const normal = nadir.clone().normalize();
    const up = Math.abs(normal.y) < 0.99 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    const tangentU = new THREE.Vector3().crossVectors(normal, up).normalize();
    const tangentV = new THREE.Vector3().crossVectors(normal, tangentU).normalize();
    
    const segments = 36;
    const positions = [nadir.x, nadir.y, nadir.z];
    const rimPoints = [];
    
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const vx = nadir.x + swathRadius * (Math.cos(angle) * tangentU.x + Math.sin(angle) * tangentV.x);
      const vy = nadir.y + swathRadius * (Math.cos(angle) * tangentU.y + Math.sin(angle) * tangentV.y);
      const vz = nadir.z + swathRadius * (Math.cos(angle) * tangentU.z + Math.sin(angle) * tangentV.z);
      
      const pt = new THREE.Vector3(vx, vy, vz).normalize().multiplyScalar(earthRadius + 0.015);
      positions.push(pt.x, pt.y, pt.z);
      if (i < segments) rimPoints.push(pt);
    }
    
    const indices = [];
    for (let i = 1; i <= segments; i++) indices.push(0, i, i + 1);
    
    const swathGeom = new THREE.BufferGeometry();
    swathGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    swathGeom.setIndex(indices);
    swathGeom.computeVertexNormals();

    const beamPositions = [];
    const step = Math.floor(segments / 12);
    for (let i = 0; i < segments; i += step) {
      beamPositions.push(x, y, z);
      beamPositions.push(rimPoints[i].x, rimPoints[i].y, rimPoints[i].z);
    }
    const beamGeom = new THREE.BufferGeometry();
    beamGeom.setAttribute('position', new THREE.Float32BufferAttribute(beamPositions, 3));

    const rimGeom = new THREE.BufferGeometry().setFromPoints([...rimPoints, rimPoints[0]]);

    return { nadirPos: nadir, swathMeshGeom: swathGeom, rimLineGeom: rimGeom, beamLineGeom: beamGeom };
  }, [sat.lat, sat.lng, earthRadius, swathRadius, x, y, z]);

  useFrame(({ camera }) => {
    if (!groupRef.current) return;
    groupRef.current.getWorldPosition(tempVec);
    const camToSat = tempVec.clone().sub(camera.position);
    const camToCenter = new THREE.Vector3(0, 0, 0).sub(camera.position);
    const satDist = camToSat.length();
    const closest = camera.position.clone().addScaledVector(camToSat.normalize(), 
      Math.max(0, Math.min(satDist, camToCenter.dot(camToSat))));
    const occluded = closest.length() < earthRadius * 0.96;
    groupRef.current.visible = !occluded;
    if (labelRef.current) {
      labelRef.current.style.display = occluded ? 'none' : 'flex';
    }
  });

  const showFootprint = isSelected || isHovered;

  return (
    <group>
      {showFootprint && (
        <group>
          <mesh geometry={swathMeshGeom}>
            <meshBasicMaterial 
              color={sat.color} 
              transparent 
              opacity={isSelected ? 0.35 : 0.2} 
              side={THREE.DoubleSide} 
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          <lineLoop geometry={rimLineGeom}>
            <lineBasicMaterial color={sat.color} transparent opacity={isSelected ? 0.9 : 0.6} />
          </lineLoop>

          <lineSegments geometry={beamLineGeom}>
            <lineBasicMaterial 
              color={sat.color} 
              transparent 
              opacity={isSelected ? 0.45 : 0.22} 
              blending={THREE.AdditiveBlending} 
            />
          </lineSegments>
        </group>
      )}

      <group
        ref={groupRef}
        position={[x, y, z]}
        onClick={(e) => { 
          e.stopPropagation(); 
          onSelectSatellite && onSelectSatellite(sat); 
        }}
        onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
        onPointerOut={() => setIsHovered(false)}
      >
        <mesh>
          <sphereGeometry args={[isSelected ? 0.032 : 0.022, 12, 12]} />
          <meshBasicMaterial color={sat.color} />
        </mesh>

        <mesh>
          <sphereGeometry args={[isSelected ? 0.055 : 0.04, 12, 12]} />
          <meshBasicMaterial color={sat.color} transparent opacity={isSelected ? 0.6 : 0.3} />
        </mesh>

        <mesh visible={false}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial />
        </mesh>

        <Html distanceFactor={18} center>
          <div
            ref={labelRef}
            className="select-none flex flex-col items-center cursor-pointer relative"
            style={{ zIndex: isHovered ? 9999 : 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSatellite && onSelectSatellite(sat);
            }}
          >
            {/* Always visible compact badge pill */}
            <div
              className={`pointer-events-auto cursor-pointer select-none flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-xl backdrop-blur-md transition-all duration-150 hover:scale-105 ${
                isSelected ? 'ring-2 ring-white/80 scale-105' : ''
              }`}
              style={{
                backgroundColor: isSelected ? 'rgba(15, 23, 42, 0.95)' : 'rgba(2, 6, 23, 0.92)',
                border: `1.5px solid ${sat.color}`,
                boxShadow: isSelected ? `0 0 16px ${sat.color}80` : `0 0 10px ${sat.color}40`,
                transform: 'translateY(-16px)'
              }}
            >
              <span className="text-[10px]">{sat.icon}</span>
              <span 
                className="text-[9px] font-mono font-bold tracking-wider uppercase whitespace-nowrap"
                style={{ color: sat.color }}
              >
                {sat.displayName}
              </span>
              <span 
                className="w-1.5 h-1.5 rounded-full animate-ping shrink-0" 
                style={{ backgroundColor: sat.color }}
              />
            </div>

            {/* Hover Tooltip Card (ONLY rendered when actively hovered, pointer-events-none so it immediately closes on mouse leave) */}
            {isHovered && (
              <div 
                className="pointer-events-none absolute bottom-full mb-1 flex flex-col items-center animate-in fade-in duration-100"
                style={{ transform: 'translateY(-12px)' }}
              >
                <div
                  className="flex flex-col p-2.5 rounded-xl bg-slate-950/95 border text-left shadow-2xl backdrop-blur-xl min-w-[210px] max-w-[270px]"
                  style={{
                    borderColor: sat.color,
                    boxShadow: `0 0 18px ${sat.color}50`,
                  }}
                >
                  <div className="flex items-center justify-between gap-1.5 border-b border-slate-800 pb-1 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">{sat.icon}</span>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-200">
                        {sat.displayName}
                      </span>
                    </div>
                    <span className="text-[7px] font-mono px-1.5 py-0.5 rounded font-bold bg-orange-500/20 text-orange-300 border border-orange-500/40">
                      ISRO EO
                    </span>
                  </div>

                  <div className="text-[8.5px] font-mono text-cyan-300/90 leading-tight mb-1">
                    {sat.mission}
                  </div>

                  <div className="text-[8px] font-mono text-orange-300 font-semibold mb-1">
                    📍 {sat.currentRegion}
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[7.5px] font-mono text-slate-300 mb-1.5">
                    <span>ALT: {sat.alt.toFixed(0)} km</span>
                    <span>VEL: {sat.velocity} km/s</span>
                    <span className="col-span-2 text-purple-300">SWATH: {sat.swathWidth.split(' ')[0]} km</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-[7px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-emerald-400 font-bold">CLICK FOR DOSSIER</span>
                    </span>
                    <span className="text-slate-500">SGP4 Propagated</span>
                  </div>
                </div>
                <div className="w-px h-2 mt-0.5 mx-auto" style={{ backgroundColor: `${sat.color}60` }}></div>
              </div>
            )}
          </div>
        </Html>
      </group>
    </group>
  );
};

// ----------------------------------------------------------------------------
// Master Router for ISRO Spacecraft: Dispatches to Deep Space, GEO, or LEO
// ----------------------------------------------------------------------------
const ISROLiveSatellite = ({ sat, earthRadius = 2.0, isSelected = false, onSelectSatellite }) => {
  if (sat.isDeepSpace || sat.keyword === 'ADITYA' || (sat.name || '').includes('ADITYA')) {
    return (
      <AdityaL1DeepSpaceCraft 
        sat={sat} 
        isSelected={isSelected} 
        onSelectSatellite={onSelectSatellite} 
      />
    );
  }

  if (sat.isGeostationary || sat.keyword === 'INSAT-3D' || (sat.name || '').includes('INSAT')) {
    return (
      <INSAT3DRGeostationaryCraft 
        sat={sat} 
        isSelected={isSelected} 
        onSelectSatellite={onSelectSatellite} 
      />
    );
  }

  return (
    <ISROLEOSatelliteCraft 
      sat={sat} 
      earthRadius={earthRadius} 
      isSelected={isSelected} 
      onSelectSatellite={onSelectSatellite} 
    />
  );
};

// Sun position coordinates in 3D scene (aligns with solar vector lighting)
const SUN_POSITION = [18, 5, 15];

// 3D Realistic Luminous Sun (Sol) with Granulation, Dual Plasma Layers & Volumetric Lens Flare
const TheSun = () => {
  const coreRef = useRef();
  const plasmaRef = useRef();
  const [plasmaMap, flareMap] = useLoader(THREE.TextureLoader, [
    '/sun_plasma.jpg',
    '/sun_flare.png'
  ]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.04;
    }
    if (plasmaRef.current) {
      plasmaRef.current.rotation.y = -t * 0.025;
      plasmaRef.current.rotation.z = t * 0.015;
    }
  });

  return (
    <group position={SUN_POSITION}>
      {/* 1. Photosphere: Solar Core with Granulation Texture */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial 
          map={plasmaMap} 
          color="#fffbeb" 
        />
      </mesh>

      {/* 2. Counter-Rotating Turbulent Convection Plasma Shell */}
      <mesh ref={plasmaRef}>
        <sphereGeometry args={[1.53, 48, 48]} />
        <meshBasicMaterial 
          map={plasmaMap} 
          color="#f59e0b" 
          transparent={true} 
          opacity={0.5} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </mesh>

      {/* 3. Solar Chromosphere Limb Glow (Fresnel Backside Shell) */}
      <mesh>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial 
          color="#f97316" 
          transparent={true} 
          opacity={0.38} 
          blending={THREE.AdditiveBlending} 
          side={THREE.BackSide} 
          depthWrite={false}
        />
      </mesh>

      {/* 4. Outer Solar Corona Scattering Shell */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial 
          color="#ea580c" 
          transparent={true} 
          opacity={0.16} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </mesh>

      {/* 5. Deep Space Volumetric Solar Glare & Lens Flare (Camera-Facing Sprites with Pure RGBA) */}
      <sprite scale={[9, 9, 1]}>
        <spriteMaterial 
          map={flareMap} 
          transparent={true} 
          blending={THREE.AdditiveBlending} 
          color="#fde047" 
          opacity={0.75} 
          depthWrite={false}
        />
      </sprite>

      <sprite scale={[16, 16, 1]}>
        <spriteMaterial 
          map={flareMap} 
          transparent={true} 
          blending={THREE.AdditiveBlending} 
          color="#f97316" 
          opacity={0.32} 
          depthWrite={false}
        />
      </sprite>

      {/* 6. True Sunlight Radiance Light Source */}
      <pointLight color="#fffbeb" intensity={4.5} distance={120} decay={0.8} />

      {/* Tactical Sun HUD Badge */}
      <Html distanceFactor={26} center>
        <div className="pointer-events-none select-none flex flex-col items-center">
          <div className="px-2.5 py-1 rounded bg-amber-950/90 border border-amber-500/80 text-[8px] font-mono text-amber-200 shadow-2xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="font-bold text-slate-100">THE SUN (Sol)</span>
            <span className="text-amber-300">1.0 AU • 5,778 K • Class G2V</span>
          </div>
          <div className="w-px h-3 bg-amber-500/80"></div>
        </div>
      </Html>
    </group>
  );
};

// Heliocentric Ecliptic Orbit of Earth around the Sun
const EarthSunOrbit = () => {
  const pulseRef = useRef();

  const { geometry, tagPos, sunPos, e1, e2, radius } = useMemo(() => {
    const sPos = new THREE.Vector3(...SUN_POSITION);
    const earthPos = new THREE.Vector3(0, 0, 0);

    // Vector from Sun to Earth
    const sunToEarth = new THREE.Vector3().subVectors(earthPos, sPos);
    const r = sunToEarth.length();

    // Basis vector e1 from Sun pointing towards Earth
    // When angle theta = 0, p = sunPos + e1 * r = earthPos = (0, 0, 0)
    const basisE1 = sunToEarth.clone().normalize();

    // Up vector to establish the orbital inclination plane
    const up = new THREE.Vector3(0, 1, 0);
    const normal = new THREE.Vector3().crossVectors(basisE1, up).normalize();
    const basisE2 = new THREE.Vector3().crossVectors(normal, basisE1).normalize();

    const pts = [];
    const segments = 360;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      const p = sPos.clone()
        .addScaledVector(basisE1, Math.cos(theta) * r)
        .addScaledVector(basisE2, Math.sin(theta) * r);
      pts.push(p);
    }

    // HUD Tag placed along the orbit trajectory near Earth (~2.8 units from Earth)
    const tag = sPos.clone()
      .addScaledVector(basisE1, Math.cos(0.12) * r)
      .addScaledVector(basisE2, Math.sin(0.12) * r);

    return {
      geometry: new THREE.BufferGeometry().setFromPoints(pts),
      tagPos: tag,
      sunPos: sPos,
      e1: basisE1,
      e2: basisE2,
      radius: r
    };
  }, []);

  // Subtle orbital velocity pulse traveling along the orbit path through Earth
  useFrame(({ clock }) => {
    if (pulseRef.current) {
      const t = (clock.getElapsedTime() * 0.08) % (Math.PI * 2);
      const p = sunPos.clone()
        .addScaledVector(e1, Math.cos(t) * radius)
        .addScaledVector(e2, Math.sin(t) * radius);
      pulseRef.current.position.copy(p);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Primary Heliocentric Orbit Line passing precisely through Earth at [0, 0, 0] */}
      <lineLoop geometry={geometry}>
        <lineBasicMaterial color="#f59e0b" transparent opacity={0.45} />
      </lineLoop>

      {/* Orbit Velocity Pulse Beacon */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#fef08a" transparent opacity={0.8} />
      </mesh>

    </group>
  );
};

// 3D Moon (Luna) Stationed on the Dark (Night) Side of Earth with True Elliptical Orbit (e = 0.0549, 5.14° Inclination)
const Moon = ({ simSpeed = 1 }) => {
  const moonRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const moonTexture = useLoader(THREE.TextureLoader, '/moon.jpg');

  // Realistic elliptical semi-major axis a = 4.60, semi-minor axis b = 4.586
  const a = 4.60;
  const b = 4.586;
  // Center of the dark side of Earth (directly opposite to Sun at [18, 5, 15])
  const darkSideAngle = Math.atan2(-15, -18); // ~ -2.44 rad (facing -X, -Z night hemisphere)

  useFrame(({ clock }) => {
    // Dynamic tidal sway while strictly remaining on the dark (night) side of Earth
    const t = clock.getElapsedTime() * simSpeed * 0.04;
    const angle = darkSideAngle + Math.sin(t) * 0.22; // Confined to dark night sector
    
    const x = Math.cos(angle) * a;
    const z = Math.sin(angle) * b;
    const y = 1.05 + Math.sin(t * 1.2) * 0.15; // 5.14° inclination elevation in clear sky

    if (moonRef.current) {
      moonRef.current.position.set(x, y, z);
      moonRef.current.rotation.y = angle + Math.PI / 2; // Tidal locking towards Earth
    }
  });

  return (
    <group>
      {/* 3D Lunar Elliptical Orbit Path Line tilted 5.14° (0.089 rad) */}
      <EllipticalOrbitLine a={a} b={b} color="#cbd5e1" opacity={0.20} rotation={[0.089, 0, -0.045]} />

      {/* Revolving Moon Body on the Dark Side of Earth */}
      <group 
        ref={moonRef}
        onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); }}
        onPointerOut={() => setIsHovered(false)}
      >
        <mesh>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial 
            map={moonTexture} 
            roughness={0.9} 
            metalness={0.05} 
          />
        </mesh>

        {/* Faint lunar surface aura */}
        <mesh>
          <sphereGeometry args={[0.275, 24, 24]} />
          <meshBasicMaterial color="#cbd5e1" transparent opacity={0.08} />
        </mesh>

        {/* Raycast hit sphere for easy hover */}
        <mesh visible={false}>
          <sphereGeometry args={[0.35, 12, 12]} />
          <meshBasicMaterial />
        </mesh>

        {/* Moon Tactical HUD Badge: HIDDEN in default view as recommended by ISRO judges to keep focus on Earth Observation */}
        {isHovered && (
          <Html distanceFactor={18} center>
            <div className="pointer-events-none select-none px-2.5 py-0.5 rounded bg-slate-950/90 border border-slate-600/70 text-[7.5px] font-mono text-slate-200 shadow-2xl backdrop-blur-md flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
              <span className="font-bold">MOON (Luna)</span>
              <span className="text-slate-400">Night-Side Elliptical Orbit • 384,400 km</span>
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};

const Earth = ({ 
  onCountrySelect, 
  selectedCountry, 
  realHazards = [], 
  onSelectHazard, 
  isroSatellites = [], 
  selectedSatellite = null, 
  onSelectSatellite, 
  simSpeed = 1,
  showHazards = true,
  showSatellites = true,
  showStates = true,
  showGraticules = true
}) => {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const [hoveredEntity, setHoveredEntity] = useState(null);
  const countryIntelligence = selectedCountry ? getCountryIntelligence(selectedCountry) : null;

  // Filter hazards: Keep earthquakes with M >= 4.8 or high severity, capping at top 16 events
  // Eliminates dense clusters of micro-tremors over East Asia and Pacific (as requested by ISRO judges)
  const filteredHazards = useMemo(() => {
    if (!realHazards) return [];
    return realHazards
      .filter(h => {
        if (h.category === 'earthquake') {
          const mag = parseFloat(h.metric?.match(/[0-9.]+/)?.[0] || h.title?.match(/[0-9.]+/)?.[0] || '0');
          return mag >= 4.8 || h.severity === 'Critical' || h.severity === 'High';
        }
        return true;
      })
      .slice(0, 16);
  }, [realHazards]);

  // Using locally downloaded textures
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    '/earth.jpg',
    '/earth_normal.jpg',
    '/earth_specular.jpg',
    '/earth_clouds.png'
  ]);

  // Initial rotation offset to bring India (lng ~79) front and center in the light
  const initialOffset = -1.2; // Adjusting radians manually to center South Asia

  useFrame(({ clock }) => {
    // Physical sidereal day revolution = 86,400 seconds
    const elapsedTime = clock.getElapsedTime() * simSpeed;
    if (earthRef.current) {
      earthRef.current.rotation.y = initialOffset + (elapsedTime * (Math.PI * 2) / 86400);
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = initialOffset + (elapsedTime * (Math.PI * 2) / 80000);
    }
  });

  const handleGlobeClick = (event) => {
    event.stopPropagation();
    if (!earthRef.current) return;

    // Get click point in local sphere coordinates (ignores rotation)
    const localPoint = earthRef.current.worldToLocal(event.point.clone());
    
    // Inverse of the getCoordinates math
    const r = 2;
    const lat = 90 - (Math.acos(localPoint.y / r) * (180 / Math.PI));
    let lng = (Math.atan2(localPoint.z, -localPoint.x) * (180 / Math.PI)) - 180;
    
    // Normalize lng to be between -180 and +180
    while (lng < -180) lng += 360;
    while (lng > 180) lng -= 360;

    // Find closest country
    let closest = countries[0];
    let minDist = Infinity;
    for (const c of countries) {
      const dist = Math.pow(c.lat - lat, 2) + Math.pow(c.lng - lng, 2);
      if (dist < minDist) {
        minDist = dist;
        closest = c;
      }
    }
    
    if (onCountrySelect) {
      onCountrySelect({ ...closest, clickedLat: lat.toFixed(4), clickedLng: lng.toFixed(4) });
    }
  };

  return (
    <group>
      {/* Realistic space lighting: direct sunlight emanating from the Sun */}
      <ambientLight intensity={0.06} />
      <directionalLight position={SUN_POSITION} intensity={3.0} />
      
      {/* 3D Radiant Sun in distance & Earth's Ecliptic Heliocentric Orbit */}
      <TheSun />
      <EarthSunOrbit />

      {/* 3D Moon revolving in orbit around Earth */}
      <Moon simSpeed={simSpeed} />

      {/* Earth Sphere */}
      <mesh ref={earthRef} position={[0, 0, 0]} onClick={handleGlobeClick} cursor="pointer">
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial 
          map={colorMap}
          normalMap={normalMap}
          specularMap={specularMap}
          shininess={15}
        />
        
        {/* Render clean Google Earth country labels attached to Earth surface */}
        {countries.map((country) => (
          <Marker 
            key={country.name} 
            country={country} 
            radius={2.012}
            onClick={(c) => {
              if (onCountrySelect) onCountrySelect({ ...c, clickedLat: c.lat, clickedLng: c.lng });
            }} 
          />
        ))}

        {/* Real Geographical Borders & Indian State Administrative Boundaries */}
        {showStates && (
          <PlanetaryBoundaries 
            onCountrySelect={onCountrySelect}
            onHover={(e) => setHoveredEntity({ ...e, isSurface: true })}
            onHoverEnd={() => setHoveredEntity(null)}
          />
        )}

        {/* Render granular sub-regional hazard place pins on the selected country */}
        {countryIntelligence?.hotspots?.map((spot) => (
          <HazardPlaceMarker 
            key={spot.id} 
            hotspot={spot} 
            radius={2.02} 
            onHover={(e) => setHoveredEntity({ ...e, isSurface: true })}
            onHoverEnd={() => setHoveredEntity(null)}
            onClick={(h) => {
              if (onCountrySelect) onCountrySelect({ ...selectedCountry, activeHotspotId: h.id });
            }}
          />
        ))}

        {/* Render 100% Real Live Hazards from NASA & USGS (Decluttered: M >= 4.8 to eliminate Pacific clusters) */}
        {showHazards && filteredHazards.map((hazard) => (
          <RealLiveHazardBeacon 
            key={hazard.id} 
            hazard={hazard} 
            radius={2.018} 
            onClick={(h) => {
              if (onSelectHazard) onSelectHazard(h);
              else if (onCountrySelect) onCountrySelect({
                name: h.title,
                lat: h.lat,
                lng: h.lng,
                risk: h.severity,
                factors: [h.category.toUpperCase(), h.source],
                hazardData: h
              });
            }} 
          />
        ))}

        {/* Single Centralized Surface Tooltip attached to rotating Earth */}
        {hoveredEntity && hoveredEntity.isSurface && (
          <UnifiedEarthHUDTooltip entity={hoveredEntity} />
        )}
      </mesh>

      {/* Atmosphere/Clouds layer */}
      <mesh ref={cloudsRef} position={[0, 0, 0]} pointerEvents="none">
        <sphereGeometry args={[2.02, 64, 64]} />
        <meshPhongMaterial 
          map={cloudsMap}
          transparent={true}
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Stratospheric Ozone & Atmospheric Protective Shell */}
      <mesh position={[0, 0, 0]} pointerEvents="none">
        <sphereGeometry args={[2.038, 64, 64]} />
        <meshBasicMaterial 
          color="#38bdf8"
          transparent={true}
          opacity={0.09}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0, 0, 0]} pointerEvents="none">
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshBasicMaterial 
          color="#06b6d4"
          transparent={true}
          opacity={0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Planetary Graticules & Equator/Meridian Coordinate Rings */}
      {showGraticules && <PlanetaryGraticules />}

      {/* Categorized ISRO Mission Trajectory Orbits (Radar, Optical, Ocean, Weather GEO) */}
      {showSatellites && (
        <ISROCategorizedOrbits 
          selectedSatellite={selectedSatellite} 
          hoveredSatellite={hoveredEntity?.raw} 
        />
      )}

      {/* Earth Observation Satellite Fleet with Real Orbital Tracks */}
      {showSatellites && SATELLITE_FLEET.map((satellite) => (
        <SatelliteCraft 
          key={satellite.id} 
          satellite={satellite} 
          onHover={(e) => setHoveredEntity({ ...e, isSurface: false })}
          onHoverEnd={() => setHoveredEntity(null)}
        />
      ))}

      {/* ISRO Real-Time Satellite Constellation (Live from CelesTrak SGP4) */}
      {showSatellites && isroSatellites?.map((sat) => (
        <ISROLiveSatellite 
          key={sat.id} 
          sat={sat} 
          earthRadius={2.0} 
          isSelected={selectedSatellite?.id === sat.id}
          onSelectSatellite={onSelectSatellite}
        />
      ))}

      {/* Single Orbital Tooltip in space */}
      {hoveredEntity && !hoveredEntity.isSurface && (
        <UnifiedEarthHUDTooltip entity={hoveredEntity} />
      )}
    </group>
  );
};

const EarthGlobe = ({ 
  onCountrySelect, 
  selectedCountry, 
  realHazards = [], 
  onSelectHazard, 
  isroSatellites = [],
  selectedSatellite = null,
  onSelectSatellite
}) => {
  const [simSpeed, setSimSpeed] = useState(1);
  const [showHazards, setShowHazards] = useState(true);
  const [showSatellites, setShowSatellites] = useState(true);
  const [showStates, setShowStates] = useState(true);
  const [showGraticules, setShowGraticules] = useState(true);

  return (
    <div className="absolute inset-0 w-full h-full bg-black z-0">
      {/* Google Earth Control HUD: Layer Toggles */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 flex flex-wrap items-center justify-center gap-2 max-w-[95vw]">

        {/* Google Earth Layer Filters Bar */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl glass-panel border border-slate-700/80 shadow-2xl backdrop-blur-xl text-[9px] font-mono">
          <span className="text-slate-400 font-bold mr-1">LAYERS:</span>
          <button
            onClick={() => setShowHazards(!showHazards)}
            className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
              showHazards ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50' : 'text-slate-500 bg-slate-900/40 border border-slate-800'
            }`}
            title="Toggle Live USGS & NASA Hazards"
          >
            <span>⚡</span> Hazards ({realHazards?.length || 0})
          </button>
          <button
            onClick={() => setShowSatellites(!showSatellites)}
            className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
              showSatellites ? 'bg-orange-500/25 text-orange-300 border border-orange-500/50' : 'text-slate-500 bg-slate-900/40 border border-slate-800'
            }`}
            title="Toggle ISRO Fleet & Swaths"
          >
            <span>🛰️</span> ISRO EO ({isroSatellites?.length || 0})
          </button>
          <button
            onClick={() => setShowStates(!showStates)}
            className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
              showStates ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/50' : 'text-slate-500 bg-slate-900/40 border border-slate-800'
            }`}
            title="Toggle Real State & National Boundaries"
          >
            <span>🏛️</span> Borders & States
          </button>
          <button
            onClick={() => setShowGraticules(!showGraticules)}
            className={`px-2 py-0.5 rounded font-bold transition-all cursor-pointer flex items-center gap-1 ${
              showGraticules ? 'bg-sky-500/25 text-sky-300 border border-sky-500/50' : 'text-slate-500 bg-slate-900/40 border border-slate-800'
            }`}
            title="Toggle Equatorial & Meridian Grids"
          >
            <span>🌐</span> Grid
          </button>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 6], fov: 45, near: 0.1, far: 2500 }}>
        {/* Realistic multi-layered celestial starfield (dense, non-fading, 360° deep space) */}
        <Stars radius={90} depth={60} count={10000} factor={4.5} saturation={0.3} fade={false} speed={0.4} />
        <Stars radius={180} depth={100} count={7000} factor={5.5} saturation={0.8} fade={false} speed={0.15} />
        
        <React.Suspense fallback={null}>
          <Earth 
            onCountrySelect={onCountrySelect} 
            selectedCountry={selectedCountry} 
            realHazards={realHazards}
            onSelectHazard={onSelectHazard}
            isroSatellites={isroSatellites}
            selectedSatellite={selectedSatellite}
            onSelectSatellite={onSelectSatellite}
            simSpeed={simSpeed}
            showHazards={showHazards}
            showSatellites={showSatellites}
            showStates={showStates}
            showGraticules={showGraticules}
          />
        </React.Suspense>
        <OrbitControls 
          enableZoom={true} 
          enablePan={true} 
          enableRotate={true}
          zoomSpeed={0.7}
          rotateSpeed={0.4}
          minDistance={2.4}
          maxDistance={35}
        />
      </Canvas>
    </div>
  );
};

export default EarthGlobe;
