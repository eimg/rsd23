import { useState, useEffect } from "react";

import { List, Box } from "@mui/material";

import Item from "./Item";
import Form from "./Form";
import Header from "./Header";
import MainDrawer from "./MainDrawer";

import { Container } from "@mui/material";

const url = "http://localhost:8888/tasks";

export default function App() {
	const [tasks, setTasks] = useState([]);
	const [showDrawer, setShowDrawer] = useState(false);

	useEffect(() => {
		fetch(url)
			.then(res => res.json())
			.then(data => setTasks(data));
	}, []);

	const toggleDrawer = () => event => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setShowDrawer(!showDrawer);
	};

	const clear = () => {
		setTasks(tasks.filter(task => !task.done));
	};

	const deleteTask = _id => {
		setTasks(tasks.filter(task => task._id !== _id));
	};

	const toggleTask = _id => {
		fetch(`${url}/${_id}/toggle`, {
			method: 'PUT'
		});

		setTasks(
			tasks.map(task => {
				if (task._id === _id) task.done = !task.done;
				return task;
			}),
		);
	};

	const addTask = subject => {
		const _id = tasks[tasks.length - 1]._id + 1;
		setTasks([...tasks, { _id, subject, done: false }]);
	};

	return (
		<>
			<Header
				count={tasks.filter(item => !item.done).length}
				clear={clear}
				toggleDrawer={toggleDrawer}
			/>

			<MainDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />

			<Container>
				<Box sx={{ mx: { lg: 20, md: 10 } }}>
					<Form addTask={addTask} />

					<List sx={{ mt: 4 }}>
						{tasks
							.filter(task => !task.done)
							.map(task => {
								return (
									<Item
										key={task._id}
										task={task}
										deleteTask={deleteTask}
										toggleTask={toggleTask}
									/>
								);
							})}
					</List>

					<List>
						{tasks
							.filter(task => task.done)
							.map(task => {
								return (
									<Item
										key={task._id}
										task={task}
										deleteTask={deleteTask}
										toggleTask={toggleTask}
									/>
								);
							})}
					</List>
				</Box>
			</Container>
		</>
	);
}
