import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Root = () => {
	return (
		<>
			<NavLink to={"/"}>Users</NavLink>
			<Outlet />
			<Navbar />
		</>
	);
};

export default Root;
