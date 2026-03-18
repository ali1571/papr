// src/components/ViewSection.jsx
import React, { useState, memo } from "react";
import PdfViewer from "./ui/PdfViewer.jsx";

const ViewSection = memo(function ViewSection({ qpUrl = "", msUrl = "", inUrl = "" }) {
  const [showingInsert, setShowingInsert] = useState(false);
  const hasInsert = !!inUrl;

  const rightPanelLabel = hasInsert && showingInsert ? "Insert" : "Marking Scheme";
  const rightPanelUrl = hasInsert && showingInsert ? inUrl : msUrl;

  return (
    <section className="my-8">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* QP panel */}
          <PanelWithToolbar
            label="Question Paper"
            url={qpUrl}
            emptyLabel="Pick a paper to preview"
          />

          {/* MS / Insert panel — both PDFs stay mounted, toggled via CSS */}
          <PanelWithToolbar
            label={rightPanelLabel}
            url={rightPanelUrl}
            emptyLabel="Pick a paper to preview"
            extraAction={
              inUrl ? (
                <button
                  onClick={() => setShowingInsert((p) => !p)}
                  className="px-3 py-1 text-xs font-heading rounded-md border border-white/20 text-white/80 hover:bg-white/10 transition-colors duration-200"
                >
                  {showingInsert ? "Mark Scheme" : "Insert"}
                </button>
              ) : null
            }
            msUrl={msUrl}
            inUrl={inUrl}
            showingInsert={showingInsert}
          />

        </div>
      </div>
    </section>
  );
});

export default ViewSection;

function PanelWithToolbar({ label, url, emptyLabel, extraAction, msUrl, inUrl, showingInsert }) {
  const hasDualPdf = !!(msUrl && inUrl);

  return (
    <div className="rounded-2xl border border-theme overflow-hidden">

      {/* Always-visible top bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-theme bg-black/40 backdrop-blur-md text-xs font-heading whitespace-nowrap">
        <span className="text-white/50">{label}</span>
        {extraAction && (
          <>
            <span className="text-white/20">|</span>
            {extraAction}
          </>
        )}
        {url && (
          <>
            <span className="ml-auto text-white/20">|</span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors duration-200"
            >
              Open ↗
            </a>
          </>
        )}
      </div>

      {/* PDF or empty slot */}
      <div className="h-[85dvh]">
        {hasDualPdf ? (
          <div className="relative w-full h-full">
            <div className={`absolute inset-0 ${showingInsert ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              <PdfViewer fileUrl={msUrl} />
            </div>
            <div className={`absolute inset-0 ${showingInsert ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
              <PdfViewer fileUrl={inUrl} />
            </div>
          </div>
        ) : url ? (
          <PdfViewer fileUrl={url} />
        ) : (
          <EmptySlot label={emptyLabel} />
        )}
      </div>

    </div>
  );
}

function EmptySlot({ label }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="rounded-xl border border-dashed border-black/20 dark:border-white/15 px-6 py-4 text-neutral-500 dark:text-white/50 text-sm">
        {label}
      </div>
    </div>
  );
}
