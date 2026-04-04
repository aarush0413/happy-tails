"use client";

import { cn } from "@/lib/cn";
import { trustVerdictLabel, trustVerdictStyles } from "@/lib/constants";
import type { TrustVerdict } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TrustBadge({
  verdict,
  summary,
  className,
  /** When set (e.g. outings LEGIT), overrides the verdict text on the pill */
  verdictLabelOverride,
}: {
  verdict: TrustVerdict;
  summary?: string;
  className?: string;
  verdictLabelOverride?: string;
}) {
  const pill = (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide",
        trustVerdictStyles(verdict),
        className
      )}
    >
      {verdictLabelOverride ?? trustVerdictLabel(verdict)}
    </span>
  );

  if (!summary) return pill;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{pill}</TooltipTrigger>
        <TooltipContent className="max-w-xs text-sm" side="top">
          {summary}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
