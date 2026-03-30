import { Skeleton } from "./Skeleton";

const CourseCardSkeleton = () => {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Thumbnail */}
      <Skeleton className="w-full aspect-video rounded-none" />

      <div className="flex flex-col gap-3 p-4">
        {/* Category + status badge row */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        {/* Title + description */}
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-1 pt-1 border-t border-border/50">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-full shrink-0" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
