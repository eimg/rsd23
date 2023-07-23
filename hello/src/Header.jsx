import Toolbar from "./Toolbar";

export default function Header({ count }) {
	return (
		<div style={{ background: "purple", padding: 10 }}>
			<h1 style={{ margin: 0 }}>List UI ({count})</h1>
			<Toolbar />
		</div>
	);
}
