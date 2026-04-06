"use client";

import { useState } from "react";
import Dialog from "./Dialog";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function DangerSection() {
  const [isDialogShown, setIsDialogShown] = useState(false);
  const { deleting, deleteAccount } = useUser();
  const router = useRouter();

  async function handleDelete() {
    try {
      await deleteAccount();
      router.replace("/register");
    } catch {
      // error toast is already handled in the hook, just don't redirect
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-destructive/30 bg-card p-5 shadow-sm">
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

        <button
          onClick={() => setIsDialogShown(true)}
          className="shrink-0 px-3 py-1.5 rounded-lg border border-destructive/40 text-destructive text-sm font-semibold hover:bg-destructive hover:text-destructive-foreground active:scale-95 active:brightness-95 active:shadow-sm transition-all duration-200"
        >
          Delete account
        </button>
      </div>

      <Dialog
        type="confirm"
        open={isDialogShown}
        onClose={() => setIsDialogShown(false)}
        title="Delete Account?"
        message="Are you sure you want to delete your account?"
        confirmText="Yes, Delete my account"
        cancelText="No, don't delete"
        onConfirm={handleDelete}
        loading={deleting}
      />
    </div>
  );
}
