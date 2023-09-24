import { AlbumArtwork } from "@/components/album-artwork";

import Link from "next/link";

async function fetchMovies(query) {
	const res = await fetch(
		`https://api.themoviedb.org/3/search/movie?query=${query}`,
		{
			headers: {
				Authorization: `Bearer ${process.env.API_KEY}`,
			},
		},
	);

	if (!res.ok) return false;
	const data = await res.json();
	return data.results;
}

export default async function GenrePage({ searchParams }) {
	const movies = await fetchMovies(searchParams.query);

	return (
		<div className="col-span-3 lg:col-span-4 lg:border-l">
			<div className="h-full px-4 py-6 lg:px-8">
				<h2 className="text-2xl mb-4">Search: {searchParams.query}</h2>
				<div className="flex flex-wrap space-x-4">
					{movies.map(movie => (
						<div className="text-center mb-6">
							<Link href={`/detail/${movie.id}`}>
								<AlbumArtwork
									key={movie.id}
									movie={movie}
									className="w-[250px]"
									aspectRatio="portrait"
									width={250}
									height={330}
								/>
							</Link>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
