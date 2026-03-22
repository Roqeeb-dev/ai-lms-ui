import AnalyticsClient from "./AnalyticsClient";

export const metadata = {
  title: "Analytics | Cognify LMS",
  description: "Get an overview of all actions related to you on the app",
};

export default function Analytics() {
  return (
    <main>
      <AnalyticsClient />
    </main>
  );
}
