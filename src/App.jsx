import { useEffect, useState } from "react";
import { getExpenses } from "./api/expenseApi";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {

  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  // ADD
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // DELETE
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // START EDIT
  const editExpense = (expense) => {
    setEditingExpense(expense);
  };

  // UPDATE
  const updateExpenseInState = (updatedExpense) => {

    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id
          ? updatedExpense
          : expense
      )
    );

    setEditingExpense(null);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] px-4 py-8 text-[#4A3428] sm:px-6 lg:px-8">

      <div className="mx-auto max-w-5xl">

        <header className="mb-8 flex flex-col gap-3 border-b border-[#E5D3B7] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#9A8478]">
              MulaFlow
            </p>
            <h1 className="text-4xl font-bold text-[#4A3428]">
              Expense Tracker
            </h1>
          </div>

          <div className="rounded-full border border-[#E5D3B7] bg-white px-4 py-2 text-sm font-medium text-[#8B593E] shadow-sm">
            Track every rand with calm clarity
          </div>
        </header>

        <ExpenseForm
          onAdd={addExpense}
          editingExpense={editingExpense}
          onUpdate={updateExpenseInState}
        />

        <ExpenseList
          expenses={expenses}
          onDelete={deleteExpense}
          onEdit={editExpense}
        />

      </div>
    </div>
  );
}

export default App;
