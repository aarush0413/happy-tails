import { Metadata } from "next";
import { PawPrint, Shield, Mail } from "lucide-react";
import { SITE_NAME, LAST_VERIFIED } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `${SITE_NAME} privacy policy. Learn how we handle your data and protect your privacy.`,
};

export default function PrivacyPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-bluey-ice to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-bluey-primary/10 rounded-full px-4 py-2 mb-6">
            <Shield className="w-4 h-4 text-bluey-primary" />
            <span className="text-sm font-semibold text-bluey-primary">Your Privacy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-bluey-navy tracking-tight leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-bluey-navy/60 text-sm">
            Last updated: {LAST_VERIFIED}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-bluey max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">Overview</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              {SITE_NAME} is a pet services directory for Pune metro. We are committed to
              protecting your privacy. This policy explains what information we collect
              and how we use it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">Information We Collect</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed mb-3">
              {SITE_NAME} does not require user accounts, logins, or personal information
              to use the directory. We do not collect:
            </p>
            <ul className="list-disc list-inside text-sm text-bluey-navy/70 space-y-1.5">
              <li>Names, email addresses, or phone numbers</li>
              <li>Payment or financial information</li>
              <li>Location data (unless you voluntarily share it via your browser)</li>
              <li>Personal health or pet health records</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">Analytics</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              We use Vercel Analytics and Vercel Speed Insights to understand how visitors
              use the site. These tools collect anonymized, aggregate data such as page
              views, load times, and device types. No personally identifiable information
              is collected or stored. You can learn more about Vercel&apos;s privacy practices
              at{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-bluey-primary hover:underline">
                vercel.com/legal/privacy-policy
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">Cookies</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              {SITE_NAME} does not set any first-party cookies. Third-party services
              (such as Vercel Analytics or Google AdSense, if enabled) may use their own
              cookies. We do not control these third-party cookies.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">Third-Party Links</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              Our directory contains links to external websites (provider websites, Google
              Maps, booking platforms, etc.). We are not responsible for the privacy
              practices or content of these third-party sites. We encourage you to read
              their privacy policies before sharing any personal information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">Data About Providers</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              The provider information displayed on {SITE_NAME} (names, addresses, phone
              numbers, ratings, etc.) is collected from publicly available sources
              including Google, JustDial, Practo, and provider websites. If you are a
              provider and wish to update or remove your listing, please contact us.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">Contact Us</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              If you have questions about this privacy policy or wish to request changes
              to a listing, contact us at:
            </p>
            <a
              href="mailto:hello@happytails.in"
              className="inline-flex items-center gap-2 mt-2 text-sm text-bluey-primary font-semibold hover:underline"
            >
              <Mail className="w-4 h-4" /> hello@happytails.in
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
