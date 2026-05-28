import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-2xl w-96 backdrop-blur-xl border border-white/10"
      >
        <h1 className="text-2xl font-bold mb-6">Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-black/40 border border-white/10"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded bg-black/40 border border-white/10"
          onChange={handleChange}
          required
        />

        <button
          className="w-full bg-white text-black py-3 rounded-xl font-semibold"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-gray-400 mt-4 text-center">
  Don't have an account?
  <span
    className="text-white cursor-pointer"
    onClick={() => navigate("/register")}
  >
    {" "}Register
  </span>
</p>
    </div>
  );
}
