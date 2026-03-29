import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { noteSubjects, notesData } from "../data/notesData.js";
import SEO from "../components/SEO.jsx";
import Dropdown from "../components/ui/DropDown.jsx";
import quotes from "../api/quoteList.js";

/* ── topic row button ─────────────────────────────────────────────────────── */
const RowBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 0 16px;
  border-radius: 10px;
  border: 2px solid ${({ $active }) => $active ? "var(--color-text)" : "var(--divider)"};
  background: ${({ $active }) => $active ? "var(--color-text)" : "transparent"};
  color: ${({ $active }) => $active ? "var(--color-bg)" : "var(--color-text)"};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    width: 10px; height: 10px;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%) scale(0);
    border-radius: 30px;
    background: var(--color-text);
    transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 0;
  }
  &:not([data-active]):hover {
    color: var(--color-bg);
    border-color: transparent;
  }
  &:not([data-active]):hover::after {
    transform: translate(-50%, -50%) scale(40);
  }

  span { position: relative; z-index: 1; }
`;

const NoteContent = styled.div`
  font-family: var(--font-body, sans-serif);
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--color-text);
  opacity: 0.85;

  h2 { font-size: 1.2rem; font-weight: 700; margin: 1.5rem 0 0.5rem; }
  h3 { font-size: 1rem;   font-weight: 600; margin: 1.2rem 0 0.4rem; }
  p  { margin: 0.5rem 0; }
  ul, ol { padding-left: 1.4rem; margin: 0.5rem 0; }
  li { margin: 0.25rem 0; }
  strong { font-weight: 600; }
  hr { border: none; border-top: 1px solid var(--divider); margin: 1.5rem 0; }
`;

const Divider = () => (
  <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: "var(--divider)" }} />
);

function getTwoUniqueQuotes(list) {
  const a = Math.floor(Math.random() * list.length);
  let b = Math.floor(Math.random() * list.length);
  while (b === a) b = Math.floor(Math.random() * list.length);
  return [list[a], list[b]];
}

/* ══════════════════════════════════════════════════════════════════════════ */
export default function NotesPage() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedPaper,   setSelectedPaper]   = useState(null);
  const [selectedTopic,   setSelectedTopic]   = useState(null);
  const [dotLit,          setDotLit]          = useState(false);
  const [dotHovered,      setDotHovered]      = useState(false);

  const topicsRef  = useRef(null);
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  const [leftQuote,  setLeftQuote]  = useState(quotes[0]);
  const [rightQuote, setRightQuote] = useState(quotes[1]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  /* parallax mouse tracking */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e) => {
      const { left, top, width, height } = section.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - left) / width - 0.5) * 2,
        y: ((e.clientY - top) / height - 0.5) * 2,
      });
    };
    const onLeave = () => setMouse({ x: 0, y: 0 });
    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  /* rotating quotes */
  useEffect(() => {
    const id = setInterval(() => {
      const [a, b] = getTwoUniqueQuotes(quotes);
      setLeftQuote(a);
      setRightQuote(b);
    }, 7000);
    return () => clearInterval(id);
  }, []);

  /* scroll to topics once both dropdowns are filled */
  useEffect(() => {
    if (selectedSubject && selectedPaper) {
      setTimeout(() => topicsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [selectedSubject, selectedPaper]);

  useEffect(() => {
    if (selectedTopic) {
      setTimeout(() => contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [selectedTopic]);

  /* derived data */
  const subjectMeta  = selectedSubject ? noteSubjects.find(s => s.slug === selectedSubject) : null;
  const subjectData  = selectedSubject ? notesData[selectedSubject] : null;
  const group        = selectedPaper && subjectData
    ? subjectData.groups?.find(g => g.slug === selectedPaper)
    : null;
  const topic        = selectedTopic && group
    ? group.topics?.find(t => t.slug === selectedTopic)
    : null;

  /* dropdown display */
  const subjectItems        = noteSubjects.map(s => `${s.name} — ${s.code}`);
  const subjectDisplayValue = subjectMeta ? `${subjectMeta.name} — ${subjectMeta.code}` : "";

  const paperItems = subjectData?.groups?.map(g => g.label ?? g.slug.toUpperCase()) ?? ["P1", "P2"];
  const paperDisplayValue = (() => {
    if (!selectedPaper || !subjectData) return "";
    const g = subjectData.groups?.find(g => g.slug === selectedPaper);
    return g?.label ?? selectedPaper.toUpperCase();
  })();

  const handleSubjectChange = (val) => {
    const name = val.split(" — ")[0];
    const meta = noteSubjects.find(s => s.name === name);
    setSelectedSubject(meta?.slug ?? null);
    setSelectedPaper(null);
    setSelectedTopic(null);
  };

  const handlePaperChange = (val) => {
    const matched = subjectData?.groups?.find(g => (g.label ?? g.slug.toUpperCase()) === val);
    setSelectedPaper(matched?.slug ?? val.toLowerCase());
    setSelectedTopic(null);
  };

  const leftParallax  = {
    transform: `translate(${mouse.x * -14}px, ${mouse.y * -10}px)`,
    transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
  };
  const rightParallax = {
    transform: `translate(${mouse.x * 8}px, ${mouse.y * 10}px)`,
    transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
  };

  return (
    <div className="w-full">
      <SEO page="notes" subject={selectedSubject} section={selectedPaper} topic={topic?.name ?? null} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        className="relative isolate w-full h-[641px] text-theme flex flex-col justify-center items-center overflow-visible hero-bg transition-colors duration-300"
      >
        {/* LEFT QUOTE */}
        <div className="hidden xl:block absolute left-10 top-10 z-10" aria-hidden="true">
          <div style={leftParallax}>
            <aside className="quote-container w-[260px] p-4 rounded-[28px] glass-card grain float-soft float-delay-sm fade-card fade-bottom">
              <div className="flex items-center gap-3 mb-1">
                <span className="quote-mark">&ldquo;</span>
              </div>
              <div key={leftQuote.quote} className="text-sm leading-6 -mt-6 font-body-inter transition-all duration-700 opacity-0 animate-fadeIn">
                {leftQuote.quote}
              </div>
              <div key={leftQuote.author} className="mt-2 text-xs font-body-inter transition-all duration-700 animate-fadeIn">
                &mdash; {leftQuote.author}
              </div>
            </aside>
          </div>
        </div>

        {/* RIGHT QUOTE */}
        <div className="hidden xl:block absolute right-10 top-1/2 translate-y-6 z-10" aria-hidden="true">
          <div style={rightParallax}>
            <aside className="quote-container w-[260px] p-4 rounded-[28px] glass-card grain float-soft float-delay-md fade-card fade-bottom">
              <div className="flex items-center gap-3 mb-1">
                <span className="quote-mark">&ldquo;</span>
              </div>
              <div key={rightQuote.quote} className="text-sm leading-6 -mt-6 font-body-inter transition-all duration-700 opacity-0 animate-fadeIn">
                {rightQuote.quote}
              </div>
              <div key={rightQuote.author} className="mt-4 text-xs font-body-inter transition-all duration-700 opacity-0 animate-fadeIn">
                &mdash; {rightQuote.author}
              </div>
            </aside>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div className="hero-content w-full flex flex-col items-center">
          {/* Heading */}
          <div className="z-10 flex items-baseline gap-3 md:gap-5 translate-y-[-30%]">
            <h1 className="font-heading text-6xl md:text-8xl font-extrabold tracking-wider whitespace-nowrap">
              pApr
            </h1>
            <span
              className="font-heading text-6xl md:text-8xl font-extrabold tracking-wider transition-all duration-300 select-none cursor-pointer"
              style={{
                opacity: dotLit || dotHovered ? 1 : 0.3,
                color: dotLit ? "#facc15" : "inherit",
                textShadow: dotLit ? "0 0 18px rgba(250,204,21,0.7)" : "none",
              }}
              onClick={() => setDotLit(v => !v)}
              onMouseEnter={() => setDotHovered(true)}
              onMouseLeave={() => setDotHovered(false)}
            >
              ·
            </span>
            <h1 className="font-heading text-6xl md:text-8xl font-extrabold tracking-wider whitespace-nowrap">
              Notes
            </h1>
          </div>

          {/* Dropdowns */}
          <div className="w-full px-4 z-10">
            <div className="mx-auto w-full max-w-md mt-2 md:mt-3">
              <div className="flex flex-col sm:flex-row gap-4 font-body">
                <Dropdown
                  placeholder="Subject"
                  items={subjectItems}
                  value={subjectDisplayValue}
                  onChange={handleSubjectChange}
                  className="w-full sm:flex-1"
                />
                <Dropdown
                  placeholder="Paper"
                  items={paperItems}
                  value={paperDisplayValue}
                  onChange={handlePaperChange}
                  disabled={!selectedSubject}
                  className="w-full sm:flex-1"
                />
              </div>
              {subjectMeta && (
                <p className="mt-1.5 ml-1 font-body text-xs tracking-widest opacity-40 text-theme">
                  {subjectMeta.code} &middot; {subjectMeta.name}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stroke bleed */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center translate-x-16">
          <span
            className="font-heading text-8xl md:text-[10rem] font-extrabold tracking-wider whitespace-nowrap translate-y-[25%]"
            style={{ color: "transparent", WebkitTextStroke: "1.5px var(--color-text)", opacity: 0.35 }}
          >
            Notes
          </span>
        </div>
      </section>

      <Divider />

      {/* ── Topics ──────────────────────────────────────────────────────────── */}
      {group && (
        <section ref={topicsRef} className="fade-in-up">
          <p className="font-body text-xs opacity-30 mb-4">
            {subjectMeta?.name} &middot; {group.name}
          </p>

          {group.comingSoon ? (
            <p className="font-heading text-xl font-semibold opacity-50">
              {group.comingSoonText}
            </p>
          ) : (
            <div className="flex flex-col gap-2 mx-auto" style={{ maxWidth: "320px" }}>
              {group.topics?.map((t) => (
                <RowBtn
                  key={t.slug}
                  $active={selectedTopic === t.slug}
                  data-active={selectedTopic === t.slug || undefined}
                  onClick={() => setSelectedTopic(t.slug)}
                >
                  <span className="font-heading text-sm font-semibold tracking-wide">{t.name}</span>
                  <span className="font-body text-xs opacity-40">→</span>
                </RowBtn>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Note content ──────────────────────────────────────────────────── */}
      {topic && (
        <>
          <Divider />
          <section ref={contentRef} className="fade-in-up">
            <p className="font-body text-xs opacity-30 mb-1">
              {subjectMeta?.name} &middot; {group?.name}
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-theme mb-8">
              {topic.name}
            </h1>
            <NoteContent dangerouslySetInnerHTML={{ __html: topic.content }} />
          </section>
        </>
      )}
    </div>
  );
}