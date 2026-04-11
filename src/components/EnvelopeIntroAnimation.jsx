import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import KabyleMotifs from "./KabyleMotifs";
import ScratchDateReveal from "./ScratchDateReveal";
import "./EnvelopeIntro.css";

function monogramFromTitle(title) {
  if (!title) return "AM";
  const parts = title.split("&").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0]?.toUpperCase() || ""}${parts[1][0]?.toUpperCase() || ""}`;
  }
  return title.slice(0, 2);
}

function parseCoupleNames(title) {
  if (!title) return { first: "", second: "" };
  const parts = title.split("&").map((s) => s.trim()).filter(Boolean);
  if (parts.length >= 2) return { first: parts[0], second: parts[1] };
  return { first: title, second: "" };
}

const OPEN_ANIM_MS = 2200;

function EnvelopeIntroAnimation({ intro, onOpen }) {
  const [started, setStarted] = useState(false);
  const [opening, setOpening] = useState(false);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const timerRef = useRef(null);

  const monogram = useMemo(
    () => intro?.sealMonogram || monogramFromTitle(intro?.overlayTitle),
    [intro?.sealMonogram, intro?.overlayTitle]
  );

  const { first: firstName, second: secondName } = useMemo(
    () => parseCoupleNames(intro?.overlayTitle),
    [intro?.overlayTitle]
  );

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setStarted(true); return; }
    const id = window.requestAnimationFrame(() => setStarted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleSealClick = useCallback(() => {
    if (opening) return;
    setOpening(true);
    timerRef.current = setTimeout(onOpen, OPEN_ANIM_MS);
  }, [opening, onOpen]);

  const cls = [
    "envelope-intro",
    started && "envelope-intro--play",
    scratchRevealed && "envelope-intro--ready",
    opening && "envelope-intro--opening",
  ].filter(Boolean).join(" ");

  return (
    <div className={cls} role="presentation">
      {/* ═══ The envelope IS the entire screen ═══ */}
      <div className="envelope-intro__env">
        {/* Sage green background + motifs */}
        <div className="envelope-intro__env-bg" aria-hidden="true" />
        <KabyleMotifs variant="intro" />

        {/* Edge vignette for depth */}
        <div className="envelope-intro__env-vignette" aria-hidden="true" />

        {/* Triangular flap (top) */}
        <div className="envelope-intro__flap" aria-hidden="true">
          <div className="envelope-intro__flap-fill" />
        </div>

        {/* ── Cachet puis noms + date à gratter en dessous ── */}
        <div className="envelope-intro__content">
          <div className="envelope-intro__seal-stage">
            <button
              type="button"
              className="envelope-intro__seal"
              onClick={handleSealClick}
              aria-label={intro.ctaLabel || "Ouvrir l'invitation"}
              disabled={opening}
            >
              <span className="envelope-intro__seal-rim" aria-hidden="true" />
              <span className="envelope-intro__seal-face">
                <span className="envelope-intro__seal-text">{monogram}</span>
              </span>
            </button>
          </div>

          <div className="envelope-intro__below-seal">
            <header className="envelope-intro__header">
              {firstName && (
                <span className="envelope-intro__name-script">{firstName}</span>
              )}
              {firstName && secondName && (
                <span className="envelope-intro__name-and">and</span>
              )}
              {secondName && (
                <span className="envelope-intro__name-serif">{secondName}</span>
              )}
            </header>

            <div className="envelope-intro__scratch-wrap">
              <ScratchDateReveal
                text={intro.overlaySubtitle}
                onReveal={() => setScratchRevealed(true)}
              />
            </div>
          </div>
        </div>

        {/* ── Card that slides out on open ── */}
        <div className="envelope-intro__card" aria-hidden="true">
          <p className="envelope-intro__card-overline">Vous êtes invités</p>
          <p className="envelope-intro__card-names">{intro.overlayTitle}</p>
          <p className="envelope-intro__card-date">{intro.overlaySubtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default EnvelopeIntroAnimation;
