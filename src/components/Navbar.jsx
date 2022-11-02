import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Box } from "@chakra-ui/react";
const Navbar = () => {
	return (
		<Box left="0" bottom="0" position="fixed">
			<Breadcrumb>
				<BreadcrumbItem>
					<BreadcrumbLink as={Link} to="overview">
						Overview
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem>
					<BreadcrumbLink as={Link} to="calendar">
						Calendar
					</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbItem isCurrentPage>
					<BreadcrumbLink as={Link} to="timers">
						Timer
					</BreadcrumbLink>
				</BreadcrumbItem>
			</Breadcrumb>
		</Box>
	);
};

export default Navbar;
