// Built-in answers for the chat assistant. Each entry: [keywords[], answer HTML].
import { CONTACT, PDF } from '../config.js';

const T = CONTACT.phone;
const L = (h, t) => '<a href="' + h + '">' + t + '</a>';

export const KB = [
[[' hi ',' hey ','hello','namaste','namaskar'],'Hello! I am the Amaltas Institute of Pharmacy assistant. Ask me about admission, courses, eligibility, hostel, faculty or contact details.'],
[['admission','apply','2026','enrol','dakhila','pravesh','seat'],'Admissions for 2026-27 are open for B.Pharm and D.Pharm. Steps: check eligibility, send an enquiry, submit documents, confirm your seat. '+L('#admission','See admission details')+' or call '+T+'.'],
[['course','b.pharm','bpharm','d.pharm','dpharm','diploma','degree','duration','programme','program'],'We offer B.Pharm (4 years) and D.Pharm (2 years), both approved by the Pharmacy Council of India. '+L('#admission','Eligibility and admission')],
[['eligib','qualif','criteria','age ','marks','percent','12th','yogya'],'Age at least 17 years on 31 December of the admission year, and 10+2 with Science from a valid board with 50% aggregate (5% relaxation for SC/ST). You cannot be registered for another degree or diploma. '+L('#admission','Try the eligibility checker')],
[['document','certificate','papers','kagaz','dastavej'],'Bring: 10th and 12th mark sheets, T.C., Migration, Gap (if applicable), Domicile, Caste and Income certificates, Aadhar, SSSM ID, address proof and ten passport photos.'],
[['fee','cost','price','kharcha','paisa','scholarship','shulk'],'The fee structure is not published on this website. Please check the brochure or ask the admission office on '+T+' or toll free 1800-571-2181. '+L(PDF.brochure,'Brochure (PDF)')],
[['pci','approv','recogni','affiliat','ugc','manyata'],'The institute is approved by the Pharmacy Council of India (PCI), New Delhi, and affiliated to Amaltas University, Dewas. '+L(PDF.pci,'PCI approval letter 2025-26')],
[['about','institute','history','establish','found','sthapna','kya hai'],'Amaltas Institute of Pharmacy was established in 2023 as a constituent unit of Amaltas University, run by Amaltas Educational Welfare Society, Dewas. '+L('#about','About the institute')],
[['aim','vision','mission','objective'],'Aim: a centre of excellence in pharmacy education and research. Vision: a globally competitive, research focused department. Mission: continuous improvement in teaching, ethics, social empathy and motivation for higher education. '+L('#about','Read more')],
[['principal','neelam'],'Our Principal is Dr. Neelam Khan (M.Pharm, Ph.D). '+L('#principal','Read her message')],
[['chairman','mayank','bhadoria','founder','chancellor','suresh'],'The Chairman of Amaltas University is Shri Mayankraj Singh Bhadoria. '+L('#chairman','Chairman message')],
[['faculty','teacher','professor','staff','shikshak','lecturer'],'We have 18 teaching staff, led by Principal Dr. Neelam Khan, including associate and assistant professors and lecturers. '+L('#faculty','See the faculty list')],
[['hostel','accommodation','room','rehne','stay'],'Hostel on campus with shared rooms and low-cost private rooms, a common sitting area and a communal kitchen.'],
[['transport','bus','van ','travel'],'University buses cover important points in Indore, Dewas and Ujjain, and run for industrial tours and visits.'],
[['library','book','journal'],'The library and e-library have books, journals, e-books and quiet study areas.'],
[['lab','practical','instrument'],'Labs cover pharmaceutics, pharmaceutical chemistry, pharmacology and pharmacognosy, plus instrumentation. '+L('#facilities','See facilities')],
[['canteen','food','khana','water','mess'],'A well furnished, ventilated canteen with chillers, a freezer, and RO and UV drinking water.'],
[['campus','security','safe','garden','green','infrastructure','facilit','museum'],'A lush green campus with 24x7 security, classrooms, labs, a library, a museum, a hostel, a canteen and a medicinal garden. '+L('#facilities','Campus and facilities')],
[['event','celebrat','yoga','workshop','activit','happening'],'We hold celebrations, workshops and awareness drives through the year. '+L('#events','See events')],
[['award','prize','achievement'],L('#awards-faculty','Faculty awards')+' and '+L('#awards-student','student awards')+' are in the Happenings menu.'],
[['committee','ragging','discrimination','gender','complain'],'We run six committees: Internal Complaints, Student Grievance Redressal, Anti-Ragging, Anti-Discrimination, Career Guidance and Gender Sensitization. '+L('#committees','See committees')],
[['syllabus','curriculum','subject','paathyakram'],'Syllabus PDFs for B.Pharm and D.Pharm are available. '+L('#syllabus','Open syllabus')],
[['calendar','schedule','timetable','exam'],'The B.Pharm academic calendar for session 2026-2027 is on the '+L('#calendar','Academic calendar')+' page, with semester dates, sessional tests, exams and holidays.'],
[['career','job','placement','scope','naukri','salary'],'Pharmacy graduates work in pharma industry, hospitals, research, regulatory affairs and more. '+L('#career','Career opportunities')+'. For placement details, call '+T+'.'],
[['brochure','bulletin','download','prospectus'],L(PDF.brochure,'Brochure')+' and '+L(PDF.bulletin,'Bulletin')+', '+L(PDF.bulletin2,'Bulletin Vol. 02')+' are available as PDFs.'],
[['contact','phone','call','number','email','mail','toll','whatsapp','sampark'],'Principal: '+T+'. Campus: 07272-482547, 9685096514. Toll free: 1800-571-2181. Email: amaltaspharmacy@gmail.com. '+L('https://wa.me/917880154607','WhatsApp us')+' or '+L('#contact','send an enquiry')],
[['address','location','where','map','kahan','kaha','reach','bangar','indore','dewas'],'Campus: Village Bangar, Dewas-Ujjain Highway, Dewas (M.P.) 455001. City office: 204, Shree Krishna Classic, 139 Phadnis Colony, A.B. Road, Indore 452008, phone 0731-4215858. '+L('https://www.google.com/maps/search/?api=1&query=Amaltas+University+Bangar+Dewas','Open in Google Maps')],
[['facebook','instagram','social'],L('https://www.facebook.com/amaltasinstituteofpharmacy/','Facebook')+' and '+L('https://www.instagram.com/instituteofpharmacy_/','Instagram')],
[['thank','shukriya','dhanyawad'],'You are welcome! Ask anything else, or call '+T+' to talk to our team.']
];

export const FALLBACK =
  'I do not have that detail yet. Please call ' + T + ' or ' + L('#contact', 'send an enquiry') + ' and our team will help.';

export const GREETING =
  'Hi! I can answer questions about admission 2026-27, courses, eligibility, hostel, faculty and contact details. What would you like to know?';

export const QUICK_QUESTIONS = ['Admission 2026-27', 'Courses', 'Eligibility', 'Fees', 'Hostel', 'Contact'];

/** Pick the entry with the highest keyword-length score. */
export function findAnswer(q) {
  q = ' ' + q.toLowerCase() + ' ';
  let best = null, bestScore = 0;
  KB.forEach(([keys, answer]) => {
    let sc = 0;
    keys.forEach((k) => { if (q.indexOf(k) > -1) sc += k.length; });
    if (sc > bestScore) { bestScore = sc; best = answer; }
  });
  return best || FALLBACK;
}
