// notesData.js
export const noteSubjects = [
  { slug: "pakstudies",       name: "Pak Studies",      code: "2059" },
  { slug: "computer-science", name: "Computer Science", code: "2210" },
  { slug: "islamiat",         name: "Islamiat",         code: "2058" },
];

export const notesData = {

  /* ─── PAK STUDIES ─────────────────────────────────────────────────────── */
  pakstudies: {
    type: "grouped",
    groups: [
      {
        slug: "p1",
        name: "Paper 1",
        label: "History — P1",
        topics: [
          {
            slug: "placeholder-topic",
            name: "Topic (coming soon)",
            content: `<p>Notes for this topic are being added. Check back soon!</p>`,
          },
        ],
      },
      {
        slug: "p2",
        name: "Paper 2",
        label: "Geography — P2",
        comingSoon: true,
        comingSoonText: "Coming soon",
      },
    ],
  },

  /* ─── COMPUTER SCIENCE ────────────────────────────────────────────────── */
  "computer-science": {
    type: "grouped",
    groups: [
      {
        slug: "p1",
        name: "Paper 1",
        topics: [
          {
            slug: "placeholder-topic",
            name: "Topic (coming soon)",
            content: `<p>Notes for this topic are being added. Check back soon!</p>`,
          },
        ],
      },
      {
        slug: "p2",
        name: "Paper 2",
        comingSoon: true,
        comingSoonText: "GO DO YEARLIES — jkjk gonna add notes soon",
      },
    ],
  },

  /* ─── ISLAMIAT ────────────────────────────────────────────────────────── */
  islamiat: {
    type: "grouped",
    groups: [
      {
        slug: "p1",
        name: "Paper 1",
        topics: [
          {
            slug: "placeholder-topic",
            name: "Topic (coming soon)",
            content: `<p>Notes for this topic are being added. Check back soon!</p>`,
          },
        ],
      },
      {
        slug: "p2",
        name: "Paper 2",
        topics: [
          {
            slug: "placeholder-topic",
            name: "Topic (coming soon)",
            content: `<p>Notes for this topic are being added. Check back soon!</p>`,
          },
        ],
      },
    ],
  },
};