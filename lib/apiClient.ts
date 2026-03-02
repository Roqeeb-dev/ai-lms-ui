export class apiClient {
  async request<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, options);

    if (!res.ok) {
      throw new Error("Request failed");
    }

    return res.json();
  }

  get<T>(url: string) {
    return this.request<T>(url);
  }
}
