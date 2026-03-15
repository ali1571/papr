import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import ViewSection from "../components/ViewSection.jsx";
import HeroSection from "../components/HeroSection.jsx";
import PaperDetails from "../components/PaperDetails.jsx";
import Loader from "../components/ui/Loader.jsx";
import SEO from "../components/SEO.jsx";
import { usePapers } from "../api/usePapers";
import { oLevelSlugs } from "../api/slugs.js";

const Footer = lazy(() => import("../components/Footer.jsx"));
const ErrorPage = lazy(() => import("../components/ui/ErrorPage.jsx"));

export default function OLevelsPage() {
  const { subject: subjectSlug, year: yearParam } = useParams();

  // Resolve slug -> actual subject name
  const prefilledSubject = subjectSlug ? (oLevelSlugs[subjectSlug] ?? "") : "";
  const prefilledYear = yearParam ?? "";

  const [subject, setSubject] = useState(prefilledSubject);
  const [year, setYear] = useState(prefilledYear);
  const [hasSearched, setHasSearched] = useState(false);
  const [manualLoading, setManualLoading] = useState(false);
  const [picked, setPicked] = useState(null);

  const paperDetailsRef = useRef(null);
  const { data, isFetching, isError, refetch } = usePapers(subject, year, { enabled: hasSearched });

  // If both subject and year are pre-filled from URL, auto-search
  useEffect(() => {
    if (prefilledSubject && prefilledYear) {
      setHasSearched(true);
      refetch();
    }
  }, [prefilledSubject, prefilledYear]);

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
    <>
      <SEO page="olevels" subject={subject || null} year={year || null} />
      <HeroSection
        subject={subject}
        year={year}
        setSubject={setSubject}
        setYear={setYear}
        loading={manualLoading}
        onFind={handleFind}
      />
      <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: "var(--divider)" }} />

      <div ref={paperDetailsRef}>
        <PaperDetails data={hasSearched ? data : null} onPick={handlePick} />
      </div>

      {isError && (
        <Suspense fallback={<div className="my-8"><Loader /></div>}>
          <div className="my-8"><ErrorPage /></div>
        </Suspense>
      )}

      <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: "var(--divider)" }} />
      <div className="-mx-6 lg:-mx-10">
        <ViewSection qpUrl={picked?.links?.qp} msUrl={picked?.links?.ms} inUrl={picked?.links?.in} />
      </div>
      <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: "var(--divider)" }} />
      <Suspense fallback={<div className="h-20"></div>}>
        <Footer />
      </Suspense>
    </>
  );
}
