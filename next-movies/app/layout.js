import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { Menu } from "@/components/menu";
import { Sidebar } from "@/components/sidebar";

export const metadata = {
	title: "Next Movie",
	description: "Yet Another Movie App",
};

async function fetchGenres() {
	const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
		headers: {
			Authorization: `Bearer ${process.env.API_KEY}`,
		},
	});

	if(!res.ok) return false;

	const data = await res.json();

	return data.genres;
}

export default async function RootLayout({ children }) {
	const genres = await fetchGenres();

	return (
		<html lang="en">
			<body className={inter.className}>
				<Menu />
				<div className="grid lg:grid-cols-5">
					<Sidebar
						genres={genres}
						className="hidden lg:block"
					/>

					{children}
				</div>
			</body>
		</html>
	);
}
