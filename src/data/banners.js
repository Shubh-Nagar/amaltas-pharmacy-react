import { COMMITTEES } from './committees.js';

// Page-title banner photos, matching the old site (amaltasgroup.co.in/pharmacy).
// Paths are on the institute server (assets/images/...). Pages not listed use DEFAULT_BANNER,
// which is the old site's default sub-header image.
export const DEFAULT_BANNER = 'assets/images/banner.jpg';

export const BANNERS = {
  about: 'assets/images/COLLEGE-PIC.jpg',
  chairman: 'assets/images/chairman_message_banner.jpg',
  principal: 'assets/images/PRINCIPAL-MESSAGE.jpg',
  calendar: 'assets/images/ACADEMIC-CALENDER.jpg',
  faculty: 'assets/images/teaching_faculty.jpg',
  syllabus: 'assets/images/SYLLABUS.jpg',
  career: 'assets/images/CAREER.jpg',
  facilities: 'assets/images/infra.jpg',
  events: 'assets/images/event.png',
  committees: 'assets/images/committees.jpg',
  ...Object.fromEntries(COMMITTEES.map((c) => [c.id, 'assets/images/committees.jpg'])),
};

export const bannerFor = (route) => BANNERS[route] || DEFAULT_BANNER;
