import React from "react";
import ReactDOM from "react-dom/client";
import ThemedApp from "./ThemedApp";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import About from "./About";
import Contact from "./Contact";
import Home from "./Home";

import { store } from "./app/store";
import { Provider } from "react-redux";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ThemedApp />,
		children: [
			{
				path: "/",
				element: <Home />
			},
			{
				path: "/about",
				element: <About />,
			},
			{
				path: "/contact",
				element: <Contact />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>,
);
