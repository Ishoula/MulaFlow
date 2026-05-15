import * as React from "react";

export function Card({ className = "", ...props }) {
  return (
    <div
      className={`rounded border border-slate-200 bg-white shadow-sm ${className}`.trim()}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  return <div className={className} {...props} />;
}
