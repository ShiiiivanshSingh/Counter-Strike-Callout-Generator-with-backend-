import React, { useState, useEffect } from "react";
import Hotspot from "./Hotspot";
// Import all map images
import cacheRadar from "../assets/maps/de_cache_radar.png";
import dust2Radar from "../assets/maps/de_dust2_radar.png";
import infernoRadar from "../assets/maps/de_inferno_radar.png";
import mirageRadar from "../assets/maps/de_mirage_radar.png";
import nukeLowerRadar from "../assets/maps/de_nuke_lower_radar.png";
import nukeRadar from "../assets/maps/de_nuke_radar.png";
import overpassRadar from "../assets/maps/de_overpass_radar.png";
import ancientRadar from "../assets/maps/de_ancient_radar.png";
import trainRadar from "../assets/maps/de_train_radar.png";
import vertigoLowerRadar from "../assets/maps/de_vertigo_lower_radar.png";
import vertigoRadar from "../assets/maps/de_vertigo_radar.png";

function MapDisplay({ map }) {
  const [selectedMap, setSelectedMap] = useState(null);
  const [activeCallout, setActiveCallout] = useState(null);

  // Map of all the radar images based on map name
  const mapImages = {
    de_cache: cacheRadar,
    de_dust2: dust2Radar,
    de_inferno: infernoRadar,
    de_mirage: mirageRadar,
    de_nuke: nukeRadar,
    de_nuke_lower: nukeLowerRadar,
    de_overpass: overpassRadar,
    de_ancient: ancientRadar,
    de_train: trainRadar,
    de_vertigo: vertigoRadar,
    de_vertigo_lower: vertigoLowerRadar,
  };

  useEffect(() => {
    if (map) {
      setSelectedMap(map);
      window.selectedMap = map; // For debugging
    }
  }, [map]);

  if (!selectedMap) return <div>Loading...</div>;

  // Get the map image based on map name from mapImages
  const mapImage = mapImages[selectedMap.name] || "../assets/maps/def.png";  // Fallback if no match

  return (
    <div className="relative w-full flex justify-center items-center">
      <div className="relative inline-block max-w-[70%] max-h-full">
        <img
          src={mapImage} // Use the map image dynamically
          alt={selectedMap.name || "Map"}
          className="max-w-full h-auto rounded-lg shadow-2xl"
          onError={(e) => (e.target.src = "../assets/maps/def.png")}
        />

        {selectedMap.hotspots &&
          selectedMap.hotspots.map((hotspot, index) => {
            console.log("Hotspot Position:", hotspot); // Debug hotspot position
            return (
              <Hotspot
                key={index}
                {...hotspot}
                onHoverStart={() => setActiveCallout(hotspot)}
                onHoverEnd={() => setActiveCallout(null)}
                isActive={activeCallout?.name === hotspot.name}
              />
            );
          })}

        {activeCallout && (
          <div
            className="absolute z-10 bg-black/80 text-white p-3 rounded-lg shadow-lg pointer-events-none"
            style={{
              top: activeCallout.top, // Ensure these are percentage values
              left: activeCallout.left, // Ensure these are percentage values
            }}
          >
            <h3 className="font-bold text-lg">{activeCallout.name}</h3>
            <p className="text-sm text-gray-300">{activeCallout.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MapDisplay;
