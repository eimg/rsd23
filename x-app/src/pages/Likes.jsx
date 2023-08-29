import { useState, useEffect } from "react";

import {
	Box,
	List,
	Avatar,
	ListItem,
	ListItemText,
	ListItemAvatar,
} from "@mui/material";

import { useParams } from "react-router-dom";

import UserList from "../components/UserList";
import { fetchLikes } from "../libs/fetcher";

export default function Likes() {
	const { id } = useParams();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		(async () => {
			let users = await fetchLikes(id);
			setUsers(users);
		})();
	}, [id]);

	return (
		<Box>
			<UserList title="Likes" users={users} />
		</Box>
	);
}
