import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import { useLocation } from "react-router-dom";
import { syncSectionNavigationFromUrl } from "@/lib/section-nav";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    syncSectionNavigationFromUrl(location.pathname, window.location.hash);
  }, [location.pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Navbar />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <HeroSection />
      </main>
      <Footer compact />
    </div>
  );
}
