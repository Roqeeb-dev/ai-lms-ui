import InstructorProfileClient from "./ProfileClient";

export const metadata = {
  title: "My Profile",
  description: "Manage your instructor profile, bio, and account settings.",
};

export default function InstructorProfilePage() {
  return (
    <main>
      <InstructorProfileClient />
    </main>
  );
}
