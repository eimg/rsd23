import { useState, useContext } from "react";

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
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
} from "@mui/material";

import { green, pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

import { formatRelative, parseISO } from "date-fns";

import { AuthContext } from "../ThemedApp";

import {
	Comment as CommentIcon,
	FavoriteBorderOutlined as LikeIcon,
	Favorite as LikedIcon,
	MoreVert as MoreVertIcon,
	Delete as DeleteIcon,
} from "@mui/icons-material";

import { fetchToggleLike } from "../libs/fetcher";

export default function PostCard({ post, primary, toggleLike }) {
	const navigate = useNavigate();

	const { authUser } = useContext(AuthContext);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const profilePhoto = post.user.photo
		? `${import.meta.env.VITE_IMAGES_URL}/${post.user.photo}`
		: null;

	return (
		<Card
			sx={{
				mb: primary ? 3 : 1,
				padding: 1,
				border: 1,
				borderColor: "text.fade",
			}}
			variant="outlined">
			<Box sx={{ display: "flex", mb: -3 }}>
				<Box sx={{ flexGrow: 1 }}></Box>
				<IconButton onClick={handleClick}>
					<MoreVertIcon fontSize="small" />
				</IconButton>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
					<MenuItem onClick={handleClose}>
						<ListItemIcon>
							<DeleteIcon color="error" />
						</ListItemIcon>
						<ListItemText>Delete</ListItemText>
					</MenuItem>
				</Menu>
			</Box>

			<CardContent sx={{ display: "flex", p: 2 }}>
				<Box sx={{ mr: 3 }}>
					<IconButton
						onClick={() => {
							navigate(`/profile/${post.user.handle}`);
						}}>
						<Avatar
							alt="Profile Picture"
							src={profilePhoto}
							sx={{
								width: 64,
								height: 64,
								bgcolor: primary ? green[500] : pink[500],
							}}>
							{post.user.name.charAt(0)}
						</Avatar>
					</IconButton>
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
					<CardActionArea
						onClick={() => {
							navigate(`/comments/${post._id}`);
						}}>
						<Typography
							variant="subtitle1"
							color="text.secondary"
							sx={{ fontSize: primary ? 21 : 18 }}>
							{post.body}
						</Typography>
					</CardActionArea>
				</Box>
			</CardContent>

			<Box
				sx={{ display: "flex", justifyContent: "space-around", mb: 1 }}>
				<ButtonGroup variant="text">
					<IconButton
						onClick={() => {
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
					<IconButton
						onClick={() => {
							navigate(`/comments/${post._id}`);
						}}>
						<CommentIcon color="success" />
					</IconButton>
					<Button>{post.comments.length}</Button>
				</ButtonGroup>
			</Box>
		</Card>
	);
}
