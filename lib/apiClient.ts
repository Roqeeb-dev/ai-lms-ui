const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5173";

export class ApiClient {
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    return res.json();
  }

  get<T>(url: string) {
    return this.request<T>(url);
  }

  post<T, B>(url: string, body: B) {
    return this.request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T, B>(url: string, body: B) {
    return this.request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  delete<T>(url: string) {
    return this.request<T>(url, {
      method: "DELETE",
    });
  }
}
