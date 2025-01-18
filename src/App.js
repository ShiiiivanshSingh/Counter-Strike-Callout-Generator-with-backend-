import React, { useState, useEffect } from "react";
import MapDisplay from "./components/MapDisplay";
import "./App.css";

function App() {
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    // Fetch maps data from backend API
    fetch('http://localhost:5000/api/callouts')
      .then((response) => response.json())
      .then((data) => {
        // Group the callouts by mapName
        const maps = {};

        // Step 1: Create an object where each mapName is a key and its hotspots are values
        data.forEach(callout => {
          const { mapName, ...hotspot } = callout;

          // Ensure mapName exists before proceeding
          if (mapName) {
            if (!maps[mapName]) {
              maps[mapName] = {
                name: mapName,
                src: mapName.replace(' ', '_').toLowerCase() + '_radar.png', // Generate map image filename
                hotspots: []
              };
            }

            // Only add hotspots for a valid mapName
            maps[mapName].hotspots.push(hotspot);
          }
        });

        // Step 2: Convert maps object into an array
        const formattedMaps = Object.values(maps);

        setMaps(formattedMaps);
        setSelectedMap(formattedMaps[0]); // Default to the first map
      })
      .catch((error) => console.error('Error fetching maps:', error));
  }, []);

  if (!selectedMap) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fd073d] to-[#0120a8]">
      <div className="container mx-auto px-4 py-8">
        <div className="relative text-center mb-8">
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
            className="bg-gray-600 text-white border border-white/20 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {maps.map((map) => (
              <option key={map.name} value={map.name}>
                {map.name}
              </option>
            ))}
          </select>
        </div>

        <MapDisplay map={selectedMap} />  {/* Pass the selectedMap as a prop */}
      </div>
    </div>
  );
}

export default App;
