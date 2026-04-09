import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import TechStack from "./components/TechStack";
import SignupCTA from "./components/SignupCTA";

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HowItWorks />
      <TechStack />
      <SignupCTA />
    </div>
  );
}