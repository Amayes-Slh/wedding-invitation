import { useMemo } from "react";
import EnvelopeIntroAnimation from "./EnvelopeIntroAnimation";

/**
 * intro.introMode:
 * - "envelope" (defaut) : animation enveloppe CSS (inspiree de la video)
 * - "video" : fond video + overlay texte
 * - "simple" : fond degrade sans animation enveloppe
 */
function IntroScreen({ intro, onOpen }) {
  const mode = intro?.introMode ?? "envelope";

  const hasVideo = useMemo(
    () => Boolean(intro?.useVideoBackground && intro?.videoSrc),
    [intro?.useVideoBackground, intro?.videoSrc]
  );

  if (mode === "envelope") {
    return <EnvelopeIntroAnimation intro={intro} onOpen={onOpen} />;
  }

  return (
    <div className="intro-screen">
      {hasVideo ? (
        <video
          className="intro-video"
          src={intro.videoSrc}
          poster={intro.posterSrc}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <div className="intro-fallback" aria-hidden="true" />
      )}
      <div className="intro-overlay">
        <p className="intro-subtitle">{intro.overlaySubtitle}</p>
        <h1>{intro.overlayTitle}</h1>
        {intro.overlayMessage ? <p className="intro-message">{intro.overlayMessage}</p> : null}
        <button type="button" onClick={onOpen} className="primary-btn">
          {intro.ctaLabel}
        </button>
      </div>
    </div>
  );
}

export default IntroScreen;
