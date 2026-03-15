// Slug <-> Subject name mapping for SEO-friendly URLs
// /olevels/chemistry  /olevels/computer-science  etc.

export const oLevelSlugs = {
  "mathematics":       "Mathematics",
  "physics":           "Physics",
  "chemistry":         "Chemistry",
  "computer-science":  "Computer Science",
  "economics":         "Economics",
  "islamiat":          "Islamiat",
  "pakistan-studies":  "pkst",
};

export const aLevelSlugs = {
  "computer-science":  "Computer Science",
  "economics":         "Economics",
};

// Subject name -> slug
export const oLevelSubjectToSlug = Object.fromEntries(
  Object.entries(oLevelSlugs).map(([slug, name]) => [name, slug])
);

export const aLevelSubjectToSlug = Object.fromEntries(
  Object.entries(aLevelSlugs).map(([slug, name]) => [name, slug])
);
