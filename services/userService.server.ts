import { serverApiClient } from "@/lib/serverApiClient";
import { SessionUser } from "@/types/user";

export async function getUserServer(): Promise<SessionUser> {
  const res = await serverApiClient.get<any>("/api/users/me");
  return res.data;
}

export async function getPublicUserProfile(
  userId: string,
): Promise<SessionUser> {
  const res = await serverApiClient.get<any>(`/api/users/${userId}`);
  return res.data;
}
