"use client";

import { useEffect, useState } from "react";
import {
  getAllExpenses,
  createExpense,
  deleteExpense,
  getTotalExpenses,
  getHighestExpense,
  getMonthlyTotal,
} from "@/api/expenseApi";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState([]);

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
    const data = await getAllExpenses();
    setExpenses(data);
  };

  const loadStats = async () => {
    const t = await getTotalExpenses();
    const h = await getHighestExpense();
    const m = await getMonthlyTotal(5, 2026);

    setTotal(t);
    setHighest(h);
    setMonthly(m);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAll();
    loadStats();
  }, []);

  const handleCreate = async () => {
    await createExpense(form);
    setForm({ title: "", amount: "", category: "Food", date: "" });
    loadAll();
    loadStats();
  };

  const handleDelete = async (id) => {
    await deleteExpense(id);
    loadAll();
    loadStats();
  };

  const filteredExpenses = categoryFilter
    ? expenses.filter((e) => e.category === categoryFilter)
    : expenses;

  const chartData = expenses.map((e) => ({
    name: e.title,
    amount: e.amount,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Expense Dashboard</h1>

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
      <div className="flex gap-2 items-center">
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
