import { Link } from 'react-router-dom';
import { SERVICES } from '@/lib/constants';
import { ServiceCard } from '@/components/ServiceCard';

export function ServicesPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold">Our Services</h1>
        <p className="mt-1 text-sm text-muted">
          Full mobile roadside and mechanic services in the Marietta area.
        </p>
      </div>
      <div className="grid gap-3">
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </div>
      <div className="rounded-2xl border border-amber/20 bg-amber/5 p-4 text-center">
        <p className="text-sm font-medium">Need help right now?</p>
        <Link to="/sos" className="mt-2 inline-block text-sm font-semibold text-danger">
          Tap Emergency SOS →
        </Link>
      </div>
    </div>
  );
}
