import { useEffect, useRef, useState } from 'react';
import { CHAT_ENDPOINT } from '../config.js';
import { findAnswer, GREETING, QUICK_QUESTIONS } from '../data/chatKB.js';

let uid = 0;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ id: uid++, html: GREETING }]);
  const [text, setText] = useState('');
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [msgs]);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  function ask(q) {
    q = q.trim();
    if (!q) return;
    const pending = uid++;
    setMsgs((m) => [...m, { id: uid++, user: true, text: q }, { id: pending, html: '...' }]);
    const reply = (html) => setMsgs((m) => m.map((x) => (x.id === pending ? { ...x, html } : x)));

    if (CHAT_ENDPOINT) {
      fetch(CHAT_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: q }) })
        .then((r) => r.json())
        .then((j) => reply(j.reply || findAnswer(q)))
        .catch(() => reply(findAnswer(q)));
    } else {
      setTimeout(() => reply(findAnswer(q)), 450);
    }
  }

  // on small screens, close the panel when the user follows an in-site link
  function onMsgClick(e) {
    const a = e.target.closest('a');
    if (a && a.getAttribute('href')?.startsWith('#') && window.innerWidth < 541) setOpen(false);
  }

  return (
    <>
      <button id="cb" type="button" aria-label="Ask our AI assistant" onClick={() => setOpen((o) => !o)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3l1.9 5.6L17.5 10.5l-5.6 1.9L10 18l-1.9-5.6L2.5 10.5l5.6-1.9z" /><path d="M18.5 3l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z" /></svg>
        <span>Ask AI</span>
      </button>
      <section id="cp" className={open ? 'on' : undefined} aria-label="Chat assistant">
        <div className="ch">
          <div><b>Amaltas Assistant</b><small>Replies instantly</small></div>
          <button type="button" aria-label="Close chat" onClick={() => setOpen(false)}>&times;</button>
        </div>
        <div id="cm" ref={boxRef} aria-live="polite" onClick={onMsgClick}>
          {msgs.map((m) =>
            m.user ? (
              <div key={m.id} className="cg u">{m.text}</div>
            ) : (
              // answers come from our own static knowledge base (or your endpoint)
              <div key={m.id} className="cg" dangerouslySetInnerHTML={{ __html: m.html }} />
            )
          )}
        </div>
        <div className="cq">
          {QUICK_QUESTIONS.map((q) => <button key={q} type="button" onClick={() => ask(q)}>{q}</button>)}
        </div>
        <form id="cf" onSubmit={(e) => { e.preventDefault(); ask(text); setText(''); }}>
          <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Type your question" autoComplete="off" aria-label="Your question" />
          <button type="submit">Send</button>
        </form>
      </section>
    </>
  );
}
