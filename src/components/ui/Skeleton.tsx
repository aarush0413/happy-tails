interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-bluey-pale/30 rounded-lg ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProviderCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full" aria-hidden="true">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
        <Skeleton className="h-5 w-12" />
      </div>
      <div className="flex gap-1.5 mb-3">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-4 w-28 mb-3" />
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-3/4" />
      <div className="flex gap-4 pt-3 mt-3 border-t border-bluey-pale/30">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}
