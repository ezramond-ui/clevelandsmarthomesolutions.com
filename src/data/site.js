/**
 * Central site configuration.
 *
 * ┌─────────────────────────────────────────────────────────────────────┐
 * │  PLACEHOLDERS — update these before going live.                      │
 * │  Search the codebase for "PLACEHOLDER" to confirm nothing is missed. │
 * └─────────────────────────────────────────────────────────────────────┘
 */
module.exports = {
  name: 'Cleveland Smart Home Solutions',
  shortName: 'Cleveland Smart Home',
  tagline: 'Smart Living, Done Simply.',
  legalName: 'Cleveland Smart Home Solutions LLC',

  // The canonical production URL (no trailing slash). Used for sitemap,
  // canonical tags, Open Graph, and structured data.
  url: 'https://www.clevelandsmarthomesolutions.com',

  // ── PLACEHOLDER CONTACT DETAILS ──────────────────────────────────────
  phone: '(216) 555-0123',           // PLACEHOLDER phone number
  phoneHref: '+12165550123',         // PLACEHOLDER phone (tel: format)
  email: 'hello@clevelandsmarthomesolutions.com', // PLACEHOLDER email
  // Where contact-form and review submissions are emailed for approval:
  ownerEmail: 'owner@clevelandsmarthomesolutions.com', // PLACEHOLDER

  // ── BUSINESS LOCATION ────────────────────────────────────────────────
  address: {
    locality: 'University Heights',
    region: 'OH',
    regionName: 'Ohio',
    postalCode: '44118',             // PLACEHOLDER ZIP
    country: 'US',
    // Approx. coordinates for University Heights, OH (fine for LocalBusiness).
    latitude: 41.4948,
    longitude: -81.5357,
  },
  serviceAreaLabel: 'Northeast Ohio',

  hours: 'Mon–Sat, 8am–7pm',
  hoursSchema: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '19:00' },
  ],

  // ── SOCIAL (optional — leave blank to hide) ──────────────────────────
  social: {
    facebook: '',   // PLACEHOLDER e.g. https://facebook.com/...
    instagram: '',  // PLACEHOLDER
    google: '',     // PLACEHOLDER Google Business Profile
  },

  // Default Open Graph / social share image (relative to site root).
  ogImage: '/images/og-default.svg',

  founded: '2025',
  licensed: true,
  insured: true,

  // Primary call-to-action copy reused across the site.
  primaryCta: { label: 'Get a Free Quote', href: '/contact.html' },
  secondaryCta: { label: 'Explore Services', href: '/services.html' },
};
