import React, { useState, useEffect } from "react";
import MapDisplay from "./components/MapDisplay"; // Assuming this component is present
import "./App.css";

function App() {
  const [maps, setMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    // Fetch maps data from the backend API
    fetch('https://callouts-gg.netlify.app/.netlify/functions/getData') // Change to your API URL
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setError('No maps available.');
          return;
        }

        // Group callouts by map name
        const maps = {};
        data.forEach(callout => {
          const { mapName, ...hotspot } = callout;
          if (mapName) {
            if (!maps[mapName]) {
              maps[mapName] = {
                name: mapName,
                src: `/images/maps/${mapName.replace(' ', '_').toLowerCase()}_radar.png`,
                hotspots: []
              };
            }
            maps[mapName].hotspots.push(hotspot);
          }
        });

        const formattedMaps = Object.values(maps);
        setMaps(formattedMaps);
        setSelectedMap(formattedMaps[0]); // Default to the first map
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
      <div className="loading-spinner">
        <p>Loading maps...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fd073d] to-[#0120a8]">
      <div className="container mx-auto px-4 py-8">
        <div className="relative text-center mb-8">
          <h1 className="text-4xl font-bold text-white hover:text-yellow-500 transition-transform duration-300">
            Counter-Strike Callouts
          </h1>
          <h2 className="text-2xl text-white hover:text-yellow-500 transition-transform duration-300">
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
                {map.name}
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
