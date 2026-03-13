"use client";

import { X } from "lucide-react";

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

  const bgColor =
    type === "success"
      ? "bg-green-50"
      : type === "error"
        ? "bg-red-50"
        : "bg-gray-50";
  const borderColor =
    type === "success"
      ? "border-green-200"
      : type === "error"
        ? "border-red-200"
        : "border-gray-200";
  const textColor =
    type === "success"
      ? "text-green-800"
      : type === "error"
        ? "text-red-800"
        : "text-gray-800";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog box */}
      <div
        className={`relative max-w-sm w-full rounded-lg border ${borderColor} ${bgColor} p-6 shadow-lg flex flex-col gap-3`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-foreground-muted hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>

        {/* Title */}
        <h2 className={`text-lg font-bold ${textColor}`}>{title}</h2>

        {/* Message */}
        <p className={`text-sm ${textColor} leading-relaxed`}>{message}</p>

        {/* Action buttons */}
        {type === "confirm" ? (
          <div className="mt-4 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all duration-200"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className="rounded-lg px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary-hover transition-all duration-200"
            >
              {confirmText}
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className={`mt-2 self-end rounded-lg px-4 py-2 text-sm font-semibold ${
              type === "success"
                ? "bg-green-600 text-white hover:bg-green-700"
                : type === "error"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-600 text-white hover:bg-gray-700"
            } transition-all duration-200`}
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
}
