import Link from "next/link";

export function Menu() {
	return (
		<h1 className="text-2xl p-4 border-b">
			<Link href="/">Movies</Link>
		</h1>
	);
}
