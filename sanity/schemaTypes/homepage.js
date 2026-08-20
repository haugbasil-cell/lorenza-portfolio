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
  name: 'showMainImage',
  title: 'Bildergalerie oben links anzeigen',
  type: 'boolean',
  initialValue: true,
}),
   defineField({
  name: 'images',
  title: 'Bilder (oben links, zufällige Auswahl)',
  type: 'array',
  of: [
    {
      type: 'object',
      name: 'galleryImage',
      title: 'Bild',
      fields: [
        defineField({
          name: 'image',
          title: 'Bilddatei',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'fullBleed',
          title: 'Randlos (Fullbleed)',
          type: 'boolean',
          description:
            'An: Bild füllt die linke Spalte randlos von oben bis unten. Aus: Bild erscheint klein, mit Abstand zum Rand.',
          initialValue: false,
        }),
      ],
      preview: { select: { media: 'image', fullBleed: 'fullBleed' } },
    },
  ],
  description:
    'Lade hier mehrere Bilder hoch. Bei jedem Laden der Seite wird zufällig eines davon angezeigt.',
}),
defineField({
  name: 'showDuotoneGallery',
  title: 'Zweifarben-Galerie anzeigen',
  type: 'boolean',
  initialValue: true,
}),
defineField({
  name: 'duotoneImages',
  title: 'Zweifarben-Bildergalerie (zentriert, wechselt automatisch)',
  type: 'array',
  of: [
    {
      type: 'object',
      name: 'duotoneImage',
      title: 'Bild',
      fields: [
        defineField({
          name: 'image',
          title: 'Bilddatei',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'color',
          title: 'Akzentfarbe',
          type: 'color',
          description: 'Diese Farbe ersetzt die dunklen Bereiche des Bilds im Zweifarben-Effekt.',
        }),
      ],
      preview: { select: { media: 'image' } },
    },
  ],
  description:
    'Bilder für die zentrierte Galerie über dem Textblock. Jedes Bild wird automatisch in ein Zweifarben-Muster umgewandelt und wechselt alle paar Sekunden.',
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
