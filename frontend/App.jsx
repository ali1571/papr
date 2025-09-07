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
  const { data, isFetching, isError, refetch } = usePapers(subject, year, { enabled: hasSearched });

  // Custom handler to prefetch papers when year changes
  const handleFind = async () => {
    if (!subject || !year) return;
    setHasSearched(true);
    setManualLoading(true);
    await refetch();
    setManualLoading(false);
  };

  useEffect(() => {
    if (data && !isFetching && paperDetailsRef.current && hasSearched) {
      paperDetailsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data, isFetching]);

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
                <PaperDetails data={hasSearched ? data : null} onPick={(selected) => setPicked(selected)} />
              </div>

              {isError && <div className="my-8"><ErrorPage /></div>}

              <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: 'var(--divider)' }} />
              <ViewSection qpUrl={picked?.links?.qp} msUrl={picked?.links?.ms} />
              <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: 'var(--divider)' }} />
              <Footer />
            </main>
            <div className="pb-10" />
          </div>
        </div>
      </div>
    </Worker>
  );
}
