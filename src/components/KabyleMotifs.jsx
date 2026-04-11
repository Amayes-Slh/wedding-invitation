import { useId } from "react";
import "./KabyleMotifs.css";

/**
 * Motifs geometriques inspires de l'art kabyle (losanges, chevrons, triangles).
 */
function KabyleMotifs({ variant = "page" }) {
  const id = useId().replace(/:/g, "");

  const d = `${id}-d`;
  const c = `${id}-c`;
  const t = `${id}-t`;

  return (
    <div className={`kabyle-motifs kabyle-motifs--${variant}`} aria-hidden="true">
      <svg className="kabyle-motifs__fill" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id={d} width="56" height="56" patternUnits="userSpaceOnUse">
            <path
              d="M28 2 L54 28 L28 54 L2 28 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path
              d="M28 14 L42 28 L28 42 L14 28 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.65"
            />
          </pattern>
          <pattern id={c} width="32" height="16" patternUnits="userSpaceOnUse">
            <path
              d="M0 16 L8 8 L16 16 L24 8 L32 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.85"
            />
          </pattern>
          <pattern id={t} width="24" height="42" patternUnits="userSpaceOnUse">
            <path d="M12 2 L22 18 L2 18 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
            <path d="M12 22 L22 38 L2 38 Z" fill="none" stroke="currentColor" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${d})`} className="kabyle-motifs__layer kabyle-motifs__layer--diamonds" />
        <rect width="100%" height="100%" fill={`url(#${c})`} className="kabyle-motifs__layer kabyle-motifs__layer--chevrons" />
        <rect width="100%" height="100%" fill={`url(#${t})`} className="kabyle-motifs__layer kabyle-motifs__layer--triangles" />
      </svg>

      {/* Coins — cadre zigzag / lignes brisees */}
      <svg className="kabyle-motifs__corner kabyle-motifs__corner--tl" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 94 L6 6 L94 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <path
          d="M14 14 L14 86 L86 86 L86 14 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.45"
        />
        <path
          d="M22 22 L78 22 M22 78 L78 78 M22 22 L22 78 M78 22 L78 78"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          opacity="0.35"
        />
      </svg>
      <svg className="kabyle-motifs__corner kabyle-motifs__corner--tr" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M94 94 L94 6 L6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <path
          d="M86 14 L86 86 L14 86 L14 14 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.45"
        />
      </svg>
      <svg className="kabyle-motifs__corner kabyle-motifs__corner--bl" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 6 L6 94 L94 94"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <path
          d="M14 86 L14 14 L86 14 L86 86 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.45"
        />
      </svg>
      <svg className="kabyle-motifs__corner kabyle-motifs__corner--br" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M94 6 L94 94 L6 94"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="square"
        />
        <path
          d="M86 86 L86 14 L14 14 L14 86 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          opacity="0.45"
        />
      </svg>
    </div>
  );
}

export default KabyleMotifs;
