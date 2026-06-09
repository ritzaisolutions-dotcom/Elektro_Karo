# Handwerker Website Template — Setup-Anleitung (RAIS)

**Ziel:** Neuer Kundendeploy in **4–6 Stunden**.
**Sektionen-Reihenfolge und Hero-Aufbau:** siehe `CLAUDE.md §3 + §4` — nicht abweichen.

---

## Schritt 1: Voraussetzungen

- [ ] GitHub-Account (Repo klonen/forken)
- [ ] Vercel-Account (kostenlos auf vercel.com)
- [ ] Web3Forms-Account (kostenlos auf web3forms.com) — für Kontaktformular
- [ ] Cal.com-Account (kostenlos auf cal.com) — für Terminbuchung
- [ ] Kundenmaterialien: Logo (SVG/PNG), Bilder, Kontaktdaten, Google-Profil-Link, Partner-Liste

---

## Schritt 2: `website/js/config.js` ausfüllen

Öffne `website/js/config.js` und ersetze **alle** `[PLACEHOLDER]`-Werte.

### 2a) Pflichtfelder — Firma & Kontakt

| Feld | Beschreibung | Beispiel |
|------|-------------|---------|
| `name` | Vollständiger Firmenname | `"Hans Schmitt Malerei e.K."` |
| `nameKurz` | Kurzform für Hero-Logo-Bereich | `"Schmitt"` |
| `unternehmenstyp` | Betriebsform | `"Malerbetrieb"` |
| `handwerksbezeichnung` | Berufsbezeichnung singular | `"Maler"` |
| `berufsbezeichnung` | Vollständiger Meistertitel | `"Malermeister"` |
| `gruendungsjahr` | Gründungsjahr | `"1991"` |
| `slogan` | 1–2 Sätze USP | `"Von der Wand bis zur Fassade."` |
| `strasse` | Straße + Hausnr. | `"Emser Straße 80"` |
| `plz` | PLZ | `"56076"` |
| `ort` | Ort | `"Koblenz"` |
| `telefon` | Tel für href (kein Leerzeichen) | `"+4926128744414"` |
| `telefonDisplay` | Tel Anzeigeformat | `"0261 / 28744414"` |
| `email` | E-Mail | `"info@malergeschaeft-schmitt.de"` |
| `domain` | Live-Domain ohne trailing slash | `"https://malergeschaeft-schmitt.de"` |

### 2b) Pflichtfelder — Hero & Navigation

| Feld | Beschreibung | Beispiel |
|------|-------------|---------|
| `heroH1` | H1-Text im Hero (max. 5 Wörter) | `"Handwerk mit Haltung."` |
| `heroEyebrow` | Kleine Zeile über H1 | `"Meisterbetrieb · Koblenz · seit 1991"` |
| `heroCta` | CTA-Button-Text im Hero | `"Kostenloses Angebot"` |
| `navCta` | CTA-Button-Text im Header | `"Angebot anfragen"` |
| `whatsappText` | Vorausgefüllter WhatsApp-Text (URL-encoded) | `"Hallo%2C%20ich%20interessiere%20mich..."` |

### 2c) Pflichtfelder — Trust Strip

| Feld | Beschreibung | Beispiel |
|------|-------------|---------|
| `jahreErfahrung` | Jahre als String | `"30+"` |
| `googleBewertungNote` | Note als String | `"4.8"` |
| `googleBewertungAnzahl` | Anzahl Bewertungen | `"11"` |
| `projekte` | Abgeschlossene Projekte | `"500+"` |
| `teamGroesse` | Mitarbeiter | `"5"` |

### 2d) Pflichtfelder — SEO & Maps

| Feld | Beschreibung | Beispiel |
|------|-------------|---------|
| `web3formsKey` | Web3Forms Access Key | `"099dd006-..."` |
| `calcomLink` | Cal.com Buchungs-URL | `"https://cal.com/schmitt/beratung"` |
| `googleMapsEmbedUrl` | Google Maps Embed-URL | `"https://www.google.com/maps/embed?..."` |
| `googleBewertungsLink` | Link zum Google-Profil | `"https://g.page/..."` |
| `geoLat` | GPS Breite | `"50.3480602"` |
| `geoLng` | GPS Länge | `"7.6047456"` |
| `kammer` | Handwerkskammer | `"HWK Koblenz"` |
| `fachverband` | Branchenverband | `"Maler- und Lackierer-Innung"` |

### 2e) Pflichtfelder — Partner-Karussell

```js
partner: [
  // Mit Link + Logo-Bild:
  { name: "Brillux",            url: "https://brillux.de",          logo: "images/partner/brillux.webp" },
  // Mit Link, kein Logo (Text-Karte):
  { name: "ED Baucenter",       url: "https://ed-baucenter.de/",     logo: "" },
  // Kein Link (kein <a>-Tag):
  { name: "Elektro-Service X",  url: "",                             logo: "" },
],
partnerBgColor: "var(--primary)",  // Hintergrundfarbe der Partner-Sektion
```

### 2f) Pflichtfelder — FAQ

Mindestens 6 Einträge. Werden im FAQ-Akkordeon neben dem Kontaktformular angezeigt.

```js
faq: [
  {
    frage: "Wie lange dauert ein typisches Projekt?",
    antwort: "Das hängt vom Umfang ab — ein Zimmer streichen dauert 1–2 Tage, eine Fassade 1–2 Wochen."
  },
  {
    frage: "Erstellen Sie kostenlose Angebote?",
    antwort: "Ja, wir kommen gerne vor Ort und erstellen ein unverbindliches Angebot."
  },
  // ... weitere Einträge
],
```

### 2g) Pflichtfelder — Leistungen & Kostenrechner

| Feld | Beschreibung |
|------|-------------|
| `leistungenKurz` | Kurzliste für Meta-Description |
| `leistung1Titel` … `leistung4Titel` | Titel der 4 Leistungskarten |
| `leistung1Text` … `leistung4Text` | Beschreibungstext pro Karte |
| `leistung1Items[]` … `leistung4Items[]` | Sub-Item-Listen pro Karte (min. 4 Punkte) |
| `calcProjekte[]` | Projektkategorien im Rechner |
| `calcMaterialien[]` | Materialoptionen im Rechner |
| `calcExtras[]` | Zusatzleistungen im Rechner |
| `preise.*` | Preise pro m² |

### 2h) Optionale Felder

| Feld | Beschreibung |
|------|-------------|
| `facebook` | Facebook-URL (leer lassen wenn nicht vorhanden) |
| `instagram` | Instagram-URL |
| `fax` / `faxDisplay` | Fax |
| `warumLabel` | Überschrift der Warum-wir-Sektion |
| `warum1Titel` … `warum4Text` | 4 USP-Punkte |

---

## Schritt 3: Bilder austauschen

Alle Bilder in `website/images/`. **Dateinamen sind fix** — Kundenbilder unter diesen Namen ablegen.

### Pflichtbilder

| Dateiname | Verwendung | Dimension | Format |
|-----------|-----------|-----------|--------|
| `logo-client.webp` + `.png` | Header + Hero | min. 800×170px, transparenter BG | WebP + PNG |
| `logo-client-white.webp` | Logo im Hero (weiß/hell) | gleich wie oben | WebP |
| `favicon-client.png` | Browser-Tab | 512×512px | PNG |
| `hero-poster.webp` + `.jpg` | Hero-Video-Fallback | 1920×1080px | WebP + JPG |
| `video_hero_section_background.mp4` | Hero-Background-Video | 1080p, max. 5MB | MP4 H.264 |
| `og-image.jpg` | Social-Share-Vorschau | 1200×630px | JPG |

### Weitere Bilder

| Dateiname | Verwendung | Dimension | Format |
|-----------|-----------|-----------|--------|
| `team-bild.webp` + `.jpg` | Über-uns | 1200×900px (4:3) | WebP + JPG |
| `bild-haus.webp` + `.jpg` | Warum-wir | 1200×900px (4:3) | WebP + JPG |
| `ref_1.webp` … `ref_10.webp` | Referenz-Projekte | 800×600px | WebP |
| `vorher_slide.webp` | Vorher/Nachher | 1024×571px | WebP |
| `nachher_slide.webp` | Vorher/Nachher | gleich wie vorher | WebP |
| `meisterbrief.webp` | Urkunden/Zertifikate | Hochformat, min. 400×600px | WebP |
| `partner/[name].webp` | Partner-Karussell | 200×80px, transparenter BG | WebP |

**WebP konvertieren (PowerShell, benötigt ffmpeg):**
```powershell
.\scripts\convert-images-webp.ps1
```

---

## Schritt 4: Texte in HTML eintragen

| Inhalt | Wo |
|--------|-----|
| Hero H1, Eyebrow, CTA | `config.js → heroH1, heroEyebrow, heroCta` |
| Leistungen (4 Karten + Sub-Items) | `config.js → leistung1Titel` … |
| Warum-wir (4 USPs) | `config.js → warum1Titel` … |
| Trust-Kennzahlen | `config.js → jahreErfahrung, projekte` … |
| Partner-Array | `config.js → partner[]` |
| FAQ-Einträge | `config.js → faq[]` |
| Über-uns (3 Absätze) | `index.html` → `[ÜBER_UNS_ABSATZ_1]` … `[ÜBER_UNS_ABSATZ_3]` |
| Google-Bewertungen (5×) | `index.html` → `[BEWERTUNG_1_VORNAME]` … |
| Leistungs-Unterseiten | `website/leistungen/*.html` |

### 4a) Über-uns Text
In `index.html` nach `[ÜBER_UNS_ABSATZ_1]` suchen — 3 Absätze mit Kundentext ersetzen.

### 4b) Google-Bewertungen (5 Stück)
In `index.html` nach `[BEWERTUNG_1_VORNAME_NACHNAME]` suchen.
- Name: Echten Namen aus Google verwenden
- Text: Verbatim aus Google-Profil kopieren (keine Änderungen)
- Avatar-Initiale: Erster Buchstabe Vorname

### 4c) FAQ-Einträge
Mindestens 6 Einträge in `config.js → faq[]` — häufige echte Kundenfragen verwenden.

---

## Schritt 5: Web3Forms einrichten

1. [web3forms.com](https://web3forms.com) → "Create your Access Key" mit Kunden-E-Mail
2. Bestätigungs-Mail öffnen, Access Key kopieren
3. In `config.js`: `web3formsKey: "KEY_HIER"`
4. Im Dashboard: Empfänger-E-Mail auf Kunden-Mail setzen

---

## Schritt 6: Cal.com einrichten

1. [cal.com](https://cal.com) → Account anlegen (Name des Kunden)
2. Event: "Kostenloses Beratungsgespräch" (30–60 min)
3. Buchungs-URL kopieren
4. In `config.js`: `calcomLink: "https://cal.com/..."`

---

## Schritt 7: Google Maps Embed-URL

1. [maps.google.com](https://maps.google.com) → Adresse suchen
2. "Teilen" → "Karte einbetten" → `<iframe src="...">` URL extrahieren
3. In `config.js`: `googleMapsEmbedUrl: "..."`

---

## Schritt 8: Farben anpassen

```css
/* website/css/variables.css */
--primary:       #1a2b4c;   /* [PRIMÄRFARBE] aus Kundenlogo */
--accent:        #c9a84c;   /* [AKZENTFARBE] — CTA-Buttons, Highlights */
--accent-hover:  #a8893c;   /* ~10% dunkler als --accent */
--accent-light:  #f5efe0;   /* sehr helle Version von --accent */
```

Tipp: [coolors.co](https://coolors.co) → Logo-Farbe eingeben → Palette generieren.

**Partner-Sektionshintergrund:** `config.js → partnerBgColor` setzen (z.B. `"var(--primary)"` oder direkter Hex-Wert).

---

## Schritt 9: WhatsApp-Button konfigurieren

```js
// config.js
telefon: "+4926128744414",  // ohne Leerzeichen, mit Ländervorwahl
whatsappText: "Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20ein%20Angebot.",
```

Der floating WhatsApp-Button baut die URL automatisch:
`https://wa.me/[telefon]?text=[whatsappText]`

---

## Schritt 10: Vercel Deployment

> Alle bekannten Deploy-Fehler sind hier bereits berücksichtigt.

### 10a) Repo auf GitHub pushen
```bash
git init
git add .
git commit -m "init: [KUNDENNAME] Website"
git remote add origin https://github.com/ritzaisolutions-dotcom/REPO.git
git push -u origin main
```

### 10b) Vercel Projekt anlegen
1. Vercel Dashboard → "Add New Project" → GitHub Repo importieren
2. **Root Directory:** `website` (kleingeschrieben, exakt so)
3. **Build Command:** LEER LASSEN
4. **Output Directory:** LEER LASSEN
5. Framework Preset: **Other**
6. Deploy

### 10c) Custom Domain
Vercel → Project → Settings → Domains → Domain hinzufügen → DNS beim Hoster setzen.

---

## Schritt 11: Rechtliches freigeben

- [ ] Impressum: Alle Felder vollständig (USt-IdNr, Kammer, Fachverband)
- [ ] Datenschutz: Auf Vollständigkeit prüfen
- [ ] Klaro Cookie-Banner: Firmenname korrekt
- [ ] Impressum + Datenschutz von jeder Seite erreichbar (Footer)
- [ ] **Cookiebot Alternative:** Falls Klaro nicht gewünscht → Cookiebot via `<script data-blockingmode="auto">` — `data-blockingmode="auto"` ist Pflicht

---

## Go-Live Checkliste

### Gate A — Inputs & Leak-Check
- [ ] Alle `[PLACEHOLDER]` in `config.js` ausgefüllt
- [ ] Kein Vorlagen-Leak: `rg -i "butz|römerberg|fliesenmeister-butz" website --glob "*.{html,js,css,xml}"` → 0 Treffer
- [ ] Kein offener Placeholder: `rg "\[PLACEHOLDER\]|\[ÜBER_UNS\]|\[BEWERTUNG_" website` → 0 Treffer
- [ ] Alle Pflichtbilder ausgetauscht (hero-poster, logo, og-image)
- [ ] Partner-Array ausgefüllt (alle 12 falls vorhanden)
- [ ] FAQ-Array ausgefüllt (min. 6 Einträge)
- [ ] Bewertungen eingetragen (5×)
- [ ] Über-Uns-Text eingetragen (3 Absätze)

### Gate B — Legal
- [ ] Impressum vollständig (§5 TMG)
- [ ] Datenschutz vollständig (DSGVO)
- [ ] Cookie-Banner: Ablehnen gleichwertig zu Akzeptieren
- [ ] Google Maps Embed nur nach Consent

### Gate C — Keine Fehler
- [ ] Browser-Konsole: keine JS-Fehler
- [ ] Netzwerk-Tab: keine 404er auf Assets
- [ ] Kostenrechner vollständig durchklickbar
- [ ] Kontaktformular: Test-Submission erfolgreich
- [ ] WhatsApp-Link öffnet mit vorbefülltem Text
- [ ] Tel-Link funktioniert auf Mobile

### Gate D — SEO
- [ ] `<title>` korrekt (50–60 Zeichen, Keyword + Stadt)
- [ ] `<meta description>` korrekt (150–160 Zeichen)
- [ ] Schema.org korrekt (Inspektor → `script[type="application/ld+json"]`)
- [ ] `og:image` gesetzt und Datei vorhanden
- [ ] `sitemap.xml` aktualisiert
- [ ] Genau 1× `<h1>` auf Startseite
- [ ] Alle `<img>` haben `alt`, `width`, `height`

### Gate E — Mobile & Performance
- [ ] HTTPS aktiv
- [ ] Kein horizontaler Scroll auf 375px
- [ ] Alle Tap-Targets ≥ 44×44px
- [ ] Floating Buttons (WhatsApp + Tel) nicht überlappend mit Footer
- [ ] Hero-Video lädt auf Mobile (oder Fallback-Poster sichtbar)
- [ ] Kontaktformular + FAQ auf Mobile gestackt (nicht nebeneinander)
- [ ] Partner-Karussell auf Mobile lesbar

---

## Hilfe & Referenzen

- Web3Forms: https://docs.web3forms.com
- Cal.com: https://cal.com/docs
- Vercel: https://vercel.com/docs
- Klaro: https://heyklaro.com/docs
- Cookiebot: https://www.cookiebot.com/de/
- SOP-Playbook: `sop-webseiten-bau/`
