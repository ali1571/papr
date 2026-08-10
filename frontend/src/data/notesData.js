export const noteSubjects = [
  { slug: "pakstudies",       name: "Pak Studies",      code: "2059" },
  { slug: "computer-science", name: "Computer Science", code: "2210" },
  { slug: "islamiat",         name: "Islamiat",         code: "2058" },
];

export const notesData = {
  pakstudies: {
    type: "grouped",
    groups: [
      {
        slug: "p1",
        name: "Paper 1",
        label: "History — P1",
        topics: [
          { slug: "s1-4mark-q", name: "S1: 4 Mark Questions" },
          { slug: "s1-early-reformers", name: "S1: Early Reformers" },
          { slug: "s1-mughal-decline", name: "S1: Mughal Decline" },
          { slug: "s1-eic-rise-fall", name: "S1: EIC Rise and Fall" },
          { slug: "s1-war-independence-1857", name: "S1: War of Independence 1857" },
          { slug: "s1-sir-syed-ahmed-khan", name: "S1: Sir Syed Ahmed Khan" },
          { slug: "s1-languages", name: "S1: Languages" },
          { slug: "s2-4mark-q", name: "S2: 4 Mark Questions" },
          { slug: "s2-1903-1916", name: "S2: 1903–1916" },
          { slug: "s2-1919-1929", name: "S2: 1919–1929" },
          { slug: "s2-1930-1939", name: "S2: 1930–1939" },
          { slug: "s2-1940-1947", name: "S2: 1940–1947" },
          { slug: "s2-jinnah-governor-general", name: "S2: Jinnah, Governor General" },
          { slug: "s2-iqbal", name: "S2: Iqbal" },
          { slug: "s2-rahmat-ali", name: "S2: Rahmat Ali" },
          { slug: "s3-relations", name: "S3: Relations" },
          { slug: "s3-early-problems", name: "S3: Early Problems of Pakistan" },
          { slug: "s3-early-ministries", name: "S3: Early Ministries" },
          { slug: "s3-ayub-khan", name: "S3: Ayub Khan" },
          { slug: "s3-yahya-khan", name: "S3: Yahya Khan" },
          { slug: "s3-creation-bangladesh", name: "S3: Creation of Bangladesh" },
          { slug: "s3-zulfiqar-bhutto", name: "S3: Zulfiqar Ali Bhutto" },
          { slug: "s3-zia", name: "S3: Zia" },
          { slug: "s3-benazir-term1", name: "S3: Benazir Bhutto Term 1" },
          { slug: "s3-nawaz-term1", name: "S3: Nawaz Sharif Term 1" },
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

  "computer-science": {
    type: "grouped",
    groups: [
      {
        slug: "p1",
        name: "Paper 1",
        topics: [
          { slug: "placeholder-topic", name: "Topic (coming soon)" },
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

  islamiat: {
    type: "grouped",
    groups: [
      {
        slug: "p1",
        name: "Paper 1",
        topics: [
          { slug: "placeholder-topic", name: "Topic (coming soon)" },
        ],
      },
      {
        slug: "p2",
        name: "Paper 2",
        topics: [
          { slug: "placeholder-topic", name: "Topic (coming soon)" },
        ],
      },
    ],
  },
};