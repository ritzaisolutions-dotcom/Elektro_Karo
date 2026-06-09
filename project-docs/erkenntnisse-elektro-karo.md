# Erkenntnisse — Elektro Karo Demo

> **Stand:** 2026-06-09  
> **Basis:** Malermeister-Schmitt-Template → Elektro Karo Demo  
> **Quelle:** [elektro-karo.de](https://elektro-karo.de/)

---

## Asset-Pipeline

- Kunden-Assets lagen in Repo-Root `images/` (nicht in `website/images/`).
- Mapping auf Template-Namen: `logo_elektro_karo.png` → `logo-client.png`, `vid1_hero.mp4` → `hero-video.mp4`.
- Referenzen: `ref_1.jpg` + `ref_5`–`ref_11` → `ref_1`–`ref_10`; Maler-Dateien (`ref_*_painter.jpg`) ausgelassen.
- `ref_1.jpg` doppelt als `team-bild.jpg` (kein separates Teamfoto geliefert).
- Favicon/OG aus Logo kopiert — vor Go-Live eigenes OG-Bild empfohlen.
- WebP via `scripts/convert-images-webp.ps1` (ffmpeg erforderlich).

## Struktur-Entscheidungen

- **Vorher/Nachher-Sektion entfernt** — für Elektro ohne passendes Bildpaar nicht sinnvoll.
- **Partner-Sektion ausgeblendet** (`partner: []` in config, `#partner hidden`).
- **Kein Cal.com / Terminbuchung** — `terminVariante: "rueckruf"` mit Telefon + WhatsApp + Web3Forms-Rückruf.
- Leistungs-URLs unverändert (`innenarbeiten.html` etc.), nur Inhalt auf Elektro umgeschrieben (konservativ).

## Hero & Conversion

- Primär-CTA: **rechteckiger Telefon-Button** (volle Breite mobile).
- **WA-FAB** rechts unten global (`.wa-fab`).
- Rückruf-Formular nur in `#termin`-Sektion (inhaltlich CTA), nicht im Hero.
- 24h-Notdienst prominent in Hero (`hero__notdienst` + Credentials).

## Kostenrechner

- Bestehende `calc.js`-Logik (€/m²) beibehalten — nur Config + HTML-Labels.
- Elektro-Richtwerte deutlich höher als Maler (ca. 95–125 €/m² vs. 18–28 €/m²).
- Projektarten: Elektroinstallation, Renovierung, Smart Home/KNX, Sicherheit/Netzwerk.

## Bewertungen

- Echte Google-Zitate von elektro-karo.de übernommen (6 Karten im Carousel).
- `googleBewertungsLink` als Google-Suche — vor Live echte Place-URL eintragen.

## Offen vor Go-Live

- [ ] Web3Forms-Key in `config.js` (`web3formsKey`)
- [ ] Google Maps Embed-URL (`googleMapsEmbedUrl`)
- [ ] Exakte Google-Bewertungs-URL / Place-ID
- [ ] Impressum: USt-ID falls vorhanden, vollständige DEVK-Policen-Angaben prüfen
- [ ] Rechtliche Freigabe Impressum + Datenschutz
- [ ] Altes Maler-Bildmaterial in `website/images/` (`vorher_slide`, `werkstatt`) optional entfernen

## Git / Deploy

- Remote zeigt noch auf `malermeister_schmitt` — neues Repo anlegen und Remote wechseln vor Kunden-Push.

## Answer Engine Optimization (AEO)

Ziel: bessere Auffindbarkeit in LLM-/Answer-Engines (ChatGPT, Claude, Perplexity, Gemini), nicht nur klassisches Google-SEO.

| Datei | Zweck |
|-------|--------|
| `/llms.txt` | Kuratiertes Site-Index nach [llmstxt.org](https://llmstxt.org/) — H1, Blockquote, Link-Sektionen |
| `/llms-full.txt` | Ausführlicher Kontext: NAP, Leistungen, FAQ, Kontaktwege, Zitierhinweise |
| `/business-profile.json` | Strukturierte Firmendaten + `aeo`-Block mit Discovery-URLs |
| `/aeo/faq.json` | FAQPage-JSON für Q&A-Extraktion |
| `/aeo/services.json` | Leistungskatalog mit Keywords und Ziel-URLs |
| `/aeo/manifest.json` | Discovery-Manifest für alle AEO-Dateien |

**Discovery:**
- `robots.txt` — Kommentare mit allen AEO-URLs; explizite `Allow`-Regeln für GPTBot, ClaudeBot, PerplexityBot, Google-Extended u. a.
- `<link rel="alternate">` in `index.html` + dynamisch via `config-apply.js` auf allen Seiten

**Smoke-Test:** `llms.txt`, `llms-full.txt`, `aeo/*.json`, JSON-Parse-Check.

**Nicht umgesetzt (bewusst):**
- Kein `ai.txt`-Standard (kein etabliertes IETF/W3C-Format) — stattdessen `aeo/manifest.json`
- AEO-Dateien nicht in `sitemap.xml` (robots-Kommentare + llms.txt-Links reichen)
- Keine `.md`-Mirrors pro HTML-Seite (Overhead; `llms-full.txt` deckt Kontext ab)

**Pflege:** Bei Inhaltsänderungen `llms.txt`, `llms-full.txt`, `business-profile.json` und `aeo/*.json` synchron halten (idealerweise später Generator-Script aus `config.js`).
