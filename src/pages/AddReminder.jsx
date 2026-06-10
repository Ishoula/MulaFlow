import React, { useState } from "react";
import {
  Bell,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import { setReminder } from "../api/reminder";
import DashboardLayout from "@/components/DashboardLayout";

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
      await setReminder(enabled, interval);

      setMessage(
        "Reminder settings saved successfully."
      );
    } catch (err) {
      console.error(err);

      setMessage(
        "Failed to save reminder settings."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="reminder-page">
        <div className="page-header">
          <div>
            <h1>Reminder Settings</h1>
            <p>
              Configure how often MulaFlow checks
              your spending and generates alerts.
            </p>
          </div>
        </div>

        <div className="panel reminder-panel">
          <div className="panel-header">
            <span className="reminder-header">
              <Bell size={18} />
              Spending Reminders
            </span>
          </div>

          <form
            onSubmit={handleSubmit}
            className="reminder-form"
          >
            <div className="reminder-toggle">
              <label className="reminder-checkbox">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) =>
                    setEnabled(e.target.checked)
                  }
                />

                <span>Enable reminders</span>
              </label>
            </div>

            <div className="auth-field">
              <span>Reminder Interval</span>

              <div className="reminder-input-wrap">
                <Clock3 size={18} />

                <input
                  type="number"
                  min="1"
                  value={interval}
                  onChange={(e) =>
                    setInterval(
                      Number(e.target.value)
                    )
                  }
                  className="mf-input"
                  placeholder="Enter minutes"
                />
              </div>

              <small className="reminder-help">
                Example: 30 = every 30 minutes,
                1440 = once per day
              </small>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mf-btn mf-btn-primary"
            >
              {loading
                ? "Saving..."
                : "Save Reminder"}
            </button>

            {message && (
              <div className="reminder-message">
                <CheckCircle2 size={16} />
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddReminder;