import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Project.css";

function Project() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !desc) {
      setError("Please fill all fields");
      return;
    }
    const newProject = {
      id: Date.now(),
      name,
      desc,
      tasks: [],
    };
    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    setName("");
    setDesc("");
    setError("");
  };

  const goToDetails = (id) => {
    navigate(`/projects/${id}`);
  };
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;
    const updatedProjects = projects.filter((proj) => proj.id !== id);
    setProjects(updatedProjects);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
  };

  return (
    <div className="project">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        {error && <p className="error">{error}</p>}
        <button type="submit">Create</button>
      </form>
      
      <h3>Listed Projects</h3>
      <div className="project-card-list">
        {projects.length > 0 ? (
          projects.map((proj) => (
            <div key={proj.id} className="project-card">
              <h4>{proj.name}</h4>
              <p>{proj.desc}</p>
              <div className="project-buttons">
                <button onClick={() => goToDetails(proj.id)}>View Details</button>
                <button className="delete" onClick={() => handleDelete(proj.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
}

export default Project;
