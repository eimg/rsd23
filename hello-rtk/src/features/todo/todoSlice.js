import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	tasks: [
		{ id: 1, subject: 'Apple' },
		{ id: 2, subject: 'Orange' },
		{ id: 3, subject: 'Mango' },
	]
};

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		add: (state, action) => {
			state.tasks = [
				...state.tasks,
				{
					id: state.tasks[state.tasks.length - 1].id + 1,
					subject: action.payload
				}
			];
		},
		del: (state, action) => {
			state.tasks = state.tasks.filter(item => item.id !== action.payload);
		}
	},
});

export const { add, del } = todoSlice.actions;
export default todoSlice.reducer;
