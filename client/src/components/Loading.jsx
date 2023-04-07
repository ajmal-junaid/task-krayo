import React from "react";

function LoadingBar() {
  return (
    <svg
      width="100%"
      height="10"
      viewBox="0 0 500 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="100%" height="10" rx="5" fill="#E2E8F0" />
      <rect width="0" height="10" rx="5" fill="#4F46E5">
        <animate
          attributeName="width"
          from="0"
          to="100%"
          dur="2s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}

export default LoadingBar;
