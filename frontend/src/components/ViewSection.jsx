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
    <div className="group relative rounded-2xl border border-theme overflow-hidden">

      {/* Floating toolbar — visible on hover */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none
                      opacity-0 -translate-y-2
                      group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-300 ease-out">
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5
                        rounded-full backdrop-blur-md
                        bg-black/60 border border-white/10
                        shadow-lg text-white/90 text-xs font-heading whitespace-nowrap">
          <span className="opacity-60">{label}</span>
          {extraAction && (
            <>
              <span className="opacity-20">|</span>
              {extraAction}
            </>
          )}
          {url && (
            <>
              <span className="opacity-20">|</span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                Open ↗
              </a>
            </>
          )}
        </div>
      </div>

      {/* PDF or empty slot */}
      <div className="h-[85dvh]">
        {hasDualPdf ? (
          <div className="relative w-full h-full">
            <div className={`absolute inset-0 ${showingInsert ? "invisible pointer-events-none" : ""}`}>
              <PdfViewer fileUrl={msUrl} />
            </div>
            <div className={`absolute inset-0 ${showingInsert ? "" : "invisible pointer-events-none"}`}>
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
