import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                <polygon points="10,8 16,12 10,16" />
              </svg>
            </div>
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
