"use client";

import { useState, useEffect, useRef } from "react";
import { useUserStore } from "@/store/useUserStore";
import { useForm } from "@/hooks/useForm";
import { useUser } from "@/hooks/useUser";
import { Pencil, X, Check, Loader2, Lock, Camera } from "lucide-react";
import Image from "next/image";

type ProfilePic = {
  url: string;
  public_id: string;
} | null;

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  bio: string;
};

export default function ProfileClient() {
  const user = useUserStore((state) => state.user);
  const { updateProfile, updatingProfile } = useUser();
  const [editing, setEditing] = useState(false);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { values, update, reset, setAll } = useForm<ProfileFormValues>({
    firstName: "",
    lastName: "",
    bio: "",
  });

  useEffect(() => {
    if (!user) return;
    const [firstName, ...rest] = user.name.split(" ");
    setAll({
      firstName: firstName ?? "",
      lastName: rest.join(" ") ?? "",
      bio: user.bio ?? "",
    });
  }, [user]);

  if (!user)
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-foreground-muted">No user session found.</p>
      </div>
    );

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarSrc = profilePicPreview ?? user.profilePic?.url ?? null;

  function handlePicChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfilePic(file);
    setProfilePicPreview(URL.createObjectURL(file));
  }

  async function handleSave() {
    const fullName = `${values.firstName} ${values.lastName}`.trim();
    try {
      await updateProfile({
        name: fullName,
        bio: values.bio,
        ...(profilePic && { profilePic }),
      });
      setEditing(false);
      setProfilePic(null);
    } catch {}
  }

  function handleCancel() {
    reset();
    setEditing(false);
    setProfilePic(null);
    setProfilePicPreview(null);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-input-focus transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";
  const labelClass =
    "text-xs font-semibold tracking-widest uppercase text-foreground-muted";

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Profile
          </h1>
          <p className="text-sm text-foreground-muted">
            Manage your personal information.
          </p>
        </div>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-all duration-200"
          >
            <Pencil size={14} /> Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              disabled={updatingProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-card text-sm font-semibold text-foreground-muted hover:text-foreground transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={14} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={updatingProfile}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {updatingProfile ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check size={14} /> Save
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Avatar + identity */}
      <div className="flex items-center gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
        {/* Avatar with upload overlay */}
        <div className="relative shrink-0 group">
          <div className="w-14 h-14 rounded-full overflow-hidden bg-primary flex items-center justify-center text-lg font-extrabold text-primary-foreground">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={user.name}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            ) : (
              initials
            )}
          </div>

          {/* Camera overlay — only shown when editing */}
          {editing && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Change profile picture"
            >
              <Camera size={16} className="text-white" />
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePicChange}
          />
        </div>

        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-bold text-foreground">{user.name}</p>
            <span className="shrink-0 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-0.5 capitalize">
              {user.role}
            </span>
          </div>
          <p className="text-sm text-foreground-muted">{user.email}</p>
          {user.bio && (
            <p className="text-xs text-foreground-muted leading-relaxed truncate">
              {user.bio}
            </p>
          )}
          {/* Selected file name hint */}
          {editing && profilePic && (
            <p className="text-xs text-primary mt-0.5 truncate">
              {profilePic.name}
            </p>
          )}
        </div>
      </div>

      {/* Editable fields */}
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-widest">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>First Name</label>
            <input
              value={values.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              disabled={!editing}
              autoComplete="given-name"
              placeholder="Ada"
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className={labelClass}>Last Name</label>
            <input
              value={values.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              disabled={!editing}
              autoComplete="family-name"
              placeholder="Lovelace"
              className={inputClass}
            />
          </div>

          {/* Email — read only */}
          <div className="flex flex-col gap-1.5 lg:col-span-2">
            <div className="flex items-center gap-1.5">
              <label className={labelClass}>Email</label>
              <Lock size={10} className="text-foreground-muted" />
            </div>
            <input
              type="email"
              value={user.email}
              disabled
              className={inputClass}
            />
            <p className="text-xs text-foreground-muted">
              Email cannot be changed. Contact support if you need to update it.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 lg:col-span-2">
            <label className={labelClass}>Bio</label>
            <textarea
              value={values.bio}
              onChange={(e) => update("bio", e.target.value)}
              disabled={!editing}
              placeholder="Tell us a little about yourself..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Read-only account info */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
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
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
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
