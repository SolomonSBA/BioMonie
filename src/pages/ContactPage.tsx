import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { submitContactForm } from "@/lib/contact-api";
import { Loader2, Send } from "lucide-react";
import { Reveal } from "@/lib/motion";

const fieldClass =
  "w-full rounded-lg border border-[#dde8f0] bg-white px-4 py-2.5 text-biomonie-text shadow-sm transition placeholder:text-biomonie-muted/55 focus:border-biomonie-teal focus:outline-none focus:ring-2 focus:ring-biomonie-teal/25";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [err, setErr] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErr("");
    const res = await submitContactForm({ name, email, phone, interest, message });
    if (res.ok) {
      setStatus("ok");
      setName("");
      setEmail("");
      setPhone("");
      setInterest("");
      setMessage("");
    } else {
      setStatus("err");
      setErr(res.error || "Something went wrong");
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-biomonie-pale pt-28 pb-20">
        <div className="mx-auto max-w-2xl px-[5%]">
          <Reveal>
            <p className="mb-2 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-biomonie-teal">Contact</p>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-biomonie-text md:text-4xl">Get in touch</h1>
            <p className="mb-10 max-w-lg text-[1.05rem] leading-relaxed text-biomonie-text/[0.72]">
              Questions about <strong className="font-semibold text-biomonie-teal">BIOMONIE</strong>, partnerships, or getting started? Send us a message we&apos;ll respond as soon as we can.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={onSubmit}
              className="space-y-5 rounded-2xl border border-[#dde8f0] bg-white p-8 shadow-biomonie-sm"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-biomonie-text">
                  Name *
                </label>
                <input
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={fieldClass}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-biomonie-text">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-biomonie-text">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={fieldClass}
                  placeholder="Optional"
                />
              </div>
              <div>
                <label htmlFor="interest" className="mb-1.5 block text-sm font-semibold text-biomonie-text">
                  I&apos;m interested as
                </label>
                <select
                  id="interest"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className={fieldClass}
                >
                  <option value="">Select one (optional)</option>
                  <option value="Customer">Customer</option>
                  <option value="Agent">Agent</option>
                  <option value="Merchant">Merchant</option>
                  <option value="Affiliate BRM">Affiliate BRM</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-biomonie-text">
                  Message *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${fieldClass} resize-y`}
                  placeholder="How can we help?"
                />
              </div>
              {status === "ok" && (
                <p className="rounded-lg border border-biomonie-teal/20 bg-biomonie-teal/[0.08] px-4 py-3 text-sm font-medium text-biomonie-teal">
                  Thank you your message was sent successfully.
                </p>
              )}
              {status === "err" && (
                <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">{err}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-biomonie-teal px-6 py-3.5 font-bold text-white shadow-biomonie-sm transition duration-200 hover:bg-biomonie-teal-mid hover:shadow-biomonie-md disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send message
                  </>
                )}
              </button>
            </form>
          </Reveal>

          <p className="mt-10 text-center text-sm text-biomonie-text/55">
            <Link
              to="/"
              className="font-semibold text-biomonie-teal underline-offset-4 transition hover:text-biomonie-teal-mid hover:underline"
            >
              ← Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
