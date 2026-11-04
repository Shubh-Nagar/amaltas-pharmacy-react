import { PDF } from '../config.js';

// Main menu. Items with `children` render as dropdowns.
export const MENU = [
  {
    label: 'About Us', icon: 'info',
    children: [
      { href: '#about', icon: 'building', label: 'About institute', hint: 'Our story, aim, vision and mission' },
      { href: '#chairman', icon: 'userStar', label: 'Chairman message', hint: 'A welcome from the Chairman' },
      { href: '#principal', icon: 'user', label: 'Principal message', hint: 'A welcome from Dr. Neelam Khan' },
      { href: '#committees', icon: 'users', label: 'Committees', hint: 'Cells for student welfare and guidance' },
    ],
  },
  {
    label: 'Admission', icon: 'grad',
    children: [
      { href: '#admission', icon: 'grad', label: 'Courses & eligibility', hint: 'B.Pharm, D.Pharm and documents' },
      { href: PDF.brochure, icon: 'download', label: 'Brochure', hint: 'Download the PDF', external: true },
      { href: PDF.pci, icon: 'fileCheck', label: 'PCI approval', hint: 'Approval letter 2025-26', external: true },
      { href: PDF.affiliation, icon: 'file', label: 'Affiliation letter', hint: 'Amaltas University affiliation', external: true },
      { href: '#contact', icon: 'send', label: 'Send an enquiry', hint: 'We will call you back' },
    ],
  },
  {
    label: 'Academic', icon: 'book',
    children: [
      { href: '#calendar', icon: 'calendar', label: 'Academic calendar', hint: 'Course-wise calendars' },
      { href: '#faculty', icon: 'users', label: 'Teaching faculty', hint: '18 faculty members' },
      { href: '#syllabus', icon: 'bookOpen', label: 'Syllabus', hint: 'B.Pharm and D.Pharm PDFs' },
      { href: '#career', icon: 'briefcase', label: 'Career', hint: 'Opportunities after pharmacy' },
      { href: PDF.bulletin, icon: 'newspaper', label: 'Bulletin', hint: 'Institute bulletin (PDF)', external: true },
      { href: PDF.bulletin2, icon: 'newspaper', label: 'Bulletin Vol. 02', hint: 'Pharma Biz, Volume 02 (PDF)', external: true },
    ],
  },
  { href: '#facilities', label: 'Facilities', icon: 'building' },
  {
    label: 'Happenings', icon: 'sparkles',
    children: [
      { href: '#events', icon: 'sparkles', label: 'Events', hint: 'Celebrations, workshops, drives' },
      { href: '#awards-faculty', icon: 'award', label: 'Awards, faculty', hint: 'Recognition for teaching staff' },
      { href: '#awards-student', icon: 'trophy', label: 'Awards, students', hint: 'Recognition for students' },
    ],
  },
  {
    label: 'Bulletin', icon: 'newspaper',
    children: [
      { href: PDF.bulletin, icon: 'newspaper', label: 'Bulletin', hint: 'Institute bulletin (PDF)', external: true },
      { href: PDF.bulletin2, icon: 'newspaper', label: 'Bulletin Vol. 02', hint: 'Pharma Biz, Volume 02 (PDF)', external: true },
    ],
  },
  { href: '#contact', label: 'Contact', icon: 'phone' },
];

export const ABOUT_SUB = [
  { href: '#about', label: 'About institute' },
  { href: '#chairman', label: 'Chairman message' },
  { href: '#principal', label: 'Principal message' },
];

export const ACADEMIC_SUB = [
  { href: '#calendar', label: 'Academic calendar' },
  { href: '#faculty', label: 'Teaching faculty' },
  { href: '#syllabus', label: 'Syllabus' },
];

export const AWARDS_SUB = [
  { href: '#awards-faculty', label: 'Faculty awards' },
  { href: '#awards-student', label: 'Student awards' },
];
