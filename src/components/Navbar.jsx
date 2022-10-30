import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
	return (
		<div>
			<NavLink to={"overview"}>Overview</NavLink>
			<NavLink to={"calendar"}>Calendar</NavLink>
			<NavLink to={"timer"}>Timer</NavLink>
		</div>
	);
};

export default Navbar;
