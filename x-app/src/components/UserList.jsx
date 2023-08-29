import {
	Box,
	Typography,
	List,
	ListItem,
	Avatar,
	ListItemText,
	ListItemAvatar,
} from "@mui/material";

import { pink } from "@mui/material/colors";

import { Link } from "react-router-dom";

export default function UserList({ users, title }) {
	return (
		<Box>
			<Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
				{title}
			</Typography>
			<List>
				{users.map(user => {
					return (
						<ListItem key={user._id}>
							<ListItemAvatar>
								<Link
									to={`/profile/${user.handle}`}
									style={{ textDecoration: "none" }}>
									<Avatar sx={{ bgcolor: pink[500] }}>
										{user.name[0]}
									</Avatar>
								</Link>
							</ListItemAvatar>
							<ListItemText
								primary={user.name + " @" + user.handle}
								secondary={user.profile}
							/>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
