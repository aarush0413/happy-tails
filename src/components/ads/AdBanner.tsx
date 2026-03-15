"use client";

interface AdBannerProps {
  slot?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  className?: string;
}

export function AdBanner({ slot = "XXXXXXXXXX", format = "horizontal", className = "" }: AdBannerProps) {
  const heightMap = {
    horizontal: "h-[90px]",
    rectangle: "h-[250px]",
    vertical: "h-[600px]",
  };

  return (
    <div
      className={`w-full ${heightMap[format]} bg-bluey-ice/30 rounded-xl border border-dashed border-bluey-pale flex items-center justify-center ${className}`}
    >
      <p className="text-xs text-bluey-navy/30 font-medium">
        Ad Space &middot; Google AdSense
      </p>
    </div>
  );
}
