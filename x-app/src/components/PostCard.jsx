import { useContext } from "react";

import {
	Avatar,
	Box,
	Button,
	ButtonGroup,
	Card,
	CardActionArea,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";

import { green, pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

import { formatRelative, parseISO } from "date-fns";

import { AuthContext } from "../ThemedApp";

import {
	Comment as CommentIcon,
	FavoriteBorderOutlined as LikeIcon,
	Favorite as LikedIcon,
} from "@mui/icons-material";

import { fetchToggleLike } from "../libs/fetcher";

export default function PostCard({ post, primary, toggleLike }) {
	const navigate = useNavigate();

	const { authUser } = useContext(AuthContext);

	return (
		<Card
			sx={{
				mb: primary ? 3 : 1,
				padding: 1,
				border: 1,
				borderColor: "text.fade",
			}}
			variant="outlined">
			<CardActionArea
				onClick={() => {
					navigate(`/comments/${post._id}`);
				}}>
				<CardContent sx={{ display: "flex", p: 2 }}>
					<Box sx={{ mr: 3 }}>
						<Avatar
							alt="Profile Picture"
							sx={{
								width: 64,
								height: 64,
								bgcolor: primary ? green[500] : pink[500],
							}}>
							{post.user.name.charAt(0)}
						</Avatar>
					</Box>
					<Box>
						<Box sx={{ mb: 1 }}>
							<Typography sx={{ mr: 1 }} component="span">
								<b>{post.user.name}</b>
							</Typography>

							<Typography component="span" sx={{ color: "grey" }}>
								@{post.user.handle}
							</Typography>

							<Typography
								component="span"
								sx={{
									ml: 1,
									color: primary ? green[500] : pink[400],
								}}>
								<small>
									{formatRelative(
										parseISO(post.created),
										new Date(),
									)}
								</small>
							</Typography>
						</Box>

						<Typography
							variant="subtitle1"
							color="text.secondary"
							sx={{ fontSize: primary ? 21 : 18 }}>
							{post.body}
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>

			<Box
				sx={{ display: "flex", justifyContent: "space-around", mb: 1 }}>
				<ButtonGroup variant="text">
					<IconButton onClick={() => {
						toggleLike(post._id);
						fetchToggleLike(post._id);
					}}>
						{post.likes.includes(authUser._id) ? (
							<LikedIcon color="error" />
						) : (
							<LikeIcon color="error" />
						)}
					</IconButton>
					<Button
						onClick={() => {
							navigate(`/likes/${post._id}`);
						}}>
						{post.likes.length}
					</Button>
				</ButtonGroup>
				<ButtonGroup variant="text">
					<IconButton>
						<CommentIcon color="success" />
					</IconButton>
					<Button>{0}</Button>
				</ButtonGroup>
			</Box>
		</Card>
	);
}
