import { useRef } from "react";
import {
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

export default function Form({ addTask }) {
	const input = useRef();
	return (
		<form
			onSubmit={e => {
				e.preventDefault();

				const subject = input.current.value;
				addTask(subject);

				input.current.value = "";
				input.current.focus();
			}}>
			<FormControl fullWidth>
				<OutlinedInput
					inputRef={input}
					endAdornment={<InputAdornment position="end">
						<IconButton type="submit">
							<AddIcon />
						</IconButton>
					</InputAdornment>}
				/>
			</FormControl>
		</form>
	);
}
