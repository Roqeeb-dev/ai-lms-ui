import BrowseClient from "./BrowseClient";

export const metadata = {
  title: "Browse Courses",
  description: "Browse courses you may be interested in",
};

export default function ExploreCourses() {
  return (
    <main>
      <BrowseClient />
    </main>
  );
}
