"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { Toast as ToastType } from "@/store/useToastStore";

interface Props {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const config = {
  success: {
    icon: CheckCircle,
    containerClass: "bg-card border-emerald-500/30 shadow-emerald-500/10",
    iconClass: "text-emerald-500",
    barClass: "bg-emerald-500",
  },
  error: {
    icon: XCircle,
    containerClass: "bg-card border-destructive/30 shadow-destructive/10",
    iconClass: "text-destructive",
    barClass: "bg-destructive",
  },
  info: {
    icon: Info,
    containerClass: "bg-card border-primary/30 shadow-primary/10",
    iconClass: "text-primary",
    barClass: "bg-primary",
  },
};

const DURATION = 4000;

export default function Toast({ toast, onRemove }: Props) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const {
    icon: Icon,
    containerClass,
    iconClass,
    barClass,
  } = config[toast.type];

  useEffect(() => {
    const enterTimer = setTimeout(() => setVisible(true), 10);

    const leaveTimer = setTimeout(() => {
      setLeaving(true);
    }, DURATION - 400);

    const removeTimer = setTimeout(() => {
      onRemove(toast.id);
    }, DURATION);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, [toast.id, onRemove]);

  function handleDismiss() {
    setLeaving(true);
    setTimeout(() => onRemove(toast.id), 400);
  }

  return (
    <div
      className={`relative w-80 rounded-xl border shadow-lg overflow-hidden transition-all duration-400 ease-out
        ${containerClass}
        ${
          visible && !leaving
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <Icon size={16} className={`shrink-0 mt-0.5 ${iconClass}`} />
        <p className="text-xs font-medium text-foreground flex-1 leading-relaxed">
          {toast.message}
        </p>
        <button
          onClick={handleDismiss}
          className="shrink-0 text-foreground-muted hover:text-foreground transition-colors mt-0.5"
        >
          <X size={13} />
        </button>
      </div>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 ${barClass}`}
        style={{
          animation: `shrink ${DURATION}ms linear forwards`,
        }}
      />

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
