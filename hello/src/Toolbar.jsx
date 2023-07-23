import { useContext } from "react";
import { ClearContext } from "./App";

export default function Toolbar() {
	const { clear } = useContext(ClearContext);

	return (
		<div style={{ background: "teal", marginBottom: 30, padding: 10 }}>
			<button onClick={() => {
				clear();
			}}>Clear</button>
		</div>
	);
}
