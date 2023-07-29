import { Box, Drawer } from "@mui/material";

export default function MainDrawer({ showDrawer, toggleDrawer }) {
	return (
		<div>
			<Drawer
				anchor="left"
				open={showDrawer}
				onClose={toggleDrawer()}>
				<Box sx={{ width: 250 }}>

				</Box>
			</Drawer>
		</div>
	);
}
