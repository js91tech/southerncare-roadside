import { useState } from 'react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

export function InstallPrompt() {
  const { canInstall, isInstalled, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem('pwa-dismissed') === '1',
  );
  const [showIOS, setShowIOS] = useState(false);

  if (isInstalled || dismissed) return null;
  if (!canInstall && !isIOS) return null;

  const handleInstall = async () => {
    if (isIOS) {
      setShowIOS(true);
      return;
    }
    await install();
  };

  const dismiss = () => {
    localStorage.setItem('pwa-dismissed', '1');
    setDismissed(true);
  };

  return (
    <div className="no-print fixed inset-x-4 bottom-20 z-40 mx-auto max-w-lg">
      <div className="rounded-2xl border border-border bg-surface-elevated p-4 shadow-2xl">
        {showIOS ? (
          <div className="space-y-3">
            <p className="text-sm font-semibold">Install on iPhone (Safari)</p>
            <ol className="space-y-2 text-xs text-muted">
              <li>1. Tap the Share button at the bottom of Safari</li>
              <li>2. Scroll and tap &quot;Add to Home Screen&quot;</li>
              <li>3. Tap &quot;Add&quot; — SouthernCare appears on your home screen</li>
            </ol>
            <button onClick={dismiss} className="text-xs text-amber">
              Got it
            </button>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-sm font-semibold">Add to Home Screen</p>
              <p className="mt-0.5 text-xs text-muted">
                Instant access · Works offline · Free to install
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <button
                onClick={handleInstall}
                className="rounded-lg bg-amber px-3 py-1.5 text-xs font-semibold text-surface"
              >
                Install
              </button>
              <button onClick={dismiss} className="text-[11px] text-muted">
                Not now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
