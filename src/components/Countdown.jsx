import { useEffect, useMemo, useState } from "react";

function toParts(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function Countdown({ targetDateISO }) {
  const targetTime = useMemo(() => new Date(targetDateISO).getTime(), [targetDateISO]);
  const [parts, setParts] = useState(() => toParts(targetTime - Date.now()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setParts(toParts(targetTime - Date.now()));
    }, 1000);
    return () => window.clearInterval(id);
  }, [targetTime]);

  return (
    <section className="section">
      <h2>Compte a rebours</h2>
      <div className="countdown-grid">
        <div><strong>{parts.days}</strong><span>Jours</span></div>
        <div><strong>{parts.hours}</strong><span>Heures</span></div>
        <div><strong>{parts.minutes}</strong><span>Minutes</span></div>
        <div><strong>{parts.seconds}</strong><span>Secondes</span></div>
      </div>
    </section>
  );
}

export default Countdown;
