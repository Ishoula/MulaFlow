import * as React from "react";

export function Button({ className = "", variant = "primary", ...props }) {
  const variants = {
    primary: "mf-btn-primary",
    ghost: "mf-btn-ghost",
    danger: "mf-btn-danger",
  };
  
  const variantClass = variants[variant] || variants.primary;
  
  return (
    <button
      className={`mf-btn ${variantClass} ${className}`.trim()}
      {...props}
    />
  );
}
