import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Auth/Login/Login";
import Register from "./component/Auth/Register/Register";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./Pages/NotFound";
import ProjectDetails from "./Pages/ProjectDetails";
import TaskBoard from "./component/Dashboard/Taskboard/Taskboard";
import ProtectedRoute from "./component/Auth/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      <Route path="/projects/:id" element={<ProtectedRoute element={<ProjectDetails />} />} />
      <Route path="/taskboard" element={<ProtectedRoute element={<TaskBoard />} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
