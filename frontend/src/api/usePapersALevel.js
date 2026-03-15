// usePapersALevel.js -> Custom hook for fetching A-Level papers data.

import { useQuery } from "@tanstack/react-query";
import { fetchPapersALevel } from "./papersALevel.js";

export function usePapersALevel(subject, year, { enabled = false } = {}) {
    return useQuery({
        queryKey: ["papers-alevel", subject, year],
        queryFn: () => fetchPapersALevel(subject, year),
        enabled: false,
        staleTime: 0,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
    });
}
