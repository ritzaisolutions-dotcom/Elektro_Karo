const fs = require('node:fs');
const path = require('node:path');

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';

function readKostenrechnerActive() {
  const source = fs.readFileSync(path.join(__dirname, '..', 'website', 'js', 'config.js'), 'utf8');
  const match = source.match(/kostenrechnerAktiv:\s*(true|false)/);
  return match ? match[1] === 'true' : false;
}

async function main() {
  const kostenrechnerActive = readKostenrechnerActive();  const html = await (await fetch(`${baseUrl}/`)).text();
  const ds = await (await fetch(`${baseUrl}/datenschutz.html`)).text();
  const reviewsRes = await fetch(`${baseUrl}/api/reviews`);
  const reviewsData = reviewsRes.ok ? await reviewsRes.json() : null;

  const checks = {
    logoRemovebg: html.includes('logo-removebg.png'),
    angebotVisible: /id="angebot"/.test(html) && !/id="angebot"[^>]*hidden/.test(html),
    kostenrechnerHidden: kostenrechnerActive ? !/id="kostenrechner"[^>]*hidden/.test(html) : /id="kostenrechner"[^>]*hidden/.test(html),
    partnerHidden: /id="partner"[^>]*hidden/.test(html),
    heroTelCta: html.includes('hero__cta-phone') && html.includes('data-config-href="tel"'),
    heroCredentialsInCenter: /class="hero__center"[\s\S]*class="hero__credentials"/.test(html),
    terminFormPremium: html.includes('termin-form-box--premium') && html.includes('termin-form__submit'),
    reviewsSummaryCta: html.includes('class="google-reviews-summary"') && html.includes('data-config-href="googleBewertung"'),
    noStaticCalc: !html.includes('<script src="js/calc.js"'),
    noSlider: !html.includes('slider.js'),
    noMaler: !html.includes('Malergesch'),
    datenschutzMailto: ds.includes('mailto') && ds.includes('derzeit deaktiviert'),
    datenschutzNoBlankWeb3: !ds.includes('werden an <strong>Web3Forms</strong> als technischen Dienstleister übermittelt.</li>'),
    reviewsWidget: html.includes('id="googleReviewsWidget"') && html.includes('js/reviews.js'),
    reviewsApi: Boolean(reviewsData?.reviews?.length),
    datenschutzReviews: ds.includes('Google-Bewertungen') && ds.includes('Places API'),
  };

  const failed = Object.entries(checks).filter(([, ok]) => !ok).map(([name]) => name);
  console.log(JSON.stringify({ passed: Object.keys(checks).length - failed.length, total: Object.keys(checks).length, failed, checks }, null, 2));
  if (failed.length) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
