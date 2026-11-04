import { useEffect } from 'react';

// Scroll-triggered reveal for the whole site, without touching each page's markup.
// Matching elements get `.rv` (hidden state) and `data-rv` (animation style);
// when they enter the viewport they get `.in`, and once the animation ends the
// helper classes are removed so each element's own hover transitions work again.

const RULES = [
  // [selector, style]
  ['.band .crumb, .band h1, .band p, .band .sub', 'up'],
  ['section.s .eyebrow, section.s h2, section.s .lead, .cta-band .wrap > *', 'up'],
  ['.tiles > li, .facts li, .why > div, .steps > li, .vm > div, .abp > div', 'up'],
  ['.card, .links > a, .addr > div, .cal-card, .tw, .ctw, .elig, ul.tick > li', 'up'],
  ['.nf, .nb', 'up'],
  ['.ni', 'left'],
  ['.bigc, .mosaic > img, .gal > img', 'zoom'],
  ['.ab .abi, .bm:not(.r) .bi, .bm.r .bq, .split > img, .msg > img', 'left'],
  ['.ab .prose, .bm:not(.r) .bq, .bm.r .bi, .split .prose, .msg blockquote', 'right'],
  ['footer .fcols > div, footer .fbrand', 'up'],
];

const STEP_MS = 80;  // stagger between siblings
const MAX_STEPS = 6; // cap so long lists don't wait forever

function prep(root, io) {
  for (const [sel, kind] of RULES) {
    root.querySelectorAll(sel).forEach((el) => {
      if (el.dataset.rvDone || el.classList.contains('rv')) return;
      // stagger by position among siblings that are also revealed
      const sibs = el.parentElement ? [...el.parentElement.children].filter((c) => c.matches(sel)) : [el];
      const idx = Math.max(0, sibs.indexOf(el)) % MAX_STEPS;
      el.style.setProperty('--rvd', idx * STEP_MS + 'ms');
      el.dataset.rv = kind;
      el.classList.add('rv');
      io.observe(el);
    });
  }
}

function finish(el) {
  el.classList.remove('rv', 'in');
  el.style.removeProperty('--rvd');
  delete el.dataset.rv;
  el.dataset.rvDone = '1';
}

export default function useScrollReveal(dep) {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion:reduce)').matches) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        io.unobserve(el);
        el.classList.add('in');
        const done = (ev) => {
          if (ev.target !== el || ev.propertyName !== 'opacity') return;
          el.removeEventListener('transitionend', done);
          finish(el);
        };
        el.addEventListener('transitionend', done);
        // safety net if transitionend never fires (e.g. element hidden)
        setTimeout(() => el.classList.contains('in') && finish(el), 1600);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const scan = () => {
      prep(document.querySelector('main') || document.body, io);
      const f = document.querySelector('footer');
      if (f) prep(f, io);
    };
    scan();

    // pick up content that appears later (filters, search results, lazy sections)
    let raf = 0;
    const mo = new MutationObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(scan);
    });
    const main = document.querySelector('main');
    if (main) mo.observe(main, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      cancelAnimationFrame(raf);
      // reset anything still waiting (e.g. the footer) so the next scan picks it up again
      document.querySelectorAll('.rv:not(.in)').forEach((el) => {
        el.classList.remove('rv');
        el.style.removeProperty('--rvd');
        delete el.dataset.rv;
      });
    };
  }, [dep]);
}
