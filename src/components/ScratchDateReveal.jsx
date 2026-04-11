import { useCallback, useEffect, useRef, useState } from "react";

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

/**
 * Couche type ticket à gratter pour révéler le texte (date / lieu).
 */
export default function ScratchDateReveal({
  text,
  hint = "Grattez pour reveler",
  onReveal,
}) {
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const scratchingRef = useRef(false);
  const revealedRef = useRef(false);

  const drawMetallicLayer = useCallback(() => {
    const canvas = canvasRef.current;
    const container = wrapRef.current;
    if (!canvas || !container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w < 4 || h < 4) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.floor(w * dpr);
    const H = Math.floor(h * dpr);
    canvas.width = W;
    canvas.height = H;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#b8a990");
    g.addColorStop(0.22, "#e2ddd2");
    g.addColorStop(0.45, "#9a9080");
    g.addColorStop(0.55, "#d8d2c6");
    g.addColorStop(0.78, "#c4baa8");
    g.addColorStop(1, "#a89e8c");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
    ctx.lineWidth = Math.max(1, dpr);
    const step = 5 * dpr;
    for (let i = -H; i < W + H; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + H, H);
      ctx.stroke();
    }
    ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
    for (let i = -H; i < W + H; i += step * 2) {
      ctx.beginPath();
      ctx.moveTo(i + step, 0);
      ctx.lineTo(i + H + step, H);
      ctx.stroke();
    }

    ctx.fillStyle = "rgba(65, 60, 52, 0.28)";
    ctx.font = `${Math.max(10, 11 * dpr)}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(hint, W / 2, H / 2);
  }, [hint]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(drawMetallicLayer);
    });
    ro.observe(el);
    requestAnimationFrame(drawMetallicLayer);
    return () => ro.disconnect();
  }, [drawMetallicLayer, reducedMotion]);

  const eraseAt = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sx = canvas.width / rect.width;
    const sy = canvas.height / rect.height;
    const x = (clientX - rect.left) * sx;
    const y = (clientY - rect.top) * sy;
    const r = 20 * Math.min(sx, sy);
    const ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }, []);

  const checkRevealProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const { width, height } = canvas;
    if (!ctx || width < 1 || height < 1) return;

    const data = ctx.getImageData(0, 0, width, height).data;
    const step = 4 * 6;
    let cleared = 0;
    let samples = 0;

    for (let i = 3; i < data.length; i += step) {
      samples += 1;
      if (data[i] < 32) cleared += 1;
    }

    if (samples > 0 && cleared / samples >= 0.42) {
      revealedRef.current = true;
      onReveal?.();
    }
  }, [onReveal]);

  const onPointerDown = (e) => {
    if (reducedMotion) return;
    scratchingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    eraseAt(e.clientX, e.clientY);
  };

  const onPointerMove = (e) => {
    if (reducedMotion || !scratchingRef.current) return;
    eraseAt(e.clientX, e.clientY);
    checkRevealProgress();
  };

  const endScratch = () => {
    scratchingRef.current = false;
    checkRevealProgress();
  };

  if (reducedMotion) {
    return <p className="envelope-intro__scratch-date">{text}</p>;
  }

  return (
    <>
      <span className="envelope-intro__sr-only">{text}</span>
      <div className="envelope-intro__scratch-inner" ref={wrapRef} aria-hidden="true">
        <p className="envelope-intro__scratch-date">{text}</p>
        <canvas
          ref={canvasRef}
          className="envelope-intro__scratch-canvas"
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endScratch}
          onPointerCancel={endScratch}
          onLostPointerCapture={endScratch}
        />
      </div>
    </>
  );
}
