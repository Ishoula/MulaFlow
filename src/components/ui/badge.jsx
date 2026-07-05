export function Badge({ children, className = "", variant = "other", ...props }) {
  const variants = {
    food: "cat-food",
    transport: "cat-transport",
    tech: "cat-tech",
    entertainment: "cat-entertainment",
    other: "cat-other",
  };
  
  const variantClass = variants[variant.toLowerCase()] || variants.other;
  
  return (
    <span
      className={`cat-badge ${variantClass} ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
}
