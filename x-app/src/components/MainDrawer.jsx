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

export default function MainDrawer({ showDrawer, toggleDrawer }) {
	const navigate = useNavigate();

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
						<ListItem>
							<ListItemButton
								onClick={() => {
									navigate("/profile/alice");
									toggleDrawer();
								}}>
								<ListItemIcon>
									<PersonIcon />
								</ListItemIcon>
								<ListItemText primary="Alice" />
							</ListItemButton>
						</ListItem>
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
					</List>
				</Box>
			</Drawer>
		</div>
	);
}
