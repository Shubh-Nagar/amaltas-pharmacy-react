import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import EVENTS from '../data/events.json';
import FACULTY from '../data/faculty.json';
import { useEventModal } from './EventModal.jsx';

const QUICK = [
  ['Admission & courses', '#admission'],
  ['Syllabus', '#syllabus'],
  ['Teaching faculty', '#faculty'],
  ['Infrastructure & facilities', '#facilities'],
  ['Contact and enquiry', '#contact'],
];

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Build the index once: text of every page (rendered to static markup), all events and faculty. */
function buildIndex(routes) {
  const idx = [];
  Object.entries(routes).forEach(([id, r]) => {
    if (id === 'home') return;
    let text = '';
    try {
      const div = document.createElement('div');
      div.innerHTML = renderToStaticMarkup(<r.Component />).replace(/></g, '> <');
      text = div.textContent.replace(/\s+/g, ' ').trim();
    } catch { /* ignore pages that cannot render statically */ }
    idx.push({ t: r.title, h: '#' + id, x: text, g: 'Page' });
  });
  EVENTS.forEach((e, n) => idx.push({ t: e.title, h: '#events', x: e.date + ' ' + e.details.join(' '), ev: n, g: 'Event', d: e.date }));
  FACULTY.forEach((f) => idx.push({ t: f.name, h: '#faculty', x: f.designation, g: 'Faculty', d: f.designation }));
  return idx;
}

function snippet(item, q) {
  let s = item.d || '';
  const k = item.x.toLowerCase().indexOf(q);
  if (!item.d && k > -1) s = (k > 40 ? '…' : '') + item.x.slice(Math.max(0, k - 40), k + 90) + '…';
  s = esc(s);
  if (q) s = s.replace(new RegExp('(' + reEsc(esc(q)) + ')', 'ig'), '<mark>$1</mark>');
  return item.g + (s ? ' · ' + s : '');
}

const SearchDialog = forwardRef(function SearchDialog({ routes }, ref) {
  const dlg = useRef(null);
  const input = useRef(null);
  const [q, setQ] = useState('');
  const [index, setIndex] = useState(null);
  const { openEvent } = useEventModal();

  useImperativeHandle(ref, () => ({
    open() {
      if (dlg.current.open) return;
      if (!index) setIndex(buildIndex(routes));
      setQ('');
      dlg.current.showModal();
      setTimeout(() => input.current?.focus(), 0);
    },
  }));

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s || !index) return null;
    return index
      .map((i) => [i.t.toLowerCase().includes(s) ? 2 : i.x.toLowerCase().includes(s) ? 1 : 0, i])
      .filter((r) => r[0])
      .sort((a, b) => b[0] - a[0])
      .slice(0, 8)
      .map((r) => r[1]);
  }, [q, index]);

  const close = () => dlg.current.close();
  const pick = (e, item) => {
    close();
    if (item.ev !== undefined) { e.preventDefault(); openEvent(item.ev); }
  };

  return (
    <dialog id="sr" ref={dlg} aria-label="Site search" onClick={(e) => e.target === dlg.current && close()}>
      <div className="srh">
        <input
          ref={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Escape') { e.preventDefault(); close(); } }}
          type="search"
          placeholder="Search courses, faculty, events, fees..."
          autoComplete="off"
          aria-label="Search"
        />
        <button className="ib" type="button" onClick={close}>Esc</button>
      </div>
      <ul id="sl">
        {!results && (
          <>
            <li className="hd">Quick links</li>
            {QUICK.map(([t, h]) => <li key={h}><a href={h} onClick={close}><b>{t}</b></a></li>)}
          </>
        )}
        {results && !results.length && <li className="no">No result for &ldquo;{q.trim()}&rdquo;. Try another word.</li>}
        {results && results.map((i, n) => (
          <li key={n}>
            <a href={i.h} onClick={(e) => pick(e, i)}>
              <b>{i.t}</b>
              <span dangerouslySetInnerHTML={{ __html: snippet(i, q.trim().toLowerCase()) }} />
            </a>
          </li>
        ))}
      </ul>
    </dialog>
  );
});

export default SearchDialog;
