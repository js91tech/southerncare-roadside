import type { BookingFormData, SOSFormData } from './types';
import { supabase } from './supabase';

async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`/.netlify/functions/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? 'Request failed');
  return data as T;
}

export async function submitBooking(data: BookingFormData) {
  if (supabase) {
    const { error } = await supabase.from('bookings').insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      location: data.location,
      vehicle: data.vehicle || null,
      service_type: data.serviceType,
      preferred_time: data.preferredTime || null,
      notes: data.notes || null,
    });
    if (error) console.warn('Supabase booking insert failed:', error.message);
  }

  return postJson<{ ok: boolean }>('submit-booking', data);
}

export async function submitSOS(data: SOSFormData) {
  if (supabase) {
    const { error } = await supabase.from('sos_requests').insert({
      phone: data.phone,
      location: data.location,
      service_type: data.serviceType,
      notes: data.notes || null,
    });
    if (error) console.warn('Supabase SOS insert failed:', error.message);
  }

  return postJson<{ ok: boolean }>('submit-sos', data);
}

export async function sendInvoiceEmail(invoiceId: string, accessToken: string) {
  return postJson<{ ok: boolean }>('send-invoice', { invoiceId, accessToken });
}
