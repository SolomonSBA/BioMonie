import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import EcosystemSection from "@/components/home/EcosystemSection";
import TrustBanner from "@/components/home/TrustBanner";
import WhatSection from "@/components/home/WhatSection";
import HowSection from "@/components/home/HowSection";
import ForWhomSection from "@/components/home/ForWhomSection";
import EarnSection from "@/components/home/EarnSection";
import MerchantsSection from "@/components/home/MerchantsSection";
import FAQSection from "@/components/home/FAQSection";
import JoinCTASection from "@/components/home/JoinCTASection";
import { useLocation } from "react-router-dom";
import { syncSectionNavigationFromUrl } from "@/lib/section-nav";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    syncSectionNavigationFromUrl(location.pathname, window.location.hash);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <EcosystemSection />
        <TrustBanner />
        <WhatSection />
        <HowSection />
        <ForWhomSection />
        <EarnSection />
        <MerchantsSection />
        <FAQSection />
        <JoinCTASection />
      </main>
      <Footer />
    </>
  );
}
