interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-surface border border-border p-6
        ${hover ? "transition-all duration-300 hover:border-border-hover hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent-glow/5" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
}
