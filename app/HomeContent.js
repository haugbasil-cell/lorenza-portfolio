"use client";

import { useEffect, useState } from "react";
import RandomImage from "./RandomImage";
import DuotoneGallery from "./DuotoneGallery";
import styles from "./page.module.css";

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
}) {
  const [hovering, setHovering] = useState(false);
  const activeColor = hovering ? "#000000" : backgroundColor;

  // Synchronisiert html/body-Hintergrund mit dem aktuellen Zustand,
  // damit auf iOS der Bounce-Effekt oben/unten beim Scrollen die
  // richtige Farbe zeigt (normal ODER schwarz bei Hover), statt einer
  // fest einprogrammierten Farbe.
  useEffect(() => {
    document.documentElement.style.backgroundColor = activeColor;
    document.body.style.backgroundColor = activeColor;
  }, [activeColor]);

  return (
    <main className={styles.page} style={{ backgroundColor: activeColor }}>
      {showMainImage && (
        <RandomImage
          images={images}
          alt={name}
          hidden={hovering}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={() => setHovering((h) => !h)}
        />
      )}

      <div
        className={styles.textBlock}
        style={{ opacity: hovering ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <p>{name}</p>
        <p>
          {years.map((y, i) => (
            <span key={i}>
              <a
                href={y.pdfUrl || '#'}
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
        <p>
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>© {copyrightYear} All Rights Reserved</p>
      </div>

      {showDuotoneGallery && (
        <DuotoneGallery images={duotoneImages} alt={name} active={hovering} />
      )}
    </main>
  );
}