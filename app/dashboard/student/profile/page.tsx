import ProfileClient from "./ProfileClient";

export const metadata = {
  title: "Profile | Cognify",
  description: "View and update your Cognify profile information.",
};

export default function ProfilePage() {
  return (
    <main>
      <ProfileClient />
    </main>
  );
}
