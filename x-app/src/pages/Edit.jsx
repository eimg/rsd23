import {
	Box,
	Alert,
	Button,
	Typography,
	OutlinedInput,
	InputAdornment,
} from "@mui/material";

import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../ThemedApp";

export default function EditUser() {
	const navigate = useNavigate();

	const { authUser, setAuthUser } = useContext(AuthContext);

	const nameInput = useRef();
	const profileInput = useRef();
	const passwordInput = useRef();

	const [errMsg, setErrMsg] = useState("");
	const [hasError, setHasError] = useState(false);

	return (
		<Box>
			<Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
				Edit Profile
			</Typography>

			{hasError && (
				<Alert severity="warning" sx={{ mb: 3 }}>
					{errMsg}
				</Alert>
			)}

			<form
				onSubmit={e => {
					e.preventDefault();

					setHasError(false);

					let name = nameInput.current.value;
					let profile = profileInput.current.value;
					let password = passwordInput.current.value;

					(async () => {

						if (!result) {
							setErrMsg("required: name and password");
							setHasError(true);
							return;
						}

						setAuthUser(result);
						navigate(`/profile/${authUser.handle}`);
					})();
				}}>
				<OutlinedInput
					required
					inputRef={nameInput}
					placeholder="Name"
					fullWidth={true}
					sx={{ mb: 2 }}
					defaultValue={authUser.name}
				/>

				<OutlinedInput
					disabled
					placeholder="Handle"
					fullWidth={true}
					inputProps={{ pattern: "[a-zA-Z0-9_]+" }}
					startAdornment={
						<InputAdornment position="start">@</InputAdornment>
					}
					sx={{ mb: 2 }}
					defaultValue={authUser.handle}
				/>

				<OutlinedInput
					multiline
					minRows={2}
					inputRef={profileInput}
					placeholder="Profile (optional)"
					fullWidth={true}
					sx={{ mb: 2 }}
					defaultValue={authUser.profile}
				/>

				<OutlinedInput
					inputRef={passwordInput}
					placeholder="Password (leave blank to unchange)"
					fullWidth={true}
					inputProps={{ type: "password" }}
					sx={{ mb: 3 }}
				/>

				<Button
					color="info"
					type="submit"
					fullWidth={true}
					variant="contained">
					Update
				</Button>
			</form>
		</Box>
	);
}
