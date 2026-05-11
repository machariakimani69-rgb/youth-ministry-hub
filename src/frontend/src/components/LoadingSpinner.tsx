interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

const sizes = {
  sm: "h-4 w-4 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function LoadingSpinner({
  size = "md",
  className = "",
  label = "Loading…",
}: LoadingSpinnerProps) {
  return (
    <output
      aria-label={label}
      className={`flex items-center justify-center ${className}`}
    >
      <div
        className={`${sizes[size]} animate-spin rounded-full border-muted-foreground border-t-primary`}
      />
      <span className="sr-only">{label}</span>
    </output>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground font-body text-sm animate-fade-in">
          Loading…
        </p>
      </div>
    </div>
  );
}
