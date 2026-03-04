"use client";

import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useForm } from "@/hooks/useForm";
import { Pencil, X, Check } from "lucide-react";
import type { SessionUser } from "@/types/user";

type ProfileForm = {
  fullname: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    bio: string;
  };
};

export default function ProfileClient() {
  const user = useUserStore((state) => state.user);
  const updateUserDetails = useUserStore((state) => state.setUser);
  const { values, update, reset } = useForm<ProfileForm>({
    fullname: user?.fullname ?? "",
    email: user?.email ?? "",
    profile: {
      firstName: user?.profile?.firstName ?? "",
      lastName: user?.profile?.lastName ?? "",
      bio: user?.profile?.bio ?? "",
    },
  });

  const [editing, setEditing] = useState(false);

  if (!user)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-foreground-muted">No user session found.</p>
      </div>
    );

  const initials = user.fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleSave() {
    updateUserDetails({
      fullname: values.fullname,
      email: values.email,
      profile: {
        firstName: values.profile.firstName,
        lastName: values.profile.lastName || undefined,
        bio: values.profile.bio || undefined,
      },
    });
    setEditing(false);
  }

  function handleCancel() {
    if (!user) return;
    reset();
    setEditing(false);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";
  const labelClass =
    "text-xs font-semibold tracking-widest uppercase text-foreground-muted";

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Profile
          </h1>
          <p className="text-sm text-foreground-muted">
            Manage your personal information.
          </p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-200"
          >
            <Pencil size={14} /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-sm font-semibold text-foreground-muted hover:text-foreground transition-all duration-200"
            >
              <X size={14} /> Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover active:scale-[0.98] transition-all duration-200 shadow-sm"
            >
              <Check size={14} /> Save
            </button>
          </div>
        )}
      </div>

      {/* Avatar + identity */}
      <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-extrabold text-primary-foreground shrink-0">
          {initials}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold text-foreground">{user.fullname}</p>
          <p className="text-sm text-foreground-muted">{user.email}</p>
          <span className="self-start mt-1 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 capitalize">
            {user.role}
          </span>
        </div>
      </div>

      {/* Editable fields */}
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>First Name</label>
            <input
              name="firstName"
              value={values.profile.firstName}
              onChange={(e) =>
                update("profile", {
                  ...values.profile,
                  firstName: e.target.value,
                })
              }
              disabled={!editing}
              placeholder="Ada"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Last Name</label>
            <input
              name="lastName"
              value={values.profile.lastName}
              onChange={(e) =>
                update("profile", {
                  ...values.profile,
                  lastName: e.target.value,
                })
              }
              disabled={!editing}
              placeholder="Lovelace"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5 lg:col-span-2">
            <label className={labelClass}>Display Name</label>
            <input
              name="fullname"
              value={values.fullname}
              onChange={(e) => update("fullname", e.target.value)}
              disabled={!editing}
              placeholder="Ada Lovelace"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5 lg:col-span-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={!editing}
              placeholder="ada@cognify.com"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5 lg:col-span-2">
            <label className={labelClass}>Bio</label>
            <textarea
              name="bio"
              value={values.profile.bio}
              onChange={(e) =>
                update("profile", {
                  ...values.profile,
                  bio: e.target.value,
                })
              }
              disabled={!editing}
              placeholder="Tell us a little about yourself..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Read-only account info */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Account
        </h2>
        <div className="flex flex-col">
          {[
            { label: "User ID", value: user.id },
            { label: "Role", value: user.role },
            {
              label: "Member since",
              value: new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 border-b border-border-subtle last:border-0"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-foreground-muted">
                {label}
              </span>
              <span className="text-sm text-foreground font-medium capitalize">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
