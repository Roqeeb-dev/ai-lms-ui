export default function SocialProofBar() {
  const tags = [
    "Web Development",
    "Data Science",
    "Design",
    "Business",
    "Language",
    "Photography",
    "Marketing",
    "Engineering",
    "Finance",
    "Music",
  ];

  return (
    <div className="border-y border-border bg-card py-4 overflow-hidden">
      <div className="flex items-center gap-3 mb-3 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="h-px flex-1 bg-border" />
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground-muted shrink-0">
          Built for every subject
        </p>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="overflow-hidden w-full px-4 md:px-8">
        <div className="flex gap-3 animate-marquee whitespace-nowrap">
          {[...tags, ...tags].map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center px-3 py-1.5 rounded-full border border-border bg-background text-xs font-semibold text-foreground-muted shrink-0"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
