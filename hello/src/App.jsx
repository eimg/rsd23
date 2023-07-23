import { useState, createRef, createContext } from "react";
import Item from "./Item";
import Header from "./Header";

export const ClearContext = createContext();

export default function App() {
	const input = createRef();

	const [data, setData] = useState([
		{ id: 1, name: "Alice", status: false },
		{ id: 2, name: "Bob", status: false },
		{ id: 3, name: "Chris", status: false },
	]);

	const clear = () => {
		setData([]);
	}

	const add = name => {
		const id = data[data.length - 1].id + 1;
		setData([...data, { id, name }]);
	};

	const remove = id => {
		setData(data.filter(user => user.id !== id));
	};

	return (
		<div>
			<ClearContext.Provider value={{ clear }}>
				<Header count={data.length} />
				<ul>
					{data.map(user => {
						return (
							<Item key={user.id} user={user} remove={remove} />
						);
					})}
				</ul>
				<form
					onSubmit={e => {
						e.preventDefault();
						add(input.current.value);
						input.current.value = "";
						input.current.focus();
					}}>
					<input type="text" ref={input} />
					<input type="submit" value="Add" />
				</form>
			</ClearContext.Provider>
		</div>
	);
}
