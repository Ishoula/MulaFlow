import * as React from "react";

export function Select({ children, className = "", onValueChange, onChange, ...props }) {
  const handleChange = (event) => {
    onChange?.(event);
    onValueChange?.(event.target.value);
  };

  return (
    <select
      {...props}
      onChange={handleChange}
      className={`border p-2 rounded ${className}`.trim()}
    >
      {children}
    </select>
  );
}

export function SelectContent({ children }) {
  return <>{children}</>;
}

export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}

export function SelectTrigger({ children }) {
  return <>{children}</>;
}

export function SelectValue() {
  return null;
}
