import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
import { DashboardSkeleton } from "./components/ui/skeleton";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Expenses = lazy(() => import("./pages/Expenses"));
const AddExpense = lazy(() => import("./pages/AddExpense"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const AddReminder = lazy(() => import("./pages/AddReminder"));
const AlertsPage = lazy(() => import("./pages/AlertsPage"));

function AppFallback() {
  const isAppRoute = !["/", "/login", "/register", "/verify-email"].includes(
    window.location.pathname
  );

  if (isAppRoute) {
    return (
      <DashboardLayout>
        <DashboardSkeleton />
      </DashboardLayout>
    );
  }

  return (
    <main className="route-skeleton" aria-label="Loading page">
      <DashboardSkeleton />
    </main>
  );
}

function App() {

  return (
    <BrowserRouter>
      <Suspense fallback={<AppFallback />}>

        <Routes>

          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses/new"
            element={
              <ProtectedRoute>
                <AddExpense />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route
            path="/reminders/new"
            element={
              <ProtectedRoute>
                <AddReminder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <AlertsPage />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Suspense>

    </BrowserRouter>
  );
}

export default App;
