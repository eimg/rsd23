import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import PostCard from "../components/PostCard";

import { useParams } from "react-router-dom";

const url = "http://localhost:8888/posts";

export default function Comments() {
	const { id } = useParams();

	const [post, setPost] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const res = await fetch(`${url}/${id}`);
			const data = await res.json();
			setPost(data);
			setLoading(false);
		})();
	}, []);

	return (
		<>
			{loading ? (
				<Box sx={{ textAlign: "center" }}>Loading...</Box>
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
