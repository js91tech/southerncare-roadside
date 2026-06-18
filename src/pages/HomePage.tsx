import { Link } from 'react-router-dom';
import { BRAND, HERO_IMAGE, SERVICE_AREAS, SERVICES } from '@/lib/constants';
import { ServiceCard } from '@/components/ServiceCard';
import { Hero } from '@/components/Hero';
import { PromoGallery } from '@/components/PromoGallery';
import { StatsBar } from '@/components/StatsBar';

export function HomePage() {
  return (
    <div className="space-y-8">
      <Hero />
      <StatsBar />
      <PromoGallery />

      <section className="animate-fade-up space-y-3">
        <h2 className="text-lg font-bold">Popular Services</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICES.slice(0, 4).map((s) => (
            <ServiceCard key={s.id} {...s} variant="featured" />
          ))}
        </div>
        <Link
          to="/services"
          className="flex items-center justify-center gap-1 rounded-xl border border-border/60 bg-surface-elevated py-3 text-sm font-semibold text-amber transition hover:border-amber/40 hover:bg-amber/5"
        >
          View all services →
        </Link>
      </section>

      <section className="animate-fade-up overflow-hidden rounded-2xl border border-border/60 bg-surface-card">
        <div className="relative h-32">
          <img
            src={HERO_IMAGE}
            alt="Marietta service area"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-surface/70" />
          <div className="absolute inset-0 flex flex-col justify-center p-5">
            <h2 className="text-sm font-semibold">Serving Marietta & North Metro</h2>
            <p className="mt-1 text-xs text-muted">Fast response across Cobb County and beyond</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 p-4">
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

      <section className="animate-fade-up rounded-2xl border border-border/60 bg-gradient-to-br from-surface-card to-surface-elevated p-5">
        <h2 className="text-lg font-bold">Why SouthernCare?</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { title: 'Fast arrival', desc: '~30 min average in Marietta area' },
            { title: 'Licensed & insured', desc: 'Professional mobile technicians' },
            { title: 'Upfront pricing', desc: 'No hidden fees or surprises' },
            { title: 'Always available', desc: '24 hours a day, 7 days a week' },
          ].map((item) => (
            <li
              key={item.title}
              className="rounded-xl border border-border/40 bg-surface/50 p-3"
            >
              <p className="text-sm font-semibold text-amber">{item.title}</p>
              <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="animate-fade-up space-y-3">
        <h2 className="text-lg font-bold">Customer Reviews</h2>
        {[
          {
            name: 'James R.',
            area: 'East Cobb',
            text: 'Flat tire at 11pm — they were there in 25 minutes. Lifesavers!',
          },
          {
            name: 'Maria T.',
            area: 'Marietta',
            text: 'Professional, fair pricing, and super friendly. Highly recommend.',
          },
        ].map((t) => (
          <blockquote
            key={t.name}
            className="rounded-2xl border border-border/40 bg-surface-elevated p-4"
          >
            <div className="flex gap-1 text-amber text-sm">★★★★★</div>
            <p className="mt-2 text-sm italic text-slate-300">&ldquo;{t.text}&rdquo;</p>
            <footer className="mt-2 text-xs font-medium text-muted">
              — {t.name}, {t.area}
            </footer>
          </blockquote>
        ))}
      </section>

      <section className="animate-fade-up rounded-2xl border border-amber/30 bg-gradient-to-r from-amber/15 to-amber/5 p-5 text-center">
        <p className="text-sm font-semibold">Ready when you need us</p>
        <p className="mt-1 text-xs text-muted">Call or book — we&apos;ll come to you</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a
            href={`tel:${BRAND.phoneTel}`}
            className="rounded-xl bg-amber px-5 py-2.5 text-sm font-bold text-surface"
          >
            {BRAND.phone}
          </a>
          <Link to="/book" className="rounded-xl border border-amber/50 px-5 py-2.5 text-sm font-semibold text-amber">
            Book Online
          </Link>
        </div>
      </section>
    </div>
  );
}
