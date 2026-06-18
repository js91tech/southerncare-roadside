import { ServiceIcon } from './Icons';

interface ServiceCardProps {
  name: string;
  description: string;
  icon: 'tire' | 'battery' | 'lock' | 'fuel' | 'bolt' | 'oil' | 'brake' | 'road';
  priceFrom: number;
}

export function ServiceCard({ name, description, icon, priceFrom }: ServiceCardProps) {
  return (
    <div className="rounded-2xl border border-border/80 bg-surface-card p-4 transition hover:border-amber/30">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber/10 text-amber">
          <ServiceIcon name={icon} className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold">{name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted">{description}</p>
          <p className="mt-2 text-xs font-medium text-amber">From ${priceFrom}</p>
        </div>
      </div>
    </div>
  );
}
