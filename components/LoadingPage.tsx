"use client";

type LoadingScreenProps = {
  text?: string;
};

export default function LoadingScreen({
  text = "Loading, please wait...",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary"></div>

        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      </div>
    </div>
  );
}
