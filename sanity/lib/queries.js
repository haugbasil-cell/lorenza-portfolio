import { groq } from 'next-sanity'

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
  "color": color.hex,
  rotateFrame
},
    "backgroundColor": backgroundColor.hex,
    years[]{
      label,
      highlighted,
      "pdfUrl": pdf.asset->url
    },
    galleries[]{
      name,
      url
    }
  }
`

export const faviconQuery = groq`
  *[_type == "homepage"][0]{
    "faviconUrl": favicon.asset->url
  }
`