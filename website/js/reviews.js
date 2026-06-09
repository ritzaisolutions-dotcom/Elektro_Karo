(() => {
  'use strict';

  const AVATAR_CLASSES = ['avatar--c1', 'avatar--c2', 'avatar--c3', 'avatar--c4', 'avatar--c5'];

  const escapeHtml = (str) => String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const avatarClass = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = (hash + name.charCodeAt(i)) % AVATAR_CLASSES.length;
    return AVATAR_CLASSES[hash];
  };

  const renderStars = (rating) => {
    const r = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return '★'.repeat(r) + (r < 5 ? '☆'.repeat(5 - r) : '');
  };

  const googleGIcon = () => `
    <svg class="bewertung-card__google" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>`;

  const buildCard = (review, mapsUri) => {
    const author = review.author || 'Google-Nutzer';
    const initial = escapeHtml(author.charAt(0).toUpperCase());
    const photo = review.photoUri && !String(review.photoUri).startsWith('[') ? review.photoUri : '';
    const avatarInner = photo
      ? `<img class="bewertung-card__avatar-img" src="${escapeHtml(photo)}" alt="" width="48" height="48" loading="lazy" decoding="async">`
      : `<div class="bewertung-card__avatar ${avatarClass(author)}">${initial}</div>`;
    const link = mapsUri || (typeof CLIENT !== 'undefined' ? CLIENT.googleBewertungsLink : '#');

    return `
      <article class="bewertung-card bewertung-card--google">
        ${googleGIcon()}
        <div class="bewertung-card__header">
          ${avatarInner}
          <div class="bewertung-card__meta">
            <div class="bewertung-card__author">${escapeHtml(author)}</div>
            <div class="bewertung-card__date">${escapeHtml(review.relativeTime || '')}</div>
            <div class="bewertung-card__stars" aria-label="${review.rating} von 5 Sternen">${renderStars(review.rating)}</div>
          </div>
        </div>
        <p class="bewertung-card__text">${escapeHtml(review.text)}</p>
        <a class="bewertung-card__more" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Weiterlesen</a>
      </article>`;
  };

  const updateSummary = (data) => {
    const summary = document.getElementById('reviewsSummary');
    const label = document.getElementById('reviewsSummaryLabel');
    const stars = document.getElementById('reviewsSummaryStars');
    const count = document.getElementById('reviewsSummaryCount');
    if (!summary) return;

    if (label) label.textContent = data.ratingLabel || 'Ausgezeichnet';
    if (stars) stars.textContent = renderStars(Math.round(data.rating || 5));
    const n = data.userRatingCount || 0;
    if (count) count.textContent = n === 1 ? 'Basierend auf 1 Bewertung' : `Basierend auf ${n} Bewertungen`;
    summary.hidden = false;

    if (typeof CLIENT !== 'undefined') {
      if (data.userRatingCount) {
        CLIENT.googleBewertungAnzahl = n === 1 ? '1 Bewertung' : `${n} Bewertungen`;
        document.querySelectorAll('[data-config="googleBewertungAnzahl"]').forEach((el) => {
          el.textContent = CLIENT.googleBewertungAnzahl;
        });
        document.querySelectorAll('[data-config="bewertungenAnzahl"]').forEach((el) => {
          el.textContent = `${n} Google-Bewertungen`;
        });
      }
      if (data.ratingLabel) {
        CLIENT.googleBewertungNote = data.ratingLabel;
      }
      if (data.googleMapsUri && !String(data.googleMapsUri).startsWith('[')) {
        CLIENT.googleBewertungsLink = data.googleMapsUri;
        document.querySelectorAll('[data-config-href="googleBewertung"]').forEach((el) => {
          el.href = data.googleMapsUri;
        });
      }
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews', { headers: { Accept: 'application/json' } });
      if (res.ok) return res.json();
    } catch (_) { /* local fallback */ }
    const fallback = await fetch('data/google-reviews.json', { cache: 'no-cache' });
    if (!fallback.ok) throw new Error('Keine Bewertungsdaten verfügbar');
    return fallback.json();
  };

  const render = async () => {
    const track = document.getElementById('reviewsTrack');
    const loading = document.getElementById('reviewsLoading');
    const wrap = document.getElementById('reviewsCarouselWrap');
    if (!track) return;

    try {
      const data = await fetchReviews();
      const reviews = Array.isArray(data.reviews) ? data.reviews : [];
      if (!reviews.length) throw new Error('Keine Reviews in der Antwort');

      updateSummary(data);
      track.innerHTML = reviews.map((r) => buildCard(r, data.googleMapsUri)).join('');

      if (loading) loading.hidden = true;
      if (wrap) wrap.hidden = false;

      if (typeof window.initReviewsCarousel === 'function') {
        window.initReviewsCarousel();
      }
    } catch (err) {
      if (loading) {
        loading.textContent = 'Bewertungen konnten nicht geladen werden.';
        loading.classList.add('google-reviews-loading--error');
      }
      console.warn('[reviews.js]', err.message || err);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
