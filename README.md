# Amaltas Institute of Pharmacy — React website

React 18 + Vite conversion of the single-file `index.html` site. Same design, same content, same behaviour.

## Run

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production files in dist/
npm run preview   # serve the build locally
```

## Deploy (Hostinger / any static host)

Upload the **contents** of `dist/` to `public_html` (or a sub-folder such as `public_html/pharmacy`).
Routing uses URL hashes (`/#about`, `/#events`), so no `.htaccess` rewrite rules are needed,
and `base: './'` in `vite.config.js` lets it run from any folder.

## Structure

```
src/
  App.jsx                 route table (#id -> page) + app shell
  config.js               remote image base URL, PDF links, phone/email, chat endpoint
  index.css               all styles (carried over from the original file)
  lib/router.jsx          tiny hash router + <HashLink> (sets aria-current)
  components/
    Header.jsx            sticky header, dropdowns, mobile drawer, scroll progress
    Footer.jsx
    Img.jsx               remote image with http/https fallback
    Lightbox.jsx          photo viewer (click any gallery image; arrow keys work)
    EventModal.jsx        event details + photo gallery (probes numbered photos on the server)
    SearchDialog.jsx      site search ("/" or Ctrl+K)
    ChatBot.jsx           "Ask AI" assistant (keyword answers, optional API)
    EnquiryForm.jsx       hero quick enquiry + contact form (email / WhatsApp)
    Fab.jsx               WhatsApp + back-to-top buttons
    common.jsx            Band (page header), helpers
  pages/                  Home, About/Chairman/Principal, Admission, Academic, Campus, Committees, Contact
  data/                   events.json (68 events), faculty, facilities, labs, gallery, calendar, committees, chatKB
public/images/events/     photos that were embedded in the original HTML (Pharmacists Day, Conference, Industrial Visit, Librarian Day)
```

## Common edits

- **Add an event:** add an object at the top of `src/data/events.json`
  (`date` like `"24 Sep 2026"`, `title`, `image` = server path such as `activities/folder/1.jpeg`, `details` = paragraphs).
  For photos hosted with this app, put them in `public/images/events/<name>/`, list them in `src/data/localPhotos.json`, and set `image` to `"local:<name>"`.
- **Faculty / committees / calendar:** edit the files in `src/data/`.
- **Phone, email, PDF links:** `src/config.js`.
- **Chat API:** copy `.env.example` to `.env` and set `VITE_CHAT_ENDPOINT` (POST `{message}` → `{reply}`).

Images other than the event photos above still load from `amaltasgroup.co.in/pharmacy/`, as in the original.
