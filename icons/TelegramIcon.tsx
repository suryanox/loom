export function TelegramIcon() {
  return (
    <svg
      width="44"
      height="48"
      viewBox="0 0 44 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Blue background */}
      <rect x="2" y="4" width="40" height="40" rx="10" fill="#26A5E4" />

      {/* Paper plane body */}
      <path d="M10 22 L34 13 L27 35 L21 28 Z" fill="white" />

      {/* Paper plane fold */}
      <path d="M21 28 L19 35 L25 30 L27 35" fill="rgba(255,255,255,0.6)" />

      {/* Inner crease line */}
      <path d="M21 28 L34 13" stroke="rgba(38,165,228,0.5)" strokeWidth="1" />
    </svg>
  );
}
