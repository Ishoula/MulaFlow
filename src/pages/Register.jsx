import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";
import { Skeleton } from "@/components/ui/skeleton";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await registerUser(form);

      if (res.status < 200 || res.status >= 300 || res.data?.error) {
        throw new Error(res.data?.error || "Registration failed");
      }

      navigate("/login");

    } catch (err) {
      const status = err.response?.status;
      const requestUrl = `${err.config?.baseURL || ""}${err.config?.url || ""}`;
      const fallbackMessage = status
        ? `Registration failed (${status})${requestUrl ? ` at ${requestUrl}` : ""}.`
        : "Registration failed. Check your details and try again.";

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        fallbackMessage
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <section className="auth-panel">
        <button
          className="auth-brand"
          type="button"
          onClick={() => navigate("/")}
        >
          <span>M</span>
          MulaFlow
        </button>

        <div className="auth-copy">
          <p className="auth-kicker">Start tracking</p>
          <h1>Build better money habits</h1>
          <p>
            Create your workspace, capture expenses, and turn daily spending
            into a clearer financial picture.
          </p>
        </div>

        <div className="auth-metrics" aria-label="MulaFlow benefits">
          <div>
            <strong>3</strong>
            <span>Core insights</span>
          </div>
          <div>
            <strong>Fast</strong>
            <span>Expense capture</span>
          </div>
        </div>
      </section>

      <main className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-header">
            <p className="auth-kicker">Sign up</p>
            <h2>Create your account</h2>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <label className="auth-field">
            <span>Full name</span>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

          <label className="auth-field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <Skeleton /> : "Create account"}
          </button>

          <p className="auth-switch">
            Already have an account?
            <button type="button" onClick={() => navigate("/login")}>
              Sign in
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
