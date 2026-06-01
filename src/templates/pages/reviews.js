const { layout, site, esc } = require('../layout');
const C = require('../components');
const testimonials = require('../../data/testimonials');

module.exports = function reviews() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'Reviews', path: '/reviews.html' },
  ];

  const avg = (
    testimonials.reduce((s, t) => s + (t.rating || 5), 0) / testimonials.length
  ).toFixed(1);

  // AggregateRating schema from the published (approved) reviews.
  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript(
      C.localBusinessSchema({
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: avg,
          reviewCount: testimonials.length,
          bestRating: 5,
        },
        review: testimonials.map((t) => ({
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: t.rating || 5, bestRating: 5 },
          author: { '@type': 'Person', name: t.author },
          reviewBody: t.quote,
        })),
      })
    );

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero center">
    <div class="container">
      <span class="eyebrow">Reviews &amp; testimonials</span>
      <h1>Trusted by neighbors across ${esc(site.serviceAreaLabel)}</h1>
      <p class="lead">We’re a new company with an experienced founder — and we’re building our reputation one happy home at a time. Here’s what our customers are saying.</p>
      <div class="rating-summary">
        <span class="rating-big">${avg}</span>
        <span class="rating-stars" aria-label="${avg} out of 5 stars">★★★★★</span>
        <span class="rating-count">based on ${testimonials.length} reviews</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      ${C.testimonialCards(testimonials)}
    </div>
  </section>

  <section class="section section-soft" aria-labelledby="leave-h">
    <div class="container review-form-layout">
      <div class="review-intro">
        <span class="eyebrow">Share your experience</span>
        <h2 id="leave-h">Leave us a review</h2>
        <p>Worked with us? We’d be grateful to hear about it. Submitted reviews are sent to our owner and <strong>published only after approval</strong>, so it may take a little time to appear.</p>
        <ul class="check-list">
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Honest feedback welcome — it helps us improve</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>We only display your first name and city</span></li>
        </ul>
      </div>

      <form id="review-form" class="form" action="/api/review" method="POST" novalidate>
        <div class="form-row">
          <div class="field">
            <label for="r-name">Your name <span class="req">*</span></label>
            <input type="text" id="r-name" name="name" autocomplete="name" required>
          </div>
          <div class="field">
            <label for="r-city">City / area <span class="req">*</span></label>
            <input type="text" id="r-city" name="city" placeholder="e.g. Beachwood" required>
          </div>
        </div>
        <div class="field">
          <label for="r-email">Email <span class="req">*</span> <span class="muted">(not published)</span></label>
          <input type="email" id="r-email" name="email" autocomplete="email" required>
        </div>
        <div class="field">
          <label for="r-rating">Rating <span class="req">*</span></label>
          <select id="r-rating" name="rating" required>
            <option value="5">★★★★★ — Excellent</option>
            <option value="4">★★★★☆ — Great</option>
            <option value="3">★★★☆☆ — Good</option>
            <option value="2">★★☆☆☆ — Fair</option>
            <option value="1">★☆☆☆☆ — Poor</option>
          </select>
        </div>
        <div class="field">
          <label for="r-message">Your review <span class="req">*</span></label>
          <textarea id="r-message" name="message" rows="5" required placeholder="Tell us about your experience — what we installed, how the process felt, and the result."></textarea>
        </div>
        <div class="hp" aria-hidden="true">
          <label for="r-company">Company</label>
          <input type="text" id="r-company" name="company" tabindex="-1" autocomplete="off">
        </div>
        <button type="submit" class="btn btn-accent btn-lg form-submit">Submit review for approval</button>
        <p class="form-status" role="status" aria-live="polite"></p>
        <p class="form-fineprint">Reviews are moderated. By submitting, you allow us to publish your first name, city, rating, and review.</p>
      </form>
    </div>
  </section>

  ${C.ctaBand('Ready to join our happy customers?', 'Get a free quote and see why neighbors across Northeast Ohio trust us with their homes.')}
  `;

  return {
    path: 'reviews.html',
    html: layout({
      title: `Reviews & Testimonials | ${site.name}`,
      description:
        'Read reviews from Northeast Ohio homeowners and landlords, and share your own experience with Cleveland Smart Home Solutions. Honest feedback from real, local customers.',
      path: '/reviews.html',
      body,
      jsonLd,
    }),
  };
};
