import React, { useEffect, useState } from "react";
import "./Taskboard.css";


function TaskBoard() {
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const collectedTasks = [];
    storedProjects.forEach((project) => {
      (project.tasks || []).forEach((task) => {
        collectedTasks.push({...task,
          projectName: project.name,
          status: task.status || "Backlog",
        });
      });
    });
    setAllTasks(collectedTasks);
  }, []);
  const renderColumn = (status) => {
    const filtered = allTasks.filter((task) => task.status === status);
    return (
      <div className="task-column">
        <h3>{status}</h3>
        {filtered.length > 0 ? (
          filtered.map((task) => (
            <div key={task.id} className="task-card">
              <strong>{task.name}</strong>
              <p className="project-label">Project: {task.projectName}</p>
            </div>
          ))
        ) : (
          <p className="no-tasks">No tasks</p>
        )}
      </div>
    );
  };

  return (
    
    <>
    <div className="backgd">
      <div className="task-board">
        <h2>Task Board</h2>
        <div className="task-columns">
          {renderColumn("Backlog")}
          {renderColumn("In Discussion")}
          {renderColumn("In Progress")}
          {renderColumn("Done")}
        </div>
      </div>
      </div>
    </>
  );
}

export default TaskBoard;
