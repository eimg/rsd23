import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
	View,
	Text,
	TextInput,
	Button,
	TouchableOpacity,
	StyleSheet,
} from "react-native";

import { useState, useRef } from "react";

const styles = StyleSheet.create({
	container: {},
	header: {
		padding: 20,
		paddingTop: 40,
		backgroundColor: "#2196F3",
		alignItems: "center",
	},
	title: {
		color: 'white',
		fontSize: 21,
		fontWeight: "bold",
	},
	form: {
		backgroundColor: "#9bcff7",
		flexDirection: "row",
		padding: 20,
	},
	input: {
		fontSize: 18,
		flexGrow: 1,
	},
	listItem: {
		flexDirection: "row",
		padding: 10,
		marginBottom: 5,
		borderWidth: 1,
		borderColor: "#ddd",
		justifyContent: "space-between",
		borderRadius: 4,
	},
});

export default function App() {
	const [tasks, setTasks] = useState([
		{ _id: 1, subject: "Apple", done: false },
		{ _id: 2, subject: "Orange", done: false },
		{ _id: 3, subject: "Milk", done: true },
		{ _id: 4, subject: "Bread", done: false },
	]);

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
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Todo Native</Text>
				</View>

				<View style={styles.form}>
					<TextInput
						style={styles.input}
						placeholder="+ New Task"
						placeholderTextColor="#888"
						onChangeText={setText}
						value={text}
						ref={inputRef}
						onSubmitEditing={() => addTask()}
					/>
					<Button title="ADD" onPress={() => addTask()} />
				</View>
				<View style={{ padding: 20 }}>
					{tasks.map(item => {
						return (
							<View style={styles.listItem} key={item._id}>
								<Text style={{ fontSize: 18 }}>
									{item.subject}
								</Text>
								<TouchableOpacity
									onPress={() => {
										setTasks(
											tasks.filter(
												task => task._id !== item._id,
											),
										);
									}}>
									<Text
										style={{
											fontSize: 18,
											color: "brown",
										}}>
										Del
									</Text>
								</TouchableOpacity>
							</View>
						);
					})}
				</View>
			</View>
			<StatusBar style="auto" />
		</SafeAreaProvider>
	);
}
