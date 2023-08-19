import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
	View,
	TextInput,
	Button,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

import { Header, Text, Input, ListItem } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useState, useRef, useEffect } from "react";

const url = "http://192.168.43.12:8888/tasks";

export default function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		(async () => {
			const res = await fetch(url);
			const data = await res.json();
			setTasks(data);
		})();
	}, []);

	const [text, setText] = useState("");
	const inputRef = useRef();

	const addTask = () => {
		if (!text) return false;

		setTasks([
			...tasks,
			{
				_id: tasks[tasks.length - 1]._id + 1,
				subject: text,
				done: false,
			},
		]);

		setText("");
		inputRef.current.focus();
	};

	return (
		<SafeAreaProvider>
			<View>
				<Header
					leftComponent={<Ionicons name="menu" size={24} />}
					centerComponent={
						<Text style={{ fontSize: 18, fontWeight: "bold" }}>
							Todo Native
						</Text>
					}
					rightComponent={
						<TouchableOpacity
							onPress={() => {
								setTasks(tasks.filter(task => !task.done));
							}}>
							<Ionicons name="checkmark-done" size={24} />
						</TouchableOpacity>
					}
				/>

				<View style={{ padding: 20 }}>
					<Input
						placeholder="New Task"
						value={text}
						onChangeText={setText}
						ref={inputRef}
						onSubmitEditing={() => addTask()}
						rightIcon={
							<TouchableOpacity onPress={() => addTask()}>
								<Ionicons name="add" size={24} />
							</TouchableOpacity>
						}
					/>
				</View>
				<View style={{ padding: 20 }}>
					{tasks
						.filter(item => !item.done)
						.map(item => {
							return (
								<ListItem key={item._id}>
									<TouchableOpacity
										onPress={() => {
											setTasks(
												tasks.map(task => {
													if (task._id === item._id)
														task.done = !task.done;
													return task;
												}),
											);
										}}>
										<Ionicons
											name="square-outline"
											size={24}
										/>
									</TouchableOpacity>
									<ListItem.Content>
										<ListItem.Title>
											{item.subject}
										</ListItem.Title>
									</ListItem.Content>
									<TouchableOpacity
										onPress={() => {
											setTasks(
												tasks.filter(
													task =>
														task._id !== item._id,
												),
											);
										}}>
										<Ionicons name="trash" size={24} />
									</TouchableOpacity>
								</ListItem>
							);
						})}
				</View>

				<View style={{ padding: 20 }}>
					{tasks
						.filter(item => item.done)
						.map(item => {
							return (
								<ListItem key={item._id}>
									<TouchableOpacity
										onPress={() => {
											setTasks(
												tasks.map(task => {
													if (task._id === item._id)
														task.done = !task.done;
													return task;
												}),
											);
										}}>
										<Ionicons
											name="checkmark"
											size={24}
											color="green"
										/>
									</TouchableOpacity>
									<ListItem.Content>
										<ListItem.Title>
											{item.subject}
										</ListItem.Title>
									</ListItem.Content>
									<TouchableOpacity
										onPress={() => {
											setTasks(
												tasks.filter(
													task =>
														task._id !== item._id,
												),
											);
										}}>
										<Ionicons name="trash" size={24} />
									</TouchableOpacity>
								</ListItem>
							);
						})}
				</View>
			</View>
			<StatusBar style="auto" />
		</SafeAreaProvider>
	);
}
