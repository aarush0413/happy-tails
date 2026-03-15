import { PawPrint } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <PawPrint className="w-16 h-16 text-bluey-pale mb-6" />
      <h1 className="text-4xl font-black text-bluey-navy tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 text-bluey-navy/50 text-lg text-center max-w-md">
        Looks like this page wandered off. Let&apos;s get you back on track.
      </p>
      <div className="mt-6">
        <Button href="/" size="lg">
          Back to Home
        </Button>
      </div>
    </div>
  );
}
