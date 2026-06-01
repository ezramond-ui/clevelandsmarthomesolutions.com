const { layout, site, esc } = require('../layout');
const C = require('../components');
const { tiers } = require('../../data/services');

module.exports = function landlords() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'For Landlords', path: '/landlords.html' },
  ];

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Smart home solutions for rental properties',
      provider: { '@id': site.url + '/#business' },
      areaServed: site.serviceAreaLabel,
      description:
        'Smart lighting, locks, and automation for landlords and rental property owners — remote control and management with no major construction.',
    });

  const benefits = [
    { icon: 'phone', t: 'Remote control from anywhere', d: 'Adjust lights, schedules, and scenes for any unit from your phone — no driving across town.' },
    { icon: 'lock', t: 'Smart locks & guest codes', d: 'Issue and revoke codes for showings, cleaners, and contractors. No more lost keys or rekeying.' },
    { icon: 'clock', t: 'Effortless turnovers', d: 'Set lights and climate between tenants, and reset everything in seconds for the next move-in.' },
    { icon: 'home', t: 'Manage multiple properties', d: 'One dashboard to monitor and control every unit you own, wherever it is in NE Ohio.' },
    { icon: 'thermostat', t: 'Protect vacant units', d: 'Smart thermostats prevent frozen pipes and waste by keeping empty units efficient and safe.' },
    { icon: 'star', t: 'Add tenant-pleasing value', d: 'Modern smart features help units rent faster and command stronger rents.' },
  ];

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero landlord-hero">
    <div class="container">
      <span class="eyebrow">For landlords &amp; rental property owners</span>
      <h1>Smart management for every property you own</h1>
      <p class="lead">Give your rentals remote control, scheduling, and smart oversight — installed cleanly, with <strong>no major construction and no disruption</strong> to occupied units. Manage one property or a whole portfolio from a single app.</p>
      <div class="hero-actions">
        <a class="btn btn-accent btn-lg" href="/contact.html?tier=landlord">Get a landlord quote</a>
        <a class="btn btn-outline btn-lg" href="#packages">See packages</a>
      </div>
    </div>
  </section>

  <section class="section" aria-labelledby="ben-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Why landlords choose us</span>
        <h2 id="ben-h">Less hassle, more control, happier tenants</h2>
      </div>
      <div class="benefit-grid">
        ${benefits
          .map(
            (b) => `<article class="benefit-card">${C.icon(b.icon, 'icon icon-lg icon-accent')}<h3>${b.t}</h3><p>${b.d}</p></article>`
          )
          .join('')}
      </div>
    </div>
  </section>

  <section class="section section-soft">
    <div class="container landlord-inner">
      <div class="landlord-copy">
        <span class="eyebrow">The premium difference</span>
        <h2>No construction means no downtime</h2>
        <p>Traditional smart-home installs can shut a unit down for days — impossible with tenants in place. Our clean, minimal-impact approach changes that. We upgrade switches, locks, and thermostats <strong>without opening walls or running new wire</strong>, so occupied units stay livable and vacant units turn over fast.</p>
        <ul class="check-list">
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Install around tenant schedules with minimal disruption</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>No mess, no debris, no restoration work afterward</span></li>
          <li>${C.icon('check', 'icon icon-sm icon-accent')}<span>Devices that transfer cleanly between tenants</span></li>
        </ul>
      </div>
      <div class="landlord-card">
        ${C.icon('shield', 'icon icon-xl icon-accent')}
        <p class="landlord-stat">Licensed &amp; insured</p>
        <p>Professional, documented installs you can rely on across every property in your portfolio.</p>
      </div>
    </div>
  </section>

  <section class="section" id="packages" aria-labelledby="pk-h">
    <div class="container">
      <div class="section-head center">
        <span class="eyebrow">Built for rentals</span>
        <h2 id="pk-h">Every package works for landlords</h2>
        <p class="lead">Each tier is ideal for rental owners who want remote control and smart management of their properties.</p>
      </div>
      <div class="tier-grid">${C.tierCards({ full: true })}</div>
    </div>
  </section>

  ${C.ctaBand('Simplify how you manage your rentals', 'Tell us about your properties and we’ll design a smart, scalable solution — with a free, honest quote.')}
  `;

  return {
    path: 'landlords.html',
    html: layout({
      title: `Smart Home Solutions for Landlords & Rentals | ${site.serviceAreaLabel}`,
      description:
        'Remote control, smart locks, and property management for landlords across Northeast Ohio. Clean installs with no construction or downtime — manage every rental unit from one app. Free quotes.',
      path: '/landlords.html',
      body,
      jsonLd,
    }),
  };
};
