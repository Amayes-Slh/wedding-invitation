import { useCallback, useEffect, useRef, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import Countdown from "./components/Countdown";
import RsvpForm from "./components/RsvpForm";
import KabyleMotifs from "./components/KabyleMotifs";
import siteConfig from "./data/siteConfig";

function App() {
  const [isOpened, setIsOpened] = useState(!siteConfig.intro.enabled);
  const musicRef = useRef(null);
  const wedding = siteConfig.wedding;
  const hero = siteConfig.hero;
  const schedule = siteConfig.schedule;

  useEffect(() => {
    document.title = `${wedding.title} - ${wedding.coupleNames}`;
  }, [wedding.title, wedding.coupleNames]);

  /** play() dans le meme geste que le clic = politique autoplay respectee */
  const handleOpenInvitation = useCallback(() => {
    const el = musicRef.current;
    if (el) {
      el.volume = 0.45;
      el.play().catch(() => {});
    }
    setIsOpened(true);
  }, []);

  return (
    <>
      <audio
        ref={musicRef}
        className="hero-audio"
        src={hero.musicSrc}
        loop
        preload="auto"
        playsInline
      />
      {!isOpened ? (
        <IntroScreen intro={siteConfig.intro} onOpen={handleOpenInvitation} />
      ) : (
        <main className="main-kabyle">
          <KabyleMotifs variant="page" />
          <section className="hero">
            <video className="hero-video" src={hero.videoSrc} autoPlay loop muted playsInline />
            <div className="hero-overlay">
              <p className="overline">{wedding.title}</p>
              <h1>{wedding.coupleNames}</h1>
              {hero.kabylePhrase ? (
                <p lang="kab" className="hero-kabyle">
                  {hero.kabylePhrase}
                </p>
              ) : null}
              <p className="hero-meta">
                {wedding.dateLabel} - {wedding.venue}
              </p>
              <p className="quote">{hero.quote}</p>
            </div>
          </section>

          <Countdown targetDateISO={wedding.dateISO} />

          <section className="section">
            <h2>Programme</h2>
            <div className="timeline">
              {schedule.map((item) => (
                <article className="timeline-item" key={`${item.time}-${item.title}`}>
                  <p className="time">{item.time}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section theme-palette-section">
            <p className="theme-palette__label">Thème & couleurs du mariage</p>
            <div className="theme-palette">
              <div className="theme-palette__swatch" style={{ background: "#EFE7D3" }}>
                <span className="theme-palette__name">Ivoire</span>
              </div>
              <div className="theme-palette__swatch" style={{ background: "#B6C09D" }}>
                <span className="theme-palette__name">Sauge</span>
              </div>
              <div className="theme-palette__swatch" style={{ background: "#5D5644" }}>
                <span className="theme-palette__name">Brun doré</span>
              </div>
            </div>
          </section>

          <RsvpForm title={siteConfig.rsvp.title} subtitle={siteConfig.rsvp.subtitle} />
        </main>
      )}
    </>
  );
}

export default App;
