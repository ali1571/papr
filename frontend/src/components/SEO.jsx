import { Helmet } from "react-helmet-async";

const BASE_URL = "https://papr.site";

// FAQ data per subject — targets real "People Also Ask" queries on Google
const oLevelFAQs = {
  "Chemistry": [
    { q: "Where can I find free O Level Chemistry 5070 past papers?", a: "pApr (papr.site) provides free O Level Chemistry 5070 past papers, mark schemes and examiner reports from 2018 to 2025, covering both summer and winter sessions." },
    { q: "What is the subject code for O Level Chemistry?", a: "The subject code for O Level Chemistry is 5070, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are O Level Chemistry 5070 mark schemes available for free?", a: "Yes. pApr provides free Chemistry 5070 mark schemes alongside question papers for every available year from 2018 to 2025." },
    { q: "What papers are in O Level Chemistry 5070?", a: "O Level Chemistry 5070 consists of Paper 1 (Multiple Choice), Paper 2 (Theory), Paper 4 (Alternative to Practical), and Paper 6 (Alternative to Practical), available in summer and winter sessions." },
    { q: "How do I download O Level Chemistry past papers?", a: "Visit papr.site/olevels/chemistry, select your year, and instantly view or download the question paper and mark scheme." },
  ],
  "Physics": [
    { q: "Where can I find free O Level Physics 5054 past papers?", a: "pApr (papr.site) provides free O Level Physics 5054 past papers, mark schemes and examiner reports from 2018 to 2025." },
    { q: "What is the subject code for O Level Physics?", a: "The subject code for O Level Physics is 5054, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are O Level Physics 5054 mark schemes free?", a: "Yes. pApr provides free Physics 5054 mark schemes for every available year and session from 2018 to 2025." },
    { q: "What papers are in O Level Physics 5054?", a: "O Level Physics 5054 includes Paper 1 (Multiple Choice), Paper 2 (Theory), and Paper 4 (Alternative to Practical), in summer and winter sessions." },
    { q: "How do I download O Level Physics past papers?", a: "Visit papr.site/olevels/physics, select your year, and view the question paper and mark scheme instantly." },
  ],
  "Mathematics": [
    { q: "Where can I find free O Level Mathematics 4024 past papers?", a: "pApr (papr.site) provides free O Level Mathematics 4024 past papers and mark schemes from 2018 to 2025." },
    { q: "What is the subject code for O Level Mathematics?", a: "The subject code for O Level Mathematics is 4024, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are O Level Maths 4024 mark schemes free?", a: "Yes. pApr provides free Mathematics 4024 mark schemes for every year and session from 2018 to 2025." },
    { q: "What papers are in O Level Mathematics 4024?", a: "O Level Mathematics 4024 has Paper 1 (no calculator) and Paper 2 (calculator allowed), in summer and winter sessions." },
    { q: "How do I access O Level Maths past papers?", a: "Visit papr.site/olevels/mathematics, choose your year, and get the question paper and mark scheme instantly." },
  ],
  "Computer Science": [
    { q: "Where can I find free O Level Computer Science 2210 past papers?", a: "pApr (papr.site) provides free O Level Computer Science 2210 past papers and mark schemes from 2018 to 2025." },
    { q: "What is the subject code for O Level Computer Science?", a: "The subject code for O Level Computer Science is 2210, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are O Level Computer Science 2210 mark schemes free?", a: "Yes. pApr provides free 2210 mark schemes for every year and session from 2018 to 2025." },
    { q: "What papers are in O Level Computer Science 2210?", a: "O Level Computer Science 2210 includes Paper 1 (Theory) and Paper 2 (Problem-solving and Programming), in summer and winter sessions." },
    { q: "How do I download O Level Computer Science past papers?", a: "Visit papr.site/olevels/computer-science, choose your year, and view or download instantly." },
  ],
  "Economics": [
    { q: "Where can I find free O Level Economics 2281 past papers?", a: "pApr (papr.site) provides free O Level Economics 2281 past papers and mark schemes from 2018 to 2025." },
    { q: "What is the subject code for O Level Economics?", a: "The subject code for O Level Economics is 2281, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are O Level Economics 2281 mark schemes free?", a: "Yes. pApr provides free Economics 2281 mark schemes for every available year and session." },
    { q: "What papers are in O Level Economics 2281?", a: "O Level Economics 2281 includes Paper 1 (Multiple Choice) and Paper 2 (Structured Questions), available in summer and winter sessions." },
    { q: "How do I access O Level Economics past papers?", a: "Visit papr.site/olevels/economics, select your year, and get instant access." },
  ],
  "Islamiat": [
    { q: "Where can I find free O Level Islamiat 2058 past papers?", a: "pApr (papr.site) provides free O Level Islamiat 2058 past papers and mark schemes from 2018 to 2025." },
    { q: "What is the subject code for O Level Islamiat?", a: "The subject code for O Level Islamiat is 2058, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are O Level Islamiat 2058 mark schemes free?", a: "Yes. pApr provides free Islamiat 2058 mark schemes for every available year and session." },
    { q: "How do I download O Level Islamiat past papers?", a: "Visit papr.site/olevels/islamiat, pick your year, and access the question paper and mark scheme instantly." },
  ],
  "pkst": [
    { q: "Where can I find free O Level Pakistan Studies 2059 past papers?", a: "pApr (papr.site) provides free O Level Pakistan Studies 2059 past papers and mark schemes from 2018 to 2025." },
    { q: "What is the subject code for O Level Pakistan Studies?", a: "The subject code for O Level Pakistan Studies is 2059, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are O Level Pakistan Studies 2059 mark schemes free?", a: "Yes. pApr provides free Pakistan Studies 2059 mark schemes for every available year and session." },
    { q: "How do I access O Level Pakistan Studies past papers?", a: "Visit papr.site/olevels/pakistan-studies, choose your year, and view instantly." },
  ],
  "History": [
    { q: "Where can I find free O Level History 2147 past papers?", a: "pApr (papr.site) provides free O Level History 2147 past papers and mark schemes from 2018 to 2024." },
    { q: "What is the subject code for O Level History?", a: "The subject code for O Level History is 2147, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are O Level History 2147 mark schemes free?", a: "Yes. pApr provides free History 2147 mark schemes for every available year and session." },
    { q: "How do I access O Level History past papers?", a: "Visit papr.site/olevels/history, choose your year, and view instantly." },
  ],
};

const aLevelFAQs = {
  "Computer Science": [
    { q: "Where can I find free A Level Computer Science 9618 past papers?", a: "pApr (papr.site) provides free A Level Computer Science 9618 past papers and mark schemes from 2021 to 2025, covering the new syllabus." },
    { q: "What is the subject code for A Level Computer Science?", a: "The subject code for A Level Computer Science is 9618, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are A Level Computer Science 9618 mark schemes free?", a: "Yes. pApr provides free 9618 mark schemes for every available year from 2021 to 2025." },
    { q: "What changed in the A Level Computer Science 9618 new syllabus?", a: "The 9618 syllabus introduced from 2021 onwards includes updated topics in programming, data structures, algorithms, and computer systems compared to the old 9608 syllabus." },
    { q: "How do I download A Level Computer Science past papers?", a: "Visit papr.site/alevels/computer-science, select your year, and access the question paper and mark scheme instantly." },
  ],
  "Economics": [
    { q: "Where can I find free A Level Economics 9708 past papers?", a: "pApr (papr.site) provides free A Level Economics 9708 past papers and mark schemes from 2018 to 2025." },
    { q: "What is the subject code for A Level Economics?", a: "The subject code for A Level Economics is 9708, offered by Cambridge Assessment International Education (CAIE)." },
    { q: "Are A Level Economics 9708 mark schemes free?", a: "Yes. pApr provides free Economics 9708 mark schemes for every available year and session." },
    { q: "What papers are in A Level Economics 9708?", a: "A Level Economics 9708 includes Paper 1 (Multiple Choice), Paper 2 (Data Response and Essay), Paper 3 (Multiple Choice A Level), and Paper 4 (Data Response and Essays), in summer and winter sessions." },
    { q: "How do I access A Level Economics past papers?", a: "Visit papr.site/alevels/economics, choose your year, and get instant access." },
  ],
};

const generalOLevelFAQs = [
  { q: "What are O Level past papers?", a: "O Level past papers are previous exam question papers from Cambridge Assessment International Education (CAIE). They are one of the most effective tools for exam preparation, helping students understand the exam format, question styles, and mark scheme expectations." },
  { q: "Are O Level past papers free on pApr?", a: "Yes. pApr provides completely free O Level past papers including question papers, mark schemes, and examiner reports for all available subjects and years." },
  { q: "Which O Level subjects are available on pApr?", a: "pApr currently offers past papers for O Level Chemistry (5070), Physics (5054), Mathematics (4024), Computer Science (2210), Economics (2281), Islamiat (2058), Pakistan Studies (2059), and History (2147)." },
  { q: "What years of O Level past papers are available?", a: "pApr provides O Level past papers from 2018 to 2024, covering both summer (May/June) and winter (October/November) sessions." },
  { q: "How do I use O Level past papers effectively?", a: "Practice under timed conditions, then mark your work using the mark scheme. Focus on examiner reports to understand common mistakes. pApr makes this easy by providing all three documents side by side." },
];

const generalALevelFAQs = [
  { q: "What are A Level past papers?", a: "A Level past papers are previous exam papers from Cambridge Assessment International Education (CAIE) for Advanced Level qualifications. They are essential for revision and understanding exam expectations." },
  { q: "Are A Level past papers free on pApr?", a: "Yes. pApr provides completely free A Level past papers including question papers and mark schemes for all available subjects." },
  { q: "Which A Level subjects are available on pApr?", a: "pApr currently offers A Level past papers for Computer Science (9618) and Economics (9708), with more subjects being added." },
  { q: "What years of A Level past papers are available on pApr?", a: "A Level Computer Science (9618) papers are available from 2021 to 2025. A Level Economics (9708) papers are available from 2018 to 2025." },
];

function buildFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

// Per-subject SEO data — targets real search queries students type
const oLevelMeta = {
  "Chemistry": {
    code: "5070",
    title: "Chemistry 5070 Past Papers 2018–2025 | O Level | Free Download | pApr",
    description:
      "Download free O Level Chemistry 5070 past papers, mark schemes and examiner reports from 2018 to 2025. Covers summer and winter sessions. pApr — the fastest way to find CAIE Cambridge past papers.",
    keywords:
      "chemistry 5070 past papers, o level chemistry past papers, chemistry 5070 mark scheme, chemistry 5070 2024, chemistry 5070 2023, igcse chemistry past papers, cambridge chemistry past papers, o level chemistry 2025",
  },
  "Physics": {
    code: "5054",
    title: "Physics 5054 Past Papers 2018–2025 | O Level | Free Download | pApr",
    description:
      "Free O Level Physics 5054 past papers and mark schemes from 2018 to 2025. Summer and winter sessions. pApr — instant access to CAIE Cambridge past papers.",
    keywords:
      "physics 5054 past papers, o level physics past papers, physics 5054 mark scheme, physics 5054 2024, physics 5054 2023, cambridge physics past papers, igcse physics past papers, o level physics 2025",
  },
  "Mathematics": {
    code: "4024",
    title: "Mathematics 4024 Past Papers 2018–2025 | O Level | Free Download | pApr",
    description:
      "Free O Level Mathematics 4024 past papers and mark schemes from 2018 to 2025. Summer and winter sessions included. pApr — the fastest way to access CAIE past papers.",
    keywords:
      "mathematics 4024 past papers, o level maths past papers, math 4024 mark scheme, mathematics 4024 2024, maths 4024 2023, cambridge mathematics past papers, o level mathematics 2025, 4024 past paper",
  },
  "Computer Science": {
    code: "2210",
    title: "Computer Science 2210 Past Papers 2018–2025 | O Level | Free Download | pApr",
    description:
      "Free O Level Computer Science 2210 past papers, mark schemes and examiner reports 2018–2025. Summer and winter sessions. pApr — instant CAIE Cambridge past papers.",
    keywords:
      "computer science 2210 past papers, o level computer science past papers, 2210 mark scheme, computer science 2210 2024, igcse computer science past papers, cambridge cs past papers, o level cs 2025",
  },
  "Economics": {
    code: "2281",
    title: "Economics 2281 Past Papers 2018–2025 | O Level | Free Download | pApr",
    description:
      "Free O Level Economics 2281 past papers and mark schemes from 2018 to 2025. Summer and winter sessions. pApr — fast and free CAIE Cambridge past papers.",
    keywords:
      "economics 2281 past papers, o level economics past papers, economics 2281 mark scheme, economics 2281 2024, cambridge economics past papers, igcse economics past papers, o level economics 2025",
  },
  "Islamiat": {
    code: "2058",
    title: "Islamiat 2058 Past Papers 2018–2025 | O Level | Free Download | pApr",
    description:
      "Free O Level Islamiat 2058 past papers and mark schemes from 2018 to 2025. Summer and winter sessions. pApr — instant CAIE Cambridge past papers for Pakistani students.",
    keywords:
      "islamiat 2058 past papers, o level islamiat past papers, islamiat 2058 mark scheme, islamiat 2058 2024, islamiat 2058 2023, cambridge islamiat past papers, o level islamiat 2025",
  },
  "pkst": {
    code: "2059",
    title: "Pakistan Studies 2059 Past Papers 2018–2025 | O Level | Free Download | pApr",
    description:
      "Free O Level Pakistan Studies 2059 past papers and mark schemes from 2018 to 2025. Summer and winter sessions. pApr — fast access to CAIE Cambridge past papers.",
    keywords:
      "pakistan studies 2059 past papers, o level pakistan studies past papers, 2059 mark scheme, pakistan studies 2059 2024, pakistan studies past papers, pkst past papers, o level pakistan studies 2025",
  },
  "History": {
    code: "2147",
    title: "History 2147 Past Papers 2018–2024 | O Level | Free Download | pApr",
    description:
      "Free O Level History 2147 past papers and mark schemes from 2018 to 2024. Summer and winter sessions. pApr — fast access to CAIE Cambridge past papers.",
    keywords:
      "history 2147 past papers, o level history past papers, 2147 mark scheme, history 2147 2024, history 2147 2023, cambridge history past papers, o level history 2024",
  },
};

const aLevelMeta = {
  "Computer Science": {
    code: "9618",
    title: "Computer Science 9618 Past Papers 2021–2025 | A Level | Free Download | pApr",
    description:
      "Free A Level Computer Science 9618 past papers and mark schemes from 2021 to 2025. New syllabus covered. pApr — instant CAIE Cambridge A Level past papers.",
    keywords:
      "computer science 9618 past papers, a level computer science past papers, 9618 mark scheme, computer science 9618 2024, cambridge a level cs past papers, a level computer science 2025, 9618 past paper",
  },
  "Economics": {
    code: "9708",
    title: "Economics 9708 Past Papers 2018–2025 | A Level | Free Download | pApr",
    description:
      "Free A Level Economics 9708 past papers and mark schemes from 2018 to 2025. Summer and winter sessions. pApr — fast and free CAIE Cambridge A Level past papers.",
    keywords:
      "economics 9708 past papers, a level economics past papers, 9708 mark scheme, economics 9708 2024, cambridge a level economics, a level economics 2025, 9708 past paper",
  },
};

// Default meta per section
const defaultMeta = {
  olevels: {
    title: "O Level Past Papers 2018–2025 | Free IGCSE Download | pApr",
    description:
      "Free O Level and IGCSE past papers for Chemistry 5070, Physics 5054, Maths 4024, Computer Science 2210, Economics 2281, Islamiat 2058, Pakistan Studies 2059, History 2147. Question papers, mark schemes and examiner reports from 2018–2025. pApr.",
    keywords:
      "o level past papers, igcse past papers, caie past papers, cambridge past papers, o level past papers 2024, o level past papers 2025, igcse past papers download, o level mark schemes, past papers free download",
    canonical: `${BASE_URL}/olevels`,
  },
  alevels: {
    title: "A Level Past Papers 2018–2025 | Free Cambridge Download | pApr",
    description:
      "Free A Level past papers for Computer Science 9618 and Economics 9708. Question papers and mark schemes from 2018–2025. pApr — the fastest way to access CAIE Cambridge A Level past papers.",
    keywords:
      "a level past papers, cambridge a level past papers, caie a level past papers, a level past papers 2024, a level past papers 2025, a level mark schemes, free a level past papers download",
    canonical: `${BASE_URL}/alevels`,
  },
  home: {
    title: "pApr — Free O Level & A Level Past Papers | IGCSE | CAIE Cambridge",
    description:
      "pApr is the fastest way to find free CAIE Cambridge O Level and A Level past papers. Covers Chemistry, Physics, Maths, Computer Science, Economics and more. Question papers, mark schemes and examiner reports 2018–2025.",
    keywords:
      "past papers, o level past papers, a level past papers, igcse past papers, caie past papers, cambridge past papers free download, past papers 2024 2025",
    canonical: BASE_URL,
  },
  sayhi: {
    title: "Say Hi | pApr",
    description:
      "Get in touch with the team behind pApr. Report a bug, request a subject, ask about tutoring, or just say hi.",
    keywords:
      "papr contact, papr feedback, o level tutoring lahore, caie past papers contact",
    canonical: `${BASE_URL}/say-hi`,
  },
};

export default function SEO({ page, subject, year, level }) {
  let title, description, keywords, canonical, structuredData, faqSchema;

  if (page === "home") {
    ({ title, description, keywords, canonical } = defaultMeta.home);
  } else if (page === "sayhi") {
    ({ title, description, keywords, canonical } = defaultMeta.sayhi);
  } else if (page === "olevels") {
    const subjectData = subject ? oLevelMeta[subject] : null;
    if (subjectData) {
      const yearStr = year ? ` ${year}` : " 2018–2025";
      title = subjectData.title.replace("2018–2025", year || "2018–2025");
      description = year
        ? `Free O Level ${subject} ${subjectData.code} ${year} past paper, mark scheme and examiner report. Summer and winter sessions. pApr — instant CAIE Cambridge past papers.`
        : subjectData.description;
      keywords = subjectData.keywords;
      canonical = year
        ? `${BASE_URL}/olevels/${slugify(subject)}/${year}`
        : `${BASE_URL}/olevels/${slugify(subject)}`;

      structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${subject} ${subjectData.code} O Level Past Papers`,
        description: description,
        url: canonical,
        about: {
          "@type": "Course",
          name: `O Level ${subject}`,
          courseCode: subjectData.code,
          provider: {
            "@type": "Organization",
            name: "Cambridge Assessment International Education",
          },
        },
      };
      if (oLevelFAQs[subject]) faqSchema = buildFAQSchema(oLevelFAQs[subject]);
    } else {
      ({ title, description, keywords, canonical } = defaultMeta.olevels);
      faqSchema = buildFAQSchema(generalOLevelFAQs);
    }
  } else if (page === "alevels") {
    const subjectData = subject ? aLevelMeta[subject] : null;
    if (subjectData) {
      title = subjectData.title.replace("2021–2025", year || "2021–2025").replace("2018–2025", year || "2018–2025");
      description = year
        ? `Free A Level ${subject} ${subjectData.code} ${year} past paper and mark scheme. pApr — instant CAIE Cambridge A Level past papers.`
        : subjectData.description;
      keywords = subjectData.keywords;
      canonical = year
        ? `${BASE_URL}/alevels/${slugify(subject)}/${year}`
        : `${BASE_URL}/alevels/${slugify(subject)}`;

      structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: `${subject} ${subjectData.code} A Level Past Papers`,
        description: description,
        url: canonical,
        about: {
          "@type": "Course",
          name: `A Level ${subject}`,

          courseCode: subjectData.code,
          provider: {
            "@type": "Organization",
            name: "Cambridge Assessment International Education",
          },
        },
      };
      if (aLevelFAQs[subject]) faqSchema = buildFAQSchema(aLevelFAQs[subject]);
    } else {
      ({ title, description, keywords, canonical } = defaultMeta.alevels);
      faqSchema = buildFAQSchema(generalALevelFAQs);
    }
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="pApr" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonical} />

      {/* CollectionPage + Course structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {/* FAQPage structured data — powers "People Also Ask" in Google */}
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
}

function slugify(subject) {
  if (!subject) return "";
  return subject.toLowerCase().replace(/\s+/g, "-");
}
