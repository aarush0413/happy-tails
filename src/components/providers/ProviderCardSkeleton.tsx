export function ProviderCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-bluey-pale/60 p-6 h-full animate-pulse">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="h-5 bg-bluey-pale/40 rounded-lg w-3/4 mb-2" />
          <div className="h-3 bg-bluey-pale/30 rounded w-1/2" />
        </div>
        <div className="h-7 w-14 bg-bluey-pale/30 rounded-lg" />
      </div>
      <div className="flex gap-1.5 mb-3">
        <div className="h-5 w-20 bg-bluey-pale/30 rounded-full" />
        <div className="h-5 w-16 bg-bluey-pale/30 rounded-full" />
      </div>
      <div className="h-3 bg-bluey-pale/20 rounded w-full mb-2" />
      <div className="h-8 bg-bluey-pale/30 rounded-lg w-24 mb-3" />
      <div className="h-3 bg-bluey-pale/20 rounded w-full mb-1" />
      <div className="h-3 bg-bluey-pale/20 rounded w-2/3 mb-3" />
      <div className="border-t border-bluey-pale/60 pt-3 flex gap-4">
        <div className="h-3 w-24 bg-bluey-pale/20 rounded" />
        <div className="h-3 w-20 bg-bluey-pale/20 rounded" />
      </div>
    </div>
  );
}

export function ProviderCardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProviderCardSkeleton key={i} />
      ))}
    </div>
  );
}
