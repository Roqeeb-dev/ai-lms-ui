import ProfileClient from "./ProfileClient";
import { getUserServer } from "@/services/userService.server";
import { SessionUser } from "@/types/user";

export const metadata = {
  title: "Profile",
  description: "View and update your Cognify profile information.",
};

export default async function ProfilePage() {
  let initialUser: SessionUser | null = null;

  try {
    initialUser = await getUserServer();
  } catch (err) {
    // User not found or error fetching, let client handle it via useUserStore
  }

  return (
    <main>
      <ProfileClient initialUser={initialUser} />
    </main>
  );
}
