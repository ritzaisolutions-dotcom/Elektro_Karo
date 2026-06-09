const fs = require('node:fs');
const path = require('node:path');

const DATA_PATH = path.join(__dirname, '..', 'website', 'data', 'google-reviews.json');

function validatePayload(data) {
  const errors = [];
  if (!data || typeof data !== 'object') errors.push('Root must be object');
  if (!data.placeName) errors.push('placeName missing');
  if (typeof data.userRatingCount !== 'number') errors.push('userRatingCount must be number');
  if (!Array.isArray(data.reviews)) errors.push('reviews must be array');
  if (data.reviews && (data.reviews.length < 1 || data.reviews.length > 5)) {
    errors.push(`reviews count must be 1–5 (got ${data.reviews.length})`);
  }

  data.reviews?.forEach((r, i) => {
    if (!r.author) errors.push(`reviews[${i}].author missing`);
    if (!r.text) errors.push(`reviews[${i}].text missing`);
    if (!r.publishTime) errors.push(`reviews[${i}].publishTime missing`);
  });

  const times = (data.reviews || []).map((r) => new Date(r.publishTime).getTime());
  const sorted = [...times].sort((a, b) => b - a);
  if (times.some((t) => Number.isNaN(t))) errors.push('invalid publishTime');
  else if (JSON.stringify(times) !== JSON.stringify(sorted)) {
    errors.push('reviews not sorted newest-first');
  }

  return errors;
}

async function checkApi(baseUrl) {
  try {
    const res = await fetch(`${baseUrl}/api/reviews`);
    if (!res.ok) return { ok: false, status: res.status };
    const data = await res.json();
    return { ok: true, errors: validatePayload(data) };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function main() {
  const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  const data = JSON.parse(raw);
  const fileErrors = validatePayload(data);

  if (fileErrors.length) {
    console.error('google-reviews.json invalid:', fileErrors.join('; '));
    process.exit(1);
  }

  const api = await checkApi(baseUrl);
  if (api.ok && api.errors?.length) {
    console.error('/api/reviews invalid:', api.errors.join('; '));
    process.exit(1);
  }

  console.log(`verify-reviews OK (${data.reviews.length} reviews, ${data.userRatingCount} total)`);
  if (!api.ok) console.log(`Note: /api/reviews not reachable (${api.status || api.error}) — fallback file OK`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
