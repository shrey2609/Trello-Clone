import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Trello Clone</h2>
      <div className="navbar-links">
        <button onClick={() => navigate("/dashboard")}>Projects</button>
        <button onClick={() => navigate("/taskboard")}>Task Board</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
        
      </div>
    </nav>
  );
}

export default Navbar;
