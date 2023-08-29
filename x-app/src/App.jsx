import { useState, useContext } from "react";
import { Box, Container, Snackbar, Alert, Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import Header from "./components/Header";
import MainDrawer from "./components/MainDrawer";
import Loading from "./components/Loading";
import { UIContext } from "./ThemedApp";

import { Outlet, useNavigate, useLocation } from "react-router-dom";

export default function App() {
	const { snackbarOpen, setSnackbarOpen, snackMessage, isLoading } =
		useContext(UIContext);

	const [showDrawer, setShowDrawer] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const toggleDrawer = () => {
		setShowDrawer(!showDrawer);
	};

	return (
		<>
			<Header toggleDrawer={toggleDrawer} />

			{isLoading && <Loading />}

			<MainDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />
			<Container>
				<Box sx={{ mx: { lg: 20, md: 10 } }}>
					<Outlet />
				</Box>
			</Container>

			{location.pathname === "/" && (
				<Fab
					color="success"
					sx={{
						position: "fixed",
						bottom: "40px",
						right: "40px",
					}}
					onClick={() => {
						navigate("/posts/add");
					}}>
					<AddIcon />
				</Fab>
			)}

			<Snackbar
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={snackbarOpen}
				autoHideDuration={5000}
				onClose={() => setSnackbarOpen(false)}>
				<Alert severity="success">{snackMessage}</Alert>
			</Snackbar>
		</>
	);
}
