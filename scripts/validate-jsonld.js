const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'website');

function extractLd(html) {
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/;
  const m = html.match(re);
  if (!m) throw new Error('No JSON-LD block found');
  return JSON.parse(m[1].trim());
}

JSON.parse(fs.readFileSync(path.join(root, 'business-profile.json'), 'utf8'));
console.log('business-profile.json OK');

extractLd(fs.readFileSync(path.join(root, 'index.html'), 'utf8'));
console.log('index.html JSON-LD OK');

['innenarbeiten', 'fassade', 'bodenbelaege', 'schimmelbeseitigung'].forEach((name) => {
  extractLd(fs.readFileSync(path.join(root, 'leistungen', `${name}.html`), 'utf8'));
  console.log(`${name}.html JSON-LD OK`);
});
