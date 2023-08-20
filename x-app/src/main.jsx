import React from "react";
import ReactDOM from "react-dom/client";
import ThemedApp from "./ThemedApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ThemedApp />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
			{
				path: "/profile/:handle",
				element: <Profile />
			},
			{
				path: "/comments/:id",
				element: <Comments />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
