import AdminClient from "./AdminClient";

export const metadata = {
  title: "Admin Dashboard | Cognify",
  description:
    "Manage users, monitor platform activity, and configure Cognify settings.",
};

export default function AdminDashoard() {
  return (
    <main>
      <AdminClient />
    </main>
  );
}
