export function Card({ className = "", ...props }) {
  return (
    <div
      className={`panel ${className}`.trim()}
      {...props}
    />
  );
}

export function CardContent({ className = "", ...props }) {
  return <div className={`p-6 ${className}`.trim()} {...props} />;
}

export function CardHeader({ className = "", ...props }) {
  return <div className={`panel-header ${className}`.trim()} {...props} />;
}
