import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import ThemedApp from "./ThemedApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
import Likes from "./pages/Likes";
import Add from "./pages/Add";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import Notis from "./pages/Notis";
import Error from "./pages/Error";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ThemedApp />,
		errorElement: <Error />,
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
				element: <Profile />,
			},
			{
				path: "/comments/:id",
				element: <Comments />,
			},
			{
				path: "/likes/:id",
				element: <Likes />,
			},
			{
				path: "/posts/add",
				element: <Add />,
			},
			{
				path: "/users/:id/followers",
				element: <Followers />,
			},
			{
				path: "/users/:id/following",
				element: <Following />,
			},
			{
				path: "/notis",
				element: <Notis />,
			},
			{
				path: "/error",
				element: <Error />
			}
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
