import { useState, useEffect, useContext } from "react";

import {
	Box,
	Avatar,
	Typography,
	Button,
	IconButton,
	Card,
	CardActionArea,
} from "@mui/material";
import { pink } from "@mui/material/colors";

import { Link, useNavigate, useParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

import {
	fetchProfile,
	fetchPostNoti,
	fetchUploadPhoto,
	fetchUploadCover,
} from "../libs/fetcher";
import { AuthContext } from "../ThemedApp";
import { FollowButton } from "../components/UserList";

export default function Profile() {
	const { handle } = useParams();

	const navigate = useNavigate();

	const { authUser } = useContext(AuthContext);

	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	const [photo, setPhoto] = useState("");
	const [cover, setCover] = useState("");

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

			const images = import.meta.env.VITE_IMAGES_URL;
			if(profile.user.photo) {
				setPhoto(`${images}/${profile.user.photo}`);
			}

			if(profile.user.cover) {
				setCover(`${images}/${profile.user.cover}`);
			}

			setLoading(false);
		})();
	}, [handle]);

	const getFile = async () => {
		const [fileHandle] = await window.showOpenFilePicker({
			types: [
				{
					description: "Images",
					accept: {
						"image/*": [".png", ".jpeg", ".jpg"],
					},
				},
			],
			excludeAcceptAllOption: true,
			multiple: false,
		});

		return await fileHandle.getFile();
	};

	const changeCover = async e => {
		if(authUser.handle !== handle) return false;

		const file = await getFile();
		setCover(URL.createObjectURL(file));

		const fileName =
			file.type === "image/png"
				? `${handle}-cover.png`
				: `${handle}-cover.jpg`;

		const formData = new FormData();
		formData.append("cover", file, fileName);
		fetchUploadCover(authUser._id, formData);
	};

	const changePhoto = async e => {
		if (authUser.handle !== handle) return false;

		const file = await getFile();
		setPhoto(URL.createObjectURL(file));

		const fileName =
			file.type === "image/png"
				? `${handle}-photo.png`
				: `${handle}-photo.jpg`;

		const formData = new FormData();
		formData.append("photo", file, fileName);
		fetchUploadPhoto(authUser._id, formData);
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Box>
					<Card>
						<CardActionArea
							sx={{
								bgcolor: "banner.background",
								height: 200,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
							onClick={changeCover}>
							<img src={cover} alt="" style={{ width: "100%" }} />
						</CardActionArea>
					</Card>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							mb: 8,
							mt: -12,
						}}>
						<IconButton onClick={changePhoto}>
							<Avatar
								src={photo}
								sx={{
									background: pink[500],
									width: 128,
									height: 128,
									mb: -6,
								}}>
								{user.name[0]}
							</Avatar>
						</IconButton>
					</Box>

					<Box sx={{ mb: 4, textAlign: "center" }}>
						{authUser.handle === handle ? (
							<Button
								variant="outlined"
								onClick={() => {
									navigate("/edit/profile");
								}}>
								Edit Profile
							</Button>
						) : (
							<FollowButton user={user} />
						)}
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
