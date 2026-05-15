import axios from "axios";

const BASE_URL = "http://localhost:2727/api/expenses";

export const getExpenses = () => axios.get(BASE_URL);

export const getAllExpenses = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createExpense = (expense) => axios.post(BASE_URL, expense);

export const deleteExpense = (id) => axios.delete(`${BASE_URL}/${id}`);

export const updateExpense = (id, expense) =>
  axios.put(`${BASE_URL}/${id}`, expense);

export const getByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  return res.json();
};

export const getAboveAmount = async (amount) => {
  const res = await fetch(`${BASE_URL}/above/${amount}`);
  return res.json();
};

export const getByDateRange = async (start, end) => {
  const res = await fetch(
    `${BASE_URL}/range?start=${start}&end=${end}`
  );
  return res.json();
};

export const getTotalExpenses = async () => {
  const res = await fetch(`${BASE_URL}/total`);
  return res.json();
};

export const getHighestExpense = async () => {
  const res = await fetch(`${BASE_URL}/highest`);
  return res.json();
};

export const getMonthlyTotal = async (month, year) => {
  const res = await fetch(
    `${BASE_URL}/monthly?month=${month}&year=${year}`
  );
  return res.json();
};

export const getPaginatedExpenses = async (
  page = 0,
  size = 5,
  sortBy = "date",
  direction = "desc"
) => {
  const params = new URLSearchParams({
    page,
    size,
    sortBy,
    direction,
  });

  const res = await fetch(`${BASE_URL}/paginated?${params}`);

  if (!res.ok) {
    throw new Error(`Failed to load paginated expenses: ${res.status}`);
  }

  return res.json();
};
