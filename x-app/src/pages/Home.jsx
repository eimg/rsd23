import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import { fetchPosts } from "../libs/fetcher";

export default function Home() {
	const navigate = useNavigate();

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const posts = await fetchPosts();
			if(!posts) return navigate("/login");

			setPosts(posts);
			setLoading(false);
		})();
	}, []);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				posts.map(post => {
					return <PostCard post={post} key={post._id} />;
				})
			)}
		</>
	);
}
