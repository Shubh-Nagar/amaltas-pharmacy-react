import { useEffect, useRef, useState } from 'react';
import { MENU } from '../data/nav.js';
import { LOGO, PDF } from '../config.js';
import { HashLink, useRoute } from '../lib/router.jsx';
import Img from './Img.jsx';
import { Arrow } from './common.jsx';
import Icon from './Icons.jsx';

function DDItem({ c }) {
  if (c.children) {
    // Nested submenu: the row links to the first child and flies out the rest on hover/focus.
    return (
      <>
        <HashLink href={c.children[0].href} className="ddsubt" aria-haspopup="true">
          <span className="ddi"><Icon name={c.icon || 'arrowRight'} size={19} /></span>
          <span className="ddt">{c.label}<small>{c.hint}</small></span>
          <span className="ddchev" aria-hidden="true" />
        </HashLink>
        <ul className="ddsub">
          {c.children.map((cc, i) => (
            <li key={cc.label + i} style={{ '--k': i }}><DDItem c={cc} /></li>
          ))}
        </ul>
      </>
    );
  }
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

const isDesktop = () => window.matchMedia('(min-width: 1341px)').matches;

function Dropdown({ item, open, onToggle, onOpen, onHoverOpen, onHoverClose, onClose }) {
  const route = useRoute();
  const flat = item.children.flatMap((c) => (c.children ? c.children : [c]));
  const active = flat.some((c) => c.href === '#' + route);
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
    <li
      className={'dd' + (open ? ' open' : '')}
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => { if (e.pointerType === 'mouse' && isDesktop()) onHoverOpen(); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse' && isDesktop()) onHoverClose(); }}
      onBlur={(e) => {
        // keyboard: close when focus moves out of this dropdown
        if (isDesktop() && !e.currentTarget.contains(e.relatedTarget)) onClose();
      }}
    >
      <button
        ref={btnRef}
        className="ddb"
        aria-expanded={open}
        aria-haspopup="true"
        aria-current={active ? 'page' : undefined}
        onClick={(e) => {
          e.stopPropagation();
          // With a mouse on desktop, hover already controls the menu; a click just keeps it open.
          if (isDesktop() && e.nativeEvent.pointerType === 'mouse') onOpen();
          else onToggle();
        }}
      >
        <Icon name={item.icon} size={18} className="mi" />
        <span className="ml">{item.label}</span>
      </button>
      <ul ref={listRef}>
        {item.children.map((c, i) => (
          <li key={c.label + i} className={c.children ? 'hassub' : undefined} style={{ '--k': i }}><DDItem c={c} /></li>
        ))}
      </ul>
    </li>
  );
}

/** Gold rosette seal with a tick, used for the "PCI Approved" mark in the nav bar. */
function PciSeal() {
  return (
    <svg className="pcib-seal" viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id="pcibGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBE07F" />
          <stop offset=".5" stopColor="#E0A82E" />
          <stop offset="1" stopColor="#F3C95B" />
        </linearGradient>
      </defs>
      <polygon className="pcib-rose" points="24.0,1.0 27.9,4.2 32.8,2.8 35.2,7.2 40.3,7.7 40.8,12.8 45.2,15.2 43.8,20.1 47.0,24.0 43.8,27.9 45.2,32.8 40.8,35.2 40.3,40.3 35.2,40.8 32.8,45.2 27.9,43.8 24.0,47.0 20.1,43.8 15.2,45.2 12.8,40.8 7.7,40.3 7.2,35.2 2.8,32.8 4.2,27.9 1.0,24.0 4.2,20.1 2.8,15.2 7.2,12.8 7.7,7.7 12.8,7.2 15.2,2.8 20.1,4.2" fill="url(#pcibGold)" />
      <circle cx="24" cy="24" r="16" fill="#107C3A" stroke="#FFF6D6" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="12.6" fill="none" stroke="#F3C95B" strokeWidth=".8" strokeDasharray="1.6 1.4" />
      <path d="m17.5 24.4 4.4 4.4 8.6-9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header({ onSearch }) {
  const route = useRoute();
  const [drawer, setDrawer] = useState(false);
  const [openDD, setOpenDD] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [noLogo, setNoLogo] = useState(false);
  const closeTimer = useRef(null);
  const hoverOpen = (label) => { clearTimeout(closeTimer.current); setOpenDD(label); };
  const hoverClose = (label) => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDD((o) => (o === label ? null : o)), 180);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

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
        <a className="pcib" href={PDF.pci} target="_blank" rel="noopener" title="View the PCI approval letter" aria-label="Approved by the Pharmacy Council of India. View the approval letter">
          <PciSeal />
          <span className="pcib-t">
            <b>PCI Approved</b>
            <small>Pharmacy Council of India</small>
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
                  onOpen={() => hoverOpen(item.label)}
                  onHoverOpen={() => hoverOpen(item.label)}
                  onHoverClose={() => hoverClose(item.label)}
                  onClose={() => setOpenDD((o) => (o === item.label ? null : o))}
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
