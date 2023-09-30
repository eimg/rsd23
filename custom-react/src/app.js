function Element(props) {
	return <div>
		<h1>Custom React</h1>
		<ul>
			<li>Item One</li>
			<li>Item Two</li>
			<li>Item Three</li>
			<li>Item Four</li>
			<li>Item Five</li>
		</ul>
	</div>
}

ReactDOM.render(
	<Element content="A React Component" />,
	document.getElementById("app"),
);
