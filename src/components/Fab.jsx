import { useEffect, useState } from 'react';
import { CONTACT } from '../config.js';
import Icon from './Icons.jsx';

const WA_TEXT = 'Hello, I want to know about admission at Amaltas Institute of Pharmacy';
const R = 20;
const CIRC = 2 * Math.PI * R;

/** Floating WhatsApp + back-to-top buttons. The back-to-top ring shows how far down the page you are. */
export default function Fab() {
  const [show, setShow] = useState(false);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const h = document.documentElement.scrollHeight - innerHeight;
        setShow(y > 600);
        setPct(h > 0 ? Math.min(1, y / h) : 0);
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="fab">
      <button className={'up' + (show ? ' on' : '')} type="button" aria-label="Back to top" title="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <svg className="up-ring" viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r={R} />
          <circle className="up-prog" cx="24" cy="24" r={R} strokeDasharray={CIRC} strokeDashoffset={CIRC * (1 - pct)} />
        </svg>
        <Icon name="arrowUp" size={18} stroke={2.4} />
      </button>
      <a className="wa" href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(WA_TEXT)}`} target="_blank" rel="noopener">
        <Icon name="whatsapp" size={20} />
        <span>WhatsApp us</span>
      </a>
    </div>
  );
}
