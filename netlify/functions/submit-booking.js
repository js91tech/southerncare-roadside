const { BRAND, sendEmail, sendSMS, notifyEmail, jsonResponse } = require('./_shared/notify');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*' }, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  try {
    const data = JSON.parse(event.body || '{}');
    const { name, phone, email, location, vehicle, serviceType, preferredTime, notes } = data;

    if (!name || !phone || !location || !serviceType) {
      return jsonResponse(400, { error: 'Missing required fields' });
    }

    const subject = `New Booking — ${name} — ${serviceType}`;
    const text = [
      `New booking request for ${BRAND}`,
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
      `Location: ${location}`,
      vehicle ? `Vehicle: ${vehicle}` : null,
      `Service: ${serviceType}`,
      preferredTime ? `Preferred time: ${preferredTime}` : null,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean).join('\n');

    const html = text.replace(/\n/g, '<br>');

    await Promise.all([
      sendEmail({ to: notifyEmail(), subject, html, text }),
      sendSMS(`📅 ${BRAND} Booking: ${name} — ${serviceType} at ${location}. Call: ${phone}`),
    ]);

    if (email) {
      await sendEmail({
        to: email,
        subject: `Booking Received — ${BRAND}`,
        text: `Hi ${name},\n\nWe received your booking request for ${serviceType}. We'll contact you shortly at ${phone}.\n\n— ${BRAND}`,
        html: `<p>Hi ${name},</p><p>We received your booking request for <strong>${serviceType}</strong>. We'll contact you shortly.</p><p>— ${BRAND}</p>`,
      }).catch(() => {});
    }

    return jsonResponse(200, { ok: true });
  } catch (err) {
    console.error(err);
    return jsonResponse(500, { error: err.message || 'Internal error' });
  }
};
