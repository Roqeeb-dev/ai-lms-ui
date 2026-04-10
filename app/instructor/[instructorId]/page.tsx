import PublicInstructorClient from "./Client";

export const metadata = {
  title: "Instructor Profile",
  description:
    "View instructor profile, bio, and browse their available courses on Cognify LMS.",
};

export default function PublicInstructorProfile() {
  return (
    <main>
      <PublicInstructorClient />
    </main>
  );
}
