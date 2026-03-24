"use client";

import { X, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  type?: "success" | "error" | "confirm";
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => Promise<void>;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
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
  loading = false,
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
      {/* Overlay — disabled during loading so user can't close by clicking outside */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={loading ? undefined : onClose}
      />

      <div className="relative w-full max-w-sm bg-card border border-border rounded-xl shadow-xl flex flex-col gap-4 p-5">
        {/* Close — hidden during loading */}
        {!loading && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-foreground-muted hover:text-foreground transition-colors"
          >
            <X size={15} />
          </button>
        )}

        {/* Icon + Title */}
        <div className="flex items-center gap-2.5 pr-6">
          {loading ? (
            <Loader2 size={18} className="text-foreground-muted animate-spin" />
          ) : (
            icon
          )}
          <h2 className="text-sm font-semibold text-foreground">
            {loading ? "Please wait..." : title}
          </h2>
        </div>

        {/* Message */}
        <p className="text-xs text-foreground-muted leading-relaxed">
          {loading ? "This won't take long." : message}
        </p>

        {/* Actions */}
        {type === "confirm" ? (
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={onClose}
              disabled={loading}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-border bg-background text-foreground hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cancelText}
            </button>
            <button
              onClick={async () => {
                await onConfirm?.();
              }}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-destructive text-white hover:bg-destructive/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Please wait...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-end pt-1">
            <button
              onClick={onClose}
              disabled={loading}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
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
