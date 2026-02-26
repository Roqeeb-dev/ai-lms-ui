import { Plus_Jakarta_Sans } from "next/font/google";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Logo() {
  return (
    <div className="flex items-center">
      <h1
        className={`${jakarta.className} text-3xl font-semibold tracking-[-0.02em]`}
      >
        Cogn<span className="text-primary">ify</span>
      </h1>
    </div>
  );
}
