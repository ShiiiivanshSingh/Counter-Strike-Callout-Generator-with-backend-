import React, { useState } from "react";
import MapDisplay from "./components/MapDisplay"; 
import maps from "./components/callouts"; 
import "./App.css"; 

function App() {
  const [selectedMap, setSelectedMap] = useState("de_dust2");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fd073d] to-[#0120a8]">
      <div className="container mx-auto px-4 py-8">
        {/* Title container with transparent background only behind h1 */}
        <div className="relative text-center mb-8">
          {/* Transparent background only behind h1 */}
          <div className="absolute inset-0 bg-white opacity-10 rounded-lg z-0"></div>
          
          {/* Hover animations for h1 */}
          <h1 className="text-4xl font-bold text-white z-10 hover:text-yellow-500 transform transition-transform duration-300 hover:scale-110">
            Counter-Strike Callouts
          </h1>
          
          {/* No transparent background behind h2 */}
          <h2 className="text-2xl text-white z-10 hover:text-yellow-500 transform transition-transform duration-300 hover:scale-105">
            Because every callout tells a tale.
          </h2>
        </div>

        {/* Map selection dropdown */}
        <div className="mb-6 flex justify-center">
          <select
            value={selectedMap}
            onChange={(e) => setSelectedMap(e.target.value)}
            className="bg-white/10 text-white border border-white/20 rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {Object.entries(maps).map(([key, map]) => (
              <option key={key} value={key} className="bg-gray-800">
                {map.name}
              </option>
            ))}
          </select>
        </div>

        {/* Map display */}
        <MapDisplay map={maps[selectedMap]} />
      </div>
    </div>
  );
}

export default App;
