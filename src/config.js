// Central site settings. Change contact details or document links here.

// Images and PDFs are served from the existing institute site.
export const REMOTE_BASE =
  (typeof location !== 'undefined' && location.protocol === 'https:' ? 'https:' : 'http:') +
  '//amaltasgroup.co.in/pharmacy/';

/** Turn a path like "assets/images/logo1.png" into a full URL. Local paths ("/images/...") are kept as-is. */
export function assetUrl(path) {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path)) return path;
  if (path.startsWith('/')) return import.meta.env.BASE_URL.replace(/\/$/, '') + path;
  return REMOTE_BASE + encodeURI(path);
}

/** Swap http <-> https (used as a one-time fallback when an image fails). */
export function swapProtocol(u) {
  return u.startsWith('https:') ? u.replace('https:', 'http:') : u.replace('http:', 'https:');
}

export const PDF = {
  brochure: 'http://amaltasgroup.co.in/pharmacy/pdf/brochure.pdf',
  pci: 'http://amaltasgroup.co.in/pharmacy/pdf/PCI%20approval%2025_26.pdf',
  affiliation: 'http://amaltasgroup.co.in/pharmacy/pdf/Affiliation%20Letter.pdf',
  bulletin: 'http://amaltasgroup.co.in/pharmacy/pdf/Institute%20of%20Pharmacy_bulletin.pdf',
  bulletin2: 'http://amaltasgroup.co.in/pharmacy/pdf/Pharma_Biz_Vol_02.pdf',
  syllabusB: 'http://amaltasgroup.co.in/pharmacy/pdf/Syllabus_B_Pharm.pdf',
  syllabusD: 'http://amaltasgroup.co.in/pharmacy/pdf/D.Pharm%20_syllabus.pdf',
  calendarD: 'http://amaltasgroup.co.in/pharmacy/academic_calendar_dpharmacy.asp',
  calendarBOld: 'http://amaltasgroup.co.in/pharmacy/academic_calendar_bpharmacy.asp',
};

export const CONTACT = {
  phone: '+91 7880154607',
  phoneTel: 'tel:+917880154607',
  tollFree: '1800-571-2181',
  email: 'amaltaspharmacy@gmail.com',
  whatsapp: '917880154607',
  maps: 'https://www.google.com/maps/search/?api=1&query=Amaltas+University+Bangar+Dewas',
  facebook: 'https://www.facebook.com/amaltasinstituteofpharmacy/',
  instagram: 'https://www.instagram.com/instituteofpharmacy_/',
};

export const LOGO = 'assets/images/logo1.png';

export const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || '';
