/**
 * POST /api/review — emails a customer review to the owner for approval.
 * Reviews are NOT published automatically; the owner adds approved reviews
 * to src/data/testimonials.js and rebuilds the site.
 */
const { isConfigured, sendMail, readBody, esc, validEmail } = require('./_lib/mailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: 'Method not allowed' }));
  }

  const body = await readBody(req);
  const { name, city, email, rating, message, company } = body;

  if (company) {
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  }

  if (!name || !city || !validEmail(email) || !message) {
    res.statusCode = 400;
    return res.end(
      JSON.stringify({ error: 'Please provide your name, city, a valid email, and your review.' })
    );
  }

  if (!isConfigured()) {
    res.statusCode = 503;
    return res.end(
      JSON.stringify({
        error:
          'Review submission isn’t connected yet. Please email us your review and we’ll be glad to post it.',
      })
    );
  }

  const stars = '★'.repeat(Math.max(1, Math.min(5, Number(rating) || 5)));
  const subject = `New review awaiting approval — ${name} (${city}) ${stars}`;

  const text = [
    'A new review was submitted and is awaiting your approval.',
    '',
    `Name: ${name}`,
    `City: ${city}`,
    `Email: ${email}`,
    `Rating: ${rating || 5}/5`,
    '',
    'Review:',
    message,
    '',
    '— To publish: add this to src/data/testimonials.js and rebuild the site.',
  ].join('\n');

  const html = `
    <h2 style="font-family:Georgia,serif">New review — awaiting approval</h2>
    <p style="font-family:Arial,sans-serif;font-size:14px;color:#b08a52;font-size:20px">${stars}</p>
    <table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${esc(name)}</td></tr>
      <tr><td><strong>City</strong></td><td>${esc(city)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${esc(email)}</td></tr>
      <tr><td><strong>Rating</strong></td><td>${esc(String(rating || 5))}/5</td></tr>
    </table>
    <blockquote style="font-family:Georgia,serif;font-size:15px;border-left:3px solid #b08a52;margin:12px 0;padding:4px 16px;color:#3a3d44">${esc(message).replace(/\n/g, '<br>')}</blockquote>
    <p style="font-family:Arial,sans-serif;font-size:12px;color:#6b6e76">To publish, add this review to <code>src/data/testimonials.js</code> and rebuild.</p>`;

  try {
    await sendMail({ subject, text, html, replyTo: email });
    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  } catch (err) {
    console.error('review send failed:', err);
    res.statusCode = 500;
    return res.end(
      JSON.stringify({ error: 'We couldn’t submit your review. Please email it to us directly.' })
    );
  }
};
