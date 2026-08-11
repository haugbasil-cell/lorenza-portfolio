"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import styles from "./page.module.css";

export default function RandomImage({ images, alt }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (images && images.length > 0) {
      const random = images[Math.floor(Math.random() * images.length)];
      setSelected(random);
    }
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className={styles.imageWrap}>
        <div className={styles.imagePlaceholder}>
          Bilder im Sanity Studio hochladen
        </div>
      </div>
    );
  }

  if (!selected) {
    return <div className={styles.imageWrap} />;
  }

 const width = selected.dimensions?.width || 800;
  const height = selected.dimensions?.height || 1200;

  return (
    <div className={styles.imageWrap}>
      <Image
        src={urlFor(selected).width(600).quality(90).url()}
        alt={alt}
        width={width}
        height={height}
        className={styles.image}
        priority
      />
    </div>
  );
}