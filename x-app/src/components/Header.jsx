import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Badge,
	IconButton,
	Menu,
	MenuItem,
} from "@mui/material";

import {
	Menu as MenuIcon,
	MoreVert as MoreVertIcon,
	LightMode as LightModeIcon,
	DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { useContext, useState } from "react";
import { ThemeContext } from "../ThemedApp";
import { Link } from "react-router-dom";

export default function Header({ toggleDrawer }) {
	const { mode, setMode } = useContext(ThemeContext);
	const [showMenu, setShowMenu] = useState(false);

	return (
		<Box sx={{ flexGrow: 1, mb: 3 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton onClick={toggleDrawer}>
						<MenuIcon />
					</IconButton>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexGrow: 1,
						}}>
					</Box>

					{mode === "dark" ? (
						<IconButton onClick={() => setMode("light")}>
							<LightModeIcon />
						</IconButton>
					) : (
						<IconButton onClick={() => setMode("dark")}>
							<DarkModeIcon />
						</IconButton>
					)}

					<IconButton onClick={e => setShowMenu(e.currentTarget)}>
						<MoreVertIcon />
					</IconButton>

					<Menu
						anchorEl={showMenu}
						open={Boolean(showMenu)}
						onClose={() => setShowMenu(false)}>
						<MenuItem
							onClick={() => {
								setShowMenu(false);
							}}
							sx={{ width: 200 }}>
							Logout
						</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
