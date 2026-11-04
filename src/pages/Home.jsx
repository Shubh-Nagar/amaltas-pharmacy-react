import { useEffect, useRef } from 'react';
import { PDF, CONTACT } from '../config.js';
import EVENTS from '../data/events.json';
import GALLERY from '../data/gallery.json';
import Img from '../components/Img.jsx';
import { Arrow, DateBadge, EventPic, Ext, ZoomImg, parseDate, shortTitle } from '../components/common.jsx';
import { QuickEnquiry } from '../components/EnquiryForm.jsx';
import { useEventModal } from '../components/EventModal.jsx';
import Icon, { IconBox } from '../components/Icons.jsx';

const HERO_IMG = 'assets/images/card/Where Science Meets Service A Journey in Pharmacy.jpg';

const NOTICES = [
  ['#admission', 'Admission open 2026-27 for B.Pharm and D.Pharm'],
  [PDF.pci, 'PCI approved letter 2026-27'],
  [PDF.affiliation, 'Affiliation letter'],
  [PDF.brochure, 'Download the 2026-27 brochure'],
  ['#contact', 'Call the admission office: 7880154607 or 1800-571-2181'],
  ['#events', 'Latest events from campus'],
  ['#syllabus', 'Syllabus for B.Pharm and D.Pharm'],
];

const WHY = [
  ['flask', 'Equipped laboratories', 'Pharmaceutics, chemistry, pharmacology, pharmacognosy and analysis labs for hands-on practice.'],
  ['book', 'Library and e-library', 'Books, journals, e-books and quiet study areas.'],
  ['bed', 'Hostel on campus', 'Shared rooms and low-cost private rooms, with a common sitting area and communal kitchen.'],
  ['bus', 'University transport', 'Buses cover important points in Indore, Dewas and Ujjain, and run for industrial tours.'],
  ['leaf', 'Green, secure campus', 'A lush green campus with 24x7 security and a medicinal garden.'],
  ['users', 'Qualified faculty', '18 teaching staff for theory and practical work, led by Dr. Neelam Khan.'],
];

const BOARD = [
  ['#admission', 'megaphone', 'Admission', 'Admission open 2026-27 for B.Pharm and D.Pharm'],
  [PDF.pci, 'fileCheck', 'Approval', 'PCI approved letter 2026-27', true],
  [PDF.affiliation, 'file', 'Approval', 'Affiliation letter', true],
  [PDF.brochure, 'download', 'Download', 'The 2026-27 brochure, free PDF', true],
  [CONTACT.phoneTel, 'phone', 'Helpline', 'Call the admission office: 7880154607'],
];

/** Number that counts up when scrolled into view. */
function CountUp({ end }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    const io = new IntersectionObserver(([x]) => {
      if (!x.isIntersecting) return;
      io.disconnect();
      const start = end > 1000 ? end - 40 : 0;
      let t0 = null;
      const step = (ts) => {
        t0 = t0 || ts;
        const k = Math.min((ts - t0) / 1200, 1);
        el.textContent = Math.round(start + (end - start) * k);
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, [end]);
  return <b ref={ref}>{end}</b>;
}

function NoticeBar() {
  // list is doubled so the marquee loops seamlessly
  const items = [...NOTICES, ...NOTICES.filter((n) => n[1] !== 'Affiliation letter')];
  return (
    <div className="nbar">
      <b><i />Notice</b>
      <div className="nview">
        <div className="ntrack">
          {items.map(([h, t], i) => <a key={i} href={h}>{t}</a>)}
        </div>
      </div>
    </div>
  );
}

function News() {
  const { openEvent } = useEventModal();
  const first = EVENTS[0];
  const p = parseDate(first.date);
  return (
    <div className="nw">
      <button type="button" className="nf" onClick={() => openEvent(0)}>
        <EventPic ev={first} />
        <DateBadge p={p} />
        <span className="bd">
          <span className="tg">Latest news</span>
          <span className="ht">{shortTitle(first.title)}</span>
          <span className="rd">Read the story <Arrow /></span>
        </span>
      </button>
      <div className="nl">
        {EVENTS.slice(1, 5).map((e, k) => {
          const q = parseDate(e.date);
          return (
            <button key={k} type="button" className="ni" onClick={() => openEvent(k + 1)}>
              <DateBadge p={q} />
              <span className="tx">
                <small>{q.d} {q.m} {q.y}</small>
                <span className="ht">{shortTitle(e.title)}</span>
              </span>
              <EventPic ev={e} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

/** Hero background drifts slower than the page for a light parallax effect. */
function useParallax() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 900);
        el.style.transform = `translate3d(0, ${y * 0.3}px, 0) scale(1.08)`;
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

export default function Home() {
  const bgRef = useParallax();
  return (
    <>
      <NoticeBar />

      <section className="hero2">
        <Img className="bg" path={HERO_IMG} lazy={false} ref={bgRef} />
        <div className="wrap hg">
          <div>
            <div className="pills">
              <Ext className="pill" href={PDF.pci}><span className="ck">&#10003;</span>PCI approved<Arrow size={18} w={2.6} /></Ext>
              <Ext className="pill" href={PDF.affiliation}><span className="ck">&#10003;</span>Affiliation letter<Arrow size={18} w={2.6} /></Ext>
            </div>
            <h1>Where <em>science</em> meets service.</h1>
            <p>Shape your future as a pharmacist at Amaltas University, Dewas, with equipped labs, a library, a hostel and a green campus.</p>
            <div className="cta">
              <a className="btn" href="#admission"><Icon name="grad" size={18} /> Explore courses</a>
              <Ext className="btn ghost" href={PDF.brochure}><Icon name="download" size={18} /> Download brochure</Ext>
            </div>
            <ul className="chips"><li><Icon name="clock" size={15} /> B.Pharm &middot; 4 years</li><li><Icon name="clock" size={15} /> D.Pharm &middot; 2 years</li><li><Icon name="bus" size={15} /> Hostel &amp; transport</li></ul>
          </div>
          <QuickEnquiry />
        </div>
      </section>

      <div className="wrap">
        <ul className="tiles">
          {[
            ['#admission', 'grad', 'Admission & courses', 'Eligibility and documents'],
            ['#syllabus', 'bookOpen', 'Syllabus', 'B.Pharm and D.Pharm PDFs'],
            ['#calendar', 'calendar', 'Academic calendar', 'Course-wise calendars'],
            ['#events', 'sparkles', 'Events', 'Life on campus'],
          ].map(([h, ic, b, s]) => (
            <li key={h}><a href={h}><i><Icon name={ic} size={22} /></i><b>{b}</b><span>{s}</span><Icon name="arrowRight" size={18} className="tgo" /></a></li>
          ))}
        </ul>
      </div>

      <div className="facts">
        <div className="wrap">
          <ul>
            <li><Icon name="calendarCheck" size={26} className="fi" /><CountUp end={2023} /><span>ESTABLISHED IN DEWAS</span></li>
            <li><Icon name="users" size={26} className="fi" /><CountUp end={18} /><span>EXPERIENCED FACULTY</span></li>
            <li><Icon name="grad" size={26} className="fi" /><CountUp end={2} /><span>COURSES OFFERED</span></li>
            <li><Icon name="shield" size={26} className="fi" /><b>PCI</b><span>APPROVED INSTITUTE</span></li>
          </ul>
        </div>
      </div>

      <section className="s">
        <div className="wrap ab">
          <div className="abi">
            <Img path="assets/images/About amaltas - 540 x 465px_2a.jpg" alt="Campus of Amaltas Institute of Pharmacy" />
            <Img className="abs" path={HERO_IMG} />
            <div className="abb"><b>2023</b>Established in Dewas</div>
          </div>
          <div className="prose">
            <span className="eyebrow">About us</span>
            <h2>Quality education with social responsibility</h2>
            <p>Amaltas Institute of Pharmacy is a constituent unit of Amaltas University, Dewas, run by Amaltas Educational Welfare Society. It is approved by the Pharmacy Council of India and offers B.Pharm and D.Pharm in central India.</p>
            <div className="abp">
              <div><IconBox name="target" size={18} className="sm" /><h3>Aim</h3><p>A centre of excellence in pharmacy education and research.</p></div>
              <div><IconBox name="eye" size={18} className="sm" /><h3>Vision</h3><p>A globally competitive, research focused department.</p></div>
              <div><IconBox name="compass" size={18} className="sm" /><h3>Mission</h3><p>Ethics, social empathy and a push towards higher education.</p></div>
            </div>
            <div className="cta">
              <a className="btn dk" href="#about">Know more <Arrow /></a>
              <Ext className="btn dk" href={PDF.brochure}><Icon name="download" size={18} /> Download brochure</Ext>
            </div>
          </div>
        </div>
      </section>

      <section className="s alt">
        <div className="wrap">
          <span className="eyebrow">Programmes</span>
          <h2>Courses offered</h2>
          <p className="lead">A 4-year degree or a 2-year diploma. Both lead to a career in pharmaceutical sciences.</p>
          <div className="grid2">
            {[
              ['assets/images/course/Courses_4 yrs.jpeg', '4 years', 'B.Pharm', 'Bachelor of Pharmacy'],
              ['assets/images/course/Courses_2 yrs.jpeg', '2 years', 'D.Pharm', 'Diploma in Pharmacy'],
            ].map(([img, dur, name, full]) => (
              <a key={name} className="bigc" href="#admission">
                <Img path={img} />
                <div>
                  <small>{dur}</small><h3>{name}</h3><p>{full}</p>
                  <span className="more" style={{ color: 'var(--gold2)' }}>Eligibility and admission <Arrow /></span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <span className="eyebrow">Why Amaltas</span>
          <h2>Everything a pharmacy student needs</h2>
          <p className="lead">Learning, living and travelling, all taken care of on and around campus.</p>
          <div className="why">
            {WHY.map(([ic, h, p], i) => (
              <div key={h} data-n={String(i + 1).padStart(2, '0')}><IconBox name={ic} size={24} /><h3>{h}</h3><p>{p}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="s dark">
        <div className="wrap">
          <span className="eyebrow">Leadership</span>
          <h2>Messages</h2>
          <p className="lead">Words from the people who lead the university and the institute.</p>
          <div className="bm">
            <div className="bi"><Img path="assets/images/chairman.jpg" alt="Shri Mayankraj Singh Bhadoria" /></div>
            <div className="bq">
              <p>Our objective is to inculcate value education in our students and build them into future leaders, entrepreneurs and good human beings towards society.</p>
              <b>Shri Mayankraj Singh Bhadoria</b><span>Chairman, Amaltas University</span>
              <a className="btn" href="#chairman">Read full message <Arrow /></a>
            </div>
          </div>
          <div className="bm r">
            <div className="bi"><Img path="assets/images/principal.png" alt="Dr. Neelam Khan" /></div>
            <div className="bq">
              <p>We are dedicated to giving society quality education and health care by providing the best future pharmacists.</p>
              <b>Dr. Neelam Khan</b><span>Principal, M.Pharm, Ph.D</span>
              <a className="btn" href="#principal">Read full message <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="s alt news">
        <div className="wrap">
          <div className="nh">
            <div>
              <span className="eyebrow">News &amp; updates</span>
              <h2>What&rsquo;s happening at Amaltas</h2>
              <p className="lead">Fresh stories from campus, plus the notices every applicant should see.</p>
            </div>
            <a className="btn dk" href="#events">All news and events <Arrow /></a>
          </div>
          <News />
          <aside className="nb" aria-label="Notice board">
            <div className="nbh"><b><i />Notice board</b><span>Important for 2026-27 applicants</span></div>
            <ul>
              {BOARD.map(([h, ic, s, b, ext]) => (
                <li key={b}>
                  <a href={h} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>
                    <small><Icon name={ic} size={14} stroke={2.2} /> {s}</small><b>{b}</b><em><Arrow /></em>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="s">
        <div className="wrap">
          <span className="eyebrow">Gallery</span>
          <h2>Moments from campus</h2>
          <p className="lead">Select a photo to see it larger.</p>
          <div className="mosaic">
            {GALLERY.home.map((g) => <ZoomImg key={g} path={'assets/images/gallery/' + g} alt="Campus photo" />)}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="wrap">
          <div><h2>Admissions are open</h2><p>Talk to our admission team and confirm your seat.</p></div>
          <div className="cta">
            <a className="btn" href="#contact"><Icon name="send" size={18} /> Send an enquiry</a>
            <a className="btn ghost" href={CONTACT.phoneTel}><Icon name="phone" size={18} /> Call 7880154607</a>
          </div>
        </div>
      </div>
    </>
  );
}
