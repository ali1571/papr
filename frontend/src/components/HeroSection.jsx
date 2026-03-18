import React from "react";
import styled from "styled-components";
import Dropdown from "./ui/DropDown";
import ButtonLoader from "./ui/ButtonLoader";
import { subjects as defaultSubjects, yearsBySubject as defaultYearsBySubject, subjectCodes as defaultSubjectCodes } from "../api/options.js";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPapers as defaultFetchPapers } from "../api/papers";
import quotes from "../api/quoteList";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const LevelButton = styled.button`
  flex: 1;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid var(--divider);
  background: var(--panel);
  color: var(--color-text);
  backdrop-filter: blur(6px);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.28s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: var(--hover);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.28s cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 10px;
    z-index: -1;
  }

  &:hover {
    color: var(--color-text);
    border-color: var(--divider);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: right;
  }
`;

export default function HeroSection({
  subject,
  year,
  setSubject,
  setYear,
  loading,
  onFind,
  subjects = defaultSubjects,
  yearsBySubject = defaultYearsBySubject,
  subjectCodes = defaultSubjectCodes,
  fetchPapersFn = defaultFetchPapers,
  levelLabel = "O Levels",
  landing = false,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleSubjectChange = (val) => {
    const newSubject = val.split(" — ")[0];
    setSubject(newSubject);
    setYear("");
    if (newSubject && year) {
      queryClient.prefetchQuery({
        queryKey: ["papers", newSubject, year],
        queryFn: () => fetchPapersFn(newSubject, year),
      });
    }
  };

  const handleYearChange = (newYear) => {
    setYear(newYear);
    if (subject && newYear) {
      queryClient.prefetchQuery({
        queryKey: ["papers", subject, newYear],
        queryFn: () => fetchPapersFn(subject, newYear),
      });
    }
  };

  const [leftQuote, setLeftQuote] = useState(quotes[0]);
  const [rightQuote, setRightQuote] = useState(quotes[1]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleMouseMove = (e) => {
      const { left, top, width, height } = section.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 2;
      const y = ((e.clientY - top) / height - 0.5) * 2;
      setMouse({ x, y });
    };
    const handleMouseLeave = () => setMouse({ x: 0, y: 0 });
    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function getTwoUniqueQuotes(list) {
    const firstIndex = Math.floor(Math.random() * list.length);
    let secondIndex = Math.floor(Math.random() * list.length);
    while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * list.length);
    }
    return [list[firstIndex], list[secondIndex]];
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const [newLeft, newRight] = getTwoUniqueQuotes(quotes);
      setLeftQuote(newLeft);
      setRightQuote(newRight);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const years = subject ? yearsBySubject[subject] || [] : [];

  const leftParallax = {
    transform: "translate(" + mouse.x * -14 + "px, " + mouse.y * -10 + "px)",
    transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1)",
  };
  const rightParallax = {
    transform: "translate(" + mouse.x * 8 + "px, " + mouse.y * 10 + "px)",
    transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)",
  };

  return (
    <section
      ref={sectionRef}
      className="elative isolate w-full h-[641px] text-theme flex flex-col justify-center items-center overflow-visible hero-bg transition-colors duration-300"
    >
      <div className="hero-content w-full flex flex-col items-center">

        {/* LEFT QUOTE */}
        <div
          className="hidden xl:block absolute left-10 -top-1/2 -translate-y-1/2 z-10"
          aria-hidden="true"
        >
          <div style={leftParallax}>
          <aside className="quote-container w-[260px] p-4 rounded-[28px] glass-card grain float-soft float-delay-sm fade-card fade-bottom">
            <div className="flex items-center gap-3 mb-1">
              <span className="quote-mark">&ldquo;</span>
            </div>
            <div
              key={leftQuote.quote}
              className="text-sm leading-6 -mt-6 font-body-inter transition-all duration-700 opacity-0 animate-fadeIn"
            >
              {leftQuote.quote}
            </div>
            <div
              key={leftQuote.author}
              className="mt-2 text-xs font-body-inter transition-all duration-700 animate-fadeIn"
            >
              &mdash; {leftQuote.author}
            </div>
          </aside>
          </div>
        </div>

        {/* RIGHT QUOTE */}
        <div
          className="hidden xl:block absolute right-10 top-1/2 translate-y-6 z-10"
          aria-hidden="true"
        >
          <div style={rightParallax}>
            <aside className="quote-container w-[260px] p-4 rounded-[28px] glass-card grain float-soft float-delay-md fade-card fade-bottom">
              <div className="flex items-center gap-3 mb-1">
                <span className="quote-mark">&ldquo;</span>
              </div>
              <div
                key={rightQuote.quote}
                className="text-sm leading-6 -mt-6 font-body-inter transition-all duration-700 opacity-0 animate-fadeIn"
              >
                {rightQuote.quote}
              </div>
              <div
                key={rightQuote.author}
                className="mt-4 text-xs font-body-inter transition-all duration-700 opacity-0 animate-fadeIn"
              >
                &mdash; {rightQuote.author}
              </div>
            </aside>
          </div>
        </div>

        {/* CENTER HERO CONTENT */}
        <div className="z-10 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-10 translate-y-[-30%]">
          <div className="relative inline-block">
            <h1 className="font-heading text-6xl md:text-8xl font-extrabold tracking-wider whitespace-nowrap translate-y-[-8] md:translate-y-10">
              pApr
            </h1>
            <span className="font-body absolute top-12 left-29 text-[10px] italic text-gray-500 whitespace-nowrap -translate-y-12 -translate-x-10 md:translate-y-0 md:translate-x-1">
              emphasis on getting that A ;)
            </span>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <span className="mt-3 md:mt-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-body text-xs md:text-sm tracking-wide bg-panel border border-theme text-theme backdrop-blur-md shadow-md group">
              <i className="fa-regular fa-star transition-all duration-300 group-hover:text-yellow-400 group-hover:drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"></i>
              Built for students, by students
            </span>
            <div className="mt-3 font-body font-extrabold uppercase text-[26px] xl:text-[30px] leading-[1.1] tracking-wide text-theme text-center md:text-left">
              KEEP ON SOLVING.<br />
              ANJUM ONCE SAID: TEZ NI<br />
              ZYADA BHAAG.
            </div>
          </div>
        </div>

        {/* Controls + Button */}
        <div className="w-full px-4 z-10">
          <div className="mx-auto w-full max-w-md md:-mt-6 lg:-mt-8">
            {landing ? (
              <div className="flex flex-col sm:flex-row gap-4 font-body">
                <LevelButton onClick={() => navigate("/olevels")}>
                  O Levels
                </LevelButton>
                <LevelButton onClick={() => navigate("/alevels")}>
                  A Levels
                </LevelButton>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row gap-4 font-body">
                  <Dropdown
                    placeholder="Subject"
                    items={subjects.map(s => subjectCodes[s] ? `${s} — ${subjectCodes[s]}` : s)}
                    value={subject && subjectCodes[subject] ? `${subject} — ${subjectCodes[subject]}` : subject}
                    onChange={handleSubjectChange}
                    className="w-full sm:flex-1"
                  />
                  <Dropdown
                    placeholder="Year"
                    items={years.map(String)}
                    value={year}
                    onChange={handleYearChange}
                    disabled={!subject}
                    className="w-full sm:flex-1"
                  />
                </div>
                {subject && subjectCodes[subject] && (
                  <p className="mt-1.5 ml-1 font-body text-xs tracking-widest opacity-40 text-theme">
                    {subjectCodes[subject]} &middot; {subject}
                  </p>
                )}
                <button
                  className="mt-4 w-full px-5 py-2 rounded-[10px] backdrop-blur-md border border-theme text-theme hover:bg-theme/10 transition disabled:opacity-50 duration-300 font-body cursor-pointer block"
                  disabled={!subject || !year || loading}
                  onClick={() => onFind?.(subject, year)}
                >
                  {loading ? <ButtonLoader /> : "Find Paper"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* SEO Content */}
        <div className="sr-only" aria-hidden="true">
          <h2>Download Free O Level and IGCSE Past Papers</h2>
          <p>Access comprehensive O Level and IGCSE past papers for all major subjects including Chemistry 5070, Physics 5054, Mathematics 4024, Computer Science 2210, Economics 2281, Islamiat 2058, and Pakistan Studies 2059.</p>
          <p>Download question papers (QP), mark schemes (MS), and examiner reports (ER) from 2018 to 2025. All past papers are available for free, covering summer and winter sessions.</p>
          <p>Whether you need O level pastpaper 2023, O level pastpaper 2024, or O level pastpaper 2025, we have them all. Perfect for exam preparation and revision. CAIE Cambridge past papers made easy.</p>
        </div>
      </div>

      {/* Level label stroke bleed */}
      {!landing && (
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none flex justify-center translate-x-16">
          <span
            className="font-heading text-8xl md:text-[10rem] font-extrabold tracking-wider whitespace-nowrap translate-y-[25%]"
            style={{
              color: "transparent",
              WebkitTextStroke: "1.5px var(--color-text)",
              opacity: 0.35,
            }}
          >
            {levelLabel}
          </span>
        </div>
      )}
    </section>
  );
}
