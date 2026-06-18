import { Link } from 'react-router-dom';
import type { Invoice } from '@/lib/types';

const statusColors: Record<Invoice['status'], string> = {
  draft: 'bg-gray-500/20 text-gray-300',
  sent: 'bg-amber/20 text-amber',
  paid: 'bg-success/20 text-success',
};

export function InvoiceList({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl border border-border/60 bg-surface-card p-8 text-center">
        <p className="text-sm text-muted">No invoices yet.</p>
        <Link to="/admin/invoices/new" className="mt-2 inline-block text-sm font-medium text-amber">
          Create your first invoice →
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/60">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface-elevated text-left text-xs uppercase text-muted">
            <th className="px-4 py-3">Invoice #</th>
            <th className="px-4 py-3">Customer</th>
            <th className="hidden px-4 py-3 sm:table-cell">Date</th>
            <th className="px-4 py-3 text-right">Total</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b border-border/40 transition hover:bg-surface-elevated/50">
              <td className="px-4 py-3">
                <Link to={`/admin/invoices/${inv.id}`} className="font-medium text-amber hover:underline">
                  {inv.invoice_number}
                </Link>
              </td>
              <td className="px-4 py-3">{inv.customer_name}</td>
              <td className="hidden px-4 py-3 text-muted sm:table-cell">
                {new Date(inv.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right font-medium">${inv.total.toFixed(2)}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[inv.status]}`}>
                  {inv.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
