import api from "./axios";

/**
 * Set or update reminder settings
 */
export const setReminder = async (enabled, intervalMinutes) => {
  try {
    const response = await api.post("/reminders", null, {
      params: {
        enabled,
        intervalMinutes,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to set reminder";
  }
};

export const getDueReminders = async () => {
  try {
    const res = await api.get("/reminders/due");
     return res.data;
    
  } catch (error) {
    console.error("Error fetching due reminders:", error);
    window.alert("Failed to load reminders: " + (error.message || "Unknown error"));
    return [];
  }
};