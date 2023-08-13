import { useRef } from "react";
import {
	FormControl,
	OutlinedInput,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

import { useDispatch } from "react-redux";
import { postTask } from "./features/todo/todoSlice";

export default function Form() {
	const input = useRef();
	const dispatch = useDispatch();

	return (
		<form
			onSubmit={e => {
				e.preventDefault();

				const subject = input.current.value;
				dispatch(postTask(subject));

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
