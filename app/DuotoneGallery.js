"use client";

import { useEffect, useRef, useState } from "react";
import { urlFor } from "@/sanity/lib/image";
import styles from "./page.module.css";

const REVEAL_DURATION = 3000; // ms - wie lange der Auf-/Abbau pro Bild dauert
const HOLD_DURATION_FULL = 1000; // ms - wie lange die volle Farbfläche stehen bleibt (kürzer)
const HOLD_DURATION_EMPTY = 3000; // ms - wie lange der leere Zustand (Bild komplett weg) stehen bleibt (länger)
const THRESHOLD_TARGET = 255; // "voller Wert" (wie Photoshops Schwellenwert-Regler)
const SOURCE_WIDTH = 5000; // Auflösung für Sanity-Abruf UND Graustufen-Berechnung (höher = feineres Raster)

// Lädt ein Bild und berechnet einmalig die Graustufen-Werte pro Pixel.
function loadGrayscale(url) {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const maxWidth = SOURCE_WIDTH;
      const scale = Math.min(1, maxWidth / img.naturalWidth);
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);
      const gray = new Uint8ClampedArray(w * h);
      for (let i = 0; i < w * h; i++) {
        gray[i] =
          0.299 * data[i * 4] + 0.587 * data[i * 4 + 1] + 0.114 * data[i * 4 + 2];
      }
      resolve({ gray, w, h });
    };
    img.onerror = reject;
    img.src = url;
  });
}

export default function DuotoneGallery({ images, alt }) {
  const canvasRef = useRef(null);
  const [prepared, setPrepared] = useState([]);
  const [index, setIndex] = useState(0);

  // Alle Bilder einmalig vorbereiten (Graustufen berechnen)
  useEffect(() => {
    let cancelled = false;
    async function prepareAll() {
      if (!images || images.length === 0) return;
      const results = await Promise.all(
        images.map(async (item) => {
          try {
            const { gray, w, h } = await loadGrayscale(
              urlFor(item.image).width(SOURCE_WIDTH).quality(85).url()
            );
            return { gray, w, h, color: item.color || "#000000" };
          } catch (e) {
            return null;
          }
        })
      );
      if (!cancelled) setPrepared(results.filter(Boolean));
    }
    prepareAll();
    return () => {
      cancelled = true;
    };
  }, [images]);

  // Animation: Bild 1 baut sich auf (0 -> voll), Bild 2 baut sich ab
  // (voll -> 0), Bild 3 wieder auf, usw. - im Wechsel je nach Index.
  useEffect(() => {
    if (prepared.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let raf;
    let timeout;
    let cancelled = false;

    function render(item, thresholdValue) {
      const { gray, w, h, color } = item;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      const hex = color.replace("#", "");
      const r = parseInt(hex.substring(0, 2), 16) || 0;
      const g = parseInt(hex.substring(2, 4), 16) || 0;
      const b = parseInt(hex.substring(4, 6), 16) || 0;

      for (let i = 0; i < w * h; i++) {
        const isDark = gray[i] < thresholdValue;
        data[i * 4] = r;
        data[i * 4 + 1] = g;
        data[i * 4 + 2] = b;
        data[i * 4 + 3] = isDark ? 255 : 0;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    function runReveal(item, buildUp) {
      const start = performance.now();
      function step(now) {
        if (cancelled) return;
        const progress = Math.min(1, (now - start) / REVEAL_DURATION);
        const thresholdValue = buildUp
          ? progress * THRESHOLD_TARGET
          : THRESHOLD_TARGET * (1 - progress);
        render(item, thresholdValue);
        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          const holdTime = buildUp ? HOLD_DURATION_FULL : HOLD_DURATION_EMPTY;
          timeout = setTimeout(() => {
            if (!cancelled) setIndex((i) => (i + 1) % prepared.length);
          }, holdTime);
        }
      }
      raf = requestAnimationFrame(step);
    }

    const buildUp = index % 2 === 0;
    runReveal(prepared[index % prepared.length], buildUp);

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
    };
  }, [prepared, index]);

  if (!prepared || prepared.length === 0) return null;

  return (
    <div className={styles.duotoneWrap}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={alt}
        className={styles.duotoneImage}
      />
    </div>
  );
}