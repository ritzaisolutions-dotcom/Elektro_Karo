/**
 * Shared Google Places API (New) → normalized reviews payload.
 * Used by api/reviews.js and scripts/sync-google-reviews.js
 */

const PLACES_FIELD_MASK = 'displayName,rating,userRatingCount,reviews,googleMapsUri';

function ratingLabel(rating) {
  const r = Number(rating);
  if (r >= 4.8) return 'Ausgezeichnet';
  if (r >= 4.5) return 'Sehr gut';
  if (r >= 4.0) return 'Gut';
  if (r >= 3.0) return 'Befriedigend';
  return 'Bewertungen';
}

function formatRelativeTimeDe(iso) {
  if (!iso) return '';
  const then = new Date(iso);
  const now = new Date();
  const diffMs = now - then;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return 'heute';
  if (days === 1) return 'vor 1 Tag';
  if (days < 7) return `vor ${days} Tagen`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? 'vor 1 Woche' : `vor ${weeks} Wochen`;
  const months = Math.floor(days / 30);
  if (months < 12) return months <= 1 ? 'vor 1 Monat' : `vor ${months} Monaten`;
  const years = Math.floor(days / 365);
  return years <= 1 ? 'vor 1 Jahr' : `vor ${years} Jahren`;
}

function normalizeReview(review) {
  const author = review?.authorAttribution?.displayName || 'Google-Nutzer';
  const textObj = review?.text;
  const text = typeof textObj === 'string' ? textObj : (textObj?.text || '');
  const publishTime = review?.publishTime || '';
  return {
    author,
    photoUri: review?.authorAttribution?.photoUri || '',
    authorUri: review?.authorAttribution?.uri || '',
    rating: Number(review?.rating) || 5,
    text: String(text).trim(),
    publishTime,
    relativeTime: review?.relativePublishTimeDescription
      || formatRelativeTimeDe(publishTime)
  };
}

function normalizePlaceDetails(place) {
  const reviews = Array.isArray(place?.reviews) ? place.reviews.map(normalizeReview) : [];
  reviews.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime));

  const rating = Number(place?.rating) || 0;
  const userRatingCount = Number(place?.userRatingCount) || 0;

  return {
    fetchedAt: new Date().toISOString(),
    placeName: place?.displayName?.text || place?.displayName || '',
    rating,
    userRatingCount,
    ratingLabel: ratingLabel(rating),
    googleMapsUri: place?.googleMapsUri || '',
    reviews
  };
}

async function fetchPlaceReviews({ apiKey, placeId }) {
  if (!apiKey) throw new Error('GOOGLE_MAPS_API_KEY fehlt');
  if (!placeId) throw new Error('GOOGLE_PLACE_ID fehlt');

  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': PLACES_FIELD_MASK
    }
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = body?.error?.message || body?.message || `Places API ${response.status}`;
    throw new Error(msg);
  }

  return normalizePlaceDetails(body);
}

async function resolvePlaceId({ apiKey, query }) {
  if (!apiKey) throw new Error('GOOGLE_MAPS_API_KEY fehlt');
  if (!query) throw new Error('Suchbegriff fehlt');

  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id,places.displayName'
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'de' })
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const msg = body?.error?.message || `Places search ${response.status}`;
    throw new Error(msg);
  }

  const id = body?.places?.[0]?.id;
  if (!id) throw new Error(`Kein Place gefunden für: ${query}`);
  return id;
}

module.exports = {
  PLACES_FIELD_MASK,
  ratingLabel,
  formatRelativeTimeDe,
  normalizePlaceDetails,
  fetchPlaceReviews,
  resolvePlaceId
};
