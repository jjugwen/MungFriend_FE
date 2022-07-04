import React from "react";
function Textrotate() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 500 500"
    >
      <defs>
        <path
          d="M50,250c0-110.5,89.5-200,200-200s200,89.5,200,200s-89.5,200-200,200S50,360.5,50,250"
          id="textcircle_top"
        >
          <animateTransform
            attributeName="transform"
            begin="0s"
            dur="20s"
            type="rotate"
            from="0 250 250"
            to="360 250 250"
            repeatCount="indefinite"
          />
        </path>
      </defs>
      <text dy="70" textLength="1250">
        <textPath href="#textcircle_top">mungfriend﹒mungfriend﹒</textPath>
      </text>
    </svg>
  );
}

export default Textrotate;
