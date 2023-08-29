import {
	Box,
	Drawer,
	Avatar,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from "@mui/material";

import {
	Home as HomeIcon,
	Login as LoginIcon,
	PersonAddAlt as PersonAddAltIcon,
	Person2 as PersonIcon,
	Logout as LogoutIcon
} from "@mui/icons-material";

import { grey, pink } from "@mui/material/colors";

import { useNavigate, Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../ThemedApp";

export default function MainDrawer({ showDrawer, toggleDrawer }) {
	const navigate = useNavigate();

	const { auth, authUser, setAuth, setAuthUser } = useContext(AuthContext);

	return (
		<div>
			<Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
				<Box sx={{ width: 300 }}>
					<Box
						sx={{
							p: 3,
							mb: 2,
							height: 200,
							bgcolor: "banner.background",
							display: "flex",
							alignItems: "flex-end",
						}}>
						{auth && (
							<Box sx={{ display: "flex", mb: -8 }}>
								<Avatar
									alt="Profile"
									sx={{
										width: 98,
										height: 98,
										bgcolor: pink[500],
									}}>
									{authUser.name[0]}
								</Avatar>

								<Box sx={{ mt: 3, ml: 2 }}>
									<Typography variant="h6">
										<b>{authUser && authUser.name}</b>
									</Typography>
									<Typography
										variant="body2"
										sx={{ color: grey[400], fontSize: 16 }}>
										@{authUser && authUser.handle}
									</Typography>
								</Box>
							</Box>
						)}
					</Box>

					<List sx={{ mt: 10 }}>
						{auth && (
							<>
								<ListItem>
									<ListItemButton
										onClick={() => {
											navigate("/");
											toggleDrawer();
										}}>
										<ListItemIcon>
											<HomeIcon />
										</ListItemIcon>
										<ListItemText primary="Home" />
									</ListItemButton>
								</ListItem>
								<ListItem>
									<ListItemButton
										onClick={() => {
											navigate(
												`/profile/${authUser.handle}`,
											);
											toggleDrawer();
										}}>
										<ListItemIcon>
											<PersonIcon />
										</ListItemIcon>
										<ListItemText primary="Profile" />
									</ListItemButton>
								</ListItem>
								<ListItem>
									<ListItemButton
										onClick={() => {
											localStorage.clear();

											setAuth(false);
											setAuthUser(null);
											toggleDrawer();

											navigate("/login");
										}}>
										<ListItemIcon>
											<LogoutIcon />
										</ListItemIcon>
										<ListItemText primary="Logout" />
									</ListItemButton>
								</ListItem>
							</>
						)}

						{!auth && (
							<>
								<ListItem>
									<ListItemButton
										onClick={() => {
											navigate("/login");
											toggleDrawer();
										}}>
										<ListItemIcon>
											<LoginIcon />
										</ListItemIcon>
										<ListItemText primary="Login" />
									</ListItemButton>
								</ListItem>
								<ListItem>
									<ListItemButton
										onClick={() => {
											navigate("/register");
											toggleDrawer();
										}}>
										<ListItemIcon>
											<PersonAddAltIcon />
										</ListItemIcon>
										<ListItemText primary="Register" />
									</ListItemButton>
								</ListItem>
							</>
						)}
					</List>
				</Box>
			</Drawer>
		</div>
	);
}
