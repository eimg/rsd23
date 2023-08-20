import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import PostCard from "../components/PostCard";

const url = "http://localhost:8888/posts";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const res = await fetch(url);
			const data = await res.json();
			setPosts(data);
			setLoading(false);
		})();
	}, []);

	return (
		<>
			{loading ? (
				<Box sx={{textAlign: 'center'}}>Loading...</Box>
			) : (
				posts.map(post => {
					return <PostCard post={post} />;
				})
			)}
		</>
	);
}
