function ProjectCard({ project }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "16px", margin: "10px" }}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <p><b>Tech:</b> {project.tech_stack}</p>
      <a href={project.github_link} target="_blank">GitHub</a>
    </div>
  );
}

export default ProjectCard;
