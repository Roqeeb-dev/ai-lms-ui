type Quiz = {
  id: string;
  title: string;
  course: string;
  questions: number;
  duration: string;
  status: "not_started" | "in_progress" | "completed";
  score?: number;
};

export default function QuizCard({ quiz }: { quiz: Quiz }) {
  const statusStyles = {
    completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    in_progress: "bg-blue-50 text-blue-700 border-blue-200",
    not_started: "bg-amber-50 text-amber-700 border-amber-200",
  };

  const actionText =
    quiz.status === "not_started"
      ? "Start Quiz"
      : quiz.status === "in_progress"
        ? "Continue Quiz"
        : "Retake Quiz";

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-200">
      {/* Top Content */}
      <div className="flex flex-col gap-3">
        {/* Title */}
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-foreground">
            {quiz.title}
          </h2>
          <p className="text-xs text-foreground-muted">{quiz.course}</p>
        </div>

        {/* Meta Pills */}
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted text-foreground-muted">
            {quiz.questions} questions
          </span>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-muted text-foreground-muted">
            {quiz.duration}
          </span>
        </div>

        {/* Status + Score */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[11px] font-semibold px-3 py-1 rounded-full border capitalize ${statusStyles[quiz.status]}`}
          >
            {quiz.status.replace("_", " ")}
          </span>

          {quiz.score !== undefined && (
            <span className="text-sm font-semibold text-foreground">
              {quiz.score}%
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <button className="mt-5 w-full rounded-lg bg-primary text-primary-foreground py-2 text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm">
        {actionText}
      </button>
    </div>
  );
}
