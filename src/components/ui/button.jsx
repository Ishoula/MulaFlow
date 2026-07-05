import { Skeleton } from "./skeleton";

export function Button({
  children,
  className = "",
  loading = false,
  variant = "primary",
  disabled,
  ...props
}) {
  const variants = {
    primary: "mf-btn-primary",
    ghost: "mf-btn-ghost",
    danger: "mf-btn-danger",
  };
  
  const variantClass = variants[variant] || variants.primary;
  
  return (
    <button
      className={`mf-btn ${variantClass} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Skeleton className="skeleton-button-label" /> : children}
    </button>
  );
}
