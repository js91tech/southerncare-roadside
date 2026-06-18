import { BRAND, SERVICE_AREAS } from '@/lib/constants';
import { IconPhone } from '@/components/Icons';

export function ContactPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold">Contact Us</h1>
        <p className="mt-1 text-sm text-muted">Available 24/7 in the Marietta, GA area.</p>
      </div>

      <a
        href={`tel:${BRAND.phoneTel}`}
        className="flex items-center gap-4 rounded-2xl border border-amber/30 bg-amber/10 p-5 transition hover:bg-amber/15"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber text-surface">
          <IconPhone className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs text-muted">Call us anytime</p>
          <p className="text-lg font-bold text-amber">{BRAND.phone}</p>
        </div>
      </a>

      <div className="space-y-3 rounded-2xl border border-border/60 bg-surface-card p-5">
        <div>
          <p className="text-xs text-muted">Email</p>
          <a href={`mailto:${BRAND.email}`} className="text-sm font-medium text-amber">
            {BRAND.email}
          </a>
        </div>
        <div>
          <p className="text-xs text-muted">Address</p>
          <p className="text-sm">{BRAND.address}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Hours</p>
          <p className="text-sm">24 hours a day, 7 days a week</p>
        </div>
      </div>

      <div className="rounded-2xl border border-border/60 bg-surface-card p-5">
        <h2 className="text-sm font-semibold">Service Area</h2>
        <p className="mt-1 text-xs text-muted">Marietta and surrounding North Metro Atlanta:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICE_AREAS.map((area) => (
            <span key={area} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
              {area}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60">
        <iframe
          title="Marietta GA service area"
          src="https://maps.google.com/maps?q=Marietta,GA&z=11&output=embed"
          className="h-48 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
