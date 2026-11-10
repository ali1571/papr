import { createClient } from '@supabase/supabase-js'
import { rewriteUrl } from './cdn'

// Initialize utilizing the specific A-level project URL configuration
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_ALEVELS_URL,
  import.meta.env.VITE_SUPABASE_ALEVELS_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY
)

console.log("A-LEVEL DB CONNECTED TO:", import.meta.env.VITE_SUPABASE_ALEVELS_URL);

function transformToNested(allFiles) {

  console.log("cooking file url")
  const result = { subjects: [] }
  const subjectGroups = {}

  for (const file of allFiles) {
    const key = `${file.subject_code}||${file.subject_name}||${file.year}`
    if (!subjectGroups[key]) subjectGroups[key] = []
    subjectGroups[key].push(file)
  }

  for (const [key, files] of Object.entries(subjectGroups)) {
    const [subject_code, subject_name, year] = key.split('||')
    const subjectObj = { subject_name, subject_code, year, sessions: {} }

    for (const file of files) {
      const { session, paper, variant, doc_type, file_url } = file

      console.log(file)

      // Standardize session fields dynamically (handles "summer" or "s" -> "s")
      let safeSession = String(session || '').trim().toLowerCase();
      if (safeSession.startsWith('s') || safeSession.includes('summer')) safeSession = 's';
      if (safeSession.startsWith('w') || safeSession.includes('winter')) safeSession = 'w';
      if (safeSession.startsWith('m') || safeSession.includes('march')) safeSession = 'm';

      if (!safeSession) continue;

      subjectObj.sessions[safeSession] ??= { papers: {} }
      subjectObj.sessions[safeSession].papers[paper] ??= { variants: {} }
      subjectObj.sessions[safeSession].papers[paper].variants[variant] ??= { doc_types: {} }
      subjectObj.sessions[safeSession].papers[paper].variants[variant].doc_types[doc_type] = rewriteUrl(file_url)
    }

    // Sort doc_types: qp → ms → in
    for (const session of Object.values(subjectObj.sessions))
      for (const paper of Object.values(session.papers))
        for (const variant of Object.values(paper.variants)) {
          const d = variant.doc_types
          variant.doc_types = Object.fromEntries(
            ['qp', 'ms', 'in'].filter(k => k in d).map(k => [k, d[k]])
          )
        }

    result.subjects.push(subjectObj)
  }

  return result
}

async function getPapers(subject, year) {
  // 1. Force the year to be a strict primitive numeric integer
  const cleanYear = parseInt(year, 10);
  const cleanSubject = String(subject || '').trim();

  // 2. Log out the diagnostic breakdown directly to pinpoint runtime types
  console.log("--- DEBUG PARAMETERS FOR A-LEVEL QUERY ---", {
    receivedSubject: subject,
    receivedYear: year,
    typeOfReceivedYear: typeof year,
    queryingWithYear: cleanYear,
    typeOfQueryingWithYear: typeof cleanYear
  });

  // 3. Fire the query with the normalized variables
  const { data, error } = await supabase
    .from('past-papers')
    .select('*')
    .eq('subject_name', cleanSubject)
    .eq('year', cleanYear) // Ensured numeric int4 match

  console.log("--- DATABASE API RESULTS RECEIVED ---", data);

  if (error) {
    console.error("Database execution error stack:", error);
    throw error;
  }

  return transformToNested(data || []);
}


const flattenSession = (sessionObj) => {
  if (!sessionObj?.papers) return []
  const out = []
  Object.entries(sessionObj.papers).forEach(([paper, paperObj]) => {
    Object.entries(paperObj.variants || {}).forEach(([variant, vObj]) => {
      const links = vObj.doc_types || {}
      out.push({ paper, variant, types: Object.keys(links), links })
    })
  })
  return out
}

export async function fetchPapersALevel(subject, year) {
  const apiData = await getPapers(subject, year)
  const node = apiData.subjects?.[0]

  if (!node) return { s: [], w: [], m: [], meta: null, error: 'No data found' }

  return {
    s: flattenSession(node.sessions?.s),
    w: flattenSession(node.sessions?.w),
    m: flattenSession(node.sessions?.m),
    meta: {
      subject_name: node.subject_name,
      subject_code: node.subject_code,
      year: node.year,
    },
    error: '',
  }
}
