import { useId } from "react";

/**
 * Three floral arrangements matching the reference:
 * - Bottom-left: mixed white roses / greenery bouquet
 * - Right-center: cascading white flowers beside envelope
 * - Bottom-right: calla lily accent
 * All pure SVG for zero-dependency rendering.
 */
export default function IntroFloralCorners() {
  const uid = useId().replace(/:/g, "");
  const petG = `flPet-${uid}`;
  const petG2 = `flPet2-${uid}`;
  const leafG = `flLeaf-${uid}`;
  const callaG = `flCalla-${uid}`;

  return (
    <>
      {/* ── Bottom-left bouquet (roses + baby's breath) ── */}
      <svg
        className="envelope-intro__floral envelope-intro__floral--bl"
        viewBox="0 0 200 220"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={petG} cx="40%" cy="35%" r="55%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="60%" stopColor="#f7f3ec" />
            <stop offset="100%" stopColor="#e8e0d0" />
          </radialGradient>
          <radialGradient id={leafG} cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#a8b592" />
            <stop offset="100%" stopColor="#7a8a68" />
          </radialGradient>
        </defs>
        {/* stems */}
        <g stroke="#8a9a74" fill="none" strokeLinecap="round" opacity="0.6">
          <path d="M95 200 Q75 165 65 140" strokeWidth="2.5" />
          <path d="M105 210 Q95 170 80 138" strokeWidth="2" />
          <path d="M120 205 Q110 175 100 148" strokeWidth="2" />
        </g>
        {/* leaves */}
        <g fill={`url(#${leafG})`} opacity="0.65">
          <ellipse cx="55" cy="170" rx="14" ry="28" transform="rotate(-20 55 170)" />
          <ellipse cx="115" cy="180" rx="12" ry="24" transform="rotate(22 115 180)" />
          <ellipse cx="72" cy="155" rx="10" ry="22" transform="rotate(-10 72 155)" />
          <ellipse cx="130" cy="170" rx="11" ry="20" transform="rotate(35 130 170)" />
        </g>
        {/* roses — layered petals */}
        <g fill={`url(#${petG})`}>
          {/* rose 1 (large) */}
          <circle cx="75" cy="120" r="24" opacity="0.9" />
          <ellipse cx="63" cy="114" rx="14" ry="18" transform="rotate(-15 63 114)" opacity="0.7" />
          <ellipse cx="88" cy="114" rx="13" ry="17" transform="rotate(18 88 114)" opacity="0.7" />
          <ellipse cx="75" cy="105" rx="11" ry="14" opacity="0.5" />
          {/* rose 2 */}
          <circle cx="108" cy="130" r="20" opacity="0.85" />
          <ellipse cx="98" cy="125" rx="12" ry="15" transform="rotate(-12 98 125)" opacity="0.65" />
          <ellipse cx="118" cy="126" rx="11" ry="14" transform="rotate(14 118 126)" opacity="0.65" />
          <ellipse cx="108" cy="118" rx="9" ry="11" opacity="0.45" />
          {/* rose 3 (small) */}
          <circle cx="60" cy="145" r="16" opacity="0.8" />
          <ellipse cx="53" cy="140" rx="9" ry="12" transform="rotate(-18 53 140)" opacity="0.55" />
          <ellipse cx="68" cy="141" rx="8" ry="11" transform="rotate(15 68 141)" opacity="0.55" />
        </g>
        {/* baby's breath dots */}
        <g fill="#f8f5ef" opacity="0.75">
          <circle cx="45" cy="130" r="4" />
          <circle cx="40" cy="140" r="3.5" />
          <circle cx="50" cy="148" r="3" />
          <circle cx="130" cy="142" r="3.5" />
          <circle cx="135" cy="152" r="3" />
          <circle cx="125" cy="155" r="4" />
          <circle cx="95" cy="148" r="3" />
        </g>
      </svg>

      {/* ── Right-side cascading arrangement (beside envelope) ── */}
      <svg
        className="envelope-intro__floral envelope-intro__floral--mr"
        viewBox="0 0 160 260"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={petG2} cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="55%" stopColor="#f5f1e8" />
            <stop offset="100%" stopColor="#e5ddd0" />
          </radialGradient>
        </defs>
        {/* trailing stems */}
        <g stroke="#8a9a74" fill="none" strokeLinecap="round" opacity="0.5">
          <path d="M80 20 Q60 60 55 100 Q48 150 60 200 Q65 230 55 255" strokeWidth="2" />
          <path d="M90 15 Q75 55 72 95 Q68 140 75 185 Q78 210 70 245" strokeWidth="1.8" />
          <path d="M100 30 Q88 70 85 110 Q82 150 88 190" strokeWidth="1.5" />
        </g>
        {/* leaves along stems */}
        <g fill={`url(#${leafG})`} opacity="0.55">
          <ellipse cx="50" cy="80" rx="12" ry="22" transform="rotate(-30 50 80)" />
          <ellipse cx="95" cy="65" rx="10" ry="20" transform="rotate(25 95 65)" />
          <ellipse cx="45" cy="140" rx="11" ry="20" transform="rotate(-15 45 140)" />
          <ellipse cx="90" cy="130" rx="10" ry="18" transform="rotate(20 90 130)" />
          <ellipse cx="55" cy="200" rx="10" ry="18" transform="rotate(-25 55 200)" />
          <ellipse cx="82" cy="190" rx="9" ry="16" transform="rotate(18 82 190)" />
        </g>
        {/* flowers */}
        <g fill={`url(#${petG2})`}>
          <circle cx="70" cy="55" r="18" opacity="0.85" />
          <ellipse cx="60" cy="50" rx="10" ry="14" transform="rotate(-15 60 50)" opacity="0.6" />
          <ellipse cx="80" cy="50" rx="10" ry="13" transform="rotate(15 80 50)" opacity="0.6" />

          <circle cx="62" cy="105" r="16" opacity="0.8" />
          <ellipse cx="53" cy="100" rx="9" ry="12" transform="rotate(-10 53 100)" opacity="0.55" />
          <ellipse cx="72" cy="100" rx="9" ry="12" transform="rotate(12 72 100)" opacity="0.55" />

          <circle cx="72" cy="160" r="14" opacity="0.8" />
          <ellipse cx="64" cy="156" rx="8" ry="11" transform="rotate(-12 64 156)" opacity="0.5" />
          <ellipse cx="80" cy="157" rx="8" ry="10" transform="rotate(14 80 157)" opacity="0.5" />
        </g>
        {/* trailing small buds */}
        <g fill="#f2ede4" opacity="0.7">
          <ellipse cx="60" cy="220" rx="6" ry="9" transform="rotate(-8 60 220)" />
          <ellipse cx="68" cy="238" rx="5" ry="8" transform="rotate(5 68 238)" />
        </g>
      </svg>

      {/* ── Bottom-right calla lily ── */}
      <svg
        className="envelope-intro__floral envelope-intro__floral--br"
        viewBox="0 0 120 160"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={callaG} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f5f0e6" />
            <stop offset="100%" stopColor="#e2dace" />
          </radialGradient>
        </defs>
        {/* stem */}
        <path
          d="M55 155 Q52 120 50 85 Q48 60 55 40"
          fill="none"
          stroke="#8a9a74"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
        {/* leaf wrapping stem */}
        <ellipse cx="40" cy="110" rx="16" ry="35" transform="rotate(-12 40 110)" fill="#9aa888" opacity="0.4" />
        {/* calla petal */}
        <path
          d={`M55 38 Q30 25 22 55 Q16 78 35 85 Q45 88 55 78
              Q65 88 75 85 Q94 78 88 55 Q80 25 55 38 Z`}
          fill={`url(#${callaG})`}
          opacity="0.92"
        />
        {/* spadix */}
        <ellipse cx="55" cy="55" rx="4" ry="16" fill="#e8d88a" opacity="0.7" />
      </svg>
    </>
  );
}
