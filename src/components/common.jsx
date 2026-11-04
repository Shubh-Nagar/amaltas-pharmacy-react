import { HashLink } from '../lib/router.jsx';
import Img from './Img.jsx';
import { useLightbox } from './Lightbox.jsx';
import localPhotos from '../data/localPhotos.json';
import Icon from './Icons.jsx';

export const Arrow = ({ size = 16, w = 2.4 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Ext = (props) => <a target="_blank" rel="noopener" {...props} />;

/** Green page header band with breadcrumb and optional sub-navigation. */
export function Band({ crumb, title, text, sub }) {
  return (
    <div className="band">
      <div className="wrap">
        <div className="crumb">
          <a href="#home"><Icon name="home" size={14} stroke={2.2} style={{ verticalAlign: '-2px', marginRight: 4 }} />Home</a>
          {crumb.map((c, i) => (
            <span key={i}>
              {' / '}
              {c.href ? <a href={c.href}>{c.label}</a> : c}
            </span>
          ))}
        </div>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {sub && (
          <div className="sub">
            {sub.map((s) => (
              <HashLink key={s.href} href={s.href}>{s.label}</HashLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Image that opens the lightbox when clicked. */
export function ZoomImg(props) {
  const { openFromClick } = useLightbox();
  return <Img className="zoom" onClick={openFromClick} {...props} />;
}

/* ---------- event helpers ---------- */

/** Photos stored in /public for an event, or null. */
export function localPhotosFor(ev) {
  return ev.image && ev.image.startsWith('local:') ? localPhotos[ev.image.slice(6)] : null;
}

/** "22 & 23 Jan 2026" -> { d: "22–23", m: "Jan", y: "2026" } */
export function parseDate(d) {
  const m = d.match(/^(.*?)\s+([A-Za-z]{3})\s+(\d{4})$/);
  return m ? { d: m[1].replace(/\s*&\s*/, '–'), m: m[2], y: m[3] } : { d, m: '', y: '' };
}

export const shortTitle = (t) => t.split(' | ')[0];

export function DateBadge({ p }) {
  return (
    <span className="dc">
      <b className={p.d.length > 3 ? 'l' : undefined}>{p.d}</b>
      <span>{p.m}</span>
    </span>
  );
}

export function EventPic({ ev }) {
  const local = localPhotosFor(ev);
  if (local) return <img src={import.meta.env.BASE_URL.replace(/\/$/, '') + local[0]} alt={ev.title} loading="lazy" decoding="async" />;
  if (ev.image) return <Img path={ev.image} alt={ev.title} />;
  return (
    <span className="np" role="img" aria-label="Photos coming soon">
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-35 12 12)" />
        <path d="M9.5 8.2l5 7" transform="rotate(-35 12 12)" />
      </svg>
    </span>
  );
}

/** Validates name + 10-digit phone. Returns { ok, errors }. */
export function validateEnquiry(name, phone) {
  const errors = {
    name: name.trim() ? '' : 'Enter your name.',
    phone: phone.replace(/\D/g, '').length >= 10 ? '' : 'Enter a 10-digit phone number.',
  };
  return { ok: !errors.name && !errors.phone, errors };
}
