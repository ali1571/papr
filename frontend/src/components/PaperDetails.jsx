import React, { useState, memo } from "react";
import OutlineFillButton from "./ui/OutlineFillButton";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const PaperDetails = memo(function PaperDetails({ data, onPick }) {
  const meta = data?.meta;
  const [selectedKey, setSelectedKey] = useState(null);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  const isActive = (key) => selectedKey === key;
  const isDimmed = (key) => selectedKey && selectedKey !== key;

  return (
    <section ref={ref} className={`mt-16 ${isVisible ? 'fade-in-up' : ''}`}>
      {/* Title */}
      <h2 className="text-center text-4xl md:text-5xl font-semibold font-heading text-theme">
        Paper Details
      </h2>

      {/* Subheading */}
      <p className="font-heading text-center mt-2 text-neutral-600 dark:text-gray-400">
        {meta
          ? `${meta.subject_name} (${meta.subject_code}) — ${meta.year}`
          : "Choose a subject and year above"}
      </p>

      {/* pkst Insert info */}
      {meta && meta.subject_code === "2059" && (
        <div className="max-w-2xl mx-auto mt-6 px-4 py-3 rounded-xl bg-blue-5 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50">
          <p className="font-body text-sm text-center text-white dark:text-blue-200">
            <span className="font-semibold">Pro tip:</span>  <span className="font-semibold">"Insert"</span> are right next to markscheme button. It'll show up after you pick the paper.</p>
        </div>
      )}

      {data === undefined && (
        <div className="text-center text-neutral-500 dark:text-neutral-400">No data yet.</div>
      )}

      {meta && !data?.error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <SessionColumn
            title="Summer"
            items={data?.s || []}
            sessionCode="s"
            onPick={onPick}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            isActive={isActive}
            isDimmed={isDimmed}
          />
          <SessionColumn
            title="Winter"
            items={data?.w || []}
            sessionCode="w"
            onPick={onPick}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            isActive={isActive}
            isDimmed={isDimmed}
          />
        </div>
      )}

      {meta && data?.error && (
        <div className="font-heading text-center text-red-600 dark:text-red-300 mt-8">
          {data.error}
        </div>
      )}

      {meta && !data?.error && !(data?.s?.length || data?.w?.length) && (
        <div className="font-heading text-center text-neutral-600 dark:text-slate-400 mt-8">
          No papers found.
        </div>
      )}
    </section>
  );
});

export default PaperDetails;

function SessionColumn({
  title, items, sessionCode, onPick,
  selectedKey, setSelectedKey, isActive, isDimmed
}) {
  // Check if all items have variant "V1" (like pkst)
  const allVariantsAreV1 = items?.every(it => it.variant === "V1");

  return (
    <div
      className="
    rounded-2xl p-5
    border border-theme
    shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
  "
    >
      <h3 className="font-heading text-center text-xl mb-4 text-theme">
        {title}
      </h3>

      <div className="flex flex-col items-stretch gap-4">
        {items?.length ? (
          items.map((it) => {
            const key = `${sessionCode}-${it.paper}-${it.variant}`;
            // Display format: if all variants are V1, hide variant info
            const displayText = allVariantsAreV1
              ? `Paper ${it.paper.replace("P", "")}`
              : `Paper ${it.paper.replace("P", "")} — Variant ${it.variant.replace("V", "")}`;

            return (
              <OutlineFillButton
                key={key}
                active={isActive(key)}
                dimmed={isDimmed(key)}
                onClick={() => {
                  setSelectedKey(key);
                  onPick?.({
                    session: sessionCode,
                    paper: it.paper,
                    variant: it.variant,
                    types: it.types,
                    links: it.links,
                  });
                }}
                onClear={() => setSelectedKey(null)}
                className="
                  w-full text-left
                  border-theme
                  text-theme
                  hover:bg-black/[.03] dark:hover:bg-white/[.08]
                  transform transition-all duration-200
                  hover:scale-[1.02] hover:shadow-lg
                "
              >
                {displayText}
              </OutlineFillButton>
            );
          })
        ) : (
          <div className="font-heading text-center text-sm italic py-6 text-neutral-500 dark:text-slate-500">
            No entries
          </div>
        )}
      </div>
    </div>
  );
}
