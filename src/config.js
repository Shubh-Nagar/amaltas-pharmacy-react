// Central site settings. Change contact details or document links here.

// Images and PDFs live on the existing institute site, which only works over plain http.
// A page served over https (Vercel) is not allowed to load http images ("mixed content"),
// so on https we load them through the same-origin proxy "/remote/" defined in vercel.json.
// Override with VITE_REMOTE_BASE if the files move (e.g. to an https host).
const ORIGIN_BASE = 'http://amaltasgroup.co.in/pharmacy/';
const onHttps = typeof location !== 'undefined' && location.protocol === 'https:';
export const REMOTE_BASE = import.meta.env.VITE_REMOTE_BASE || (onHttps ? '/remote/' : ORIGIN_BASE);

/** Turn a path like "assets/images/logo1.png" into a full URL. Local paths ("/images/...") are kept as-is. */
export function assetUrl(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path)) return path;
  if (path.startsWith('/')) return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
  return REMOTE_BASE + encodeURI(path);
}

/** Swap http <-> https (used as a one-time fallback when an absolute image URL fails). */
export function swapProtocol(u) {
  return u.startsWith('https:') ? u.replace('https:', 'http:') : u.replace('http:', 'https:');
}

/** URL for a file on the institute server (goes through the proxy on https). */
const remote = (p) => REMOTE_BASE + p;
/** URL for a file bundled with this site in /public. */
const local = (p) => import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + p;

export const PDF = {
  brochure: remote('pdf/brochure.pdf'),
  pci: remote('pdf/PCI%20approval%2025_26.pdf'),
  affiliation: local('pdf/affiliation-letter-2026-27.pdf'), // Amaltas University, ref AUD/RO/Affiliation/2026/412, dated 03/07/2026
  bulletin: remote('pdf/Institute%20of%20Pharmacy_bulletin.pdf'),
  bulletin2: local('pdf/pharma-biz-vol-02.pdf'),
  syllabusB: local('pdf/bpharm-syllabus-2026-nep.pdf'), // PCI B.Pharm syllabus 2026 (NEP 2020), from 2026-27
  syllabusD: remote('pdf/D.Pharm%20_syllabus.pdf'),
  calendarD: 'http://amaltasgroup.co.in/pharmacy/academic_calendar_dpharmacy.asp',
  calendarBOld: 'http://amaltasgroup.co.in/pharmacy/academic_calendar_bpharmacy.asp',
};

export const CONTACT = {
  phone: '+91 7880154607',
  phoneTel: 'tel:+917880154607',
  email: 'amaltaspharmacy@gmail.com',
  whatsapp: '917880154607',
  maps: 'https://www.google.com/maps/search/?api=1&query=Amaltas+University+Bangar+Dewas',
  facebook: 'https://www.facebook.com/amaltasinstituteofpharmacy/',
  instagram: 'https://www.instagram.com/amaltasinstituteofpharmacy/',
};

export const LOGO = 'assets/images/logo1.png';

export const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || '';

// Where the home-page enquiry form is sent. Default: FormSubmit (formsubmit.co), a free
// form-to-email service that emails each enquiry to CONTACT.email. The first enquiry sends an
// activation email to that inbox; click "Activate Form" in it once, then enquiries arrive as emails.
// Override with VITE_ENQUIRY_ENDPOINT (any URL that accepts a JSON POST and answers {"success": true}).
export const ENQUIRY_ENDPOINT =
  import.meta.env.VITE_ENQUIRY_ENDPOINT || 'https://formsubmit.co/ajax/' + CONTACT.email;
