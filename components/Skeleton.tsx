import clsx from "clsx";

type SkeletonProps = {
  className?: string;
};

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-md bg-muted",
        "after:absolute after:inset-0",
        "after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent",
        "after:animate-[shimmer_1.6s_ease-in-out_infinite]",
        className,
      )}
    />
  );
};

export { Skeleton };
