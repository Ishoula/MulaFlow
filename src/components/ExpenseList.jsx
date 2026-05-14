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
    <section className="grid gap-4">

      {expenses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[#E5D3B7] bg-white p-10 text-center text-[#9A8478]">
          No expenses found
        </div>
      )}

      {expenses.map((exp) => (

        <div
          key={exp.id}
          className="flex flex-col gap-5 rounded-2xl border border-[#E5D3B7] bg-white p-5 shadow-[0_14px_36px_rgba(0,0,0,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(0,0,0,0.09)] sm:flex-row sm:items-center sm:justify-between"
        >

          <div>

            <h2 className="text-xl font-bold text-[#4A3428]">
              {exp.title}
            </h2>

            <p className="mt-1 text-sm font-medium text-[#8B593E]">
              Category: {exp.category}
            </p>

            <p className="mt-1 text-sm text-[#9A8478]">
              {exp.date}
            </p>

          </div>

          <div className="sm:text-right">

            <p className="mb-3 text-2xl font-bold text-[#E74C3C]">
              ${exp.amount}
            </p>

            <div className="flex gap-2 sm:justify-end">

              <button
                onClick={() => onEdit(exp)}
                className="rounded-lg border border-[#E5D3B7] bg-[#FFF8F3] px-4 py-2 text-sm font-semibold text-[#8B593E] transition hover:border-[#8B593E] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#8B593E]/10"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(exp.id)}
                className="rounded-lg bg-[#E74C3C] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#cf3f30] focus:outline-none focus:ring-4 focus:ring-[#E74C3C]/20"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      ))}
    </section>
  );
}
