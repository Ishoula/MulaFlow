import { useEffect, useState } from "react";
import {
  Bell,
  BellRing,
  RefreshCw,
  CheckCircle2,
  CircleAlert,
  Wallet,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { AlertsPageSkeleton } from "@/components/ui/skeleton";

import {
  getReminders,
  markReminderAsRead,
} from "../api/reminder";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getReminders();
      setAlerts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load alerts.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markReminderAsRead(id);

      setAlerts((prev) =>
        prev.map((alert) =>
          alert.id === id
            ? { ...alert, readStatus: true }
            : alert
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAlerts();
  }, []);

  return (
    <DashboardLayout>
      {loading ? (
        <AlertsPageSkeleton />
      ) : error ? (
        <div className="alerts-error">
          <CircleAlert size={18} />
          {error}
        </div>
      ) : (
      <div className="alerts-page">
        <div className="alerts-header">
          <div className="alerts-header-left">
            <div className="alerts-title">
              <Bell size={28} />

              <h1>Alerts</h1>

              <span className="alerts-count">
                {
                  alerts.filter(
                    (alert) => !alert.readStatus
                  ).length
                }
              </span>
            </div>

            <p className="alerts-subtitle">
              Spending notifications and reminders
            </p>
          </div>

          <button
            className="mf-btn mf-btn-primary"
            onClick={fetchAlerts}
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>

        {alerts.length === 0 ? (
          <div className="panel alerts-empty">
            <CheckCircle2 size={48} />
            <h3>No alerts available</h3>
            <p>You're all caught up.</p>
          </div>
        ) : (
          <div className="alerts-grid">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`panel alert-card ${alert.readStatus
                    ? "alert-read"
                    : "alert-unread"
                  }`}
              >
                <div className="alert-meta">
                  <span className="alert-status">
                    {alert.readStatus ? (
                      <>
                        <CheckCircle2 size={14} />
                        Read
                      </>
                    ) : (
                      <>
                        <BellRing size={14} />
                        Unread
                      </>
                    )}
                  </span>

                  <span className="alert-date">
                    {alert.createdAt
                      ? new Date(
                        alert.createdAt
                      ).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <h3 className="alert-message">
                  {alert.message}
                </h3>

                <div className="alert-stats">
                  <div className="alert-stat">
                    <Wallet size={16} />
                    <span>Monthly Total</span>
                    <strong>{alert.monthlyTotal}</strong>
                  </div>
                </div>

                {!alert.readStatus && (
                  <button
                    className="mf-btn mf-btn-primary"
                    onClick={() =>
                      handleMarkAsRead(alert.id)
                    }
                  >
                    <CheckCircle2 size={16} />
                    Mark as Read
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      )}
    </DashboardLayout>
  );
};

export default AlertsPage;
