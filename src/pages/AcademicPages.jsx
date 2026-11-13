import { useMemo, useState } from 'react';
import { PDF } from '../config.js';
import { ACADEMIC_SUB } from '../data/nav.js';
import { CAL_NOTES, CAL_ROWS, CAL_TABS, DCAL_NOTES, DCAL_ROWS, DCAL_TABS, HOLIDAYS_A, HOLIDAYS_B } from '../data/calendar.js';
import FACULTY from '../data/faculty.json';
import { Band, ZoomImg } from '../components/common.jsx';
import Icon, { IconBox } from '../components/Icons.jsx';

function HolidayTable({ rows }) {
  return (
    <div className="cal-w">
      <table className="hol">
        <thead><tr><th>Date</th><th>Day</th><th>Holiday</th></tr></thead>
        <tbody>{rows.map((r) => <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

const COURSES = {
  b: { label: 'B.Pharm', cols: ['I semester', 'III, V and VII semesters', 'II, IV, VI and VIII semesters'], rows: CAL_ROWS, tabs: CAL_TABS, notes: CAL_NOTES, tabsLabel: 'Choose semesters' },
  d: { label: 'D.Pharm', cols: ['I year', 'II year'], rows: DCAL_ROWS, tabs: DCAL_TABS, notes: DCAL_NOTES, tabsLabel: 'Choose year' },
};

export function Calendar() {
  const [course, setCourse] = useState('b');
  const [v, setV] = useState('0');
  const C = COURSES[course];
  const pickCourse = (k) => { setCourse(k); setV('0'); };
  return (
    <>
      <Band crumb={['Academic', 'Academic calendar']} title="Academic calendar" text="B.Pharm and D.Pharm calendars for session 2026-2027." sub={ACADEMIC_SUB} />
      <section className="s">
        <div className="wrap">
          <div className="tabs cal-course" role="group" aria-label="Choose course">
            {Object.entries(COURSES).map(([k, c]) => (
              <button key={k} type="button" aria-pressed={course === k} onClick={() => pickCourse(k)}>{c.label}</button>
            ))}
          </div>
          <article className="cal-card">
            <div className="cal-hd">
              <div>
                <small>{C.label} &middot; Session 2026-2027</small>
                <h2>Academic calendar</h2>
                <p>Amaltas University, Dewas &middot; Amaltas Institute of Pharmacy</p>
              </div>
              <span className="dt">Dated 01/07/2026</span>
            </div>
            <div className="cal-tools">
              <span className="tl">Show schedule for</span>
              <div className="tabs" role="group" aria-label={C.tabsLabel}>
                {C.tabs.map((t) => (
                  <button key={t.v} type="button" aria-pressed={v === t.v} onClick={() => setV(t.v)}>{t.label}</button>
                ))}
              </div>
            </div>
            <div className="cal-w">
              <table className="cal" data-v={v}>
                <thead>
                  <tr><th>No.</th><th>Particular</th>{C.cols.map((h, j) => <th key={h} className={'c' + (j + 3)}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {C.rows.map((r, i) => {
                    const cells = r.slice(1, C.cols.length + 1);
                    const ex = r[C.cols.length + 1];
                    return (
                      <tr key={r[0]} className={ex ? 'ex' : undefined}>
                        <td>{i + 1}</td><td>{r[0]}</td>
                        {cells.map((c, j) => <td key={j} className={'c' + (j + 3)}>{c}</td>)}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="cal-key"><i />Highlighted rows are test and exam dates.</p>
          </article>

          <div className="grid2 cal-two">
            <article className="cal-card">
              <div className="cal-sub"><h3>Holidays</h3><p>Holiday list for 2026, as issued with the calendar.</p></div>
              <HolidayTable rows={HOLIDAYS_A} />
              <HolidayTable rows={HOLIDAYS_B} />
            </article>
            <article className="cal-card cal-notes">
              <div className="cal-sub"><h3>Notes</h3></div>
              <ul>{C.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              <div className="sign"><b>Principal</b><span>Amaltas Institute of Pharmacy, Dewas</span></div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

const DESIGNATIONS = ['All', ...new Set(FACULTY.map((f) => f.designation))];

export function Faculty() {
  const [d, setD] = useState('All');
  const [q, setQ] = useState('');
  const list = useMemo(
    () => FACULTY.filter((f) => (d === 'All' || f.designation === d) && (!q || f.name.toLowerCase().includes(q.toLowerCase()))),
    [d, q]
  );
  return (
    <>
      <Band crumb={['Academic', 'Teaching faculty']} title="Teaching faculty" text={`${FACULTY.length} faculty members across the institute.`} sub={ACADEMIC_SUB} />
      <section className="s">
        <div className="wrap">
          <div className="tools">
            <Icon name="search" size={18} className="sbox-ic" />
            <input className="sbox" type="search" placeholder="Search faculty by name" aria-label="Search faculty" value={q} onChange={(e) => setQ(e.target.value)} />
            <div className="tabs" role="group" aria-label="Filter by designation">
              {DESIGNATIONS.map((x) => <button key={x} type="button" aria-pressed={d === x} onClick={() => setD(x)}>{x}</button>)}
            </div>
          </div>
          <p className="cnt">{list.length} of {FACULTY.length} faculty shown</p>
          <div className="tw">
            <table>
              <thead><tr><th>No.</th><th>Name of faculty</th><th>Designation</th></tr></thead>
              <tbody>
                {list.length ? list.map((f, i) => (
                  <tr key={f.name}><td>{i + 1}</td><td>{f.name}</td><td>{f.designation}</td></tr>
                )) : <tr><td colSpan={3}>No faculty found.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export function Syllabus() {
  return (
    <>
      <Band crumb={['Academic', 'Syllabus']} title="Syllabus" text="Download the syllabus for your course as a PDF." sub={ACADEMIC_SUB} />
      <section className="s">
        <div className="wrap">
          <div className="links">
            <a href={PDF.syllabusB} target="_blank" rel="noopener"><IconBox name="bookOpen" /><em>B.Pharm, 4 years (PCI 2026, NEP)</em> <span><Icon name="download" size={16} /> PDF</span></a>
            <a href={PDF.syllabusD} target="_blank" rel="noopener"><IconBox name="bookOpen" /><em>D.Pharm, 2 years</em> <span><Icon name="download" size={16} /> PDF</span></a>
          </div>
        </div>
      </section>
    </>
  );
}

export function Career() {
  return (
    <>
      <Band crumb={['Career']} title="Career" text="Opportunities after a pharmacy qualification." />
      <section className="s">
        <div className="wrap">
          <ZoomImg path="assets/images/career.png" alt="Career opportunities after pharmacy" style={{ margin: '0 auto', borderRadius: 10, cursor: 'zoom-in' }} />
        </div>
      </section>
    </>
  );
}
