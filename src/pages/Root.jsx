import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box } from "@chakra-ui/react";
const Root = () => {
	return (
		<Box bg="tomato" h="100vh">
			<NavLink to={"/"}>Users</NavLink>
			<Outlet />
			<Navbar />
		</Box>
	);
};

export default Root;
