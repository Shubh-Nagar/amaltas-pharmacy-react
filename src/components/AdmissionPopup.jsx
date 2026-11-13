import { useEffect, useRef } from 'react';
import { useRoute, useRouteLoading } from '../lib/router.jsx';

const POSTER = import.meta.env.BASE_URL.replace(/\/$/, '') + '/images/admission-2026-27.jpg';

/**
 * Admission 2026-27 poster shown every time the home page is opened
 * (first load, refresh, or navigating back to Home), after the page loader finishes.
 * Clicking the poster goes to #admission.
 */
export default function AdmissionPopup() {
  const ref = useRef(null);
  const route = useRoute();
  const loading = useRouteLoading();

  useEffect(() => {
    if (route !== 'home') { ref.current?.close(); return; }
    if (loading) return;
    const t = setTimeout(() => {
      if (ref.current && !ref.current.open) ref.current.showModal();
    }, 700);
    return () => clearTimeout(t);
  }, [route, loading]);

  const close = () => ref.current?.close();

  return (
    <dialog
      id="admpop"
      ref={ref}
      aria-label="Admissions open 2026-27"
      onClick={(e) => e.target === ref.current && close()}
    >
      <button className="admpop-x" type="button" onClick={close} aria-label="Close">×</button>
      <a href="#admission" onClick={close}>
        <img
          src={POSTER}
          width="1200"
          height="1500"
          alt="Admission open 2026-27 at Amaltas Institute of Pharmacy: B.Pharm and D.Pharm courses. Enquiry: 78801 54607, 96850 96514, 97555 59915."
        />
      </a>
    </dialog>
  );
}
