// App.jsx
import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import ViewSection from "./src/components/ViewSection.jsx";
import HeroSection from "./src/components/HeroSection.jsx";
import PaperDetails from "./src/components/PaperDetails.jsx";
import Navbar from "./src/components/ui/Navbar.jsx";
import Loader from "./src/components/ui/Loader.jsx";

import { Worker } from "@react-pdf-viewer/core";
import { usePapers } from "./src/api/usePapers";

// Lazy load components that aren't immediately needed
const Footer = lazy(() => import("./src/components/Footer.jsx"));
const ErrorPage = lazy(() => import("./src/components/ui/ErrorPage.jsx"));

export default function App() {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);
  const [picked, setPicked] = useState(null); // This will hold the selected paper details

  const paperDetailsRef = useRef(null);
  const { data, isFetching, isError, refetch } = usePapers(subject, year, { enabled: hasSearched });

  // Memoize handlers to prevent unnecessary re-renders
  const handleFind = useCallback(async () => {
    if (!subject || !year) return;
    setHasSearched(true);
    setManualLoading(true);
    await refetch();
    setManualLoading(false);
  }, [subject, year, refetch]);

  const handlePick = useCallback((selected) => {
    setPicked(selected);
  }, []);

  useEffect(() => {
    if (data && !isFetching && paperDetailsRef.current && hasSearched) {
      paperDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, isFetching]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="min-h-screen bg-[#0f0f0f] text-black dark:bg-[#0f0f0f] dark:text-white flex items-start justify-center py-8">
        <div className="app-frame">
          <div className="app-frame-scroll no-scrollbar">
            <div className="pt-6" />
            <Navbar />
            <main className="px-6 lg:px-10">
              <HeroSection
                subject={subject}
                year={year}
                setSubject={setSubject}
                setYear={setYear}
                loading={manualLoading}
                onFind={handleFind}
              />
              <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: 'var(--divider)' }} />

              <div ref={paperDetailsRef}>
                <PaperDetails data={hasSearched ? data : null} onPick={handlePick} />
              </div>

              {isError && (
                <Suspense fallback={<div className="my-8"><Loader /></div>}>
                  <div className="my-8"><ErrorPage /></div>
                </Suspense>
              )}

              <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: 'var(--divider)' }} />
              <div className="-mx-6 lg:-mx-10">
                <ViewSection qpUrl={picked?.links?.qp} msUrl={picked?.links?.ms} inUrl={picked?.links?.in} />
              </div>
              <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: 'var(--divider)' }} />
              <Suspense fallback={<div className="h-20"></div>}>
                <Footer />
              </Suspense>
            </main>
            <div className="pb-10" />
          </div>
        </div>
      </div>
    </Worker>
  );
}
