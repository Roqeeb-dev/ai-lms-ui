"use client";

type LoadingScreenProps = {
  text?: string;
};

export default function LoadingScreen({
  text = "Loading, please wait...",
}: LoadingScreenProps) {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner with orbiting dot */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-border" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-foreground">{text}</p>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-foreground-muted animate-bounce"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
