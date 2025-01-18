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
        setMaps(data);
        setSelectedMap(data[0]); // Default to the first map
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
            value={selectedMap.mapName}
            onChange={(e) => setSelectedMap(maps.find(map => map.mapName === e.target.value))}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {maps.map((map) => (
              <option key={map.mapName} value={map.mapName}>
                {map.mapName}
              </option>
            ))}
          </select>
        </div>

        <MapDisplay selectedMap={selectedMap} />
      </div>
    </div>
  );
}

export default App;
