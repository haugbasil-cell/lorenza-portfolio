import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Startseite',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Interner Titel (nur zur Orientierung im Studio)',
      type: 'string',
      initialValue: 'Startseite',
    }),
    defineField({
  name: 'images',
  title: 'Bilder (oben links, zufällige Auswahl)',
  type: 'array',
  of: [{ type: 'image', options: { hotspot: true } }],
  description:
    'Lade hier mehrere Bilder hoch. Bei jedem Laden der Seite wird zufällig eines davon angezeigt.',
}),
    defineField({
      name: 'backgroundColor',
      title: 'Hintergrundfarbe',
      type: 'color',
      description: 'Farbe für den gesamten Seitenhintergrund.',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      initialValue: 'Lorenza Longhi',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram-Handle',
      type: 'string',
      description: 'z. B. @lorenzzzzzzzza (ohne Link, nur der Name)',
    }),
    defineField({
      name: 'copyrightYear',
      title: 'Copyright-Jahr',
      type: 'string',
      initialValue: '2026',
    }),
    defineField({
      name: 'years',
      title: 'Portfolio-Jahre',
      description:
        'Eine Zeile pro Jahr. Jedes Jahr kann ein eigenes PDF haben, das beim Klick geöffnet wird.',
      type: 'array',
      of: [
        defineField({
          name: 'yearEntry',
          title: 'Jahr',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Beschriftung',
              type: 'string',
              description: 'z. B. "2025" oder "2017–2018"',
            }),
            defineField({
              name: 'highlighted',
              title: 'Aktuell / hervorgehoben?',
              type: 'boolean',
              description: 'Zeigt dieses Jahr farblich hervorgehoben an (z. B. das neueste).',
              initialValue: false,
            }),
            defineField({
              name: 'pdf',
              title: 'PDF-Datei',
              type: 'file',
              options: { accept: '.pdf' },
            }),
          ],
          preview: {
            select: { title: 'label' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
