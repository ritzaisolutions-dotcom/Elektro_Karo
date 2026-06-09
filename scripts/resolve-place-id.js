/**
 * One-time helper: resolve Google Place ID for Elektro Karo
 * Usage: GOOGLE_MAPS_API_KEY=... node scripts/resolve-place-id.js
 */
const { resolvePlaceId } = require('../lib/places-reviews');

const query = process.env.PLACE_SEARCH_QUERY || 'Elektro Karo, Dotzheimer-Str. 160, 65197 Wiesbaden';

async function main() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    console.error('GOOGLE_MAPS_API_KEY fehlt');
    process.exit(1);
  }
  const placeId = await resolvePlaceId({ apiKey, query });
  console.log(`Place ID für "${query}":\n${placeId}`);
  console.log('\nIn Vercel eintragen: GOOGLE_PLACE_ID=' + placeId);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
