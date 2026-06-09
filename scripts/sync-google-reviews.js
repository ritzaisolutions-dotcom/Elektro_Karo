/**
 * Fetches Google reviews via Places API and writes website/data/google-reviews.json
 * Usage: GOOGLE_MAPS_API_KEY=... GOOGLE_PLACE_ID=... node scripts/sync-google-reviews.js
 * Or:    npm run sync-reviews
 */
const fs = require('node:fs');
const path = require('node:path');
const { fetchPlaceReviews, resolvePlaceId } = require('../lib/places-reviews');

const OUT_PATH = path.join(__dirname, '..', 'website', 'data', 'google-reviews.json');
const DEFAULT_QUERY = 'Elektro Karo, Dotzheimer-Str. 160, 65197 Wiesbaden';

async function main() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  let placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey) {
    console.error('GOOGLE_MAPS_API_KEY fehlt. Siehe .env.example');
    process.exit(1);
  }

  if (!placeId) {
    console.log('GOOGLE_PLACE_ID fehlt — löse Place ID per Text Search…');
    placeId = await resolvePlaceId({ apiKey, query: process.env.PLACE_SEARCH_QUERY || DEFAULT_QUERY });
    console.log(`Place ID: ${placeId}`);
    console.log('Setze GOOGLE_PLACE_ID in Vercel für stabile Deployments.');
  }

  const payload = await fetchPlaceReviews({ apiKey, placeId });
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`Geschrieben: ${OUT_PATH} (${payload.reviews.length} Reviews, ${payload.userRatingCount} gesamt)`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
