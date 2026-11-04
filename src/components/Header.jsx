import { useEffect, useRef, useState } from 'react';
import { MENU } from '../data/nav.js';
import { LOGO } from '../config.js';
import { HashLink, useRoute } from '../lib/router.jsx';
import Img from './Img.jsx';
import { Arrow } from './common.jsx';
import Icon from './Icons.jsx';

function DDItem({ c }) {
  const inner = (
    <>
      <span className="ddi"><Icon name={c.icon || 'arrowRight'} size={19} /></span>
      <span className="ddt">{c.label}<small>{c.hint}</small></span>
      {c.external && <Icon name="external" size={14} className="ddx" title="Opens in a new tab" />}
    </>
  );
  return c.external
    ? <a href={c.href} target="_blank" rel="noopener">{inner}</a>
    : <HashLink href={c.href}>{inner}</HashLink>;
}

function Dropdown({ item, open, onToggle, onOpen }) {
  const route = useRoute();
  const active = item.children.some((c) => c.href === '#' + route);
  const btnRef = useRef(null);
  const listRef = useRef(null);

  // Arrow keys move between items; Down on the button opens the menu.
  const focusItem = (dir) => {
    const links = [...listRef.current.querySelectorAll('a')];
    const i = links.indexOf(document.activeElement);
    const next = dir === 'first' ? 0 : dir === 'last' ? links.length - 1 : (i + dir + links.length) % links.length;
    links[next]?.focus();
  };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) onOpen(); requestAnimationFrame(() => focusItem(e.target === btnRef.current ? 'first' : 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (!open) onOpen(); requestAnimationFrame(() => focusItem(e.target === btnRef.current ? 'last' : -1)); }
    else if (e.key === 'Home' && e.target !== btnRef.current) { e.preventDefault(); focusItem('first'); }
    else if (e.key === 'End' && e.target !== btnRef.current) { e.preventDefault(); focusItem('last'); }
  };

  return (
    <li className={'dd' + (open ? ' open' : '')} onKeyDown={onKeyDown}>
      <button
        ref={btnRef}
        className="ddb"
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={active ? 'page' : undefined}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
          if (open) btnRef.current.blur();
        }}
      >
        <Icon name={item.icon} size={18} className="mi" />
        <span className="ml">{item.label}</span>
      </button>
      <ul ref={listRef}>
        {item.children.map((c, i) => (
          <li key={c.label + i} style={{ '--k': i }}><DDItem c={c} /></li>
        ))}
      </ul>
    </li>
  );
}

export default function Header({ onSearch, theme, onToggleTheme }) {
  const route = useRoute();
  const [drawer, setDrawer] = useState(false);
  const [openDD, setOpenDD] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [noLogo, setNoLogo] = useState(false);

  // close menus on navigation
  useEffect(() => {
    setDrawer(false);
    setOpenDD(null);
    // drop focus from the clicked menu link so its hover/focus underline doesn't linger
    if (document.activeElement?.closest('header.site .menu')) document.activeElement.blur();
  }, [route]);

  // lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.classList.toggle('lock', drawer);
  }, [drawer]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
      setScrolled(y > 8);
    };
    const onDocClick = (e) => { if (!e.target.closest('.dd')) setOpenDD(null); };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpenDD(null);
        setDrawer(false);
        if (document.activeElement?.closest('.dd')) document.activeElement.blur();
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className={'site' + (scrolled ? ' sc' : '')}>
      <div className={'scrim' + (drawer ? ' on' : '')} onClick={() => setDrawer(false)} />
      <div className="wrap nav">
        <a className="brand" href="#home" aria-label="Amaltas Institute of Pharmacy, home">
          <span className={'lg' + (noLogo ? ' nologo' : '')}>
            <Img path={LOGO} lazy={false} onBroken={() => setNoLogo(true)} />
          </span>
        </a>

        <nav aria-label="Main">
          <ul className={'menu' + (drawer ? ' open' : '')} id="menu">
            <li className="mhd">
              <span>Menu</span>
              <button type="button" onClick={() => setDrawer(false)}><Icon name="close" size={15} /> Close</button>
            </li>
            <li className="mhome"><HashLink href="#home"><Icon name="home" size={18} className="mi" /><span className="ml">Home</span></HashLink></li>
            {MENU.map((item) =>
              item.children ? (
                <Dropdown
                  key={item.label}
                  item={item}
                  open={openDD === item.label}
                  onToggle={() => setOpenDD((o) => (o === item.label ? null : item.label))}
                  onOpen={() => setOpenDD(item.label)}
                />
              ) : (
                <li key={item.label}><HashLink href={item.href}><Icon name={item.icon} size={18} className="mi" /><span className="ml">{item.label}</span></HashLink></li>
              )
            )}
            <li className="mob"><a href="#contact" className="btn">Apply 2026-27 <Arrow /></a></li>
          </ul>
        </nav>

        <div className="acts">
          <button className="ib" type="button" aria-label="Search the site" title="Search ( / )" onClick={onSearch}>
            <Icon name="search" size={18} stroke={2.2} />
          </button>
          <button className="ib" type="button" aria-label="Switch light or dark theme" title={theme === 'dark' ? 'Light theme' : 'Dark theme'} aria-pressed={theme === 'dark'} onClick={onToggleTheme}>
            <span className="tg-ic" key={theme}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} /></span>
          </button>
          <a className="btn" href="#contact">Apply 2026-27 <Arrow /></a>
          <button
            className="burger"
            type="button"
            aria-label={drawer ? 'Close menu' : 'Open menu'}
            aria-expanded={drawer}
            aria-controls="menu"
            onClick={() => setDrawer((d) => !d)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div className="prog" style={{ width: progress + '%' }} />
    </header>
  );
}
