import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#0A2463] to-bluey-white py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PawPrint className="w-14 h-14 text-white/20 mx-auto mb-6" />
          <h1 className="font-display text-4xl sm:text-5xl font-semibold text-white tracking-tight">
            Page not found
          </h1>
          <p className="mt-4 text-white/40 text-sm max-w-md mx-auto">
            Looks like this page wandered off. Let&apos;s get you back on track.
          </p>
          <div className="mt-8">
            <Button href="/" variant="luxury" size="lg">
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
