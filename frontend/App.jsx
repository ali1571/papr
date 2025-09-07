// App.jsx
import React, { useState, useRef, useEffect } from "react";
import Footer from "./src/components/Footer.jsx";
import ViewSection from "./src/components/ViewSection.jsx";
import HeroSection from "./src/components/HeroSection.jsx";
import PaperDetails from "./src/components/PaperDetails.jsx";
import Navbar from "./src/components/ui/Navbar.jsx";
import Loader from "./src/components/ui/Loader.jsx";
import ErrorPage from "./src/components/ui/ErrorPage.jsx";

import { Worker } from "@react-pdf-viewer/core";
import { usePapers } from "./src/api/usePapers";

export default function App() {
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);
  const [picked, setPicked] = useState(null); // This will hold the selected paper details

  const paperDetailsRef = useRef(null);
  const pdfViewerRef = useRef(null); // NEW: Add ref for PDF viewer section
  
  const { data, isFetching, isError, refetch } = usePapers(subject, year, { enabled: hasSearched });

  // Custom handler to prefetch papers when year changes
  const handleFind = async () => {
    if (!subject || !year) return;
    setHasSearched(true);
    setManualLoading(true);
    await refetch();
    setManualLoading(false);
  };

  // Existing useEffect for auto-scroll when papers are found
  useEffect(() => {
    if (data && !isFetching && paperDetailsRef.current && hasSearched) {
      paperDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, isFetching]);

  // NEW: Auto-scroll when a variant is picked
  useEffect(() => {
    if (picked && pdfViewerRef.current) {
      pdfViewerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [picked]);

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="min-h-screen bg-white text-black dark:bg-[#0f0f0f] dark:text-white flex items-start justify-center py-8">
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
                <PaperDetails 
                  data={hasSearched ? data : null} 
                  onPick={setPicked} 
                />
              </div>

              {/* NEW: Wrap ViewSection with ref for auto-scroll */}
              <div ref={pdfViewerRef}>
                <ViewSection 
                  qpUrl={picked?.links?.qp} 
                  msUrl={picked?.links?.ms} 
                />
              </div>

              <Footer />
            </main>
          </div>
        </div>
      </div>
    </Worker>
  );
}
