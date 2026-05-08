const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

export const apiClient = {
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(baseUrl + url, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body,
      credentials: "include",
      redirect: options.redirect,
      signal: options.signal,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMessage =
        errorData?.error ||
        errorData?.message ||
        res.statusText ||
        "Something went wrong";
      throw new Error(errorMessage);
    }
    return res.json();
  },

  async requestForm<T>(
    url: string,
    method: string,
    body: FormData,
  ): Promise<T> {
    const res = await fetch(baseUrl + url, {
      method,
      body,
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const errorMessage =
        errorData?.error ||
        errorData?.message ||
        res.statusText ||
        "Something went wrong";
      throw new Error(errorMessage);
    }
    return res.json();
  },

  get<T>(url: string) {
    return this.request<T>(url);
  },

  post<T, B = unknown>(url: string, body?: B) {
    return this.request<T>(url, {
      method: "POST",
      ...(body !== undefined && { body: JSON.stringify(body) }),
    });
  },

  // POST with FormData (file upload)
  postForm<T>(url: string, body: FormData) {
    return this.requestForm<T>(url, "POST", body);
  },

  put<T, B>(url: string, body: B) {
    return this.request<T>(url, { method: "PUT", body: JSON.stringify(body) });
  },

  patch<T, B>(url: string, body: B) {
    return this.request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  // PATCH with FormData (file upload)
  patchForm<T>(url: string, body: FormData) {
    return this.requestForm<T>(url, "PATCH", body);
  },

  delete<T>(url: string) {
    return this.request<T>(url, { method: "DELETE" });
  },
};
