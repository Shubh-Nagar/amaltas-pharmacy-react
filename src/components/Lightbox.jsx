import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const LightboxCtx = createContext({ openFromClick: () => {} });
export const useLightbox = () => useContext(LightboxCtx);

/**
 * Provides a photo viewer. Any <img className="zoom"> can call openFromClick(e):
 * the viewer collects all .zoom images in the same gallery group (.gal, .mosaic, #evdg).
 */
export function LightboxProvider({ children }) {
  const ref = useRef(null);
  const [list, setList] = useState([]);
  const [idx, setIdx] = useState(0);

  const openFromClick = useCallback((e) => {
    const t = e.currentTarget;
    if (!t.src) return;
    const group = t.closest('.gal,.mosaic,#evdg');
    const imgs = group ? [...group.querySelectorAll('img.zoom')] : [t];
    setList(imgs.map((i) => ({ src: i.currentSrc || i.src, alt: i.alt })));
    setIdx(Math.max(0, imgs.indexOf(t)));
    ref.current?.showModal();
  }, []);

  const go = useCallback((n) => setIdx((i) => (i + n + list.length) % list.length), [list.length]);

  useEffect(() => {
    const onKey = (e) => {
      if (!ref.current?.open) return;
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [go]);

  const cur = list[idx];
  const many = list.length > 1;

  return (
    <LightboxCtx.Provider value={{ openFromClick }}>
      {children}
      <dialog id="lb" ref={ref} onClick={(e) => e.target === ref.current && ref.current.close()}>
        {cur && <img id="lbi" src={cur.src} alt={cur.alt} />}
        <div className="lbc">
          {many && <button className="btn" type="button" onClick={() => go(-1)}>Prev</button>}
          <span>{list.length ? `${idx + 1} / ${list.length}` : ''}</span>
          {many && <button className="btn" type="button" onClick={() => go(1)}>Next</button>}
          <button className="btn dk" type="button" onClick={() => ref.current.close()}>Close</button>
        </div>
      </dialog>
    </LightboxCtx.Provider>
  );
}
