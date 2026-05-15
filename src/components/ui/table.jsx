import * as React from "react";

export function Table({ className = "", ...props }) {
  return (
    <table
      className={`w-full border-collapse text-left text-sm ${className}`.trim()}
      {...props}
    />
  );
}

export function TableHeader({ className = "", ...props }) {
  return <thead className={className} {...props} />;
}

export function TableBody({ className = "", ...props }) {
  return <tbody className={className} {...props} />;
}

export function TableRow({ className = "", ...props }) {
  return (
    <tr
      className={`border-b border-slate-200 last:border-b-0 ${className}`.trim()}
      {...props}
    />
  );
}

export function TableHead({ className = "", ...props }) {
  return (
    <th
      className={`px-3 py-2 font-semibold text-slate-700 ${className}`.trim()}
      {...props}
    />
  );
}

export function TableCell({ className = "", ...props }) {
  return <td className={`px-3 py-2 ${className}`.trim()} {...props} />;
}
