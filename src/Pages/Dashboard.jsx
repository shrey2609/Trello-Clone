import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ newly added
import Navbar from "../component/Navbar/Navbar";
import Project from "../component/Dashboard/Project/Project";
import TaskBoard from "../component/Dashboard/Taskboard/Taskboard";

function Dashboard() {
  const location = useLocation(); // ✅ reads the ?tab param
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const tab = new URLSearchParams(location.search).get("tab");
    if (tab === "tasks") {
      setActiveTab("tasks");
    } else {
      setActiveTab("projects");
    }
  }, [location.search]);

  return (
    <div>
      <Navbar setActiveTab={setActiveTab} />
      <div style={{ padding: "20px" }}>
        {activeTab === "projects" && <Project />}
        {activeTab === "tasks" && <TaskBoard />}
      </div>
    </div>
  );
}

export default Dashboard;
