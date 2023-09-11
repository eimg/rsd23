import { TokenRounded } from "@mui/icons-material";

const api = "http://localhost:8888";

export function getToken() {
	return localStorage.getItem("token") || null;
}

export async function fetchRegister(name, handle, profile, password) {
	const res = await fetch(`${api}/users`, {
		method: "post",
		body: JSON.stringify({
			name,
			handle,
			profile,
			password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});

	return res.ok;
}

export async function fetchLogin(handle, password) {
	const res = await fetch(`${api}/login`, {
		method: "post",
		body: JSON.stringify({ handle, password }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!res.ok) return false;

	const { token, user } = await res.json();
	localStorage.setItem("token", token);

	return user;
}

export async function fetchVerify() {
	const token = getToken();

	const res = await fetch(`${api}/verify`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) return false;

	return await res.json();
}

export async function fetchPosts() {
	const token = getToken();

	const res = await fetch(`${api}/posts`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if (!res.ok) return false;

	return await res.json();
}

export async function fetchAddPost(body) {
	const token = getToken();
	const res = await fetch(`${api}/posts`, {
		method: "post",
		body: JSON.stringify({ body }),
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	return res.ok;
}

export async function fetchAddComment(body, origin) {
	const token = getToken();
	const res = await fetch(`${api}/posts/${origin}/comment`, {
		method: "post",
		body: JSON.stringify({ body }),
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});

	return res.ok;
}

export async function fetchComments(id) {
	const res = await fetch(`${api}/posts/${id}`);
	if (!res.ok) return false;

	return await res.json();
}

export async function fetchProfile(handle) {
	const res = await fetch(`${api}/users/${handle}`);
	if (!res.ok) return false;

	return await res.json();
}

export async function fetchLikes(id) {
	const res = await fetch(`${api}/posts/${id}`);
	if (!res.ok) return [];

	const post = await res.json();
	return post.liked_users || [];
}

export async function fetchFollowers(id) {
	const res = await fetch(`${api}/users/${id}/followers`);
	if (!res.ok) return [];

	const user = await res.json();
	return user.follower_users || [];
}

export async function fetchFollowing(id) {
	const res = await fetch(`${api}/users/${id}/following`);
	if (!res.ok) return [];

	const user = await res.json();
	return user.following_users || [];
}

export async function fetchToggleLike(id) {
	const token = getToken();

	const res = await fetch(`${api}/posts/${id}/like`, {
		method: "put",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function fetchPutFollow(id) {
	const token = getToken();

	const res = await fetch(`${api}/users/${id}/follow`, {
		method: "put",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function fetchPutUnfollow(id) {
	const token = getToken();

	const res = await fetch(`${api}/users/${id}/unfollow`, {
		method: "put",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function fetchNotis() {
	const token = getToken();

	const res = await fetch(`${api}/notis`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return await res.json();
}

export async function fetchReadNoti(id) {
	const token = getToken();

	const res = await fetch(`${api}/notis/${id}`, {
		method: "put",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function fetchReadNotis() {
	const token = getToken();

	const res = await fetch(`${api}/notis`, {
		method: "put",
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

export async function fetchPostNoti(type, target) {
	const token = getToken();

	const res = await fetch(`${api}/notis`, {
		method: "post",
		body: JSON.stringify({ type, target }),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	});

	return res.ok;
}

