import React, { useState } from "react";
import MapDisplay from "./components/MapDisplay";
import ancientRadar from "./assets/maps/de_ancient_radar.png";
import dust2Radar from "./assets/maps/de_dust2_radar.png";
import infernoRadar from "./assets/maps/de_inferno_radar.png";
import mirageRadar from "./assets/maps/de_mirage_radar.png";
import nukeLowerRadar from "./assets/maps/de_nuke_lower_radar.png";
import nukeRadar from "./assets/maps/de_nuke_radar.png";
import overpassRadar from "./assets/maps/de_overpass_radar.png";
import trainRadar from "./assets/maps/de_train_radar.png";
import vertigoLowerRadar from "./assets/maps/de_vertigo_lower_radar.png";
import vertigoRadar from "./assets/maps/de_vertigo_radar.png";
import cacheRadar from "./assets/maps/de_cache_radar.png";
import "./App.css";

function App() {
  const [currentMap, setCurrentMap] = useState("de_dust2");

  const maps = {
    de_dust2: {
      src: dust2Radar,
      hotspots: [
        { name: "A Site", top: "30%", left: "40%" },
        { name: "B Tunnels", top: "70%", left: "60%" },
      ],
    },
    de_inferno: {
      src: infernoRadar,
      hotspots: [
        { name: "Banana", top: "20%", left: "50%" },
        { name: "Pit", top: "60%", left: "40%" },
      ],
    },
    de_ancient: {
      src: ancientRadar,
      hotspots: [
        { name: "A Site", top: "30%", left: "45%" },
        { name: "B Site", top: "60%", left: "50%" },
      ],
    },
    de_cache: {
      src: cacheRadar,
      hotspots: [
        { name: "A Site", top: "40%", left: "50%" },
        { name: "Mid", top: "60%", left: "40%" },
      ],
    },
    de_mirage: {
      src: mirageRadar,
      hotspots: [
        { name: "A Site", top: "35%", left: "50%" },
        { name: "B Site", top: "65%", left: "60%" },
      ],
    },
    de_nuke: {
      src: nukeRadar,
      hotspots: [
        { name: "A Site", top: "40%", left: "50%" },
        { name: "B Site", top: "70%", left: "45%" },
      ],
    },
    de_nuke_lower: {
      src: nukeLowerRadar,
      hotspots: [
        { name: "Lower B", top: "60%", left: "50%" },
        { name: "Tunnels", top: "40%", left: "60%" },
      ],
    },
    de_overpass: {
      src: overpassRadar,
      hotspots: [
        { name: "A Site", top: "35%", left: "55%" },
        { name: "B Site", top: "65%", left: "40%" },
      ],
    },
    de_train: {
      src: trainRadar,
      hotspots: [
        { name: "A Site", top: "30%", left: "50%" },
        { name: "B Site", top: "60%", left: "40%" },
      ],
    },
    de_vertigo: {
      src: vertigoRadar,
      hotspots: [
        { name: "A Site", top: "40%", left: "55%" },
        { name: "B Site", top: "70%", left: "45%" },
      ],
    },
    de_vertigo_lower: {
      src: vertigoLowerRadar,
      hotspots: [
        { name: "Lower B", top: "50%", left: "60%" },
        { name: "Tunnels", top: "30%", left: "40%" },
      ],
    },
  };

  const handleMapChange = (event) => {
    setCurrentMap(event.target.value);
  };

  return (
    <div className="App p-4 bg-gradient-to-r from-primary to-secondary min-h-screen flex flex-col items-center">
      {/* Title with transparent background */}
      <div className="bg-white bg-opacity-50 px-6 py-4 rounded-lg shadow-md mb-4">
        <h1 className="text-4xl font-extrabold text-white text-shadow text-center">
          Counter-Strike Callouts
        </h1>
      </div>
      <h2 className="text-2xl text-center mb-4 text-white">
        Because every caallout tells a tale.
      </h2>
      <h2 className="text-2xl text-center mb-4 text-white">
        Currently Viewing:{" "}
        {currentMap.replace("de_", "").replace("_", " ").toUpperCase()}
      </h2>
      <div className="mb-6">
        <select
          value={currentMap}
          onChange={handleMapChange}
          className="bg-white text-lg text-black p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          {Object.keys(maps).map((mapKey) => (
            <option key={mapKey} value={mapKey}>
              {mapKey.replace("de_", "").replace("_", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>
      <div className="relative w-full h-full">
        <MapDisplay map={maps[currentMap]} />
      </div>
    </div>
  );
}

export default App;
