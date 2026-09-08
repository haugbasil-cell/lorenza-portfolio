import { client } from '@/sanity/lib/client'
import { homepageQuery } from '@/sanity/lib/queries'
import HomeContent from './HomeContent'

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
    galleries = [],
  } = data || {}

  return (
    <HomeContent
      name={name}
      email={email}
      copyrightYear={copyrightYear}
      images={images}
      showMainImage={showMainImage}
      duotoneImages={duotoneImages}
      showDuotoneGallery={showDuotoneGallery}
      backgroundColor={backgroundColor}
      years={years}
      galleries={galleries}
    />
  )
}