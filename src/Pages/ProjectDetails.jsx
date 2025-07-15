import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskTags, setTaskTags] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [taskStatus, setTaskStatus] = useState("Backlog");

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const foundProject = storedProjects.find((p) => p.id === Number(id));
    if (!foundProject) {
      alert("Project not found.");
      navigate("/projects");
      return;
    }
    setProject(foundProject);
  }, [id, navigate]);
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName || !taskDesc || !taskDueDate || !taskAssignee) {
      alert("Please fill all required fields.");
      return;
    }
    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDesc,
      tags: taskTags,
      dueDate: taskDueDate,
      assignedUser: taskAssignee,
      status: taskStatus,
    };
    const updatedProject = {
      ...project,
      tasks: [...(project.tasks || []), newTask],
    };
    const allProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const updatedProjects = allProjects.map((proj) =>
      proj.id === updatedProject.id ? updatedProject : proj
    );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setProject(updatedProject);
    setTaskName("");
    setTaskDesc("");
    setTaskTags("");
    setTaskDueDate("");
    setTaskAssignee("");
    setTaskStatus("Backlog");
  };

  if (!project) return null;

  return (
    <>
      <Navbar />

      <div className="project-details">
        <h2>{project.name}</h2>
        <p>{project.desc}</p>

        <hr />



        <h3>Add Task</h3>
        <form className="task-form" onSubmit={handleAddTask}>
          <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)}/>

          <textarea  placeholder="Task Description"  value={taskDesc}  onChange={(e) => setTaskDesc(e.target.value)} ></textarea>

          <input type="text" placeholder="Tags (comma-separated)" value={taskTags} onChange={(e) => setTaskTags(e.target.value)} />

          <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />

          <input type="text" placeholder="Assigned User" value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)}/>

          <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
            <option>Backlog</option>
            <option>In Discussion</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>

          <button type="submit">Add Task</button>
        </form>

        <hr />

        <h3>Tasks</h3>
        <div className="task-list">
          {project.tasks && project.tasks.length > 0 ? (
            project.tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <strong>{task.name}</strong>
                <em>{task.description}</em>
                <span>Tags: {task.tags}</span>
                <span>Due: {task.dueDate}</span>
                <span>Assigned to: {task.assignedUser}</span>
                <span>Status: {task.status}</span>
              </div>
            ))
          ) : (
            <p>No tasks added yet.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default ProjectDetails;