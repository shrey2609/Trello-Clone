import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Auth/Login/Login";
import Register from "./component/Auth/Register/Register";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import ProjectDetails from "./Pages/ProjectDetails";
import TaskBoard from "./component/Dashboard/Taskboard/Taskboard";

function App() {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/projects/:id" element={isLoggedIn ? <ProjectDetails /> : <Navigate to="/login" />} />
      <Route path="/taskboard" element={isLoggedIn ? <TaskBoard /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
