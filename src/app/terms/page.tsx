import { Metadata } from "next";
import { PawPrint, FileText, Mail } from "lucide-react";
import { SITE_NAME, LAST_VERIFIED } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `${SITE_NAME} terms of service. Understand the terms and conditions for using our pet services directory.`,
};

export default function TermsPage() {
  return (
    <div>
      <section className="bg-gradient-to-b from-bluey-ice to-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-bluey-primary/10 rounded-full px-4 py-2 mb-6">
            <FileText className="w-4 h-4 text-bluey-primary" />
            <span className="text-sm font-semibold text-bluey-primary">Legal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-bluey-navy tracking-tight leading-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-bluey-navy/60 text-sm">
            Last updated: {LAST_VERIFIED}
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-bluey max-w-none space-y-8">
          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">1. About This Directory</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              {SITE_NAME} is an informational directory of pet service providers in East
              Pune. We aggregate publicly available information to help pet owners find
              vets, groomers, boarding facilities, and other pet services. {SITE_NAME}{" "}
              does not provide veterinary advice, medical diagnoses, or pet care services
              directly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">2. No Guarantee of Provider Quality</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              While we conduct editorial review audits and publish trust verdicts (LEGIT,
              CAUTION, WEAK, etc.), these are based on publicly available reviews and our
              own assessment criteria. They do not constitute an endorsement, warranty, or
              guarantee of any provider&apos;s quality, safety, or reliability. You should
              always exercise your own judgment when choosing a provider for your pet.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">3. Emergency Disclaimer</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              The emergency information on {SITE_NAME} is provided for convenience only.
              In a life-threatening pet emergency, call the national emergency number
              (112) or go directly to the nearest veterinary hospital. We do not guarantee
              that any listed clinic will be available, open, or able to treat your pet at
              any given time. Always call ahead to confirm availability.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">4. Data Accuracy</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              We make reasonable efforts to keep provider information (phone numbers,
              addresses, hours, pricing) accurate and up to date. However, this
              information can change without notice. Prices shown are approximate and may
              not reflect current rates. &ldquo;Contact for pricing&rdquo; indicates that
              pricing varies by service. We recommend calling the provider directly to
              confirm details before visiting.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">5. Third-Party Services</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              {SITE_NAME} contains links to third-party websites and services (Google
              Maps, JustDial, Lybrate, provider websites, etc.). We are not responsible
              for the content, availability, or practices of these external services.
              Your use of third-party services is governed by their own terms and
              conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">6. Limitation of Liability</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              {SITE_NAME} is provided &ldquo;as is&rdquo; without warranties of any kind.
              To the fullest extent permitted by law, we shall not be liable for any
              damages arising from your use of the directory, reliance on provider
              information, or interactions with listed providers. This includes but is
              not limited to damages related to pet health, financial loss, or
              inconvenience.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">7. Intellectual Property</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              The {SITE_NAME} name, logo, design, audit verdicts, and editorial content
              are our intellectual property. Provider information is sourced from public
              data. You may share links to {SITE_NAME} pages but may not scrape, copy, or
              republish our content without permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">8. Changes to These Terms</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              We may update these terms from time to time. The &ldquo;Last updated&rdquo;
              date at the top of this page reflects the most recent revision. Continued
              use of the site after changes constitutes acceptance of the updated terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-bluey-navy mb-3">9. Contact</h2>
            <p className="text-sm text-bluey-navy/70 leading-relaxed">
              For questions about these terms, contact us at:
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
