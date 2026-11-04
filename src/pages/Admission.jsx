import { useState } from 'react';
import { PDF } from '../config.js';
import Img from '../components/Img.jsx';
import { Band } from '../components/common.jsx';
import Icon, { IconBox } from '../components/Icons.jsx';

const ELIGIBILITY = [
  'Age must be at least 17 years on 31 December of the year of admission.',
  '10+2 passed with Sciences from a valid board, with 50% aggregate marks.',
  '5% relaxation in marks may be given to SC/ST candidates.',
  'The candidate must not be registered for any other degree or diploma along with pharmacy. Legal action will be taken if found otherwise.',
];

const DOCUMENTS = [
  '10th mark sheet', '12th mark sheet', 'Transfer Certificate (T.C)', 'Migration Certificate', 'Gap Certificate (if applicable)',
  'Domicile Certificate', 'Caste Certificate', 'Income Certificate', 'Aadhar Card', 'SSSM ID', 'Address proof', 'Ten passport size colour photos',
];

const STEPS = [
  ['checkCircle', 'Check eligibility', 'Read the criteria above.'],
  ['send', 'Send an enquiry', 'Use the form or call the office.'],
  ['clipboard', 'Submit documents', 'Bring the documents listed above.'],
  ['idCard', 'Confirm your seat', 'Complete the admission formalities with the office.'],
];

function EligibilityChecker() {
  const [f, setF] = useState({ age: '', marks: '', science: 'y', cat: 'g', other: 'n' });
  const [res, setRes] = useState(null);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function check(e) {
    e.preventDefault();
    const age = parseFloat(f.age), m = parseFloat(f.marks);
    if (isNaN(age) || isNaN(m)) { setRes({ ok: false, msg: 'Enter your age and 12th marks to check.' }); return; }
    const need = f.cat === 'r' ? 45 : 50;
    const bad = [];
    if (age < 17) bad.push('Age must be at least 17 years on 31 December of the admission year.');
    if (f.science !== 'y') bad.push('12th must be passed with Science.');
    if (m < need) bad.push(`12th aggregate must be at least ${need}%` + (need === 45 ? ' (5% relaxation for SC/ST).' : '.'));
    if (f.other === 'y') bad.push('You cannot be registered for another degree or diploma with pharmacy.');
    setRes({ ok: !bad.length, bad });
  }

  return (
    <form className="elig" noValidate onSubmit={check}>
      <label>Age on 31 December of admission year<input value={f.age} onChange={set('age')} type="number" min="10" max="60" inputMode="numeric" /></label>
      <label>12th aggregate marks (%)<input value={f.marks} onChange={set('marks')} type="number" min="0" max="100" step="0.01" inputMode="decimal" /></label>
      <label>12th passed with Science<select value={f.science} onChange={set('science')}><option value="y">Yes</option><option value="n">No</option></select></label>
      <label>Category<select value={f.cat} onChange={set('cat')}><option value="g">General / OBC</option><option value="r">SC / ST</option></select></label>
      <label>Registered for another degree or diploma<select value={f.other} onChange={set('other')}><option value="n">No</option><option value="y">Yes</option></select></label>
      <button className="btn" type="submit"><Icon name="checkCircle" size={18} /> Check eligibility</button>
      <div id="eres" role="status" className={res ? (res.ok ? 'ok' : 'no') : undefined}>
        {res?.msg}
        {res && !res.msg && (res.ok ? (
          <>
            You meet the basic criteria. Send an enquiry and the office will guide you on documents and seats.
            <small><a className="more" href="#contact">Send an enquiry</a></small>
          </>
        ) : (
          <>
            You do not meet these points yet:
            <ul>{res.bad.map((b) => <li key={b}>{b}</li>)}</ul>
            <small>Call 7880154607 if you have a question about your case.</small>
          </>
        ))}
      </div>
    </form>
  );
}

export default function Admission() {
  return (
    <>
      <Band crumb={['Admission and courses']} title="Admission and courses" text="Check eligibility, gather your documents and send an enquiry." />
      <section className="s">
        <div className="wrap">
          <h2>Courses offered</h2>
          <div className="grid2" style={{ marginTop: 20 }}>
            <div className="card course"><Img path="assets/images/course/Courses_4 yrs.jpeg" /><div className="b"><h3>B.Pharm</h3><div className="dur"><Icon name="clock" size={15} /> 4 years &middot; Bachelor of Pharmacy</div></div></div>
            <div className="card course"><Img path="assets/images/course/Courses_2 yrs.jpeg" /><div className="b"><h3>D.Pharm</h3><div className="dur"><Icon name="clock" size={15} /> 2 years &middot; Diploma in Pharmacy</div></div></div>
          </div>
        </div>
      </section>
      <section className="s alt">
        <div className="wrap two">
          <div>
            <h2 className="ih"><IconBox name="checkCircle" />Eligibility</h2>
            <ul className="tick" style={{ marginTop: 20 }}>{ELIGIBILITY.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div>
            <h2 className="ih"><IconBox name="clipboard" />Documents required</h2>
            <ul className="tick docs-grid" style={{ marginTop: 20 }}>{DOCUMENTS.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="s alt">
        <div className="wrap">
          <span className="eyebrow">Quick check</span>
          <h2>Am I eligible?</h2>
          <p className="lead">Enter your details to check them against the criteria above. This is a guide only; the admission office gives the final confirmation.</p>
          <EligibilityChecker />
        </div>
      </section>
      <section className="s">
        <div className="wrap">
          <h2>How to apply</h2>
          <p className="lead">Four steps. Our team helps you at each one.</p>
          <ol className="steps">{STEPS.map(([ic, b, s]) => <li key={b}><Icon name={ic} size={22} className="sti" /><b>{b}</b><span>{s}</span></li>)}</ol>
          <p style={{ marginTop: 32 }} className="cta">
            <a className="btn dk" href="#contact"><Icon name="send" size={18} /> Send an enquiry</a>
            <a className="btn dk" href={PDF.brochure} target="_blank" rel="noopener"><Icon name="download" size={18} /> Download brochure</a>
          </p>
        </div>
      </section>
    </>
  );
}
