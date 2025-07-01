// src/pages/Register.jsx
import { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const { signUp } = useAuth();
  const navigate   = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  /* ——— handle input ——— */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ——— create account ——— */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password } = form;

    try {
      await signUp(email, password, username.trim());
      navigate("/");                 // go to dashboard (change as needed)
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-card">
      <h2>Create Account</h2>

      <form onSubmit={handleRegister}>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>

      <p className="helper">
        Already have an account? <Link to="/login">Log in here</Link>
      </p>
    </div>
  );
}
