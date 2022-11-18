import { useReducer } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

export const ProjectContex = createContext();

export const ProjectProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [projects, setProjects] = useState([]);
	const [tasks, setTasks] = useState([]);
	const [times, setTimes] = useState([]);
	const [current, dispatchCurrent] = useReducer(
		(state, action) => {
			const { type, id } = action;
			if (!(type in state)) return state;
			return { ...state, [type]: id };
		},
		{
			user: null,
			project: null,
			task: null,
			time: null,
		}
	);

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
		if (!deleted) return;
		getUser();
		getProject();
		getTask();
		getTime();
	};

	const getProject = async () => {
		if (!current.user) return setProjects([]);
		const data = await api.projects.get();
		const filtProject = data.filter(
			(project) => project.userId === current.user
		);
		setProjects(filtProject);
	};

	const addProject = async (projectData) => {
		await api.projects.post(projectData);
		getProject();
	};

	const deleteProject = async (id) => {
		const deleted = await api.projects.delete(id);
		if (!deleted) return;
		getProject();
		getTask();
		getTime();
	};

	const getTask = async () => {
		if (!current.project) return setTasks([]);
		const data = await api.tasks.get();
		const filtTask = data.filter((task) => task.projectId === current.project);
		setTasks(filtTask);
	};

	const addTask = async (taskData) => {
		await api.tasks.post(taskData);
		getTask();
	};

	const deleteTask = async (id) => {
		const deleted = await api.tasks.delete(id);
		if (!deleted) return;
		getTask();
		getTime();
	};

	const getTime = async () => {
		if (!current.task) return setTimes([]);
		const data = await api.timelogs.get();
		const filtTime = data.filter((time) => time.taskId === current.task);
		setTimes(filtTime);
	};

	const addTime = async (timeData) => {
		await api.timelogs.post(timeData);
		getTime();
	};

	const deleteTime = async (id) => {
		const deleted = await api.timelogs.delete(id);
		if (!deleted) return;
		getTime();
	};

	const updateTime = async (id, timeData) => {
		await api.timelogs.patch(id, timeData);
		getTime();
	};

	useEffect(() => {
		getUser();
	}, []);
	useEffect(() => {
		getProject();
	}, [current.user]);
	useEffect(() => {
		getTask();
	}, [current.project]);
	useEffect(() => {
		getTime();
	}, [current.task]);

	return (
		<ProjectContex.Provider
			value={{
				current,
				dispatchCurrent,
				users,
				addUser,
				deleteUser,
				projects,
				addProject,
				deleteProject,
				tasks,
				addTask,
				deleteTask,
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
