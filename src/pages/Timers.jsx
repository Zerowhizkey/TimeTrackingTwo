import { useMemo, useRef, useState } from "react";
import { useProjects } from "../context/ProjectContext";
import { v4 as uuid } from "uuid";
import { FaStopCircle, FaPlayCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Timer } from "timer-node";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const Timers = () => {
	const [logTime, setLogTime] = useState(0);
	const {
		currentUser,
		currentProject,
		currentTask,
		setCurrentTask,
		currentTime,
		setCurrentTime,
		tasks,
		times,
		addTime,
		updateTime,
		deleteTime,
	} = useProjects();

	const timer = useRef(new Timer());
	const intervalRef = useRef();

	const activeTask = tasks.find((task) => task.id === currentTask);
	const badTime = times.find((time) => time.timerStop === 0);

	const handleClickAdd = async () => {
		const timeData = {
			id: uuid(),
			userId: currentUser,
			projectId: currentProject,
			taskId: currentTask,
			timerStart: Date.now(),
			timerStop: 0,
		};
		await addTime(timeData);
		timer.current.start();
		startTime();
		setCurrentTime(timeData.id);
	};

	const handleCurrentTask = (e) => {
		if (badTime?.taskId === e.target.value) {
			timer.current.start();
			startTime();
			setCurrentTime(badTime);
		}
		setCurrentTask(e.target.value);
	};

	const handleStop = async (timeData) => {
		await updateTime(currentTime, timeData);
		stopTime();
	};
	// console.log(currentTime);
	const startTime = () => {
		const id = setInterval(() => {
			setLogTime(timer.current.ms());
		}, 100);
		intervalRef.current = id;
	};

	const stopTime = () => {
		timer.current.stop();
		clearInterval(intervalRef.current);
		setLogTime(0);
	};

	const handleClickDelete = async (id) => {
		await deleteTime(id);
	};

	const totalTime = useMemo(() => {
		const filterdTimes = times.filter(
			(time) => time.taskId === currentTask && time.timerStop
		);

		const elapsed = filterdTimes.reduce((sum, curr) => {
			return sum + (curr.timerStop - curr.timerStart);
		}, 0);
		return badTime ? elapsed + (Date.now() - badTime.timerStart) : elapsed;
	}, [times, currentTask]);

	const showTotal = useMemo(() => {
		return dayjs.duration(totalTime + logTime).format("HH:mm:ss");
	}, [totalTime, logTime]);
	return (
		<>
			<div>Timer</div>
			<div>
				{activeTask && (
					<div>
						<p>
							{activeTask.title} {showTotal}
						</p>
					</div>
				)}
				{tasks &&
					tasks.map((task) => {
						const foundTimes = times.filter((time) => task.id === time.taskId);
						return (
							<div key={task.id}>
								<h4>{task.title}</h4>
								<button value={task.id} onClick={handleCurrentTask}>
									Choose me
								</button>
								{currentTask === task.id ? (
									<>
										<div key={task.id}>
											<FaPlayCircle
												onClick={handleClickAdd}
												size={50}
												style={{
													color: " #da22ff",
												}}
											>
												Start
											</FaPlayCircle>
											<FaStopCircle
												onClick={() => handleStop({ timerStop: Date.now() })}
												size={50}
												style={{
													color: " #da22ff",
												}}
											></FaStopCircle>
										</div>
										{foundTimes.map((time) => {
											if (foundTimes)
												return (
													<div key={time.id}>
														<p>
															{dayjs
																.duration(time.timerStop - time.timerStart)
																.format("HH:mm:ss")}
														</p>
														<TiDelete
															size={50}
															style={{
																color: " #da22ff",
															}}
															onClick={() => handleClickDelete(time.id)}
														/>
													</div>
												);
										})}
									</>
								) : (
									<></>
								)}
							</div>
						);
					})}
			</div>
		</>
	);
};
export default Timers;
