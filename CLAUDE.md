# CLAUDE.md — Malermeister Schmitt
> Kontext- und Branddokument für KI-gestützte Weiterentwicklung

---

## 1. Projekt-Übersicht

| Feld | Wert |
|------|------|
| Kunde | Malergeschäft Hans Schmitt e.K. |
| Typ | Statische HTML/CSS/JS Website (kein Framework) |
| Zweck | Demo-Seite für RAIS-Verkaufsgespräch → später Produktionssite |
| Zielgruppe | Privatkunden & Gewerbetreibende in Koblenz / Rhein-Mosel-Region |
| Erstellt von | RAIS (Ritz AI Solutions), Kevin Ritz |

---

## 2. NAP — Name / Address / Phone
> Muss auf JEDER Seite und im Schema.org JSON-LD exakt so stehen.

```
Name:     Malergeschäft Hans Schmitt e.K.
Adresse:  Emser Straße 80, 56076 Koblenz
Telefon:  0261 / 28744414          ← Display-Format
Telefon:  +49-261-28744414         ← Schema.org-Format
Fax:      0261 / 28737369
E-Mail:   info@malergeschaeft-schmitt.de
```

**Google Maps Place ID:** `ChIJvc2xt_98e0cR6___ZbzSY7E=`
**Google Maps Koordinaten:** `50.3480602, 7.6047456`
**Google Maps URL:** `https://maps.app.goo.gl/QEFtoo4XoMRHQzND8`

---

## 3. Öffnungszeiten

| Tag | Morgens | Nachmittags |
|-----|---------|-------------|
| Mo–Do | 07:30–12:00 | 12:45–16:00 |
| Freitag | 07:30–12:00 | 12:45–14:45 |
| Sa–So | Geschlossen | — |

---

## 4. Leistungen

### Innenarbeiten
- Streichen, Tapezieren, Lasieren, Lackieren
- Verputzen, Gestalten (Dekor/Spachteltechniken)
- Trockenbau

### Außenarbeiten
- Fassadenarbeiten & Fassadengestaltung
- Wärmedämmung (WDVS / Vollwärmeschutz)
- Sanierung von Wasserschäden

### Bodenbeläge
- Laminat verlegen
- Teppich legen
- PVC / Linoleum legen

### Sonstiges
- Schimmelbeseitigung
- Werterhalt & Substanzschutz

---

## 5. Einzugsgebiet

Koblenz (Hauptstandort) + Umgebung:
Neuwied · Andernach · Lahnstein · Bendorf · Mayen · Vallendar · Boppard

---

## 6. Brand Identity

### 6.1 Positionierung
**Luxuriöser Meisterbetrieb** — kein Discounter, kein Massenanbieter.
Handwerk mit Haltung. Präzision. Jahrzehntelange Erfahrung.
Das Äquivalent eines Maßschneiders in der Malerbranche.

### 6.2 Tonalität
- Selbstbewusst, nicht aufdringlich
- Warm, aber professionell
- Keine Floskeln ("günstig", "schnell", "zuverlässig" als Alleinstellungsmerkmal reicht nicht)
- Deutsch · formell (Sie-Form)

### 6.3 Farbpalette

```
PRIMARY DARK   #0f0e0c   → Fast-Schwarz mit warmem Unterton (Haupthintergrund)
SECONDARY DARK #1c1a14   → Karten, Sektionen
SURFACE        #242018   → Erhöhte Flächen
GOLD PRIMARY   #c9a84c   → Hauptakzent — Überschriften, Borders, CTAs
GOLD LIGHT     #e8c97a   → Hover-States, Highlights
GOLD MUTED     #8a7035   → Dezente Goldtöne, Tags
CREAM          #f5efe0   → Heller Text auf dunklem BG
CREAM MUTED    #b5a98a   → Sekundärtext
WHITE          #ffffff   → Nur für maximalen Kontrast
WARM GREY      #4a4640   → Trennlinien, Borders
```

### 6.4 Typografie

```
Display / Headlines:  "Cormorant Garamond" — Serif, elegant, zeitlos
                      weights: 300 (Light), 600 (SemiBold), 700 (Bold)
                      Quelle: Google Fonts

Body / UI Text:       "Jost" — Geometric Sans, modern aber warm
                      weights: 300, 400, 500, 600
                      Quelle: Google Fonts

Schriftgrößen (Mobile-first):
  Hero H1:    clamp(52px, 8vw, 96px)
  H2:         clamp(32px, 4vw, 52px)
  H3:         clamp(20px, 2.5vw, 28px)
  Body:       16–18px
  Small:      12–14px
  Label:      11px, letter-spacing: 2px, UPPERCASE
```

### 6.5 Design-Prinzipien

1. **Dunkel dominiert** — 90% dunkler Hintergrund, Gold als Akzent, nicht umgekehrt
2. **Viel Luft** — Großzügige Paddings. Luxus braucht Raum.
3. **Gold sparsam** — Nie füllen, nur für Headlines, Borders, Icons, Hover
4. **Video als Atmosphäre** — Hero-Video muted, autoplay, loop. Kein Inhalt, nur Stimmung.
5. **Ein CTA im Hero** — Keine Ablenkung. Besucher soll EINE Aktion machen.
6. **Kein Kitsch** — Keine Sterne-Regenbogen, keine Comic-Icons. Alles zurückhaltend.

### 6.6 Logo-Konzept (bis echtes Logo geliefert)
```
Schriftzug: "SCHMITT" in Cormorant Garamond, Letter-Spacing: 8px
Darunter:   "MALEREI · KOBLENZ" in Jost 300, Letter-Spacing: 4px
Farbe:      Gold #c9a84c auf Dunkel
```

---

## 7. Datei-Struktur

```
malermeister_schmitt/
├── index.html          ← Hauptseite (Hero + alle Sektionen)
├── CLAUDE.md           ← Dieses Dokument
├── images/
│   ├── hero-video.mp4  ← Muss vom Kunden geliefert werden
│   ├── hero-poster.jpg ← Standbild für Video-Fallback
│   ├── og-image.jpg    ← Open Graph / Social Share (1200×630px)
│   └── [weitere Fotos vom Kunden]
└── public/
    ├── robots.txt
    └── sitemap.xml
```

### Bild-Anforderungen (für Kundengespräch)
| Datei | Format | Mindestgröße | Zweck |
|-------|--------|-------------|-------|
| `hero-video.mp4` | MP4 H.264 | min. 1080p | Hero-Hintergrund |
| `hero-poster.jpg` | JPG/WebP | 1920×1080px | Video-Fallback |
| `projekt-1.jpg` bis `projekt-6.jpg` | WebP | 800×600px | Referenzen-Grid |
| `logo.svg` | SVG | — | Echtes Logo |
| `og-image.jpg` | JPG | 1200×630px | Social Sharing |

---

## 8. SEO-Keywords

| Typ | Keywords |
|-----|----------|
| Primär | "Maler Koblenz", "Malerbetrieb Koblenz", "Malermeister Koblenz" |
| Long-tail | "Fassade streichen Koblenz", "Tapezieren Koblenz", "Maler Koblenz Preise" |
| Lokal-Erweiterung | "Maler Neuwied", "Maler Andernach", "Maler Lahnstein" |

---

## 9. Schema.org

```json
{
  "@type": "HomeAndConstructionBusiness",
  "name": "Malergeschäft Hans Schmitt e.K.",
  "@id": "https://malergeschaeft-schmitt.de",
  "telephone": "+49-261-28744414",
  "geo": { "latitude": 50.3480602, "longitude": 7.6047456 },
  "hasMap": "https://maps.app.goo.gl/QEFtoo4XoMRHQzND8"
}
```

---

## 10. RAIS Hinweise (intern)

- **CMP Pflicht:** Vor Go-Live Cookiebot via `<script>` Tag in `<head>` einbinden
  Attribut `data-blockingmode="auto"` ist kritisch — NICHT vergessen
- **GDPR:** Kein Claude Pro für Kundendaten. Nur Anthropic API (AVV vorhanden)
- **Hosting:** TBD — Vercel oder Netlify empfohlen (kostenlos, schnell, HTTPS auto)
- **Domain:** malergeschaeft-schmitt.de (aktuell Strato) → DNS-Weiterleitung besprechen
- **Echte Reviews:** Vor Go-Live echte Google Reviews rauskopieren und ersetzen
- **Fotos:** Kunde muss eigene Fotos liefern — Demo nutzt Placeholder-Overlays
