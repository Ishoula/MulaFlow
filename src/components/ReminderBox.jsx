import React from "react";
import { useReminders } from "../hooks/useReminders";

const ReminderBox = () => {
  const { reminders, loading } = useReminders();

  if (loading) return <p>Loading reminders...</p>;

  if (reminders.length === 0) {
    return <p>No reminders right now 🎉</p>;
  }

  return (
    <div>
      <h3>📊 Your Financial Reminders</h3>

      {reminders.map((r, index) => (
        <div key={index} style={{ padding: "10px", border: "1px solid #ccc", marginTop: "10px" }}>
          <p><strong>{r.message}</strong></p>
          <small>{r.email}</small>
          <p>Monthly total: {r.monthlyTotal}</p>
        </div>
      ))}
    </div>
  );
};

export default ReminderBox;