import { createContext, useContext, useEffect, useRef, useState } from 'react';

// Lightweight hash router: "#about" -> route "about".
// Keeps every existing "#page" link from the original site working, and needs no server rewrites.
//
// Page changes run through a short transition: the Amaltas loader fades in, the page swaps
// while it is covered, then the loader fades out. `loading` is exposed for <PageLoader>.
const RouteCtx = createContext('home');
const LoadingCtx = createContext(false);

const COVER_MS = 420;   // time for the loader to fully cover the old page
const REVEAL_MS = 380;  // time the loader stays after the new page mounts
const FIRST_MIN = 900;  // minimum loader time on first visit
const FIRST_MAX = 3000; // never block the first visit longer than this

function readHash() {
  return decodeURIComponent(location.hash.slice(1)) || 'home';
}

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion:reduce)').matches;

export function RouterProvider({ routes, children }) {
  const [route, setRoute] = useState(() => (routes[readHash()] ? readHash() : 'home'));
  const [loading, setLoading] = useState(true);
  const routeRef = useRef(route);
  const timers = useRef([]);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms));
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  // first visit: keep the loader up until the page has loaded (bounded by FIRST_MIN / FIRST_MAX)
  useEffect(() => {
    const t0 = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const wait = reducedMotion() ? 0 : Math.max(0, FIRST_MIN - (performance.now() - t0));
      setTimeout(() => setLoading(false), wait);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    const cap = setTimeout(finish, FIRST_MAX);
    return () => { clearTimeout(cap); window.removeEventListener('load', finish); };
  }, []);

  useEffect(() => {
    const onHash = () => {
      const id = routes[readHash()] ? readHash() : 'home';
      if (id === routeRef.current) { window.scrollTo(0, 0); return; }
      clearTimers();
      const swap = () => {
        routeRef.current = id;
        setRoute(id);
        window.scrollTo({ top: 0, behavior: 'instant' });
      };
      if (reducedMotion()) { swap(); return; }
      setLoading(true);
      later(() => {
        swap();
        later(() => setLoading(false), REVEAL_MS);
      }, COVER_MS);
    };
    window.addEventListener('hashchange', onHash);
    return () => { window.removeEventListener('hashchange', onHash); clearTimers(); };
  }, [routes]);

  useEffect(() => {
    const title = routes[route]?.title;
    document.title = (route === 'home' ? '' : title + ' · ') + 'Amaltas Institute of Pharmacy';
  }, [route, routes]);

  return (
    <RouteCtx.Provider value={route}>
      <LoadingCtx.Provider value={loading}>{children}</LoadingCtx.Provider>
    </RouteCtx.Provider>
  );
}

export const useRoute = () => useContext(RouteCtx);
export const useRouteLoading = () => useContext(LoadingCtx);

/** <a> that marks itself aria-current="page" when it points at the active route. */
export function HashLink({ href, children, ...rest }) {
  const route = useRoute();
  const current = href === '#' + route;
  return (
    <a href={href} aria-current={current ? 'page' : undefined} {...rest}>
      {children}
    </a>
  );
}
