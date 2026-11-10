export function rewriteUrl(url) {
    if (!url) return url;

    const urlStr = String(url).trim();

    // Map project keys cleanly without using computed object properties
    const mappings = [
        {
            projectHash: 'wxeumwbzshdpxkxrzevw', // O-Levels Project Signature
            cdnDomain: import.meta.env.VITE_CDN_OLEVELS_URL || 'https://papr.site'
        },
        {
            projectHash: 'srwpgmzvbvxqfttqqibn', // A-Levels Project Signature
            cdnDomain: import.meta.env.VITE_CDN_ALEVELS_URL || 'https://papr.site'
        }
    ];

    for (const map of mappings) {
        if (urlStr.includes(map.projectHash)) {
            const publicBucketMarker = '/storage/v1/object/public/';
            const markerIndex = urlStr.indexOf(publicBucketMarker);

            if (markerIndex !== -1) {
                // Extracts everything trailing after the public access marker
                const fileSuffix = urlStr.slice(markerIndex + publicBucketMarker.length);

                // Trim trailing slashes from the target CDN custom host name
                const cleanCdn = map.cdnDomain.replace(/\/$/, '');

                return `${cleanCdn}/${fileSuffix}`;
            }
        }
    }

    return url;
}
