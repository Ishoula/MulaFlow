import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
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
      await registerUser(form);

      alert("Account created successfully");

      navigate("/login");

    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-2xl w-96 backdrop-blur-xl border border-white/10"
      >
        <h1 className="text-2xl font-bold mb-6">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded bg-black/40 border border-white/10"
          onChange={handleChange}
          required
        />

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

        <button className="w-full bg-white text-black py-3 rounded-xl font-semibold">
          Create Account
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          Already have an account?
          <span
            className="text-white cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {" "}Login
          </span>
        </p>
      </form>
    </div>
  );
}
