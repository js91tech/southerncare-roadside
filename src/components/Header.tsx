import { Link } from 'react-router-dom';
import { BRAND } from '@/lib/constants';

export function Header({ minimal = false }: { minimal?: boolean }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber/15 ring-1 ring-amber/30">
            <span className="text-sm font-bold text-amber">SC</span>
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">{BRAND.shortName}</p>
            {!minimal && (
              <p className="text-[11px] text-muted leading-tight">Marietta, GA</p>
            )}
          </div>
        </Link>
        <a
          href={`tel:${BRAND.phoneTel}`}
          className="flex items-center gap-1.5 rounded-full bg-amber px-3 py-1.5 text-xs font-semibold text-surface transition hover:bg-amber-dim"
        >
          Call Now
        </a>
      </div>
    </header>
  );
}
