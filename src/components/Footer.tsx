import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="no-print mt-8 border-t border-border/40 pt-6 text-center">
      <Link to="/contact" className="text-xs text-muted hover:text-amber">
        Contact & Service Area
      </Link>
      <p className="mt-2 text-[10px] text-muted/60">
        © {new Date().getFullYear()} SouthernCare Roadside · Marietta, GA
      </p>
      <Link to="/admin/login" className="mt-1 block text-[10px] text-muted/40 hover:text-muted">
        Admin
      </Link>
    </footer>
  );
}
