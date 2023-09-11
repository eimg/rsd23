import { useContext } from "react";

import { Box, AppBar, Toolbar, IconButton, Badge } from "@mui/material";

import {
	ArrowBack as ArrowBackIcon,
	Notifications as NotificationsIcon,
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext, ThemeContext, NotiContext } from "../ThemedApp";

export default function Header({ toggleDrawer }) {
	const location = useLocation();
	const navigate = useNavigate();

	const { auth } = useContext(AuthContext);
	const { mode, setMode } = useContext(ThemeContext);
	const { notiCount } = useContext(NotiContext);

	const mainPages = ["/", "/login", "/register"];

	return (
		<AppBar
			position="static"
			elevation={2}
			sx={{ mb: 4, bgcolor: "appbar.background" }}>
			<Toolbar>
				{mainPages.includes(location.pathname) ? (
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						sx={{ mr: 2 }}
						onClick={toggleDrawer}>
						<MenuIcon />
					</IconButton>
				) : (
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						onClick={() => {
							navigate(-1);
						}}>
						<ArrowBackIcon />
					</IconButton>
				)}

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexGrow: 1,
					}}></Box>

				{mode === "dark" ? (
					<IconButton onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton onClick={() => setMode("dark")}>
						<DarkModeIcon />
					</IconButton>
				)}

				{auth && (
					<IconButton
						color="inherit"
						onClick={() => {
							navigate("/notis");
						}}>
						<Badge color="error" badgeContent={notiCount}>
							<NotificationsIcon />
						</Badge>
					</IconButton>
				)}
			</Toolbar>
		</AppBar>
	);
}
