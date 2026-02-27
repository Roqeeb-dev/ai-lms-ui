import DashboardTopbar from "@/components/DashboardTopbar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      {/* <DashboardTopbar user={""} /> */}
      {children}
    </main>
  );
}
