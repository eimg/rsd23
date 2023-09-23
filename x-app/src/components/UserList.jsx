import { useContext, useState } from "react";

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
import { fetchPutFollow, fetchPutUnfollow } from "../libs/fetcher";

export default function UserList({ users, title }) {
	const { authUser } = useContext(AuthContext);

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

							{user._id !== authUser._id && (
								<FollowButton user={user} />
							)}
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
}

export function FollowButton({ user }) {
	const { authUser, setAuthUser } = useContext(AuthContext);

	const [followed, setFollowed] = useState(
		authUser.following && authUser.following.includes(user._id),
	);

	return (
		<Button
			size="small"
			edge="end"
			variant={followed ? "outlined" : "contained"}
			sx={{ borderRadius: 5 }}
			onClick={() => {
				if (followed) {
					authUser.following = authUser.following.filter(
						userId => userId !== user._id,
					);
					setAuthUser(authUser);
					fetchPutUnfollow(user._id);
				} else {
					authUser.following.push(user._id);
					setAuthUser(authUser);
					fetchPutFollow(user._id);
				}

				setFollowed(!followed);
			}}>
			{followed ? "Followed" : "Follow"}
		</Button>
	);
}
