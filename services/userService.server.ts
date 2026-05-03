import { serverApiClient } from "@/lib/serverApiClient";
import { SessionUser } from "@/types/user";

export async function getUserServer(): Promise<SessionUser> {
  const res = await serverApiClient.get<any>("/api/users/me");
  return res.data;
}
