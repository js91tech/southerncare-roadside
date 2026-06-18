import { Link } from 'react-router-dom';
import { ServiceIcon } from './Icons';

interface ServiceCardProps {
  name: string;
  description: string;
  icon: 'tire' | 'battery' | 'lock' | 'fuel' | 'bolt' | 'oil' | 'brake' | 'road';
  priceFrom: number;
  image?: string;
  variant?: 'compact' | 'featured';
  href?: string;
}

export function ServiceCard({
  name,
  description,
  icon,
  priceFrom,
  image,
  variant = 'compact',
  href,
}: ServiceCardProps) {
  if (variant === 'featured' && image) {
    const inner = (
      <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface-card shadow-lg transition hover:border-amber/40 hover:shadow-amber/10">
        <div className="relative h-40 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
          <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber/90 text-surface shadow-lg">
            <ServiceIcon name={icon} className="h-5 w-5" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold">{name}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted line-clamp-2">{description}</p>
          <p className="mt-3 text-sm font-bold text-amber">From ${priceFrom}</p>
        </div>
      </article>
    );
    return href ? <Link to={href}>{inner}</Link> : inner;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/80 bg-surface-card transition hover:border-amber/30">
      {image && (
        <div className="h-28 overflow-hidden">
          <img src={image} alt="" className="h-full w-full object-cover opacity-80" loading="lazy" />
        </div>
      )}
      <div className="flex items-start gap-3 p-4">
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
