"use client";

import { useState } from "react";
import {
  auth,
  RegisterPayload,
  LoginPayload,
  UpdateProfilePayload,
} from "@/services/authService";
import { useUserStore } from "@/store/useUserStore";
import { useToastStore } from "@/store/useToastStore";

function getErrorMessage(err: any): string {
  return (
    err?.response?.data?.error ||
    err?.response?.data?.message ||
    err?.message ||
    "Something went wrong"
  );
}

export function useUser() {
  const { user, setUser, clearUser } = useUserStore();
  const { addToast } = useToastStore();

  const [registering, setRegistering] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendingVerification, setResendingVerification] = useState(false);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function registerUser(data: RegisterPayload) {
    setRegistering(true);
    setError(null);
    try {
      const res = await auth.register(data);
      setUser(res.user);
      addToast("Account created successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setRegistering(false);
    }
  }

  async function loginUser(data: LoginPayload) {
    setLoggingIn(true);
    setError(null);
    try {
      const res = await auth.login(data);
      setUser(res.user);
      addToast(`Welcome back, ${res.user.name.split(" ")[0]}!`, "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setLoggingIn(false);
    }
  }

  async function logoutUser() {
    setLoggingOut(true);
    setError(null);
    try {
      await auth.logout();
      clearUser();
      addToast("You've been logged out.", "success");
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setLoggingOut(false);
    }
  }

  async function checkUser() {
    setFetching(true);
    setError(null);
    try {
      const res = await auth.checkUser();
      setUser(res.user);
      return res.user;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      throw new Error(message);
    } finally {
      setFetching(false);
    }
  }

  async function verifyEmail(token: string) {
    setVerifying(true);
    setError(null);
    try {
      const res = await auth.verifyEmail({ token });
      setUser(res.user);
      addToast("Email verified successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setVerifying(false);
    }
  }

  async function resendVerification(email: string) {
    setResendingVerification(true);
    setError(null);
    try {
      const res = await auth.resetVerification({ email });
      addToast("Verification email sent!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setResendingVerification(false);
    }
  }

  async function updateProfile(data: UpdateProfilePayload) {
    setUpdatingProfile(true);
    setError(null);

    try {
      const res = await auth.updateProfile(data);
      setUser(res.data);
      addToast("Profile updated successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setUpdatingProfile(false);
    }
  }

  async function forgotPassword(email: string) {
    setSendingReset(true);
    setError(null);
    try {
      const res = await auth.forgotPassword({ email });
      addToast("Password reset email sent!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setSendingReset(false);
    }
  }

  async function resetPassword(token: string, password: string) {
    setResettingPassword(true);
    setError(null);
    try {
      const res = await auth.resetPassword(token, { password });
      addToast("Password reset successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      throw new Error(message);
    } finally {
      setResettingPassword(false);
    }
  }

  return {
    user,
    error,
    registering,
    loggingIn,
    loggingOut,
    fetching,
    verifying,
    resendingVerification,
    updatingProfile,
    sendingReset,
    resettingPassword,
    registerUser,
    loginUser,
    logoutUser,
    checkUser,
    verifyEmail,
    resendVerification,
    updateProfile,
    forgotPassword,
    resetPassword,
  };
}
