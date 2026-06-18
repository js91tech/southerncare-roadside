const stats = [
  { value: '24/7', label: 'Always open' },
  { value: '~30m', label: 'Avg response' },
  { value: '8+', label: 'Services' },
  { value: 'GA', label: 'Marietta area' },
];

export function StatsBar() {
  return (
    <div className="animate-fade-up grid grid-cols-4 gap-2 rounded-2xl border border-amber/20 bg-gradient-to-r from-amber/10 via-surface-card to-surface-elevated p-3">
      {stats.map((s) => (
        <div key={s.label} className="text-center">
          <p className="text-base font-bold text-amber">{s.value}</p>
          <p className="text-[10px] leading-tight text-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
