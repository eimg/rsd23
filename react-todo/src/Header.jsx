import { AppBar, Box, Toolbar, Typography, Badge, Button } from "@mui/material";
import { List as ListIcon } from "@mui/icons-material";

import { useContext } from "react";
import { ThemeContext } from "./ThemedApp";

export default function Header({ count }) {
	const { mode, setMode } = useContext(ThemeContext);

	return (
		<Box sx={{ flexGrow: 1, mb: 3 }}>
			<AppBar position="static">
				<Toolbar>
					<Badge badgeContent={count} color="error" sx={{ mr: 2 }}>
						<ListIcon />
					</Badge>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}>
						Todo App
					</Typography>

					{mode === "dark" ? (
						<Button onClick={() => setMode("light")}>Light</Button>
					) : (
						<Button onClick={() => setMode("dark")}>Dark</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
