import { Metadata } from "next";
import StudentsClient from "./StudentsClient";

export const metadata: Metadata = {
  title: "My Students",
  description: "View and manage students enrolled in your courses.",
};

export default function Page() {
  return (
    <main>
      <StudentsClient />
    </main>
  );
}
