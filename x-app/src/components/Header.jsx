import { useContext, useState } from "react";

import { Box, AppBar, Toolbar, IconButton, Badge } from "@mui/material";

import {
	ArrowBack as ArrowBackIcon,
	Notifications as NotificationsIcon,
	PersonSearch as PersonSearchIcon,
	Menu as MenuIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";

import { AuthContext, ThemeContext, NotiContext } from "../ThemedApp";
import Search from "../pages/Search";

export default function Header({ toggleDrawer }) {
	const location = useLocation();
	const navigate = useNavigate();

	const [searchOpen, setSearchOpen] = useState(false);

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

				<IconButton
					sx={{ mr: 1 }}
					onClick={() => {
						setSearchOpen(true);
					}}>
					<PersonSearchIcon />
				</IconButton>

				{mode === "dark" ? (
					<IconButton sx={{ mr: 1 }} onClick={() => setMode("light")}>
						<LightModeIcon />
					</IconButton>
				) : (
					<IconButton sx={{ mr: 1 }} onClick={() => setMode("dark")}>
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

			<Search open={searchOpen} setOpen={setSearchOpen} />
		</AppBar>
	);
}
