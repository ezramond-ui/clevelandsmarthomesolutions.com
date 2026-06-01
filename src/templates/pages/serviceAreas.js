const { layout, site, esc } = require('../layout');
const C = require('../components');
const { locations } = require('../../data/locations');

module.exports = function serviceAreas() {
  const crumbs = [
    { name: 'Home', path: '/index.html' },
    { name: 'Service Areas', path: '/service-areas.html' },
  ];

  const suburbs = locations.filter((l) => l.type === 'suburb');
  const neighborhoods = locations.filter((l) => l.type === 'neighborhood');

  const cardFor = (l) =>
    `<li><a class="area-link" href="/areas/${l.slug}.html" data-name="${esc(l.name.toLowerCase())}">${C.icon('pin', 'icon icon-sm icon-accent')}<span>${esc(l.name)}</span></a></li>`;

  const jsonLd =
    C.jsonLdScript(C.breadcrumbSchema(crumbs)) +
    C.jsonLdScript({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Smart home service areas in ${site.serviceAreaLabel}`,
      numberOfItems: locations.length,
      itemListElement: locations.map((l, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: `Smart Home Installation in ${l.name}, OH`,
        url: `${site.url}/areas/${l.slug}.html`,
      })),
    });

  const body = `
  ${C.breadcrumbTrail(crumbs)}
  <section class="page-hero center">
    <div class="container">
      <span class="eyebrow">Service areas</span>
      <h1>Smart home installation across ${esc(site.serviceAreaLabel)}</h1>
      <p class="lead">From University Heights to the lakeshore and the historic neighborhoods of Cleveland, we bring clean, premium smart home installs to <strong>${locations.length} communities</strong> — and everywhere in between.</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="area-search">
        <label for="area-filter" class="visually-hidden">Find your city or neighborhood</label>
        <input type="search" id="area-filter" placeholder="Find your city or neighborhood…" autocomplete="off">
      </div>

      <h2 class="area-group-title">Cities &amp; suburbs</h2>
      <ul class="area-list" id="area-list-suburbs">${suburbs.map(cardFor).join('')}</ul>

      <h2 class="area-group-title">Cleveland neighborhoods</h2>
      <ul class="area-list" id="area-list-neighborhoods">${neighborhoods.map(cardFor).join('')}</ul>

      <p class="area-empty" hidden>No match — but we likely serve your area too. <a href="/contact.html">Just ask us</a>.</p>
    </div>
  </section>

  ${C.ctaBand('Don’t see your street? We probably serve it.', 'If you’re in or around Northeast Ohio, reach out — we’ll let you know right away and get you a free quote.')}
  `;

  return {
    path: 'service-areas.html',
    html: layout({
      title: `Service Areas | Smart Home Installation Across ${site.serviceAreaLabel}`,
      description: `Cleveland Smart Home Solutions serves ${locations.length}+ communities across Northeast Ohio — University Heights, Shaker Heights, Beachwood, Lakewood, Cleveland & more. Find your area.`,
      path: '/service-areas.html',
      body,
      jsonLd,
    }),
  };
};
