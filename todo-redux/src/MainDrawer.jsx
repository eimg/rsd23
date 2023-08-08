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
						<Link to="/" onClick={toggleDrawer()}>
							<ListItem>
								<ListItemButton>
									<ListItemIcon>
										<HomeIcon />
									</ListItemIcon>
									<ListItemText primary="Home" />
								</ListItemButton>
							</ListItem>
						</Link>
						<Link to="/about" onClick={toggleDrawer()}>
							<ListItem>
								<ListItemButton>
									<ListItemIcon>
										<AccountCircleIcon />
									</ListItemIcon>
									<ListItemText primary="About" />
								</ListItemButton>
							</ListItem>
						</Link>
						<Link to="/contact" onClick={toggleDrawer()}>
							<ListItem>
								<ListItemButton>
									<ListItemIcon>
										<MailIcon />
									</ListItemIcon>
									<ListItemText primary="Contact" />
								</ListItemButton>
							</ListItem>
						</Link>
					</List>
				</Box>
			</Drawer>
		</div>
	);
}
