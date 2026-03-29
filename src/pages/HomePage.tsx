import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustBanner from "@/components/home/TrustBanner";
import WhatSection from "@/components/home/WhatSection";
import HowSection from "@/components/home/HowSection";
import ForWhomSection from "@/components/home/ForWhomSection";
import EarnSection from "@/components/home/EarnSection";
import LoansSection from "@/components/home/LoansSection";
import MerchantsSection from "@/components/home/MerchantsSection";
import FAQSection from "@/components/home/FAQSection";
import JoinCTASection from "@/components/home/JoinCTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustBanner />
        <WhatSection />
        <HowSection />
        <ForWhomSection />
        <EarnSection />
        <LoansSection />
        <MerchantsSection />
        <FAQSection />
        <JoinCTASection />
      </main>
      <Footer />
    </>
  );
}
