import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tasks: [
		{ _id: 1, subject: "Milk", done: false },
		{ _id: 2, subject: "Butter", done: true },
		{ _id: 3, subject: "Bread", done: true },
		{ _id: 4, subject: "Egg", done: false },
	],
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		add: (state, action) => {
			state.tasks = [
				...state.tasks,
				{
					_id: state.tasks[state.tasks.length - 1]._id + 1,
					subject: action.payload,
				},
			];
		},
		del: (state, action) => {
			state.tasks = state.tasks.filter(
				item => item._id !== action.payload,
			);
		},
		toggle: (state, action) => {
			state.tasks = state.tasks.map(item => {
				if(item._id === action.payload) item.done = !item.done;
				return item;
			});
		},
		clear: (state) => {
			state.tasks = state.tasks.filter(item => !item.done);
		}
	},
});

export const { add, del, toggle, clear } = todoSlice.actions;
export default todoSlice.reducer;
