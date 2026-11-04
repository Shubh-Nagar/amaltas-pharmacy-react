import { useEffect, useState } from 'react';
import { useRouteLoading } from '../lib/router.jsx';

/**
 * Full-screen "Amaltas Pharmacy" loader shown on first visit and between pages.
 * Stays mounted while fading out so the exit animation can play.
 */
export default function PageLoader() {
  const loading = useRouteLoading();
  const [mounted, setMounted] = useState(loading);

  useEffect(() => {
    if (loading) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(false), 600);
    return () => clearTimeout(t);
  }, [loading]);

  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', loading);
  }, [loading]);

  if (!mounted) return null;

  return (
    <div className={'pldr' + (loading ? ' on' : '')} role="status" aria-live="polite" aria-label="Loading page">
      <div className="pl-in">
        <div className="pl-mark" aria-hidden="true">
          <svg className="pl-ring" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" />
            <circle className="pl-arc" cx="60" cy="60" r="54" />
          </svg>
          <div className="pl-cap">
            <span className="pl-h a" />
            <span className="pl-h b" />
          </div>
          <i className="pl-dot d1" /><i className="pl-dot d2" /><i className="pl-dot d3" />
        </div>
        <div className="pl-txt">
          <b>Amaltas</b>
          <span>Institute of Pharmacy</span>
        </div>
        <div className="pl-bar"><i /></div>
      </div>
    </div>
  );
}
