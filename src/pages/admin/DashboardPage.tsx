import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { fetchInvoices } from '@/lib/supabase';
import type { Invoice } from '@/lib/types';
import { InvoiceList } from '@/components/admin/InvoiceList';

export function DashboardPage() {
  const { signOut, user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInvoices()
      .then(setInvoices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const unpaid = invoices.filter((i) => i.status === 'sent').reduce((s, i) => s + i.total, 0);
  const paidThisMonth = invoices
    .filter((i) => i.status === 'paid' && new Date(i.paid_at ?? '').getMonth() === new Date().getMonth())
    .reduce((s, i) => s + i.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted">{user?.email}</p>
        </div>
        <div className="flex gap-2">
          <Link
            to="/admin/invoices/new"
            className="rounded-xl bg-amber px-4 py-2 text-sm font-semibold text-surface"
          >
            + New Invoice
          </Link>
          <button onClick={signOut} className="rounded-xl border border-border px-4 py-2 text-sm text-muted">
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-surface-card p-4">
          <p className="text-xs text-muted">Total Invoices</p>
          <p className="text-2xl font-bold">{invoices.length}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-surface-card p-4">
          <p className="text-xs text-muted">Unpaid (Sent)</p>
          <p className="text-2xl font-bold text-amber">${unpaid.toFixed(2)}</p>
        </div>
        <div className="rounded-2xl border border-border/60 bg-surface-card p-4">
          <p className="text-xs text-muted">Paid This Month</p>
          <p className="text-2xl font-bold text-success">${paidThisMonth.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Recent Invoices</h2>
        {loading ? (
          <p className="text-sm text-muted">Loading...</p>
        ) : (
          <InvoiceList invoices={invoices} />
        )}
      </div>
    </div>
  );
}
