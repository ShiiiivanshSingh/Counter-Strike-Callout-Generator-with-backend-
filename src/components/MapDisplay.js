import React, { useState } from "react";
import Hotspot from "./Hotspot";

function MapDisplay({ map }) {
  const [activeCallout, setActiveCallout] = useState(null);

  return (
    <div className="relative w-full flex justify-center items-center">
      <div className="relative inline-block max-w-[70%] max-h-full"> {/* Reduced size */}
        <img
          src={map.src}
          alt={map.name}
          className="max-w-full h-auto rounded-lg shadow-2xl"
        />
        
        {map.hotspots.map((hotspot, index) => (
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
