import Link from "next/link";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { redirect } from "next/navigation";

export function Menu() {
	async function search(formData) {
		"use server";
		const query = formData.get("query");
		if (query) return redirect(`/search?query=${query}`);
		else return false;
	}

	return (
		<div className="flex justify-between border-b p-4">
			<h1 className="text-2xl">
				<Link href="/">Movies</Link>
			</h1>
			<form className="flex" action={search} method="get">
				<svg
					width="48"
					height="48"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
						fill="currentColor"
						fill-rule="evenodd"
						clip-rule="evenodd"></path>
				</svg>
				<Input
					name="query"
					placeholder="Search Movie"
					className="ms-2"
				/>
				<Button className="ms-2">Search</Button>
			</form>
		</div>
	);
}
