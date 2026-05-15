"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createExpense,
  deleteExpense,
  getTotalExpenses,
  getHighestExpense,
  getMonthlyTotal,
  getPaginatedExpenses,
} from "@/api/expenseApi";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CATEGORIES = ["Food", "Transport", "Tech", "Entertainment"];

const catColor = {
  Food: { bg: "#FEF3C7", color: "#92400E" },
  Transport: { bg: "#DBEAFE", color: "#1E40AF" },
  Tech: { bg: "#EDE9FE", color: "#5B21B6" },
  Entertainment: { bg: "#FCE7F3", color: "#9D174D" },
};

const NavLink = ({ children, icon, href, active }) => (
  <a
    href={href || "#"}
    style={{
      display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
      borderRadius: 10, fontSize: "13px", fontWeight: 600, 
      color: active ? "white" : "rgba(255,255,255,0.55)",
      background: active ? "rgba(255,255,255,0.08)" : "transparent",
      textDecoration: "none", transition: "all 0.2s",
      marginBottom: "4px"
    }}
    onMouseEnter={e => { if(!active) { e.currentTarget.style.color = "white"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}}
    onMouseLeave={e => { if(!active) { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "transparent"; }}}
  >
    <span style={{ fontSize: "16px" }}>{icon}</span>
    {children}
  </a>
);

const StatCard = ({ label, value, sub, icon, trend }) => (
  <Card className="anim-fade-up">
    <CardContent>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)" }}>{label}</span>
        <div style={{
          width: "38px", height: "38px", borderRadius: "12px", background: "var(--ink)",
          color: "white", display: "grid", placeItems: "center", fontSize: "18px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
        }}>{icon}</div>
      </div>
      <div style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "8px" }}>{value}</div>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {trend && (
          <span style={{ 
            fontSize: "11px", fontWeight: 700, 
            color: trend.startsWith("+") ? "#059669" : "#DC2626",
            background: trend.startsWith("+") ? "rgba(5,150,105,0.1)" : "rgba(220,38,38,0.1)",
            padding: "2px 6px", borderRadius: "4px"
          }}>
            {trend}
          </span>
        )}
        <span style={{ fontSize: "12px", color: "var(--ink-muted)" }}>{sub}</span>
      </div>
    </CardContent>
  </Card>
);

export default function ExpenseDashboard() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sortBy, setSortBy] = useState("date");
  const [direction, setDirection] = useState("desc");
  const [pageInfo, setPageInfo] = useState({ totalPages: 1, totalElements: 0, first: true, last: true });
  const [total, setTotal] = useState(0);
  const [highest, setHighest] = useState(null);
  const [monthly, setMonthly] = useState(0);
  const [form, setForm] = useState({ title: "", amount: "", category: "Food", date: new Date().toISOString().split('T')[0] });
  const [categoryFilter, setCategoryFilter] = useState("");

  const loadAll = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getPaginatedExpenses(page, size, sortBy, direction);
      const pageContent = Array.isArray(data) ? data : data.content ?? [];
      setExpenses(pageContent);
      setPageInfo({ totalPages: data.totalPages ?? 1, totalElements: data.totalElements ?? pageContent.length, first: data.first ?? page === 0, last: data.last ?? page >= (data.totalPages ?? 1) - 1 });
    } catch {
      setExpenses([]);
      setError("Could not connect to the expense API. Make sure the backend is running.");
    } finally { setLoading(false); }
  };

  const loadStats = async () => {
    try {
      setTotal(await getTotalExpenses());
      setHighest(await getHighestExpense());
      setMonthly(await getMonthlyTotal(5, 2026));
    } catch {
      setTotal(0); setHighest(null); setMonthly(0);
    }
  };

  const handleCreate = async () => {
    if (!form.title || !form.amount || !form.date) return;
    try {
      await createExpense(form);
      setForm({ title: "", amount: "", category: "Food", date: new Date().toISOString().split('T')[0] });
      setPage(0);
      loadAll(); loadStats();
    } catch { setError("Could not save the expense."); }
  };

  const handleDelete = async (id) => {
    try { await deleteExpense(id); loadAll(); loadStats(); }
    catch { setError("Could not delete the expense."); }
  };

  const filteredExpenses = categoryFilter ? expenses.filter(e => e.category === categoryFilter) : expenses;
  const chartData = expenses.map(e => ({ name: e.title?.slice(0, 8), amount: e.amount }));

  useEffect(() => { loadAll(); }, [page, size, sortBy, direction]);
  useEffect(() => { loadStats(); }, []);

  return (
    <div className="dash-layout">
      {/* ── SIDEBAR ───────────────────────── */}
      <aside className="dash-sidebar">
        <div style={{ padding: "0 24px 32px" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px", background: "white",
              color: "var(--ink)", display: "grid", placeItems: "center", fontWeight: 900, fontSize: "16px",
            }}>M</div>
            <span style={{ fontWeight: 800, fontSize: "18px", color: "white", letterSpacing: "-0.02em" }}>MulaFlow</span>
          </Link>
        </div>

        <nav style={{ padding: "0 16px", flex: 1 }}>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", padding: "0 16px", marginBottom: "12px" }}>Overview</div>
          <NavLink icon="📊" active>Dashboard</NavLink>
          <NavLink icon="💸">Expenses</NavLink>
          <NavLink icon="📁">Categories</NavLink>
          <NavLink icon="📈">Reports</NavLink>

          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", padding: "24px 16px 12px" }}>System</div>
          <NavLink icon="⚙️">Settings</NavLink>
          <NavLink icon="👤">Profile</NavLink>
          <NavLink icon="🏠" href="/">Exit to Home</NavLink>
        </nav>

        <div style={{ padding: "24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#C9973A", border: "2px solid rgba(255,255,255,0.1)" }}></div>
            <div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "white" }}>Ishoula</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>Pro Member</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ──────────────────────────── */}
      <main className="dash-main">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: 900, margin: "0 0 6px", letterSpacing: "-0.03em" }}>Welcome back, Ishoula</h1>
            <p style={{ fontSize: "14px", color: "var(--ink-muted)", margin: 0 }}>Here's what's happening with your money today.</p>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <Button variant="ghost">Export PDF</Button>
            <Button>+ New Expense</Button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="anim-fade-in" style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: "12px", padding: "14px 20px", fontSize: "14px", color: "#B91C1C", marginBottom: "32px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "40px" }}>
          <StatCard label="Total Expenses" value={`KES ${Number(total).toLocaleString()}`} sub="from last month" icon="💰" trend="+12%" />
          <StatCard label="Highest Expense" value={`KES ${highest ? Number(highest.amount).toLocaleString() : 0}`} sub={highest?.title || "No data"} icon="📌" />
          <StatCard label="Monthly Total" value={`KES ${Number(monthly).toLocaleString()}`} sub="May 2026" icon="📅" trend="-4%" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "24px", alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Table Panel */}
            <Card>
              <CardHeader>
                <span>Recent Transactions</span>
                <span style={{ fontSize: "12px", color: "var(--ink-muted)", fontWeight: 400 }}>{pageInfo.totalElements} records found</span>
              </CardHeader>
              <div style={{ overflowX: "auto" }}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead style={{ textAlign: "right" }}>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExpenses.map(e => (
                      <TableRow key={e.id}>
                        <TableCell style={{ fontWeight: 600 }}>{e.title}</TableCell>
                        <TableCell style={{ fontWeight: 800 }}>KES {Number(e.amount).toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={e.category}>
                            {e.category}
                          </Badge>
                        </TableCell>
                        <TableCell style={{ color: "var(--ink-muted)", fontSize: "12px" }}>{e.date}</TableCell>
                        <TableCell style={{ textAlign: "right" }}>
                          <Button variant="danger" onClick={() => handleDelete(e.id)}>Delete</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div style={{ padding: "16px 24px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                   <span style={{ fontSize: "13px", color: "var(--ink-muted)" }}>Show</span>
                   <Select value={String(size)} onValueChange={val => { setSize(Number(val)); setPage(0); }} style={{ width: "70px", padding: "6px 10px" }}>
                     <SelectItem value="5">5</SelectItem>
                     <SelectItem value="10">10</SelectItem>
                     <SelectItem value="20">20</SelectItem>
                   </Select>
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button variant="ghost" onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={pageInfo.first || loading}>Prev</Button>
                  <Button variant="ghost" onClick={() => setPage(p => p + 1)} disabled={pageInfo.last || loading}>Next</Button>
                </div>
              </div>
            </Card>

            {/* Form Panel */}
            <Card>
              <CardHeader>Quick Add</CardHeader>
              <CardContent>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Description</label>
                    <Input placeholder="What did you buy?" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Amount (KES)</label>
                    <Input type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Category</label>
                    <Select value={form.category} onValueChange={val => setForm({ ...form, category: val })}>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </Select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", marginBottom: "8px", textTransform: "uppercase" }}>Date</label>
                    <Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                  </div>
                </div>
                <Button style={{ width: "100%", height: "46px", fontSize: "15px" }} onClick={handleCreate}>Confirm Transaction</Button>
              </CardContent>
            </Card>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Chart Panel */}
            <Card>
              <CardHeader>Visual Analytics</CardHeader>
              <CardContent style={{ padding: "24px 12px 12px" }}>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(10,10,10,0.05)" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                    <Bar dataKey="amount" fill="var(--ink)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Filters Card */}
            <Card>
              <CardHeader>Quick Filters</CardHeader>
              <CardContent style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", marginBottom: "6px", textTransform: "uppercase" }}>Sort by</label>
                  <Select value={sortBy} onValueChange={val => { setSortBy(val); setPage(0); }}>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="amount">Amount</SelectItem>
                    <SelectItem value="title">Description</SelectItem>
                  </Select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "var(--ink-muted)", marginBottom: "6px", textTransform: "uppercase" }}>Category</label>
                  <Select value={categoryFilter} onValueChange={val => setCategoryFilter(val)}>
                    <SelectItem value="">All Categories</SelectItem>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </Select>
                </div>
                <Button variant="ghost" style={{ marginTop: "8px" }} onClick={() => { setCategoryFilter(""); setSortBy("date"); setDirection("desc"); }}>Reset All</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
