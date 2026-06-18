import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRAND, SERVICES } from '@/lib/constants';
import { submitSOS } from '@/lib/api';
import { useGeolocation } from '@/hooks/useGeolocation';
import type { SOSFormData } from '@/lib/types';

const inputClass =
  'w-full rounded-xl border border-border bg-surface-elevated px-3.5 py-2.5 text-sm outline-none transition focus:border-danger/50 focus:ring-1 focus:ring-danger/30';

export function SOSPage() {
  const { location, setLocation, detect, loading: geoLoading, error: geoError } = useGeolocation();
  const [form, setForm] = useState<SOSFormData>({
    phone: '',
    location: '',
    serviceType: 'Emergency — Not Sure',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const update = (field: keyof SOSFormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitSOS({ ...form, location: form.location || location });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
        <p className="text-3xl">🚨</p>
        <h2 className="mt-2 text-lg font-bold">Help is on the way!</h2>
        <p className="mt-2 text-sm text-muted">
          Your SOS request was sent. A technician will call you shortly.
        </p>
        <a href={`tel:${BRAND.phoneTel}`} className="mt-4 inline-block rounded-xl bg-danger px-6 py-2.5 text-sm font-semibold text-white">
          Call {BRAND.phone} Now
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-danger/30 bg-danger/10 p-5">
        <h1 className="text-xl font-bold text-danger">Emergency SOS</h1>
        <p className="mt-1 text-sm text-muted">
          Stranded in the Marietta area? Send your location and we&apos;ll dispatch help immediately.
        </p>
        <a
          href={`tel:${BRAND.phoneTel}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-danger py-3 text-sm font-bold text-white shadow-lg shadow-danger/25"
        >
          Call {BRAND.phone} — Fastest Response
        </a>
      </div>

      <p className="text-center text-xs text-muted">— or submit your details below —</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Your Phone *</label>
          <input required type="tel" className={inputClass} value={form.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Your Location *</label>
          <div className="flex gap-2">
            <input
              required
              className={inputClass}
              placeholder="Where are you right now?"
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
              className="shrink-0 rounded-xl border border-border px-3 text-xs text-danger"
            >
              {geoLoading ? '...' : 'GPS'}
            </button>
          </div>
          {geoError && <p className="mt-1 text-xs text-danger">{geoError}</p>}
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">What do you need? *</label>
          <select required className={inputClass} value={form.serviceType} onChange={(e) => update('serviceType', e.target.value)}>
            <option>Emergency — Not Sure</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.name}>{s.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Additional Details</label>
          <textarea className={`${inputClass} min-h-[80px] resize-none`} placeholder="e.g. On I-75 northbound, hazard lights on" value={form.notes} onChange={(e) => update('notes', e.target.value)} />
        </div>

        {status === 'error' && <p className="text-sm text-danger">{errorMsg}</p>}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-xl bg-danger py-3 text-sm font-bold text-white transition hover:bg-danger-dim disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending SOS...' : 'Send Emergency Request'}
        </button>
      </form>

      <p className="text-center text-xs text-muted">
        Prefer to book non-emergency? <Link to="/book" className="text-amber">Book a service</Link>
      </p>
    </div>
  );
}
