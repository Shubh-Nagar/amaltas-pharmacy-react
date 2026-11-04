import { useCallback, useEffect, useRef, useState } from 'react';
import { RouterProvider, useRoute } from './lib/router.jsx';
import { LightboxProvider } from './components/Lightbox.jsx';
import { EventModalProvider } from './components/EventModal.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SearchDialog from './components/SearchDialog.jsx';
import ChatBot from './components/ChatBot.jsx';
import Fab from './components/Fab.jsx';
import PageLoader from './components/PageLoader.jsx';
import useScrollReveal from './lib/useScrollReveal.js';

import Home from './pages/Home.jsx';
import { About, Chairman, Principal } from './pages/AboutPages.jsx';
import Admission from './pages/Admission.jsx';
import { Calendar, Career, Faculty, Syllabus } from './pages/AcademicPages.jsx';
import { AwardsFaculty, AwardsStudent, Events, Facilities } from './pages/CampusPages.jsx';
import { Committee, Committees, Contact } from './pages/OtherPages.jsx';
import { COMMITTEES } from './data/committees.js';

// Route id (the part after #) -> page. Titles feed document.title and site search.
export const ROUTES = {
  home: { title: 'Home', Component: Home },
  about: { title: 'About the institute', Component: About },
  chairman: { title: 'Chairman message', Component: Chairman },
  principal: { title: 'Principal message', Component: Principal },
  admission: { title: 'Admission and courses', Component: Admission },
  calendar: { title: 'Academic calendar', Component: Calendar },
  faculty: { title: 'Teaching faculty', Component: Faculty },
  syllabus: { title: 'Syllabus', Component: Syllabus },
  facilities: { title: 'Facilities', Component: Facilities },
  events: { title: 'Events', Component: Events },
  'awards-faculty': { title: 'Faculty awards', Component: AwardsFaculty },
  'awards-student': { title: 'Student awards', Component: AwardsStudent },
  committees: { title: 'Committees', Component: Committees },
  ...Object.fromEntries(
    COMMITTEES.map((c) => [c.id, { title: c.name, Component: () => <Committee committee={c} /> }])
  ),
  career: { title: 'Career', Component: Career },
  contact: { title: 'Contact', Component: Contact },
};

function useTheme() {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);
  const toggle = useCallback(() => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('aip-theme', next); } catch { /* storage unavailable */ }
      return next;
    });
  }, []);
  return [theme, toggle];
}

function CurrentPage() {
  const route = useRoute();
  const { Component } = ROUTES[route];
  return (
    <div className="page active" key={route}>
      <Component />
    </div>
  );
}

function Shell() {
  const [theme, toggleTheme] = useTheme();
  const route = useRoute();
  useScrollReveal(route);
  const search = useRef(null);
  const openSearch = useCallback(() => search.current?.open(), []);

  // "/" or Ctrl/Cmd+K opens site search
  useEffect(() => {
    const onKey = (e) => {
      const typing = /INPUT|TEXTAREA|SELECT/.test(e.target?.tagName || '');
      if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        openSearch();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openSearch]);

  return (
    <>
      <PageLoader />
      <Header onSearch={openSearch} theme={theme} onToggleTheme={toggleTheme} />
      <main><CurrentPage /></main>
      <Footer />
      <SearchDialog ref={search} routes={ROUTES} />
      <Fab />
      <ChatBot />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider routes={ROUTES}>
      <LightboxProvider>
        <EventModalProvider>
          <Shell />
        </EventModalProvider>
      </LightboxProvider>
    </RouterProvider>
  );
}
