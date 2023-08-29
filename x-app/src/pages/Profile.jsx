import { useState, useEffect } from "react";

import { Box, Avatar } from "@mui/material";
import { pink } from "@mui/material/colors";

import { useParams } from "react-router-dom";

import PostCard from "../components/PostCard";

import { fetchProfile } from "../libs/fetcher";

export default function Profile() {
	const { handle } = useParams();

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const profile = await fetchProfile(handle);
			setPosts(profile);
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
							bgcolor: "banner.background",
							height: 200,
							display: "flex",
							alignItems: "flex-end",
							justifyContent: "center",
							mb: 12
						}}>
						<Avatar
							sx={{
								background: pink[500],
								width: 128,
								height: 128,
								mb: -6
							}}>
							A
						</Avatar>
					</Box>

					{posts.map(post => {
						return <PostCard post={post} key={post._id} />;
					})}
				</Box>
			)}
		</>
	);
}
