import {
	Box,
	Input,
	IconButton,
	FormControl,
	InputAdornment,
} from "@mui/material";

import { AddComment as AddCommentIcon } from "@mui/icons-material";

import { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import Loading from "../components/Loading";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../ThemedApp";

import { fetchAddComment, fetchComments, fetchPostNoti } from "../libs/fetcher";

export default function Comments() {
	const { id } = useParams();
	const { authUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const input = useRef();

	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(true);

	const toggleLike = _id => {
		if (post._id === _id) {
			if (post.likes.includes(authUser._id)) {
				post.likes = post.likes.filter(like => like !== authUser._id);
			} else {
				post.likes.push(authUser._id);
			}
		}

		setPost({ ...post });

		fetchPostNoti("like", post._id);
	};

	const toggleCommentLike = _id => {
		setComments(
			comments.map(comment => {
				if (comment._id === _id) {
					if (comment.likes.includes(authUser._id)) {
						comment.likes = comment.likes.filter(
							like => like !== authUser._id,
						);
					} else {
						comment.likes.push(authUser._id);
					}
				}

				return comment;
			}),
		);

		fetchPostNoti("like", _id);
	};

	useEffect(() => {
		(async () => {
			const post = await fetchComments(id);
			if(!post) return navigate("/error");

			setPost(post);
			setComments(post.comments);
			setLoading(false);
		})();
	}, [id]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Box>
					<PostCard post={post} primary toggleLike={toggleLike} />
					{comments.map(comment => {
						return (
							<PostCard
								post={comment}
								key={comment._id}
								toggleLike={toggleCommentLike}
							/>
						);
					})}

					<Box
						sx={{
							p: 2,
							pb: 3,
							mt: 4,
							bottom: 0,
							position: "sticky",
							bgcolor: "banner.background",
						}}>
						<FormControl fullWidth>
							<form
								onSubmit={e => {
									e.preventDefault();

									(async () => {
										const body = input.current.value;
										if (!body) return false;

										await fetchAddComment(body, id);

										const updatedPost = await fetchComments(
											id,
										);

										setPost(updatedPost);
										setComments(updatedPost.comments);
										fetchPostNoti("comment", id);
									})();
								}}>
								<Input
									inputRef={input}
									sx={{ fontSize: "16px", py: 2 }}
									placeholder="Your comment"
									multiline
									fullWidth
									variant="standard"
									endAdornment={
										<InputAdornment position="end">
											<IconButton type="submit">
												<AddCommentIcon color="info" />
											</IconButton>
										</InputAdornment>
									}
								/>
							</form>
						</FormControl>
					</Box>
				</Box>
			)}
		</>
	);
}
