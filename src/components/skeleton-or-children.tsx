export function SkeletonOrChildren({
  className = "",
  children,
  showSkeleton,
}: React.PropsWithChildren<{ className?: string; showSkeleton: boolean }>) {
  return showSkeleton ? (
    <div
      role="status"
      className={`h-2.5 shadow animate-pulse rounded-full bg-gray-700 w-24 ${className}`}
    />
  ) : (
    <>{children}</>
  );
}
