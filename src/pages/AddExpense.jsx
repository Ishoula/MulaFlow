import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createExpense } from "@/api/expenseApi";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { EXPENSE_CATEGORIES } from "@/constants/expenses";

export default function AddExpense() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.title || !form.amount || !form.date) return;

    try {
      setSaving(true);
      setError("");
      await createExpense(form);
      navigate("/expenses");
    } catch {
      setError("Failed to create expense");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <h1>Add expense</h1>
          <p>Record a new transaction.</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <Card>
        <CardHeader>Expense details</CardHeader>
        <CardContent>
          <form className="expense-form" onSubmit={handleSubmit}>
            <Input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <Input
              name="amount"
              type="number"
              min="0"
              step="0.01"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />

            <Select
              name="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {EXPENSE_CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </Select>

            <Input
              name="date"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />

            <div className="form-actions">
              <Button type="submit" loading={saving}>
                Save expense
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/expenses")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
