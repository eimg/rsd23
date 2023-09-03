import { useContext } from "react";

import {
	Box,
	Typography,
	List,
	ListItem,
	Avatar,
	ListItemText,
	ListItemAvatar,
	Button,
} from "@mui/material";

import { pink } from "@mui/material/colors";

import { Link } from "react-router-dom";

import { AuthContext } from "../ThemedApp";

export default function UserList({ users, title }) {
	const { authUser } = useContext(AuthContext);

	return (
		<Box>
			<Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
				{title}
			</Typography>
			<List>
				{users.map(user => {
					const followed = authUser.following.includes(user._id);

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

							{user._id !== authUser._id && (
								<Button
									size="small"
									edge="end"
									variant={
										followed ? "outlined" : "contained"
									}
									sx={{ borderRadius: 5 }}>
									{followed ? "Followed" : "Follow"}
								</Button>
							)}
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}
