import { client } from '@/sanity/lib/client'
import { homepageQuery } from '@/sanity/lib/queries'
import RandomImage from './RandomImage'
import DuotoneGallery from './DuotoneGallery'
import styles from './page.module.css'

export const revalidate = 30

export default async function Home() {
  let data = null
  try {
    data = await client.fetch(homepageQuery)
  } catch (error) {
    console.warn('Konnte Sanity-Daten nicht laden:', error.message)
  }

  const {
    name = 'Lorenza Longhi',
    email = '',
    copyrightYear = new Date().getFullYear().toString(),
    images = [],
    showMainImage = true,
    duotoneImages = [],
    showDuotoneGallery = true,
    backgroundColor = '#3D0F35',
    years = [],
  } = data || {}

  return (
    <main className={styles.page} style={{ backgroundColor }}>
     {showMainImage && <RandomImage images={images} alt={name} />}
{showDuotoneGallery && <DuotoneGallery images={duotoneImages} alt={name} />}

      <div className={styles.textBlock}>
        <p>{name}</p>
       <p>
  Portfolio:{' '}
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
        <p>{name} © {copyrightYear} All Rights Reserved</p>
      </div>
    </main>
  )
}