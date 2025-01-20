import React, { useState, useEffect } from "react";
import MapDisplay from "./components/MapDisplay"; 
import "./App.css";

const mapNameDisplay = {
  'de_dust2': 'Dust 2',
  'de_inferno': 'Inferno',
  'de_mirage': 'Mirage',
  'de_nuke': 'Nuke Upper',
  'de_nuke_lower': 'Nuke Lower',
  'de_train': 'Train',
  'de_overpass': 'Overpass',
  'de_ancient': 'Ancient',
  'de_vertigo': 'Vertigo Upper',
  'de_vertigo_lower': 'Vertigo Lower',
  'de_cache': 'Cache',
  'de_cbble': 'Cobblestone',
  'de_tuscan': 'Tuscan',
  'de_bank': 'Bank',
  'de_eyes': 'Eyes',
  'de_dust': 'Dust',
  'de_forge': 'Forge',
  'de_lake': 'Lake',
  'de_aztec': 'Aztec',
  'de_rats': 'Rats',
  'de_grind': 'Grind',
  'de_prodigy': 'Prodigy',
  'de_sugarcane': 'Sugarcane',
  'de_stmarc': 'St. Marc',
  'de_baggage': 'Baggage',
  'de_lighthouse': 'Lighthouse',
  'de_paradise': 'Paradise',
  'de_climate': 'Climate',
  'de_crossfire': 'Crossfire',
  'de_cobble': 'Cobblestone',
  'de_tside': 'T Side'
};

function App() {
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch maps data 
    fetch(".netlify/functions/getCall") // API endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the response data to inspect it
        
        if (data.mongooseResults.length === 0) {
          setError('No maps available.');
          return;
        }

        // Group maps by map name and add display names
        const maps = data.mongooseResults.map(callout => ({
          name: callout.mapName, // Keep the original name
          displayName: mapNameDisplay[callout.mapName] || callout.mapName, // Use friendly display name
          src: callout.src,
          hotspots: callout.hotspots
        }));

        setMaps(maps);
        setSelectedMap(maps[0]); // Set the first map as the default
      })
      .catch((err) => {
        console.error('Error fetching maps:', err);
        setError('Failed to load maps. Please try again later.');
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!selectedMap) {
    return (
      <div className="custom-loading-spinner min-h-screen bg-gradient-to-br from-[#fd073d] to-[#0120a8]">
        <div className="spinner"></div>
        <p className="loading-text centre text-center mb-8 text-4xl font-bold text-white">
          Get ready, callouts incoming!
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fd073d] to-[#0120a8]">
      <div className="container mx-auto px-4 py-8">
        <div className="relative text-center mb-8">
          <div className="absolute inset-0 bg-white opacity-0 rounded-lg z-0"></div>
          <h1 className="text-4xl font-bold text-white z-10 hover:text-yellow-500 transform transition-transform duration-300 hover:scale-110">
            Counter-Strike Callouts
          </h1>
          <h2 className="text-2xl text-white z-10 hover:text-yellow-500 transform transition-transform duration-300 hover:scale-105">
            Because every callout tells a tale.
          </h2>
        </div>

        <div className="mb-6 flex justify-center">
          <select
            value={selectedMap.name}
            onChange={(e) => setSelectedMap(maps.find(map => map.name === e.target.value))}
            className="bg-gray-600 text-white border rounded-lg px-4 py-2 w-64"
          >
            {maps.map((map) => (
              <option key={map.name} value={map.name}>
                {map.displayName} {/* Display the friendly name */}
              </option>
            ))}
          </select>
        </div>

        <MapDisplay map={selectedMap} />
      </div>
    </div>
  );
}

export default App;
