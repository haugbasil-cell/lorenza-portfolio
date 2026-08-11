// Zeigt im Studio nur "Startseite" an (statt einer generischen Dokumentliste),
// weil es von diesem Dokument nur genau eins geben soll (Singleton).
export const structure = (S) =>
  S.list()
    .title('Inhalt')
    .items([
      S.listItem()
        .title('Startseite')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
    ])
