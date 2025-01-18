import React, { useState, useEffect } from "react";
import Hotspot from "./Hotspot";

function MapDisplay({ map }) {
  const [selectedMap, setSelectedMap] = useState(null);
  const [activeCallout, setActiveCallout] = useState(null);

  useEffect(() => {
    if (map) {
      setSelectedMap(map); // Set the selected map when the prop `map` is available
    }
  }, [map]);

  if (!selectedMap) return <div>Loading...</div>;

  return (
    <div className="relative w-full flex justify-center items-center">
      <div className="relative inline-block max-w-[70%] max-h-full">
        <img
          src={selectedMap.src}
          alt={selectedMap.name}
          className="max-w-full h-auto rounded-lg shadow-2xl"
        />

        {selectedMap.hotspots && selectedMap.hotspots.map((hotspot, index) => (
          <Hotspot
            key={index}
            {...hotspot}
            onHoverStart={() => setActiveCallout(hotspot)}
            onHoverEnd={() => setActiveCallout(null)}
            isActive={activeCallout?.name === hotspot.name}
          />
        ))}

        {activeCallout && (
          <div
            className="absolute z-10 bg-black/80 text-white p-3 rounded-lg shadow-lg pointer-events-none"
            style={{ top: activeCallout.top, left: activeCallout.left }}
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
