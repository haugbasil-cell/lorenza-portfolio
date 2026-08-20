import { groq } from 'next-sanity'

// GROQ = die Abfragesprache von Sanity (ähnlich wie eine Datenbank-Query).
// Holt das einzige "homepage"-Dokument mitsamt allen Feldern, die wir brauchen.
export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    name,
    email,
    instagram,
    copyrightYear,
showMainImage,
images[]{
  fullBleed,
  "image": image,
  "dimensions": image.asset->metadata.dimensions
},
showDuotoneGallery,
duotoneImages[]{
  "image": image,
  "color": color.hex
},
    "backgroundColor": backgroundColor.hex,
    years[]{
      label,
      highlighted,
      "pdfUrl": pdf.asset->url
    }
  }
`
