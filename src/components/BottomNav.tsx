import { NavLink } from 'react-router-dom';
import { IconCalendar, IconGrid, IconHome, IconPhone, IconSOS } from './Icons';
import { BRAND } from '@/lib/constants';

const navItems = [
  { to: '/', label: 'Home', icon: IconHome },
  { to: '/services', label: 'Services', icon: IconGrid },
  { to: '/book', label: 'Book', icon: IconCalendar },
  { to: '/sos', label: 'SOS', icon: IconSOS, danger: true },
  { to: `tel:${BRAND.phoneTel}`, label: 'Call', icon: IconPhone, external: true },
];

export function BottomNav() {
  return (
    <nav className="no-print fixed bottom-0 left-0 right-0 z-50 border-t border-border/60 bg-surface-elevated/95 backdrop-blur-md safe-bottom">
      <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 pt-1 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          if (item.external) {
            return (
              <a
                key={item.label}
                href={item.to}
                className="flex flex-1 flex-col items-center gap-0.5 py-1 text-muted transition hover:text-amber"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </a>
            );
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-1 transition ${
                  item.danger
                    ? isActive
                      ? 'text-danger'
                      : 'text-danger/70 hover:text-danger'
                    : isActive
                      ? 'text-amber'
                      : 'text-muted hover:text-amber'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
