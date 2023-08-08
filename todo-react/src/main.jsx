import React from "react";
import ReactDOM from "react-dom/client";
import ThemedApp from "./ThemedApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About";
import Contact from "./Contact";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ThemedApp />,
	},
	{
		path: "/about",
		element: <About />,
	},
	{
		path: "/contact",
		element: <Contact />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
