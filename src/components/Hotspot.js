// components/Hotspot.js
import React from "react";

function Hotspot({ name, top, left, onHoverStart, onHoverEnd, isActive }) {
  return (
    <div
      className={`absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
        isActive ? "scale-125" : "scale-100"
      }`}
      style={{ top, left }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <div className="w-full h-full bg-[#fd073d] rounded-full animate-pulse" />
      {isActive && (
        <div className="absolute -top-1 -left-1 w-6 h-6 bg-[#fd073d] rounded-full opacity-25 animate-ping" />
      )}
    </div>
  );
}

export default Hotspot;