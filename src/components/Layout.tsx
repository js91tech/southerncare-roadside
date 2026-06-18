import { Link } from 'react-router-dom';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { InstallPrompt } from './InstallPrompt';
import { Footer } from './Footer';

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-surface pb-24">
      <Header />
      <main className="mx-auto max-w-lg px-4 py-5">
        {children}
        <Footer />
      </main>
      <BottomNav />
      <InstallPrompt />
    </div>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-surface">
      <header className="border-b border-border/60 bg-surface-elevated">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link to="/admin" className="text-sm font-semibold">
            SouthernCare Admin
          </Link>
          <Link to="/" className="text-xs text-muted hover:text-amber">
            ← Back to site
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
    </div>
  );
}
