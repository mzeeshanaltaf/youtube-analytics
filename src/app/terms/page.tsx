import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Terms of Service — YT Analytics",
  description: "Terms and conditions for using YT Analytics.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl font-bold tracking-tight mb-2">
            Terms of Service
          </h1>
          <p className="text-muted mb-10">Last updated: March 2026</p>

          <div className="space-y-8 text-muted leading-relaxed">
            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using YT Analytics, you agree to be bound by these
                Terms of Service. If you do not agree with any part of these terms,
                please do not use the service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                2. Description of Service
              </h2>
              <p>
                YT Analytics is a free tool that allows users to track YouTube channel
                performance metrics including subscriber counts, view counts, and video
                analytics. The service is provided as-is without any guarantees of
                uptime or data accuracy.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                3. User Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>You must provide a valid email address to use the service.</li>
                <li>You may only track publicly available YouTube channels.</li>
                <li>You agree not to abuse the service through automated or excessive requests.</li>
                <li>You are responsible for the accuracy of the information you provide.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                4. Intellectual Property
              </h2>
              <p>
                YouTube channel data, video content, and thumbnails remain the
                intellectual property of their respective owners. YT Analytics
                displays publicly available data for informational purposes only.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                5. Limitation of Liability
              </h2>
              <p>
                YT Analytics is provided &quot;as is&quot; without warranties of any kind.
                We are not liable for any damages arising from the use or inability
                to use the service, including but not limited to data inaccuracies
                or service interruptions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                6. Data Usage
              </h2>
              <p>
                By using the service, you consent to the collection and processing
                of your email address and channel tracking data as described in our{" "}
                <a href="/privacy" className="text-accent hover:text-accent-hover transition-colors">
                  Privacy Policy
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                7. Modifications
              </h2>
              <p>
                We reserve the right to modify or discontinue the service at any time
                without notice. We may also update these terms periodically. Continued
                use of the service constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                8. Termination
              </h2>
              <p>
                We reserve the right to restrict or terminate access to the service
                for any user who violates these terms or abuses the platform.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
