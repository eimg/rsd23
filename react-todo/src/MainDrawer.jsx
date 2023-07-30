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
	AccountCircle as AccountCircleIcon,
	Mail as MailIcon,
 } from "@mui/icons-material";

import { Link } from "react-router-dom";

export default function MainDrawer({ showDrawer, toggleDrawer }) {
	return (
		<div>
			<Drawer anchor="left" open={showDrawer} onClose={toggleDrawer()}>
				<Box sx={{ width: 300 }}>
					<Box
						sx={{
							height: 200,
							background: "pink",
							display: "flex",
							alignItems: "end",
						}}>
						<Avatar sx={{ width: 98, height: 98, ml: 3, mb: -5 }}>
							A
						</Avatar>
					</Box>

					<List sx={{ mt: 10 }}>
						<ListItem>
							<Link to="/">
								<ListItemButton>
									<ListItemIcon>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary="Home" />
								</ListItemButton>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/about">
								<ListItemButton>
									<ListItemIcon>
										<AccountCircleIcon />
									</ListItemIcon>
									<ListItemText primary="About" />
								</ListItemButton>
							</Link>
						</ListItem>
						<ListItem>
							<Link to="/contact">
								<ListItemButton>
									<ListItemIcon>
										<MailIcon />
									</ListItemIcon>
									<ListItemText primary="Contact" />
								</ListItemButton>
							</Link>
						</ListItem>
					</List>
				</Box>
			</Drawer>
		</div>
	);
}
