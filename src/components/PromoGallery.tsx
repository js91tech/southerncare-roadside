import { PROMO_GALLERY } from '@/lib/constants';

export function PromoGallery() {
  return (
    <section className="animate-fade-up space-y-3" style={{ animationDelay: '100ms' }}>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold">What We Do</h2>
          <p className="text-xs text-muted">Mobile service — at your home, work, or roadside</p>
        </div>
      </div>

      <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-none">
        {PROMO_GALLERY.map((item) => (
          <figure
            key={item.id}
            className="snap-center shrink-0 w-[72%] max-w-[280px] overflow-hidden rounded-2xl border border-border/50 shadow-lg"
          >
            <div className="relative h-44">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <figcaption className="absolute bottom-0 p-4">
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-0.5 text-xs text-slate-300">{item.caption}</p>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
