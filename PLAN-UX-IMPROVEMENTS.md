# Plan: Elektro Karo — UX/UI Improvements

## Context

The Elektro Karo demo site was built by Cursor and is functional but has several rough edges that hurt demo quality: the hero logo has a background halo, the phone number is shown twice in the hero, the Referenzprojekte section uses generic SVG placeholders instead of real photos, and the partner carousel section exists in the code but is completely hidden and empty. This plan fixes all four issues and adds a moving, hoverable partner logo carousel.

---

## Critical UX Assessment of Cursor's Work

**Legitimate issues:**
- **Hero logo**: `logo-client.png` has a visible background/halo on the dark hero overlay. The removebg version exists but was never applied.
- **Duplicate phone number**: The main CTA button already shows `01575 / 0020222`. The `.hero__notdienst` paragraph directly below repeats the same number (`24h-Notdienst · 01575 / 0020222`). This is lazy copy — it dilutes the visual hierarchy of the CTA.
- **Placeholder ref images**: `ref_1.svg – ref_10.svg` are silhouette/icon placeholders. In a sales demo this kills credibility.
- **Partner section dead**: `hidden` attribute left on the section, `partner: []` left empty in `config.js`. The full carousel machinery (CSS marquee, hover-pause, JS builder) was built but never wired up.

**What works well:**
- Architecture is clean: config-driven with `config.js` + `config-apply.js` pattern.
- CSS marquee with hover-pause is already implemented in `style.css`.
- JS `renderPartners()` in `config-apply.js:484–532` auto-builds the carousel from `CLIENT.partner[]` — zero new JS needed.
- Responsive grid for referenzen is solid.

---

## Tasks

### 1. Hero Logo → removebg version

**Why:** The existing `logo-client.png` has a white/colored background that halos against the dark hero video overlay. The removebg version (`images/logo_elektro_karo-removebg-preview.png` in the repo root `images/` folder) was prepared but never applied.

**Steps:**
- Copy `images/logo_elektro_karo-removebg-preview.png` → `website/images/logo-removebg.png`
- In `website/index.html` hero section (~line 483): change `hero__logo` `src` from `images/logo-client.png` → `images/logo-removebg.png`
- Also update the nav logo (`nav__logo`, ~line 402) for consistency since the nav also sits on a dark background.

---

### 2. Remove duplicate phone number from hero

**Why:** The phone number appears in: (a) the primary CTA button (`Anrufen: 01575 / 0020222`) and (b) `.hero__notdienst` (`24h-Notdienst · 01575 / 0020222`). The second instance reduces the impact of the first and adds visual noise.

**Steps:**
- In `website/index.html`, find the `.hero__notdienst` paragraph (~line 507):
  ```html
  <p class="hero__notdienst">24h-Notdienst · <span data-config="telefonDisplay">01575 / 0020222</span></p>
  ```
- Replace with a clean label (no phone number repetition):
  ```html
  <p class="hero__notdienst"><span class="hero__notdienst-badge">24h-Notdienst</span></p>
  ```
- In `website/css/style.css`, add/update `.hero__notdienst-badge` as a small trust-signal pill — keeps "24h-Notdienst" visible below the CTA as a quality signal without repeating the number.

---

### 3. Referenzprojekte — real Pexels photos + improved layout

**Why:** SVG silhouettes in the reference grid look like broken placeholders, not a credible portfolio.

#### 3a. Fetch photos from Pexels

Download 10 high-quality JPG photos into `website/images/` as `ref_1.jpg` – `ref_10.jpg`.

Search terms per slot:

| Slot | Current label | Pexels search |
|------|--------------|---------------|
| ref_1 | Elektroinstallation | `electrician installation` |
| ref_2 | Unterverteiler | `electrical panel fuse box` |
| ref_3 | Smart Home | `smart home lighting control` |
| ref_4 | Wallbox | `ev charging station` |
| ref_5 | Netzwerk | `network cable server rack` |
| ref_6 | Sicherheit | `security camera installation` |
| ref_7 | Gewerbe | `commercial electrical work` |
| ref_8 | Reparatur | `electrician repair tools` |
| ref_9 | KNX | `building automation system` |
| ref_10 | DGUV-Prüfung | `electrical testing measurement` |

**Implementation:** Use Pexels API (`https://api.pexels.com/v1/search`) or search page links. Download via PowerShell `Invoke-WebRequest` or fetch script.

#### 3b. Bento-style grid layout

Current grid: 4 equal columns of 350×350 squares. Upgrade to a magazine/bento grid:

```
┌──────────────┬──────┬──────┐
│              │  2   │  3   │
│      1       ├──────┴──────┤
│  (2×2 tall)  │      4      │
├──────┬───────┴──────┬──────┤
│  5   │      6       │  7   │
├──────┴──────┬───────┴──────┤
│      8      │  9   │  10  │
└─────────────┴──────┴──────┘
```

In `website/css/style.css`, update `.ref-grid` and `.ref-item` to use CSS Grid with `grid-column/row span`. First item spans 2 columns + 2 rows as feature image. Overlay design: dark gradient from bottom with gold category tag in bottom-left.

---

### 4. Partner Carousel — unhide and wire up

**Why:** The section is hidden and `CLIENT.partner` is empty. All carousel code is already built — just needs data.

#### 4a. Add partners to config.js

In `website/js/config.js`, populate `CLIENT.partner` with the 11 existing logos from `website/images/partner/`:

```js
partner: [
  { name: "Brillux",      logo: "partner/brillux.png",     url: "https://www.brillux.de" },
  { name: "MEG",          logo: "partner/meg.png",          url: "" },
  { name: "Dunkel",       logo: "partner/dunkel.png",       url: "" },
  { name: "ED Baucenter", logo: "partner/ed-baucenter.png", url: "" },
  { name: "Fetz",         logo: "partner/fetz.png",         url: "" },
  { name: "Kürsten",      logo: "partner/kuersten.png",     url: "" },
  { name: "Meerbothe",    logo: "partner/meerbothe.png",    url: "" },
  { name: "Müller",       logo: "partner/mueller.png",      url: "" },
  { name: "Südwest",      logo: "partner/suedwest.png",     url: "" },
  { name: "Zeuzheim",     logo: "partner/zeuzheim.png",     url: "" },
  { name: "Aknipp",       logo: "partner/aknipp.png",       url: "" },
],
```

> Note: These logos appear to be borrowed from the Malermeister Schmitt demo (paint suppliers). For a real electrician client, swap with partners like ABB, Hager, Busch-Jaeger, etc. For demo purposes the carousel mechanic is what matters.

Also fix `partnerIntro` (currently empty string) — update to Wiesbaden context:
```js
partnerIntro: "Gemeinsam mit regionalen Fachbetrieben und bewährten Systempartnern in Wiesbaden und der Region.",
```

#### 4b. Unhide the partner section

In `website/index.html` (~line 821): remove `hidden` attribute:
```html
<!-- Before -->
<section class="section section--partner" id="partner" hidden>
<!-- After -->
<section class="section section--partner" id="partner">
```

#### 4c. How the carousel works (no new JS needed)

The CSS in `style.css` already implements:
- Infinite marquee scroll (45s linear animation)
- `animation-play-state: paused` on hover/focus — stops on hover
- Gold border hover state on cards
- `renderPartners()` in `config-apply.js:484–532` duplicates the card set for seamless loop
- Cards with a `url` value are auto-wrapped in `<a>` tags — links work automatically

---

## Files to Change

| File | Change |
|------|--------|
| `website/images/logo-removebg.png` | New file — copy from `images/logo_elektro_karo-removebg-preview.png` |
| `website/images/ref_1.jpg – ref_10.jpg` | Replace with real Pexels electrician photos |
| `website/index.html` | Hero logo src (~line 483), nav logo src (~line 402), `.hero__notdienst` markup (~line 507), remove `hidden` on partner section (~line 821) |
| `website/css/style.css` | `.ref-grid` bento layout, `.hero__notdienst-badge` pill style |
| `website/js/config.js` | Populate `partner[]`, fix `partnerIntro` text |

---

## Verification

1. Open `website/index.html` via local server (`node server.js`)
2. Hero: logo appears without background halo
3. Hero: only one phone number visible (in the CTA button); "24h-Notdienst" badge below CTA is clean
4. Referenzen section: real photos in bento grid with gold category overlays
5. Partner section: logos scroll in marquee; animation pauses on hover; logos with URLs are clickable
6. Responsive: check 375px mobile — bento grid collapses to 2-col, marquee stays functional
