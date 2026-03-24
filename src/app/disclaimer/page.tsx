import { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Medical disclaimer",
  description: "Happy Tails is not a substitute for veterinary care.",
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-neutral">
      <h1 className="font-display text-3xl font-bold text-neutral-900">Medical disclaimer</h1>
      <p>
        Happy Tails provides editorial information and provider listings. We are{" "}
        <strong>not veterinarians</strong>, and nothing on this site is medical advice.
      </p>
      <p>
        In an emergency, call a qualified veterinary clinic or emergency line immediately. If a
        human life is at risk, dial <strong>112</strong>.
      </p>
      <p>
        Trust verdicts reflect our research at the time of publication; providers can change
        ownership, staff, or standards. Always confirm details directly with the clinic.
      </p>
      <p>
        <Link href="/" className="text-primary font-medium">
          Back to home
        </Link>
      </p>
    </div>
  );
}
