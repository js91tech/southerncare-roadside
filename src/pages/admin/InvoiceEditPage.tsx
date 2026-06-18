import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { fetchInvoice, saveInvoice, updateInvoiceStatus } from '@/lib/supabase';
import { sendInvoiceEmail } from '@/lib/api';
import { InvoiceForm } from '@/components/admin/InvoiceForm';
import type { Invoice, LineItem } from '@/lib/types';

export function InvoiceEditPage() {
  const { id } = useParams<{ id: string }>();
  const { user, session } = useAuth();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchInvoice(id)
      .then(setInvoice)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (data: Partial<Invoice> & { line_items: LineItem[] }) => {
    if (!user || !id) return;
    setSaving(true);
    setMessage('');
    try {
      const updated = await saveInvoice({ ...data, id }, user.id);
      setInvoice(updated);
      setMessage('Invoice saved.');
    } finally {
      setSaving(false);
    }
  };

  const handleSend = async () => {
    if (!id || !session?.access_token) return;
    setSaving(true);
    setMessage('');
    try {
      await sendInvoiceEmail(id, session.access_token);
      await updateInvoiceStatus(id, 'sent');
      const updated = await fetchInvoice(id);
      setInvoice(updated);
      setMessage('Invoice sent via email.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setSaving(false);
    }
  };

  const handleMarkPaid = async () => {
    if (!id) return;
    await updateInvoiceStatus(id, 'paid');
    const updated = await fetchInvoice(id);
    setInvoice(updated);
    setMessage('Marked as paid.');
  };

  if (loading) return <p className="text-sm text-muted">Loading...</p>;
  if (!invoice) return <p className="text-sm text-danger">Invoice not found.</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link to="/admin" className="text-sm text-muted hover:text-amber">← Dashboard</Link>
        <h1 className="text-xl font-bold">{invoice.invoice_number}</h1>
      </div>
      {message && <p className="text-sm text-amber">{message}</p>}
      <InvoiceForm
        initial={invoice}
        onSave={handleSave}
        onSend={handleSend}
        onMarkPaid={handleMarkPaid}
        saving={saving}
      />
    </div>
  );
}
