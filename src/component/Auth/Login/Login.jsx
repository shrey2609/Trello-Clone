import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (!savedUser) {
      setError("No account found. Please register first.");
      return;
    }
    if (savedUser.email === email && savedUser.password === password) {
      localStorage.setItem("user", JSON.stringify({ email }));
      navigate("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>

        <p className="switch-link" onClick={() => navigate("/register")}>
          Don’t have an account? <span className="highlight"><b>Create Account</b></span>
        </p>
      </form>
    </div>
  );
}

export default Login;
