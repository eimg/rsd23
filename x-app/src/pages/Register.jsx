import { useRef, useState, useContext } from "react";

import {
	Box,
	Alert,
	Button,
	Typography,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { UIContext } from "../ThemedApp";
import { fetchRegister } from "../libs/fetcher";

export default function Register() {
	const { setSnackbarOpen, setSnackMessage } = useContext(UIContext);
	const navigate = useNavigate();

	const nameInput = useRef();
	const handleInput = useRef();
	const profileInput = useRef();
	const passwordInput = useRef();

	const [hasError, setHasError] = useState(false);

	return (
		<Box>
			<Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
				Register
			</Typography>

			{hasError && (
				<Alert severity="warning" sx={{ mb: 3 }}>
					Something went wrong, please try again
				</Alert>
			)}

			<form
				onSubmit={e => {
					e.preventDefault();

					setHasError(false);

					const name = nameInput.current.value;
					const handle = handleInput.current.value;
					const profile = profileInput.current.value;
					const password = passwordInput.current.value;

					(async () => {
						const result = await fetchRegister(
							name,
							handle,
							profile,
							password,
						);
						if (!result) setHasError(true);

						setSnackbarOpen(true);
						setSnackMessage("Account created, please login");
						navigate("/login");
					})();
				}}>
				<OutlinedInput
					required
					inputRef={nameInput}
					placeholder="Name"
					fullWidth={true}
					sx={{ mb: 2 }}
				/>

				<OutlinedInput
					required
					inputRef={handleInput}
					placeholder="Handle"
					fullWidth={true}
					startAdornment={
						<InputAdornment position="start">@</InputAdornment>
					}
					sx={{ mb: 2 }}
				/>

				<OutlinedInput
					inputRef={profileInput}
					placeholder="Profile"
					fullWidth={true}
					multiline={true}
					sx={{ mb: 2 }}
				/>

				<OutlinedInput
					required
					inputRef={passwordInput}
					placeholder="Password"
					fullWidth={true}
					inputProps={{ type: "password" }}
					sx={{ mb: 3 }}
				/>

				<Button
					type="submit"
					variant="contained"
					color="info"
					fullWidth={true}>
					Register
				</Button>
			</form>
		</Box>
	);
}
