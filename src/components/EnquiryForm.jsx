import { useState } from 'react';
import { CONTACT } from '../config.js';
import { validateEnquiry } from './common.jsx';

function mailto(body) {
  location.href =
    'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('Admission enquiry') + '&body=' + encodeURIComponent(body);
}

/** Small call-back form in the home hero. */
export function QuickEnquiry() {
  const [f, setF] = useState({ name: '', phone: '', course: 'B.Pharm' });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function submit(e) {
    e.preventDefault();
    const v = validateEnquiry(f.name, f.phone);
    setErr(v.errors);
    if (!v.ok) return;
    setSent(true);
    mailto(`Name: ${f.name.trim()}\nPhone: ${f.phone.trim()}\nCourse: ${f.course}`);
  }

  return (
    <form className="hf" noValidate onSubmit={submit}>
      <h3>Quick enquiry</h3>
      <p>Leave your number. Our team will call you back.</p>
      <label>Your name<input value={f.name} onChange={set('name')} autoComplete="name" /><span className="err">{err.name}</span></label>
      <label>Phone number<input value={f.phone} onChange={set('phone')} type="tel" inputMode="numeric" autoComplete="tel" /><span className="err">{err.phone}</span></label>
      <label>Course<select value={f.course} onChange={set('course')}><option>B.Pharm</option><option>D.Pharm</option></select></label>
      <button className="btn" type="submit">Request a call back</button>
      <div className="hok" role="status" style={{ display: sent ? 'block' : 'none' }}>
        Your email app will open with the enquiry. Press send there to finish.
      </div>
    </form>
  );
}

/** Full enquiry form on the Contact page (email or WhatsApp). */
export function ContactEnquiry() {
  const [f, setF] = useState({ name: '', phone: '', course: 'B.Pharm', msg: '' });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function check() {
    const v = validateEnquiry(f.name, f.phone);
    setErr(v.errors);
    return v.ok;
  }

  function submit(e) {
    e.preventDefault();
    if (!check()) return;
    setSent(true);
    mailto(`Name: ${f.name.trim()}\nPhone: ${f.phone.trim()}\nCourse: ${f.course}\nMessage: ${f.msg.trim()}`);
  }

  function whatsapp() {
    if (!check()) return;
    const t = `Admission enquiry\nName: ${f.name.trim()}\nPhone: ${f.phone.trim()}\nCourse: ${f.course}` + (f.msg.trim() ? `\nMessage: ${f.msg.trim()}` : '');
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t)}`, '_blank', 'noopener');
  }

  return (
    <form noValidate onSubmit={submit}>
      <label>Your name<input value={f.name} onChange={set('name')} autoComplete="name" /><span className="err">{err.name}</span></label>
      <label>Phone number<input value={f.phone} onChange={set('phone')} type="tel" inputMode="numeric" autoComplete="tel" /><span className="err">{err.phone}</span></label>
      <label>Course<select value={f.course} onChange={set('course')}><option>B.Pharm</option><option>D.Pharm</option></select></label>
      <label>Message (optional)<textarea value={f.msg} onChange={set('msg')} rows={3} /></label>
      <button className="btn" type="submit">Send enquiry</button>
      <button className="btn dk" type="button" onClick={whatsapp}>Send on WhatsApp</button>
      <div id="ok" role="status" style={{ display: sent ? 'block' : 'none' }}>
        Your email app will open with the enquiry. Press send there to finish.
      </div>
    </form>
  );
}
