import api from "./axios"; // IMPORTANT: your JWT-enabled axios instance

const BASE_URL = "/expenses";

/* ========================
   BASIC CRUD
======================== */

export const getExpenses = () =>
  api.get(BASE_URL).then(res => res.data);

export const createExpense = (expense) =>
  api.post(BASE_URL, expense).then(res => res.data);

export const deleteExpense = (id) =>
  api.delete(`${BASE_URL}/${id}`);

export const updateExpense = (id, expense) =>
  api.put(`${BASE_URL}/${id}`, expense).then(res => res.data);

/* ========================
   FILTERS / QUERIES
======================== */

export const getByCategory = (category) =>
  api.get(`${BASE_URL}/category/${category}`).then(res => res.data);

export const getAboveAmount = (amount) =>
  api.get(`${BASE_URL}/above/${amount}`).then(res => res.data);

export const getByDateRange = (start, end) =>
  api
    .get(`${BASE_URL}/range`, { params: { start, end } })
    .then(res => res.data);

/* ========================
   STATS
======================== */

export const getTotalExpenses = () =>
  api.get(`${BASE_URL}/total`).then(res => res.data);

export const getHighestExpense = () =>
  api.get(`${BASE_URL}/highest`).then(res => res.data);

export const getMonthlyTotal = (month, year) =>
  api
    .get(`${BASE_URL}/monthly`, { params: { month, year } })
    .then(res => res.data);

/* ========================
   PAGINATION
======================== */

export const getPaginatedExpenses = (
  page = 0,
  size = 5,
  sortBy = "date",
  direction = "desc"
) =>
  api
    .get(`${BASE_URL}/page`, {
      params: { page, size, sort: `${sortBy},${direction}` },
    })
    .then(res => res.data);
