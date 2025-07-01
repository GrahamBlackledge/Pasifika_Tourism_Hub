import { useState } from "react";
import { useAuth } from "../components/context/AuthContext";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password);
      alert("Logged in successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="login-card">
      <h2>Log In</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <button onClick={handleLogin}>Login</button>
      <Link to={"/register"}>Click here to sign up</Link>
    </div>
  );
}
