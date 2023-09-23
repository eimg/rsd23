import { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";

import PostCard from "../components/PostCard";
import Loading from "../components/Loading";
import { fetchPosts, fetchPostNoti } from "../libs/fetcher";

import { AuthContext } from "../ThemedApp";

import useWebSocket from "../libs/WebSocketClient";

export default function Home() {
	const navigate = useNavigate();

	const { authUser } = useContext(AuthContext);

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const posts = await fetchPosts();
			if (!posts) return navigate("/login");

			setPosts(posts);
			setLoading(false);

			// ! strange behavior !
			// onmessage needed to define
			// after above setPosts
			const wsc = useWebSocket();
			wsc.addEventListener("message", e => {
				const msg = JSON.parse(e.data);
				if (msg.type === "posts") {
					setPosts([msg.post, ...posts]);
				}
			});
		})();
	}, []);

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

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				posts.map(post => {
					return (
						<PostCard
							post={post}
							key={post._id}
							toggleLike={toggleLike}
						/>
					);
				})
			)}
		</>
	);
}
