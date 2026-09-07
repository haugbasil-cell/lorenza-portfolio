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
  const [isTouch, setIsTouch] = useState(false);

   useEffect(() => {
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouch(touch);
  }, []);

  return (
    <main
      className={styles.page}
      style={{ backgroundColor: hovering ? "#3c3c3c" : backgroundColor }}
    >
      {showMainImage && (
        <RandomImage
          images={images}
          alt={name}
          hidden={hovering}
          onMouseEnter={isTouch ? undefined : () => setHovering(true)}
          onMouseLeave={isTouch ? undefined : () => setHovering(false)}
          onClick={isTouch ? () => setHovering((h) => !h) : undefined}
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

      {showDuotoneGallery && hovering && (
        <DuotoneGallery images={duotoneImages} alt={name} />
      )}
    </main>
  );
}