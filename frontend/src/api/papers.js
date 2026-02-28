// papers.js -> API layer for fetching papers data (direct Supabase, no backend)

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

function transformToNested(allFiles) {
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
      subjectObj.sessions[session] ??= { papers: {} }
      subjectObj.sessions[session].papers[paper] ??= { variants: {} }
      subjectObj.sessions[session].papers[paper].variants[variant] ??= { doc_types: {} }
      subjectObj.sessions[session].papers[paper].variants[variant].doc_types[doc_type] = file_url
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
  const { data, error } = await supabase
    .from('past-papers')
    .select('*')
    .eq('subject_name', subject)
    .eq('year', year)

  if (error) throw error
  return transformToNested(data)
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

/**
 * Fetch papers and normalize to UI shape:
 * { s: [...], w: [...], meta: {...}, error: "" }
 * Each item in s/w: { paper, variant, types, links }
 */
export async function fetchPapers(subject, year) {
  const apiData = await getPapers(subject, year)
  const node = apiData.subjects?.[0]

  if (!node) return { s: [], w: [], meta: null, error: 'No data found' }

  return {
    s: flattenSession(node.sessions?.s),
    w: flattenSession(node.sessions?.w),
    meta: {
      subject_name: node.subject_name,
      subject_code: node.subject_code,
      year: node.year,
    },
    error: '',
  }
}