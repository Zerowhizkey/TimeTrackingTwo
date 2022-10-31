import React from "react";
import { useProjects } from "../context/ProjectContext";

const Tasks = () => {
	const { tasks, currentUser, currentProject } = useProjects();

	return (
		<div>
			<h6>Tasks</h6>
			{tasks ? (
				tasks.map((task) => (
					<ul key={task.id}>
						<li>{task.title}</li>
					</ul>
				))
			) : (
				<p>No tasks</p>
			)}
		</div>
	);
};

export default Tasks;
