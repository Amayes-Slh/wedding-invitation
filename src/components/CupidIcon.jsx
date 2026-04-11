/**
 * Cupidon style line-art (inspire de la reference), couleur bordeaux.
 */
function CupidIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M58 18c-8 2-14 10-12 18 2 10 14 14 22 8 6-5 7-15 2-21-3-4-8-6-12-5z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M52 28c-6 8-10 18-8 28 2 12 12 20 24 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M70 42c6-2 12 2 14 10 2 8-2 16-10 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M44 52c-10 4-16 14-14 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M78 58c8 6 10 16 6 24"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M62 46c4-6 14-8 22-4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M84 42c6-4 12-2 14 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <rect
        x="68"
        y="54"
        width="22"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(-12 79 62)"
      />
      <path
        d="M76 62l4 3 4-3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        transform="rotate(-12 79 62)"
      />
    </svg>
  );
}

export default CupidIcon;
