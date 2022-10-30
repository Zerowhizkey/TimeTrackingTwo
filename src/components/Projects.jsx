import React from "react";
import { useProjects } from "../context/ProjectContext";

const Projects = () => {
	const { projects, currentUser } = useProjects();

	const filtProjects = projects
		.filter((project) => project.userId === currentUser)
		.map((project) => project);

	return (
		<div>
			<h6>Projects</h6>
			{projects ? (
				filtProjects.map((project) => (
					<ul key={project.id}>
						<li>{project.name}</li>
					</ul>
				))
			) : (
				<p>No projects</p>
			)}
		</div>
	);
};

export default Projects;
