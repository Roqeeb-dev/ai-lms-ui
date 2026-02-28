"use client";

import { useState } from "react";

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  function update<K extends keyof T>(key: K, value: T[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    return setValues(initialValues);
  }

  function setAll(values: Partial<T>) {
    setValues((prev) => ({ ...prev, ...values }));
  }

  return { values, update, reset, setAll };
}
