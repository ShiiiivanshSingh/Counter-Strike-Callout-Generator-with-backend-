import React, { useState, useEffect } from "react";
import MapDisplay from "./components/MapDisplay"; 
import "./App.css";

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

        // Group maps by map name
        const maps = data.mongooseResults.map(callout => ({
          name: callout.mapName,
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
        <p className="loading-text centre text-center mb-8 text-4xl font-bold text-white "> Get ready, callout incoming! 
</p>
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
