import { useEffect, useState } from "react";
import { getDueReminders } from "../api/reminder";

export const useReminders = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const data = await getDueReminders();
      setReminders(data);
    } catch (err) {
      console.error("Failed to fetch reminders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();

    // 🔁 auto refresh every 5 minutes
    const interval = setInterval(fetchReminders, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return { reminders, loading, refresh: fetchReminders };
};