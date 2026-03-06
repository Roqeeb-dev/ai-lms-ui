export default function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-1 pb-4 border-b border-border-subtle">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-foreground-muted">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}
