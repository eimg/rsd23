import { useState } from "react";
import { Box, Container } from "@mui/material";

import Header from "./components/Header";
import MainDrawer from "./components/MainDrawer";

import { Outlet } from "react-router-dom";

export default function App() {
	const [showDrawer, setShowDrawer] = useState(false);

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};

	return (
		<>
			<Header toggleDrawer={toggleDrawer} />

			<MainDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />

			<Container>
				<Box sx={{ mx: { lg: 20, md: 10 } }}>
					<Outlet />
				</Box>
			</Container>
		</>
	);
}
