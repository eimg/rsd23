import { useState, useEffect } from "react";

import { Box, Avatar, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

import { Link, useParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

import { fetchProfile } from "../libs/fetcher";

export default function Profile() {
	const { handle } = useParams();

	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const profile = await fetchProfile(handle);
			setPosts(profile.posts);
			setUser(profile.user);
			setLoading(false);
		})();
	}, [handle]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Box>
					<Box
						sx={{
							bgcolor: "banner.background",
							height: 200,
							display: "flex",
							alignItems: "flex-end",
							justifyContent: "center",
							mb: 8,
						}}>
						<Avatar
							sx={{
								background: pink[500],
								width: 128,
								height: 128,
								mb: -6,
							}}>
							A
						</Avatar>
					</Box>
					<Box sx={{ mb: 4, textAlign: "center" }}>
						<Typography sx={{ mb: 1 }}>
							{user.name}
							<Typography
								component="span"
								sx={{ color: "text.fade", ml: 1 }}>
								@{user.handle}
							</Typography>
						</Typography>
						<Typography>
							<Link
								to={`/users/${user._id}/followers`}
								style={{
									textDecoration: "none",
									color: pink[500],
								}}>
								{user.followers.length} Followers
							</Link>
							<Typography component="span" sx={{ ml: 3 }}>
								<Link
									to={`/users/${user._id}/following`}
									style={{
										textDecoration: "none",
										color: pink[500],
									}}>
									{user.following.length} Following
								</Link>
							</Typography>
						</Typography>
					</Box>

					{posts.map(post => {
						return <PostCard post={post} key={post._id} />;
					})}
				</Box>
			)}
		</>
	);
}
