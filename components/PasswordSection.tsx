"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Eye, EyeOff } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import SectionCard from "./SectionCard";
import { useUser } from "@/hooks/useUser";

export default function PasswordSection() {
  const router = useRouter();
  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const { values, update, reset } = useForm({
    current: "",
    new: "",
    confirm: "",
  });
  const [saved, setSaved] = useState(false);
  const { changePassword, changing, logoutUser } = useUser();

  const matches = values.confirm === "" || values.new === values.confirm;

  const labelClass =
    "text-xs font-semibold tracking-widest uppercase text-foreground-muted";
  const inputClass =
    "w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200";

  async function handleSave() {
    try {
      await changePassword({
        password: values.current,
        passwordUpdate: values.new,
      });

      setSaved(true);
      reset();

      setTimeout(async () => {
        await logoutUser();
        router.push("/login");
      }, 1500);
    } catch {
      // errors are already handled (toast) in the hook
    }
  }

  return (
    <SectionCard
      title="Change Password"
      description="Choose a strong password you haven't used before."
    >
      <div className="flex flex-col gap-4">
        {(["current", "new", "confirm"] as const).map((field) => (
          <div key={field} className="flex flex-col gap-1.5">
            <label className={labelClass}>
              {field === "current"
                ? "Current Password"
                : field === "new"
                  ? "New Password"
                  : "Confirm New Password"}
            </label>
            <div className="relative">
              <input
                type={show[field] ? "text" : "password"}
                value={values[field]}
                onChange={(e) => update(field, e.target.value)}
                placeholder="••••••••"
                className={`${inputClass} pr-11 ${
                  field === "confirm" && !matches
                    ? "border-destructive focus:ring-destructive"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() =>
                  setShow((prev) => ({ ...prev, [field]: !prev[field] }))
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground transition-colors"
              >
                {show[field] ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {field === "confirm" && !matches && (
              <p className="text-xs text-destructive">
                Passwords do not match.
              </p>
            )}
          </div>
        ))}

        <button
          onClick={handleSave}
          disabled={
            !matches || !values.current || !values.new || changing || saved
          }
          className="self-start flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-40 disabled:pointer-events-none"
        >
          {saved ? (
            <>
              <Check size={14} /> Saved — logging you out…
            </>
          ) : changing ? (
            "Updating…"
          ) : (
            "Update password"
          )}
        </button>
      </div>
    </SectionCard>
  );
}
