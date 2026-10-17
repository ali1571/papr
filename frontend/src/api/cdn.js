const CDN_MAP = {
    [import.meta.env.VITE_SUPABASE_URL]: import.meta.env.VITE_CDN_OLEVELS_URL,
    [import.meta.env.VITE_SUPABASE_ALEVEL_URL]: import.meta.env.VITE_CDN_ALEVELS_URL,}

export function rewriteUrl(url){
    if (!url) return url
    for (const [supaUrl, cdn] of Object.entries(CDN_MAP)) {
        if (!cdn) continue
        const prefix = supaUrl.replace(/\/$/, '') + '/storage/v1/object/public/'
        if (url.startsWith(prefix)){
            return cdn + '/' + url.slice(prefix.length)
        }
    }
    return url
}

