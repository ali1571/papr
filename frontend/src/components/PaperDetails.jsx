import React, { useState } from "react";
import OutlineFillButton from "./ui/OutlineFillButton";

export default function PaperDetails({ data, onPick }) {
  const meta = data?.meta;
  const [selectedKey, setSelectedKey] = useState(null);

  const isActive = (key) => selectedKey === key;
  const isDimmed = (key) => selectedKey && selectedKey !== key;

  return (
    <section className="mt-16">
      {/* Title */}
      <h2 className="text-center text-4xl md:text-5xl font-semibold font-heading text-neutral-900 dark:text-white">
        Paper Details
      </h2>

      {/* Subheading */}
      <p className="font-heading text-center mt-2 text-neutral-600 dark:text-gray-400">
        {meta
          ? `${meta.subject_name} (${meta.subject_code}) — ${meta.year}`
          : "Choose a subject and year above"}
      </p>

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
}

function SessionColumn({
  title, items, sessionCode, onPick,
  selectedKey, setSelectedKey, isActive, isDimmed
}) {
  return (
    <div
      className="
    rounded-2xl p-5
    border border-black/10 dark:border-white/15
    shadow-sm dark:shadow-[inset_0_1px_0_rgba(255,255,255,.06)]
  "
    >
      <h3 className="font-heading text-center text-xl mb-4 text-neutral-900 dark:text-white">
        {title}
      </h3>

      <div className="flex flex-col items-stretch gap-4">
        {items?.length ? (
          items.map((it) => {
            const key = `${sessionCode}-${it.paper}-${it.variant}`;
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
                  border-black/15 dark:border-white/20
                  text-neutral-900 dark:text-white
                  hover:bg-black/[.03] dark:hover:bg-white/[.08]
                "
              >
                {`Paper ${it.paper.replace("P", "")} — Variant ${it.variant.replace("V", "")}`}
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
