import type { Invoice, LineItem } from '@/lib/types';
import { BRAND } from '@/lib/constants';

interface InvoicePreviewProps {
  invoice: Partial<Invoice> & { line_items: LineItem[] };
}

export function InvoicePreview({ invoice }: InvoicePreviewProps) {
  const subtotal = invoice.subtotal ?? invoice.line_items.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const taxRate = invoice.tax_rate ?? BRAND.taxRate;
  const taxAmount = invoice.tax_amount ?? Math.round(subtotal * taxRate * 100) / 100;
  const total = invoice.total ?? subtotal + taxAmount;

  return (
    <div className="print-invoice rounded-2xl border border-border bg-white p-6 text-black shadow-lg md:p-8">
      <div className="flex items-start justify-between border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{BRAND.name}</h2>
          <p className="text-sm text-gray-500">{BRAND.address}</p>
          <p className="text-sm text-gray-500">{BRAND.phone} · {BRAND.email}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-amber-600">INVOICE</p>
          <p className="text-sm text-gray-500">{invoice.invoice_number ?? 'DRAFT'}</p>
          {invoice.due_date && (
            <p className="text-xs text-gray-400">Due: {invoice.due_date}</p>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-4 border-b border-gray-200 pb-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400">Bill To</p>
          <p className="mt-1 font-medium">{invoice.customer_name || '—'}</p>
          {invoice.customer_email && <p className="text-sm text-gray-500">{invoice.customer_email}</p>}
          {invoice.customer_phone && <p className="text-sm text-gray-500">{invoice.customer_phone}</p>}
          {invoice.customer_address && <p className="text-sm text-gray-500">{invoice.customer_address}</p>}
        </div>
        <div className="text-right md:text-right">
          <p className="text-xs font-semibold uppercase text-gray-400">Status</p>
          <p className="mt-1 capitalize font-medium">{invoice.status ?? 'draft'}</p>
        </div>
      </div>

      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-left text-xs uppercase text-gray-400">
            <th className="pb-2">Description</th>
            <th className="pb-2 text-right">Qty</th>
            <th className="pb-2 text-right">Rate</th>
            <th className="pb-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.line_items.map((item) => (
            <tr key={item.id} className="border-b border-gray-100">
              <td className="py-2">{item.description}</td>
              <td className="py-2 text-right">{item.quantity}</td>
              <td className="py-2 text-right">${item.unitPrice.toFixed(2)}</td>
              <td className="py-2 text-right">${(item.quantity * item.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-end">
        <div className="w-48 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tax ({(taxRate * 100).toFixed(1)}%)</span>
            <span>${taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-gray-200 pt-1 text-base font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <p className="text-xs font-semibold uppercase text-gray-400">Notes</p>
          <p className="mt-1 text-sm text-gray-600">{invoice.notes}</p>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-400">
        Thank you for choosing {BRAND.name} · Marietta, GA
      </p>
    </div>
  );
}
