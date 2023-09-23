"use client";

import { useState, useRef, useEffect } from "react";

export default function RootPage({ data }) {
	const input = useRef();
	const [items, setItems] = useState(data);

	useEffect(() => {
		(async () => {
			const res = await fetch("http://localhost:8888/tasks");
			const data = await res.json();
			setItems(data);
		})();
	}, []);

	const add = () => {
		const subject = input.current.value;
		setItems([...items, { id: 3, subject }]);
	};

	return (
		<>
			<form
				onSubmit={e => {
					e.preventDefault();
					add();
				}}>
				<input ref={input} />
				<button>Add</button>
			</form>
			<ul>
				{items.map(item => {
					return <li key={item.id}>{item.subject}</li>;
				})}
			</ul>
		</>
	);
}
