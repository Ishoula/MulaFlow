import { deleteExpense } from "../api/expenseApi";

export default function ExpenseList({
  expenses,
  onDelete,
  onEdit
}) {

  const handleDelete = async (id) => {

    await deleteExpense(id);

    onDelete(id);
  };

  return (
    <div className="grid gap-4">

      {expenses.length === 0 && (
        <div className="text-center text-gray-500">
          No expenses found
        </div>
      )}

      {expenses.map((exp) => (

        <div
          key={exp.id}
          className="bg-white p-5 rounded-2xl shadow-md flex justify-between items-center"
        >

          <div>

            <h2 className="text-xl font-semibold">
              {exp.title}
            </h2>

            <p className="text-gray-600">
              Category: {exp.category}
            </p>

            <p className="text-gray-500 text-sm">
              {exp.date}
            </p>

          </div>

          <div className="text-right">

            <p className="text-2xl font-bold mb-3">
              ${exp.amount}
            </p>

            <div className="flex gap-2">

              <button
                onClick={() => onEdit(exp)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(exp.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      ))}
    </div>
  );
}