import Image from 'next/image'
import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { homepageQuery } from '@/sanity/lib/queries'
import styles from './page.module.css'

// revalidate: alle 30 Sekunden wird die Seite neu von Sanity geladen.
// So sind Änderungen der Kundin nach kurzer Zeit live, ohne dass du neu deployen musst.
export const revalidate = 30

export default async function Home() {
  // try/catch, damit die Seite nicht crasht, solange noch kein Sanity-Projekt
  // verbunden ist (z. B. direkt nach dem ersten Aufsetzen) oder das Studio
  // noch keinen Inhalt hat.
  let data = null
  try {
    data = await client.fetch(homepageQuery)
  } catch (error) {
    console.warn('Konnte Sanity-Daten nicht laden:', error.message)
  }

  const {
    name = 'Lorenza Longhi',
    email = '',
    instagram = '',
    copyrightYear = new Date().getFullYear().toString(),
    mainImage,
    backgroundColor = '#3D0F35',
    years = [],
  } = data || {}

  return (
    <main className={styles.page} style={{ backgroundColor }}>
      <div className={styles.imageWrap}>
        {mainImage ? (
          <Image
            src={urlFor(mainImage).width(440).quality(90).url()}
            alt={name}
            width={220}
            height={987}
            className={styles.image}
            priority
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            Bild im Sanity Studio hochladen
          </div>
        )}
      </div>

      <div className={styles.textBlock}>
        <p>{name}</p>
        <p>
          Portfolio:&nbsp;All,{' '}
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
          Email:{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          Instagram:{' '}
          <a
            href={`https://instagram.com/${(instagram || '').replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {instagram}
          </a>
        </p>
        <p>Copyright © {copyrightYear} {name}</p>
      </div>
    </main>
  )
}
