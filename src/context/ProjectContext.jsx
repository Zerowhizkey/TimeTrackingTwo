import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/api";

export const ProjectContex = createContext();

export const ProjectProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [projects, setProjects] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [times, setTimes] = useState([]);
	const [currentUser, setCurrentUser] = useState([]);
	const [currentProject, setCurrentProject] = useState([]);
	const [currentTask, setCurrentTask] = useState([]);
	const [currentTime, setCurrentTime] = useState([]);

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
		// console.log(deleted);
		getUser();
	};

	const getProject = async () => {
		const data = await api.projects.get();
		const filtProject = data.filter(
			(project) => project.userId === currentUser
		);
		setProjects(filtProject);
	};

	const addProject = async (projectData) => {
		await api.projects.post(projectData);
		getProject();
	};

	const deleteProject = async (id) => {
		const deleted = await api.projects.delete(id);
		// console.log(deleted);
		getProject();
	};

	const getTask = async () => {
		const data = await api.tasks.get();
		const filtTask = data.filter((task) => task.projectId === currentProject);
		setTasks(filtTask);
	};

	const addTask = async (taskData) => {
		await api.tasks.post(taskData);
		getTask();
	};

	const deleteTask = async (id) => {
		const deleted = await api.tasks.delete(id);
		// console.log(deleted);
		getTask();
	};

	const getTime = async () => {
		const data = await api.timelogs.get();
		const filtTime = data.filter((time) => time.taskId === currentTask);
		setTimes(filtTime);
	};

	const addTime = async (timeData) => {
		await api.timelogs.post(timeData);
		getTime();
	};

	const deleteTime = async (id) => {
		const deleted = await api.timelogs.delete(id);
		// console.log(deleted);
		getTime();
	};

	const updateTime = async (id, timeData) => {
		await api.timelogs.patch(id, timeData);
		getTime();
	};

	useEffect(() => {
		getUser();
		if (currentUser.length !== 0) {
			getProject();
		}
		if (currentProject.length !== 0) {
			getTask();
		}
		if (currentTask.length !== 0) {
			getTime();
		}
	}, [currentUser, currentProject, currentTask]);

	return (
		<ProjectContex.Provider
			value={{
				setCurrentUser,
				currentUser,
				users,
				addUser,
				deleteUser,
				setCurrentProject,
				currentProject,
				projects,
				addProject,
				deleteProject,
				setCurrentTask,
				currentTask,
				tasks,
				addTask,
				deleteTask,
				setCurrentTime,
				currentTime,
				times,
				addTime,
				deleteTime,
				updateTime,
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
