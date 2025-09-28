// src/components/ViewSection.jsx
import React from "react";
import PdfViewer from "./ui/PdfViewer.jsx";

export default function ViewSection({ qpUrl = "", msUrl = "" }) {
  return (
    <section className="my-8">
      <div className="max-w-[98%] mx-auto">
        {/* Grid: stacks on mobile, 2 columns on large screens */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* QP box */}
          <div className="rounded-2xl border border-theme overflow-hidden">
            <div className="px-4 py-3 border-b border-theme flex items-center justify-between">
              <div className="font-heading text-sm text-theme tracking-wide">
                Question Paper
              </div>
              {qpUrl && (
                <a
                  href={qpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs font-heading border border-theme text-theme hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-400"
                >
                  Open in new tab ↗
                </a>
              )}
            </div>

            {/* QP PDF */}
            <div className="h-[70dvh]">
              {qpUrl ? (
                <PdfViewer fileUrl={qpUrl} />
              ) : (
                <EmptySlot label="Pick a paper to preview" />
              )}
            </div>
          </div>

          {/* MS box */}
          <div className="rounded-2xl border border-theme overflow-hidden">
            <div className="px-4 py-3 border-b border-theme flex items-center justify-between">
              <div className="font-heading text-sm text-theme tracking-wide">
                Marking Scheme
              </div>
              {msUrl && (
                <a
                  href={msUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs font-heading border border-theme text-theme hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-400"
                >
                  Open in new tab ↗
                </a>
              )}
            </div>

            {/* MS PDF */}
            <div className="h-[70dvh]">
              {msUrl ? (
                <PdfViewer fileUrl={msUrl} />
              ) : (
                <EmptySlot label="Pick a paper to preview" />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
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