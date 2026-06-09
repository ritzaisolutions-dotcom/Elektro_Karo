const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'website', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

const markerNames = [
  'LEISTUNGEN',
  'KOSTENRECHNER',
  'WARUM WIR',
  'FAMILIE / ÜBER UNS',
  'REFERENZEN',
  'PARTNER',
  'BEWERTUNGEN',
  'TERMIN / RÜCKRUF',
  'KONTAKT',
  'FOOTER',
];

function sliceSection(name, nextNames) {
  const startToken = `<!-- ║  ${name}`;
  const start = html.indexOf(startToken);
  if (start === -1) throw new Error(`Missing section: ${name}`);
  let end = html.length;
  for (const next of nextNames) {
    const i = html.indexOf(`<!-- ║  ${next}`, start + 1);
    if (i !== -1) {
      end = i;
      break;
    }
  }
  return html.slice(start, end);
}

const sections = {};
markerNames.forEach((name, idx) => {
  const key = name.split(' ')[0];
  sections[key] = sliceSection(name, markerNames.slice(idx + 1));
});

const before = html.indexOf('<!-- ║  LEISTUNGEN');
if (before === -1) throw new Error('Missing LEISTUNGEN');
const head = html.slice(0, before);
const footerIdx = html.indexOf('<!-- ║  FOOTER');
const afterFooter = html.slice(footerIdx);

const angebot = `<!-- ║  ANGEBOT CTA                  ║ -->
  <!-- ╚════════════════════════════════╝ -->
  <section class="section section--alt" id="angebot" hidden>
    <div class="container">
      <header class="section-header section-header--center reveal">
        <span class="section-label">Angebot</span>
        <h2 class="section-h2">Unverbindliches Angebot — kostenlose Besichtigung.</h2>
        <p class="section-sub">Jedes Elektroprojekt ist anders. Wir klären den Umfang vor Ort oder am Telefon und erstellen ein faires Angebot ohne versteckte Kosten.</p>
      </header>
      <div class="angebot-cta reveal">
        <div class="angebot-cta__actions">
          <a href="tel:#" class="btn btn--primary btn--lg" data-config-href="tel">Jetzt anrufen</a>
          <a href="#" class="btn btn--wa btn--lg" data-config-href="whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="#termin" class="btn btn--secondary btn--lg">Rückruf anfordern</a>
        </div>
      </div>
    </div>
  </section>


`;

const phoneBar = `<div class="phone-bar" aria-label="Schnellkontakt">
    <a href="tel:#" class="phone-bar__btn phone-bar__btn--call" data-config-href="tel">Anrufen</a>
    <a href="#" class="phone-bar__btn phone-bar__btn--wa" data-config-href="whatsapp" target="_blank" rel="noopener noreferrer">WhatsApp</a>
  </div>

  `;

const body = [
  sections.LEISTUNGEN,
  sections.BEWERTUNGEN,
  sections.FAMILIE,
  sections.REFERENZEN,
  sections.PARTNER,
  sections.WARUM,
  sections.TERMIN,
  sections.KONTAKT,
  angebot,
  sections.KOSTENRECHNER,
].join('\n\n  ');

let tail = afterFooter;
const waFab = '<!-- ║  WHATSAPP FAB';
const waIdx = tail.indexOf(waFab);
if (waIdx !== -1) {
  tail = tail.slice(0, waIdx) + phoneBar + tail.slice(waIdx);
}

const newHtml = head + body + tail;
fs.writeFileSync(filePath, newHtml);
console.log('Reordered index.html sections');
