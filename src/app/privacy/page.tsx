import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Privacy Policy — YT Analytics",
  description: "How YT Analytics handles your data and privacy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted mb-10">Last updated: March 2026</p>

          <div className="space-y-8 text-muted leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                1. Information We Collect
              </h2>
              <p>
                When you use YT Analytics, we collect the following information:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li><strong className="text-foreground">Email address</strong> — Used to associate tracked channels with your account.</li>
                <li><strong className="text-foreground">YouTube channel URLs</strong> — The channels you choose to track.</li>
                <li><strong className="text-foreground">Contact information</strong> — Name, email, and message content when you use our contact form.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                2. How We Use Your Information
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>To fetch and display YouTube channel and video analytics.</li>
                <li>To associate tracked channels with your email for retrieval.</li>
                <li>To respond to your contact form submissions.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                3. Data from YouTube
              </h2>
              <p>
                All channel and video data is sourced from publicly available YouTube
                information via the YouTube Data API. We do not access any private
                YouTube account data or require YouTube authentication.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                4. Data Sharing
              </h2>
              <p>
                We do not sell, trade, or share your personal information with third
                parties. Your data is used solely for the purpose of providing the
                YT Analytics service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                5. Data Storage
              </h2>
              <p>
                Your data is stored securely in our backend systems. Channel analytics
                snapshots are retained to provide historical trend data. You may
                request deletion of your data by contacting us.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                6. Cookies
              </h2>
              <p>
                We use minimal cookies for theme preference (dark/light mode). We do
                not use tracking cookies or third-party analytics services.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                7. Changes to This Policy
              </h2>
              <p>
                We may update this privacy policy from time to time. Any changes will
                be reflected on this page with an updated date.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
