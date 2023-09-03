import { useState, useEffect } from "react";

import {
	Box,
} from "@mui/material";

import { useParams } from "react-router-dom";

import UserList from "../components/UserList";
import { fetchFollowers } from "../libs/fetcher";

export default function Likes() {
	const { id } = useParams();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		(async () => {
			let users = await fetchFollowers(id);
			setUsers(users);
		})();
	}, [id]);

	return (
		<Box>
			<UserList title="Followers" users={users} />
		</Box>
	);
}
