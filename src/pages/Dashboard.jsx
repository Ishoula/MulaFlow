"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createExpense,
  deleteExpense,
  getTotalExpenses,
  getHighestExpense,
  getMonthlyTotal,
  getPaginatedExpenses,
} from "@/api/expenseApi";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CATEGORIES = ["Food", "Transport", "Tech", "Entertainment"];

const getStoredName = () => {
  const storedName = localStorage.getItem("name");

  return storedName && storedName !== "undefined" && storedName !== "null"
    ? storedName
    : "User";
};

const NavLink = ({ children, icon, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "10px 16px",
      borderRadius: 10,
      fontSize: "13px",
      fontWeight: 600,
      color: active ? "white" : "rgba(255,255,255,0.55)",
      background: active ? "rgba(255,255,255,0.08)" : "transparent",
      border: "none",
      cursor: "pointer",
      width: "100%",
      textAlign: "left",
      marginBottom: 4,
    }}
  >
    <span style={{ fontSize: 16 }}>{icon}</span>
    {children}
  </button>
);

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
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState("date");
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

  const [categoryFilter, setCategoryFilter] = useState("");

  const loadExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getPaginatedExpenses(
        page,
        size,
        sortBy,
        direction
      );

      const content = data.content ?? data;

      setExpenses(content || []);
    } catch {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const loadStats = async () => {
    try {
      const now = new Date();

      setTotal(await getTotalExpenses());
      setHighest(await getHighestExpense());

      setMonthly(
        await getMonthlyTotal(
          now.getMonth() + 1,
          now.getFullYear()
        )
      );
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

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      loadExpenses();
      loadStats();
    } catch {
      setError("Failed to delete expense");
    }
  };

  useEffect(() => {
    loadExpenses();
  }, [page, size, sortBy]);

  useEffect(() => {
    loadStats();
  }, []);

  const filtered = categoryFilter
    ? expenses.filter((e) => e.category === categoryFilter)
    : expenses;

  const chartData = expenses.map((e) => ({
    name: e.title?.slice(0, 6),
    amount: e.amount,
  }));

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div className="dash-layout">

      {/* SIDEBAR */}
      <aside className="dash-sidebar">
        <div style={{ padding: 24 }}>
          <h2 style={{ color: "white" }}>MulaFlow</h2>
        </div>

        <nav style={{ padding: 16 }}>
          <NavLink icon="📊" active>
            Dashboard
          </NavLink>

          <NavLink icon="💸">Expenses</NavLink>

          <NavLink icon="⚙️">Settings</NavLink>

          <NavLink icon="🚪" onClick={logout}>
            Logout
          </NavLink>
        </nav>

        <div style={{ padding: 24, color: "white" }}>
          👤 {name}
        </div>
      </aside>

      {/* MAIN */}
      <main className="dash-main">

        {/* HEADER */}
        <div style={{ marginBottom: 30 }}>
          <h1>
            Welcome back, {name}
          </h1>
          <p>Your financial overview</p>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: 20 }}>
            {error}
          </div>
        )}

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            marginBottom: 30,
          }}
        >
          <StatCard
            label="Total"
            value={`KES ${total}`}
            sub="All expenses"
            icon="💰"
          />

          <StatCard
            label="Highest"
            value={`KES ${highest?.amount || 0}`}
            sub={highest?.title || "None"}
            icon="📌"
          />

          <StatCard
            label="Monthly"
            value={`KES ${monthly}`}
            sub="This month"
            icon="📅"
          />
        </div>

        {/* FORM */}
        <Card>
          <CardHeader>Quick Add</CardHeader>
          <CardContent>
            <Input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <Input
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <Button onClick={handleCreate}>
              Add Expense
            </Button>
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card style={{ marginTop: 20 }}>
          <CardHeader>Expenses</CardHeader>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{e.amount}</TableCell>
                  <TableCell>
                    <Badge>{e.category}</Badge>
                  </TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDelete(e.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        {/* CHART */}
        <Card style={{ marginTop: 20 }}>
          <CardHeader>Chart</CardHeader>

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
      </main>
    </div>
  );
}
