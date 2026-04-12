import { Skeleton } from "./Skeleton";

export function DiscussionSkeleton() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-background">
      <div className="flex items-center gap-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  );
}
