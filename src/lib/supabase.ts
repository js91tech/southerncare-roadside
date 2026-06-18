import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Invoice, LineItem } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured =
  Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project'));

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export function calcInvoiceTotals(lineItems: LineItem[], taxRate: number) {
  const subtotal = lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const taxAmount = Math.round(subtotal * taxRate * 100) / 100;
  const total = Math.round((subtotal + taxAmount) * 100) / 100;
  return { subtotal, taxAmount, total };
}

export async function fetchInvoices(): Promise<Invoice[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(normalizeInvoice);
}

export async function fetchInvoice(id: string): Promise<Invoice | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from('invoices').select('*').eq('id', id).single();
  if (error) throw error;
  return data ? normalizeInvoice(data) : null;
}

export async function saveInvoice(
  invoice: Partial<Invoice> & { line_items: LineItem[] },
  userId: string,
): Promise<Invoice> {
  if (!supabase) throw new Error('Supabase not configured');

  const { subtotal, taxAmount, total } = calcInvoiceTotals(
    invoice.line_items,
    invoice.tax_rate ?? 0.07,
  );

  const payload = {
    customer_name: invoice.customer_name,
    customer_email: invoice.customer_email,
    customer_phone: invoice.customer_phone,
    customer_address: invoice.customer_address,
    line_items: invoice.line_items,
    subtotal,
    tax_rate: invoice.tax_rate ?? 0.07,
    tax_amount: taxAmount,
    total,
    status: invoice.status ?? 'draft',
    notes: invoice.notes,
    due_date: invoice.due_date,
    created_by: userId,
  };

  if (invoice.id) {
    const { data, error } = await supabase
      .from('invoices')
      .update(payload)
      .eq('id', invoice.id)
      .select()
      .single();
    if (error) throw error;
    return normalizeInvoice(data);
  }

  const { data: numData } = await supabase.rpc('generate_invoice_number');
  const invoiceNumber = numData ?? `SCR-${Date.now()}`;

  const { data, error } = await supabase
    .from('invoices')
    .insert({ ...payload, invoice_number: invoiceNumber })
    .select()
    .single();
  if (error) throw error;
  return normalizeInvoice(data);
}

export async function updateInvoiceStatus(
  id: string,
  status: Invoice['status'],
): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const updates: Record<string, unknown> = { status };
  if (status === 'sent') updates.sent_at = new Date().toISOString();
  if (status === 'paid') updates.paid_at = new Date().toISOString();
  const { error } = await supabase.from('invoices').update(updates).eq('id', id);
  if (error) throw error;
}

function normalizeInvoice(row: Record<string, unknown>): Invoice {
  return {
    ...row,
    line_items: (row.line_items as LineItem[]) ?? [],
  } as Invoice;
}
