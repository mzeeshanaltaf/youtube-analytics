import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact Us — YT Analytics",
  description: "Have a question or feedback? Send us a message.",
  alternates: {
    canonical: "https://yt-analytics.zeeshanai.cloud/contact",
  },
};

// Short error codes set by the API route's redirect (?error=...) mapped to
// human-readable copy. Keep keys in sync with the route handler's fail() calls.
const ERROR_MESSAGES: Record<string, string> = {
  fields: "Please fill in all fields.",
  email: "Please enter a valid email address.",
  length: "Your message is too long. Please shorten it.",
  rate: "Too many submissions. Please try again later.",
  server: "Service is temporarily unavailable. Please try again later.",
  parse: "Invalid submission. Please try again.",
};

// In Next.js App Router, searchParams is a Promise and must be awaited.
type Props = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { sent, error } = await searchParams;
  const initialError = error
    ? ERROR_MESSAGES[error] ?? "Something went wrong. Please try again."
    : undefined;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-lg px-6 pt-32 pb-24">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Have a question or feedback? Send us a message and we&apos;ll get back to you.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8 shadow-2xl shadow-black/5">
          <ContactForm initialSuccess={!!sent} initialError={initialError} />
        </div>
      </main>
      <Footer />
    </>
  );
}
