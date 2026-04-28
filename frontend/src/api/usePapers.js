// usepapers.js -> Custom hook for fetching papers data. Centralizes how papers are fetched and cached.

import { useQuery } from "@tanstack/react-query";
import { fetchPapers } from "./papers.js";

export function usePapers(subject, year, { enabled = false } = {}) {
    return useQuery({
        queryKey: ["O-Levels", "papers", subject, year],
        queryFn: () => fetchPapers(subject, year),
        enabled: false, // makes it so we don't auto-fetch after choosing subject/year
        staleTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}
