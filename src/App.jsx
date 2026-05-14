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
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Expense Tracker 💸
        </h1>

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