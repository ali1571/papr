// src/data/options.js

// Famous O‑Level subjects (tweak freely)
export const subjects = [
    "Mathematics",
    "Accounting",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Economics",
    "Business Studies",
    "English Language",
    "Urdu",
    "pkst"
];

// Years per subject (placeholder; reuse same years for now)
const defaultYears = [2024, 2023, 2022, 2021, 2020, 2019, 2018];

export const yearsBySubject = {
    Mathematics: defaultYears,
    Accounting: defaultYears,
    Physics: defaultYears,
    Chemistry: defaultYears,
    Biology: defaultYears,
    "Computer Science": defaultYears,
    Economics: defaultYears,
    "Business Studies": defaultYears,
    "English Language": defaultYears,
    Urdu: defaultYears,
    "pkst": defaultYears,
};