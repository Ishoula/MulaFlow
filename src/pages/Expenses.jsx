import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteExpense,
  getPaginatedExpenses,
} from "@/api/expenseApi";

import DashboardLayout from "@/components/DashboardLayout";
import { CURRENCY } from "@/constants/currency";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Select, SelectItem } from "@/components/ui/select";
import { TableSkeleton } from "@/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EXPENSE_CATEGORIES } from "@/constants/expenses";

export default function Expenses() {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("");

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  // NEW SORT STATES
  const [sortBy, setSortBy] = useState("date");
  const [direction, setDirection] = useState("desc");

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

      setExpenses(data.content ?? data ?? []);
    } catch {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      loadExpenses();
    } catch {
      setError("Failed to delete expense");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, sortBy, direction]);

  const filtered = useMemo(() => {
    return categoryFilter
      ? expenses.filter(
          (expense) => expense.category === categoryFilter
        )
      : expenses;
  }, [categoryFilter, expenses]);

  return (
    <DashboardLayout>
      <div className="page-header">
        <div>
          <h1>Expenses</h1>
          <p>Review, filter, and manage your spending.</p>
        </div>

        <Button onClick={() => navigate("/expenses/new")}>
          Add expense
        </Button>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <Card>
        <CardHeader>
          <span>All expenses</span>

          <div className="table-actions">

            {/* CATEGORY FILTER */}
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <SelectItem value="">
                All categories
              </SelectItem>

              {EXPENSE_CATEGORIES.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                >
                  {category}
                </SelectItem>
              ))}
            </Select>

            {/* SORT FIELD */}
            <Select
              value={sortBy}
              onChange={(e) => {
                setPage(0);
                setSortBy(e.target.value);
              }}
            >
              <SelectItem value="date">
                Sort by Date
              </SelectItem>

              <SelectItem value="amount">
                Sort by Amount
              </SelectItem>

              <SelectItem value="title">
                Sort by Title
              </SelectItem>

              <SelectItem value="category">
                Sort by Category
              </SelectItem>
            </Select>

            {/* SORT DIRECTION */}
            <Select
              value={direction}
              onChange={(e) => {
                setPage(0);
                setDirection(e.target.value);
              }}
            >
              <SelectItem value="desc">
                Descending
              </SelectItem>

              <SelectItem value="asc">
                Ascending
              </SelectItem>
            </Select>

            {/* PAGE SIZE */}
            <Select
              value={String(size)}
              onChange={(e) => {
                setPage(0);
                setSize(Number(e.target.value));
              }}
            >
              <SelectItem value="5">
                5 rows
              </SelectItem>

              <SelectItem value="10">
                10 rows
              </SelectItem>

              <SelectItem value="20">
                20 rows
              </SelectItem>
            </Select>

          </div>
        </CardHeader>

        {loading ? (
          <TableSkeleton rows={size > 10 ? 8 : size} />
        ) : (
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
              {filtered.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>
                    {expense.title}
                  </TableCell>

                  <TableCell>
                    {CURRENCY} {expense.amount}
                  </TableCell>

                  <TableCell>
                    <Badge>
                      {expense.category}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {expense.date}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleDelete(expense.id)
                      }
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan="5">
                    <div className="empty-state">
                      No expenses found.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      <div className="pagination-row">
        <Button
          variant="ghost"
          disabled={page === 0}
          onClick={() =>
            setPage((current) =>
              Math.max(current - 1, 0)
            )
          }
        >
          Previous
        </Button>

        <span>Page {page + 1}</span>

        <Button
          variant="ghost"
          disabled={expenses.length < size}
          onClick={() =>
            setPage((current) => current + 1)
          }
        >
          Next
        </Button>
      </div>
    </DashboardLayout>
  );
}
