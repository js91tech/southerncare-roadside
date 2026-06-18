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
    const { phone, location, serviceType, notes } = data;

    if (!phone || !location || !serviceType) {
      return jsonResponse(400, { error: 'Missing required fields' });
    }

    const subject = `🚨 SOS REQUEST — ${phone}`;
    const text = [
      `EMERGENCY SOS — ${BRAND}`,
      '',
      `Phone: ${phone}`,
      `Location: ${location}`,
      `Service: ${serviceType}`,
      notes ? `Notes: ${notes}` : null,
    ].filter(Boolean).join('\n');

    await Promise.all([
      sendEmail({ to: notifyEmail(), subject, html: text.replace(/\n/g, '<br>'), text }),
      sendSMS(`🚨 SOS ${BRAND}: ${serviceType} at ${location}. CALL: ${phone}`),
    ]);

    return jsonResponse(200, { ok: true });
  } catch (err) {
    console.error(err);
    return jsonResponse(500, { error: err.message || 'Internal error' });
  }
};
