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
      credentials: "include", // always included
      redirect: options.redirect,
      signal: options.signal,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Something went wrong");
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

  put<T, B>(url: string, body: B) {
    return this.request<T>(url, { method: "PUT", body: JSON.stringify(body) });
  },

  patch<T, B>(url: string, body: B) {
    return this.request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  },

  delete<T>(url: string) {
    return this.request<T>(url, { method: "DELETE" });
  },
};
