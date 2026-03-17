import { Skeleton, ProviderCardSkeleton } from "@/components/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[#0A2463] to-bluey-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-4 w-32 mb-4 bg-white/10" />
          <Skeleton className="h-10 w-64 mb-3 bg-white/10" />
          <Skeleton className="h-5 w-96 mb-2 bg-white/10" />
          <Skeleton className="h-4 w-48 bg-white/10" />
          <div className="mt-6 flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-28 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProviderCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
