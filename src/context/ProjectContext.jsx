import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

export const ProjectContex = createContext();

export const ProjectProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [projects, setProjects] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [timeLogs, setTimeLogs] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);

	// console.log(currentUser, "currentUser");
	// console.log(projects, "Projects");

	const getUser = async () => {
		const data = await api.users.get();
		setUsers(data);
	};

	const addUser = async (userData) => {
		await api.users.post(userData);
		getUser();
	};

	const deleteUser = async (id) => {
		const deleted = await api.users.delete(id);
		console.log(deleted);
		getUser();
	};

	const getProject = async () => {
		if (currentUser) {
			const data = await api.projects.get();
			setProjects(data);
		}
	};
	const getTask = async () => {
		if (currentUser) {
			const data = await api.tasks.get();
			setTasks(data);
		}
	};

	useEffect(() => {
		getUser();
		getProject();
		getTask();
	}, []);

	return (
		<ProjectContex.Provider
			value={{
				users,
				addUser,
				deleteUser,
				setCurrentUser,
				currentUser,
				projects,
				tasks,
			}}
		>
			{children}
		</ProjectContex.Provider>
	);
};

export const useProjects = () => {
	const context = useContext(ProjectContex);
	if (!context) {
		throw new Error("useProjects is outside ProjectProvider");
	}
	return context;
};

// const filtProject = data
// .filter((project) => project.userId === currentUser)
// .map((project) => project);
// const filtProject = projects
// 		.filter((project) => project.userId === currentUser)
// 		.map((project) => project);
