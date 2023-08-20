import { Box, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { blue } from "@mui/material/colors";

import PostCard from "../components/PostCard";

import { useParams } from "react-router-dom";

const url = "http://localhost:8888/users";

export default function Profile() {
	const { handle } = useParams();

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${url}/${handle}`);
			const data = await res.json();
			setPosts(data);
			setLoading(false);
		})();
	}, [handle]);

	return (
		<>
			{loading ? (
				<Box sx={{ textAlign: "center" }}>Loading...</Box>
			) : (
				<Box>
					<Box
						sx={{
							background: "grey",
							height: 200,
							display: "flex",
							alignItems: "flex-end",
							justifyContent: "center",
							mb: 12
						}}>
						<Avatar
							sx={{
								background: blue[500],
								width: 128,
								height: 128,
								mb: -6
							}}>
							A
						</Avatar>
					</Box>

					{posts.map(post => {
						return <PostCard post={post} />;
					})}
				</Box>
			)}
		</>
	);
}
