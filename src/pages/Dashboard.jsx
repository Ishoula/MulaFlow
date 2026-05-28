"use client";

import { useEffect, useState } from "react";
import {
  createExpense,
  getTotalExpenses,
  getHighestExpense,
  getMonthlyTotal,
  getPaginatedExpenses,
} from "@/api/expenseApi";
import DashboardLayout from "@/components/DashboardLayout";
import { getStoredName } from "@/components/Navbar";
import { CURRENCY } from "@/constants/currency";
import { EXPENSE_CATEGORIES } from "@/constants/expenses";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const StatCard = ({ label, value, sub, icon, trend }) => (
  <Card>
    <CardContent>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 11, textTransform: "uppercase" }}>
          {label}
        </span>
        <span>{icon}</span>
      </div>

      <div style={{ fontSize: 26, fontWeight: 900 }}>{value}</div>

      <div style={{ fontSize: 12, opacity: 0.7 }}>
        {trend && <b>{trend} </b>}
        {sub}
      </div>
    </CardContent>
  </Card>
);

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page] = useState(0);
  const [size] = useState(5);
  const [sortBy] = useState("date");
  const [direction] = useState("desc");

  const [total, setTotal] = useState(0);
  const [highest, setHighest] = useState(null);
  const [monthly, setMonthly] = useState(0);

  const [error, setError] = useState("");
  const [name] = useState(getStoredName);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
  });

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPaginatedExpenses(page, size, sortBy, direction);
      setExpenses(data.content ?? data ?? []);
    } catch {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const now = new Date();

      setTotal(await getTotalExpenses());
      setHighest(await getHighestExpense());
      setMonthly(await getMonthlyTotal(now.getMonth() + 1, now.getFullYear()));
    } catch {
      setTotal(0);
      setHighest(null);
      setMonthly(0);
    }
  };

  const handleCreate = async () => {
    if (!form.title || !form.amount) return;

    try {
      await createExpense(form);
      setForm({
        title: "",
        amount: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
      });

      loadExpenses();
      loadStats();
    } catch {
      setError("Failed to create expense");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [page, size, sortBy]);

  useEffect(() => {
    loadStats();
  }, []);

  const chartData = expenses.map((expense) => ({
    name: expense.title?.slice(0, 6),
    amount: expense.amount,
  }));

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <h1>Welcome back, {name}</h1>
          <p>Your financial overview</p>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="stats-grid">
        <StatCard
          label="Total"
          value={`${CURRENCY} ${total}`}
          sub="All expenses"
          icon={CURRENCY}
        />

        <StatCard
          label="Highest"
          value={`${CURRENCY} ${highest?.amount || 0}`}
          sub={highest?.title || "None"}
          icon="Max"
        />

        <StatCard
          label="Monthly"
          value={`${CURRENCY} ${monthly}`}
          sub="This month"
          icon="30d"
        />
      </div>

      <Card>
        <CardHeader>Quick Add</CardHeader>
        <CardContent>
          <div className="quick-add-form">
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <Input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />

            <select
              className="mf-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {EXPENSE_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />

            <Button onClick={handleCreate}>Add Expense</Button>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginTop: 20 }}>
        <CardHeader>Recent spending</CardHeader>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#000" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </DashboardLayout>
  );
}
