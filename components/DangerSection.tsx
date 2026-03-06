"use client";

import { useState } from "react";

export default function DangerSection() {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-destructive/30 bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-1 pb-4 border-b border-border-subtle">
        <h2 className="text-sm font-bold text-destructive uppercase tracking-widest">
          Danger Zone
        </h2>
        <p className="text-xs text-foreground-muted">
          These actions are permanent and cannot be undone.
        </p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium text-foreground">
            Delete account
          </span>
          <span className="text-xs text-foreground-muted">
            Permanently delete your account and all associated data.
          </span>
        </div>
        {!confirming ? (
          <button
            onClick={() => setConfirming(true)}
            className="shrink-0 px-4 py-2 rounded-lg border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
          >
            Delete account
          </button>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setConfirming(false)}
              className="px-4 py-2 rounded-lg border border-border text-sm font-semibold text-foreground-muted hover:text-foreground transition-all duration-200"
            >
              Cancel
            </button>
            <button className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition-all duration-200">
              Confirm delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
