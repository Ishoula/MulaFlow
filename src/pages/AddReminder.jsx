import React, { useState } from "react";
import { setReminder } from "../api/reminder";

function AddReminder() {
  const [enabled, setEnabled] = useState(true);
  const [interval, setInterval] = useState(30);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await setReminder(enabled, interval);
      setMessage("Reminder saved successfully ✅");
      console.log(res);
    } catch (err) {
      setMessage("Failed to save reminder ❌");
      window.alert("Error: " + (err.message || "Unknown error"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reminder Settings</h2>

      <form onSubmit={handleSubmit} style={styles.form}>

        {/* ENABLE TOGGLE */}
        <label style={styles.label}>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          Enable Reminders
        </label>

        {/* INTERVAL SELECT */}
        <label style={styles.label}>
          Reminder Interval
          <select
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            style={styles.select}
          >
            <option value={15}>Every 15 minutes</option>
            <option value={30}>Every 30 minutes</option>
            <option value={60}>Every 1 hour</option>
            <option value={1440}>Every 1 day</option>
          </select>
        </label>

        {/* SUBMIT BUTTON */}
        <button style={styles.button} disabled={loading}>
          {loading ? "Saving..." : "Save Reminder"}
        </button>

        {/* MESSAGE */}
        {message && <p style={styles.message}>{message}</p>}
      </form>
    </div>
  );
}

export default AddReminder;

const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    fontFamily: "Arial",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    fontSize: "14px",
  },
  select: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    backgroundColor: "#2d6cdf",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  message: {
    fontSize: "14px",
    color: "green",
  },
};