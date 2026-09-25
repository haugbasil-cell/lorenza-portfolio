"use client";

import { useEffect, useState } from "react";
import RandomImage from "./RandomImage";
import DuotoneGallery from "./DuotoneGallery";
import styles from "./page.module.css";

const IDLE_DELAY = 5000;

export default function HomeContent({
  name,
  email,
  copyrightYear,
  images,
  showMainImage,
  duotoneImages,
  showDuotoneGallery,
  backgroundColor,
  years,
  galleries,
}) {
  const [hovering, setHovering] = useState(false);
  const [idleActive, setIdleActive] = useState(false);
  const activeColor = backgroundColor;
  const isActive = hovering || idleActive;

  useEffect(() => {
    let idleTimer;

    function startTimer() {
      idleTimer = setTimeout(() => {
        setIdleActive(true);
      }, IDLE_DELAY);
    }

    function handleActivity() {
      setIdleActive(false);
      clearTimeout(idleTimer);
      startTimer();
    }

    const events = ["mousemove", "mousedown", "touchstart", "keydown", "scroll"];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    startTimer();

    return () => {
      clearTimeout(idleTimer);
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, []);

  return (
    <main className={styles.page} style={{ backgroundColor: activeColor }}>
      {showMainImage && (
        <RandomImage
          images={images}
          alt={name}
          hidden={isActive}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={() => setHovering((h) => !h)}
        />
      )}

      <div className={styles.textBlock}>
        <p>{name}</p>
        <div
          style={{ opacity: isActive ? 0 : 1, transition: "opacity 0.3s ease" }}
        >
          {years.length > 0 && (
            <p>
              {years.map((y, i) => (
                <span key={i}>
                  <a 
                    href={y.fileName ? `/files/${y.fileName}` : (y.pdfUrl || '#')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={y.highlighted ? styles.highlighted : undefined}
                  >
                    {y.label}
                  </a>
                  {i < years.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
          <p>
            Contact me:{' '}
            <a href={`mailto:${email}`}>{email}</a>
          </p>
          <p>© {copyrightYear} All Rights Reserved</p>
        </div>
      </div>

      {showDuotoneGallery && (
        <DuotoneGallery images={duotoneImages} alt={name} active={isActive} />
      )}
    </main>
  );
}