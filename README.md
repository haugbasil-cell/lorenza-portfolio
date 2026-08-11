# Lorenza Longhi — Portfolio (Next.js + Sanity)

Fertig aufgesetztes Projekt: Next.js-Website + eingebettetes Sanity-Studio unter `/studio`.
Editierbar sind: Bild, Hintergrundfarbe, Name, Email, Instagram, Copyright-Jahr und die
Liste der Portfolio-Jahre mit jeweils eigener PDF-Datei.

Diese Anleitung führt dich komplett von "leerer Ordner" bis "live auf Vercel".

---

## 1. Vorbereitung

Du brauchst:
- [Node.js](https://nodejs.org) (Version 18 oder neuer) auf deinem Rechner installiert
- Einen kostenlosen Account auf [sanity.io](https://www.sanity.io)
- Einen kostenlosen Account auf [vercel.com](https://vercel.com)

Prüfen, ob Node installiert ist (Terminal öffnen):
```bash
node -v
```

---

## 2. Projekt lokal starten

Diesen Ordner in dein Terminal ziehen bzw. dorthin navigieren, dann:

```bash
npm install
```

Das installiert alle Abhängigkeiten (Next.js, React, Sanity).

---

## 3. Eigenes Sanity-Projekt anlegen

Sanity braucht ein "Projekt" (vergleichbar mit einer Datenbank für deine Inhalte).

1. Gehe zu [sanity.io/manage](https://www.sanity.io/manage) → **"Create project"**
2. Namen vergeben, z. B. "Lorenza Portfolio"
3. Unter dem Reiter **"API"** deines neuen Projekts findest du die **Project ID**
   (z. B. `ab12cd34`) — die kopierst du

Das Dataset heißt standardmäßig `production` — das kannst du so lassen.

---

## 4. Umgebungsvariablen eintragen

Datei `.env.local.example` kopieren und umbenennen zu `.env.local`:

```bash
cp .env.local.example .env.local
```

Dann `.env.local` öffnen und deine Project ID eintragen:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=deine-project-id-hier
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

---

## 5. Lokal starten

```bash
npm run dev
```

- Website: [http://localhost:3000](http://localhost:3000)
- Sanity Studio (Backend): [http://localhost:3000/studio](http://localhost:3000/studio)

Beim ersten Öffnen von `/studio` wirst du gebeten, dich mit deinem Sanity-Account
einzuloggen (einmalig, im Browser).

---

## 6. Inhalte im Studio anlegen

Unter `/studio`:

1. Auf **"Startseite"** klicken (das ist das einzige Dokument, mehr braucht die Seite nicht)
2. Bild hochladen (Feld "Bild (oben links)")
3. Hintergrundfarbe wählen (Feld "Hintergrundfarbe")
4. Name, Email, Instagram, Copyright-Jahr ausfüllen
5. Unter "Portfolio-Jahre" für jedes Jahr eine Zeile hinzufügen (`+`-Button):
   - Beschriftung, z. B. `2025`
   - "Aktuell / hervorgehoben?" anhaken, wenn dieses Jahr farblich (orange) hervorgehoben
     werden soll — wie im Mockup das Jahr "2025"
   - PDF-Datei hochladen
6. Oben rechts **"Publish"** klicken

Nach ein paar Sekunden erscheinen die Änderungen automatisch auf der Website
(auch schon lokal unter localhost:3000 — einfach neu laden).

---

## 7. Auf Vercel veröffentlichen

1. Projekt zu GitHub hochladen (neues Repository erstellen, diesen Ordner pushen)
   — falls du damit noch nicht vertraut bist, sag Bescheid, dann gehen wir das
   auch Schritt für Schritt durch.
2. Auf [vercel.com](https://vercel.com) → **"Add New Project"** → dein GitHub-Repo auswählen
3. Bei den Umgebungsvariablen (Environment Variables) exakt die gleichen drei Werte
   aus deiner `.env.local` eintragen:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
4. **Deploy** klicken

Nach dem Deploy ist die Seite live unter einer `*.vercel.app`-Adresse, und `/studio`
funktioniert dort genauso wie lokal.

---

## 8. Eigene Domain verbinden

In Vercel unter **Project → Settings → Domains** die Domain deiner Kundin eintragen
und die angezeigten DNS-Einträge beim Domain-Anbieter (z. B. IONOS, Namecheap) setzen.
Kostenlos, dauert je nach Anbieter wenige Minuten bis Stunden bis es greift.

---

## 9. Zugang für die Kundin

Im Sanity-Projekt unter [sanity.io/manage](https://www.sanity.io/manage) → dein Projekt
→ **"Members"** → **"Invite members"** die Email deiner Kundin einladen, Rolle **"Editor"**.
Sie kann sich dann direkt unter `deine-domain.de/studio` einloggen und nur die Inhalte
bearbeiten (Bild, Farbe, Jahre/PDFs) — nicht das Design oder den Code.

---

## Projektstruktur (kurz erklärt)

```
app/page.js              → die eigentliche Website, lädt Daten aus Sanity
app/page.module.css       → das Layout/Styling (Position von Bild & Textblock)
app/studio/[[...tool]]/   → bettet das Sanity Studio unter /studio ein
sanity/schemaTypes/       → definiert, welche Felder die Kundin im Backend sieht
sanity/lib/                → Hilfsfunktionen (Verbindung zu Sanity, Bild-URLs)
sanity.config.js          → Grundkonfiguration des Studios
```

Wenn du später ein neues Feld brauchst (z. B. eine zweite Bildspalte), passt du
`sanity/schemaTypes/homepage.js` an (neues Feld) und `app/page.js` (Feld anzeigen).
