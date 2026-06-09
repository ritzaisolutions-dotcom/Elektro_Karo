const pages = [
  '/',
  '/referenzen.html',
  '/team.html',
  '/impressum.html',
  '/datenschutz.html',
  '/404.html',
  '/leistungen/innenarbeiten.html',
  '/leistungen/fassade.html',
  '/leistungen/bodenbelaege.html',
  '/leistungen/schimmelbeseitigung.html',
  '/llms.txt',
  '/llms-full.txt',
  '/business-profile.json',
  '/aeo/faq.json',
  '/aeo/services.json',
  '/aeo/manifest.json',
  '/robots.txt'
];

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';

async function checkPage(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`);
  if (!response.ok && pathname !== '/404.html') {
    throw new Error(`${pathname} returned ${response.status}`);
  }
  return `${pathname} -> ${response.status}`;
}

function extractIds(html) {
  return [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
}

function extractAnchors(html) {
  return [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
}

async function checkIndexIntegrity() {
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
    'id="kostenrechner"',
    'id="calcForm"',
    'id="calcPdfBtn"',
    'id="calcCallbackForm"',
    'id="calc_callback_phone"',
    'id="heroVideo"',
    'id="termin-rueckruf"',
    'class="wa-fab"',
    'js/calc.js',
    'js/pdf.js'
  ];

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
  const results = [];
  for (const page of pages) {
    const result = await checkPage(page);
    results.push(result);
  }
  await checkIndexIntegrity();
  await checkAeoJson();
  console.log('Smoke test passed');
  results.forEach((line) => console.log(line));
  console.log('index.html integrity checks passed');
}

main().catch((error) => {
  console.error(`Smoke test failed: ${error.message}`);
  process.exit(1);
});
