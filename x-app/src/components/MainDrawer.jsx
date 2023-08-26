import {
	Box,
	Drawer,
	Avatar,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

import {
	Home as HomeIcon,
	Login as LoginIcon,
	PersonAddAlt as PersonAddAltIcon,
	Person2 as PersonIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../ThemedApp";

export default function MainDrawer({ showDrawer, toggleDrawer }) {
	const navigate = useNavigate();

	const { auth, setAuth } = useContext(AuthContext);

	return (
		<div>
			<Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
				<Box sx={{ width: 300 }}>
					<Box
						sx={{
							height: 180,
							background: "#345",
							display: "flex",
							alignItems: "end",
						}}>
						<Avatar
							sx={{
								width: 98,
								height: 98,
								ml: 3,
								mb: -5,
								background: "#59f",
							}}>
							A
						</Avatar>
					</Box>

					<List sx={{ mt: 10 }}>
						{auth && (
							<>
								<ListItem>
									<ListItemButton
										onClick={() => {
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
											setAuth(false);
											toggleDrawer();
										}}>
										<ListItemIcon>
											<HomeIcon />
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
											// navigate("/login");
											setAuth(true);
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
