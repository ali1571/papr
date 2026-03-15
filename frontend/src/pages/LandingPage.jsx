import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import SEO from "../components/SEO.jsx";

export default function LandingPage() {
  return (
    <>
      <SEO page="home" />
      <HeroSection landing={true} />
    </>
  );
}
