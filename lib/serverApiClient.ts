import { cookies } from "next/headers";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

const baseUrl =
  process.env.API_BASE_URL ?? "https://lms-backend-xaxg.onrender.com";

export const serverApiClient = {
  async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const cookieHeader = allCookies
      .map((c: RequestCookie) => `${c.name}=${c.value}`)
      .join("; ");

    const res = await fetch(baseUrl + url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
        ...options.headers,
      },
      cache: "no-store",
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
};
