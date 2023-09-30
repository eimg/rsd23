import { useRef, useState } from "react"

import { convertToC } from "./libs/converter";

export default function App() {
	const input = useRef();
	const [result, setResult] = useState();

	const convert = () => {
		const f = input.current.value;
		if(!f) return false;

		setResult(convertToC(f));
	}

	return (
		<div>
			<h1 role="title">Converter App</h1>
			<form
				onSubmit={e => {
					e.preventDefault();
					convert();
				}}>
				<input role="input" ref={input} placeholder="F" />
				<button role="submit" type="submit">
					Convert
				</button>
			</form>
			{result && <div role="result">{result}</div>}
		</div>
	);
}
