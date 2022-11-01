import dayjs from "dayjs";
import React, { useState } from "react";
import { useProjects } from "../context/ProjectContext";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration";

dayjs.extend(customParseFormat);
dayjs.extend(duration);

const Calendar = () => {
	const [inputValue, setInputValue] = useState(null);
	const [inputValueTwo, setInputValueTwo] = useState(null);
	const { times, tasks } = useProjects();

	const handleInput = (e) => {
		const date = dayjs(e.target.value).format("YYYY-MM-DD HH-mm");
		setInputValue(date);
	};

	const handleInputTwo = (e) => {
		const date = dayjs(e.target.value).format("YYYY-MM-DD HH-mm");
		setInputValueTwo(date);
	};

	if (!times || times.length === 0) return <p>No tasks with any time data</p>;
	return (
		<>
			<h4>Calendar</h4>
			<div>
				<div>
					<input type="datetime-local" onChange={handleInput} />
					<input type="datetime-local" onChange={handleInputTwo} />
				</div>
				{tasks.map((task) => {
					const foundTimes = times.filter(
						(time) =>
							dayjs(time.timeStart).format("YYYY-MM-DD HH-mm") >= inputValue &&
							dayjs(time.timeStart).format("YYYY-MM-DD HH-mm") <=
								inputValueTwo &&
							task.id === time.taskId &&
							time.timerStop
					);

					if (foundTimes.length === 0) return;
					return (
						<div key={task.id}>
							<h3>{task.title}</h3>
							{foundTimes.map((time) => (
								<div key={time.id}>
									<p>{time.taskId}</p>

									<p>
										{dayjs
											.duration(time.timerStop - time.timerStart)
											.format("HH:mm:ss")}
									</p>
								</div>
							))}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default Calendar;
