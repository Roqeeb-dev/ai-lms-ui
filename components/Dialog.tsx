"use client";

import { X } from "lucide-react";
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

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog box */}
      <div
        className={`relative w-full max-w-md rounded-lg border ${borderColor} ${bgColor} p-6 shadow-lg flex flex-col gap-4`}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-foreground-muted hover:text-foreground transition-colors"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className={`text-lg font-bold ${textColor}`}>{title}</h2>

        {/* Message */}
        <p className={`text-sm ${textColor} leading-relaxed`}>{message}</p>

        {/* Action buttons */}
        {type === "confirm" ? (
          <div className="mt-4 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-lg px-5 py-2 text-sm font-normal bg-gray-300 text-gray-800 hover:bg-gray-400 transition-all duration-200"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm?.();
                onClose();
              }}
              className="rounded-lg px-5 py-2 text-sm font-normal bg-primary text-primary-foreground hover:bg-primary-hover transition-all duration-200"
            >
              {confirmText}
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className={`mt-4 self-end rounded-lg px-5 py-2 text-sm font-normal ${
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
    </div>,
    document.body,
  );
}
