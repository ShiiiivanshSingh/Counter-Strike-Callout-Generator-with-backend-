import React, { useState } from "react";
import Hotspot from "./Hotspot";

function MapDisplay({ map }) {
  const [callout, setCallout] = useState(null);

  return (
    <div className="relative w-full h-screen flex justify-center items-center ">
      <img
        src={map.src}
        alt="Map"
        className="max-w-full max-h-full object-contain"
      />
      {map.hotspots.map((hotspot, index) => (
        <Hotspot
          key={index}
          name={hotspot.name}
          top={hotspot.top}
          left={hotspot.left}
          onHover={setCallout}
        />
      ))}
      {callout && (
        <div className="absolute top-0 left-0 mt-2 ml-2 p-2 text-white rounded shadow-lg">
          {callout}
        </div>
      )}
    </div>
  );
}

export default MapDisplay;
