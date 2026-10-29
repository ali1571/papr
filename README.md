# papr.site (shipped)(active development)

A free past paper website for Cambridge O Level and A Level students. Pick a subject and year, then view the question paper and mark scheme side by side on one screen. There are no ads, no logins and no redirects.

Live at https://papr.site

Actively used by students

## What it does

- Browse past papers by level, subject, year, session (summer or winter), paper and variant
- Opens the question paper and mark scheme next to each other, so you never switch tabs
- Each document can be opened full screen or downloaded
- Built-in exam timer on the paper view
- Notes section for History, Islamiat, Pakistan Studies, Geography and Computer Science, written by the developer
- Contact page and a feedback form that students can use anonymously
- Works on phones and desktops

## Subjects covered

O Level: Mathematics 4024, Physics 5054, Chemistry 5070, Biology, Computer Science 2210, Economics 2281, Islamiat 2058, Pakistan Studies 2059, History 2147

A Level: Computer Science 9618, Economics 9708

Papers go back to 2018 and are added as each exam series is released. Coverage differs by subject.

## Tech stack

| Part | What is used |
|---|---|
| Frontend | React, built with Vite |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| File storage | Supabase Storage, public bucket |
| PDF display | pdf.js |
| Hosting | Vercel |
| Caching | CDN in front of the site and the PDF files [name the provider] |
| Domain | Namecheap, pointed at Vercel |
| Fonts and icons | Space Grotesk, Inter, Font Awesome |

There is no backend server. The browser talks directly to Supabase. An earlier version used a small web service on Render, which was removed because cold starts made the first load slow.

## How it works

1. The student picks a level, then a subject and year, then a session, paper and variant.
2. The app looks up the matching rows in the `past-papers` table.
3. The file paths follow a fixed pattern, so the app builds the PDF links from the selection.
4. The question paper and mark scheme load side by side in the viewer.

### Database

One table, `past-papers`:

| Column | Type | Example |
|---|---|---|
| id | int8 | 1 |
| created_at | timestamptz | |
| subject_name | text | Mathematics |
| subject_code | text | 4024 |
| year | int4 | 2024 |
| session | text | winter |
| paper | text | p1 |
| variant | text | v2 |
| doc_type | text | qp or ms |
| file_url | text | full public link |

### File storage

PDFs live in a public bucket called `past-paper`:

```
past-paper/{subject}/{year}/{session}/{code}_{s or w}{yy}_{paper}_{variant}_{qp or ms}.pdf
```

Example:

```
past-paper/mathematics/24/winter/4024_w24_p1_v2_ms.pdf
```

### Notes

Notes are static HTML files stored in `frontend/public/content`. The note index is defined in `frontend/src/data/notesData.js` and displayed by `NotesPage.jsx`.

### Search engine setup

Because the app is client-rendered, `prerender.mjs` runs after the build and generates a static HTML file for every route (95 at the moment). Each file has its own title, description and heading, so search engines can read the pages. The repo also includes `sitemap.xml`, a plain HTML sitemap at `/sitemap`, `robots.txt` and structured data.

## Deployment

Pushing to `main` deploys automatically on Vercel.

## Adding papers

1. Upload the PDFs to the `past-paper` bucket using the naming pattern above.
2. Add the matching rows to the `past-papers` table.
3. Add the subject and year to the sitemap and the prerender route list if they are new.

## Roadmap

- Topical question practice, with questions sorted by topic from past papers
- AI marking against official mark schemes
- Accounts to track which papers a student has completed
- More subjects, especially A Level

## Content note

Past papers and mark schemes are copyright Cambridge University Press and Assessment. This project is a free, non-commercial study tool and does not claim ownership of them.

## Contact

Use the Say Hi page on the site, or the feedback box in the footer.
