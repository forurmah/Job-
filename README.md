# Job Application Tracker

A small browser app for tracking job applications, statuses, dates, and notes. It runs as a static HTML/CSS/JavaScript project and saves applications in `localStorage`.

## Features

- Add job applications with company, position, status, date, and notes
- Edit or delete existing applications
- Search by company or position
- Filter by status: Applied, Interview, Offer, or Rejected
- Keep data in the browser with `localStorage`

## Project Structure

```text
.
├── index.html
├── job.css
├── js
│   ├── storage.js
│   ├── tracker.js
│   ├── ui.js
│   └── validation.js
└── site-icon.svg
```

## How To Run

Open `index.html` in a browser.

For a simple local server, run:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## Next Improvements

- Add application counters for each status
- Add sorting by newest or oldest date
- Add confirmation before deleting an application
- Add screenshots to the README
