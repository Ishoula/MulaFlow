import * as React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`mf-input ${className}`.trim()}
      {...props}
    />
  );
}
