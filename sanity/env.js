// Diese Werte kommen aus deinem Sanity-Projekt (sanity.io/manage) bzw. aus der .env.local Datei.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

if (!projectId) {
  console.warn(
    'NEXT_PUBLIC_SANITY_PROJECT_ID fehlt. Trage sie in .env.local ein (siehe README.md).'
  )
}
