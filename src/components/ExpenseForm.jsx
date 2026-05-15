import { useState } from "react";

import {
  createExpense,
  updateExpense
} from "../api/expenseApi";

const emptyForm = {
  title: "",
  amount: "",
  category: "",
  date: ""
};

export default function ExpenseForm({
  onAdd,
  editingExpense,
  onUpdate
}) {

  const [form, setForm] = useState(editingExpense || emptyForm);

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
    setForm(emptyForm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-2xl border border-[#E5D3B7] bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-6"
    >

      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#4A3428]">
            {editingExpense ? "Edit expense" : "Add expense"}
          </h2>
          <p className="text-sm text-[#9A8478]">
            Keep your spending records tidy and up to date.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">

        <input
          type="text"
          name="title"
          placeholder="Expense title"
          value={form.title}
          onChange={handleChange}
          className="rounded-xl border border-[#E5D3B7] bg-[#FFF8F3] p-3 text-[#4A3428] outline-none transition placeholder:text-[#9A8478] focus:border-[#8B593E] focus:bg-white focus:ring-4 focus:ring-[#8B593E]/10"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="rounded-xl border border-[#E5D3B7] bg-[#FFF8F3] p-3 text-[#4A3428] outline-none transition placeholder:text-[#9A8478] focus:border-[#8B593E] focus:bg-white focus:ring-4 focus:ring-[#8B593E]/10"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="rounded-xl border border-[#E5D3B7] bg-[#FFF8F3] p-3 text-[#4A3428] outline-none transition placeholder:text-[#9A8478] focus:border-[#8B593E] focus:bg-white focus:ring-4 focus:ring-[#8B593E]/10"
          required
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="rounded-xl border border-[#E5D3B7] bg-[#FFF8F3] p-3 text-[#4A3428] outline-none transition placeholder:text-[#9A8478] focus:border-[#8B593E] focus:bg-white focus:ring-4 focus:ring-[#8B593E]/10"
          required
        />

      </div>

      <button
        type="submit"
        className="mt-6 rounded-xl bg-[#8B593E] px-6 py-3 font-semibold text-white shadow-[0_10px_24px_rgba(139,89,62,0.24)] transition hover:bg-[#754A34] focus:outline-none focus:ring-4 focus:ring-[#8B593E]/20"
      >
        {editingExpense ? "Update Expense" : "Add Expense"}
      </button>

    </form>
  );
}
