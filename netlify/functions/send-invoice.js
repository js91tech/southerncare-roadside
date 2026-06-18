const { createClient } = require('@supabase/supabase-js');
const { BRAND, sendEmail, sendSMS, jsonResponse } = require('./_shared/notify');

function invoiceHtml(invoice) {
  const items = (invoice.line_items || [])
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee">${item.description}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${Number(item.unitPrice).toFixed(2)}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${(item.quantity * item.unitPrice).toFixed(2)}</td>
        </tr>`,
    )
    .join('');

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#111">
      <h1 style="color:#D97706">${BRAND}</h1>
      <p style="color:#666">Marietta, GA</p>
      <hr>
      <h2>Invoice ${invoice.invoice_number}</h2>
      <p><strong>Bill To:</strong> ${invoice.customer_name}<br>
      ${invoice.customer_email || ''}<br>${invoice.customer_phone || ''}<br>${invoice.customer_address || ''}</p>
      ${invoice.due_date ? `<p><strong>Due:</strong> ${invoice.due_date}</p>` : ''}
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        <thead>
          <tr style="background:#f5f5f5">
            <th style="padding:8px;text-align:left">Description</th>
            <th style="padding:8px;text-align:right">Qty</th>
            <th style="padding:8px;text-align:right">Rate</th>
            <th style="padding:8px;text-align:right">Amount</th>
          </tr>
        </thead>
        <tbody>${items}</tbody>
      </table>
      <p style="text-align:right">
        Subtotal: $${Number(invoice.subtotal).toFixed(2)}<br>
        Tax: $${Number(invoice.tax_amount).toFixed(2)}<br>
        <strong>Total: $${Number(invoice.total).toFixed(2)}</strong>
      </p>
      ${invoice.notes ? `<p><em>${invoice.notes}</em></p>` : ''}
      <hr>
      <p style="color:#999;font-size:12px">Thank you for choosing ${BRAND}</p>
    </div>
  `;
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { 'Access-Control-Allow-Origin': '*' }, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  try {
    const { invoiceId, accessToken } = JSON.parse(event.body || '{}');
    if (!invoiceId || !accessToken) {
      return jsonResponse(400, { error: 'Missing invoiceId or accessToken' });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
    );

    const { data: userData, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !userData?.user) {
      return jsonResponse(401, { error: 'Unauthorized' });
    }

    const { data: invoice, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', invoiceId)
      .eq('created_by', userData.user.id)
      .single();

    if (error || !invoice) {
      return jsonResponse(404, { error: 'Invoice not found' });
    }
    if (!invoice.customer_email) {
      return jsonResponse(400, { error: 'Customer email required to send invoice' });
    }

    const html = invoiceHtml(invoice);
    const text = `Invoice ${invoice.invoice_number} from ${BRAND}. Total: $${Number(invoice.total).toFixed(2)}. Due: ${invoice.due_date || 'Upon receipt'}.`;

    await sendEmail({
      to: invoice.customer_email,
      subject: `Invoice ${invoice.invoice_number} — ${BRAND}`,
      html,
      text,
    });

    if (invoice.customer_phone) {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_PHONE_NUMBER;
      if (sid && token && from) {
        const auth = Buffer.from(`${sid}:${token}`).toString('base64');
        const params = new URLSearchParams({
          To: invoice.customer_phone,
          From: from,
          Body: `${BRAND}: Invoice ${invoice.invoice_number} for $${Number(invoice.total).toFixed(2)}. Check your email for details.`,
        });
        await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
          method: 'POST',
          headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString(),
        }).catch(() => {});
      }
    }

    return jsonResponse(200, { ok: true });
  } catch (err) {
    console.error(err);
    return jsonResponse(500, { error: err.message || 'Internal error' });
  }
};
