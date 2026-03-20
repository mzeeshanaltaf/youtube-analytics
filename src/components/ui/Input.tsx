interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-lg bg-surface-elevated border border-border px-4 py-2.5
          text-foreground placeholder:text-muted/50
          focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
          transition-colors duration-200
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""}
          ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
