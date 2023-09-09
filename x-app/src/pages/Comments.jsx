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

import { AuthContext } from "../ThemedApp";

import { fetchAddComment, fetchComments } from "../libs/fetcher";

export default function Comments() {
	const { id } = useParams();
	const { authUser } = useContext(AuthContext);

	const input = useRef();

	const [post, setPost] = useState([]);
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
	};

	useEffect(() => {
		(async () => {
			const comments = await fetchComments(id);

			setPost(comments);
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
					{post.comments.map(comment => {
						return <PostCard post={comment} key={comment._id} />;
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

										await fetchAddComment( body, id );

										const updatedPost = await fetchComments( id );
										setPost(updatedPost);
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
