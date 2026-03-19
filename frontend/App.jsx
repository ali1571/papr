// App.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./src/components/ui/Navbar.jsx";
import LandingPage from "./src/pages/LandingPage.jsx";
import OLevelsPage from "./src/pages/OLevelsPage.jsx";
import ALevelsPage from "./src/pages/ALevelsPage.jsx";
import SayHiPage from "./src/pages/SayHiPage.jsx";
import { Worker } from "@react-pdf-viewer/core";
import WhatsAppFloat from "./src/components/WhatsAppFloat.jsx";

export default function App() {
  const location = useLocation();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div className="min-h-screen bg-[#0f0f0f] text-black dark:bg-[#0f0f0f] dark:text-white flex items-start justify-center py-8">
        <div className="app-frame">
          <div className="app-frame-scroll no-scrollbar">
            <div className="pt-6" />
            <Navbar />
            <main className="px-6 lg:px-10">
              <div key={location.pathname} className="page-transition">
                <Routes location={location}>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/olevels" element={<OLevelsPage />} />
                  <Route path="/olevels/:subject" element={<OLevelsPage />} />
                  <Route path="/olevels/:subject/:year" element={<OLevelsPage />} />
                  <Route path="/alevels" element={<ALevelsPage />} />
                  <Route path="/alevels/:subject" element={<ALevelsPage />} />
                  <Route path="/alevels/:subject/:year" element={<ALevelsPage />} />
                  <Route path="/say-hi" element={<SayHiPage />} />
                </Routes>
              </div>
            </main>
            <div className="pb-10" />
          </div>
        </div>
      </div>
      <WhatsAppFloat />
    </Worker>
  );
}
