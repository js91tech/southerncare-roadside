import { Link } from 'react-router-dom';
import { BRAND, HERO_IMAGE } from '@/lib/constants';
import { IconPhone } from './Icons';

export function Hero() {
  return (
    <section className="animate-fade-up relative overflow-hidden rounded-3xl border border-border/50 shadow-2xl">
      <img
        src={HERO_IMAGE}
        alt="Roadside assistance"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-surface/95 via-surface/80 to-surface/50" />
      <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-amber/20 blur-3xl" />

      <div className="relative p-6 pb-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
          24/7 Emergency Service
        </div>

        <h1 className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight">
          Roadside help,{' '}
          <span className="bg-gradient-to-r from-amber to-amber-dim bg-clip-text text-transparent">
            on your schedule
          </span>
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-300">
          {BRAND.name} brings tire repair, jump starts, lockouts, and full roadside assistance
          to <strong className="text-white">Marietta, GA</strong> — we come to you.
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">
          <Link
            to="/sos"
            className="inline-flex items-center gap-2 rounded-xl bg-danger px-5 py-3 text-sm font-bold text-white shadow-lg shadow-danger/30 transition hover:scale-[1.02] hover:bg-danger-dim"
          >
            Emergency SOS
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-3 text-sm font-bold text-surface shadow-lg shadow-amber/20 transition hover:scale-[1.02] hover:bg-amber-dim"
          >
            Book a Service
          </Link>
        </div>

        <a
          href={`tel:${BRAND.phoneTel}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-amber transition hover:text-white"
        >
          <IconPhone className="h-4 w-4" />
          {BRAND.phone}
        </a>
      </div>
    </section>
  );
}
