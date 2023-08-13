import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "http://localhost:8888/tasks";

const initialState = {
	tasks: [],
	loading: false,
};

export const fetchTasks = createAsyncThunk("tasks/getAll", async () => {
	// return await (await fetch(url)).json();

	const res = await fetch(url);
	return await res.json();
});

export const postTask = createAsyncThunk("tasks/createTask", async subject => {
	const res = await fetch(url, {
		method: 'POST',
		body: JSON.stringify({ subject }),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return await res.json();
});

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		del: (state, action) => {
			fetch(`${url}/${action.payload}`, { method: 'DELETE' });
			state.tasks = state.tasks.filter(
				item => item._id !== action.payload,
			);
		},
		toggle: (state, action) => {
			fetch(`${url}/${action.payload}/toggle`, { method: 'PUT' });
			state.tasks = state.tasks.map(item => {
				if (item._id === action.payload) item.done = !item.done;
				return item;
			});
		},
		clear: state => {
			fetch(`${url}`, { method: 'DELETE' });
			state.tasks = state.tasks.filter(item => !item.done);
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchTasks.fulfilled, (state, action) => {
			state.loading = false;
			state.tasks = action.payload;
		});

		builder.addCase(fetchTasks.pending, state => {
			state.loading = true;
		});

		builder.addCase(postTask.fulfilled, (state, action) => {
			state.tasks.push(action.payload);
		});
	},
});

export const { del, toggle, clear } = todoSlice.actions;
export default todoSlice.reducer;
