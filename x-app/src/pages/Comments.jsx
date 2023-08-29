import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import { fetchComments } from "../libs/fetcher";

export default function Comments() {
	const { id } = useParams();

	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const comments = await fetchComments(id);

			setPost(comments);
			setLoading(false);
		})();
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Box>
					<PostCard post={post} primary />
					{post.comments.map(comment => {
						return <PostCard post={comment} key={comment._id} />;
					})}
				</Box>
			)}
		</>
	);
}
