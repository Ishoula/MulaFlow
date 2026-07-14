import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { CURRENCY } from "@/constants/currency";
import { Skeleton } from "@/components/ui/skeleton";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let fieldError = "";

    if (name === "email") {
      if (!value.trim()) {
        fieldError = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        fieldError = "Please enter a valid email address";
      }
    } else if (name === "password") {
      if (!value) {
        fieldError = "Password is required";
      } else if (value.length < 8) {
        fieldError = "Password must be at least 8 characters";
      } else if (!/[a-z]/.test(value)) {
        fieldError = "Password must include at least one lowercase letter";
      } else if (!/[A-Z]/.test(value)) {
        fieldError = "Password must include at least one uppercase letter";
      } else if (!/[0-9]/.test(value)) {
        fieldError = "Password must include at least one number";
      } else if (!/[!@^*_+\-?]/.test(value)) {
        fieldError = "Password must include at least one symbol (!, @, ^, *, _, +, -, ?)";
      } else if (/['";\-<>{}[\]()|&\\`~#$%=]/.test(value)) {
        fieldError = "Password contains disallowed characters";
      }
    }

    return fieldError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    const fieldError = validateField(name, value);
    setErrors({ ...errors, [name]: fieldError });

    setError("");
  };

  const validateForm = () => {
    const newErrors = {
      email: validateField("email", form.email),
      password: validateField("password", form.password)
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await loginUser(form);
      const { token, name, email } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", email || form.email);

      if (name) {
        localStorage.setItem("name", name);
      } else {
        localStorage.removeItem("name");
      }

      navigate("/dashboard");

    } catch {
      setError("Invalid email or password");
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
          <p className="auth-kicker">Expense clarity</p>
          <h1>Welcome back</h1>
          <p>
            Sign in to track spending, review totals, and keep your financial
            overview close.
          </p>
        </div>

        <div className="auth-metrics" aria-label="MulaFlow summary">
          <div>
            <strong>{CURRENCY}</strong>
            <span>Tracked locally</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>Dashboard access</span>
          </div>
        </div>
      </section>

      <main className="auth-form-wrap">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-header">
            <p className="auth-kicker">Login</p>
            <h2>Access your account</h2>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <label className="auth-field">
            <span>Email address</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </label>

          <label className="auth-field">
            <span>Password</span>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
                className={errors.password ? "input-error" : ""}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="field-error">{errors.password}</p>}
          </label>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? <Skeleton /> : "Sign in"}
          </button>

          <p className="auth-switch">
            New to MulaFlow?
            <button type="button" onClick={() => navigate("/register")}>
              Create an account
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
