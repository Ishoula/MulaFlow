import React, { useEffect, useState } from "react";
import { getDueReminders } from "../api/reminder";

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getDueReminders();
      setAlerts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load alerts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading alerts...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>🔔 Alerts</h1>
      <button onClick={fetchAlerts} style={{ marginBottom: "10px" }}>
  🔄 Refresh
     </button>

      {alerts.length === 0 ? (
        <p>No alerts for now 🎉</p>
      ) : (
        alerts.map((alert, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginTop: "10px",
              borderRadius: "8px",
              background: "#fafafa",
            }}
          >
            <h3>{alert.message}</h3>

            <p style={{ margin: "5px 0", color: "#555" }}>
              Email: {alert.email}
            </p>

            <p style={{ margin: "5px 0", fontWeight: "bold" }}>
              Monthly Total: {alert.monthlyTotal}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AlertsPage;