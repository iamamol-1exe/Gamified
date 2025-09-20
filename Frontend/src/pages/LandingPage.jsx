import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import CTA from "../Components/Cta";
import Footer from "../Components/Footer";
import Features from "../Components/Features";
import SubFeatures from "../Components/SubFeatures";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 font-sans">
      <Header />
      <main>
        <Hero />
        <Features />
        <SubFeatures />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
