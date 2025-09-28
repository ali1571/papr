// src/components/Footer.jsx
import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';

export default function Footer() {

  const formRef = useRef(null);

  // idle | sending | success | error | cooldown
  const [tone, setTone] = useState("idle");
  const [label, setLabel] = useState("Submit");
  const [cooldown, setCooldown] = useState(0); // seconds left

  // public key setup
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const setTempButton = (text, newTone, ms = 5000) => {
    setLabel(text);
    setTone(newTone);
    if (ms > 0) {
      setTimeout(() => {
        // if still not in cooldown/sending, go back to idle
        if (newTone !== "cooldown" && newTone !== "sending") {
          setLabel("Submit");
          setTone("idle");
        }
      }, ms);
    }
  };

  const startCooldown = (sec = 120) => {
    setCooldown(sec);
    setTone("cooldown");
    setLabel(`Wait ${sec}s`);
    const id = setInterval(() => {
      setCooldown((p) => {
        const next = p - 1;
        if (next <= 0) {
          clearInterval(id);
          setTone("idle");
          setLabel("Submit");
          return 0;
        }
        setLabel(`Wait ${next}s`);
        return next;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // prevent double submissions
    if (tone === "sending" || tone === "cooldown") return;

    const feedback = formRef.current.feedback.value.trim();

    // === validations ===
    if (!feedback) {
      return setTempButton("Please enter your feedback 😊", "error");
    }
    if (feedback.length < 5) {
      return setTempButton("Too short, add a bit more ✍️", "error");
    }
    if (feedback.length > 500) {
      return setTempButton("Max 500 characters ✂️", "error");
    }

    // === send email ===
    setTone("sending");
    setLabel("Sending…");

    try {
      // since you already did emailjs.init(publicKey) in useEffect,
      // you don’t pass the public key here
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current
      );

      // reset form
      formRef.current.reset();

      // brief success flash, then start cooldown
      setTempButton("Sent! ✅", "success", 1200);
      setTimeout(() => startCooldown(120), 1200);

    } catch (err) {
      console.error("EmailJS error:", err);
      setTempButton("Something went wrong 😕", "error");
    }
  };

  // tone -> colors (smooth transitions)
  // tone -> colors (smooth transitions)
  const toneClass =
    tone === "sending"
      ? "bg-blue-500 text-white animate-pulse"
      : tone === "success"
        ? "bg-green-500 text-white"
        : tone === "error"
          ? "bg-red-500 text-white"
          : tone === "cooldown"
            ? "bg-gray-400 text-white"
            : "bg-transparent text-theme hover:bg-[var(--hover-overlay)]";


  return (
    <footer className="bg-theme text-theme py-10 mt-5 transition-colors duration-300">
      {/* Social icons */}
      <div className="flex justify-center space-x-10 mb-6">
        <a href="https://chat.whatsapp.com/Bv1bqqqzKn9ACam4vSL4LR?mode=ems_copy_t" target="_blank" rel="noopener noreferrer" className="text-2xl transform transition-transform duration-300 hover:scale-125 hover:text-gray-300">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
        <a href="https://discord.gg/9zBsDPDQ" target="_blank" rel="noopener noreferrer" className="text-2xl transform transition-transform duration-300 hover:scale-125 hover:text-gray-300">
          <i className="fa-brands fa-discord"></i>
        </a>
        <a href="https://www.instagram.com/papr.site/" target="_blank" rel="noopener noreferrer" className="text-2xl transform transition-transform duration-300 hover:scale-125 hover:text-gray-300">
          <i className="fa-brands fa-instagram"></i>
        </a>
      </div>

      {/* Project name */}
      <div className="text-center font-heading text-5xl font-bold mb-6 tracking-wider">
        pApr.
      </div>

      {/* Feedback input + submit */}
      {/* Feedback input + submit */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex justify-center mb-4">
        <div className="flex flex-row max-[420px]:flex-col border border-theme rounded-lg overflow-hidden w-full max-w-md">
          <input
            type="text"
            name="feedback"
            placeholder="Give us Feedback"
            className="flex-grow font-body px-4 py-2 bg-panel text-theme placeholder-theme focus:outline-none"
            disabled={tone === "sending"}
          />
          <button
            type="submit"
            disabled={tone === "sending" || tone === "cooldown"}
            className={`cursor-pointer px-4 py-2 font-body border-l max-[420px]:border-l-0 max-[420px]:border-t border-theme transition-colors duration-500 ${toneClass}`}
          >
            {label}
          </button>
        </div>
      </form>

      {/* Copyright */}
      <div className="font-heading text-center text-sm">
        Copyright © {new Date().getFullYear()} Papr
        <br />
        All Rights Reserved, Developed by Ali.
      </div>
    </footer>
  );
}