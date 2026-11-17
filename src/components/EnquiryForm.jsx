import { useState } from 'react';
import { CONTACT, ENQUIRY_ENDPOINT } from '../config.js';
import { validateEnquiry } from './common.jsx';

/** mailto: link with the enquiry filled in (fallback when sending fails). */
const mailtoHref = (body) =>
  'mailto:' + CONTACT.email + '?subject=' + encodeURIComponent('Admission enquiry') + '&body=' + encodeURIComponent(body);

/** Sends an enquiry to ENQUIRY_ENDPOINT (emailed to the institute). Resolves true on success. */
async function sendEnquiry(fields) {
  try {
    const res = await fetch(ENQUIRY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `Admission enquiry: ${fields.Name} (${fields.Course})`,
        _template: 'table',
        _captcha: 'false',
        ...fields,
      }),
    });
    const data = await res.json().catch(() => ({}));
    const ok = res.ok && (data.success === true || data.success === 'true');
    // Visible in the browser console (F12). Before activation FormSubmit replies
    // "This form needs Activation..." and sends an activation email to CONTACT.email.
    if (!ok) console.warn('[enquiry] not sent:', res.status, data.message || data);
    return ok;
  } catch (e) {
    console.warn('[enquiry] request failed:', e);
    return false;
  }
}

const EMPTY_QUICK = { name: '', phone: '', city: '', address: '', course: 'B.Pharm', honey: '' };

/** Small call-back form in the home hero. Emails the enquiry to the institute. */
export function QuickEnquiry() {
  const [f, setF] = useState(EMPTY_QUICK);
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (status === 'sending') return;
    const v = validateEnquiry(f.name, f.phone);
    setErr(v.errors);
    if (!v.ok) return;
    if (f.honey) { setStatus('sent'); return; } // spam bot filled the hidden field
    setStatus('sending');
    const ok = await sendEnquiry({
      Name: f.name.trim(),
      Phone: f.phone.trim(),
      City: f.city.trim() || '-',
      Address: f.address.trim() || '-',
      Course: f.course,
    });
    if (ok) { setStatus('sent'); setF(EMPTY_QUICK); } else setStatus('error');
  }

  const mailBody = `Name: ${f.name.trim()}
Phone: ${f.phone.trim()}
City: ${f.city.trim()}
Address: ${f.address.trim()}
Course: ${f.course}`;

  return (
    <form className="hf" noValidate onSubmit={submit}>
      <h3>Quick enquiry</h3>
      <p>Leave your number. Our team will call you back.</p>
      <label>Your name<input value={f.name} onChange={set('name')} autoComplete="name" /><span className="err">{err.name}</span></label>
      <label>Phone number<input value={f.phone} onChange={set('phone')} type="tel" inputMode="numeric" autoComplete="tel" /><span className="err">{err.phone}</span></label>
      <label>City<input value={f.city} onChange={set('city')} autoComplete="address-level2" /></label>
      <label>Address<textarea value={f.address} onChange={set('address')} rows={2} autoComplete="street-address" /></label>
      <label>Course<select value={f.course} onChange={set('course')}><option>B.Pharm</option><option>D.Pharm</option></select></label>
      {/* Hidden from people; bots that fill it are ignored */}
      <input className="hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.honey} onChange={set('honey')} />
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Request a call back'}
      </button>
      {status === 'sent' && (
        <div className="hok" role="status" style={{ display: 'block' }}>
          Thank you! Your enquiry has been sent. Our team will call you back soon.
        </div>
      )}
      {status === 'error' && (
        <div className="hok herr" role="alert" style={{ display: 'block' }}>
          Sorry, we could not send your enquiry right now. Please call <a href={CONTACT.phoneTel}>{CONTACT.phone}</a> or{' '}
          <a href={mailtoHref(mailBody)}>email us</a>.
        </div>
      )}
    </form>
  );
}

const EMPTY_CONTACT = { name: '', phone: '', course: 'B.Pharm', msg: '', honey: '' };

/** Full enquiry form on the Contact page. Emails the enquiry to the institute, or sends it on WhatsApp. */
export function ContactEnquiry() {
  const [f, setF] = useState(EMPTY_CONTACT);
  const [err, setErr] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  function check() {
    const v = validateEnquiry(f.name, f.phone);
    setErr(v.errors);
    return v.ok;
  }

  async function submit(e) {
    e.preventDefault();
    if (status === 'sending' || !check()) return;
    if (f.honey) { setStatus('sent'); return; } // spam bot filled the hidden field
    setStatus('sending');
    const ok = await sendEnquiry({
      Name: f.name.trim(),
      Phone: f.phone.trim(),
      Course: f.course,
      Message: f.msg.trim() || '-',
      Source: 'Contact page',
    });
    if (ok) { setStatus('sent'); setF(EMPTY_CONTACT); } else setStatus('error');
  }

  function whatsapp() {
    if (!check()) return;
    const t = `Admission enquiry
Name: ${f.name.trim()}
Phone: ${f.phone.trim()}
Course: ${f.course}` + (f.msg.trim() ? `
Message: ${f.msg.trim()}` : '');
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t)}`, '_blank', 'noopener');
  }

  const mailBody = `Name: ${f.name.trim()}
Phone: ${f.phone.trim()}
Course: ${f.course}
Message: ${f.msg.trim()}`;

  return (
    <form className="cform" noValidate onSubmit={submit}>
      <label>Your name<input value={f.name} onChange={set('name')} autoComplete="name" /><span className="err">{err.name}</span></label>
      <label>Phone number<input value={f.phone} onChange={set('phone')} type="tel" inputMode="numeric" autoComplete="tel" /><span className="err">{err.phone}</span></label>
      <label>Course<select value={f.course} onChange={set('course')}><option>B.Pharm</option><option>D.Pharm</option></select></label>
      <label>Message (optional)<textarea value={f.msg} onChange={set('msg')} rows={3} /></label>
      {/* Hidden from people; bots that fill it are ignored */}
      <input className="hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.honey} onChange={set('honey')} />
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send enquiry'}
      </button>
      <button className="btn dk" type="button" onClick={whatsapp}>Send on WhatsApp</button>
      {status === 'sent' && (
        <div id="ok" role="status" style={{ display: 'block' }}>
          Thank you! Your enquiry has been sent. Our team will get back to you soon.
        </div>
      )}
      {status === 'error' && (
        <div id="ok" className="herr" role="alert" style={{ display: 'block' }}>
          Sorry, we could not send your enquiry right now. Please call <a href={CONTACT.phoneTel}>{CONTACT.phone}</a>,{' '}
          <a href={mailtoHref(mailBody)}>email us</a> or use WhatsApp.
        </div>
      )}
    </form>
  );
}
