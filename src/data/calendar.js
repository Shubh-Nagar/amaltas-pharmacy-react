// B.Pharm academic calendar, session 2026-2027.
// Each row: [particular, I semester, III/V/VII semesters, II/IV/VI/VIII semesters, isExamRow]
export const CAL_ROWS = [
  ['Duration of session / year', 'August 2026 to Dec 2026', 'July 2026 to Dec 2026', 'Jan 2027 to June 2027'],
  ['Commencement of academic classes', '20 August 2026 to 24 Dec 2026', '26 July 2026 to 19 Dec 2026', '27 Jan 2027 to 26 June 2027'],
  ['Induction', '7 Sept 2026', '–', '–'],
  ['Sessional Test I', '30 Oct to 4 Nov 2026', '12 Oct to 16 Oct 2026', '15 March to 20 March 2027', true],
  ['Sessional Test I result announcement', '12 Nov 2026', '23 Oct 2026', '27 March 2027'],
  ['Sessional Test II', '8 Dec to 13 Dec 2026', '1 Dec to 5 Dec 2026', '24 May to 29 May 2027', true],
  ['Sessional Test II result announcement', '16 Dec 2026', '11 Dec 2026', '5 June 2027'],
  ['Sessional Test III', '18 Dec to 24 Dec 2026', '14 Dec to 19 Dec 2026', '14 June to 19 June 2027', true],
  ['Sessional Test III result announcement', '26 Dec 2026', '24 Dec 2026', '24 June 2027'],
  ['Submission of practical files and assignments', '18 Dec to 24 Dec 2026', '14 Dec to 19 Dec 2026', '22 June to 26 June 2027'],
  ['End of teaching', '24 Dec 2026', '19 Dec 2026', '26 June 2027'],
  ['Submission of exam forms', '18 Dec to 24 Dec 2026', '18 Dec to 24 Dec 2026', '17 June to 24 June 2027'],
  ['Preparation leave', '24 Dec to 31 Dec 2026', '19 Dec to 31 Dec 2026', '27 June to 7 July 2027'],
  ['Submission of internal marks to the university', '27 Dec 2026', '27 Dec 2026', '30 June 2027'],
  ['Main theory exam', '1 Jan to 15 Jan 2027', '1 Jan to 15 Jan 2027', '8 July to 18 July 2027', true],
  ['External practical exam', '15 Jan to 20 Jan 2027', '15 Jan to 20 Jan 2027', '19 July to 25 July 2027', true],
  ['End semester break', '21 Jan to 31 Jan 2027 (winter break)', '21 Jan to 31 Jan 2027 (winter break)', '25 July to 31 July 2027 (summer break)'],
  ['Commencement of new session', '1 Feb 2027', '1 Feb 2027', '2 August 2027'],
];

export const CAL_TABS = [
  { v: '0', label: 'All semesters' },
  { v: '3', label: 'I semester' },
  { v: '4', label: 'III, V and VII' },
  { v: '5', label: 'II, IV, VI and VIII' },
];

export const HOLIDAYS_A = [
  ['26 January', 'Monday', 'Republic Day'],
  ['15 February', 'Sunday', 'Mahashivratri'],
  ['4 March', 'Wednesday', 'Holi'],
  ['26 March', 'Thursday', 'Ram Navami'],
  ['27 May', 'Wednesday', 'Id-ul-Juha'],
  ['26 June', 'Friday', 'Moharram'],
  ['15 August', 'Friday', 'Independence Day'],
];

export const HOLIDAYS_B = [
  ['28 August', 'Friday', 'Rakshabandhan'],
  ['4 September', 'Friday', 'Janmashtami'],
  ['2 October', 'Friday', 'Gandhi Jayanti'],
  ['20 October', 'Tuesday', 'Dussehra'],
  ['6 to 10 November', 'Friday to Tuesday', 'Diwali vacation'],
  ['24 November', 'Tuesday', 'Gurunanak Jayanti'],
  ['25 December', 'Thursday', 'Christmas'],
];

export const CAL_NOTES = [
  'Students must strictly follow the university attendance criterion (75%). Students who fall short will not be permitted to appear in the examination.',
  'During the sessional examinations, classes in the remaining periods will be conducted as per schedule.',
  'The III Sessional Examination is optional. Students who wish to appear in it will take it with their respective sessional exam in-charge.',
];
