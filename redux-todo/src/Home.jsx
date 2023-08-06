import { List, Box } from "@mui/material";

import Item from "./Item";
import Form from "./Form";

import { Container } from "@mui/material";
import { useSelector } from "react-redux";

export default function Home() {
	const tasks = useSelector(state => state.todo.tasks);

	return (
		<Container>
			<Box sx={{ mx: { lg: 20, md: 10 } }}>
				<Form />

				<List sx={{ mt: 4 }}>
					{tasks
						.filter(task => !task.done)
						.map(task => {
							return <Item key={task._id} task={task} />;
						})}
				</List>

				<List>
					{tasks
						.filter(task => task.done)
						.map(task => {
							return <Item key={task._id} task={task} />;
						})}
				</List>
			</Box>
		</Container>
	);
}
