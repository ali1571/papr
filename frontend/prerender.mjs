/**
 * prerender.mjs
 * Run after `vite build`. Injects route-specific meta tags into static HTML
 * files so Google gets correct titles/descriptions without waiting for JS.
 *
 * Usage: node prerender.mjs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const BASE_URL = "https://papr.site";

// ─── Notes structure (kept in sync with notesData.js) ────────────────────────

const notesStructure = {
  history: {
    name: "History", code: "2059",
    groups: [
      { slug: "section-1", label: "Section 1" },
      { slug: "section-2", label: "Section 2" },
      { slug: "section-3", label: "Section 3" },
    ],
  },
  islamiat: {
    name: "Islamiat", code: "2058",
    groups: [
      { slug: "p1", label: "Paper 1" },
      { slug: "p2", label: "Paper 2" },
    ],
  },
  geography: {
    name: "Geography", code: "2217",
    groups: [],
  },
  "computer-science": {
    name: "Computer Science", code: "2210",
    groups: [
      { slug: "p1", label: "Paper 1" },
      { slug: "p2", label: "Paper 2" },
    ],
  },
};

function buildNotesRoutes() {
  const entries = [];
  for (const [slug, data] of Object.entries(notesStructure)) {
    entries.push({
      path: `/notes/${slug}`,
      title: `${data.name} Notes | O Level ${data.code} | Free Revision | pApr`,
      description: `Free O Level ${data.name} ${data.code} revision notes. Curated, exam-focused, topic-by-topic. pApr.`,
      canonical: `${BASE_URL}/notes/${slug}`,
    });
    for (const g of data.groups) {
      entries.push({
        path: `/notes/${slug}/${g.slug}`,
        title: `${data.name} ${g.label} Notes | O Level ${data.code} | pApr`,
        description: `Free O Level ${data.name} ${data.code} ${g.label} revision notes. Concise, exam-focused. pApr.`,
        canonical: `${BASE_URL}/notes/${slug}/${g.slug}`,
      });
    }
  }
  return entries;
}

// ─── Meta data per route ──────────────────────────────────────────────────────

const routes = [
  {
    path: "/",
    title: "pApr — Free O Level & A Level Past Papers | IGCSE | CAIE Cambridge",
    description: "pApr is the fastest way to find free CAIE Cambridge O Level and A Level past papers. Chemistry, Physics, Maths, Computer Science, Economics and more. Question papers, mark schemes and examiner reports 2018–2025.",
    canonical: BASE_URL,
  },
  {
    path: "/olevels",
    title: "O Level Past Papers 2018–2025 | Free IGCSE Download | pApr",
    description: "Free O Level and IGCSE past papers for Chemistry 5070, Physics 5054, Maths 4024, Computer Science 2210, Economics 2281, Islamiat 2058, Pakistan Studies 2059, History 2147. Question papers, mark schemes and examiner reports. pApr.",
    canonical: `${BASE_URL}/olevels`,
  },
  {
    path: "/alevels",
    title: "A Level Past Papers 2018–2025 | Free Cambridge Download | pApr",
    description: "Free A Level past papers for Computer Science 9618 and Economics 9708. Question papers and mark schemes from 2018–2025. pApr — the fastest way to access CAIE Cambridge A Level past papers.",
    canonical: `${BASE_URL}/alevels`,
  },
  {
    path: "/say-hi",
    title: "Say Hi | pApr — Free CAIE Past Papers",
    description: "Get in touch with the pApr team. We'd love to hear from you.",
    canonical: `${BASE_URL}/say-hi`,
  },

  // O Level subjects
  ...buildSubjectRoutes("olevels", "chemistry",       "Chemistry",       "5070", [2024,2023,2022,2021,2020,2019,2018]),
  ...buildSubjectRoutes("olevels", "physics",         "Physics",         "5054", [2024,2023,2022,2021,2020,2019,2018]),
  ...buildSubjectRoutes("olevels", "mathematics",     "Mathematics",     "4024", [2024,2023,2022,2021,2020,2019,2018]),
  ...buildSubjectRoutes("olevels", "computer-science","Computer Science","2210", [2024,2023,2022,2021,2020,2019,2018]),
  ...buildSubjectRoutes("olevels", "economics",       "Economics",       "2281", [2024,2023,2022,2021,2020,2019,2018]),
  ...buildSubjectRoutes("olevels", "islamiat",        "Islamiat",        "2058", [2024,2023,2022,2021,2020,2019,2018]),
  ...buildSubjectRoutes("olevels", "pakistan-studies","Pakistan Studies","2059", [2024,2023,2022,2021,2020,2019,2018]),
  ...buildSubjectRoutes("olevels", "history",         "History",         "2147", [2024,2023,2022,2021,2020,2019,2018]),

  // A Level subjects
  ...buildSubjectRoutes("alevels", "computer-science","Computer Science","9618", [2025,2024,2023,2022,2021], "A Level"),
  ...buildSubjectRoutes("alevels", "economics",       "Economics",       "9708", [2025,2024,2023,2022,2021,2020,2019,2018], "A Level"),

  // Notes — subject + group level (topic routes added per topic in notesData)
  {
    path: "/notes",
    title: "O Level Notes | Free Revision Notes | pApr",
    description: "Free curated O Level revision notes for History, Islamiat, Geography and Computer Science. Exam-focused, topic-by-topic. pApr.",
    canonical: `${BASE_URL}/notes`,
  },
  ...buildNotesRoutes(),
];

function buildSubjectRoutes(level, slug, name, code, years, levelLabel = "O Level") {
  const levelPath = level === "olevels" ? "/olevels" : "/alevels";
  const yearRange = `${years[years.length - 1]}–${years[0]}`;
  const entries = [
    {
      path: `${levelPath}/${slug}`,
      title: `${name} ${code} Past Papers ${yearRange} | ${levelLabel} | Free Download | pApr`,
      description: `Free ${levelLabel} ${name} ${code} past papers, mark schemes and examiner reports ${yearRange}. Summer and winter sessions. pApr — instant CAIE Cambridge past papers.`,
      canonical: `${BASE_URL}${levelPath}/${slug}`,
      bodyContent: `
        <h1>Cambridge ${levelLabel} ${name} (${code}) Past Papers</h1>
        <p>Download free Cambridge ${levelLabel} ${name} ${code} past papers, mark schemes
        and examiner reports from ${yearRange}. All sessions included — May/June and
        October/November. No signup required.</p>
        <h2>Available Years</h2>
        <ul>${years.map(y => `<li><a href="${BASE_URL}${levelPath}/${slug}/${y}">${name} ${code} Past Papers ${y}</a></li>`).join('')}</ul>
        <h2>Frequently Asked Questions</h2>
        <h3>Are ${name} ${code} past papers free on papr.site?</h3>
        <p>Yes. All ${levelLabel} ${name} ${code} past papers are completely free with no signup required.</p>
        <h3>Does papr.site have ${name} ${code} mark schemes?</h3>
        <p>Yes. Every paper includes the corresponding mark scheme and examiner report where available.</p>
        <h3>Which years are available for ${name} ${code}?</h3>
        <p>papr.site has ${name} ${code} past papers from ${years[years.length-1]} to ${years[0]},
        covering both May/June and October/November series.</p>
      `,
    },
  ];
  for (const year of years) {
    entries.push({
      path: `${levelPath}/${slug}/${year}`,
      title: `${name} ${code} ${year} Past Paper | ${levelLabel} | Free Download | pApr`,
      description: `Free ${levelLabel} ${name} ${code} ${year} past paper, mark scheme and examiner report. pApr.`,
      canonical: `${BASE_URL}${levelPath}/${slug}/${year}`,
      bodyContent: `
        <h1>Cambridge ${levelLabel} ${name} (${code}) ${year} Past Papers</h1>
        <p>Download free Cambridge ${levelLabel} ${name} ${code} ${year} past papers including
        mark schemes and examiner reports. Covers May/June ${year} and October/November ${year} sessions.
        No signup required.</p>
        <h2>Papers Available for ${year}</h2>
        <ul>
          <li>${name} ${code} ${year} Question Paper — May/June</li>
          <li>${name} ${code} ${year} Mark Scheme — May/June</li>
          <li>${name} ${code} ${year} Question Paper — October/November</li>
          <li>${name} ${code} ${year} Mark Scheme — October/November</li>
        </ul>
        <h2>Frequently Asked Questions</h2>
        <h3>Are ${name} ${code} ${year} papers free?</h3>
        <p>Yes. All papers on papr.site are completely free with no account or signup required.</p>
        <h3>Does the ${year} ${name} paper include mark schemes?</h3>
        <p>Yes. The mark scheme and examiner report for ${name} ${code} ${year} are available on papr.site.</p>
      `,
    });
  }
  return entries;
}

// ─── Inject into HTML ─────────────────────────────────────────────────────────

const template = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");

function injectMeta(html, { title, description, canonical, bodyContent }) {
  // Title
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  // Description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${description}" />`
    );
  } else {
    html = html.replace("</head>", `  <meta name="description" content="${description}" />\n</head>`);
  }

  // Canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical"[^>]*>/,
      `<link rel="canonical" href="${canonical}" />`
    );
  } else {
    html = html.replace("</head>", `  <link rel="canonical" href="${canonical}" />\n</head>`);
  }

  // OG tags
  html = html.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${canonical}" />`);

  // Twitter tags
  html = html.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${title}" />`);
  html = html.replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${description}" />`);

  // Body content
  if (bodyContent) {
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>\n<div id="seo-content" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden">${bodyContent}</div>`
    );
  }

  // Schema JSON-LD
  const isALevel = canonical.includes('/alevels/');
  const isOLevel = canonical.includes('/olevels/');
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": isALevel || isOLevel ? ["WebPage", "LearningResource"] : "WebPage",
        "name": title,
        "description": description,
        "url": canonical,
        ...(isALevel || isOLevel ? {
          "educationalLevel": isALevel ? "A-Level" : "O-Level",
          "provider": {
            "@type": "Organization",
            "name": "Cambridge Assessment International Education"
          }
        } : {}),
        "isPartOf": {
          "@type": "WebSite",
          "name": "papr.site",
          "url": "https://papr.site"
        }
      }
    ]
  };

  html = html.replace(
    '</head>',
    `  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n</head>`
  );

  return html;
}

let count = 0;
for (const route of routes) {
  const html = injectMeta(template, route);
  const filePath = route.path === "/"
    ? path.join(DIST, "index.html")
    : path.join(DIST, route.path.slice(1), "index.html");

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html, "utf-8");
  count++;
  console.log(`✓ ${route.path}`);
}

console.log(`\nPrerendered ${count} routes.`);
