import { Link } from 'react-router-dom';
import { BRAND, SERVICE_AREAS, SERVICES } from '@/lib/constants';
import { ServiceCard } from '@/components/ServiceCard';

export function HomePage() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-surface-card via-surface-elevated to-surface p-6">
        <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-amber/5 blur-2xl" />
        <p className="text-xs font-medium uppercase tracking-widest text-amber">24/7 Emergency Service</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight">
          Mobile Roadside Help in <span className="text-amber">Marietta, GA</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {BRAND.name} brings tire repair, jump starts, lockouts, and full roadside assistance
          directly to you — no tow truck wait.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/sos"
            className="inline-flex items-center gap-2 rounded-xl bg-danger px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-danger/20 transition hover:bg-danger-dim"
          >
            Emergency SOS
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-xl bg-amber px-4 py-2.5 text-sm font-semibold text-surface transition hover:bg-amber-dim"
          >
            Book a Service
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Our Services</h2>
        <div className="grid gap-3">
          {SERVICES.slice(0, 4).map((s) => (
            <ServiceCard key={s.id} {...s} />
          ))}
        </div>
        <Link to="/services" className="mt-3 block text-center text-sm font-medium text-amber">
          View all services →
        </Link>
      </section>

      <section className="rounded-2xl border border-border/60 bg-surface-card p-5">
        <h2 className="text-sm font-semibold">Service Area</h2>
        <p className="mt-1 text-xs text-muted">Proudly serving Marietta and surrounding communities:</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SERVICE_AREAS.map((area) => (
            <span
              key={area}
              className="rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs text-muted"
            >
              {area}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-surface-card p-5">
        <h2 className="text-sm font-semibold">Why SouthernCare?</h2>
        <ul className="mt-3 space-y-2.5 text-sm text-muted">
          <li className="flex gap-2">
            <span className="text-amber">✓</span> Average 30-minute response in Marietta area
          </li>
          <li className="flex gap-2">
            <span className="text-amber">✓</span> Licensed & insured mobile technicians
          </li>
          <li className="flex gap-2">
            <span className="text-amber">✓</span> Upfront pricing — no hidden fees
          </li>
          <li className="flex gap-2">
            <span className="text-amber">✓</span> Available 24 hours a day, 7 days a week
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">What Customers Say</h2>
        {[
          { name: 'James R.', text: 'Flat tire at 11pm in East Cobb — they were there in 25 minutes. Lifesavers!' },
          { name: 'Maria T.', text: 'Professional, fair pricing, and super friendly. Highly recommend.' },
        ].map((t) => (
          <blockquote
            key={t.name}
            className="rounded-2xl border border-border/40 bg-surface-elevated p-4"
          >
            <p className="text-sm italic text-muted">&ldquo;{t.text}&rdquo;</p>
            <footer className="mt-2 text-xs font-medium text-amber">— {t.name}</footer>
          </blockquote>
        ))}
      </section>
    </div>
  );
}
