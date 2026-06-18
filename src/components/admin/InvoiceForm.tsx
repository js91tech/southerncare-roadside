import { useState } from 'react';
import { BRAND, DEFAULT_LINE_ITEMS } from '@/lib/constants';
import { calcInvoiceTotals } from '@/lib/supabase';
import type { Invoice, LineItem } from '@/lib/types';
import { InvoicePreview } from './InvoicePreview';

const inputClass =
  'w-full rounded-xl border border-border bg-surface-elevated px-3 py-2 text-sm outline-none focus:border-amber/50';

function newLineItem(partial?: Partial<LineItem>): LineItem {
  return {
    id: crypto.randomUUID(),
    description: partial?.description ?? '',
    quantity: partial?.quantity ?? 1,
    unitPrice: partial?.unitPrice ?? 0,
  };
}

interface InvoiceFormProps {
  initial?: Partial<Invoice>;
  onSave: (data: Partial<Invoice> & { line_items: LineItem[] }) => Promise<void>;
  onSend?: () => Promise<void>;
  onMarkPaid?: () => Promise<void>;
  saving?: boolean;
}

export function InvoiceForm({ initial, onSave, onSend, onMarkPaid, saving }: InvoiceFormProps) {
  const [customerName, setCustomerName] = useState(initial?.customer_name ?? '');
  const [customerEmail, setCustomerEmail] = useState(initial?.customer_email ?? '');
  const [customerPhone, setCustomerPhone] = useState(initial?.customer_phone ?? '');
  const [customerAddress, setCustomerAddress] = useState(initial?.customer_address ?? '');
  const [lineItems, setLineItems] = useState<LineItem[]>(
    initial?.line_items?.length ? initial.line_items : [newLineItem()],
  );
  const [taxRate, setTaxRate] = useState(initial?.tax_rate ?? BRAND.taxRate);
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [dueDate, setDueDate] = useState(initial?.due_date ?? '');
  const [showPreview, setShowPreview] = useState(false);

  const { subtotal, taxAmount, total } = calcInvoiceTotals(lineItems, taxRate);

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems((items) =>
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const addItem = (preset?: Partial<LineItem>) => {
    setLineItems((items) => [...items, newLineItem(preset)]);
  };

  const removeItem = (id: string) => {
    setLineItems((items) => items.filter((i) => i.id !== id));
  };

  const buildPayload = () => ({
    ...initial,
    customer_name: customerName,
    customer_email: customerEmail || null,
    customer_phone: customerPhone || null,
    customer_address: customerAddress || null,
    line_items: lineItems,
    tax_rate: taxRate,
    subtotal,
    tax_amount: taxAmount,
    total,
    notes: notes || null,
    due_date: dueDate || null,
    status: initial?.status ?? 'draft',
  });

  const handleSave = async () => {
    await onSave(buildPayload());
  };

  const previewData = {
    ...buildPayload(),
    invoice_number: initial?.invoice_number,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Customer Name *</label>
          <input required className={inputClass} value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Email</label>
          <input type="email" className={inputClass} value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Phone</label>
          <input type="tel" className={inputClass} value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Address</label>
          <input className={inputClass} value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Due Date</label>
          <input type="date" className={inputClass} value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Tax Rate</label>
          <input
            type="number"
            step="0.001"
            className={inputClass}
            value={taxRate}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Line Items</h3>
          <div className="flex gap-2">
            <select
              className="rounded-lg border border-border bg-surface-elevated px-2 py-1 text-xs"
              defaultValue=""
              onChange={(e) => {
                const preset = DEFAULT_LINE_ITEMS.find((p) => p.description === e.target.value);
                if (preset) addItem(preset);
                e.target.value = '';
              }}
            >
              <option value="">+ Quick add...</option>
              {DEFAULT_LINE_ITEMS.map((p) => (
                <option key={p.description} value={p.description}>{p.description}</option>
              ))}
            </select>
            <button type="button" onClick={() => addItem()} className="text-xs text-amber">
              + Add line
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {lineItems.map((item) => (
            <div key={item.id} className="flex flex-wrap gap-2 rounded-xl border border-border/60 bg-surface-card p-3">
              <input
                className={`${inputClass} min-w-[140px] flex-1`}
                placeholder="Description"
                value={item.description}
                onChange={(e) => updateItem(item.id, 'description', e.target.value)}
              />
              <input
                type="number"
                min="1"
                className={`${inputClass} w-16`}
                value={item.quantity}
                onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
              />
              <input
                type="number"
                min="0"
                step="0.01"
                className={`${inputClass} w-24`}
                value={item.unitPrice}
                onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
              />
              <span className="flex w-20 items-center justify-end text-sm font-medium">
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </span>
              <button type="button" onClick={() => removeItem(item.id)} className="text-xs text-danger">
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-end text-sm">
          <div className="w-48 space-y-1">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Tax</span><span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-muted">Notes</label>
        <textarea className={`${inputClass} min-h-[60px] resize-none`} value={notes} onChange={(e) => setNotes(e.target.value)} />
      </div>

      <div className="no-print flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !customerName}
          className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-surface disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Invoice'}
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-xl border border-border px-4 py-2 text-sm"
        >
          {showPreview ? 'Hide Preview' : 'Preview'}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl border border-border px-4 py-2 text-sm"
        >
          Print / PDF
        </button>
        {onSend && initial?.status !== 'sent' && initial?.status !== 'paid' && (
          <button
            type="button"
            onClick={onSend}
            disabled={saving || !customerEmail}
            className="rounded-xl border border-amber/50 px-4 py-2 text-sm text-amber disabled:opacity-50"
          >
            Send via Email
          </button>
        )}
        {onMarkPaid && initial?.status === 'sent' && (
          <button
            type="button"
            onClick={onMarkPaid}
            className="rounded-xl border border-success/50 px-4 py-2 text-sm text-success"
          >
            Mark as Paid
          </button>
        )}
      </div>

      {showPreview && (
        <div className="mt-4">
          <InvoicePreview invoice={previewData} />
        </div>
      )}
    </div>
  );
}
