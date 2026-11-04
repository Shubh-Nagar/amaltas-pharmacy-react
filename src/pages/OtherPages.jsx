import { CONTACT } from '../config.js';
import { COMMITTEES } from '../data/committees.js';
import { Band } from '../components/common.jsx';
import Icon, { IconBox } from '../components/Icons.jsx';
import { ContactEnquiry } from '../components/EnquiryForm.jsx';

const COMMITTEE_SUB = COMMITTEES.map((c) => ({ href: '#' + c.id, label: c.name }));

export function Committees() {
  return (
    <>
      <Band crumb={['Committees']} title="Committees" text="Cells and committees for student welfare and guidance." />
      <section className="s">
        <div className="wrap">
          <div className="links">
            {COMMITTEES.map((c) => <a key={c.id} href={'#' + c.id}><IconBox name="users" /><em>{c.name}</em> <span>Open <Icon name="arrowRight" size={16} /></span></a>)}
          </div>
        </div>
      </section>
    </>
  );
}

export function Committee({ committee: c }) {
  return (
    <>
      <Band
        crumb={[{ href: '#committees', label: 'Committees' }, c.name]}
        title={c.name}
        text={`Members of the ${c.name} at Amaltas Institute of Pharmacy.`}
        sub={COMMITTEE_SUB}
      />
      <section className="s">
        <div className="wrap">
          <h2>Committee members</h2>
          <div className="ctw">
            <table className="ct">
              <thead><tr><th>S.No.</th><th>Name</th><th>Designation</th><th>Contact</th></tr></thead>
              <tbody>
                {c.members.map(([n, d, p], i) => <tr key={n}><td>{i + 1}</td><td>{n}</td><td>{d}</td><td>{p}</td></tr>)}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 26 }}><a className="more" href="#committees"><Icon name="arrowRight" size={16} style={{ transform: 'scaleX(-1)', verticalAlign: '-3px' }} /> All committees</a></p>
        </div>
      </section>
    </>
  );
}

export function Contact() {
  return (
    <>
      <Band crumb={['Contact']} title="Contact and enquiry" text="Tell us what you need. We will call you back." />
      <section className="s">
        <div className="wrap contact">
          <div className="addr">
            <div>
              <IconBox name="user" />
              <h3>Principal</h3>Dr. Neelam Khan<br />
              <a href={CONTACT.phoneTel}>{CONTACT.phone}</a><br />
              <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>
            </div>
            <div>
              <IconBox name="pin" />
              <h3>Campus</h3>Amaltas Institute of Pharmacy<br />Village Bangar, Dewas-Ujjain Highway,<br />Dewas (M.P.) 455001<br />
              Toll free: <a href="tel:18005712181">1800-571-2181</a><br />
              Phone: <a href="tel:07272482547">07272-482547</a>, <a href="tel:9685096514">9685096514</a><br />
              <a className="more" href={CONTACT.maps} target="_blank" rel="noopener"><Icon name="pin" size={15} style={{ verticalAlign: '-2px' }} /> Open in Google Maps</a>
            </div>
            <div>
              <IconBox name="building" />
              <h3>City office</h3>204, Shree Krishna Classic, 139, Phadnis Colony,<br />Above Axis Bank, A.B. Road, Near Hotel Amaltas,<br />Indore (M.P.) 452008<br />
              Phone: <a href="tel:07314215858">0731-4215858</a><br />Fax: 0731-4215959
            </div>
            <div>
              <IconBox name="heart" />
              <h3>Follow us</h3>
              <span className="socl">
                <a href={CONTACT.facebook} target="_blank" rel="noopener"><Icon name="facebook" size={17} /> Facebook</a>
                <a href={CONTACT.instagram} target="_blank" rel="noopener"><Icon name="instagram" size={17} /> Instagram</a>
              </span>
            </div>
          </div>
          <ContactEnquiry />
        </div>
      </section>
    </>
  );
}
