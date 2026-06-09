const fs = require('node:fs');
const path = require('node:path');

const pages = [
  '/',
  '/referenzen.html',
  '/team.html',
  '/impressum.html',
  '/datenschutz.html',
  '/404.html',
  '/leistungen/elektroinstallation.html',
  '/leistungen/smart-home-knx.html',
  '/leistungen/wallbox.html',
  '/leistungen/sicherheit-netzwerk.html',
  '/llms.txt',
  '/llms-full.txt',
  '/business-profile.json',
  '/aeo/faq.json',
  '/aeo/services.json',
  '/aeo/manifest.json',
  '/robots.txt',
  '/api/reviews',
  '/data/google-reviews.json'
];

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';

function readKostenrechnerActive() {
  const configPath = path.join(__dirname, '..', 'website', 'js', 'config.js');
  const source = fs.readFileSync(configPath, 'utf8');
  const match = source.match(/kostenrechnerAktiv:\s*(true|false)/);
  return match ? match[1] === 'true' : false;
}

async function checkPage(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  if (!response.ok && pathname !== '/404.html') {
    throw new Error(`${pathname} returned ${response.status}`);
  }
  if (pathname === '/api/reviews') {
    const data = await response.json();
    if (!Array.isArray(data.reviews) || !data.reviews.length) {
      throw new Error('/api/reviews returned empty reviews');
    }
  }
  return `${pathname} -> ${response.status}`;
}

function extractIds(html) {
  return [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
}

function extractAnchors(html) {
  return [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
}

async function checkIndexIntegrity(kostenrechnerActive) {
  const response = await fetch(`${baseUrl}/`);
  const html = await response.text();
  const ids = new Set(extractIds(html));
  const anchors = extractAnchors(html);

  for (const anchor of anchors) {
    if (!ids.has(anchor)) {
      throw new Error(`Missing anchor target id="${anchor}" in index.html`);
    }
  }

  const requiredStrings = [
    'id="faq"',
    'id="schema-graph"',
    'id="angebot"',
    'id="ueber-uns"',
    'id="heroVideo"',
    'id="termin-rueckruf"',
    'class="wa-fab"',
    'js/main.js',
    'js/reviews.js',
    'id="reviewsSummary"',
    'id="reviewsTrack"',
    'data-reviews-track',
    'images/logo-removebg.png'
  ];

  if (kostenrechnerActive) {
    requiredStrings.push(
      'id="calcForm"',
      'id="calcPdfBtn"',
      'id="calcCallbackForm"',
      'id="calc_callback_phone"',
      'id="kostenrechner"',
      'js/calc.js',
      'js/pdf.js'
    );
  } else {
    requiredStrings.push('id="kostenrechner" hidden');
    if (html.includes('<script src="js/calc.js"') || html.includes('<script src="js/pdf.js"')) {
      throw new Error('calc.js/pdf.js should not be statically loaded when kostenrechner is disabled');
    }
  }

  requiredStrings.forEach((token) => {
    if (!html.includes(token)) {
      throw new Error(`Missing required token in index.html: ${token}`);
    }
  });

  const aeoTokens = [
    'rel="alternate"',
    'llms.txt',
    'business-profile.json',
    'aeo/faq.json'
  ];
  aeoTokens.forEach((token) => {
    if (!html.includes(token)) {
      throw new Error(`Missing AEO discovery token in index.html: ${token}`);
    }
  });

  if (html.includes('Malergeschäft Hans Schmitt') || html.includes('Koblenz und der Region')) {
    throw new Error('Maler template leftovers still present in index.html');
  }
}

async function checkAeoJson() {
  const paths = ['/business-profile.json', '/aeo/faq.json', '/aeo/services.json', '/aeo/manifest.json'];
  for (const path of paths) {
    const response = await fetch(`${baseUrl}${path}`);
    const text = await response.text();
    JSON.parse(text);
  }
}

async function main() {
  const kostenrechnerActive = readKostenrechnerActive();
  const results = [];
  for (const page of pages) {
    const result = await checkPage(page);
    results.push(result);
  }
  await checkIndexIntegrity(kostenrechnerActive);
  await checkAeoJson();
  console.log('Smoke test passed');
  results.forEach((line) => console.log(line));
  console.log(`index.html integrity checks passed (kostenrechnerAktiv=${kostenrechnerActive})`);
}

main().catch((error) => {
  console.error(`Smoke test failed: ${error.message}`);
  process.exit(1);
});
