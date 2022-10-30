import React, { useState } from "react";
import Projects from "../components/Projects";
import Tasks from "../components/Tasks";

const Overview = () => {
	const [projectsOpen, setProjectsOpen] = useState(true);
	const [tasksOpen, setTasksOpen] = useState(false);

	const handleClickProjects = () => {
		setProjectsOpen(true);
		setTasksOpen(false);
	};

	const handleClickTasks = () => {
		setTasksOpen(true);
		setProjectsOpen(false);
	};
    
	return (
		<div>
			<h4>Overview</h4>
			<div>
				{projectsOpen ? (
					<button onClick={handleClickProjects}>Projects</button>
				) : (
					<button onClick={handleClickProjects}>Projects</button>
				)}
				{projectsOpen ? (
					<button onClick={handleClickTasks}>Tasks</button>
				) : (
					<button onClick={handleClickTasks}>Tasks</button>
				)}
			</div>
			{projectsOpen && <Projects />}
			{tasksOpen && <Tasks />}
		</div>
	);
};

export default Overview;
