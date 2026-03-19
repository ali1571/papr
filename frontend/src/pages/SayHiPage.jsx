import React, { useRef, useState, useEffect, lazy, Suspense } from "react";
import emailjs from "@emailjs/browser";
import SEO from "../components/SEO.jsx";

const Footer = lazy(() => import("../components/Footer.jsx"));

export default function SayHiPage() {
  const formRef = useRef(null);
  // idle | sending | success | error
  // idle | sending | success | error | cooldown
  const [status, setStatus] = useState("idle");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    // Resume cooldown if page was reloaded mid-timer
    const until = parseInt(localStorage.getItem("sayhi_cooldown_until") || "0", 10);
    const remaining = Math.ceil((until - Date.now()) / 1000);
    if (remaining > 0) startCooldown(remaining);
  }, []);

  const startCooldown = (sec = 120) => {
    localStorage.setItem("sayhi_cooldown_until", Date.now() + sec * 1000);
    setCooldown(sec);
    setStatus("cooldown");
    const id = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          localStorage.removeItem("sayhi_cooldown_until");
          setStatus("idle");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending" || status === "cooldown") return;
    setStatus("sending");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        formRef.current
      );
      formRef.current.reset();
      setStatus("success");
      setTimeout(() => startCooldown(120), 1500);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <>
      <SEO page="sayhi" />

      <div className="max-w-2xl mx-auto py-16 px-2 space-y-14">

        {/* ── 1. Intro ─────────────────────────────────────────────── */}
        <section>
          <p className="font-body text-base leading-relaxed" style={{ color: "var(--color-text)" }}>
            I'm Ali — 21, still figuring things out honestly, but I built papr.site because past
            papers deserve better than clunky, ad-filled sites. It started as a small thing, just a
            problem that needed fixing. It's still a small thing, but students use it, so I keep going.
          </p>
        </section>

        {/* ── 2. Contact form ──────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="font-heading text-2xl font-semibold mb-2" style={{ color: "var(--color-text)" }}>
              Get in touch
            </h2>
            <p className="font-body text-sm leading-relaxed" style={{ color: "var(--color-text)", opacity: 0.65 }}>
              "If something's broken, a subject is missing, or you just want to say hi — drop a message and I'll get back to you. I read everything. Prefer to stay anonymous? Use the feedback button at the bottom of the O/A-levels pages."
            </p>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                disabled={status === "sending"}
                className="w-full font-body px-4 py-2.5 rounded-lg bg-panel text-theme placeholder-theme border border-theme focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors duration-200"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                disabled={status === "sending"}
                className="w-full font-body px-4 py-2.5 rounded-lg bg-panel text-theme placeholder-theme border border-theme focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors duration-200"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message"
                required
                rows={5}
                disabled={status === "sending"}
                className="w-full font-body px-4 py-2.5 rounded-lg bg-panel text-theme placeholder-theme border border-theme focus:outline-none focus:ring-1 focus:ring-white/20 transition-colors duration-200 resize-none"
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "sending" || status === "cooldown"}
                className={`font-body px-6 py-2 rounded-lg border border-theme transition-colors duration-300 cursor-pointer
                  ${status === "sending" || status === "cooldown"
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-[var(--hover-overlay)]"
                  }`}
                style={{ color: "var(--color-text)" }}
              >
                {status === "sending" ? "Sending…" : status === "cooldown" ? `Wait ${cooldown}s` : "Send"}
              </button>

              {status === "success" && (
                <p className="font-body text-sm" style={{ color: "var(--color-text)", opacity: 0.7 }}>
                  Got it — I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p className="font-body text-sm text-red-400">
                  Something went wrong. Try again.
                </p>
              )}
            </div>
          </form>
        </section>

        {/* ── 3. Tutoring ──────────────────────────────────────────── */}
        <section
          className="pl-4 font-body text-base leading-relaxed"
          style={{
            borderLeft: "2px solid var(--divider)",
            color: "var(--color-text)",
          }}
        >
          If you're stuck on a topic and past papers aren't cutting it, I occasionally help students
          one-on-one with O/A-level prep. Reach out through the form if that's something you'd want.
        </section>

        {/* ── 4. Instagram volunteer ───────────────────────────────── */}
        <section
          className="pl-4 font-body text-base leading-relaxed"
          style={{
            borderLeft: "2px solid var(--divider)",
            color: "var(--color-text)",
          }}
        >
          Also — if you're a student who's into making reels or posting study content, papr.site's
          Instagram is basically up for grabs. Would be cool to have someone run it who actually gets
          the student side of things. Just mention it in your message.
        </section>

      </div>

      {/* ── 5. Honorary mentions ─────────────────────────────────── */}
      <div className="w-full mt-10">
        <div className="mx-auto w-[95%] h-px mb-10" style={{ backgroundColor: "var(--divider)" }} />

        <div className="max-w-2xl mx-auto px-2 mb-6">
          <p className="font-body text-sm" style={{ color: "var(--color-text)", opacity: 0.45 }}>
            honorary mentions —
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ borderTop: "1px solid var(--divider)", borderBottom: "1px solid var(--divider)" }}>
          {/* Zarawar */}
          <div
            className="px-8 py-10 md:px-12 md:py-14"
            style={{ borderRight: "1px solid var(--divider)" }}
          >
            <p className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              Zarawar
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              bro gave the name, Papr wouldn't be called Papr without him. He threw out the name in
              a conversation and it just landed perfectly.{" "}
              <a
                href="https://www.instagram.com/zarawar.khn?igsh=eXBqdWxkdDJ5azho"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "#ffffff" }}
              >
                @zarawar
              </a>
            </p>
          </div>

          {/* Farhan */}
          <div className="px-8 py-10 md:px-12 md:py-14">
            <p className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: "var(--color-text)" }}>
              Farhan
            </p>
            <p className="font-body text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
              The guy I bounce everything off — strategy, direction, what's stupid, what's not.
              Low-key responsible for whatever this becomes.{" "}
              <a
                href="https://www.instagram.com/ngl.4han?igsh=MWlpeWdwYTE3aGsweQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "#ffffff" }}
              >
                @farhan
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-[95%] h-px my-10" style={{ backgroundColor: "var(--divider)" }} />
      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>
    </>
  );
}
