import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "../src/pages/Root";
import Users from "../src/pages/Users";
import "./App.css";
import { ProjectProvider } from "./context/ProjectContext";
import Overview from "./pages/Overview";
import Calendar from "./pages/Calendar";
import Timer from "./pages/Timer";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		children: [
			{
				index: true,
				element: <Users />,
			},
			{
				path: "overview",
				element: <Overview />,
			},
			{
				path: "calendar",
				element: <Calendar />,
			},
			{
				path: "timer",
				element: <Timer />,
			},
		],
	},
]);

function App() {
	return (
		<div className="App">
			<ProjectProvider>
				<RouterProvider router={router} />
			</ProjectProvider>
		</div>
	);
}

export default App;