import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    const newUser = { name, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(newUser));
    alert("Account created successfully!");
    navigate("/login");
  };
  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input  type="text"  placeholder="Full Name"  value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input  type="email"  placeholder="Email"  value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input  type="password"  placeholder="Password"  value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Register</button>
        <p className="switch-link" onClick={() => navigate("/login")}>
          Already have an account? <span className="highlight"><b>Login</b></span>
        </p>
      </form>
    </div>
  );
}
export default Register;
