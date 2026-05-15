import * as React from "react";

export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 ${className}`.trim()}
      {...props}
    />
  );
}
