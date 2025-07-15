import React, { useState } from "react";
import Navbar from "../component/Navbar/Navbar";
import Project from "../component/Dashdoard/Project/Project";
import TaskBoard from "../component/Dashdoard/Taskboard/Taskboard";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("projects");

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
