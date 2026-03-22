"use client";

import { X, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  type?: "success" | "error" | "confirm";
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export default function Dialog({
  open,
  type = "success",
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Yes",
  cancelText = "Cancel",
}: DialogProps) {
  if (!open) return null;

  const icon =
    type === "success" ? (
      <CheckCircle size={18} className="text-emerald-500" />
    ) : type === "error" ? (
      <XCircle size={18} className="text-destructive" />
    ) : (
      <AlertTriangle size={18} className="text-amber-500" />
    );

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-sm bg-card border border-border rounded-xl shadow-xl flex flex-col gap-4 p-5">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground-muted hover:text-foreground transition-colors"
        >
          <X size={15} />
        </button>

        {/* Icon + Title */}
        <div className="flex items-center gap-2.5 pr-6">
          {icon}
          <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        </div>

        {/* Message */}
        <p className="text-xs text-foreground-muted leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        {type === "confirm" ? (
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-destructive text-white hover:bg-destructive/90 transition-colors"
            >
              {confirmText}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end pt-1">
            <button
              onClick={onClose}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                type === "success"
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-destructive text-white hover:bg-destructive/90"
              }`}
            >
              OK
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
