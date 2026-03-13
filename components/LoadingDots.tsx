export function LoadingDots({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {text}
      <span className="inline-flex gap-0.5 ml-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full bg-current animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </span>
  );
}
