import { Card, CardContent } from "@/components/ui/card";

export default function ExpenseStats({ total, highest, monthly }) {
  return (
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
  );
}