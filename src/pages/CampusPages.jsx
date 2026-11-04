import { useMemo, useState } from 'react';
import EVENTS from '../data/events.json';
import FACILITIES from '../data/facilities.json';
import LABS from '../data/labs.json';
import GALLERY from '../data/gallery.json';
import { AWARDS_SUB } from '../data/nav.js';
import Img from '../components/Img.jsx';
import { Band, EventPic, ZoomImg } from '../components/common.jsx';
import Icon, { IconBox } from '../components/Icons.jsx';
import { useEventModal } from '../components/EventModal.jsx';

export function Facilities() {
  return (
    <>
      <Band crumb={['Facilities']} title="Infrastructure and facilities" text="A lush green campus with 24x7 security and good academic and residential facilities." />
      <section className="s">
        <div className="wrap">
          <h2 className="ih"><IconBox name="building" />Campus</h2>
          <div className="grid3" style={{ marginTop: 20 }}>
            {FACILITIES.map((f) => (
              <div key={f.title} className="card">
                <Img path={'assets/images/' + f.image} alt={f.title} />
                <div className="b"><h3>{f.title}</h3><p>{f.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="s alt">
        <div className="wrap two">
          <div className="prose">
            <h2 className="ih"><IconBox name="bus" />Transportation</h2>
            <ul className="tick">
              <li>University buses cover the important points in Indore, Dewas and Ujjain.</li>
              <li>Transport is available for industrial tours and visits.</li>
              <li>Regular transport facility is available.</li>
            </ul>
          </div>
          <div className="prose">
            <h2 className="ih"><IconBox name="utensils" />Canteen</h2>
            <ul className="tick">
              <li>Adequate, well furnished canteen with proper ventilation.</li>
              <li>Chillers and freezer facilities.</li>
              <li>RO and UV water with a water cooler.</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="s">
        <div className="wrap">
          <h2 className="ih"><IconBox name="flask" />Laboratories</h2>
          <p className="lead">Practical work across pharmaceutical sciences.</p>
          <div className="grid3">
            {LABS.map((l) => (
              <div key={l.title} className="card">
                <Img path={'assets/images/' + l.image} alt={l.title} />
                <div className="b"><h3 style={{ fontSize: 19 }}>{l.title}</h3></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const MONTHS = { Jan: 'january', Feb: 'february', Mar: 'march', Apr: 'april', May: 'may', Jun: 'june', Jul: 'july', Aug: 'august', Sep: 'september', Oct: 'october', Nov: 'november', Dec: 'december' };
const haystack = (e) => (e.date + ' ' + e.title + ' ' + (e.keywords || '') + ' ' + e.date.replace(/[A-Z][a-z]{2}/g, (m) => MONTHS[m] || m)).toLowerCase();
const YEARS = ['All', ...new Set(EVENTS.map((e) => e.date.slice(-4)))];

export function Events() {
  const { openEvent } = useEventModal();
  const [year, setYear] = useState('All');
  const [q, setQ] = useState('');

  const list = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return EVENTS.map((e, i) => ({ e, i })).filter(({ e }) => {
      if (year !== 'All' && e.date.slice(-4) !== year) return false;
      const h = haystack(e);
      return words.every((w) => h.includes(w));
    });
  }, [year, q]);

  return (
    <>
      <Band crumb={['Events']} title="Activities and events" text="Culture, workshops, awareness drives and campus celebrations — full list from the institute, with photos." />
      <section className="s">
        <div className="wrap">
          <div className="evbar">
            <Icon name="search" size={18} className="evq-ic" />
            <input id="evq" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events, e.g. yoga, workshop, Ganesh, March 2025" autoComplete="off" aria-label="Search events" />
            <span id="evn" role="status">{list.length} {list.length === 1 ? 'event' : 'events'}</span>
          </div>
          <div className="tabs" role="group" aria-label="Filter by year">
            {YEARS.map((y) => <button key={y} type="button" aria-pressed={year === y} onClick={() => setYear(y)}>{y}</button>)}
          </div>
          <p className="lead" style={{ margin: '0 0 18px' }}>Select an event for photos and details. Search by name, year or keyword.</p>
          <div className="grid3">
            {list.length ? list.map(({ e, i }) => (
              <button key={i} type="button" className="card" onClick={() => openEvent(i)}>
                <EventPic ev={e} />
                <div className="b"><time><Icon name="calendar" size={14} stroke={2.2} /> {e.date}</time><h3 style={{ fontSize: 18, marginTop: 4 }}>{e.title}</h3></div>
              </button>
            )) : <p className="lead">No events match your search. Try a different word, or clear the search.</p>}
          </div>
        </div>
      </section>
    </>
  );
}

function AwardsPage({ who, title, text, folder, files }) {
  return (
    <>
      <Band crumb={['Awards', who]} title={title} text={text} sub={AWARDS_SUB} />
      <section className="s">
        <div className="wrap">
          <p className="lead">Select a photo to see it larger.</p>
          <div className="gal tall">
            {files.map((g) => <ZoomImg key={g} path={`images/${folder}/${g}`} alt={title.replace('Awards, ', '') + ' award'} />)}
          </div>
        </div>
      </section>
    </>
  );
}

export const AwardsFaculty = () => (
  <AwardsPage who="Faculty" title="Awards, faculty" text="Recognition for our teaching staff." folder="awards_faculty" files={GALLERY.awardsFaculty} />
);
export const AwardsStudent = () => (
  <AwardsPage who="Students" title="Awards, students" text="Recognition for our students." folder="awards_student" files={GALLERY.awardsStudent} />
);
