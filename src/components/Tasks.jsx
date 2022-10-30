import React from "react";
import { useProjects } from "../context/ProjectContext";

const Tasks = () => {
	const { tasks, currentUser } = useProjects();

	const filtTasks = tasks
		.filter((task) => task.userId === currentUser)
		.map((task) => task);

	return (
		<div>
			<h6>Tasks</h6>
			{tasks ? (
				filtTasks.map((task) => (
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
