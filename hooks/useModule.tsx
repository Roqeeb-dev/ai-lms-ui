"use client";

import { useState } from "react";
import {
  createCourseModule,
  getCourseModules,
  getSingleModule,
  updateModule,
  deleteModule,
  CreateCourseModulePayload,
  UpdateModulePayload,
} from "@/services/moduleService";
import { Module } from "@/types/module";
import { getErrorMessage } from "./useInstructorCourses";
import { useToastStore } from "@/store/useToastStore";

export function useModule() {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [creating, setCreating] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetchingSingle, setFetchingSingle] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { addToast } = useToastStore();

  async function addModule(courseId: string, data: CreateCourseModulePayload) {
    setCreating(true);
    setError(null);
    try {
      const res = await createCourseModule(courseId, data);
      setModules((prev) => [...prev, res.module]);
      addToast("Module created successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setCreating(false);
    }
  }

  async function fetchCourseModules(courseId: string) {
    setFetching(true);
    setError(null);
    try {
      const res = await getCourseModules(courseId);
      setModules(res.modules);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setFetching(false);
    }
  }

  async function fetchSingleModule(moduleId: string) {
    setFetchingSingle(true);
    setError(null);
    try {
      const res = await getSingleModule(moduleId);
      setSelectedModule(res.module);
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setFetchingSingle(false);
    }
  }

  async function editModule(moduleId: string, data: UpdateModulePayload) {
    setUpdating(true);
    setError(null);
    try {
      const res = await updateModule(moduleId, data);
      setModules((prev) =>
        prev.map((m) => (m.id === moduleId ? res.module : m)),
      );
      if (selectedModule?.id === moduleId) setSelectedModule(res.module);
      addToast("Module updated successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setUpdating(false);
    }
  }

  async function removeModule(moduleId: string) {
    setDeleting(true);
    setError(null);
    try {
      const res = await deleteModule(moduleId);
      setModules((prev) => prev.filter((m) => m.id !== moduleId));
      if (selectedModule?.id === moduleId) setSelectedModule(null);
      addToast("Module deleted successfully!", "success");
      return res;
    } catch (err: any) {
      const message = getErrorMessage(err);
      setError(message);
      addToast(message, "error");
      console.error(message);
      throw new Error(message);
    } finally {
      setDeleting(false);
    }
  }

  return {
    modules,
    selectedModule,
    error,
    creating,
    fetching,
    fetchingSingle,
    updating,
    deleting,
    addModule,
    fetchCourseModules,
    fetchSingleModule,
    editModule,
    removeModule,
  };
}
