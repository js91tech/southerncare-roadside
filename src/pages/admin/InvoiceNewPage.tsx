import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { saveInvoice } from '@/lib/supabase';
import { InvoiceForm } from '@/components/admin/InvoiceForm';
import type { Invoice, LineItem } from '@/lib/types';

export function InvoiceNewPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSave = async (data: Partial<Invoice> & { line_items: LineItem[] }) => {
    if (!user) return;
    setSaving(true);
    try {
      const invoice = await saveInvoice(data, user.id);
      navigate(`/admin/invoices/${invoice.id}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">New Invoice</h1>
      <InvoiceForm onSave={handleSave} saving={saving} />
    </div>
  );
}
