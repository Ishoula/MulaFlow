export function Input({ className = "", ...props }) {
  return (
    <input
      className={`mf-input ${className}`.trim()}
      {...props}
    />
  );
}
