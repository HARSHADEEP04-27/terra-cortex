// ============================================================================
// Planetary States & Sub-Regional Administrative Divisions
// ============================================================================
// Granular state, province, and regional centroids for adaptive Level-of-Detail
// (LOD) zoom visualization on the 3D Earth globe.
// ============================================================================

export const WORLD_STATES = [
  // --- INDIA STATES & REGIONS (ISRO Operations Focus) ---
  { id: 'in-as', name: 'Assam', country: 'India', lat: 26.2006, lng: 92.9376, code: 'AS', note: 'Brahmaputra Flood Basin' },
  { id: 'in-mh', name: 'Maharashtra', country: 'India', lat: 19.7515, lng: 75.7139, code: 'MH', note: 'Deccan Plateau' },
  { id: 'in-od', name: 'Odisha', country: 'India', lat: 20.9517, lng: 85.0985, code: 'OD', note: 'Bay of Bengal Cyclone Coast' },
  { id: 'in-gj', name: 'Gujarat', country: 'India', lat: 22.2587, lng: 71.1924, code: 'GJ', note: 'Kutch Fault Line' },
  { id: 'in-kl', name: 'Kerala', country: 'India', lat: 10.8505, lng: 76.2711, code: 'KL', note: 'Western Ghats Monsoon' },
  { id: 'in-tn', name: 'Tamil Nadu', country: 'India', lat: 11.1271, lng: 78.6569, code: 'TN', note: 'Coromandel Coastal Zone' },
  { id: 'in-ap', name: 'Andhra Pradesh', country: 'India', lat: 15.9129, lng: 79.7400, code: 'AP', note: 'Sriharikota SDSC Launch Range' },
  { id: 'in-tg', name: 'Telangana', country: 'India', lat: 18.1124, lng: 79.0193, code: 'TS', note: 'NRSC Shadnagar Earth Station' },
  { id: 'in-ka', name: 'Karnataka', country: 'India', lat: 15.3173, lng: 75.7139, code: 'KA', note: 'ISRO HQ Bengaluru / ISTRAC' },
  { id: 'in-wb', name: 'West Bengal', country: 'India', lat: 22.9868, lng: 87.8550, code: 'WB', note: 'Sundarbans Delta Mangroves' },
  { id: 'in-up', name: 'Uttar Pradesh', country: 'India', lat: 26.8467, lng: 80.9462, code: 'UP', note: 'Gangetic Floodplain' },
  { id: 'in-br', name: 'Bihar', country: 'India', lat: 25.0961, lng: 85.3131, code: 'BR', note: 'Kosi River Inundation' },
  { id: 'in-rj', name: 'Rajasthan', country: 'India', lat: 27.0238, lng: 74.2179, code: 'RJ', note: 'Thar Desert Aridity' },
  { id: 'in-mp', name: 'Madhya Pradesh', country: 'India', lat: 22.9734, lng: 78.6569, code: 'MP', note: 'Central India Forest Reserve' },
  { id: 'in-pb', name: 'Punjab', country: 'India', lat: 31.1471, lng: 75.3412, code: 'PB', note: 'Indus Agricultural Basin' },
  { id: 'in-uk', name: 'Uttarakhand', country: 'India', lat: 30.0668, lng: 79.0193, code: 'UK', note: 'Himalayan GLOF & Landslides' },
  { id: 'in-hp', name: 'Himachal Pradesh', country: 'India', lat: 31.1048, lng: 77.1734, code: 'HP', note: 'Snow Cover & Cloudburst' },
  { id: 'in-jk', name: 'Jammu & Kashmir', country: 'India', lat: 33.7782, lng: 76.5762, code: 'JK', note: 'Glacier Melt Monitoring' },

  // --- UNITED STATES STATES ---
  { id: 'us-tx', name: 'Texas', country: 'United States', lat: 31.9686, lng: -99.9018, code: 'TX', note: 'Gulf Coast & Brushfire Sector' },
  { id: 'us-ca', name: 'California', country: 'United States', lat: 36.7783, lng: -119.4179, code: 'CA', note: 'San Andreas Fault & Wildfires' },
  { id: 'us-fl', name: 'Florida', country: 'United States', lat: 27.6648, lng: -81.5158, code: 'FL', note: 'Atlantic Hurricane Surge' },
  { id: 'us-wa', name: 'Washington', country: 'United States', lat: 47.7511, lng: -120.7401, code: 'WA', note: 'Cascadia Subduction Zone' },
  { id: 'us-ny', name: 'New York', country: 'United States', lat: 40.7128, lng: -74.0060, code: 'NY', note: 'Atlantic Seaboard' },
  { id: 'us-ak', name: 'Alaska', country: 'United States', lat: 64.2008, lng: -149.4937, code: 'AK', note: 'Aleutian Subduction Arc' },
  { id: 'us-hi', name: 'Hawaii', country: 'United States', lat: 19.8968, lng: -155.5828, code: 'HI', note: 'Kilauea Active Volcano' },

  // --- JAPAN REGIONS ---
  { id: 'jp-hk', name: 'Hokkaido', country: 'Japan', lat: 43.0642, lng: 141.3469, code: 'HK', note: 'Kuril Trench Seismicity' },
  { id: 'jp-th', name: 'Tohoku', country: 'Japan', lat: 38.2682, lng: 140.8694, code: 'TH', note: 'Japan Trench Subduction' },
  { id: 'jp-kn', name: 'Honshu (Tokyo)', country: 'Japan', lat: 35.6762, lng: 139.6503, code: 'KT', note: 'Kanto Plain' },
  { id: 'jp-ky', name: 'Kyushu', country: 'Japan', lat: 32.5900, lng: 130.7417, code: 'KY', note: 'Sakurajima Volcanic Zone' },

  // --- RUSSIA REGIONS ---
  { id: 'ru-km', name: 'Kamchatka', country: 'Russia', lat: 56.1328, lng: 160.0000, code: 'KM', note: 'Kuril-Kamchatka Subduction Trench' },
  { id: 'ru-sk', name: 'Sakhalin', country: 'Russia', lat: 50.7000, lng: 143.0000, code: 'SK', note: 'Sea of Okhotsk' },
  { id: 'ru-sb', name: 'Yakutia (Siberia)', country: 'Russia', lat: 62.0397, lng: 129.7422, code: 'SB', note: 'Permafrost Degradation Zone' },

  // --- AUSTRALIA STATES ---
  { id: 'au-qld', name: 'Queensland', country: 'Australia', lat: -20.9176, lng: 142.7028, code: 'QLD', note: 'Coral Sea Cyclone Sector' },
  { id: 'au-nsw', name: 'New South Wales', country: 'Australia', lat: -31.8400, lng: 145.6100, code: 'NSW', note: 'Southeast Bushfire Corridor' },
  { id: 'au-wa', name: 'Western Australia', country: 'Australia', lat: -27.6728, lng: 121.6283, code: 'WA', note: 'Pilbara Arid Zone' },
  { id: 'au-vic', name: 'Victoria', country: 'Australia', lat: -37.4713, lng: 144.7852, code: 'VIC', note: 'Bass Strait' },

  // --- CHINA PROVINCES ---
  { id: 'cn-sc', name: 'Sichuan', country: 'China', lat: 30.6517, lng: 104.0764, code: 'SC', note: 'Longmenshan Fault Rupture' },
  { id: 'cn-gd', name: 'Guangdong', country: 'China', lat: 23.1291, lng: 113.2644, code: 'GD', note: 'South China Sea Typhoon Coast' },

  // --- BRAZIL STATES ---
  { id: 'br-am', name: 'Amazonas', country: 'Brazil', lat: -3.4653, lng: -62.2159, code: 'AM', note: 'Rio Negro Hydro Deficit' },
  { id: 'br-pa', name: 'Pará', country: 'Brazil', lat: -1.4558, lng: -48.5039, code: 'PA', note: 'Amazon Deforestation Arc' }
];

/**
 * Intelligent geocoding resolver to map any hazard title and coordinates
 * to its exact state/province and country.
 */
export function resolveHazardStateAndCountry(hazard) {
  if (!hazard) return { state: 'Global', country: 'Earth', formatted: 'Global' };

  const title = (hazard.title || '').toLowerCase();
  const lat = hazard.lat;
  const lng = hazard.lng;

  // 1. Text Pattern Matching on Title
  for (const st of WORLD_STATES) {
    const sName = st.name.toLowerCase();
    const sCode = st.code.toLowerCase();
    if (title.includes(sName) || (sCode.length === 2 && title.includes(` ${sCode} `))) {
      return {
        state: st.name,
        country: st.country,
        code: st.code,
        formatted: `${st.name}, ${st.country}`,
        note: st.note
      };
    }
  }

  // 2. Proximity Matching with threshold (~700 km radius)
  let bestState = null;
  let minD2 = Infinity;
  for (const st of WORLD_STATES) {
    const d2 = Math.pow(st.lat - lat, 2) + Math.pow(st.lng - lng, 2);
    if (d2 < minD2) {
      minD2 = d2;
      bestState = st;
    }
  }

  if (bestState && minD2 < 55) { // within ~7.4 degrees
    return {
      state: bestState.name,
      country: bestState.country,
      code: bestState.code,
      formatted: `${bestState.name}, ${bestState.country}`,
      note: bestState.note
    };
  }

  // Fallback: parse country from title if available
  const commaParts = hazard.title ? hazard.title.split(',') : [];
  if (commaParts.length > 1) {
    const countryCandidate = commaParts[commaParts.length - 1].trim();
    const stateCandidate = commaParts[commaParts.length - 2].trim().replace(/^.*(of|in)\s+/i, '');
    return {
      state: stateCandidate.length > 20 ? stateCandidate.substring(0, 18) + '...' : stateCandidate,
      country: countryCandidate,
      code: '',
      formatted: `${stateCandidate}, ${countryCandidate}`,
      note: ''
    };
  }

  return {
    state: 'Sector',
    country: hazard.source?.replace(' Seismology', '') || 'International',
    code: '',
    formatted: hazard.title ? hazard.title.substring(0, 24) : 'Global Locus',
    note: ''
  };
}
