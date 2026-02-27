export default function OptionCard({
  icon,
  label,
  description,
  selected,
  onClick,
}: {
  icon?: string;
  label: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left w-full transition-all duration-200
        ${
          selected
            ? "border-primary bg-primary/10"
            : "border-border bg-card hover:border-primary/50 hover:bg-muted"
        }`}
    >
      {icon && <span className="text-xl shrink-0">{icon}</span>}
      <div className="flex flex-col flex-1">
        <span className="text-sm font-semibold text-foreground">{label}</span>
        {description && (
          <span className="text-xs text-foreground-muted">{description}</span>
        )}
      </div>
      <div
        className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all duration-200
        ${selected ? "border-primary bg-primary" : "border-border"}`}
      />
    </button>
  );
}
