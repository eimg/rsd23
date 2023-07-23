import {
	ListItem,
	ListItemIcon,
	ListItemText,
	IconButton,
} from "@mui/material";
import {
	Delete as DeleteIcon,
	CheckBoxOutlineBlank as TodoIcon,
	Check as CheckIcon,
} from "@mui/icons-material";

export default function Item({ task, deleteTask, toggleTask }) {
	return (
		<ListItem>
			<ListItemIcon>
				<IconButton
					onClick={() => {
						toggleTask(task._id);
					}}>
					{task.done ? <CheckIcon color="success" /> : <TodoIcon />}
				</IconButton>
			</ListItemIcon>
			<ListItemText primary={task.subject} />
			<ListItemIcon>
				<IconButton
					onClick={() => {
						deleteTask(task._id);
					}}>
					<DeleteIcon color="error" />
				</IconButton>
			</ListItemIcon>
		</ListItem>
	);
}
