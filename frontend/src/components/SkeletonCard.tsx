const SkeletonCard = () => (
  <div className="flex-shrink-0 w-32 animate-pulse">
    <div className="aspect-[3/4] rounded-2xl bg-muted" />
    <div className="mt-2 h-3 bg-muted rounded w-3/4" />
    <div className="mt-1 h-2 bg-muted rounded w-1/2" />
  </div>
);

export const SkeletonRow = () => (
  <div className="flex items-center gap-3 py-3 animate-pulse">
    <div className="w-10 h-10 rounded-2xl bg-muted" />
    <div className="flex-1">
      <div className="h-3 bg-muted rounded w-3/4 mb-2" />
      <div className="h-2 bg-muted rounded w-1/2" />
    </div>
    <div className="h-2 bg-muted rounded w-16" />
  </div>
);

export default SkeletonCard;
