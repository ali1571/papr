import React from "react";
import Dropdown from "./ui/DropDown";
import ButtonLoader from "./ui/ButtonLoader";
import { subjects, yearsBySubject } from "../api/options.js";
import { useQueryClient } from "@tanstack/react-query";
import { fetchPapers } from "../api/papers";
import quotes from "../api/quoteList";
import { useState } from "react";
import { useEffect } from "react";


export default function HeroSection({
  subject,
  year,
  setSubject,
  setYear,
  loading,
  onFind
}) {

  const queryClient = useQueryClient();

  // Prefetch when subject changes
  const handleSubjectChange = (newSubject) => {
    setSubject(newSubject);
    setYear(""); // reset year

    if (newSubject && year) {
      queryClient.prefetchQuery({
        queryKey: ["papers", newSubject, year],
        queryFn: () => fetchPapers(newSubject, year),
      });
    }
  };

  // Prefetch when year changes
  const handleYearChange = (newYear) => {
    setYear(newYear);
    if (subject && newYear) {
      // prefetch = real network call (expected)
      queryClient.prefetchQuery({
        queryKey: ['papers', subject, newYear],
        queryFn: () => fetchPapers(subject, newYear),
      });
    }
  };

  const [leftQuote, setLeftQuote] = useState(quotes[0]);
  const [rightQuote, setRightQuote] = useState(quotes[1]);

  function getTwoUniqueQuotes(quotes) {
    const firstIndex = Math.floor(Math.random() * quotes.length);
    let secondIndex = Math.floor(Math.random() * quotes.length);

    while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * quotes.length);
    }

    return [quotes[firstIndex], quotes[secondIndex]];
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const [newLeft, newRight] = getTwoUniqueQuotes(quotes);
      setLeftQuote(newLeft);
      setRightQuote(newRight);
    }, 7000); // change every 7s

    return () => clearInterval(interval);
  }, []);


  // Guarded years list: if no subject, show empty array
  const years = subject ? yearsBySubject[subject] || [] : [];

  return (
    <section className="elative isolate w-full h-[641px] text-theme flex flex-col justify-center items-center overflow-visible hero-bg transition-colors duration-300">
      <div className="hero-content w-full flex flex-col items-center">

        {/* LEFT QUOTE */}
        <aside
          className="quote-container hidden xl:block absolute left-10 -top-1/2 -translate-y-1/2 w-[260px] p-4 rounded-[28px] glass-card grain float-soft float-delay-sm fade-card fade-bottom z-10"
          aria-hidden="true"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="quote-mark">“</span>
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
            — {leftQuote.author}
          </div>
        </aside>

        {/* RIGHT QUOTE */}
        <aside
          className="quote-container hidden xl:block absolute right-10 top-1/2 translate-y-6 w-[260px] p-4 rounded-[28px] glass-card grain float-soft float-delay-md fade-card fade-bottom z-10"
          aria-hidden="true"
        >
          <div className="flex items-center gap-3 mb-1">
            <span className="quote-mark">“</span>
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
            — {rightQuote.author}
          </div>
        </aside>


        {/* === CENTER HERO CONTENT === */}
        <div className="z-10 flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-10 translate-y-[-30%]">
          {/* Left: brand + tiny note */}
          <div className="relative inline-block">
            <h1
              className="font-heading text-6xl md:text-8xl font-extrabold tracking-wider whitespace-nowrap translate-y-[-8] md:translate-y-10">
              pApr
            </h1>

            <span
              className="font-body absolute top-12 left-29 text-[10px] italic text-gray-500 whitespace-nowrap -translate-y-12 -translate-x-10 md:translate-y-0 md:translate-x-1"
            >
              emphasis on getting that A ;)
            </span>
          </div>

          {/* Right: badge ABOVE big quote (same row; this side is a column) */}
          <div className="flex flex-col items-center md:items-start">
            {/* glassy badge */}
            <span className="mt-3 md:mt-0 inline-flex items-center gap-2 px-4 py-1.5 
              rounded-full font-body text-xs md:text-sm tracking-wide 
              bg-panel border border-theme text-theme 
              backdrop-blur-md shadow-md">
              <i className="fa-regular fa-star"></i>
              Built for students, by students
            </span>

            {/* big right-side quote */}
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
            <div className="flex flex-col sm:flex-row gap-4 font-body">
              <Dropdown placeholder="Subject" items={subjects} value={subject} onChange={handleSubjectChange} className="w-full sm:flex-1" />
              <Dropdown placeholder="Year" items={years.map(String)} value={year} onChange={handleYearChange} disabled={!subject} className="w-full sm:flex-1" />
            </div>
            <button className="mt-4 w-full px-5 py-2 rounded-[10px] backdrop-blur-md border border-theme text-theme hover:bg-theme/10 transition disabled:opacity-50 duration-300 font-body cursor-pointer block" disabled={!subject || !year || loading} onClick={() => onFind?.(subject, year)}>
              {loading ? <ButtonLoader /> : "Find Paper"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}