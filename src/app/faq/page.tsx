import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, LAST_VERIFIED } from "@/lib/constants";

export const metadata: Metadata = {
  title: "FAQ — How we list providers & areas",
  description:
    "How Happy Tails covers Pune metro, map pins, phone numbers, reviews, trust badges, and verified vs placeholder listings.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

type FaqItem = {
  q: string;
  /** Plain text for FAQPage JSON-LD */
  schemaText: string;
  a: ReactNode;
};

const faqs: FaqItem[] = [
  {
    q: "What do the “areas” on Happy Tails mean?",
    schemaText:
      "We group Pune metro into clusters (for example Kothrud–Karve, Baner–Balewadi, Pimpri–Chinchwad). Each area has a map centre point on our site so you can explore what is roughly nearby. It is not a strict boundary—providers a little outside the label may still be relevant, and you should always use the full address before you drive.",
    a: (
      <>
        We group Pune metro into <strong>clusters</strong> (for example Kothrud–Karve, Baner–Balewadi,
        Pimpri–Chinchwad). Each area has a <strong>map centre point</strong> on our site so you can
        explore what&apos;s roughly nearby. It is <strong>not</strong> a strict boundary—providers a
        little outside the label may still be relevant, and you should always use the full address
        before you drive.
      </>
    ),
  },
  {
    q: "Why doesn’t the map pin sit exactly on the building?",
    schemaText:
      "Many listings only store an area-level location. In those cases the map places a pin near the area centre (and may use a small offset so pins do not stack). When we have exact coordinates for a provider, we use them—otherwise treat the pin as approximate and confirm on Google Maps or call ahead.",
    a: (
      <>
        Many listings only store an <strong>area-level</strong> location. In those cases the map
        places a pin near the <strong>area centre</strong> (and may use a small offset so pins
        don&apos;t stack). When we have exact coordinates for a provider, we use them—otherwise treat
        the pin as <strong>approximate</strong> and confirm on Google Maps or call ahead.
      </>
    ),
  },
  {
    q: "Why is there no phone number on some listings?",
    schemaText:
      "We only publish numbers we are confident about. Some businesses list contact only on Practo, JustDial, or WhatsApp; others change numbers often. If phone is blank, use the provider's Google Maps listing, Practo, or their website link on the detail page when we have one. A missing number here does not mean the business has no phone—it means we have not locked a verified number into our data yet.",
    a: (
      <>
        We only publish numbers we&apos;re confident about. Some businesses list contact only on
        Practo, JustDial, or WhatsApp; others change numbers often. If phone is blank, use the
        provider&apos;s <strong>Google Maps</strong> listing, <strong>Practo</strong>, or their website
        link on the detail page when we have one. A missing number here does not mean the business
        has no phone—it means we haven&apos;t locked a verified number into our data yet.
      </>
    ),
  },
  {
    q: "Are star ratings the same as your LEGIT / CAUTION / WEAK badges?",
    schemaText:
      "No. Stars on Google, Practo, or other apps are crowd averages and can differ a lot between platforms. Our badges are editorial verdicts: we read public reviews, news where relevant, and chain context, then label a listing LEGIT, CAUTION, WEAK, or BLACKLISTED. Always read the short summary and notes on the listing—not only the star number.",
    a: (
      <>
        <strong>No.</strong> Stars on Google, Practo, or other apps are crowd averages and can
        differ a lot between platforms. Our badges are <strong>editorial verdicts</strong>: we read
        public reviews, news where relevant, and chain context, then label a listing LEGIT, CAUTION,
        WEAK, or BLACKLISTED. Always read the short summary and notes on the listing—not only the
        star number.
      </>
    ),
  },
  {
    q: "Why can Google’s rating differ from Practo’s for the same clinic?",
    schemaText:
      "Different people review on different apps, and sample sizes differ. Chains sometimes show national or chain-wide review counts that do not reflect one branch. We flag that when we see it. Your safest move is to read recent reviews on the branch you plan to visit.",
    a: (
      <>
        Different people review on different apps, and sample sizes differ. Chains sometimes show
        <strong> national or chain-wide</strong> review counts that don&apos;t reflect one branch.
        We flag that when we see it. Your safest move is to read <strong>recent</strong> reviews on
        the <strong>branch</strong> you plan to visit.
      </>
    ),
  },
  {
    q: "What does “weak” or “not onboarded” mean?",
    schemaText:
      "Some rows are placeholders or have not passed our latest verification pass. We mark those WEAK and keep them off our fully onboarded set until we replace them with a Google Maps–verified name, address, and contact path. You should not rely on those entries for navigation until we update them.",
    a: (
      <>
        Some rows are <strong>placeholders</strong> or haven&apos;t passed our latest verification
        pass. We mark those <strong>WEAK</strong> and keep them off our “fully onboarded” set until
        we replace them with a <strong>Google Maps–verified</strong> name, address, and contact path.
        You should not rely on those entries for navigation until we update them.
      </>
    ),
  },
  {
    q: "How often is this information updated?",
    schemaText: `We show a “Data verified as of” date on the site (${LAST_VERIFIED}). Businesses change hands, staff, and phone numbers—always double-check hours and fees before you visit.`,
    a: (
      <>
        We show a <strong>“Data verified as of”</strong> date on the site ({LAST_VERIFIED}). Businesses
        change hands, staff, and phone numbers—always double-check hours and fees before you visit.
      </>
    ),
  },
  {
    q: "Is Happy Tails medical advice?",
    schemaText: `No. We are a directory and editorial guide, not a vet clinic. For emergencies use our Emergency page and seek professional care. Read our Medical disclaimer at ${SITE_URL}/disclaimer.`,
    a: (
      <>
        No. We&apos;re a directory and editorial guide, not a vet clinic. For emergencies use our{" "}
        <Link href="/emergency" className="text-primary font-medium underline underline-offset-2">
          Emergency
        </Link>{" "}
        page and seek professional care. Read our{" "}
        <Link href="/disclaimer" className="text-primary font-medium underline underline-offset-2">
          Medical disclaimer
        </Link>
        .
      </>
    ),
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.schemaText,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="font-display text-3xl font-bold text-neutral-900 tracking-tight">
        Frequently asked questions
      </h1>
      <p className="mt-3 text-neutral-600 text-sm leading-relaxed">
        How we cover Pune metro, maps, contact details, ratings, and trust labels. For our audit
        process, see{" "}
        <Link href="/about" className="text-primary font-medium underline underline-offset-2">
          About &amp; methodology
        </Link>
        .
      </p>

      <div className="mt-10 space-y-3">
        {faqs.map((item) => (
          <details
            key={item.q}
            className="group rounded-xl border border-neutral-200 bg-white px-4 py-3 open:shadow-sm"
          >
            <summary className="font-semibold text-neutral-900 cursor-pointer list-none flex items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
              <span>{item.q}</span>
              <span
                className="text-neutral-400 text-lg leading-none shrink-0 group-open:rotate-180 transition-transform"
                aria-hidden
              >
                ▾
              </span>
            </summary>
            <div className="mt-3 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
              {item.a}
            </div>
          </details>
        ))}
      </div>

      <p className="mt-10 text-sm text-neutral-500">
        <Link href="/" className="text-primary font-medium">
          Back to home
        </Link>
      </p>
    </div>
  );
}
