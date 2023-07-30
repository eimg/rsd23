import React from "react";
import ReactDOM from "react-dom/client";
import ThemedApp from "./ThemedApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./About";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ThemedApp />,
	},
	{
		path: "/about",
		element: <About />,
	}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
