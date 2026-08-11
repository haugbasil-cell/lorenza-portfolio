/**
 * Diese Route bettet das Sanity Studio (das Backend/CMS) direkt in deine
 * Next.js-App unter /studio ein. So wird bei "vercel deploy" automatisch
 * beides zusammen veröffentlicht: die Website UND das Editor-Backend.
 */
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
