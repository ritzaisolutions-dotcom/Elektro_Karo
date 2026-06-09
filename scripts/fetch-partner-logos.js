/**
 * One-off: download partner favicons into website/images/partner/
 * Usage: node scripts/fetch-partner-logos.js
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUT = path.join(__dirname, '..', 'website', 'images', 'partner');

const partners = [
  { file: 'meerbothe.png', domain: 'schreinerei-meerbothe.de' },
  { file: 'mueller.png', domain: 'innenausbau-mueller.com' },
  { file: 'dunkel.png', domain: 'dunkel-elektroanlagen.de' },
  { file: 'zeuzheim.png', domain: 'dachdecker-zeuzheim.de' },
  { file: 'fetz.png', domain: 'bedachungen-fetz.de' },
  { file: 'aknipp.png', domain: 'aknipp.de' },
  { file: 'kuersten.png', domain: 'kuersten-shk.de' },
  { file: 'brillux.png', domain: 'brillux.de' },
  { file: 'suedwest.png', domain: 'suedwest.de' },
  { file: 'ed-baucenter.png', domain: 'ed-baucenter.de' },
  { file: 'meg.png', domain: 'meg.de' }
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`${url} -> ${res.statusCode}`));
        res.resume();
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const { file, domain } of partners) {
    const url = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    const dest = path.join(OUT, file);
    try {
      const buf = await fetchUrl(url);
      fs.writeFileSync(dest, buf);
      console.log('OK', file, buf.length, 'bytes');
    } catch (e) {
      console.error('FAIL', file, e.message);
    }
  }
}

main();
