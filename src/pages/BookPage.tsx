import { useState } from 'react';
import { SERVICES } from '@/lib/constants';
import { submitBooking } from '@/lib/api';
import { useGeolocation } from '@/hooks/useGeolocation';
import type { BookingFormData } from '@/lib/types';

const inputClass =
  'w-full rounded-xl border border-border bg-surface-elevated px-3.5 py-2.5 text-sm outline-none transition focus:border-amber/50 focus:ring-1 focus:ring-amber/30';

export function BookPage() {
  const { location, setLocation, detect, loading: geoLoading, error: geoError } = useGeolocation();
  const [form, setForm] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    location: '',
    vehicle: '',
    serviceType: SERVICES[0].name,
    preferredTime: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: keyof BookingFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitBooking({ ...form, location: form.location || location });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
        <p className="text-3xl">✓</p>
        <h2 className="mt-2 text-lg font-bold">Booking Received!</h2>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll contact you shortly to confirm your appointment.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-amber"
        >
          Book another service
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">Book a Service</h1>
        <p className="mt-1 text-sm text-muted">
          Schedule mobile roadside service in the Marietta area.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Full Name *</label>
          <input required className={inputClass} value={form.name} onChange={(e) => update('name', e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Phone *</label>
          <input required type="tel" className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Email</label>
          <input type="email" className={inputClass} value={form.email} onChange={(e) => update('email', e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Your Location *</label>
          <div className="flex gap-2">
            <input
              required
              className={inputClass}
              placeholder="Address or cross streets in Marietta area"
              value={form.location || location}
              onChange={(e) => {
                update('location', e.target.value);
                setLocation(e.target.value);
              }}
            />
            <button
              type="button"
              onClick={detect}
              disabled={geoLoading}
              className="shrink-0 rounded-xl border border-border px-3 text-xs text-amber"
            >
              {geoLoading ? '...' : 'GPS'}
            </button>
          </div>
          {geoError && <p className="mt-1 text-xs text-danger">{geoError}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Vehicle</label>
          <input className={inputClass} placeholder="e.g. 2019 Honda Accord" value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Service Type *</label>
          <select required className={inputClass} value={form.serviceType} onChange={(e) => update('serviceType', e.target.value)}>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Preferred Time</label>
          <input className={inputClass} placeholder="e.g. Today 3pm, ASAP" value={form.preferredTime} onChange={(e) => update('preferredTime', e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Notes</label>
          <textarea className={`${inputClass} min-h-[80px] resize-none`} value={form.notes} onChange={(e) => update('notes', e.target.value)} />
        </div>

        {status === 'error' && (
          <p className="text-sm text-danger">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-xl bg-amber py-3 text-sm font-semibold text-surface transition hover:bg-amber-dim disabled:opacity-50"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Booking Request'}
        </button>
      </form>
    </div>
  );
}
