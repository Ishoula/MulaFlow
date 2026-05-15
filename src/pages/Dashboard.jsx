"use client";

import { useEffect, useState } from "react";
import {
  createExpense,
  deleteExpense,
  getTotalExpenses,
  getHighestExpense,
  getMonthlyTotal,
  getPaginatedExpenses,
} from "@/api/expenseApi";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState("date");
  const [direction, setDirection] = useState("desc");
  const [pageInfo, setPageInfo] = useState({
    totalPages: 1,
    totalElements: 0,
    first: true,
    last: true,
  });

  const [total, setTotal] = useState(0);
  const [highest, setHighest] = useState(null);
  const [monthly, setMonthly] = useState(0);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  const [categoryFilter, setCategoryFilter] = useState("");

  const loadAll = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getPaginatedExpenses(page, size, sortBy, direction);
      const pageContent = Array.isArray(data) ? data : data.content ?? [];

      setExpenses(pageContent);
      setPageInfo({
        totalPages: data.totalPages ?? 1,
        totalElements: data.totalElements ?? pageContent.length,
        first: data.first ?? page === 0,
        last: data.last ?? page >= (data.totalPages ?? 1) - 1,
      });
    } catch (err) {
      console.error("Failed to load expenses", err);
      setExpenses([]);
      setError("Could not connect to the expense API. Make sure the backend is running on port 2727.");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const t = await getTotalExpenses();
      const h = await getHighestExpense();
      const m = await getMonthlyTotal(5, 2026);

      setTotal(t);
      setHighest(h);
      setMonthly(m);
    } catch (err) {
      console.error("Failed to load expense stats", err);
      setTotal(0);
      setHighest(null);
      setMonthly(0);
      setError("Could not connect to the expense API. Make sure the backend is running on port 2727.");
    }
  };

  const handleCreate = async () => {
    try {
      await createExpense(form);
      setForm({ title: "", amount: "", category: "Food", date: "" });
      setPage(0);
      loadAll();
      loadStats();
    } catch (err) {
      console.error("Failed to create expense", err);
      setError("Could not save the expense. Check that the backend is running.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      loadAll();
      loadStats();
    } catch (err) {
      console.error("Failed to delete expense", err);
      setError("Could not delete the expense. Check that the backend is running.");
    }
  };

  const filteredExpenses = categoryFilter
    ? expenses.filter((e) => e.category === categoryFilter)
    : expenses;

  const chartData = expenses.map((e) => ({
    name: e.title,
    amount: e.amount,
  }));

  useEffect(() => {
    loadAll();
  }, [page, size, sortBy, direction]);

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Expense Dashboard</h1>

      {error && (
        <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p>Total Expenses</p>
            <h2 className="text-xl">{total}</h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p>Highest Expense</p>
            <h2 className="text-xl">
              {highest ? highest.amount : 0}
            </h2>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p>Monthly Total</p>
            <h2 className="text-xl">{monthly}</h2>
          </CardContent>
        </Card>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <Input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <Input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
        <Select
          value={form.category}
          onValueChange={(val) => setForm({ ...form, category: val })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </div>

      <Button onClick={handleCreate}>Add Expense</Button>

      {/* FILTER */}
      <div className="flex flex-wrap gap-2 items-center">
        <Select onValueChange={(val) => setCategoryFilter(val)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
            <SelectItem value="Tech">Tech</SelectItem>
            <SelectItem value="Entertainment">Entertainment</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => setCategoryFilter("")}>Clear</Button>
      </div>

      {/* PAGINATION AND SORTING */}
      <div className="flex flex-wrap items-center gap-2">
        <Select value={sortBy} onValueChange={(val) => {
          setSortBy(val);
          setPage(0);
        }}>
          <SelectContent>
            <SelectItem value="date">Sort by date</SelectItem>
            <SelectItem value="amount">Sort by amount</SelectItem>
            <SelectItem value="title">Sort by title</SelectItem>
            <SelectItem value="category">Sort by category</SelectItem>
          </SelectContent>
        </Select>

        <Select value={direction} onValueChange={(val) => {
          setDirection(val);
          setPage(0);
        }}>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={String(size)} onValueChange={(val) => {
          setSize(Number(val));
          setPage(0);
        }}>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-4">
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
              {filteredExpenses.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.title}</TableCell>
                  <TableCell>{e.amount}</TableCell>
                  <TableCell>{e.category}</TableCell>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(e.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {loading && (
            <p className="mt-3 text-sm text-slate-500">Loading expenses...</p>
          )}

          {!loading && filteredExpenses.length === 0 && (
            <p className="mt-3 text-sm text-slate-500">No expenses found.</p>
          )}

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              Page {page + 1} of {pageInfo.totalPages || 1} ({pageInfo.totalElements} expenses)
            </p>

            <div className="flex gap-2">
              <Button
                onClick={() => setPage((current) => Math.max(current - 1, 0))}
                disabled={pageInfo.first || loading}
              >
                Previous
              </Button>
              <Button
                onClick={() => setPage((current) => current + 1)}
                disabled={pageInfo.last || loading}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CHART */}
      <Card>
        <CardContent className="p-4">
          <h2 className="mb-2">Expense Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
