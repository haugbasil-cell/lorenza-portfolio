"use client";

import { useState } from "react";
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
  galleries,
}) {
  const [hovering, setHovering] = useState(false);
  const activeColor = hovering ? "#3f3f3f" : backgroundColor;

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
          Downloads:{' '}
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
        {galleries.length > 0 && (
          <p>
            Represented by:{' '}
            {galleries.map((g, i) => (
              <span key={i}>
                {g.url ? (
                  <a href={g.url} target="_blank" rel="noopener noreferrer">
                    {g.name}
                  </a>
                ) : (
                  g.name
                )}
                {i < galleries.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}
               <p>
          Contact:{' '}
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