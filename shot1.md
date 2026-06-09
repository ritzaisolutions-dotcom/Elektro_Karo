# Plan: Malergeschäft Hans Schmitt — first setup round

## Context

The repo is a static Handwerker template cloned from a Fliesenleger demo. It already has useful structure, but many visible and generated surfaces still carry generic or tile-specific content: `config.js`, `index.html`, the service pages, `referenzen.html`, `slider.js`, `sitemap.xml`, legal pages, calculator labels, image alts, and template metadata.

Goal for round one: make the site demo-ready for **Malergeschäft Hans Schmitt e.K.** without introducing legal/privacy regressions or half-renamed behavior.

Do not add external Google Fonts in this round. The CSS currently documents a self-hosted-font posture, so Jost should either use local/self-hosted files or fall back cleanly until the files are available.

---

## Step 1 — Normalize client data in `config.js`

**File:** `website/js/config.js`

Fill known Schmitt data from `CLAUDE.md`:

- `name`: `Malergeschäft Hans Schmitt e.K.`
- `nameKurz`: `Schmitt`
- `unternehmenstyp`: `e.K.`
- `handwerksbezeichnung`: `Maler`
- `berufsbezeichnung`: `Malermeister`
- `strasse`: `Emser Straße 80`
- `plz`: `56076`
- `ort`: `Koblenz`
- `telefon`: `+49-261-28744414`
- `telefonDisplay`: `0261 / 28744414`
- `fax`: `+49-261-28737369`
- `faxDisplay`: `0261 / 28737369`
- `email`: `info@malergeschaeft-schmitt.de`
- `geoLat`: `50.3480602`
- `geoLng`: `7.6047456`
- `googleBewertungsLink`: `https://maps.app.goo.gl/QEFtoo4XoMRHQzND8`
- `kammer`: `Handwerkskammer Koblenz, Koblenz`
- `fachverband`: `Maler- und Lackierer-Innung Koblenz`
- `bundesland`: `Rheinland-Pfalz`
- `aufsichtsbehoerde`: `Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Rheinland-Pfalz`
- `klaroStorageName`: `schmitt-consent-v1`

Use conservative demo values for fields not verified by the client. Mark them in copy as neutral, not as fake certainty:

- Avoid unverified claims like `seit 1986`, `38 Bewertungen`, `4.9`, `6 Mitarbeiter`, unless Kevin confirms them.
- Prefer `Meisterbetrieb in Koblenz` over made-up founding-year claims.
- Set `terminVariante` to `formular` because Cal.com is not configured.
- Keep `whatsapp` empty unless a WhatsApp number is supplied.
- Keep `web3formsKey` as placeholder if no real key exists.

Pick one canonical domain before implementation. Recommended for the demo based on `CLAUDE.md`: `https://malergeschaeft-schmitt.de`. If the production host will require `www`, update `config.js`, sitemap, canonical, Open Graph, and schema consistently.

---

## Step 2 — Fix opening-hours model before filling hours

**Files:** `website/js/config.js`, `website/js/config-apply.js`, `website/index.html`

The current config only supports one Mo-Do interval and one Friday interval. That cannot represent Schmitt’s real split hours.

Update the model to support split intervals, then use it for visible text and JSON-LD:

```js
oeffnungszeiten: {
  moDo: [
    { von: "07:30", bis: "12:00" },
    { von: "12:45", bis: "16:00" }
  ],
  fr: [
    { von: "07:30", bis: "12:00" },
    { von: "12:45", bis: "14:45" }
  ]
}
```

`config-apply.js` must render:

- Contact block: `07:30-12:00 Uhr, 12:45-16:00 Uhr`
- Short text: `Mo-Do 07:30-12:00, 12:45-16:00 Uhr · Fr 07:30-12:00, 12:45-14:45 Uhr`
- JSON-LD: four `OpeningHoursSpecification` entries, two for Mo-Do and two for Friday

Do not only edit the inline JSON-LD in `index.html`; `config-apply.js` rewrites it at runtime.

---

## Step 3 — Apply the dark-gold brand safely

**Files:** `website/css/variables.css`, `website/css/style.css`, `website/js/config.js`

Set the base palette to Schmitt’s dark luxury direction:

- `--primary`: `#c9a84c`
- `--primary-dark`: `#0f0e0c`
- `--primary-mid`: `#1c1a14`
- `--primary-light`: `#242018`
- `--accent`: `#c9a84c`
- `--accent-hover`: `#e8c97a`
- `--accent-light`: `#8a7035`
- `--bg`: `#0f0e0c`
- `--bg-alt`: `#1c1a14`
- `--text`: `#f5efe0`
- `--text-light`: `#b5a98a`
- `--text-muted`: `#4a4640`
- `--border`: `#4a4640`

Then audit components that hardcode `#fff`, blue shadows, or light backgrounds. The likely hotspots are buttons, `.section--dark`, form boxes, reference overlays, calculator cards, and the contact section.

Typography:

- Change body font variable from DM Sans to Jost.
- Do not add `fonts.googleapis.com` links.
- If local Jost files are not present, use `src: local('Jost')` and keep a sane fallback.

---

## Step 4 — Reconfigure the calculator without breaking IDs

**Files:** `website/js/config.js`, `website/js/config-apply.js`, `website/js/calc.js`, `website/index.html`, `website/templates/pdf-kalkulation.html`, `website/js/pdf.js`

Keep the existing project IDs unless all matching DOM and JS selectors are changed together. The current IDs are part of the template wiring:

- `bath`
- `floor`
- `terrace`
- `repair`

Use those IDs with new labels:

```js
calcProjekte: [
  { id: "bath",    label: "Innenarbeiten",       multi: 1.0  },
  { id: "floor",   label: "Bodenbeläge",         multi: 0.9  },
  { id: "terrace", label: "Fassade",             multi: 1.3  },
  { id: "repair",  label: "Schimmel & Sanierung", multi: 1.15 }
]
```

Update prices and labels for a painter demo:

- `standard`: `18`, Standard-Wandanstrich
- `premium`: `28`, Premiumfarbe, Lasur oder Gestaltung
- `xl`: `22`, Tapezieren
- `altbelagEntfernen`: `8`, alte Tapete entfernen
- `abdichtung`: `15`, Grundierung und Spachtelaufwand
- `fussbodenheizung`: `12`, Deckenarbeiten or Zusatzaufwand

Review the visible calculator text in `index.html` and generated PDF text so it no longer talks about tile materials, bathrooms, floor heating, or waterproofing unless the label has been intentionally repurposed.

---

## Step 5 — Remove Fliesenleger content everywhere

**Files to search:** `website/**/*.html`, `website/js/*.js`, `website/sitemap.xml`, `website/docs/README.md`

Search terms:

- `Fliesen`
- `Fliesenleger`
- `Badsanierung`
- `Badezimmer`
- `Dusche`
- `Terrassen`
- `Großformat`
- `Naturstein`
- `Fugen`
- `example-handwerker`
- old service URLs

Known areas to update:

- `website/index.html`: hero/supporting copy, services subtitle, before/after slider labels, reference overlays, image alt text, footer service links, contact dropdown options
- `website/js/slider.js`: image-set label currently says `Badsanierung`
- `website/referenzen.html`: filters, image alts, card labels, intro copy
- `website/sitemap.xml`: domain and renamed service URLs
- `website/templates/pdf-kalkulation.html` and `website/js/pdf.js`: PDF wording and field labels
- `website/docs/README.md`: only update if it remains useful as project docs; otherwise leave as internal template notes

---

## Step 6 — Repurpose service pages

**Files:** `website/leistungen/*.html`, plus every link pointing to them

Rename and rewrite the four service pages:

- `badsanierung.html` -> `innenarbeiten.html`
- `fliesenverlegung.html` -> `fassade.html`
- `terrassen.html` -> `bodenbelaege.html`
- `reparatur.html` -> `schimmelbeseitigung.html`

Each page needs:

- German title and H1 matching the new service
- One strong paragraph in Schmitt’s tone
- Three to five concrete service bullets
- CTA back to `../index.html#termin`
- Updated links from `index.html`, footer, sitemap, and any other page

Keep the content factual. Avoid claiming certifications, years, review counts, or team size that are not confirmed.

---

## Step 7 — Legal and consent pass

**Files:** `website/datenschutz.html`, `website/impressum.html`, `website/index.html`, `website/js/config.js`, `website/js/config-apply.js`

Round one should reflect the actual demo behavior:

- If `terminVariante` is `formular`, hide Cal.com UI and make sure Cal.com privacy text is hidden by `config-apply.js`.
- Keep Google Maps behind consent if an iframe URL is used.
- If no Google Maps embed URL is available, use a normal outbound Maps link instead of a broken embed.
- Do not add Google Fonts from Google servers.
- Keep Klaro consistent for the demo, but note the `CLAUDE.md` go-live requirement: Cookiebot with `data-blockingmode="auto"` before production.
- Confirm `impressum.html` has the exact NAP values from `CLAUDE.md` through config.

This is not a full legal review. It is a technical consistency pass so the demo does not claim services it does not load or load services it does not disclose.

---

## Step 8 — Placeholder assets with restraint

**Folder:** `website/images/`

Create only assets needed to prevent broken UI:

- `logo-client.png` and `logo-client.webp`: text mark `SCHMITT / MALEREI · KOBLENZ`
- `favicon-client.png`: simple `HS` monogram
- `hero-poster.jpg` and `hero-poster.webp`: dark, premium fallback
- `og-image.jpg`: dark branded social preview
- `vorher_slide.png`, `nachher_slide.png`, and WebP variants: painter-themed placeholders
- `ref_1.jpg` through the number used by the template, plus WebP variants

Avoid cheap colored blocks. If no real photos exist, use understated branded placeholders with clear labels such as `Referenzbild folgt`.

---

## Step 9 — Final verification

Run the local site and check:

1. No visible `[FIRMENNAME]`, `[PLACEHOLDER]`, or old template placeholders.
2. No visible Fliesenleger, tile, bathroom, shower, terrace, or grout copy unless intentionally left in internal docs.
3. Dark-gold theme works across hero, sections, calculator, forms, footer, and subpages.
4. Split opening hours render correctly in contact areas and JSON-LD.
5. Calculator labels and PDF output are painter-specific.
6. Before/after slider loads without 404s and uses painter labels.
7. All renamed service links resolve.
8. Sitemap uses the chosen canonical domain and new URLs.
9. Mobile menu, contact form variant, and consent-controlled areas still work.
10. Browser console has no obvious runtime errors.

---

## Expected file changes

- `website/js/config.js`
- `website/js/config-apply.js`
- `website/js/calc.js`
- `website/js/slider.js`
- `website/js/pdf.js`
- `website/css/variables.css`
- `website/css/style.css`
- `website/index.html`
- `website/templates/pdf-kalkulation.html`
- `website/leistungen/innenarbeiten.html`
- `website/leistungen/fassade.html`
- `website/leistungen/bodenbelaege.html`
- `website/leistungen/schimmelbeseitigung.html`
- `website/referenzen.html`
- `website/datenschutz.html`
- `website/impressum.html` if config coverage is not enough
- `website/sitemap.xml`
- `website/images/*` placeholder assets

Delete or stop linking the old service pages after confirming every reference has moved.
