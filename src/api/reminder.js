import api from "./axios";

/**
 * Enable or disable reminders
 */
export const setReminder = async (enabled, intervalMinutes) => {
  try {
    const response = await api.post("/reminders/settings", null, {
      params: {
        enabled,
        intervalMinutes,
      },
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || "Failed to update reminder settings";
  }
};

/**
 * Get all reminders for the logged-in user
 */
export const getReminders = async () => {
  try {
    const response = await api.get("/reminders");
    return response.data;
  } catch (error) {
    console.error("Error fetching reminders:", error);
    throw error.response?.data || "Failed to fetch reminders";
  }
};

/**
 * Get unread reminders only
 */
export const getUnreadReminders = async () => {
  try {
    const response = await api.get("/reminders/unread");
    return response.data;
  } catch (error) {
    console.error("Error fetching unread reminders:", error);
    throw error.response?.data || "Failed to fetch unread reminders";
  }
};

/**
 * Mark a single reminder as read
 */
export const markReminderAsRead = async (id) => {
  try {
    const response = await api.patch(`/reminders/${id}/read`);
    return response.data;
  } catch (error) {
    console.error("Error marking reminder as read:", error);
    throw error.response?.data || "Failed to mark reminder as read";
  }
};

/**
 * Mark all reminders as read
 * (Only if you added the backend endpoint)
 */
export const markAllRemindersAsRead = async () => {
  try {
    const response = await api.patch("/reminders/read-all");
    return response.data;
  } catch (error) {
    console.error("Error marking all reminders as read:", error);
    throw error.response?.data || "Failed to mark all reminders as read";
  }
};