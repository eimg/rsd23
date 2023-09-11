import { useState, useEffect, useContext } from "react";

import { Box, Avatar, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";

import { Link, useParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

import { fetchProfile, fetchPostNoti } from "../libs/fetcher";
import { AuthContext } from "../ThemedApp";
import { FollowButton } from "../components/UserList";

export default function Profile() {
	const { handle } = useParams();

	const { authUser } = useContext(AuthContext);

	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	const toggleLike = _id => {
		setPosts(
			posts.map(post => {
				if (post._id === _id) {
					if (post.likes.includes(authUser._id)) {
						post.likes = post.likes.filter(
							like => like !== authUser._id,
						);
					} else {
						post.likes.push(authUser._id);
					}
				}

				return post;
			}),
		);

		fetchPostNoti("like", _id);
	};

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
							{user.name[0]}
						</Avatar>
					</Box>

					<Box sx={{ mb: 4, textAlign: "center" }}>
						<FollowButton user={user} />
						<Typography sx={{ mb: 1, mt: 2 }}>
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
						return (
							<PostCard
								post={post}
								key={post._id}
								toggleLike={toggleLike}
							/>
						);
					})}
				</Box>
			)}
		</>
	);
}
