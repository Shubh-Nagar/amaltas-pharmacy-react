import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import EVENTS from '../data/events.json';
import { assetUrl, swapProtocol } from '../config.js';
import { localPhotosFor } from './common.jsx';
import { useLightbox } from './Lightbox.jsx';

const EventCtx = createContext({ openEvent: () => {} });
export const useEventModal = () => useContext(EventCtx);

/** Resolves true if the image loads (tries the other protocol once). */
function probe(url, retried = false) {
  return new Promise((resolve) => {
    const im = new Image();
    const t = setTimeout(() => resolve(false), 8000);
    im.onload = () => { clearTimeout(t); resolve(true); };
    im.onerror = () => {
      clearTimeout(t);
      const alt = swapProtocol(url);
      if (retried || alt === url) resolve(false);
      else probe(alt, true).then(resolve);
    };
    im.src = url;
  });
}

/**
 * Event folders on the server hold numbered photos (1.jpeg, 2.jpg, 3a.jpg ...).
 * We probe numbers in batches of 6 until a batch finds nothing.
 */
function useEventPhotos(ev, open) {
  const [photos, setPhotos] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!open || !ev) return;
    let cancelled = false;
    setPhotos([]);

    if (!ev.image) { setStatus('Photos for this event will be added soon.'); return; }

    const local = localPhotosFor(ev);
    if (local) {
      const base = import.meta.env.BASE_URL.replace(/\/$/, '');
      setPhotos(local.map((u) => base + u));
      setStatus('');
      return;
    }

    const m = ev.image.match(/^(.*\/)([^/]+)\.(\w+)$/);
    if (!m) { setPhotos([assetUrl(ev.image)]); return; }
    const [, dir, , ext] = m;
    const exts = [ext, ...['jpeg', 'jpg', 'png'].filter((x) => x !== ext)];
    const seen = new Set([ev.image]);
    setPhotos([assetUrl(ev.image)]);
    setStatus('Loading photos...');

    (async () => {
      for (let i = 1; i <= 80; i += 6) {
        const jobs = [];
        for (let n = i; n < i + 6; n++) {
          for (const x of exts) for (const sf of ['', 'a']) {
            const p = `${dir}${n}${sf}.${x}`;
            jobs.push(probe(assetUrl(p)).then((ok) => (ok ? [n, p] : null)));
          }
        }
        const found = (await Promise.all(jobs)).filter(Boolean).sort((a, b) => a[0] - b[0]);
        if (cancelled) return;
        const fresh = found.map((f) => f[1]).filter((p) => !seen.has(p));
        fresh.forEach((p) => seen.add(p));
        if (fresh.length) setPhotos((prev) => [...prev, ...fresh.map(assetUrl)]);
        if (!found.length) break;
      }
      if (!cancelled) setStatus('');
    })();

    return () => { cancelled = true; };
  }, [ev, open]);

  return { photos, status };
}

export function EventModalProvider({ children }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const { openFromClick } = useLightbox();
  const ev = index == null ? null : EVENTS[index];
  const { photos, status } = useEventPhotos(ev, open);

  const openEvent = useCallback((i) => {
    setIndex(i);
    setOpen(true);
    ref.current?.showModal();
  }, []);

  return (
    <EventCtx.Provider value={{ openEvent }}>
      {children}
      <dialog
        id="evd"
        ref={ref}
        aria-label="Event details"
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === ref.current && ref.current.close()}
      >
        {ev && (
          <>
            <div className="evh">
              <div>
                <time>{ev.date}</time>
                <h2>{ev.title}</h2>
              </div>
              <button className="btn dk" type="button" onClick={() => ref.current.close()}>Close</button>
            </div>
            <div className="prose">
              {ev.details.map((t, i) => <p key={i}>{t}</p>)}
            </div>
            <div className="gal tall" id="evdg">
              {photos.map((u) => (
                <img
                  key={u}
                  className="zoom"
                  src={u}
                  alt={ev.title}
                  loading="lazy"
                  decoding="async"
                  onClick={openFromClick}
                  onError={(e) => {
                    const im = e.currentTarget;
                    if (!im.dataset.r) { im.dataset.r = 1; im.src = swapProtocol(im.src); }
                  }}
                />
              ))}
            </div>
            <p className="lead">{status}</p>
          </>
        )}
      </dialog>
    </EventCtx.Provider>
  );
}
