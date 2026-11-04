import { useState } from 'react';
import { CONTACT, LOGO, PDF } from '../config.js';
import Img from './Img.jsx';
import { Ext } from './common.jsx';
import Icon from './Icons.jsx';

export default function Footer() {
  const [noLogo, setNoLogo] = useState(false);
  const toTop = (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <footer>
      <div className="wrap">
        <div className="fbrand">
          <a className="brand" href="#home">
            <span className={'lg' + (noLogo ? ' nologo' : '')}><Img path={LOGO} onBroken={() => setNoLogo(true)} /></span>
            <span>Amaltas Institute of Pharmacy<small>Amaltas University &middot; Dewas</small></span>
          </a>
          <div className="soc">
            <Ext href={CONTACT.facebook}><Icon name="facebook" size={16} /> Facebook</Ext>
            <Ext href={CONTACT.instagram}><Icon name="instagram" size={16} /> Instagram</Ext>
            <a href="#home" onClick={toTop}>Back to top <Icon name="arrowUp" size={16} /></a>
          </div>
        </div>
        <div className="fcols">
          <div>
            <h3>About us</h3>
            <p>A constituent unit of Amaltas University, Dewas. Run by Amaltas Educational Welfare Society. Approved by the Pharmacy Council of India.</p>
            <a href="#about">About institute</a><a href="#chairman">Chairman message</a><a href="#principal">Principal message</a>
          </div>
          <div>
            <h3>Admissions</h3>
            <a href="#admission">Admission &amp; courses</a><a href="#syllabus">Syllabus</a><a href="#calendar">Academic calendar</a><a href="#contact">Enquiry form</a>
          </div>
          <div>
            <h3>Campus</h3>
            <a href="#facilities">Infrastructure</a><a href="#events">Events</a><a href="#awards-faculty">Awards, faculty</a><a href="#awards-student">Awards, students</a><a href="#faculty">Teaching faculty</a>
          </div>
          <div>
            <h3>Downloads</h3>
            <Ext href={PDF.brochure}>Brochure</Ext><Ext href={PDF.bulletin}>Bulletin</Ext><Ext href={PDF.bulletin2}>Bulletin Vol. 02</Ext>
            <Ext href={PDF.pci}>PCI approval</Ext><Ext href={PDF.affiliation}>Affiliation letter</Ext><a href="#committees">Committees</a><a href="#career">Career</a>
          </div>
          <div>
            <h3>Contact</h3>
            <p className="fic"><Icon name="pin" size={16} />Village Bangar, Dewas-Ujjain Highway, Dewas (M.P.) 455001</p>
            <a className="fic" href="tel:18005712181"><Icon name="phone" size={16} />Toll free 1800-571-2181</a>
            <a className="fic" href="tel:07272482547"><Icon name="phone" size={16} />07272-482547, 9685096514</a>
            <a className="fic" href={'mailto:' + CONTACT.email}><Icon name="mail" size={16} />{CONTACT.email}</a>
            <Ext className="fic" href={CONTACT.maps}><Icon name="external" size={16} />Open in Google Maps</Ext>
          </div>
        </div>
        <div className="copy">
          <span>&copy; {new Date().getFullYear()} Amaltas Institute of Pharmacy, Dewas. All rights reserved.</span>
          <span>Amaltas University</span>
        </div>
      </div>
    </footer>
  );
}
