import Image from "next/image";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <Image
              src="/yt-analytics-icon.png"
              alt="YT Analytics"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-heading text-base font-bold tracking-tight">
              YT Analytics
            </span>
          </a>
          <ThemeToggle />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
