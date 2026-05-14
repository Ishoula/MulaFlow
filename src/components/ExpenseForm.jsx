import { useEffect, useState } from "react";

import {
  createExpense,
  updateExpense
} from "../api/expenseApi";

export default function ExpenseForm({
  onAdd,
  editingExpense,
  onUpdate
}) {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  // LOAD DATA INTO FORM WHEN EDITING
  useEffect(() => {

    if (editingExpense) {
      setForm(editingExpense);
    }

  }, [editingExpense]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const expenseData = {
      ...form,
      amount: parseFloat(form.amount)
    };

    // UPDATE
    if (editingExpense) {

      const res = await updateExpense(
        editingExpense.id,
        expenseData
      );

      onUpdate(res.data);

    } else {

      // CREATE
      const res = await createExpense(expenseData);

      onAdd(res.data);
    }

    // RESET FORM
    setForm({
      title: "",
      amount: "",
      category: "",
      date: ""
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md mb-8"
    >

      <div className="grid md:grid-cols-2 gap-4">

        <input
          type="text"
          name="title"
          placeholder="Expense title"
          value={form.title}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

      </div>

      <button
        type="submit"
        className="mt-6 bg-black text-white px-6 py-3 rounded-xl hover:opacity-90 transition"
      >
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>

    </form>
  );
}