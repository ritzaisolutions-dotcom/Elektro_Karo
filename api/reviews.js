const { fetchPlaceReviews } = require('../lib/places-reviews');

const CACHE_CONTROL = 'public, s-maxage=43200, stale-while-revalidate=86400';

function isCronAuthorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const auth = req.headers.authorization || '';
  return auth === `Bearer ${secret}`;
}

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const isCron = req.headers['x-vercel-cron'] === '1' || req.headers['x-vercel-cron'] === 'true';
  if (isCron && !isCronAuthorized(req)) {
    return res.status(401).json({ error: 'Unauthorized cron' });
  }

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return res.status(503).json({
      error: 'Reviews API nicht konfiguriert',
      hint: 'GOOGLE_MAPS_API_KEY und GOOGLE_PLACE_ID in Vercel setzen'
    });
  }

  try {
    const payload = await fetchPlaceReviews({ apiKey, placeId });
    res.setHeader('Cache-Control', CACHE_CONTROL);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(200).json(payload);
  } catch (error) {
    console.error('[api/reviews]', error.message);
    return res.status(502).json({ error: error.message || 'Places API Fehler' });
  }
};
