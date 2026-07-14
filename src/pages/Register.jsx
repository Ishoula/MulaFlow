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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateField = (name, value) => {
    let fieldError = "";

    if (name === "name") {
      if (!value.trim()) {
        fieldError = "Name is required";
      } else if (value.trim().length < 2) {
        fieldError = "Name must be at least 2 characters";
      }
    } else if (name === "email") {
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

    // Validate the field as the user types
    const fieldError = validateField(name, value);
    setErrors({ ...errors, [name]: fieldError });

    // Clear general error when user starts typing
    setError("");
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField("name", form.name),
      email: validateField("email", form.email),
      password: validateField("password", form.password)
    };

    setErrors(newErrors);

    // Check if there are any errors
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

      const res = await registerUser(form);

      if (res.status < 200 || res.status >= 300 || res.data?.error) {
        throw new Error(res.data?.error || "Registration failed");
      }

      navigate(`/verify-email?email=${encodeURIComponent(form.email)}`);

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
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
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
                placeholder="Create a password (min 8 chars, mixed case, number, symbol !@^*_+-?)"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
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
            <div className="password-rules mt-2">
              <p className="text-xs text-gray-600 mb-1 font-semibold">Password requirements:</p>
              <ul className="text-xs space-y-1">
                <li className={/[a-z]/.test(form.password) ? "text-green-600" : "text-gray-500"}>
                  <span className="mr-1">{/[a-z]/.test(form.password) ? "✓" : "○"}</span>
                  At least one lowercase letter
                </li>
                <li className={/[A-Z]/.test(form.password) ? "text-green-600" : "text-gray-500"}>
                  <span className="mr-1">{/[A-Z]/.test(form.password) ? "✓" : "○"}</span>
                  At least one uppercase letter
                </li>
                <li className={/[0-9]/.test(form.password) ? "text-green-600" : "text-gray-500"}>
                  <span className="mr-1">{/[0-9]/.test(form.password) ? "✓" : "○"}</span>
                  At least one number
                </li>
                <li className={/[!@^*_+\-?]/.test(form.password) ? "text-green-600" : "text-gray-500"}>
                  <span className="mr-1">{/[!@^*_+\-?]/.test(form.password) ? "✓" : "○"}</span>
                  At least one symbol (!, @, ^, *, _, +, -, ?)
                </li>
                <li className={form.password.length >= 8 ? "text-green-600" : "text-gray-500"}>
                  <span className="mr-1">{form.password.length >= 8 ? "✓" : "○"}</span>
                  At least 8 characters long
                </li>
                <li className={!/['";\-<>{}[\]()|&\\`~#$%=]/.test(form.password) && form.password ? "text-green-600" : "text-gray-500"}>
                  <span className="mr-1">{!/['";\-<>{}[\]()|&\\`~#$%=]/.test(form.password) && form.password ? "✓" : "○"}</span>
                  No disallowed characters
                </li>
              </ul>
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
