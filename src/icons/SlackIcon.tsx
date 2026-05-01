import React from "react";

export function SlackIcon() {
  return (
    <svg
      width="44"
      height="48"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue */}
      <rect x="8" y="24" width="20" height="12" rx="6" fill="#36C5F0"/>
      <rect x="20" y="8" width="12" height="20" rx="6" fill="#36C5F0"/>

      {/* Green */}
      <rect x="32" y="8" width="12" height="20" rx="6" fill="#2EB67D"/>
      <rect x="36" y="24" width="20" height="12" rx="6" fill="#2EB67D"/>

      {/* Yellow */}
      <rect x="36" y="32" width="20" height="12" rx="6" fill="#ECB22E"/>
      <rect x="32" y="36" width="12" height="20" rx="6" fill="#ECB22E"/>

      {/* Red */}
      <rect x="20" y="36" width="12" height="20" rx="6" fill="#E01E5A"/>
      <rect x="8" y="32" width="20" height="12" rx="6" fill="#E01E5A"/>
    </svg>
  );
}