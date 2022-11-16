import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { useProjects } from "../context/ProjectContext";

const Projects = () => {
	const [name, setName] = useState("");
	const [color, setColor] = useState("");

	const { current, dispatchCurrent, projects, addProject, deleteProject } =
		useProjects();

	const handleAddProject = async () => {
		const projectData = {
			id: uuid(),
			userId: current.user,
			name: name,
			color: color,
		};
		await addProject(projectData);
	};

	const handleProject = (e) => {
		dispatchCurrent({ type: "project", id: e.target.value });
	};

	return (
		<div>
			<h6>Projects</h6>
			{projects ? (
				projects.map((project) => (
					<ul key={project.id}>
						<li>
							<input
								type="radio"
								value={project.id}
								onChange={handleProject}
								checked={project.id === current.project}
							/>
							{project.name}
							<button onClick={() => deleteProject(project.id)}>X</button>
						</li>
					</ul>
				))
			) : (
				<p>No projects</p>
			)}
			<div>
				<p>Add a project</p>
				<input
					type="text"
					// value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input type="color" onChange={(e) => setColor(e.target.value)} />
				<button onClick={handleAddProject}>Add</button>
			</div>
		</div>
	);
};

export default Projects;
