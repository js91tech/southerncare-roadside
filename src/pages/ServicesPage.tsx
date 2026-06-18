import { Link } from 'react-router-dom';
import { BRAND, SERVICES } from '@/lib/constants';
import { ServiceCard } from '@/components/ServiceCard';

export function ServicesPage() {
  return (
    <div className="space-y-6">
      <section className="relative overflow-hidden rounded-2xl border border-border/50">
        <img
          src="/images/tire.png"
          alt="Mobile mechanic services"
          className="h-36 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
        <div className="absolute bottom-0 p-5">
          <h1 className="text-2xl font-bold">Our Services</h1>
          <p className="mt-1 text-sm text-slate-300">
            Full mobile roadside & mechanic — Marietta, GA
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} {...s} variant="featured" />
        ))}
      </div>

      <div className="rounded-2xl border border-danger/30 bg-danger/10 p-5 text-center">
        <p className="text-sm font-semibold">Need help right now?</p>
        <p className="mt-1 text-xs text-muted">Emergency dispatch available 24/7</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link
            to="/sos"
            className="rounded-xl bg-danger px-5 py-2.5 text-sm font-bold text-white"
          >
            Emergency SOS
          </Link>
          <a
            href={`tel:${BRAND.phoneTel}`}
            className="rounded-xl border border-danger/40 px-5 py-2.5 text-sm font-semibold text-danger"
          >
            {BRAND.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
