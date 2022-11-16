import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import { v4 as uuid } from "uuid";
const Tasks = () => {
	const [title, setTitle] = useState("");
	const { tasks, addTask, deleteTask, current, dispatchCurrent } =
		useProjects();

	const handleTask = (e) => {
		dispatchCurrent({ type: "task", id: e.target.value });
	};

	const handleAddTask = async () => {
		const taskData = {
			id: uuid(),
			userId: current.user,
			projectId: current.project,
			title: title,
		};
		await addTask(taskData);
	};

	return (
		<div>
			<h6>Projects</h6>
			{tasks ? (
				tasks.map((task) => (
					<ul key={task.id}>
						<li>
							<input
								type="radio"
								value={task.id}
								onChange={handleTask}
								checked={task.id === current.task}
							/>
							{task.title}
							<button onClick={() => deleteTask(task.id)}>X</button>
						</li>
					</ul>
				))
			) : (
				<p>No tasks</p>
			)}
			<div>
				<p>Add a task</p>
				<input
					type="text"
					// value={name}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button onClick={handleAddTask}>Add</button>
			</div>
		</div>
	);
};

export default Tasks;
