export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  line_items: LineItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid';
  notes: string | null;
  due_date: string | null;
  sent_at: string | null;
  paid_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  location: string;
  vehicle: string;
  serviceType: string;
  preferredTime: string;
  notes: string;
}

export interface SOSFormData {
  phone: string;
  location: string;
  serviceType: string;
  notes: string;
}

export type InvoiceStatus = Invoice['status'];
