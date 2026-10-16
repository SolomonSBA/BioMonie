import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFoundPage() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Page Not Found | Biomonie';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center bg-[linear-gradient(to_bottom,theme(colors.biomonie.teal)_0,theme(colors.biomonie.teal)_5rem,theme(colors.biomonie.pale)_15rem)] px-4 pb-16 pt-32 sm:px-[5%] sm:pt-36">
        <section className="mx-auto w-full max-w-3xl rounded-3xl border border-[#dde8f0] bg-white px-6 py-12 text-center shadow-biomonie-md sm:px-12 sm:py-16">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-biomonie-teal">
            Page not found
          </p>
          <h1 className="mt-3 text-7xl font-extrabold tracking-tight text-biomonie-text sm:text-8xl">
            404
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-biomonie-text/70 sm:text-lg">
            The page you’re looking for may have moved or may no longer be
            available. Check the address or head back to the Biomonie homepage.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-biomonie-lemon px-6 py-3 text-sm font-bold text-biomonie-teal-dark no-underline shadow-biomonie-cta transition hover:bg-biomonie-lemon2"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              Go to homepage
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#d6e3e9] px-6 py-3 text-sm font-semibold text-biomonie-text transition hover:bg-biomonie-pale"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Go back
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
