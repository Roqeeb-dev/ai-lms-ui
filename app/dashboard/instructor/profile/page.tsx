import InstructorProfileClient from "./ProfileClient";
import { getUserServer } from "@/services/userService.server";
import { SessionUser } from "@/types/user";

export const metadata = {
  title: "My Profile",
  description: "Manage your instructor profile, bio, and account settings.",
};

export default async function InstructorProfilePage() {
  let initialUser: SessionUser | null = null;

  try {
    initialUser = await getUserServer();
  } catch (err) {
    // User not found or error fetching, let client handle it via useUserStore
  }

  return (
    <main>
      <InstructorProfileClient initialUser={initialUser} />
    </main>
  );
}
