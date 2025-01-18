import React from "react";

function Hotspot({ name, top, left, onHover }) {
  return (
    <div
      className="absolute w-4 h-4 bg-red-500 rounded-full cursor-pointer"
      style={{ top, left }}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
    ></div>
  );
}

export default Hotspot;
