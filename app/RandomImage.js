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
  const wrapClass = selected.fullBleed ? styles.imageWrapFullBleed : styles.imageWrap;
  const imgClass = selected.fullBleed ? styles.imageFullBleed : styles.image;
const sourceWidth = selected.fullBleed ? 1800 : 640;
  return (
    <div className={wrapClass}>
      <Image
        src={urlFor(selected.image).width(sourceWidth).quality(90).url()}
        alt={alt}
        width={width}
        height={height}
        className={imgClass}
        priority
      />
    </div>
  );
}