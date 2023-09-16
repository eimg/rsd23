import { useState, useRef } from "react";

const wsc = new WebSocket("ws://localhost:8000/connect");

export default function App() {
	const name = useRef();
	const input = useRef();
	const [chats, setChats] = useState([]);

	wsc.onmessage = e => {
		setChats([...chats, e.data]);
	}

	const styles = {
		container: {
			margin: '20px auto',
			maxWidth: 600,
			background: '#222',
			padding: 20,
		},
		item: {
			padding: 10,
			background: '#111',
			color: '#eee',
			marginBottom: 5,
		},
		form: {
			display: 'flex',
			background: '#333',
			marginTop: 10,
		},
		input: {
			padding: 10,
			flexGrow: 1,
		}
	}

	const send = () => {
		const msg = input.current.value;
		const uid = name.current.value;
		if(!msg || !uid) return false;

		wsc.send(JSON.stringify({ uid, msg }));

		input.current.value = "";
		input.current.focus();
	}

	return <div style={styles.container}>
		{chats.map((chat, i) => {
			return <div key={i} style={styles.item}>{chat}</div>
		})}

		<form style={styles.form} onSubmit={e => {
			e.preventDefault();
			send();
		}}>
			<input ref={name} placeholder="Name" style={{padding: 10}} />
			<input ref={input} placeholder="Chat Message" style={styles.input} />
			<button type="submit">Add</button>
		</form>
	</div>
}
