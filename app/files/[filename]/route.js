import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

export async function GET(request, context) {
  const { filename } = await context.params

  const query = groq`*[_type == "homepage"][0]{
    years[]{
      "fileName": pdf.asset->originalFilename,
      "pdfUrl": pdf.asset->url
    }
  }`

  const data = await client.fetch(query)
  const entry = data?.years?.find((y) => y.fileName === filename)

  if (!entry?.pdfUrl) {
    return new Response('Not found', { status: 404 })
  }

  const fileRes = await fetch(entry.pdfUrl)
  const buffer = await fileRes.arrayBuffer()

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${filename}"`,
    },
  })
}