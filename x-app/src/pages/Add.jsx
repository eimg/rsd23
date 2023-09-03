import { Box } from "@mui/system";

import { Button, Input } from "@mui/material";

import { useRef, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { fetchAddPost } from "../libs/fetcher";

import { UIContext } from "../ThemedApp";

export default function Add() {
	const navigate = useNavigate();
	const input = useRef();
	const { setSnackbarOpen, setSnackMessage } = useContext(UIContext);
	return (
		<Box>
			<form onSubmit={e => {
				e.preventDefault();

				const body = input.current.value;
				if(!body) return false;

				(async () => {
					const post = await fetchAddPost(body);
					if(!post) return false;

					setSnackMessage("Post added");
					setSnackbarOpen(true);
					navigate('/');
				})();
			}}>
				<Box sx={{ p: 2, border: 1, borderColor: "text.fade" }}>
					<Input
						inputRef={input}
						sx={{ fontSize: "16px", py: 2 }}
						placeholder="What's on your mind"
						multiline
						fullWidth
						minRows={4}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						mt: 2,
						justifyContent: "space-between",
					}}>
					<Box></Box>
					<Button
						type="submit"
						size="small"
						variant="contained"
						color="success"
						sx={{ borderRadius: 5 }}>
						Add Post
					</Button>
				</Box>
			</form>
		</Box>
	);
}
