import { PlayCircle, FileText, AlignLeft, ClipboardList } from "lucide-react";

export default function LessonTypes() {
  const types = [
    {
      icon: PlayCircle,
      label: "Video",
      desc: "Upload and stream video lessons directly in the platform.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: FileText,
      label: "Document",
      desc: "Share PDFs and documents with an inline viewer — no downloads needed.",
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      icon: AlignLeft,
      label: "Text",
      desc: "Write rich, formatted lessons with markdown — headings, code, lists, and more.",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: ClipboardList,
      label: "Quiz",
      desc: "Multiple choice quizzes with a passing score, shuffle mode, and instant results.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
  ];

  return (
    <section className="py-24 px-4 md:px-8 bg-background">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col gap-3 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Content types
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground leading-tight">
            Four ways to
            <br />
            <span className="text-primary">deliver knowledge.</span>
          </h2>
          <p className="text-base text-foreground-muted leading-relaxed">
            Every lesson type is purpose-built. Mix and match within a single
            course to keep learners engaged.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {types.map(({ icon: Icon, label, desc, color, bg }) => (
            <div
              key={label}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
            >
              <div
                className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
              >
                <Icon size={18} className={color} />
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-bold text-foreground">{label}</p>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
