import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Technology from "@/components/landing/Technology";
import Community from "@/components/landing/Community";
import FooterSection from "@/components/landing/FooterSection";
import CyberBackground from "@/components/landing/CyberBackground";

export default function Landing() {
  return (
    <div
      data-testid="landing-page"
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <CyberBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Technology />
          <Community />
        </main>
        <FooterSection />
      </div>
    </div>
  );
}
