export function Skeleton({ className = "", style, ...props }) {
  return (
    <span
      className={`mf-skeleton ${className}`.trim()}
      style={style}
      aria-hidden="true"
      {...props}
    />
  );
}

export function SkeletonText({ lines = 1, className = "" }) {
  return (
    <div className={`mf-skeleton-text ${className}`.trim()} aria-hidden="true">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className="mf-skeleton-line"
          style={{ width: index === lines - 1 ? "68%" : "100%" }}
        />
      ))}
    </div>
  );
}

export function PageHeaderSkeleton({ hasAction = false }) {
  return (
    <div className="page-header">
      <div className="skeleton-header-copy">
        <Skeleton className="skeleton-title" />
        <Skeleton className="skeleton-subtitle" />
      </div>

      {hasAction && <Skeleton className="skeleton-button" />}
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="panel skeleton-stat-card">
      <div className="skeleton-stat-top">
        <Skeleton className="skeleton-label" />
        <Skeleton className="skeleton-icon" />
      </div>
      <Skeleton className="skeleton-value" />
      <Skeleton className="skeleton-caption" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <PageHeaderSkeleton />

      <div className="stats-grid">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="panel">
        <div className="panel-header">
          <Skeleton className="skeleton-heading-small" />
        </div>
        <div className="p-6">
          <div className="quick-add-form">
            <Skeleton className="skeleton-control" />
            <Skeleton className="skeleton-control" />
            <Skeleton className="skeleton-control" />
            <Skeleton className="skeleton-control" />
            <Skeleton className="skeleton-button" />
          </div>
        </div>
      </div>

      <div className="panel skeleton-chart-card">
        <div className="panel-header">
          <Skeleton className="skeleton-heading-small" />
        </div>
        <div className="skeleton-chart">
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton
              key={index}
              className="skeleton-chart-bar"
              style={{ height: `${34 + ((index * 19) % 50)}%` }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export function AlertsPageSkeleton() {
  return (
    <div className="alerts-page">
      <div className="alerts-header">
        <div className="alerts-header-left">
          <div className="alerts-title">
            <Skeleton className="skeleton-icon" />
            <Skeleton className="skeleton-title skeleton-alerts-title" />
            <Skeleton className="skeleton-icon" />
          </div>
          <Skeleton className="skeleton-subtitle" />
        </div>

        <Skeleton className="skeleton-button" />
      </div>

      <AlertCardsSkeleton />
    </div>
  );
}

export function TableSkeleton({ rows = 6, columns = 5 }) {
  return (
    <div className="skeleton-table" aria-label="Loading table">
      <div className="skeleton-table-head">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} className="skeleton-table-cell" />
        ))}
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="skeleton-table-row">
          {Array.from({ length: columns }).map((_, columnIndex) => (
            <Skeleton
              key={columnIndex}
              className="skeleton-table-cell"
              style={{
                width:
                  columnIndex === columns - 1
                    ? "78px"
                    : `${64 + ((rowIndex + columnIndex) * 9) % 30}%`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function AlertCardsSkeleton({ count = 4 }) {
  return (
    <div className="alerts-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="panel alert-card">
          <div className="alert-meta">
            <Skeleton className="skeleton-pill" />
            <Skeleton className="skeleton-date" />
          </div>

          <SkeletonText lines={3} />

          <div className="alert-stats">
            <Skeleton className="skeleton-icon" />
            <Skeleton className="skeleton-caption-wide" />
          </div>

          <Skeleton className="skeleton-button" />
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton({ fields = 4, actions = 2 }) {
  return (
    <div className="expense-form">
      {Array.from({ length: fields }).map((_, index) => (
        <Skeleton key={index} className="skeleton-control" />
      ))}

      <div className="form-actions">
        {Array.from({ length: actions }).map((_, index) => (
          <Skeleton key={index} className="skeleton-button" />
        ))}
      </div>
    </div>
  );
}

export function ReminderBoxSkeleton({ count = 2 }) {
  return (
    <div className="reminder-box">
      <Skeleton className="skeleton-heading-small" />

      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="panel reminder-box-card">
          <SkeletonText lines={2} />
          <Skeleton className="skeleton-caption-wide" />
        </div>
      ))}
    </div>
  );
}
