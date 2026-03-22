export function StudentFooter({
  instructorName,
  enrolled,
}: {
  instructorName: string;
  enrolled: boolean;
}) {
  return (
    <>
      <span className="text-xs text-foreground-muted">{instructorName}</span>
      <button
        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-200 ${
          enrolled
            ? "bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
            : "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
        }`}
      >
        {enrolled ? "Continue" : "Enroll"}
      </button>
    </>
  );
}
